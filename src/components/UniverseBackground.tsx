"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UniverseBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: string }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration
          } as any}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.05),transparent_40%)]" />
    </div>
  );
};

export default UniverseBackground;
