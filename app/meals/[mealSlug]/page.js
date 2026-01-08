import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const p = await params;
  const meal = await getMeal(p.mealSlug);
  if (!meal) notFound();

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const p = await params;
  const meal = await getMeal(p.mealSlug);

  if (!meal) notFound();

  meal.instructions = meal.instructions
    ? meal.instructions.replace(/\n/g, '<br />')
    : 'No instructions provided.';

  const imageSrc =
    meal.image && meal.image.startsWith('http')
      ? meal.image
      : meal.image && meal.image.startsWith('/')
      ? meal.image
      : `/images/${meal.image}`;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={imageSrc}
            alt={meal.title || 'Meal image'}
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            產地 <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
          <p className={classes.price}>${Number(meal.price || 0).toFixed(2)}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
