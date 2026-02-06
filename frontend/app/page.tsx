import React from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import { DataTableColumn, TrendingCoin } from "@/type";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
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
    header: "24h Change",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
      return (
        <div
          className={cn(
            "flex items-center gap-1 font-medium",
            isTrendingUp ? "text-green-400" : "text-red-400",
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
    header: "Price",
    cellClassName: "price-cell",
    cell: (coin) => {
      const item = coin.item;
      return (
        <p className="font-mono text-gray-100">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.data.price)}
        </p>
      );
    },
  },
];

const dummyData: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      data: {
        price: 89113.0,
        price_change_percentage_24h: { usd: 2.5 },
      },
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      data: {
        price: 2450.5,
        price_change_percentage_24h: { usd: -1.2 },
      },
    },
  },
  {
    item: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      market_cap_rank: 5,
      thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
      large: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      data: {
        price: 105.2,
        price_change_percentage_24h: { usd: 5.8 },
      },
    },
  },
];

const page = () => {
  return (
    <main className="w-full min-h-screen p-6 bg-gray-950 text-white flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {/* Top Section - Coin Overview */}
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
          <div className="flex items-center gap-5">
            <div className="p-1 bg-gray-800 rounded-full">
              <Image
                src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
                alt="Bitcoin"
                width={56}
                height={56}
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-400 font-medium">
                Bitcoin <span className="text-gray-600">/ BTC</span>
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                $89,113.00
              </h1>
            </div>
          </div>
        </section>

        {/* Trending Coins */}
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
            data={dummyData}
            rowKey={(row, index) => index}
            tableClassName="border-separate border-spacing-y-2"
          />
        </section>

        {/* Categories Section */}
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
          <h2 className="text-xl font-bold text-gray-100 mb-5">Categories</h2>
          <div className="text-gray-500 italic">
            Explore various crypto categories...
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
