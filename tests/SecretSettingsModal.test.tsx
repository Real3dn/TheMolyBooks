import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SecretSettingsModal } from '../src/components/SecretSettingsModal';

describe('SecretSettingsModal component', () => {
  it('renders editable textareas for Bible and Aristotle punchlines', () => {
    const handleClose = vi.fn();
    const handleSaveBible = vi.fn();
    const handleSaveAristotle = vi.fn();
    const handleReset = vi.fn();

    render(
      <SecretSettingsModal
        isOpen={true}
        onClose={handleClose}
        biblePunchline="Bible Joke"
        aristotlePunchline="Aristotle Joke"
        onSaveBible={handleSaveBible}
        onSaveAristotle={handleSaveAristotle}
        onResetDefaults={handleReset}
      />
    );

    expect(screen.getByText('Secret Configuration')).toBeInTheDocument();
    
    const bibleInput = screen.getByLabelText(/bible punchline/i);
    fireEvent.change(bibleInput, { target: { value: 'New Bible Joke' } });
    
    const saveBtn = screen.getByRole('button', { name: /save & close/i });
    fireEvent.click(saveBtn);

    expect(handleSaveBible).toHaveBeenCalledWith('New Bible Joke');
    expect(handleClose).toHaveBeenCalled();
  });
});
