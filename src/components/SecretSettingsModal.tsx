import { useState, useEffect } from 'react';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface SecretSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  biblePunchline: string;
  aristotlePunchline: string;
  onSaveBible: (text: string) => void;
  onSaveAristotle: (text: string) => void;
  onResetDefaults: () => void;
}

export function SecretSettingsModal({
  isOpen,
  onClose,
  biblePunchline,
  aristotlePunchline,
  onSaveBible,
  onSaveAristotle,
  onResetDefaults
}: SecretSettingsModalProps) {
  const [bibleText, setBibleText] = useState(biblePunchline);
  const [aristotleText, setAristotleText] = useState(aristotlePunchline);

  useEffect(() => {
    setBibleText(biblePunchline);
    setAristotleText(aristotlePunchline);
  }, [biblePunchline, aristotlePunchline, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveBible(bibleText);
    onSaveAristotle(aristotleText);
    onClose();
  };

  const handleReset = () => {
    onResetDefaults();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-canon-gold" />
            <h3 className="font-cinzel text-base font-bold text-slate-100">
              Secret Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <p className="text-xs text-slate-400">
            Customize the message shown regardless of what book or chapter they pick.
          </p>

          <div className="space-y-1.5">
            <label
              htmlFor="bible-punchline"
              className="text-xs font-semibold text-canon-gold uppercase tracking-wider block"
            >
              Bible Punchline
            </label>
            <textarea
              id="bible-punchline"
              aria-label="Bible punchline"
              rows={3}
              value={bibleText}
              onChange={(e) => setBibleText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-serif focus:outline-none focus:border-canon-gold/60 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="aristotle-punchline"
              className="text-xs font-semibold text-blue-400 uppercase tracking-wider block"
            >
              Aristotle Punchline
            </label>
            <textarea
              id="aristotle-punchline"
              aria-label="Aristotle punchline"
              rows={3}
              value={aristotleText}
              onChange={(e) => setAristotleText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-serif focus:outline-none focus:border-blue-400/60 resize-none"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-canon-gold text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>Save & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
