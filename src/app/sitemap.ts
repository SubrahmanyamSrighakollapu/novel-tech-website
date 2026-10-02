import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['', 'about', 'services', 'career', 'contact', ...services.map(s => 'services/' + s.slug)].map(path => ({ url: site.url + '/' + (path ? path + '/' : ''), changeFrequency: path ? 'monthly' : 'weekly', priority: path ? 0.7 : 1 })); }
