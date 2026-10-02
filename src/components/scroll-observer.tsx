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
        let scrollToTopFrame = 0;

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

        const scrollToTop = () => {
            window.cancelAnimationFrame(scrollToTopFrame);
            const startY = window.scrollY;
            if (startY <= 0) return;

            // Keep the journey perceptible on long pages while avoiding an
            // excessively slow return on shorter ones.
            const duration = Math.min(2200, Math.max(1100, startY * 0.45));
            const startedAt = performance.now();
            const easeInOutCubic = (progress: number) => progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const step = (now: number) => {
                const progress = Math.min((now - startedAt) / duration, 1);
                window.scrollTo(0, Math.round(startY * (1 - easeInOutCubic(progress))));
                if (progress < 1) scrollToTopFrame = window.requestAnimationFrame(step);
            };

            scrollToTopFrame = window.requestAnimationFrame(step);
        };

        const backToTop = document.querySelector<HTMLButtonElement>('.back-top');
        backToTop?.addEventListener('click', scrollToTop);

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
            window.cancelAnimationFrame(scrollToTopFrame);
            window.removeEventListener('scroll', updateScrollDirection);
            backToTop?.removeEventListener('click', scrollToTop);
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
