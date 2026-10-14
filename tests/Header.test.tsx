import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../src/components/Header';

describe('Header component', () => {
  it('renders title and back button when requested', () => {
    const handleBack = vi.fn();
    render(<Header title="Select Book" showBack onBack={handleBack} />);
    expect(screen.getByText('Select Book')).toBeInTheDocument();
    
    const backBtn = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('triggers secret callback on 3 rapid taps within 1.5 seconds', () => {
    const handleSecret = vi.fn();
    render(<Header title="Sacred Texts" onSecretTrigger={handleSecret} />);
    
    const titleArea = screen.getByTestId('header-tap-area');
    fireEvent.click(titleArea);
    fireEvent.click(titleArea);
    fireEvent.click(titleArea);

    expect(handleSecret).toHaveBeenCalledTimes(1);
  });
});
