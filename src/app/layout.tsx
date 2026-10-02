import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import { Footer } from '@/components/common';
import ScrollObserver from '@/components/scroll-observer';
import { site } from '@/data/site';
import { structured, configured } from '@/lib/seo';
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: 'Noveltech | Ideas. Technology. Impact.', template: '%s | Noveltech' }, description: site.description, applicationName: 'Noveltech', robots: { index: configured, follow: configured }, icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return <html lang="en-AU">
    <body id="top">
    <ScrollObserver />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured({ '@context': 'https://schema.org', '@type': 'Organization', name: site.legalName, url: site.url, logo: site.url + '/images/Noveltech-Logo.png', description: site.description, email: site.email, areaServed: 'Australia' }) }}/>
    </body>
    </html>;
}

