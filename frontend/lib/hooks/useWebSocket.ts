'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useWebSocket(assets: string[]) {
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (assets.length === 0) return;

    // Using CoinCap WebSocket for simplicity and reliability
    const assetsQuery = assets.join(',');
    const url = `wss://ws.coincap.io/prices?assets=${assetsQuery}`;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices((prev) => ({ ...prev, ...data }));
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      // Attempt to reconnect after 5 seconds
      setTimeout(connect, 5000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      ws.current?.close();
    };
  }, [assets.join(',')]);

  useEffect(() => {
    connect();
    return () => {
      if (ws.current) {
        // Remove onclose listener to prevent reconnection during cleanup
        ws.current.onclose = null;
        ws.current.close();
      }
    };
  }, [connect]);

  return { prices, isConnected };
}
