import { BookOpen, Landmark, Sparkles } from 'lucide-react';
import { CollectionId, CANONS } from '../data/canons';

export interface LibraryScreenProps {
  onSelectCollection: (id: CollectionId) => void;
}

export function LibraryScreen({ onSelectCollection }: LibraryScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full space-y-6 animate-fadeIn">
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canon-gold/10 border border-canon-gold/20 text-canon-gold text-xs font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bibliotheca Antiqua</span>
        </div>
        <h2 className="text-2xl font-cinzel font-bold text-slate-100 tracking-tight">
          Select Canon
        </h2>
        <p className="text-xs text-slate-400 font-serif italic max-w-xs mx-auto">
          Authorized critical translations for research, devotion, and scholarly reading.
        </p>
      </div>

      <div className="space-y-4">
        {/* Bible Card */}
        <button
          onClick={() => onSelectCollection('bible')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-canon-gold/40 active:scale-[0.98] transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-canon-gold/5 rounded-full blur-2xl group-hover:bg-canon-gold/10 transition-colors" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-canon-gold group-hover:scale-105 transition-transform flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80">Canon I</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-sans">66 Books</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-100 mt-1 group-hover:text-amber-300 transition-colors">
                {CANONS.bible.title}
              </h3>
              <p className="text-xs text-slate-400 font-serif mt-1">
                {CANONS.bible.subtitle}
              </p>
            </div>
          </div>
        </button>

        {/* Aristotle Card */}
        <button
          onClick={() => onSelectCollection('aristotle')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-blue-400/40 active:scale-[0.98] transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400/80">Canon II</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-sans">9 Treatises</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-100 mt-1 group-hover:text-blue-300 transition-colors">
                {CANONS.aristotle.title}
              </h3>
              <p className="text-xs text-slate-400 font-serif mt-1">
                {CANONS.aristotle.subtitle}
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="pt-8 text-center">
        <p className="text-[11px] text-slate-500 font-sans">
          Tap any text to begin navigation · Oxford & Vatican Recensions
        </p>
      </div>
    </div>
  );
}
