'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const selectors = [
            '.heading',
            '.feature',
            '.service-card',
            '.process > li',
            '.split > div',
            '.values-grid > div',
            '.strengths > div',
            '.expertise-grid > div',
            '.testimonial-grid > div',
            '.story-collage',
            '.compact-services',
            '.faq-list > details',
            '.panel',
            '.contact-detail',
            '.visit-grid > div',
            '.career-values > div',
            '.hiring-grid > div',
            '.cta',
            '.partner-grid > div',
            '.industry-grid > div',
            '.tech-chip',
            '.hero-copy > .eyebrow',
            '.hero-copy > p',
            '.hero-copy > .button-row',
            '.hero-features > div',
            '.hero-principles > div',
            '.values-copy',
            '.career-cta .wrap > div',
            '[data-reveal]'
        ];

        const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(', ')));
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;
        let lastScrollY = window.scrollY;

        const observer = new IntersectionObserver(
            (entries) => {
                const scrollingDown = window.scrollY >= lastScrollY;
                lastScrollY = window.scrollY;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Content entering from below moves up; content re-entering
                        // from above moves down. Explicit zoom/fade reveals are kept.
                        const element = entry.target as HTMLElement;
                        const reveal = element.dataset.reveal;
                        if (reveal === 'up' || reveal === 'down') {
                            element.dataset.reveal = scrollingDown ? 'up' : 'down';
                        }
                        entry.target.classList.add('in-view');
                    } else {
                        // Re-arm after it has fully left the viewport so the reveal
                        // also runs when the user reverses their scroll direction.
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '-24px 0px -24px 0px',
            }
        );

        elements.forEach((el) => {
            if (!el.hasAttribute('data-reveal')) {
                const isCard = el.matches([
                    '.feature',
                    '.service-card',
                    '.process > li',
                    '.industry-grid > div',
                    '.hero-features > div',
                    '.hero-principles > div',
                    '.contact-detail',
                    '.faq-list > details',
                    '.tech-chip'
                ].join(', '));
                const parentIndex = el.parentElement
                    ? Array.from(el.parentElement.children).indexOf(el)
                    : 0;

                if (isCard) {
                    el.setAttribute('data-reveal', 'card');
                } else if (el.classList.contains('eyebrow') || el.classList.contains('mega-eyebrow')) {
                    el.setAttribute('data-reveal', 'down');
                } else if (el.classList.contains('story-collage') || el.classList.contains('glass-quote') || el.classList.contains('rounded-photo')) {
                    el.setAttribute('data-reveal', 'zoom');
                } else if (el.matches('.heading, .values-copy, .hero-copy > p, .hero-copy > .button-row')) {
                    el.setAttribute('data-reveal', 'left');
                } else {
                    el.setAttribute('data-reveal', parentIndex % 2 === 0 ? 'left' : 'right');
                }
            }

            // Calculate stagger delay for items inside grids
            const parent = el.parentElement;
            if (parent) {
                const staggeredParents = ['strengths', 'service-grid', 'values-grid', 'feature-grid', 'services-mega-grid', 'industry-grid', 'compact-services', 'process', 'hero-features', 'hero-principles', 'faq-list'];
                if (staggeredParents.some(c => parent.classList.contains(c))) {
                    const siblings = Array.from(parent.children);
                    const sibIndex = siblings.indexOf(el);
                    el.style.setProperty('--stagger-delay', `${(sibIndex % 8) * 90}ms`);
                }
            }
        });

        // Apply the hidden starting state for one paint before revealing items.
        // Without this frame boundary, above-the-fold elements skip the transition.
        document.body.classList.add('js-reveal-ready');
        frame = window.requestAnimationFrame(() => {
            if (reducedMotion) {
                elements.forEach((el) => el.classList.add('in-view'));
                return;
            }
            elements.forEach((el) => observer.observe(el));
        });

        return () => {
            window.cancelAnimationFrame(frame);
            observer.disconnect();
            elements.forEach((el) => {
                el.classList.remove('in-view');
                el.style.removeProperty('--stagger-delay');
            });
            document.body.classList.remove('js-reveal-ready');
        };
    }, [pathname]);

    return null;
}
