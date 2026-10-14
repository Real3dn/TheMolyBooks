import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('PWA & iOS Configuration', () => {
  it('index.html contains iOS standalone meta tags and apple touch icon', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    expect(htmlContent).toContain('apple-mobile-web-app-capable');
    expect(htmlContent).toContain('apple-mobile-web-app-status-bar-style');
    expect(htmlContent).toContain('viewport-fit=cover');
    expect(htmlContent).toContain('rel="apple-touch-icon" href="/apple-touch-icon.png"');
    const iconPath = path.resolve(__dirname, '../public/apple-touch-icon.png');
    expect(fs.existsSync(iconPath)).toBe(true);
  });

  it('vite.config.ts registers VitePWA plugin', () => {
    const configPath = path.resolve(__dirname, '../vite.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    expect(configContent).toContain('VitePWA');
  });
});
