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
  // Old Testament (39 Books)
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
  { id: '1ch', name: '1 Chronicles', section: 'Old Testament', chapters: 29, abbr: '1Chr' },
  { id: '2ch', name: '2 Chronicles', section: 'Old Testament', chapters: 36, abbr: '2Chr' },
  { id: 'ezr', name: 'Ezra', section: 'Old Testament', chapters: 10, abbr: 'Ezra' },
  { id: 'neh', name: 'Nehemiah', section: 'Old Testament', chapters: 13, abbr: 'Neh' },
  { id: 'est', name: 'Esther', section: 'Old Testament', chapters: 10, abbr: 'Esth' },
  { id: 'job', name: 'Job', section: 'Old Testament', chapters: 42, abbr: 'Job' },
  { id: 'psa', name: 'Psalms', section: 'Old Testament', chapters: 150, abbr: 'Ps' },
  { id: 'pro', name: 'Proverbs', section: 'Old Testament', chapters: 31, abbr: 'Prov' },
  { id: 'ecc', name: 'Ecclesiastes', section: 'Old Testament', chapters: 12, abbr: 'Eccl' },
  { id: 'sng', name: 'Song of Solomon', section: 'Old Testament', chapters: 8, abbr: 'Song' },
  { id: 'isa', name: 'Isaiah', section: 'Old Testament', chapters: 66, abbr: 'Isa' },
  { id: 'jer', name: 'Jeremiah', section: 'Old Testament', chapters: 52, abbr: 'Jer' },
  { id: 'lam', name: 'Lamentations', section: 'Old Testament', chapters: 5, abbr: 'Lam' },
  { id: 'ezk', name: 'Ezekiel', section: 'Old Testament', chapters: 48, abbr: 'Ezek' },
  { id: 'dan', name: 'Daniel', section: 'Old Testament', chapters: 12, abbr: 'Dan' },
  { id: 'hos', name: 'Hosea', section: 'Old Testament', chapters: 14, abbr: 'Hos' },
  { id: 'jol', name: 'Joel', section: 'Old Testament', chapters: 3, abbr: 'Joel' },
  { id: 'amo', name: 'Amos', section: 'Old Testament', chapters: 9, abbr: 'Amos' },
  { id: 'oba', name: 'Obadiah', section: 'Old Testament', chapters: 1, abbr: 'Obad' },
  { id: 'jon', name: 'Jonah', section: 'Old Testament', chapters: 4, abbr: 'Jonah' },
  { id: 'mic', name: 'Micah', section: 'Old Testament', chapters: 7, abbr: 'Mic' },
  { id: 'nam', name: 'Nahum', section: 'Old Testament', chapters: 3, abbr: 'Nah' },
  { id: 'hab', name: 'Habakkuk', section: 'Old Testament', chapters: 3, abbr: 'Hab' },
  { id: 'zep', name: 'Zephaniah', section: 'Old Testament', chapters: 3, abbr: 'Zeph' },
  { id: 'hag', name: 'Haggai', section: 'Old Testament', chapters: 2, abbr: 'Hag' },
  { id: 'zec', name: 'Zechariah', section: 'Old Testament', chapters: 14, abbr: 'Zech' },
  { id: 'mal', name: 'Malachi', section: 'Old Testament', chapters: 4, abbr: 'Mal' },
  // New Testament (27 Books)
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
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  let n = num;
  for (const [val, sym] of romanMap) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return result || 'I';
}
