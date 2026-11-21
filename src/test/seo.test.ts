import { describe, it, expect } from 'vitest';
import { seo } from '@/lib/seo';
describe('Self-referencing metadata', () => {
  it('resolves each canonical to its own published page', () => expect(seo('Title','Description','/about').links[0]?.href).toBe('https://garuda-auto.lovable.app/about'));
  it('keeps social URL on the same service page', () => expect(seo('Title','Description','/services/oil-filter-service').meta.find(tag=>'property' in tag && tag.property==='og:url')?.content).toBe('https://garuda-auto.lovable.app/services/oil-filter-service'));
});
