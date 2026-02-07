'use client';

import React from 'react';
import { useWebSocket } from '@/lib/hooks/useWebSocket';

interface LivePriceIndicatorProps {
  coinId: string;
  initialPrice: number;
}

const LivePriceIndicator = ({
  coinId,
  initialPrice,
}: LivePriceIndicatorProps) => {
  const { prices } = useWebSocket([coinId]);
  const livePrice = prices[coinId] ? parseFloat(prices[coinId]) : initialPrice;

  return (
    <h1 className="text-3xl font-bold tracking-tight text-white line-clamp-1 transition-all duration-300">
      $
      {livePrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </h1>
  );
};

export default LivePriceIndicator;
