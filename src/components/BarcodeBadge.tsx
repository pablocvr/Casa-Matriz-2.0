import { useMemo } from 'react';

interface BarcodeProps {
  value: string;
  className?: string;
  height?: number;
  showText?: boolean;
}

export function BarcodeBadge({ value, className = '', height = 36, showText = true }: BarcodeProps) {
  // Generate deterministic barcode lines based on the SKU string
  const bars = useMemo(() => {
    if (!value) return [];
    const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const result: { width: number; isBlack: boolean }[] = [];
    
    // Guard bars at start
    result.push({ width: 2, isBlack: true });
    result.push({ width: 2, isBlack: false });
    result.push({ width: 2, isBlack: true });

    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      const w1 = (code % 3) + 1;
      const w2 = ((code * 2) % 3) + 1;
      const w3 = ((code + hash) % 2) + 1;
      result.push({ width: w1, isBlack: true });
      result.push({ width: w2, isBlack: false });
      result.push({ width: w3, isBlack: true });
      result.push({ width: 1, isBlack: false });
    }

    // Guard bars at end
    result.push({ width: 2, isBlack: true });
    result.push({ width: 2, isBlack: false });
    result.push({ width: 2, isBlack: true });

    return result;
  }, [value]);

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div 
        className="flex items-stretch bg-white px-2 py-1 rounded border border-slate-200"
        style={{ height: `${height}px` }}
      >
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`${bar.isBlack ? 'bg-slate-900' : 'bg-transparent'}`}
            style={{ width: `${bar.width * 1.5}px` }}
          />
        ))}
      </div>
      {showText && (
        <span className="font-mono text-[11px] tracking-wider text-slate-600 mt-1 font-semibold">
          {value || '0000000000000'}
        </span>
      )}
    </div>
  );
}
