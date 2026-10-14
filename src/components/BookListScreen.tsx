import { useState, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { CollectionId, Book, CANONS } from '../data/canons';

export interface BookListScreenProps {
  collectionId: CollectionId;
  onSelectBook: (book: Book) => void;
}

export function BookListScreen({ collectionId, onSelectBook }: BookListScreenProps) {
  const collection = CANONS[collectionId];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const sections = useMemo(() => {
    const set = new Set<string>();
    collection.books.forEach(b => set.add(b.section));
    return Array.from(set);
  }, [collection]);

  const filteredBooks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return collection.books.filter(b => {
      const matchesSearch = !query || b.name.toLowerCase().includes(query) ||
                            b.abbr.toLowerCase().includes(query);
      const matchesSection = selectedSection === 'all' || b.section === selectedSection;
      return matchesSearch && matchesSection;
    });
  }, [collection, searchTerm, selectedSection]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden max-w-md mx-auto w-full animate-fadeIn">
      {/* Search Bar */}
      <div className="p-4 pb-2 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            aria-label="Search books or treatises"
            placeholder="Search books or treatises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-base focus:outline-none focus:border-canon-gold/60"
          />
        </div>

        {/* Section Pills */}
        {sections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedSection === 'all'
                  ? 'bg-canon-gold text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              All ({collection.books.length})
            </button>
            {sections.map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSection === sec
                    ? 'bg-canon-gold text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Book List */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-1.5 divide-y divide-slate-800/40">
        {filteredBooks.map((book) => (
          <button
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-slate-900 active:bg-slate-800 transition-colors text-left group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-semibold text-slate-200 group-hover:text-canon-gold transition-colors">
                  {book.name}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {book.abbr}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                {book.chapters} {collectionId === 'aristotle' ? 'Books / Parts' : 'Chapters'}
                {book.subtitle && ` · ${book.subtitle}`}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-canon-gold transition-colors" />
          </button>
        ))}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No matching books found.
          </div>
        )}
      </div>
    </div>
  );
}
