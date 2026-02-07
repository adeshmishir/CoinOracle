import React, { Suspense } from 'react';
import { fetcher } from '@/lib/coingecko.action';
import { CoinDetailsData, OHLCData } from '@/type';
import PriceHeader from '@/components/coin/PriceHeader';
import AboutCoin from '@/components/coin/AboutCoin';
import Converter from '@/components/coin/Converter';
import TradeOverview from '@/components/coin/TradeOverview';
import ChartWrapper from '@/components/home/ChartWrapper';
import MarketStats from '@/components/coin/MarketStats';

interface CoinPageProps {
  params: Promise<{ id: string }>;
}

const CoinPage = async ({ params }: CoinPageProps) => {
  const { id } = await params;

  let coin: CoinDetailsData | null = null;
  let ohlcData: OHLCData[] = [];

  try {
    const [coinRes, ohlcRes] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}`, {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: 'usd',
        days: '1',
      }),
    ]);
    coin = coinRes;
    ohlcData = ohlcRes;
  } catch (error) {
    console.error('Failed to fetch coin data:', error);
  }

  if (!coin) {
    return (
      <div className="main-container min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center text-red-500 shadow-2xl border border-gray-800">
          <span className="text-4xl font-black">!</span>
        </div>
        <h1 className="text-2xl font-black text-white">Coin Not Found</h1>
        <p className="text-gray-500 font-medium">
          The cryptocurrency you're looking for doesn't exist or is unavailable.
        </p>
      </div>
    );
  }

  return (
    <main className="main-container min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* 1. Price Header - Stays Heroic */}
      <PriceHeader coin={coin} />

      {/* 2. Key Market Stats - New Grill Layout */}
      <MarketStats marketData={coin.market_data} />

      {/* 3. Main Grid - Balanced Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Chart Area) - Span 8 */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-gray-900/50 p-6 md:p-10 rounded-[2.5rem] border border-gray-800/50 shadow-2xl backdrop-blur-sm overflow-hidden h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black text-white">
                  Live Analysis
                </h2>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  Real-time Candlestick Feed
                </p>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">
                  Connected
                </span>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <ChartWrapper data={ohlcData} />
            </div>
          </section>

          {/* About Section - Now secondary but clean */}
          <div className="hidden lg:block">
            <AboutCoin name={coin.name} description={coin.description.en} />
          </div>
        </div>

        {/* Right Column (Tools & Trades) - Span 4 */}
        <div className="lg:col-span-4 space-y-8">
          <TradeOverview
            coinId={coin.id}
            initialPrice={coin.market_data.current_price.usd}
          />
          <Converter coin={coin} />

          {/* Mobile About View */}
          <div className="lg:hidden">
            <AboutCoin name={coin.name} description={coin.description.en} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoinPage;
