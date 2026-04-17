'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { day: 'Mon', value: 10000, label: 'Mon' },
  { day: 'Tue', value: 10340, label: 'Tue' },
  { day: 'Wed', value: 10180, label: 'Wed' },
  { day: 'Thu', value: 10920, label: 'Thu' },
  { day: 'Fri', value: 11640, label: 'Fri' },
  { day: 'Sat', value: 12880, label: 'Sat' },
  { day: 'Sun', value: 14250, label: 'Sun' },
];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-lg px-3 py-2 border border-[#00ff88]/20">
        <p className="text-xs text-white/40 terminal-font mb-1">{label}</p>
        <p className="text-sm font-bold text-[#00ff88]">
          ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
}

export default function EquityChart() {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00ff88"
            strokeWidth={2}
            fill="url(#greenGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#00ff88', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
