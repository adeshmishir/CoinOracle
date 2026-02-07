import React from 'react';
import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.action';
import { CoinDetailsData } from '@/type';
const CoinOverview = async () => {
  const coin = await fetcher<CoinDetailsData>('/coins/bitcoin');
  return (
    <div>
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50 h-full flex flex-col justify-center">
        {/* Top Section - Coin Overview */}
        <div className="flex items-center gap-5">
          <div className="p-1 bg-gray-800 rounded-full shrink-0">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-400 font-medium whitespace-nowrap">
              {coin.name}{' '}
              <span className="text-gray-600">
                / {coin.symbol.toUpperCase()}
              </span>
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              ${coin.market_data.current_price.usd}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoinOverview;
