'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTORS = [
    '.heading',
    '.feature',
    '.service-card',
    '.process > li',
    '.split > div',
    '.testimonial-grid > div',
    '.story-collage',
    '.faq-list > details',
    '.panel',
    '.contact-detail',
    '.visit-grid > div',
    '.career-values > div',
    '.hiring-grid > div',
    '.cta-inner > div',
    '.partner-grid > div',
    '.industry-grid > div',
    '.tech-chip',
    '.values-copy',
    '.career-cta .wrap > div',
    '[data-reveal]'
];

const CARD_SELECTOR = [
    '.feature',
    '.service-card',
    '.process > li',
    '.industry-grid > div',
    '.contact-detail',
    '.faq-list > details',
    '.tech-chip'
].join(', ');

const STAGGERED_PARENT_CLASSES = new Set([
    'strengths',
    'service-grid',
    'values-grid',
    'feature-grid',
    'industry-grid',
    'process',
    'faq-list'
]);

type ScrollDirection = 'up' | 'down';

export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const allMatches = Array.from(
            document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS.join(', '))
        );

        // Never animate a container and its animated descendants together. Nested
        // transforms were compounding and made entire grids appear to flash/jump.
        const elements = allMatches.filter((element) =>
            !allMatches.some((candidate) => candidate !== element && element.contains(candidate))
        );
        const generatedRevealAttributes = new Set<HTMLElement>();

        let direction: ScrollDirection = 'down';
        let lastScrollY = window.scrollY;
        let scrollFrame = 0;
        let initialiseFrame = 0;

        const updateScrollDirection = () => {
            if (scrollFrame) return;
            scrollFrame = window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                if (Math.abs(currentScrollY - lastScrollY) > 2) {
                    direction = currentScrollY > lastScrollY ? 'down' : 'up';
                    lastScrollY = currentScrollY;
                }
                scrollFrame = 0;
            });
        };

        const setEntrySide = (element: HTMLElement, side: ScrollDirection) => {
            element.classList.toggle('reveal-from-top', side === 'up');
            element.classList.toggle('reveal-from-bottom', side === 'down');
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const element = entry.target as HTMLElement;

                if (entry.isIntersecting) {
                    setEntrySide(element, direction);
                    element.classList.add('in-view');
                    return;
                }

                // Reset instantly only after the target is outside the viewport.
                // Its geometric position determines the correct side for re-entry.
                const rootTop = entry.rootBounds?.top ?? 0;
                const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight;
                const side: ScrollDirection = entry.boundingClientRect.bottom <= rootTop
                    ? 'up'
                    : entry.boundingClientRect.top >= rootBottom
                        ? 'down'
                        : direction;
                setEntrySide(element, side);
                element.classList.remove('in-view');
            });
        }, {
            threshold: 0.08,
            rootMargin: '-4% 0px -8% 0px'
        });

        elements.forEach((element) => {
            if (!element.hasAttribute('data-reveal')) {
                generatedRevealAttributes.add(element);
                const parentIndex = element.parentElement
                    ? Array.from(element.parentElement.children).indexOf(element)
                    : 0;

                if (element.matches(CARD_SELECTOR)) {
                    element.dataset.reveal = 'card';
                } else if (element.matches('.story-collage, .glass-quote, .rounded-photo')) {
                    element.dataset.reveal = 'zoom';
                } else {
                    element.dataset.reveal = parentIndex % 2 === 0 ? 'left' : 'right';
                }
            }

            const parent = element.parentElement;
            if (parent && [...STAGGERED_PARENT_CLASSES].some((name) => parent.classList.contains(name))) {
                const siblingIndex = Array.from(parent.children).indexOf(element);
                element.style.setProperty('--stagger-delay', `${Math.min(siblingIndex, 5) * 110}ms`);
            }

            const rect = element.getBoundingClientRect();
            setEntrySide(element, rect.bottom < 0 ? 'up' : 'down');
        });

        document.body.classList.add('js-reveal-ready');
        window.addEventListener('scroll', updateScrollDirection, { passive: true });
        initialiseFrame = window.requestAnimationFrame(() => {
            elements.forEach((element) => observer.observe(element));
        });

        return () => {
            window.cancelAnimationFrame(initialiseFrame);
            window.cancelAnimationFrame(scrollFrame);
            window.removeEventListener('scroll', updateScrollDirection);
            observer.disconnect();
            elements.forEach((element) => {
                element.classList.remove('in-view', 'reveal-from-top', 'reveal-from-bottom');
                element.style.removeProperty('--stagger-delay');
                if (generatedRevealAttributes.has(element)) {
                    element.removeAttribute('data-reveal');
                }
            });
            document.body.classList.remove('js-reveal-ready');
        };
    }, [pathname]);

    return null;
}
