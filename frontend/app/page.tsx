import React, { Suspense } from 'react';
import TrendingCoins from '@/components/home/TrendingCoins';
import CoinOverview from '@/components/home/CoinOverview';
import Categories from '@/components/home/Categories';
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from '@/components/home/fallback';
const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <Suspense fallback={<CategoriesFallback />}>
        <Categories />
      </Suspense>
    </main>
  );
};

export default page;
