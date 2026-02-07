import React from 'react';
import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.action';
import { CoinDetailsData, TrendingCoin } from '@/type';
import Link from 'next/link';
import DataTable from '../DataTable';
import { DataTableColumn } from '@/type';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    '/search/trending',
    undefined,
    300
  );
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link
            href={`/coin/${item.id}`}
            className="group hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.large}
                alt={item.name}
                width={32}
                height={32}
                className="rounded-full bg-gray-800"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-100">{item.name}</p>
                <p className="text-xs text-gray-400 uppercase">{item.symbol}</p>
              </div>
            </div>
          </Link>
        );
      },
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div
            className={cn(
              'flex items-center gap-1 font-medium',
              isTrendingUp ? 'text-green-400' : 'text-red-400'
            )}
          >
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            <p>
              {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
            </p>
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <p className="font-mono text-gray-100">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.data.price)}
          </p>
        );
      },
    },
  ];

  return (
    <div>
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-100">Trending Coins</h2>
          <Link
            href="/trending"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            View All
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={trendingCoins.coins.slice(0, 6) || []}
          rowKey={(row, index) => index}
          tableClassName="border-separate border-spacing-y-2"
        />
      </section>
    </div>
  );
};

export default TrendingCoins;
