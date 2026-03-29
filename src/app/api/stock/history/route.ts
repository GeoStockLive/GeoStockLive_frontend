import { NextResponse } from 'next/server';

const API_KEY = '7c48d5d9a40542aa853b812fba65dff7';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval') || '5min';

  console.log(`[PROXY] Incoming request for: ${symbol} (${interval})`);

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const url = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&apikey=${API_KEY}&outputsize=100`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GeoStockLive-Dashboard/1.0',
      },
    });
    
    if (!response.ok) {
      console.error(`[PROXY] Twelve Data API returned status: ${response.status}`);
      return NextResponse.json({ error: `External API error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    console.log(`[PROXY] Successfully retrieved data for ${symbol}`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[PROXY] Error fetching from Twelve Data:', error.message);
    return NextResponse.json({ error: `Proxy failure: ${error.message}` }, { status: 500 });
  }
}
