"use client";

import { useContext } from "react";
import Modal from "@/components/UI/Modal";
import { CartContext } from "@/store/CartContext";
import UserProgressContext from "@/store/CheckCart";
import classes from "./page.module.css";

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export default function CartModal() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  if (userProgressCtx.progress !== "cart") return null;

  return (
    <Modal open onClose={handleCloseCart} className={classes.cart}>
      <h2>你的購物</h2>

      <ul className={classes.items}>
        {cartCtx.items.length === 0 && <p>No items in cart yet.</p>}

        {cartCtx.items.map((item) => (
          <li key={item.id} className={classes.item}>
            <div>
              <h3>{item.title}</h3>
              <div className={classes.itemDetails}>
                <span className={classes.price}>{formatCurrency(item.price)}</span>
                <span className={classes.quantity}>× {item.quantity}</span>
              </div>
            </div>
            <div className={classes.itemActions}>
              <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
              <button onClick={() => cartCtx.addItem(item)}>+</button>
            </div>
          </li>
        ))}
      </ul>

      <p className={classes.total}>總共: {formatCurrency(cartTotal)}</p>

      <div className={classes.actions}>
        <button onClick={handleCloseCart} className={classes.close}>取消</button>
        {cartCtx.items.length > 0 && (
          <button onClick={handleCheckout} className={classes.checkout}>
            去結帳
          </button>
        )}
      </div>
    </Modal>
  );
}
