'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Trade {
  id: number;
  price: number;
  amount: number;
  time: string;
  type: 'buy' | 'sell';
}

interface TradeOverviewProps {
  coinId: string;
  initialPrice: number;
}

const TradeOverview = ({ coinId, initialPrice }: TradeOverviewProps) => {
  const [frequency, setFrequency] = useState<'1s' | '1m'>('1s');
  const [trades, setTrades] = useState<Trade[]>([]);
  const lastPrice = useRef(initialPrice);

  useEffect(() => {
    // Simulated trade generator for demo purposes
    // In a real app, this would connect to a trade WebSocket
    const intervalTime = frequency === '1s' ? 1000 : 5000; // 5s for '1m' demo

    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * (lastPrice.current * 0.001);
      const newPrice = lastPrice.current + change;
      lastPrice.current = newPrice;

      const newTrade: Trade = {
        id: Date.now(),
        price: newPrice,
        amount: Math.random() * 2,
        time: new Date().toLocaleTimeString([], {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        type: Math.random() > 0.5 ? 'buy' : 'sell',
      };

      setTrades((prev) => [newTrade, ...prev].slice(0, 10));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [frequency]);

  return (
    <section className="bg-gray-900/50 p-6 rounded-[2.5rem] border border-gray-800/50 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-white px-2">Live Trades</h2>

        <div className="flex bg-gray-800/80 p-1 rounded-xl ring-1 ring-white/5">
          {(['1s', '1m'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-xs font-black transition-all duration-300 uppercase tracking-widest',
                frequency === f
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.2em] font-black text-gray-500 border-b border-gray-800 pb-4">
              <th className="pb-4 font-black">Price</th>
              <th className="pb-4 font-black">Amount</th>
              <th className="pb-4 font-black text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/30">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="group hover:bg-white/5 transition-colors"
              >
                <td
                  className={cn(
                    'py-3 font-mono font-bold transition-colors',
                    trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  $
                  {trade.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="py-3 font-mono font-bold text-gray-300">
                  {trade.amount.toFixed(4)}
                </td>
                <td className="py-3 font-mono text-gray-500 text-right text-sm">
                  {trade.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {trades.length === 0 && (
          <div className="py-12 text-center text-gray-600 font-bold uppercase tracking-widest text-xs animate-pulse">
            Connecting to stream...
          </div>
        )}
      </div>
    </section>
  );
};

export default TradeOverview;
