import mongoose from 'mongoose';
import slugify from 'slugify';
import xss from 'xss';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not defined');
  await mongoose.connect(process.env.MONGODB_URI);
}

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
} else {
  console.warn('CLOUDINARY_URL not found in .env.local');
}

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  instructions: String,
  creator: String,
  creator_email: String,
  image: String,
  slug: { type: String, unique: true },
  price: { type: Number, required: true, default: 0 },
});

const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);

export async function getMeals() {
  await connectDB();
  const meals = await Meal.find().lean();
  return meals.map(meal => ({
    ...meal,
    _id: meal._id.toString(),
  }));
}

export async function getMeal(slug) {
  await connectDB();
  const meal = await Meal.findOne({ slug }).lean();

  if (!meal) return null;
  return {
    ...meal,
    _id: meal._id.toString(),
  };
}

export async function saveMeal(meal) {
  await connectDB();

  if (!meal.title) throw new Error('Title missing');
  if (!meal.image) throw new Error('Image missing');
  if (!meal.price && meal.price !== 0) throw new Error('Price missing');

const baseSlug = slugify(meal.title, {
  lower: true,
  strict: true,
});

const slug = `${baseSlug || 'meal'}-${crypto.randomUUID().slice(0, 8)}`;

  meal.instructions = meal.instructions ? xss(meal.instructions) : '';
  meal.slug = slug;

  const arrayBuffer = await meal.image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let uploaded;
  try {
    uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'meals',
          public_id: slug,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }

  try {
    const newMeal = new Meal({
      ...meal,
      image: uploaded.secure_url,
      slug,
      price: Number(meal.price),
    });
    await newMeal.save();
    return newMeal;
  } catch (err) {
    console.error('MongoDB save error:', err);
    throw err;
  }
}
