import React, { Suspense } from 'react';
import { fetcher } from '@/lib/coingecko.action';
import { CoinMarketData, NextPageProps, SearchCoin } from '@/type';
import DataTable from '@/components/DataTable';
import { DataTableColumn } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, X } from 'lucide-react';
import Pagination from '@/components/coins/Pagination';
import CoinSearch from '@/components/coins/CoinSearch';

const CoinsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const { page = '1', search = '' } = await searchParams;
  const currentPage = parseInt(page);
  const perPage = 10;

  let coins: CoinMarketData[] = [];
  let totalPages = 100; // API Limit for demo is usually around here

  try {
    if (search) {
      // 1. Search for coin IDs
      const searchRes = await fetcher<{ coins: SearchCoin[] }>('/search', {
        query: search,
      });
      const coinIds = searchRes.coins
        .slice(0, 10)
        .map((c) => c.id)
        .join(',');

      if (coinIds) {
        // 2. Fetch markets for those IDs
        coins = await fetcher<CoinMarketData[]>('/coins/markets', {
          vs_currency: 'usd',
          ids: coinIds,
          order: 'market_cap_desc',
          per_page: perPage,
          page: 1, // Search results usually don't need multiple pages of markets
          sparkline: false,
        });
        totalPages = 1;
      }
    } else {
      coins = await fetcher<CoinMarketData[]>('/coins/markets', {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: currentPage,
        sparkline: false,
      });
    }
  } catch (error) {
    console.error('Failed to fetch coins:', error);
  }

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'text-gray-500 font-mono w-16',
      cell: (coin) => `#${coin.market_cap_rank}`,
    },
    {
      header: 'Token',
      cell: (coin) => (
        <Link
          href={`/coin/${coin.id}`}
          className="flex items-center gap-3 group"
        >
          <Image
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-full bg-gray-800"
            style={{ height: 'auto' }}
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-100 group-hover:text-purple-400 transition-colors">
              {coin.name}
            </span>
            <span className="text-xs text-gray-500 uppercase font-semibold">
              {coin.symbol}
            </span>
          </div>
        </Link>
      ),
    },
    {
      header: 'Price',
      cell: (coin) => (
        <span className="font-mono font-bold text-gray-100">
          ${coin.current_price.toLocaleString()}
        </span>
      ),
    },
    {
      header: '24h Change',
      cell: (coin) => {
        const isUp = coin.price_change_percentage_24h > 0;
        return (
          <div
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-xs',
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
            <span>
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        );
      },
    },
    {
      header: 'Market Cap',
      cell: (coin) => (
        <span className="font-mono text-gray-400">
          ${coin.market_cap.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <main className="main-container max-w-7xl mx-auto py-12 px-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Market Overview
          </h1>
          <p className="text-gray-500 font-medium">
            Tracking {totalPages * 10}+ assets across the global market.
          </p>
        </div>
        <CoinSearch />
      </div>

      <div className="bg-gray-900/50 rounded-[2rem] border border-gray-800/50 p-4 md:p-8 shadow-2xl overflow-hidden backdrop-blur-sm relative group">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-700" />

        <div className="relative overflow-x-auto custom-scrollbar">
          <DataTable
            columns={columns}
            data={coins}
            rowKey={(coin) => coin.id}
            tableClassName="border-separate border-spacing-y-3"
            bodyRowClassName="hover:bg-gray-800/40! transition-all duration-300 rounded-xl"
            headerCellClassName="text-[11px] uppercase tracking-[0.2em] font-black text-gray-500 border-none pb-6 px-4"
            bodyCellClassName="px-4 py-5 border-none"
          />
        </div>

        {coins.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600">
              <X size={32} />
            </div>
            <p className="text-gray-400 font-medium">
              No coins found matching "{search}"
            </p>
          </div>
        )}

        {!search && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </main>
  );
};

export default CoinsPage;
