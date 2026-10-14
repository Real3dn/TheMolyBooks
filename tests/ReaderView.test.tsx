import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ReaderView } from '../src/components/ReaderView';
import { CANONS } from '../src/data/canons';

describe('ReaderView component', () => {
  it('renders scholarly citation header, apparatus, and custom punchline', () => {
    const book = CANONS.bible.books.find(b => b.name === 'Romans')!;
    const punchline = 'Thou art exceptionally fine; bestow thy Instagram.';
    const handleBack = vi.fn();

    render(
      <ReaderView
        collectionId="bible"
        book={book}
        chapter={8}
        verse={28}
        punchline={punchline}
        onNavigateBack={handleBack}
      />
    );

    expect(screen.getByText(/Romans 8:28/i)).toBeInTheDocument();
    expect(screen.getByText(punchline)).toBeInTheDocument();
    expect(screen.getByText(/Novum Testamentum Graece/i)).toBeInTheDocument();
  });

  it('allows copying verse text to clipboard', async () => {
    const book = CANONS.bible.books[0];
    const punchline = 'Punchline test';
    
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    render(
      <ReaderView
        collectionId="bible"
        book={book}
        chapter={1}
        verse={1}
        punchline={punchline}
        onNavigateBack={() => {}}
      />
    );

    const copyBtn = screen.getByRole('button', { name: /copy/i });
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining(punchline));
  });

  it('renders Aristotle classical citations correctly with Bekker numbering', () => {
    const book = CANONS.aristotle.books.find(b => b.name === 'Metaphysics')!;
    const punchline = 'All men by nature desire to know thy handle.';
    const handleBack = vi.fn();

    render(
      <ReaderView
        collectionId="aristotle"
        book={book}
        chapter={1}
        verse={1}
        punchline={punchline}
        onNavigateBack={handleBack}
      />
    );

    expect(screen.getByText(/Metaphysics, Book I/i)).toBeInTheDocument();
    expect(screen.getByText(punchline)).toBeInTheDocument();
    expect(screen.getByText(/Scriptorum Classicorum/i)).toBeInTheDocument();
    expect(screen.getByText(/Bekker pagination/i)).toBeInTheDocument();
  });

  it('triggers onNavigateBack when "Select another passage" is clicked', () => {
    const book = CANONS.bible.books[0];
    const handleBack = vi.fn();

    render(
      <ReaderView
        collectionId="bible"
        book={book}
        chapter={1}
        verse={1}
        punchline="Back test"
        onNavigateBack={handleBack}
      />
    );

    const backBtn = screen.getByRole('button', { name: /select another passage/i });
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('supports navigator.share when available', async () => {
    const book = CANONS.bible.books[0];
    const punchline = 'Share test';
    const mockShare = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      share: mockShare,
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    render(
      <ReaderView
        collectionId="bible"
        book={book}
        chapter={1}
        verse={1}
        punchline={punchline}
        onNavigateBack={() => {}}
      />
    );

    const shareBtn = screen.getByRole('button', { name: /share/i });
    await act(async () => {
      fireEvent.click(shareBtn);
    });
    expect(mockShare).toHaveBeenCalledWith(expect.objectContaining({
      text: expect.stringContaining(punchline)
    }));
  });

  it('does not fall back to copy when native share is cancelled (AbortError)', async () => {
    const book = CANONS.bible.books[0];
    const punchline = 'Share cancel test';
    const abortErr = new Error('Share canceled');
    abortErr.name = 'AbortError';
    const mockShare = vi.fn().mockRejectedValue(abortErr);
    const mockWriteText = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      share: mockShare,
      clipboard: {
        writeText: mockWriteText
      }
    });

    render(
      <ReaderView
        collectionId="bible"
        book={book}
        chapter={1}
        verse={1}
        punchline={punchline}
        onNavigateBack={() => {}}
      />
    );

    const shareBtn = screen.getByRole('button', { name: /share/i });
    await act(async () => {
      fireEvent.click(shareBtn);
    });

    expect(mockShare).toHaveBeenCalledTimes(1);
    expect(mockWriteText).not.toHaveBeenCalled();
    expect(screen.queryByText(/Copied Reference/i)).not.toBeInTheDocument();
  });
});
