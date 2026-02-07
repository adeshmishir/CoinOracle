'use client';

import React from 'react';
import Image from 'next/image';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PriceHeaderProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: { large: string };
    market_data: {
      current_price: { usd: number };
      price_change_percentage_24h_in_currency: { usd: number };
    };
  };
}

const PriceHeader = ({ coin }: PriceHeaderProps) => {
  const { prices } = useWebSocket([coin.id]);
  const livePrice = prices[coin.id]
    ? parseFloat(prices[coin.id])
    : coin.market_data.current_price.usd;
  const isUp = coin.market_data.price_change_percentage_24h_in_currency.usd > 0;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-900/50 p-8 rounded-[2rem] border border-gray-800/50 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 rounded-3xl bg-gray-800 flex items-center justify-center p-3 shadow-inner ring-1 ring-white/10">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
            className="rounded-full shadow-lg"
            style={{ height: 'auto' }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              ${coin.market_data.current_price.usd.toLocaleString('en-US')}
            </h1>
            <span className="px-3 py-1 rounded-xl bg-gray-800 text-gray-400 font-bold text-sm uppercase tracking-wider">
              {coin.symbol}
            </span>
          </div>
          <p className="text-gray-500 font-medium">Rank #{coin.id} Asset</p>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-2">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-black text-white tracking-tighter">
            $
            {livePrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </span>
          <div
            className={cn(
              'flex items-center gap-1 font-bold text-lg',
              isUp ? 'text-green-400' : 'text-red-400'
            )}
          >
            {isUp ? (
              <TrendingUp size={24} strokeWidth={3} />
            ) : (
              <TrendingDown size={24} strokeWidth={3} />
            )}
            <span>
              {Math.abs(
                coin.market_data.price_change_percentage_24h_in_currency.usd
              ).toFixed(2)}
              %
            </span>
          </div>
        </div>
        <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs">
          Live Market Price • USD
        </p>
      </div>
    </div>
  );
};

export default PriceHeader;
