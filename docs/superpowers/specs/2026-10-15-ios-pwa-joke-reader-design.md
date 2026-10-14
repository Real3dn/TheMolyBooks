# Design Document: Classical & Scripture Reader (iOS PWA Prank App)

**Date:** 2026-10-15  
**Platform:** Mobile Web / iOS Standalone PWA (Offline-capable)  
**Target Device:** iPhone (Safari "Add to Home Screen" standalone mode)

---

## 1. Executive Summary & Goal
The goal of this application is to deliver a hyper-realistic, elegant classical reader app for iOS (operating as an offline Progressive Web App) that serves as a playful gag to share in social settings. 

The app presents itself as a serious study tool offering access to **The Holy Scriptures** and **The Corpus Aristotelicum** (Aristotle's works). The user selects a collection, chooses any book, and navigates to any chapter/verse. Regardless of the book or chapter/verse selected, the final reader view renders an authentic academic text layout displaying a predetermined, customizable punchline (e.g. asking for their Instagram or number) disguised within biblical or philosophical phrasing.

A discreet, hidden settings screen allows the owner to change the punchline texts at any time. The app functions 100% offline with zero dependencies on external servers or app stores.

---

## 2. Platform Architecture & iOS Native Emulation

### 2.1 Stack
- **Framework:** React 19 / 18 with Vite
- **Styling:** Tailwind CSS with custom academic typography (`EB Garamond` / `Cinzel` / native serif fallbacks)
- **Icons:** Lucide React (feather-style clean icons matching iOS SF Symbols)
- **Offline / PWA Engine:** `vite-plugin-pwa` utilizing Workbox Service Worker for complete pre-caching of HTML, JS, CSS, icons, and fonts.

### 2.2 iOS Standalone Integration
To ensure the app launches without Safari URL bars or browser controls and looks identical to an App Store install:
- **Meta Tags:**
  - `<meta name="apple-mobile-web-app-capable" content="yes" />`
  - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
  - `<meta name="apple-mobile-web-app-title" content="Canons" />`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />`
- **Apple Touch Icon:**
  - Embedded 180x180 high-res icon featuring an embossed golden laurel and book motif on an academic burgundy / deep navy field.
- **Manifest (`manifest.webmanifest`):**
  - `name`: `"Classical & Scripture Reader"`
  - `short_name`: `"Canons"`
  - `display`: `"standalone"`
  - `background_color`: `"#0F172A"`
  - `theme_color`: `"#0F172A"`

---

## 3. User Flows & Screen Architecture

The app uses a linear, state-driven navigation flow mimicking standard iOS reading apps:

```
[Home: Library Selection]
       │
       ├───────────────────────────────┐
       ▼                               ▼
[Bible Book List]              [Aristotle Treatises]
       │                               │
       ▼                               ▼
[Chapter Grid]                 [Book/Chapter Grid]
       │                               │
       ▼                               ▼
[Verse Grid (Bible)]                   │
       │                               │
       └───────────────┬───────────────┘
                       ▼
             [Scholarly Reader View]
             (Delivers the Punchline)
                       ▲
                       │ (Triple tap header)
             [Secret Settings Modal]
```

### 3.1 Screen Breakdown

1. **Library Screen (`Home`):**
   - Header: *"Classical & Sacred Texts"*, subtitle *"Authorized Critical Editions"*.
   - Two prominent scholar cards:
     - **The Holy Scriptures**: Subtitle *"Old & New Testaments · Critical Text"*, icon: Book / Cross motif.
     - **Corpus Aristotelicum**: Subtitle *"Complete Works · Oxford Classical Edition"*, icon: Column / Laurel motif.
   - Aesthetic: Deep academic paper/slate tones, gold borders, subtle leatherette texture accents.

2. **Book Selection Screen (`Books`):**
   - iOS-style navigation header with `‹ Library` back button and search filter input.
   - For Bible: Tabbed or sectioned into **Old Testament** (39 books: Genesis, Exodus, Leviticus ... Malachi) and **New Testament** (27 books: Matthew, Mark, Luke, John, Romans ... Revelation).
   - For Aristotle: Sectioned into **Ethics & Politics** (*Nicomachean Ethics*, *Politics*), **Theoretical Works** (*Metaphysics*, *Physics*, *De Anima*), and **Rhetoric & Logic** (*Poetics*, *Rhetoric*, *Categories*).

3. **Chapter & Verse Selection (`Chapters` & `Verses`):**
   - Header displaying the active book name.
   - Clean iOS numeric grid (buttons sized 48x48px for tactile finger tapping).
   - Realistic chapter counts matching historical canons (e.g. Genesis has 50 chapters, Psalms has 150, Matthew has 28; Aristotle's Ethics has 10 books).
   - For Bible: Selecting a chapter immediately transitions to a verse number grid (1–30+).
   - For Aristotle: Selecting a treatise opens the chapter / book picker.

4. **Scholarly Reader View (`Reader`):**
   - Header: Authentic scripture/scholarly citation (e.g. *"Matthew 7:14"* or *"Nicomachean Ethics II.4"*).
   - Edition subtitle: e.g. *"Critical Apparatus · Oxford / Vulgate Recension"*.
   - Reader Container: Off-white ivory paper card (`#FAF7F2`) with crisp serif text, elegant drop shadow, and red-letter / classical accent styling.
   - Body Text:
     - Verse number marker (e.g. `¹⁴` or `[1103a]`).
     - Rendered punchline text.
   - Actions: Subtle bottom toolbars with "Copy Reference" and "Previous / Next" buttons (which also lead to the punchline).

5. **Secret Settings Modal (`Settings`):**
   - **Activation:** 3 taps in rapid succession (within 1.5s) on the top navigation bar title.
   - **UI:** A sleek iOS sheet modal with dark backdrop.
   - **Controls:**
     - Bible Punchline Textarea (prefilled with default, editable).
     - Aristotle Punchline Textarea (prefilled with default, editable).
     - "Save & Close" button.
     - "Reset to Defaults" button.

---

## 4. Content Datasets & Punchline Defaults

### 4.1 Built-in Books Dataset
- **Bible Dataset:** Array of 66 books with accurate testament division, abbreviations, and realistic chapter counts.
- **Aristotle Dataset:** Array of primary works with authentic subdivisions and chapter counts.

### 4.2 Default Punchlines
- **Bible Default:**
  > *"Truly, truly I say unto thee: thou art remarkably fine, and it is written in the heavens that thou shouldst give him thy Instagram without delay."*
- **Aristotle Default:**
  > *"[1094a] For it is the mark of an educated mind to recognize supreme beauty when it appears before him; wherefore the highest virtue consists in bestowing upon him thy Instagram."*

---

## 5. Data Persistence & State Management

- State managed with React hooks (`useState`, `useEffect`).
- Punchlines persisted in `window.localStorage`:
  - `storageKey_bible`: `'app_bible_punchline'`
  - `storageKey_aristotle`: `'app_aristotle_punchline'`
- Defensive storage fallback: If `localStorage` is disabled or throws an exception, in-memory state is utilized without crashing.

---

## 6. Offline & PWA Configuration

- `vite-plugin-pwa` configured in `registerType: 'autoUpdate'`.
- Workbox precaches all generated assets (`index.html`, `.js`, `.css`, SVG/PNG icons, web fonts).
- Offline fallback test verification: Page remains fully navigable with network disabled.

---

## 7. Verification & Testing Plan

1. **Functional Flow Testing:**
   - Navigating Bible → Genesis → Chapter 1 → Verse 1 loads reader with Bible punchline.
   - Navigating Aristotle → Nicomachean Ethics → Chapter 2 loads reader with Aristotle punchline.
   - Back button transitions back smoothly at each stage.
2. **Secret Settings Verification:**
   - Triple-tapping header triggers modal.
   - Changing text and clicking Save updates the rendered verse immediately.
   - Reloading the page preserves custom texts across sessions.
3. **PWA & Offline Verification:**
   - Run production preview build (`npm run build && npm run preview`).
   - Audit Service Worker registration and cache storage.
   - Simulate offline mode in DevTools to confirm full offline navigation.
4. **Mobile / iPhone Experience Verification:**
   - Start local dev server with `--host`.
   - Provide clear instructions to connect iPhone Safari on the local Wi-Fi and tap "Add to Home Screen".
