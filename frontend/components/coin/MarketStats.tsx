'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  BarChart3,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketStatsProps {
  marketData: {
    price_change_percentage_24h_in_currency: { usd: number };
    price_change_percentage_7d_in_currency: { usd: number };
    price_change_percentage_30d_in_currency: { usd: number };
    price_change_percentage_1y_in_currency: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: { usd: number };
  };
}

const StatCard = ({
  label,
  value,
  subValue,
  icon: Icon,
  isPercentage = false,
  change = 0,
}: any) => {
  const isUp = change >= 0;
  return (
    <div className="bg-gray-900/40 p-5 rounded-3xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-purple-600/20 group-hover:text-purple-400 transition-colors">
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-black text-white tracking-tight">
          {value}
        </span>
        {subValue && (
          <div
            className={cn(
              'flex items-center gap-1 text-[11px] font-bold uppercase tracking-tight',
              isPercentage
                ? isUp
                  ? 'text-green-400'
                  : 'text-red-400'
                : 'text-gray-500'
            )}
          >
            {isPercentage &&
              (isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />)}
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
};

const MarketStats = ({ marketData }: MarketStatsProps) => {
  const formatNum = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString('en-US');
  };

  const changes = [
    {
      label: '24h Change',
      val: marketData.price_change_percentage_24h_in_currency?.usd,
      icon: Clock,
    },
    {
      label: '7d Change',
      val: marketData.price_change_percentage_7d_in_currency?.usd,
      icon: Activity,
    },
    {
      label: '30d Change',
      val: marketData.price_change_percentage_30d_in_currency?.usd,
      icon: Activity,
    },
    {
      label: '1y Change',
      val: marketData.price_change_percentage_1y_in_currency?.usd,
      icon: Activity,
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-2">
      {/* Primary Stats */}
      <StatCard
        label="Market Cap"
        value={`$${formatNum(marketData.market_cap.usd)}`}
        subValue="Global Market Share"
        icon={BarChart3}
      />
      <StatCard
        label="24h Volume"
        value={`$${formatNum(marketData.total_volume.usd)}`}
        subValue="Trading Activity"
        icon={PieChart}
      />
      <StatCard
        label="Circulating Supply"
        value={formatNum(marketData.circulating_supply)}
        subValue={`${((marketData.circulating_supply / (marketData.max_supply || marketData.total_supply)) * 100).toFixed(1)}% of total`}
        icon={Activity}
      />
      <StatCard
        label="All Time High"
        value={`$${marketData.ath.usd.toLocaleString('en-US')}`}
        subValue="Market Peak"
        icon={DollarSign}
      />

      {/* Percentage Changes Section */}
      <div className="col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
        {changes.map((item, i) => (
          <StatCard
            key={i}
            label={item.label}
            value={`${item.val?.toFixed(2)}%`}
            subValue={item.val >= 0 ? 'Growth phase' : 'Correction phase'}
            icon={item.icon}
            isPercentage
            change={item.val}
          />
        ))}
      </div>
    </section>
  );
};

export default MarketStats;
