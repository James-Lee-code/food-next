'use client';

import { useActionState } from 'react';
import { shareMeal } from '@/lib/actions';
import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import classes from './page.module.css';

export default function ShareMealPage() {
  const [state, formAction] = useActionState(async (prev, formData) => {
    // ✅ 直接呼叫 server action
    return await shareMeal(formData);
  }, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          加入 <span className={classes.highlight}>更多美食</span>
        </h1>
      </header>

      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">產地</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>

          <p>
            <label htmlFor="title">標題</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">簡介</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">內容</label>
            <textarea id="instructions" name="instructions" rows="10" required />
          </p>
          <p>
            <label htmlFor="price">價格 ($)</label>
            <input type="number" id="price" name="price" step="0.01" min="0" required />
          </p>

          <ImagePicker label="Your image" name="image" />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>

        {state?.message && <p className={classes.error}>{state.message}</p>}
      </main>
    </>
  );
}
