import React from 'react';
import { fetcher } from '@/lib/coingecko.action';
import { Category, DataTableColumn } from '@/type';
import DataTable from '../DataTable';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

const Categories = async () => {
  const categories = await fetcher<Category[]>(
    '/coins/categories',
    undefined,
    3600
  );

  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'font-semibold text-gray-100',
      cell: (category) => category.name,
    },
    {
      header: 'Market Cap',
      cell: (category) => (
        <p className="font-mono text-gray-300">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(category.market_cap)}
        </p>
      ),
    },
    {
      header: '24h Change',
      cell: (category) => {
        const isUp = category.market_cap_change_24h > 0;
        return (
          <div
            className={cn(
              'flex items-center gap-1 font-medium',
              isUp ? 'text-green-400' : 'text-red-400'
            )}
          >
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <p>{Math.abs(category.market_cap_change_24h).toFixed(2)}%</p>
          </div>
        );
      },
    },
    {
      header: 'Volume (24h)',
      cell: (category) => (
        <p className="font-mono text-gray-300">
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
    <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50 mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-100">Top Categories</h2>
      </div>
      <DataTable
        columns={columns}
        data={categories.slice(0, 10)}
        rowKey={(row) => row.name}
        tableClassName="border-separate border-spacing-y-2"
      />
    </section>
  );
};

export default Categories;
