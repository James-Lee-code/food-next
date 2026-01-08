'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';
import { CartContext } from '@/store/CartContext';
import UserProgressContext from '@/store/CheckCart'; // ✅ 新增

export default function MealItem({ title, slug, image, summary, creator, price }) {
  const { addItem } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext); // ✅ 取得 context

  function handleAddToCart() {
    // ✅ 1. 加入購物車
    addItem({
      id: slug, // 使用 slug 作為唯一識別 ID
      title,
      price,
      quantity: 1,
    });

    // ✅ 2. 打開購物車 modal
    userProgressCtx.showCart();
  }

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill sizes="(max-width: 600px) 100vw, 50vw"/>
        </div>
        <div className={classes.headerText}>
          <div className={classes.titleRow}>
            <h2>{title}</h2>
            <span className={classes.price}>${price.toFixed(2)}</span>
          </div>
          <p>產地 {creator}</p>
        </div>
      </header>

      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>更多內容</Link>
          <button className={classes.button} onClick={handleAddToCart}>
            加入購物車
          </button>
        </div>
      </div>
    </article>
  );
}
