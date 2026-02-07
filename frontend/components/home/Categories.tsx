import React from 'react';
import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.action';
import { Category, DataTableColumn } from '@/type';
import DataTable from '../DataTable';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Info } from 'lucide-react';

const Categories = async () => {
  const categories = await fetcher<Category[]>(
    '/coins/categories',
    undefined,
    3600
  );

  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'font-bold text-gray-100',
      cell: (category) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-100">{category.name}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
            Asset Class
          </span>
        </div>
      ),
    },
    {
      header: 'Top Coins',
      cell: (category) => (
        <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300 group">
          {category.top_3_coins.map((imgUrl, i) => (
            <div
              key={i}
              className="relative w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 shadow-lg ring-1 ring-white/5 overflow-hidden transform group-hover:scale-110 transition-transform duration-300"
              style={{ zIndex: 3 - i }}
            >
              <Image
                src={imgUrl}
                alt="coin"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: (category) => {
        const isUp = category.market_cap_change_24h > 0;
        return (
          <div
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-xs shadow-sm shadow-black/20',
              isUp
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            )}
          >
            {isUp ? (
              <TrendingUp size={12} strokeWidth={3} />
            ) : (
              <TrendingDown size={12} strokeWidth={3} />
            )}
            <span>{Math.abs(category.market_cap_change_24h).toFixed(2)}%</span>
          </div>
        );
      },
    },
    {
      header: 'Market Cap',
      cell: (category) => (
        <div className="flex flex-col items-start">
          <p className="font-mono text-gray-100 text-sm font-semibold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(category.market_cap)}
          </p>
          <div className="w-16 h-1 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: '65%' }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Volume (24h)',
      cell: (category) => (
        <p className="font-mono text-gray-400 text-sm">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(category.volume_24h)}
        </p>
      ),
    },
  ];

  return (
    <section className="bg-gray-900 p-8 rounded-[2rem] shadow-2xl border border-gray-800/50 mt-12 mb-20 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />

      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Market Categories
          </h2>
          <Info
            size={16}
            className="text-gray-600 hover:text-gray-400 cursor-help transition-colors"
          />
        </div>
        <p className="text-gray-500 text-sm font-medium">
          Top performing sectors in the last 24 hours.
        </p>
      </div>

      <div className="relative">
        <DataTable
          columns={columns}
          data={categories.slice(0, 10)}
          rowKey={(row) => row.name}
          tableClassName="border-separate border-spacing-y-3"
          bodyRowClassName="hover:bg-gray-800/40! transition-all duration-300 rounded-xl"
          headerCellClassName="text-[11px] uppercase tracking-[0.2em] font-black text-gray-500 border-none pb-6"
        />
      </div>
    </section>
  );
};

export default Categories;
