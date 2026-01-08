import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

// 🚀 關鍵：讓這頁每次都抓最新資料，不被 Next.js 快取
export const dynamic = 'force-dynamic';

async function Meals() {
  console.log('🍽️ Fetching meals from MongoDB...');
  const meals = await getMeals();

  if (!meals || meals.length === 0) {
    return <p className={classes.loading}>No meals found 😢</p>;
  }

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          今天吃甚麼
          <span className={classes.highlight}>您來決定</span> 
        </h1>
        <p>
          選擇美味 來豐富您美好的一天
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">選擇加入</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>加載中...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
