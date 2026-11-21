const siteUrl = 'https://garuda-auto.lovable.app';
export function seo(title: string, description: string, path: string, type = 'website') {
  const url = new URL(path, siteUrl).href;
  return {
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: type }, { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}
export function structuredData(value: Record<string, unknown>) {
  return { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', ...value }).replace(/</g, '\\u003c') };
}
