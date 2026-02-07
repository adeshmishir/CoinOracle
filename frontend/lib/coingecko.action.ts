'use server';
import qs from 'query-string';
import { QueryParams } from '@/type';
const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) {
  throw new Error('COINGECKO_BASE_URL is not defined');
}

if (!API_KEY) {
  throw new Error('COINGECKO_API_KEY is not defined');
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );
  const isPro = BASE_URL!.includes('pro-api');
  const response = await fetch(url, {
    headers: {
      [isPro ? 'X-cg-pro-api-key' : 'x-cg-demo-api-key']: API_KEY!,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: {
      revalidate,
    },
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error('CoinGecko API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      error: errorBody,
    });
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`
    );
  }
  const data = await response.json();
  return data;
}
