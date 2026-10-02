'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/data/services';
import Icon from './icon';

const serviceDescriptions: Record<string, string> = {
    'web-development': 'Custom high-performance web apps & sites',
    'mobile-application-development': 'iOS, Android & cross-platform apps',
    'web-graphic-design': 'Brand identity, UI/UX & digital design',
    'e-commerce': 'Online storefronts, payments & checkout',
    'seo': 'Search ranking, technical & local SEO',
    'email-marketing': 'Targeted campaigns & automation',
    'data-backup-recovery': 'Cloud backup, recovery & resilience',
    'consulting-services': 'Tech strategy, architecture & advisory',
};

export function Logo() {
    return <Link href="/" className="logo" aria-label="Noveltech home">
    <img src="/images/Noveltech-Logo.png" alt="Noveltech" className="logo-img" width="210" height="52"/>
    </Link>;
}

export default function Header() {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDetailsElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setOpen(false);
        if (dropdownRef.current) {
            dropdownRef.current.open = false;
        }
    }, [path]);

    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                if (dropdownRef.current) {
                    dropdownRef.current.open = false;
                }
            }
        };
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, []);

    const handleMouseEnter = () => {
        if (typeof window !== 'undefined' && window.innerWidth > 900) {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            if (dropdownRef.current) {
                dropdownRef.current.open = true;
            }
        }
    };

    const handleMouseLeave = () => {
        if (typeof window !== 'undefined' && window.innerWidth > 900) {
            hoverTimeoutRef.current = setTimeout(() => {
                if (dropdownRef.current) {
                    dropdownRef.current.open = false;
                }
            }, 180);
        }
    };

    return <header className="site-header">
    <div className="wrap header-inner">
    <Logo />
    <button className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
    <Icon name={open ? 'close' : 'menu'}/>
    </button>
    <nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
    <Link href="/" aria-current={path === '/' ? 'page' : undefined}>Home</Link>
    <Link href="/about/" aria-current={path.startsWith('/about') ? 'page' : undefined}>About</Link>
    <details ref={dropdownRef} className="nav-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <summary className={path.startsWith('/services') ? 'active' : ''}>
        Services <Icon name="down" size={14} className="dropdown-chevron"/>
    </summary>
    <div className="dropdown-panel">
        <div className="mega-menu-content">
        <div className="mega-menu-main">
            <div className="mega-menu-header">
            <span className="mega-eyebrow">OUR CAPABILITIES</span>
            <span className="mega-count">8 Specialized Services</span>
            </div>
            <div className="services-mega-grid">
            {services.map(s => (
                <Link key={s.slug} href={'/services/' + s.slug + '/'} className="mega-service-item" aria-current={path.includes(s.slug) ? 'page' : undefined}>
                <div className="mega-icon-box">
                    <Icon name={s.icon} size={20}/>
                </div>
                <div className="mega-service-text">
                    <div className="mega-service-title">
                    <span>{s.title}</span>
                    <Icon name="arrow" size={13} className="mega-arrow"/>
                    </div>
                    <p className="mega-service-desc">{serviceDescriptions[s.slug] || s.summary}</p>
                </div>
                </Link>
            ))}
            </div>
        </div>
        <div className="mega-menu-spotlight">
            <div>
            <div className="spotlight-badge">
                <Icon name="rocket" size={15}/>
                <span>TAILORED SOLUTIONS</span>
            </div>
            <h3>Engineered for Business Impact</h3>
            <p>From high-performance web platforms to cloud resilience, we build software solutions tailored around your goals.</p>
            </div>
            <div className="spotlight-actions">
            <Link href="/services/" className="button mega-cta">
                Explore All Services <Icon name="arrow" size={16}/>
            </Link>
            <Link href="/contact/" className="spotlight-link">
                Book a Free Consultation <Icon name="arrow" size={14}/>
            </Link>
            </div>
        </div>
        </div>
    </div>
    </details>
    <Link href="/career/" aria-current={path.startsWith('/career') ? 'page' : undefined}>Career</Link>
    <Link href="/contact/" aria-current={path.startsWith('/contact') ? 'page' : undefined}>Contact</Link>
    </nav>
    <Link className="button outline header-cta" href="/contact/">Let’s Talk <Icon name="arrow" size={17}/>
    </Link>
    </div>
    </header>;
}

