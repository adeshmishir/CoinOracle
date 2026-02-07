import React, { Suspense } from 'react';
import TrendingCoins from '@/components/home/TrendingCoins';
import CoinOverview from '@/components/home/CoinOverview';
import Categories from '@/components/home/Categories';
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from '@/components/home/fallback';
interface Props {
  searchParams: Promise<{ coinId?: string }>;
}

const Home = async ({ searchParams }: Props) => {
  const { coinId = 'bitcoin' } = await searchParams;

  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />} key={coinId}>
          <CoinOverview coinId={coinId} />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins currentCoinId={coinId} />
        </Suspense>
      </section>
      <Suspense fallback={<CategoriesFallback />}>
        <Categories />
      </Suspense>
    </main>
  );
};

export default Home;
