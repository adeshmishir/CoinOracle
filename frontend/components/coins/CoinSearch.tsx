'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const CoinSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('search', query);
        params.set('page', '1'); // Reset to page 1 on search
      } else {
        params.delete('search');
      }
      router.push(`/coins?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <Search size={18} />
      </div>
      <Input
        type="text"
        placeholder="Search for a coin..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-12 pr-10 py-6 bg-gray-900 border-gray-800 rounded-2xl text-gray-100 placeholder:text-gray-600 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all duration-300 shadow-xl"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default CoinSearch;
