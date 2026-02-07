'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickData,
  Time,
  LineData,
  CandlestickSeries,
  LineSeries,
} from 'lightweight-charts';
import { OHLCData } from '@/type';

interface CandlestickChartProps {
  data: OHLCData[];
  colors?: {
    backgroundColor?: string;
    textColor?: string;
  };
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  colors: { backgroundColor = 'transparent', textColor = '#d1d5db' } = {},
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      grid: {
        vertLines: { color: 'rgba(55, 65, 81, 0.5)' },
        horzLines: { color: 'rgba(55, 65, 81, 0.5)' },
      },
      timeScale: {
        borderColor: '#4b5563',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#4b5563',
        autoScale: true,
      },
      crosshair: {
        mode: 0, // CrosshairMode.Normal is 0 in v4/v5
        vertLine: {
          width: 1,
          color: '#9CA3AF',
          style: 3, // LineStyle.Dashed is 3
        },
        horzLine: {
          width: 1,
          color: '#9CA3AF',
          style: 3,
        },
      },
    });

    // Use unified addSeries for v5
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    const smaSeries = chart.addSeries(LineSeries, {
      color: '#F59E0B',
      lineWidth: 2,
      priceLineVisible: false,
      title: 'SMA 7',
    });

    const formattedCandleData: CandlestickData<Time>[] = [];

    // Calculate SMA (7-period)
    const smaPeriod = 7;
    const formattedSmaData: LineData<Time>[] = [];

    data.forEach((item, index) => {
      const time = (item[0] / 1000) as Time;
      const open = item[1];
      const high = item[2];
      const low = item[3];
      const close = item[4];

      formattedCandleData.push({ time, open, high, low, close });

      if (index >= smaPeriod - 1) {
        let sum = 0;
        for (let i = 0; i < smaPeriod; i++) {
          sum += data[index - i][4]; // close price
        }
        formattedSmaData.push({ time, value: sum / smaPeriod });
      }
    });

    candlestickSeries.setData(formattedCandleData);
    smaSeries.setData(formattedSmaData);

    chart.timeScale().fitContent();

    chartRef.current = chart;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, textColor]);

  return <div ref={chartContainerRef} className="w-full h-[350px]" />;
};

export default CandlestickChart;
