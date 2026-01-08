'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not defined');
  await mongoose.connect(process.env.MONGODB_URI);
}

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export async function saveOrder(formData) {
  await connectDB();

  const order = {
    customer: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    },
    items: JSON.parse(formData.get('items')),
    total: parseFloat(formData.get('total')),
  };

  if (!order.customer.name || !order.customer.phone || order.items.length === 0) {
    return { error: 'Please fill all fields.' };
  }

  const newOrder = new Order(order);
  await newOrder.save();
  revalidatePath('/cart/check');
  return { success: true };
}
