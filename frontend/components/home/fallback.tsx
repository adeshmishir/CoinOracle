import React from 'react';
import DataTable from '../DataTable';
import { cn } from '@/lib/utils';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-gray-800 rounded-md', className)} />
);

export const CoinOverviewFallback = () => {
  return (
    <div className="w-full h-full">
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50 h-full flex flex-col justify-center">
        <div className="flex items-center gap-5">
          <div className="p-1 bg-gray-800 rounded-full shrink-0">
            <Skeleton className="w-14 h-14 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-32 h-8" />
          </div>
        </div>
      </section>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  const columns = [
    {
      header: 'Name',
      cell: () => (
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-12 h-3" />
          </div>
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: () => <Skeleton className="w-16 h-4" />,
    },
    {
      header: 'Price',
      cell: () => <Skeleton className="w-20 h-4" />,
    },
  ];

  return (
    <div className="w-full">
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-32 h-7" />
          <Skeleton className="w-16 h-4" />
        </div>
        <DataTable
          columns={columns}
          data={dummyData}
          rowKey={(row) => row.id}
          tableClassName="border-separate border-spacing-y-2"
        />
      </section>
    </div>
  );
};
export const CategoriesFallback = () => {
  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  const columns = [
    {
      header: 'Category',
      cell: () => <Skeleton className="w-32 h-4" />,
    },
    {
      header: 'Market Cap',
      cell: () => <Skeleton className="w-24 h-4" />,
    },
    {
      header: '24h Change',
      cell: () => <Skeleton className="w-16 h-4" />,
    },
    {
      header: 'Volume (24h)',
      cell: () => <Skeleton className="w-24 h-4" />,
    },
  ];

  return (
    <div className="w-full mt-10">
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-32 h-7" />
        </div>
        <DataTable
          columns={columns}
          data={dummyData}
          rowKey={(row) => row.id}
          tableClassName="border-separate border-spacing-y-2"
        />
      </section>
    </div>
  );
};
