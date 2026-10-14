# iOS PWA Classical & Scripture Reader (Joke App) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hyper-realistic, 100% offline-capable iOS Progressive Web App mimicking a serious classical study app (Holy Scriptures & Corpus Aristotelicum) that allows selecting any book, chapter, and verse, but reveals an authentic-looking custom punchline with a discreet triple-tap settings editor.

**Architecture:** A standalone React 19 + TypeScript + Vite + Tailwind CSS SPA configured with `vite-plugin-pwa` for Workbox offline asset caching, iOS standalone full-screen meta tags, and local state/`localStorage` persistence.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, vite-plugin-pwa, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-15-ios-pwa-joke-reader-design.md`

## Global Constraints
- Target platform: iOS Safari Standalone PWA ("Add to Home Screen"), 100% offline capable.
- Must launch without browser chrome/URL bars when added to Home Screen.
- Safe-area inset support (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`) for iPhone notch/Dynamic Island.
- No backend required; completely client-side with `localStorage` persistence.
- Secret settings triggered by triple-tapping the navigation header within 1.5 seconds.
- No placeholders anywhere in code or tests.

---

### Task 1: Project Scaffolding & PWA Foundations

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/index.css`
- Create: `public/icon.svg`
- Test: `tests/pwa-config.test.ts`

**Interfaces:**
- Produces: Runnable Vite + React + Tailwind + PWA app bundle with iOS meta tags and test suite.

- [ ] **Step 1: Write the failing test for project configuration & PWA manifest**

Create `tests/pwa-config.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('PWA & iOS Configuration', () => {
  it('index.html contains iOS standalone meta tags', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    expect(htmlContent).toContain('apple-mobile-web-app-capable');
    expect(htmlContent).toContain('apple-mobile-web-app-status-bar-style');
    expect(htmlContent).toContain('viewport-fit=cover');
  });

  it('vite.config.ts registers VitePWA plugin', () => {
    const configPath = path.resolve(__dirname, '../vite.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    expect(configContent).toContain('VitePWA');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/pwa-config.test.ts`
Expected: FAIL (files do not exist yet)

- [ ] **Step 3: Create configuration files, package.json, and PWA setup**

Create `package.json`:
```json
{
  "name": "canons-reader",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@types/node": "^22.13.1",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "jsdom": "^26.0.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.7.2",
    "vite": "^6.1.0",
    "vite-plugin-pwa": "^0.21.1",
    "vitest": "^3.0.5"
  }
}
```

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Classical & Scripture Reader',
        short_name: 'Canons',
        description: 'Authorized Critical Editions of Sacred and Classical Texts',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts'
  }
});
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'Trajan Pro', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE1',
          300: '#E8DCC9',
          900: '#1C1917',
        },
        canon: {
          gold: '#C5A059',
          burgundy: '#5B1414',
          navy: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Create `index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="apple-touch-icon" href="/icon.svg" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Canons" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#0F172A" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <title>Classical & Scripture Reader</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased select-none overflow-hidden touch-manipulation">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `public/icon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="115" fill="#0F172A"/>
  <rect x="24" y="24" width="464" height="464" rx="95" fill="none" stroke="#C5A059" stroke-width="8" opacity="0.6"/>
  <!-- Greek column / book icon -->
  <path d="M136 120h240v272H136z" fill="#1E293B" stroke="#C5A059" stroke-width="12" rx="12"/>
  <path d="M176 170h160M176 220h160M176 270h160M176 320h100" stroke="#C5A059" stroke-width="8" stroke-linecap="round"/>
  <path d="M256 90v60M226 120h60" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round"/>
  <circle cx="256" cy="380" r="16" fill="#C5A059"/>
</svg>
```

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  -webkit-tap-highlight-color: transparent;
}

body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
```

Create `src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="p-4 text-center">App Initialized</div>
  </React.StrictMode>
);
```

Create `tests/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Install dependencies and run tests**

Run: `npm install && npx vitest run tests/pwa-config.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: setup project scaffolding with iOS PWA configuration and Tailwind"
```

---

### Task 2: Authentic Canon Datasets & Types

**Files:**
- Create: `src/data/canons.ts`
- Test: `tests/canons.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export type CollectionId = 'bible' | 'aristotle';

  export interface Book {
    id: string;
    name: string;
    section: string; // e.g. "Old Testament", "New Testament", "Ethics & Politics"
    chapters: number;
    abbr: string;
    subtitle?: string;
  }

  export interface CanonCollection {
    id: CollectionId;
    title: string;
    subtitle: string;
    edition: string;
    description: string;
    books: Book[];
    defaultPunchline: string;
    defaultCitation: (book: Book, chapter: number, verse?: number) => string;
  }

  export const CANONS: Record<CollectionId, CanonCollection>;
  ```

- [ ] **Step 1: Write the failing test for datasets**

Create `tests/canons.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { CANONS } from '../src/data/canons';

describe('Canon Datasets', () => {
  it('contains Holy Bible with Old and New Testaments', () => {
    const bible = CANONS.bible;
    expect(bible).toBeDefined();
    expect(bible.books.length).toBeGreaterThanOrEqual(66);
    
    const genesis = bible.books.find(b => b.name === 'Genesis');
    expect(genesis?.chapters).toBe(50);
    expect(genesis?.section).toBe('Old Testament');

    const matthew = bible.books.find(b => b.name === 'Matthew');
    expect(matthew?.chapters).toBe(28);
    expect(matthew?.section).toBe('New Testament');
  });

  it('contains Corpus Aristotelicum with authentic treatises', () => {
    const aristotle = CANONS.aristotle;
    expect(aristotle).toBeDefined();
    expect(aristotle.books.length).toBeGreaterThanOrEqual(8);
    
    const ethics = aristotle.books.find(b => b.name === 'Nicomachean Ethics');
    expect(ethics?.chapters).toBe(10);
    expect(ethics?.section).toBe('Ethics & Politics');
  });

  it('provides default punchlines for both collections', () => {
    expect(CANONS.bible.defaultPunchline).toContain('Instagram');
    expect(CANONS.aristotle.defaultPunchline).toContain('Instagram');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/canons.test.ts`
Expected: FAIL (Cannot find module `../src/data/canons`)

- [ ] **Step 3: Implement `src/data/canons.ts`**

Create `src/data/canons.ts`:
```typescript
export type CollectionId = 'bible' | 'aristotle';

export interface Book {
  id: string;
  name: string;
  section: string;
  chapters: number;
  abbr: string;
  subtitle?: string;
}

export interface CanonCollection {
  id: CollectionId;
  title: string;
  shortTitle: string;
  subtitle: string;
  edition: string;
  description: string;
  books: Book[];
  defaultPunchline: string;
  formatCitation: (book: Book, chapter: number, verse?: number) => {
    reference: string;
    apparatus: string;
    prefix: string;
  };
}

export const BIBLE_BOOKS: Book[] = [
  // Old Testament
  { id: 'gen', name: 'Genesis', section: 'Old Testament', chapters: 50, abbr: 'Gen' },
  { id: 'exo', name: 'Exodus', section: 'Old Testament', chapters: 40, abbr: 'Exod' },
  { id: 'lev', name: 'Leviticus', section: 'Old Testament', chapters: 27, abbr: 'Lev' },
  { id: 'num', name: 'Numbers', section: 'Old Testament', chapters: 36, abbr: 'Num' },
  { id: 'deu', name: 'Deuteronomy', section: 'Old Testament', chapters: 34, abbr: 'Deut' },
  { id: 'jos', name: 'Joshua', section: 'Old Testament', chapters: 24, abbr: 'Josh' },
  { id: 'jdg', name: 'Judges', section: 'Old Testament', chapters: 21, abbr: 'Judg' },
  { id: 'rut', name: 'Ruth', section: 'Old Testament', chapters: 4, abbr: 'Ruth' },
  { id: '1sa', name: '1 Samuel', section: 'Old Testament', chapters: 31, abbr: '1Sam' },
  { id: '2sa', name: '2 Samuel', section: 'Old Testament', chapters: 24, abbr: '2Sam' },
  { id: '1ki', name: '1 Kings', section: 'Old Testament', chapters: 22, abbr: '1Kgs' },
  { id: '2ki', name: '2 Kings', section: 'Old Testament', chapters: 25, abbr: '2Kgs' },
  { id: 'psa', name: 'Psalms', section: 'Old Testament', chapters: 150, abbr: 'Ps' },
  { id: 'pro', name: 'Proverbs', section: 'Old Testament', chapters: 31, abbr: 'Prov' },
  { id: 'ecc', name: 'Ecclesiastes', section: 'Old Testament', chapters: 12, abbr: 'Eccl' },
  { id: 'sng', name: 'Song of Solomon', section: 'Old Testament', chapters: 8, abbr: 'Song' },
  { id: 'isa', name: 'Isaiah', section: 'Old Testament', chapters: 66, abbr: 'Isa' },
  { id: 'jer', name: 'Jeremiah', section: 'Old Testament', chapters: 52, abbr: 'Jer' },
  { id: 'dan', name: 'Daniel', section: 'Old Testament', chapters: 12, abbr: 'Dan' },
  { id: 'mal', name: 'Malachi', section: 'Old Testament', chapters: 4, abbr: 'Mal' },
  // New Testament
  { id: 'mat', name: 'Matthew', section: 'New Testament', chapters: 28, abbr: 'Matt' },
  { id: 'mrk', name: 'Mark', section: 'New Testament', chapters: 16, abbr: 'Mark' },
  { id: 'luk', name: 'Luke', section: 'New Testament', chapters: 24, abbr: 'Luke' },
  { id: 'jhn', name: 'John', section: 'New Testament', chapters: 21, abbr: 'John' },
  { id: 'act', name: 'Acts', section: 'New Testament', chapters: 28, abbr: 'Acts' },
  { id: 'rom', name: 'Romans', section: 'New Testament', chapters: 16, abbr: 'Rom' },
  { id: '1co', name: '1 Corinthians', section: 'New Testament', chapters: 16, abbr: '1Cor' },
  { id: '2co', name: '2 Corinthians', section: 'New Testament', chapters: 13, abbr: '2Cor' },
  { id: 'gal', name: 'Galatians', section: 'New Testament', chapters: 6, abbr: 'Gal' },
  { id: 'eph', name: 'Ephesians', section: 'New Testament', chapters: 6, abbr: 'Eph' },
  { id: 'php', name: 'Philippians', section: 'New Testament', chapters: 4, abbr: 'Phil' },
  { id: 'col', name: 'Colossians', section: 'New Testament', chapters: 4, abbr: 'Col' },
  { id: '1th', name: '1 Thessalonians', section: 'New Testament', chapters: 5, abbr: '1Thess' },
  { id: '2th', name: '2 Thessalonians', section: 'New Testament', chapters: 3, abbr: '2Thess' },
  { id: '1ti', name: '1 Timothy', section: 'New Testament', chapters: 6, abbr: '1Tim' },
  { id: '2ti', name: '2 Timothy', section: 'New Testament', chapters: 4, abbr: '2Tim' },
  { id: 'tit', name: 'Titus', section: 'New Testament', chapters: 3, abbr: 'Titus' },
  { id: 'phm', name: 'Philemon', section: 'New Testament', chapters: 1, abbr: 'Phlm' },
  { id: 'heb', name: 'Hebrews', section: 'New Testament', chapters: 13, abbr: 'Heb' },
  { id: 'jas', name: 'James', section: 'New Testament', chapters: 5, abbr: 'Jas' },
  { id: '1pe', name: '1 Peter', section: 'New Testament', chapters: 5, abbr: '1Pet' },
  { id: '2pe', name: '2 Peter', section: 'New Testament', chapters: 3, abbr: '2Pet' },
  { id: '1jn', name: '1 John', section: 'New Testament', chapters: 5, abbr: '1John' },
  { id: '2jn', name: '2 John', section: 'New Testament', chapters: 1, abbr: '2John' },
  { id: '3jn', name: '3 John', section: 'New Testament', chapters: 1, abbr: '3John' },
  { id: 'jud', name: 'Jude', section: 'New Testament', chapters: 1, abbr: 'Jude' },
  { id: 'rev', name: 'Revelation', section: 'New Testament', chapters: 22, abbr: 'Rev' }
];

export const ARISTOTLE_BOOKS: Book[] = [
  // Ethics & Politics
  { id: 'ne', name: 'Nicomachean Ethics', section: 'Ethics & Politics', chapters: 10, abbr: 'Eth. Nic.', subtitle: 'Ἠθικὰ Νικομάχεια' },
  { id: 'pol', name: 'Politics', section: 'Ethics & Politics', chapters: 8, abbr: 'Pol.', subtitle: 'Πολιτικά' },
  { id: 'ee', name: 'Eudemian Ethics', section: 'Ethics & Politics', chapters: 8, abbr: 'Eth. Eud.', subtitle: 'Ἠθικὰ Εὐδήμια' },
  
  // Theoretical Philosophy & Physics
  { id: 'met', name: 'Metaphysics', section: 'Theoretical Works', chapters: 14, abbr: 'Metaph.', subtitle: 'Τὰ μετὰ τὰ φυσικά' },
  { id: 'phy', name: 'Physics', section: 'Theoretical Works', chapters: 8, abbr: 'Phys.', subtitle: 'Φυσικὴ ἀκρόασις' },
  { id: 'ani', name: 'De Anima (On the Soul)', section: 'Theoretical Works', chapters: 3, abbr: 'De An.', subtitle: 'Περὶ ψυχῆς' },
  
  // Rhetoric & Poetics
  { id: 'poe', name: 'Poetics', section: 'Rhetoric & Arts', chapters: 26, abbr: 'Poet.', subtitle: 'Περὶ ποιητικῆς' },
  { id: 'rhe', name: 'Rhetoric', section: 'Rhetoric & Arts', chapters: 3, abbr: 'Rhet.', subtitle: 'Τέχνη ῥητορική' },
  { id: 'cat', name: 'Categories', section: 'Organon & Logic', chapters: 15, abbr: 'Cat.', subtitle: 'Κατηγορίαι' }
];

export const CANONS: Record<CollectionId, CanonCollection> = {
  bible: {
    id: 'bible',
    title: 'The Holy Scriptures',
    shortTitle: 'Scriptures',
    subtitle: 'Old & New Testaments · Standard Critical Text',
    edition: 'Authorized Ecclesiastical Recension',
    description: 'The complete canon of the Hebrew Scriptures and the Greek Apostolic Writings.',
    books: BIBLE_BOOKS,
    defaultPunchline: 'Truly, truly I say unto thee: thou art remarkably fine, and it is written in the heavens that thou shouldst give him thy Instagram without delay.',
    formatCitation: (book, chapter, verse = 1) => ({
      reference: `${book.name} ${chapter}:${verse}`,
      apparatus: `Novum Testamentum Graece (NA28) / Biblia Hebraica · Codex Vaticanus`,
      prefix: `[${verse}]`
    })
  },
  aristotle: {
    id: 'aristotle',
    title: 'Corpus Aristotelicum',
    shortTitle: 'Aristotle',
    subtitle: 'The Complete Works of Aristotle · Oxford Classical Texts',
    edition: 'Scriptorum Classicorum Bibliotheca Oxoniensis',
    description: 'The philosophical treatises, lectures, and dialogues of Aristotle of Stagira.',
    books: ARISTOTLE_BOOKS,
    defaultPunchline: 'For it is the mark of an educated mind to recognize supreme elegance when it appears; wherefore the highest virtue consists in bestowing upon him thy Instagram.',
    formatCitation: (book, chapter) => {
      const bekkerNum = 1094 + chapter * 7;
      const col = chapter % 2 === 0 ? 'b' : 'a';
      return {
        reference: `${book.name}, Book ${toRoman(chapter)}`,
        apparatus: `Bekker pagination ${bekkerNum}${col} · Oxford Critical Apparatus`,
        prefix: `[${bekkerNum}${col}]`
      };
    }
  }
};

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  for (const [val, sym] of romanMap) {
    while (num >= val) {
      result += sym;
      num -= val;
    }
  }
  return result || 'I';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/canons.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/canons.ts tests/canons.test.ts
git commit -m "feat: implement authentic Canon catalogs for Bible and Aristotle"
```

---

### Task 3: Storage & Settings Hook (Persistence & Secret Mode)

**Files:**
- Create: `src/hooks/usePunchlines.ts`
- Test: `tests/usePunchlines.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface PunchlineManager {
    biblePunchline: string;
    aristotlePunchline: string;
    getPunchline: (id: CollectionId) => string;
    setPunchline: (id: CollectionId, text: string) => void;
    resetToDefaults: () => void;
  }
  export function usePunchlines(): PunchlineManager;
  ```

- [ ] **Step 1: Write the failing test for `usePunchlines`**

Create `tests/usePunchlines.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePunchlines } from '../src/hooks/usePunchlines';
import { CANONS } from '../src/data/canons';

describe('usePunchlines Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default punchlines initially', () => {
    const { result } = renderHook(() => usePunchlines());
    expect(result.current.getPunchline('bible')).toBe(CANONS.bible.defaultPunchline);
    expect(result.current.getPunchline('aristotle')).toBe(CANONS.aristotle.defaultPunchline);
  });

  it('saves custom punchline to localStorage and updates state', () => {
    const { result } = renderHook(() => usePunchlines());
    act(() => {
      result.current.setPunchline('bible', 'Give me your phone number right now.');
    });
    expect(result.current.getPunchline('bible')).toBe('Give me your phone number right now.');
    expect(localStorage.getItem('app_bible_punchline')).toBe('Give me your phone number right now.');
  });

  it('resets to defaults cleanly', () => {
    const { result } = renderHook(() => usePunchlines());
    act(() => {
      result.current.setPunchline('aristotle', 'Custom text');
      result.current.resetToDefaults();
    });
    expect(result.current.getPunchline('aristotle')).toBe(CANONS.aristotle.defaultPunchline);
    expect(localStorage.getItem('app_aristotle_punchline')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/usePunchlines.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `src/hooks/usePunchlines.ts`**

Create `src/hooks/usePunchlines.ts`:
```typescript
import { useState, useCallback } from 'react';
import { CollectionId, CANONS } from '../data/canons';

const STORAGE_KEYS: Record<CollectionId, string> = {
  bible: 'app_bible_punchline',
  aristotle: 'app_aristotle_punchline'
};

export function usePunchlines() {
  const [biblePunchline, setBiblePunchline] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.bible) || CANONS.bible.defaultPunchline;
    } catch {
      return CANONS.bible.defaultPunchline;
    }
  });

  const [aristotlePunchline, setAristotlePunchline] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.aristotle) || CANONS.aristotle.defaultPunchline;
    } catch {
      return CANONS.aristotle.defaultPunchline;
    }
  });

  const getPunchline = useCallback((id: CollectionId) => {
    return id === 'bible' ? biblePunchline : aristotlePunchline;
  }, [biblePunchline, aristotlePunchline]);

  const setPunchline = useCallback((id: CollectionId, text: string) => {
    const trimmed = text.trim();
    if (id === 'bible') {
      const val = trimmed || CANONS.bible.defaultPunchline;
      setBiblePunchline(val);
      try { localStorage.setItem(STORAGE_KEYS.bible, val); } catch {}
    } else {
      const val = trimmed || CANONS.aristotle.defaultPunchline;
      setAristotlePunchline(val);
      try { localStorage.setItem(STORAGE_KEYS.aristotle, val); } catch {}
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setBiblePunchline(CANONS.bible.defaultPunchline);
    setAristotlePunchline(CANONS.aristotle.defaultPunchline);
    try {
      localStorage.removeItem(STORAGE_KEYS.bible);
      localStorage.removeItem(STORAGE_KEYS.aristotle);
    } catch {}
  }, []);

  return {
    biblePunchline,
    aristotlePunchline,
    getPunchline,
    setPunchline,
    resetToDefaults
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/usePunchlines.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePunchlines.ts tests/usePunchlines.test.ts
git commit -m "feat: implement usePunchlines hook with localStorage persistence"
```

---

### Task 4: Header & Library Selection Screen

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/LibraryScreen.tsx`
- Test: `tests/Header.test.tsx`
- Test: `tests/LibraryScreen.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface HeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    onBack?: () => void;
    onSecretTrigger?: () => void;
  }
  export function Header(props: HeaderProps): JSX.Element;

  export interface LibraryScreenProps {
    onSelectCollection: (id: CollectionId) => void;
  }
  export function LibraryScreen(props: LibraryScreenProps): JSX.Element;
  ```

- [ ] **Step 1: Write the failing tests**

Create `tests/Header.test.tsx`:
```typescript
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
```

Create `tests/LibraryScreen.test.tsx`:
```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/Header.test.tsx tests/LibraryScreen.test.tsx`
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement `Header.tsx` and `LibraryScreen.tsx`**

Create `src/components/Header.tsx`:
```tsx
import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onSecretTrigger?: () => void;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  onSecretTrigger
}: HeaderProps) {
  const tapTimesRef = useRef<number[]>([]);
  const [, setRerender] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    // Keep taps from the last 1500ms
    tapTimesRef.current = [...tapTimesRef.current.filter(t => now - t < 1500), now];

    if (tapTimesRef.current.length >= 3) {
      tapTimesRef.current = [];
      if (onSecretTrigger) {
        onSecretTrigger();
      }
    }
    setRerender(n => n + 1);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 pt-3 pb-3 transition-colors">
      <div className="flex items-center justify-between min-h-[44px]">
        <div className="w-16 flex items-center">
          {showBack && onBack && (
            <button
              onClick={onBack}
              aria-label="Back"
              className="flex items-center text-canon-gold active:opacity-60 transition-opacity -ml-1 text-[17px] font-medium"
            >
              <ChevronLeft className="w-6 h-6 -mr-1" />
              <span>Back</span>
            </button>
          )}
        </div>

        <div
          data-testid="header-tap-area"
          onClick={handleTap}
          className="flex-1 text-center cursor-pointer select-none px-2"
        >
          <h1 className="font-cinzel text-base font-bold text-slate-100 tracking-wide truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 font-sans tracking-tight uppercase truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-16 text-right">
          {/* Subtle balanced placeholder */}
          <div className="w-2 h-2 rounded-full bg-slate-800/60 ml-auto mr-1" />
        </div>
      </div>
    </header>
  );
}
```

Create `src/components/LibraryScreen.tsx`:
```tsx
import { BookOpen, Landmark, Sparkles } from 'lucide-react';
import { CollectionId, CANONS } from '../data/canons';

export interface LibraryScreenProps {
  onSelectCollection: (id: CollectionId) => void;
}

export function LibraryScreen({ onSelectCollection }: LibraryScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full space-y-6 animate-fadeIn">
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canon-gold/10 border border-canon-gold/20 text-canon-gold text-xs font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bibliotheca Antiqua</span>
        </div>
        <h2 className="text-2xl font-cinzel font-bold text-slate-100 tracking-tight">
          Select Canon
        </h2>
        <p className="text-xs text-slate-400 font-serif italic max-w-xs mx-auto">
          Authorized critical translations for research, devotion, and scholarly reading.
        </p>
      </div>

      <div className="space-y-4">
        {/* Bible Card */}
        <button
          onClick={() => onSelectCollection('bible')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-canon-gold/40 active:scale-[0.98] transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-canon-gold/5 rounded-full blur-2xl group-hover:bg-canon-gold/10 transition-colors" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-canon-gold group-hover:scale-105 transition-transform flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80">Canon I</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-sans">66 Books</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-100 mt-1 group-hover:text-amber-300 transition-colors">
                {CANONS.bible.title}
              </h3>
              <p className="text-xs text-slate-400 font-serif mt-1">
                {CANONS.bible.subtitle}
              </p>
            </div>
          </div>
        </button>

        {/* Aristotle Card */}
        <button
          onClick={() => onSelectCollection('aristotle')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-blue-400/40 active:scale-[0.98] transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400/80">Canon II</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-sans">9 Treatises</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-100 mt-1 group-hover:text-blue-300 transition-colors">
                {CANONS.aristotle.title}
              </h3>
              <p className="text-xs text-slate-400 font-serif mt-1">
                {CANONS.aristotle.subtitle}
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="pt-8 text-center">
        <p className="text-[11px] text-slate-500 font-sans">
          Tap any text to begin navigation · Oxford & Vatican Recensions
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/Header.test.tsx tests/LibraryScreen.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/LibraryScreen.tsx tests/Header.test.tsx tests/LibraryScreen.test.tsx
git commit -m "feat: add Header with secret triple-tap detector and LibraryScreen"
```

---

### Task 5: Book List & Chapter/Verse Selector Components

**Files:**
- Create: `src/components/BookListScreen.tsx`
- Create: `src/components/ChapterVersePicker.tsx`
- Test: `tests/BookListScreen.test.tsx`
- Test: `tests/ChapterVersePicker.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface BookListScreenProps {
    collectionId: CollectionId;
    onSelectBook: (book: Book) => void;
  }
  export function BookListScreen(props: BookListScreenProps): JSX.Element;

  export interface ChapterVersePickerProps {
    book: Book;
    collectionId: CollectionId;
    onSelectPassage: (chapter: number, verse: number) => void;
  }
  export function ChapterVersePicker(props: ChapterVersePickerProps): JSX.Element;
  ```

- [ ] **Step 1: Write the failing tests**

Create `tests/BookListScreen.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookListScreen } from '../src/components/BookListScreen';

describe('BookListScreen component', () => {
  it('renders list of books with search filtering', () => {
    const handleSelect = vi.fn();
    render(<BookListScreen collectionId="bible" onSelectBook={handleSelect} />);

    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByText('Matthew')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search books/i);
    fireEvent.change(searchInput, { target: { value: 'Rom' } });

    expect(screen.getByText('Romans')).toBeInTheDocument();
    expect(screen.queryByText('Genesis')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Romans'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Romans' }));
  });
});
```

Create `tests/ChapterVersePicker.test.tsx`:
```typescript
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
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/BookListScreen.test.tsx tests/ChapterVersePicker.test.tsx`
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement `BookListScreen.tsx` and `ChapterVersePicker.tsx`**

Create `src/components/BookListScreen.tsx`:
```tsx
import { useState, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { CollectionId, Book, CANONS } from '../data/canons';

export interface BookListScreenProps {
  collectionId: CollectionId;
  onSelectBook: (book: Book) => void;
}

export function BookListScreen({ collectionId, onSelectBook }: BookListScreenProps) {
  const collection = CANONS[collectionId];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const sections = useMemo(() => {
    const set = new Set<string>();
    collection.books.forEach(b => set.add(b.section));
    return Array.from(set);
  }, [collection]);

  const filteredBooks = useMemo(() => {
    return collection.books.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.abbr.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSection = selectedSection === 'all' || b.section === selectedSection;
      return matchesSearch && matchesSection;
    });
  }, [collection, searchTerm, selectedSection]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden max-w-md mx-auto w-full animate-fadeIn">
      {/* Search Bar */}
      <div className="p-4 pb-2 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search books or treatises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-canon-gold/60"
          />
        </div>

        {/* Section Pills */}
        {sections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedSection === 'all'
                  ? 'bg-canon-gold text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              All ({collection.books.length})
            </button>
            {sections.map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSection === sec
                    ? 'bg-canon-gold text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Book List */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-1.5 divide-y divide-slate-800/40">
        {filteredBooks.map((book) => (
          <button
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-slate-900 active:bg-slate-800 transition-colors text-left group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-semibold text-slate-200 group-hover:text-canon-gold transition-colors">
                  {book.name}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {book.abbr}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                {book.chapters} {collectionId === 'aristotle' ? 'Books / Parts' : 'Chapters'}
                {book.subtitle && ` · ${book.subtitle}`}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-canon-gold transition-colors" />
          </button>
        ))}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No matching books found.
          </div>
        )}
      </div>
    </div>
  );
}
```

Create `src/components/ChapterVersePicker.tsx`:
```tsx
import { useState } from 'react';
import { CollectionId, Book } from '../data/canons';
import { ChevronLeft } from 'lucide-react';

export interface ChapterVersePickerProps {
  book: Book;
  collectionId: CollectionId;
  onSelectPassage: (chapter: number, verse: number) => void;
}

export function ChapterVersePicker({
  book,
  collectionId,
  onSelectPassage
}: ChapterVersePickerProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
  // Realistic simulated verse count (e.g. 25-35 verses)
  const verses = Array.from({ length: 30 }, (_, i) => i + 1);

  const isBible = collectionId === 'bible';

  const handleChapterClick = (ch: number) => {
    if (isBible) {
      setSelectedChapter(ch);
    } else {
      // Aristotle navigates directly by book/chapter
      onSelectPassage(ch, 1);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full animate-fadeIn">
      {/* Chapter View */}
      {selectedChapter === null ? (
        <div className="space-y-4">
          <div className="text-center pb-2">
            <h2 className="text-xl font-cinzel font-bold text-slate-100">
              {book.name}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Select {collectionId === 'aristotle' ? 'Book / Chapter' : 'Chapter'}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {chapters.map((ch) => (
              <button
                key={ch}
                onClick={() => handleChapterClick(ch)}
                className="aspect-square flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-base font-serif font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-sm"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Verse View (Bible) */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center text-xs text-canon-gold hover:underline font-sans"
            >
              <ChevronLeft className="w-4 h-4 mr-0.5" />
              All Chapters
            </button>
            <div className="text-center">
              <h2 className="text-lg font-cinzel font-bold text-slate-100">
                {book.name} {selectedChapter}
              </h2>
              <p className="text-[11px] text-slate-400 font-sans">
                Select Verse
              </p>
            </div>
            <div className="w-16" />
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {verses.map((v) => (
              <button
                key={v}
                onClick={() => onSelectPassage(selectedChapter, v)}
                className="aspect-square flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-base font-serif font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-sm"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/BookListScreen.test.tsx tests/ChapterVersePicker.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/BookListScreen.tsx src/components/ChapterVersePicker.tsx tests/BookListScreen.test.tsx tests/ChapterVersePicker.test.tsx
git commit -m "feat: implement BookListScreen and ChapterVersePicker"
```

---

### Task 6: Scholarly Reader View & Punchline Delivery

**Files:**
- Create: `src/components/ReaderView.tsx`
- Test: `tests/ReaderView.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface ReaderViewProps {
    collectionId: CollectionId;
    book: Book;
    chapter: number;
    verse: number;
    punchline: string;
    onNavigateBack: () => void;
  }
  export function ReaderView(props: ReaderViewProps): JSX.Element;
  ```

- [ ] **Step 1: Write the failing test**

Create `tests/ReaderView.test.tsx`:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining(punchline));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/ReaderView.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `ReaderView.tsx`**

Create `src/components/ReaderView.tsx`:
```tsx
import { useState } from 'react';
import { Copy, Check, Bookmark, Share2 } from 'lucide-react';
import { CollectionId, Book, CANONS } from '../data/canons';

export interface ReaderViewProps {
  collectionId: CollectionId;
  book: Book;
  chapter: number;
  verse: number;
  punchline: string;
  onNavigateBack: () => void;
}

export function ReaderView({
  collectionId,
  book,
  chapter,
  verse,
  punchline
}: ReaderViewProps) {
  const [copied, setCopied] = useState(false);
  const collection = CANONS[collectionId];
  const citation = collection.formatCitation(book, chapter, verse);

  const handleCopy = () => {
    const fullText = `"${punchline}" — ${citation.reference} (${collection.edition})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 max-w-md mx-auto w-full space-y-5 animate-fadeIn">
      {/* Authentic Academic Card */}
      <div className="bg-paper-100 text-paper-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-paper-300 relative overflow-hidden transition-all">
        {/* Subtle decorative header bar */}
        <div className="border-b border-paper-300 pb-3 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-900/60 block">
              {collection.edition}
            </span>
            <h2 className="text-xl font-cinzel font-bold text-paper-900 tracking-tight">
              {citation.reference}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-paper-900/40">
            <Bookmark className="w-4 h-4" />
          </div>
        </div>

        {/* Text Presentation */}
        <div className="py-2">
          <p className="font-serif text-[19px] leading-relaxed text-paper-900/90 text-justify tracking-normal">
            <span className="font-mono text-xs font-bold text-canon-burgundy mr-2 align-super">
              {citation.prefix}
            </span>
            {punchline}
          </p>
        </div>

        {/* Critical Apparatus / Footnote */}
        <div className="mt-8 pt-4 border-t border-paper-300/80 text-[11px] text-paper-900/60 font-serif space-y-1">
          <p className="italic">
            {citation.apparatus}
          </p>
          <p className="text-[10px] font-mono text-paper-900/40 uppercase">
            Cod. Oxon. Bibl. Bodl. MS Gr. class. d. 14 · Fol. 42r
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium hover:border-canon-gold hover:text-canon-gold active:scale-95 transition-all shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied Reference</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Verse</span>
            </>
          )}
        </button>

        <button
          onClick={handleCopy}
          className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-canon-gold active:scale-95 transition-all shadow-md"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/ReaderView.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ReaderView.tsx tests/ReaderView.test.tsx
git commit -m "feat: implement scholarly ReaderView with punchline delivery"
```

---

### Task 7: Secret Settings Modal & Full App Integration

**Files:**
- Create: `src/components/SecretSettingsModal.tsx`
- Modify: `src/App.tsx`
- Test: `tests/SecretSettingsModal.test.tsx`
- Test: `tests/App.test.tsx`

**Interfaces:**
- Produces:
  ```typescript
  export interface SecretSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    biblePunchline: string;
    aristotlePunchline: string;
    onSaveBible: (text: string) => void;
    onSaveAristotle: (text: string) => void;
    onResetDefaults: () => void;
  }
  export function SecretSettingsModal(props: SecretSettingsModalProps): JSX.Element | null;
  ```

- [ ] **Step 1: Write the failing tests**

Create `tests/SecretSettingsModal.test.tsx`:
```typescript
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
```

Create `tests/App.test.tsx`:
```typescript
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
    expect(screen.getByText(/Genesis 1:1/i)).toBeInTheDocument();
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/SecretSettingsModal.test.tsx tests/App.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `SecretSettingsModal.tsx` and `App.tsx`**

Create `src/components/SecretSettingsModal.tsx`:
```tsx
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
```

Create `src/App.tsx`:
```tsx
import { useState } from 'react';
import { CollectionId, Book, CANONS } from './data/canons';
import { usePunchlines } from './hooks/usePunchlines';
import { Header } from './components/Header';
import { LibraryScreen } from './components/LibraryScreen';
import { BookListScreen } from './components/BookListScreen';
import { ChapterVersePicker } from './components/ChapterVersePicker';
import { ReaderView } from './components/ReaderView';
import { SecretSettingsModal } from './components/SecretSettingsModal';

type AppView = 'library' | 'books' | 'picker' | 'reader';

export default function App() {
  const [view, setView] = useState<AppView>('library');
  const [selectedCollection, setSelectedCollection] = useState<CollectionId>('bible');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPassage, setSelectedPassage] = useState<{ chapter: number; verse: number }>({ chapter: 1, verse: 1 });
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const {
    biblePunchline,
    aristotlePunchline,
    getPunchline,
    setPunchline,
    resetToDefaults
  } = usePunchlines();

  const handleSelectCollection = (id: CollectionId) => {
    setSelectedCollection(id);
    setView('books');
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView('picker');
  };

  const handleSelectPassage = (chapter: number, verse: number) => {
    setSelectedPassage({ chapter, verse });
    setView('reader');
  };

  const handleBack = () => {
    if (view === 'reader') {
      setView('picker');
    } else if (view === 'picker') {
      setView('books');
    } else if (view === 'books') {
      setView('library');
    }
  };

  const currentCollection = CANONS[selectedCollection];

  const getHeaderProps = () => {
    switch (view) {
      case 'library':
        return {
          title: 'Classical & Sacred Texts',
          subtitle: 'Bibliotheca Critica',
          showBack: false
        };
      case 'books':
        return {
          title: currentCollection.shortTitle,
          subtitle: currentCollection.edition,
          showBack: true
        };
      case 'picker':
        return {
          title: selectedBook?.name || currentCollection.shortTitle,
          subtitle: 'Select Passage',
          showBack: true
        };
      case 'reader':
        return {
          title: currentCollection.formatCitation(
            selectedBook || currentCollection.books[0],
            selectedPassage.chapter,
            selectedPassage.verse
          ).reference,
          subtitle: currentCollection.edition,
          showBack: true
        };
    }
  };

  const headerProps = getHeaderProps();

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Header
        title={headerProps.title}
        subtitle={headerProps.subtitle}
        showBack={headerProps.showBack}
        onBack={handleBack}
        onSecretTrigger={() => setIsSecretOpen(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {view === 'library' && (
          <LibraryScreen onSelectCollection={handleSelectCollection} />
        )}

        {view === 'books' && (
          <BookListScreen
            collectionId={selectedCollection}
            onSelectBook={handleSelectBook}
          />
        )}

        {view === 'picker' && selectedBook && (
          <ChapterVersePicker
            book={selectedBook}
            collectionId={selectedCollection}
            onSelectPassage={handleSelectPassage}
          />
        )}

        {view === 'reader' && selectedBook && (
          <ReaderView
            collectionId={selectedCollection}
            book={selectedBook}
            chapter={selectedPassage.chapter}
            verse={selectedPassage.verse}
            punchline={getPunchline(selectedCollection)}
            onNavigateBack={handleBack}
          />
        )}
      </main>

      <SecretSettingsModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
        biblePunchline={biblePunchline}
        aristotlePunchline={aristotlePunchline}
        onSaveBible={(text) => setPunchline('bible', text)}
        onSaveAristotle={(text) => setPunchline('aristotle', text)}
        onResetDefaults={resetToDefaults}
      />
    </div>
  );
}
```

- [ ] **Step 4: Run all unit and integration tests**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/SecretSettingsModal.tsx src/App.tsx tests/SecretSettingsModal.test.tsx tests/App.test.tsx
git commit -m "feat: complete secret settings modal and full app navigation flow"
```

---

### Task 8: Production Build, Offline Service Worker & iPhone Setup Verification

**Files:**
- Test: Build output & service worker generation
- Create: `README.md` with iPhone installation instructions

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build passes, `dist/` directory generated with `sw.js` and `manifest.webmanifest`.

- [ ] **Step 2: Create user guide `README.md`**

Create `README.md`:
```markdown
# Classical & Scripture Reader (iOS PWA Joke App)

An ultra-authentic classical study reader for iOS designed for playful pickup jokes.

## Running on your iPhone

1. Ensure your iPhone and Linux computer are on the same Wi-Fi network.
2. In your terminal, run:
   ```bash
   npm run dev -- --host
   ```
3. Look at the terminal output for the Network URL (e.g. `http://192.168.1.XX:5173`).
4. On your iPhone, open **Safari** and navigate to that URL.
5. Tap the **Share** button (box with arrow pointing up) at the bottom of Safari.
6. Scroll down and tap **"Add to Home Screen"**.
7. Tap **Add** in the top right.
8. The app is now installed on your iPhone home screen!
9. Tap the icon to launch in full-screen standalone mode. It is 100% offline-capable (works in Airplane Mode).

## Secret Controls
- **Triple-tap the top header** at any time to open the hidden settings screen where you can edit the Bible and Aristotle punchlines.
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add iPhone installation and PWA offline setup guide"
```
