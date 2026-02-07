'use client';

import dynamic from 'next/dynamic';
import { OHLCData } from '@/type';

const CandlestickChart = dynamic(() => import('./CandlestickChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full animate-pulse bg-gray-800/50 rounded-lg" />
  ),
});

interface ChartWrapperProps {
  data: OHLCData[];
}

const ChartWrapper = ({ data }: ChartWrapperProps) => {
  return <CandlestickChart data={data} />;
};

export default ChartWrapper;
