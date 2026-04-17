'use client';

import { useState, useEffect } from 'react';

const BASE_CANDLES = [
  { open: 148.2, close: 152.4, high: 153.8, low: 146.5 },
  { open: 152.4, close: 149.1, high: 154.2, low: 148.0 },
  { open: 149.1, close: 155.8, high: 157.1, low: 148.6 },
  { open: 155.8, close: 153.2, high: 156.9, low: 152.0 },
  { open: 153.2, close: 158.6, high: 160.1, low: 152.8 },
  { open: 158.6, close: 157.1, high: 161.2, low: 156.4 },
];

function Candle({
  candle,
  minPrice,
  range,
  chartH,
}: {
  candle: typeof BASE_CANDLES[0];
  minPrice: number;
  range: number;
  chartH: number;
}) {
  const isGreen = candle.close >= candle.open;
  const color = isGreen ? '#00ff88' : '#ff4d6d';
  const glow = isGreen ? 'rgba(0,255,136,0.5)' : 'rgba(255,77,109,0.5)';

  const toY = (p: number) => chartH - ((p - minPrice) / range) * chartH;

  const bodyTop = Math.min(toY(candle.open), toY(candle.close));
  const bodyH = Math.max(Math.abs(toY(candle.open) - toY(candle.close)), 2);
  const wickTop = toY(candle.high);
  const wickBot = toY(candle.low);

  return (
    <g>
      <line
        x1="6" x2="6"
        y1={wickTop} y2={wickBot}
        stroke={color} strokeWidth="1" opacity="0.6"
      />
      <rect
        x="1" y={bodyTop}
        width="10" height={bodyH}
        rx="1"
        fill={color}
        style={{ filter: `drop-shadow(0 0 3px ${glow})` }}
      />
    </g>
  );
}

export default function MiniCandleChart() {
  const [candles, setCandles] = useState(BASE_CANDLES);
  const [price, setPrice] = useState(157.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => {
        const delta = (Math.random() - 0.48) * 0.8;
        return parseFloat((p + delta).toFixed(2));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const chartH = 60;
  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices) - 1;
  const maxPrice = Math.max(...allPrices) + 1;
  const range = maxPrice - minPrice;

  const change24h = +2.84;

  return (
    <div className="p-4 border-b border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
            <span className="text-[7px] font-bold text-white">◎</span>
          </div>
          <span className="text-xs font-semibold text-white/80">SOL / USDC</span>
        </div>
        <span className="text-[10px] text-white/25 terminal-font uppercase tracking-wider">1m</span>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-lg font-bold text-white terminal-font tabular-nums">${price.toFixed(2)}</span>
        <span className={`text-xs font-semibold ${change24h >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>
          {change24h >= 0 ? '+' : ''}{change24h}%
        </span>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: chartH + 12 }}>
        <div
          className="absolute inset-0 rounded-lg"
          style={{ background: 'linear-gradient(180deg, rgba(0,255,136,0.03) 0%, transparent 100%)' }}
        />
        <svg width="100%" height={chartH} viewBox={`0 0 ${BASE_CANDLES.length * 14} ${chartH}`} preserveAspectRatio="none">
          {candles.map((c, i) => (
            <g key={i} transform={`translate(${i * 14}, 0)`}>
              <Candle candle={c} minPrice={minPrice} range={range} chartH={chartH} />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#090909] to-transparent" />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-white/20 terminal-font">24h Vol: $2.1B</span>
        <span className="text-[10px] text-white/20 terminal-font">Mkt: $72.4B</span>
      </div>
    </div>
  );
}
