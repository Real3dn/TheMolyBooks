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

  it('formats citations correctly for Bible passages', () => {
    const genesis = CANONS.bible.books.find(b => b.name === 'Genesis')!;
    const citation = CANONS.bible.formatCitation(genesis, 1, 1);
    expect(citation.reference).toBe('Genesis 1:1');
    expect(citation.prefix).toBe('[1]');
    expect(citation.apparatus).toContain('Novum Testamentum Graece');

    // Default verse = 1
    const defaultVerseCitation = CANONS.bible.formatCitation(genesis, 3);
    expect(defaultVerseCitation.reference).toBe('Genesis 3:1');
    expect(defaultVerseCitation.prefix).toBe('[1]');
  });

  it('formats citations correctly for Aristotle works with Bekker numbers and Roman numerals', () => {
    const ethics = CANONS.aristotle.books.find(b => b.name === 'Nicomachean Ethics')!;
    const citation1 = CANONS.aristotle.formatCitation(ethics, 1);
    expect(citation1.reference).toBe('Nicomachean Ethics, Book I');
    expect(citation1.prefix).toBe('[1101a]');
    expect(citation1.apparatus).toContain('Bekker pagination');

    const citation2 = CANONS.aristotle.formatCitation(ethics, 4);
    expect(citation2.reference).toBe('Nicomachean Ethics, Book IV');
    expect(citation2.prefix).toBe('[1122b]');

    const citation10 = CANONS.aristotle.formatCitation(ethics, 10);
    expect(citation10.reference).toBe('Nicomachean Ethics, Book X');
    expect(citation10.prefix).toBe('[1164b]');
  });

  it('ensures all book IDs are unique within their collections', () => {
    const bibleIds = new Set(CANONS.bible.books.map(b => b.id));
    expect(bibleIds.size).toBe(CANONS.bible.books.length);

    const aristotleIds = new Set(CANONS.aristotle.books.map(b => b.id));
    expect(aristotleIds.size).toBe(CANONS.aristotle.books.length);
  });

  it('ensures all books have positive chapter counts', () => {
    CANONS.bible.books.forEach(book => {
      expect(book.chapters).toBeGreaterThan(0);
      expect(book.abbr.length).toBeGreaterThan(0);
    });
    CANONS.aristotle.books.forEach(book => {
      expect(book.chapters).toBeGreaterThan(0);
      expect(book.abbr.length).toBeGreaterThan(0);
      expect(book.subtitle).toBeDefined();
    });
  });
});
