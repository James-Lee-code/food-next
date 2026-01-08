// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config({ path: '.env.local' });

// const mealSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   slug: { type: String, unique: true },
//   image: { type: String },
//   summary: { type: String },
//   instructions: { type: String },
//   creator: { type: String },
//   creator_email: { type: String },
//   price: { type: Number, required: true, default: 0 },
// });

// const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);

// const dummyMeals = [
//   {
//     title: 'Juicy Cheese Burger',
//     slug: 'juicy-cheese-burger',
//     image: '/burger.jpg', // ✅ 圖片放 public 資料夾
//     summary:
//       'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
//     instructions: `1. Mix beef with salt and pepper.\n2. Cook both sides 3 mins.\n3. Add cheese and serve.`,
//     creator: 'John Doe',
//     creator_email: 'johndoe@example.com',
//     price: 8.99,
//   },
//   {
//     title: 'Spicy Curry',
//     slug: 'spicy-curry',
//     image: '/curry.jpg', // ✅ 圖片放 public 資料夾
//     summary:
//       'A rich and spicy curry infused with exotic spices and creamy coconut milk.',
//     instructions: `1. Sauté veggies.\n2. Add curry paste.\n3. Add coconut milk.\n4. Simmer 15 mins.`,
//     creator: 'Max Schwarz',
//     creator_email: 'max@example.com',
//     price: 10.5,
//   },
//   {
//     title: 'Fresh Tomato Salad',
//     slug: 'fresh-tomato-salad',
//     image: '/tomato-salad.jpg',
//     summary:
//       'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
//     instructions: `
//       1. Prepare the tomatoes:
//          Slice fresh tomatoes and arrange them on a plate.
    
//       2. Add herbs and seasoning:
//          Sprinkle chopped basil, salt, and pepper over the tomatoes.
    
//       3. Dress the salad:
//          Drizzle with olive oil and balsamic vinegar.
    
//       4. Serve:
//          Enjoy this simple, flavorful salad as a side dish or light meal.
//     `,
//     creator: 'Sophia Green',
//     creator_email: 'sophiagreen@example.com',
//     price: 6.25,
//   },
//   {
//     title: 'Homemade Dumplings',
//     slug: 'homemade-dumplings',
//     image: '/dumplings.jpg',
//     summary:
//       'Tender dumplings filled with savory meat and vegetables, steamed to perfection.',
//     instructions: `
//       1. Prepare the filling:
//          Mix minced meat, shredded vegetables, and spices.

//       2. Fill the dumplings:
//          Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

//       3. Steam the dumplings:
//          Arrange dumplings in a steamer. Steam for about 10 minutes.

//       4. Serve:
//          Enjoy these dumplings hot, with a dipping sauce of your choice.
//     `,
//     creator: 'Emily Chen',
//     creator_email: 'emilychen@example.com',
//     price: 7.5,
//   },
//   {
//     title: 'Classic Mac n Cheese',
//     slug: 'classic-mac-n-cheese',
//     image: '/macncheese.jpg',
//     summary:
//       "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
//     instructions: `
//       1. Cook the macaroni:
//          Boil macaroni according to package instructions until al dente.

//       2. Prepare cheese sauce:
//          In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

//       3. Combine:
//          Mix the cheese sauce with the drained macaroni.

//       4. Bake:
//          Transfer to a baking dish, top with breadcrumbs, and bake until golden.

//       5. Serve:
//          Serve hot, garnished with parsley if desired.
//     `,
//     creator: 'Laura Smith',
//     creator_email: 'laurasmith@example.com',
//     price: 9.25,
//   },
//   {
//     title: 'Authentic Pizza',
//     slug: 'authentic-pizza',
//     image: '/pizza.jpg',
//     summary:
//       'Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.',
//     instructions: `
//       1. Prepare the dough:
//          Knead pizza dough and let it rise until doubled in size.

//       2. Shape and add toppings:
//          Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

//       3. Bake the pizza:
//          Bake in a preheated oven at 220°C for about 15-20 minutes.

//       4. Serve:
//          Slice hot and enjoy with a sprinkle of basil leaves.
//     `,
//     creator: 'Mario Rossi',
//     creator_email: 'mariorossi@example.com',
//     price: 12.0,
//   },
//   {
//     title: 'Wiener Schnitzel',
//     slug: 'wiener-schnitzel',
//     image: '/schnitzel.jpg',
//     summary:
//       'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
//     instructions: `
//       1. Prepare the veal:
//          Pound veal cutlets to an even thickness.

//       2. Bread the veal:
//          Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

//       3. Fry the schnitzel:
//          Heat oil in a pan and fry each schnitzel until golden brown on both sides.

//       4. Serve:
//          Serve hot with a slice of lemon and a side of potato salad or greens.
//     `,
//     creator: 'Franz Huber',
//     creator_email: 'franzhuber@example.com',
//     price: 14.75,
//   }
// ];

// async function initData() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     for (const meal of dummyMeals) {
//       const updated = await Meal.findOneAndUpdate(
//         { slug: meal.slug }, // 用 slug 當唯一 key
//         meal,
//         { upsert: true, new: true } // 沒有就新增，有就更新
//       );
//       console.log(`🍽️ Upserted: ${updated.title}`);
//     }

//     console.log('✅ Dummy meals inserted or updated successfully!');
//     await mongoose.disconnect();
//     console.log('🔌 Disconnected from MongoDB');
//   } catch (err) {
//     console.error('❌ Failed to initialize database:', err);
//   }
// }

// initData();
