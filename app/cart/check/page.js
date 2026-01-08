'use client';

import { useContext, useState } from 'react';
import Modal from '@/components/UI/Modal';
import { CartContext } from '@/store/CartContext';
import UserProgressContext from '@/store/CheckCart';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { saveOrder } from '@/lib/check.js';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (userProgressCtx.progress !== 'checkout') return null;

  const total = cartCtx.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setError(null);

    formData.append('items', JSON.stringify(cartCtx.items));
    formData.append('total', total.toString());

    const result = await saveOrder(formData);
    if (result?.error) setError(result.error);
    if (result?.success) {
      setSuccess(true);
      cartCtx.clearCart();
    }

    setIsSubmitting(false);
  }

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  if (success) {
    return (
      <Modal open onClose={handleClose}>
        <h2>已收到您的訂單</h2>
        <p>將會有專人聯絡您</p>
        <Button onClick={handleClose}>OK</Button>
      </Modal>
    );
  }

  return (
    <Modal open onClose={handleClose}>
      <form action={handleSubmit}>
        <h2>結帳</h2>
        <Input label="姓名" id="name" name="name" required />
        <Input label="電話" id="phone" name="phone" required />
        <Input label="地址" id="address" name="address" required />

        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          總共: ${total.toFixed(2)}
        </p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            取消
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? '送出中...' : '確認訂單'}
          </Button>
        </p>
      </form>
    </Modal>
  );
}
