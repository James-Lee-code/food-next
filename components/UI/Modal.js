'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, children, onClose, className }) {
  const dialog = useRef();
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !dialog.current) return;

    const dialogEl = dialog.current;

    if (open) {
      dialogEl.showModal();
    } else {
      dialogEl.close();
    }

    const handleBackdropClick = (e) => {
      const rect = dialogEl.getBoundingClientRect();
      const clickedInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!clickedInDialog) {
        onClose?.();
      }
    };

    dialogEl.addEventListener('click', handleBackdropClick);

    return () => {
      dialogEl.removeEventListener('click', handleBackdropClick);
    };
  }, [open, mounted, onClose]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={dialog} className={`modal ${className || ''}`} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
}
