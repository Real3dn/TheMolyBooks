import { useState } from 'react';
import { CollectionId, Book, CANONS } from './data/canons';
import { usePunchlines } from './hooks/usePunchlines';
import { Header } from './components/Header';
import { LibraryScreen } from './components/LibraryScreen';
import { BookListScreen } from './components/BookListScreen';
import { ChapterVersePicker } from './components/ChapterVersePicker';
import { ReaderView } from './components/ReaderView';
import { SecretSettingsModal } from './components/SecretSettingsModal';

type AppView = 'library' | 'books' | 'picker' | 'reader';

export default function App() {
  const [view, setView] = useState<AppView>('library');
  const [selectedCollection, setSelectedCollection] = useState<CollectionId>('bible');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPassage, setSelectedPassage] = useState<{ chapter: number; verse: number }>({ chapter: 1, verse: 1 });
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const {
    biblePunchline,
    aristotlePunchline,
    getPunchline,
    setPunchline,
    resetToDefaults
  } = usePunchlines();

  const handleSelectCollection = (id: CollectionId) => {
    setSelectedCollection(id);
    setView('books');
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView('picker');
  };

  const handleSelectPassage = (chapter: number, verse: number) => {
    setSelectedPassage({ chapter, verse });
    setView('reader');
  };

  const handleBack = () => {
    if (view === 'reader') {
      setView('picker');
    } else if (view === 'picker') {
      setView('books');
    } else if (view === 'books') {
      setView('library');
    }
  };

  const currentCollection = CANONS[selectedCollection];

  const getHeaderProps = () => {
    switch (view) {
      case 'library':
        return {
          title: 'Classical & Sacred Texts',
          subtitle: 'Bibliotheca Critica',
          showBack: false
        };
      case 'books':
        return {
          title: currentCollection.shortTitle,
          subtitle: currentCollection.edition,
          showBack: true
        };
      case 'picker':
        return {
          title: selectedBook?.name || currentCollection.shortTitle,
          subtitle: 'Select Passage',
          showBack: true
        };
      case 'reader':
        return {
          title: currentCollection.formatCitation(
            selectedBook || currentCollection.books[0],
            selectedPassage.chapter,
            selectedPassage.verse
          ).reference,
          subtitle: currentCollection.edition,
          showBack: true
        };
    }
  };

  const headerProps = getHeaderProps();

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Header
        title={headerProps.title}
        subtitle={headerProps.subtitle}
        showBack={headerProps.showBack}
        onBack={handleBack}
        onSecretTrigger={() => setIsSecretOpen(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {view === 'library' && (
          <LibraryScreen onSelectCollection={handleSelectCollection} />
        )}

        {view === 'books' && (
          <BookListScreen
            collectionId={selectedCollection}
            onSelectBook={handleSelectBook}
          />
        )}

        {view === 'picker' && selectedBook && (
          <ChapterVersePicker
            book={selectedBook}
            collectionId={selectedCollection}
            onSelectPassage={handleSelectPassage}
          />
        )}

        {view === 'reader' && selectedBook && (
          <ReaderView
            collectionId={selectedCollection}
            book={selectedBook}
            chapter={selectedPassage.chapter}
            verse={selectedPassage.verse}
            punchline={getPunchline(selectedCollection)}
            onNavigateBack={handleBack}
          />
        )}
      </main>

      <SecretSettingsModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
        biblePunchline={biblePunchline}
        aristotlePunchline={aristotlePunchline}
        onSaveBible={(text) => setPunchline('bible', text)}
        onSaveAristotle={(text) => setPunchline('aristotle', text)}
        onResetDefaults={resetToDefaults}
      />
    </div>
  );
}
