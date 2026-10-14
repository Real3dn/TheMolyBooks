import { useState } from 'react';
import { CollectionId, Book } from '../data/canons';
import { ChevronLeft } from 'lucide-react';

export interface ChapterVersePickerProps {
  book: Book;
  collectionId: CollectionId;
  onSelectPassage: (chapter: number, verse: number) => void;
}

export function ChapterVersePicker({
  book,
  collectionId,
  onSelectPassage
}: ChapterVersePickerProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
  // Realistic simulated verse count (e.g. 25-35 verses)
  const verses = Array.from({ length: 30 }, (_, i) => i + 1);

  const isBible = collectionId === 'bible';

  const handleChapterClick = (ch: number) => {
    if (isBible) {
      setSelectedChapter(ch);
    } else {
      // Aristotle navigates directly by book/chapter
      onSelectPassage(ch, 1);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full animate-fadeIn">
      {/* Chapter View */}
      {selectedChapter === null ? (
        <div className="space-y-4">
          <div className="text-center pb-2">
            <h2 className="text-xl font-cinzel font-bold text-slate-100">
              {book.name}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Select {collectionId === 'aristotle' ? 'Book / Chapter' : 'Chapter'}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {chapters.map((ch) => (
              <button
                key={ch}
                onClick={() => handleChapterClick(ch)}
                className="aspect-square flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-base font-serif font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-sm"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Verse View (Bible) */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center text-xs text-canon-gold hover:underline font-sans"
            >
              <ChevronLeft className="w-4 h-4 mr-0.5" />
              All Chapters
            </button>
            <div className="text-center">
              <h2 className="text-lg font-cinzel font-bold text-slate-100">
                {book.name} {selectedChapter}
              </h2>
              <p className="text-[11px] text-slate-400 font-sans">
                Select Verse
              </p>
            </div>
            <div className="w-16" />
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {verses.map((v) => (
              <button
                key={v}
                onClick={() => onSelectPassage(selectedChapter, v)}
                className="aspect-square flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-base font-serif font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-sm"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
