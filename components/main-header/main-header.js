'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import MainHeaderBackground from './main-header-background';
import logoImg from '@/public/logo.png';
import classes from './main-header.module.css';
import NavLink from './nav-link';
import { CartContext } from '@/store/CartContext';
import UserProgressContext from '@/store/CheckCart';
import CartModal from '@/app/cart/page';
import Checkout from '@/app/cart/check/page'; // ✅ checkout modal

export default function MainHeader() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = cartCtx.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleOpenCart() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          GOODFOOD
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">所有產品</NavLink>
            </li>
            <li>
              <button onClick={handleOpenCart} className={classes.button}>
                購物車 {totalItems > 0 && `(${totalItems})`}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* ✅ 只需渲染，不用傳 open，會自動判斷是否顯示 */}
      <CartModal />
      <Checkout />
    </>
  );
}
