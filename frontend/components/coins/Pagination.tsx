'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/coins?${params.toString()}`);
  };

  const renderPageButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={cn(
            'w-10 h-10 rounded-xl font-bold transition-all duration-200',
            currentPage === i
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
              : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
          )}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 py-8 border-t border-gray-800/50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
      >
        <ChevronsLeft size={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
      >
        <ChevronLeft size={20} />
      </Button>

      <div className="flex items-center gap-2 mx-4">{renderPageButtons()}</div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
      >
        <ChevronRight size={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
      >
        <ChevronsRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
