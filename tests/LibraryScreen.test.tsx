import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LibraryScreen } from '../src/components/LibraryScreen';

describe('LibraryScreen component', () => {
  it('renders Holy Scriptures and Aristotle collection cards', () => {
    const handleSelect = vi.fn();
    render(<LibraryScreen onSelectCollection={handleSelect} />);

    expect(screen.getByText(/The Holy Scriptures/i)).toBeInTheDocument();
    expect(screen.getByText(/Corpus Aristotelicum/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/The Holy Scriptures/i));
    expect(handleSelect).toHaveBeenCalledWith('bible');

    fireEvent.click(screen.getByText(/Corpus Aristotelicum/i));
    expect(handleSelect).toHaveBeenCalledWith('aristotle');
  });
});
