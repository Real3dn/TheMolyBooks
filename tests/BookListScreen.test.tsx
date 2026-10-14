import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookListScreen } from '../src/components/BookListScreen';

describe('BookListScreen component', () => {
  it('renders list of books with search filtering', () => {
    const handleSelect = vi.fn();
    render(<BookListScreen collectionId="bible" onSelectBook={handleSelect} />);

    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Matthew')).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox', { name: /search books or treatises/i });
    expect(searchInput.className).toContain('text-base');
    fireEvent.change(searchInput, { target: { value: '  Rom  ' } });

    expect(screen.getByText('Romans')).toBeInTheDocument();
    expect(screen.queryByText('Genesis')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Romans'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Romans' }));
  });

  it('filters books by section pill', () => {
    const handleSelect = vi.fn();
    render(<BookListScreen collectionId="bible" onSelectBook={handleSelect} />);

    // Click 'New Testament' section pill
    const ntPill = screen.getByRole('button', { name: 'New Testament' });
    fireEvent.click(ntPill);

    expect(screen.getByText('Matthew')).toBeInTheDocument();
    expect(screen.getByText('Romans')).toBeInTheDocument();
    expect(screen.queryByText('Genesis')).not.toBeInTheDocument();
    expect(screen.queryByText('Exodus')).not.toBeInTheDocument();
  });

  it('displays empty state when no books match search', () => {
    render(<BookListScreen collectionId="bible" onSelectBook={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/search books/i);
    fireEvent.change(searchInput, { target: { value: 'xyznonexistent' } });

    expect(screen.getByText('No matching books found.')).toBeInTheDocument();
  });

  it('renders Aristotle treatises correctly', () => {
    const handleSelect = vi.fn();
    render(<BookListScreen collectionId="aristotle" onSelectBook={handleSelect} />);

    expect(screen.getByText('Nicomachean Ethics')).toBeInTheDocument();
    expect(screen.getByText('Metaphysics')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Nicomachean Ethics'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Nicomachean Ethics' }));
  });
});
