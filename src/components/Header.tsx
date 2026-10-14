import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onSecretTrigger?: () => void;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  onSecretTrigger
}: HeaderProps) {
  const tapTimesRef = useRef<number[]>([]);
  const [, setRerender] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    // Keep taps from the last 1500ms
    tapTimesRef.current = [...tapTimesRef.current.filter(t => now - t < 1500), now];

    if (tapTimesRef.current.length >= 3) {
      tapTimesRef.current = [];
      if (onSecretTrigger) {
        onSecretTrigger();
      }
    }
    setRerender(n => n + 1);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 pt-3 pb-3 transition-colors">
      <div className="flex items-center justify-between min-h-[44px]">
        <div className="w-16 flex items-center">
          {showBack && onBack && (
            <button
              onClick={onBack}
              aria-label="Back"
              className="flex items-center text-canon-gold active:opacity-60 transition-opacity -ml-1 text-[17px] font-medium"
            >
              <ChevronLeft className="w-6 h-6 -mr-1" />
              <span>Back</span>
            </button>
          )}
        </div>

        <div
          data-testid="header-tap-area"
          onClick={handleTap}
          className="flex-1 text-center cursor-pointer select-none px-2"
        >
          <h1 className="font-cinzel text-base font-bold text-slate-100 tracking-wide truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 font-sans tracking-tight uppercase truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-16 text-right">
          {/* Subtle balanced placeholder */}
          <div className="w-2 h-2 rounded-full bg-slate-800/60 ml-auto mr-1" />
        </div>
      </div>
    </header>
  );
}
