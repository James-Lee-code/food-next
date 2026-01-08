import Link from 'next/link';

import ImageSlideshow from '@/components/images/image-slideshow';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <p>GOODFOOD</p>
            <h1>如果今天想吃點不一樣</h1>
            <h1>正是此刻 很剛好</h1>
          </div>
          <div className={classes.cta}>
            <Link href="/meals">選擇套餐</Link>
          </div>
        </div>
      </header>
    </>
  );
}