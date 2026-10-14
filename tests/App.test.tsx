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
  });
});
