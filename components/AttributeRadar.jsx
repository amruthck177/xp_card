'use client';

import React from 'react';

const ATTRIBUTES = [
  { label: 'Problem Solving', value: 92 },
  { label: 'Frontend', value: 88 },
  { label: 'Backend', value: 85 },
  { label: 'AI Intel', value: 94 },
  { label: 'Debugging', value: 96 },
  { label: 'Collaboration', value: 82 },
  { label: 'Leadership', value: 78 },
  { label: 'Karma', value: 90 },
];

export default function AttributeRadar() {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const sides = ATTRIBUTES.length;
  const angleStep = (Math.PI * 2) / sides;

  // Generate background rings
  const rings = [0.2, 0.4, 0.6, 0.8, 1].map((r) => {
    const points = Array.from({ length: sides + 1 }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      return `${center + radius * r * Math.cos(angle)},${center + radius * r * Math.sin(angle)}`;
    }).join(' ');
    return points;
  });

  // Generate the data polygon
  const dataPoints = ATTRIBUTES.map((attr, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (attr.value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Rings */}
        {rings.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Axis Lines */}
        {ATTRIBUTES.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="#06b6d4"
          strokeWidth="2"
          className="animate-pulse-slow"
        />

        {/* Attribute Labels */}
        {ATTRIBUTES.map((attr, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 25) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              className="font-display text-[8px] font-bold fill-white/40 uppercase tracking-widest"
            >
              {attr.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
