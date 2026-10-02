import type { Metadata } from 'next';
import { site } from '@/data/site';
export const configured = site.url !== 'https://example.com' && !site.url.includes('your-domain');
export function metadata(title: string, description: string, path: string, image = 'home-hero'): Metadata { return { title, description, alternates: { canonical: site.url + path }, openGraph: { title: title + ' | Noveltech', description, url: site.url + path, siteName: site.name, type: 'website', locale: 'en_AU', images: [{ url: site.url + '/images/' + image + '.webp', width: 1672, height: 941, alt: title }] }, twitter: { card: 'summary_large_image', title: title + ' | Noveltech', description, images: [site.url + '/images/' + image + '.webp'] }, robots: { index: configured, follow: configured } }; }
export function structured(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
export function breadcrumb(items: {
    name: string;
    path: string;
}[]) { return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: site.url + item.path })) }; }
