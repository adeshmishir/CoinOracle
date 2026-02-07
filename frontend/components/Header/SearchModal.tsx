'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { fetcher } from '@/lib/coingecko.action';
import { SearchCoin } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchCoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetcher<{ coins: SearchCoin[] }>('/search', {
          query,
        });
        setResults(res.coins.slice(0, 8));
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700/50 transition-all duration-300 text-gray-400 font-medium"
      >
        <Search size={18} />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-900 border border-gray-700 text-[10px] font-black uppercase text-gray-600">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 right-0 md:left-0 w-[90vw] md:w-96 bg-gray-900 border border-gray-800 rounded-[2rem] shadow-2xl overflow-hidden z-[100] backdrop-blur-xl animate-in fade-in zoom-in duration-200 origin-top">
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Input
                autoFocus
                placeholder="Search coins, NFT's..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 py-5 bg-gray-800/50 border-gray-700 rounded-xl focus-visible:ring-purple-500/50"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              {isLoading && (
                <Loader2
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 animate-spin"
                  size={18}
                />
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto custom-scrollbar p-2">
            {results.length > 0 ? (
              results.map((coin) => (
                <Link
                  key={coin.id}
                  href={`/coin/${coin.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={coin.thumb}
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
                  </div>
                  <span className="text-xs font-black text-gray-600 bg-gray-800 px-2 py-1 rounded-lg">
                    #{coin.market_cap_rank || '??'}
                  </span>
                </Link>
              ))
            ) : query ? (
              <div className="py-12 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600">
                  <X size={24} />
                </div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                  No results found
                </p>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-600 text-[11px] font-black uppercase tracking-[0.2em] animate-pulse">
                Type to start searching
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
