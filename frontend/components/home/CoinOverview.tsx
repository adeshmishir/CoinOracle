import React from 'react';
import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.action';
import { CoinDetailsData, OHLCData } from '@/type';

import ChartWrapper from './ChartWrapper';
import LivePriceIndicator from './LivePriceIndicator';

const CoinOverview = async ({ coinId = 'bitcoin' }: { coinId?: string }) => {
  let coin: CoinDetailsData | null = null;
  let ohlcData: OHLCData[] = [];

  try {
    const [coinRes, ohlcRes] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${coinId}`),
      fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: 'usd',
        days: '1',
      }),
    ]);
    coin = coinRes;
    ohlcData = ohlcRes;
  } catch (error) {
    console.error('Failed to fetch data for CoinOverview:', error);
  }

  if (!coin) {
    return (
      <div className="h-full">
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50 h-full flex flex-col items-center justify-center text-gray-400">
          <p>Failed to load coin data.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="h-full">
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50 h-full flex flex-col gap-6">
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
            <div className="flex items-center gap-2">
              <p className="text-gray-400 font-medium whitespace-nowrap">
                {coin.name}
                <span className="text-gray-600 ml-1">
                  / {coin.symbol.toUpperCase()}
                </span>
              </p>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  coin.market_data.price_change_percentage_24h_in_currency
                    .usd >= 0
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                  2
                )}
                %
              </span>
            </div>
            <LivePriceIndicator
              coinId={coin.id}
              initialPrice={coin.market_data.current_price.usd}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 min-h-[300px] bg-gray-950/30 rounded-xl p-2 border border-blue-500/10 flex items-center justify-center">
          {ohlcData && ohlcData.length > 0 ? (
            <ChartWrapper data={ohlcData} />
          ) : (
            <p className="text-gray-500 text-sm">
              No chart data available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoinOverview;
