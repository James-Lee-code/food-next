'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/public/burger.jpg';
import pizzaImg from '@/public/pizza.jpg';
import noodlesImg from '@/public/noodles.png';
import ralmenImg from '@/public/ralmen.png';
import riceImg from '@/public/rice.png';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: '漢堡' },
  { image: noodlesImg, alt: '牛肉麵' },
  { image: ralmenImg, alt: '拉麵' },
  { image: riceImg, alt: '魯肉飯' },
  { image: pizzaImg, alt: '披薩' }
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}