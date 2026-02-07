'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';

interface ConverterProps {
  coin: {
    id: string;
    symbol: string;
    image: { small: string };
    market_data: {
      current_price: { usd: number };
    };
  };
}

const Converter = ({ coin }: ConverterProps) => {
  const [coinAmount, setCoinAmount] = useState<string>('1');
  const [usdAmount, setUsdAmount] = useState<string>(
    coin.market_data.current_price.usd.toString()
  );
  const price = coin.market_data.current_price.usd;

  const handleCoinChange = (value: string) => {
    setCoinAmount(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setUsdAmount((num * price).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const handleUsdChange = (value: string) => {
    setUsdAmount(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setCoinAmount((num / price).toFixed(6));
    } else {
      setCoinAmount('');
    }
  };

  return (
    <section className="bg-gray-900/50 p-6 rounded-[2.5rem] border border-gray-800/50 shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-black text-white px-2 mb-6">
        Price Converter
      </h2>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center gap-2 pointer-events-none z-10">
            <Image
              src={coin.image.small}
              alt={coin.symbol}
              width={20}
              height={20}
              className="rounded-full"
              style={{ height: 'auto' }}
            />
            <span className="font-bold text-gray-400 text-xs uppercase">
              {coin.symbol}
            </span>
          </div>
          <Input
            type="number"
            value={coinAmount}
            onChange={(e) => handleCoinChange(e.target.value)}
            className="pl-24 py-7 bg-gray-800/40 border-gray-700/50 rounded-2xl text-lg font-bold text-white focus-visible:ring-purple-600/50"
          />
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <div className="p-2 bg-purple-600 rounded-xl shadow-lg shadow-purple-900/40 text-white transform rotate-90 ring-4 ring-gray-900">
            <ArrowLeftRight size={16} strokeWidth={3} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center gap-2 pointer-events-none z-10">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-[10px] font-black tracking-tighter">
              $
            </div>
            <span className="font-bold text-gray-400 text-xs uppercase">
              USD
            </span>
          </div>
          <Input
            type="number"
            value={usdAmount}
            onChange={(e) => handleUsdChange(e.target.value)}
            className="pl-24 py-7 bg-gray-800/40 border-gray-700/50 rounded-2xl text-lg font-bold text-white focus-visible:ring-purple-600/50"
          />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          1 {coin.symbol.toUpperCase()} = ${price.toLocaleString('en-US')} USD
        </p>
      </div>
    </section>
  );
};

export default Converter;
