'use client';

import React from 'react';
import { PokemonStat } from '@/app/_utils/types';

interface StatsOctagonProps {
  stats: PokemonStat[];
}

const StatsOctagon: React.FC<StatsOctagonProps> = ({ stats }) => {

  const statNames: { [key: string]: string } = {
    'hp': 'PS',
    'attack': 'Attack',
    'defense': 'Defense',
    'speed': 'Speed',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense'
  };

  // get the stats
  const mainStats = [
    stats.find(stat => stat.stat.name === 'hp'),
    stats.find(stat => stat.stat.name === 'attack'),
    stats.find(stat => stat.stat.name === 'defense'),
    stats.find(stat => stat.stat.name === 'speed')
  ].filter(Boolean) as PokemonStat[];

  // calculate the max stat
  const maxStat = Math.max(...mainStats.map(stat => stat.base_stat));

  // function to generate the octagon points
  const generateOctagonPoints = (radius: number) => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // function to generate the stats points (4 points in cross)
  const generateStatsPoints = () => {
    return mainStats.map((stat, index) => {
      const angle = (index * Math.PI) / 2 - Math.PI / 2;
      const radius = (stat.base_stat / maxStat) * 60;
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="relative w-50 h-50 mx-auto">
      {/* Octagon */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="octagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Octagon */}
        <polygon
          points={generateOctagonPoints(80)}
          fill="url(#octagonGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Grid lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const x = 100 + 80 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
          return (
            <line
              key={index}
              x1="100"
              y1="100"
              x2={x}
              y2={y}
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Stats octagon */}
        <polygon
          points={generateStatsPoints()}
          fill="url(#statsGradient)"
          stroke="#ef4444"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Stats points */}
        {mainStats.map((stat, index) => {
          const angle = (index * Math.PI) / 2 - Math.PI / 2;
          const radius = (stat.base_stat / maxStat) * 60;
          const x = 100 + radius * Math.cos(angle);
          const y = 100 + radius * Math.sin(angle);

          return (
            <circle
              key={stat.stat.name}
              cx={x}
              cy={y}
              r="4"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse"
            />
          );
        })}
      </svg>

      {/* Stats labels outside the octagon */}
      <div className="absolute inset-0">
        {/* Top - PS */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-center">
          <div className="text-sm font-medium">
            {statNames[mainStats[0]?.stat.name]}
          </div>
          <div className="text-lg font-bold">
            {mainStats[0]?.base_stat}
          </div>
        </div>

        {/* Right - Attack */}
        <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2 text-center">
          <div className="text-sm font-medium">
            {statNames[mainStats[1]?.stat.name]}
          </div>
          <div className="text-lg font-bold">
            {mainStats[1]?.base_stat}
          </div>
        </div>

        {/* Bottom - Defense */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-center">
          <div className="text-sm font-medium">
            {statNames[mainStats[2]?.stat.name]}
          </div>
          <div className="text-lg font-bold">
            {mainStats[2]?.base_stat}
          </div>
        </div>

        {/* Left - Speed */}
        <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 text-center">
          <div className="text-sm font-medium">
            {statNames[mainStats[3]?.stat.name]}
          </div>
          <div className="text-lg font-bold">
            {mainStats[3]?.base_stat}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOctagon;