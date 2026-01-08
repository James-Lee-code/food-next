// app/layout.js
import MainHeader from '@/components/main-header/main-header';
import './globals.css';
import { CartContextProvider } from '@/store/CartContext';
import {UserProgressContextProvider} from "@/store/CheckCart";

export const metadata = {
  title: 'GOODFOOD',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <UserProgressContextProvider>
            <MainHeader />
            {children}
            <div id="modal"></div>
          </UserProgressContextProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
