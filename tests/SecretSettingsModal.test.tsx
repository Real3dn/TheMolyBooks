import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SecretSettingsModal } from '../src/components/SecretSettingsModal';

describe('SecretSettingsModal component', () => {
  it('renders editable textareas for Bible and Aristotle punchlines and saves both', () => {
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

    const aristotleInput = screen.getByLabelText(/aristotle punchline/i);
    fireEvent.change(aristotleInput, { target: { value: 'New Aristotle Joke' } });
    
    const saveBtn = screen.getByRole('button', { name: /save & close/i });
    fireEvent.click(saveBtn);

    expect(handleSaveBible).toHaveBeenCalledWith('New Bible Joke');
    expect(handleSaveAristotle).toHaveBeenCalledWith('New Aristotle Joke');
    expect(handleClose).toHaveBeenCalled();
  });

  it('triggers onResetDefaults and closes when Reset Defaults is clicked', () => {
    const handleClose = vi.fn();
    const handleReset = vi.fn();

    render(
      <SecretSettingsModal
        isOpen={true}
        onClose={handleClose}
        biblePunchline="Bible Joke"
        aristotlePunchline="Aristotle Joke"
        onSaveBible={vi.fn()}
        onSaveAristotle={vi.fn()}
        onResetDefaults={handleReset}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /reset defaults/i });
    fireEvent.click(resetBtn);

    expect(handleReset).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes when the close X button is clicked', () => {
    const handleClose = vi.fn();

    render(
      <SecretSettingsModal
        isOpen={true}
        onClose={handleClose}
        biblePunchline="Bible Joke"
        aristotlePunchline="Aristotle Joke"
        onSaveBible={vi.fn()}
        onSaveAristotle={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /^close$/i });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalled();
  });

  it('does not render anything when isOpen is false', () => {
    const { container } = render(
      <SecretSettingsModal
        isOpen={false}
        onClose={vi.fn()}
        biblePunchline="Bible Joke"
        aristotlePunchline="Aristotle Joke"
        onSaveBible={vi.fn()}
        onSaveAristotle={vi.fn()}
        onResetDefaults={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
