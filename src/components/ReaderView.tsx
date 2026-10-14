import { useState } from 'react';
import { Copy, Check, Bookmark, Share2 } from 'lucide-react';
import { CollectionId, Book, CANONS } from '../data/canons';

export interface ReaderViewProps {
  collectionId: CollectionId;
  book: Book;
  chapter: number;
  verse: number;
  punchline: string;
  onNavigateBack: () => void;
}

export function ReaderView({
  collectionId,
  book,
  chapter,
  verse,
  punchline,
  onNavigateBack
}: ReaderViewProps) {
  const [copied, setCopied] = useState(false);
  const collection = CANONS[collectionId];
  const citation = collection.formatCitation(book, chapter, verse);

  const handleCopy = () => {
    const fullText = `"${punchline}" — ${citation.reference} (${collection.edition})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const fullText = `"${punchline}" — ${citation.reference} (${collection.edition})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: citation.reference,
          text: fullText,
        });
        return;
      } catch {
        // Fall back to copy if cancelled or unsupported
      }
    }
    handleCopy();
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 max-w-md mx-auto w-full space-y-5 animate-fadeIn">
      {/* Authentic Academic Card */}
      <div className="bg-paper-100 text-paper-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-paper-300 relative overflow-hidden transition-all">
        {/* Subtle decorative header bar */}
        <div className="border-b border-paper-300 pb-3 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-900/60 block">
              {collection.edition}
            </span>
            <h2 className="text-xl font-cinzel font-bold text-paper-900 tracking-tight">
              {citation.reference}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-paper-900/40">
            <Bookmark className="w-4 h-4" />
          </div>
        </div>

        {/* Text Presentation */}
        <div className="py-2">
          <p className="font-serif text-[19px] leading-relaxed text-paper-900/90 text-justify tracking-normal">
            <span className="font-mono text-xs font-bold text-canon-burgundy mr-2 align-super">
              {citation.prefix}
            </span>
            {punchline}
          </p>
        </div>

        {/* Critical Apparatus / Footnote */}
        <div className="mt-8 pt-4 border-t border-paper-300/80 text-[11px] text-paper-900/60 font-serif space-y-1">
          <p className="italic">
            {citation.apparatus}
          </p>
          <p className="text-[10px] font-mono text-paper-900/40 uppercase">
            Cod. Oxon. Bibl. Bodl. MS Gr. class. d. 14 · Fol. 42r
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied Reference</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Verse</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-canon-gold active:scale-95 transition-all shadow-md"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary navigation option */}
      <div className="text-center pt-2">
        <button
          onClick={onNavigateBack}
          className="text-xs text-slate-400 hover:text-canon-gold transition-colors font-sans"
        >
          Select another passage
        </button>
      </div>
    </div>
  );
}
