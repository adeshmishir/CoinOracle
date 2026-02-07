'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SearchModal from './Header/SearchModal';
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-dark-700/80 backdrop-blur-md border-b border-dark-400">
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="CoinOracle"
            width={132}
            height={40}
            priority
            style={{ height: 'auto' }}
          />
        </Link>
        <nav>
          <Link
            href="/"
            className={cn('nav-link', {
              'is-active': pathname === '/',
              'is-home': true,
            })}
          >
            Home
          </Link>
          <SearchModal />
          <Link
            href="/coins"
            className={cn('nav-link', { 'is-active': pathname === '/coins' })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
}
