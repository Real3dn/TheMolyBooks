import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Full Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('completes the full flow: Select Bible -> Select Book -> Select Chapter -> Select Verse -> Read Punchline', () => {
    render(<App />);

    // 1. Library: Tap Holy Scriptures
    fireEvent.click(screen.getByText(/The Holy Scriptures/i));

    // 2. Books: Tap Genesis
    fireEvent.click(screen.getByText('Genesis'));

    // 3. Chapters: Tap Chapter 1
    fireEvent.click(screen.getByRole('button', { name: '1' }));

    // 4. Verses: Tap Verse 1
    fireEvent.click(screen.getByRole('button', { name: '1' }));

    // 5. Reader View
    expect(screen.getAllByText(/Genesis 1:1/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Truly, truly I say unto thee/i)).toBeInTheDocument();
  });

  it('opens secret settings on triple tap of header and updates punchline', () => {
    render(<App />);

    // Tap header 3 times
    const headerTap = screen.getByTestId('header-tap-area');
    fireEvent.click(headerTap);
    fireEvent.click(headerTap);
    fireEvent.click(headerTap);

    expect(screen.getByText('Secret Configuration')).toBeInTheDocument();

    // Change punchline in the textarea
    const bibleInput = screen.getByLabelText(/bible punchline/i);
    fireEvent.change(bibleInput, { target: { value: 'Custom updated punchline text!' } });

    // Click Save & Close
    const saveBtn = screen.getByRole('button', { name: /save & close/i });
    fireEvent.click(saveBtn);

    // Modal should close
    expect(screen.queryByText('Secret Configuration')).not.toBeInTheDocument();

    // Navigate to reader view to verify updated punchline renders
    fireEvent.click(screen.getByText(/The Holy Scriptures/i));
    fireEvent.click(screen.getByText('Genesis'));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));

    expect(screen.getByText('Custom updated punchline text!')).toBeInTheDocument();
  });

  it('clears selectedBook when switching collections', () => {
    render(<App />);

    // Select Bible -> Genesis -> Chapter picker
    fireEvent.click(screen.getByText(/The Holy Scriptures/i));
    fireEvent.click(screen.getByText('Genesis'));
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();

    // Navigate back to Library
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText(/Corpus Aristotelicum/i)).toBeInTheDocument();

    // Switch to Aristotle -> Should display Aristotle book list, not Chapter picker
    fireEvent.click(screen.getByText(/Corpus Aristotelicum/i));
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
