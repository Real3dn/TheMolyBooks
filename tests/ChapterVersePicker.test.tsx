import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterVersePicker } from '../src/components/ChapterVersePicker';
import { CANONS } from '../src/data/canons';

describe('ChapterVersePicker component', () => {
  it('renders chapter numbers grid and then verse picker for Bible', () => {
    const handleSelect = vi.fn();
    const genesis = CANONS.bible.books.find(b => b.name === 'Genesis')!;
    
    render(
      <ChapterVersePicker
        book={genesis}
        collectionId="bible"
        onSelectPassage={handleSelect}
      />
    );

    expect(screen.getByText(/Select Chapter/i)).toBeInTheDocument();
    
    // Tap Chapter 1
    const chapterBtn = screen.getByRole('button', { name: '1' });
    fireEvent.click(chapterBtn);

    // Now should prompt for Verse
    expect(screen.getByText(/Select Verse/i)).toBeInTheDocument();
    const verseBtn = screen.getByRole('button', { name: '15' });
    fireEvent.click(verseBtn);

    expect(handleSelect).toHaveBeenCalledWith(1, 15);
  });

  it('navigates directly to passage for Aristotle without verse picker', () => {
    const handleSelect = vi.fn();
    const ethics = CANONS.aristotle.books.find(b => b.name === 'Nicomachean Ethics')!;

    render(
      <ChapterVersePicker
        book={ethics}
        collectionId="aristotle"
        onSelectPassage={handleSelect}
      />
    );

    expect(screen.getByText(/Select Book \/ Chapter/i)).toBeInTheDocument();
    const chapterBtn = screen.getByRole('button', { name: '3' });
    fireEvent.click(chapterBtn);

    // Aristotle directly selects chapter with verse 1
    expect(handleSelect).toHaveBeenCalledWith(3, 1);
    expect(screen.queryByText(/Select Verse/i)).not.toBeInTheDocument();
  });

  it('allows returning from verse picker back to chapter list via All Chapters button', () => {
    const genesis = CANONS.bible.books.find(b => b.name === 'Genesis')!;

    render(
      <ChapterVersePicker
        book={genesis}
        collectionId="bible"
        onSelectPassage={vi.fn()}
      />
    );

    // Click Chapter 2
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText(/Select Verse/i)).toBeInTheDocument();

    // Click All Chapters
    fireEvent.click(screen.getByRole('button', { name: /All Chapters/i }));
    expect(screen.getByText(/Select Chapter/i)).toBeInTheDocument();
  });
});
