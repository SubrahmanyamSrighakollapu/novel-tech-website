import Link from 'next/link';
import Image from 'next/image';
import Icon from './icon';
import { services } from '@/data/services';
import { industries, site } from '@/data/site';
import { Logo } from './header';
export function Photo({ name, alt, className = '', priority = false }: {
    name: string;
    alt: string;
    className?: string;
    priority?: boolean;
}) { return <Image className={'photo ' + className} src={'/images/' + name + '.webp'} alt={alt} width={1672} height={941} priority={priority} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 75vw, 1200px"/>; }
export function Button({ href, children, variant = '', icon = 'arrow' }: {
    href: string;
    children: React.ReactNode;
    variant?: string;
    icon?: string;
}) {
    return <Link className={'button ' + variant} href={href}>{children}<Icon name={icon} size={18}/>
    </Link>;
}
export function Eyebrow({ children }: {
    children: React.ReactNode;
}) { return <p className="eyebrow">{children}</p>; }
export function Heading({ eyebrow, title, accent, text }: {
    eyebrow: string;
    title: string;
    accent?: string;
    text?: string;
}) {
    return <div className="heading">
    <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>{title}{accent && <>
        <br />
        <em>{accent}</em>
        </>}</h2>
    </div>{text && <p>{text}</p>}</div>;
}
export function Feature({ icon, title, text, index = 0 }: {
    icon: string;
    title: string;
    text: string;
    index?: number;
}) {
    return <div className={'feature feature-' + index % 4}>
    <span className="icon-box">
    <Icon name={icon}/>
    </span>
    <div>
    <h3>{title}</h3>
    <p>{text}</p>
    </div>
    </div>;
}
export function Hero({ eyebrow, lines, text, image, primary = 'Get in Touch', href = '/contact/', secondary, secondaryHref, features, home = false, breadcrumb }: {
    eyebrow: string;
    lines: string[];
    text: string;
    image: string;
    primary?: string;
    href?: string;
    secondary?: string;
    secondaryHref?: string;
    features?: {
        icon: string;
        text: string;
    }[];
    home?: boolean;
    breadcrumb?: string;
}) {
    return <section className={'hero ' + (home ? 'home-hero' : '')}>
    <Photo name={image} alt="" priority className="hero-photo"/>
    <div className="hero-shade"/>
    <div className="wrap hero-inner">{breadcrumb && <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/services/">Services</Link>
        <span>›</span>
        <span>{breadcrumb}</span>
        </nav>}<div className="hero-copy">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1>{lines.map((line, i) => <span key={line} className={i === lines.length - 1 ? 'accent' : ''}>{line}</span>)}</h1>
    <p>{text}</p>
    <div className="button-row">
    <Button href={href}>{primary}</Button>{secondary && <Button href={secondaryHref || '/about/#our-story'} variant="outline" icon="arrow">{secondary}</Button>}</div>{features && <div className="hero-features">{features.map(f => <div key={f.text}>
            <span>
            <Icon name={f.icon}/>
            </span>
            <p>{f.text}</p>
            </div>)}</div>}</div>
    </div>{home && <div className="hero-principles wrap">{[['People', 'First in every decision'], ['Ideas', 'Built around your goals'], ['Technology', 'Made for real work'], ['Impact', 'Beyond the launch']].map(([a, b]) => <div key={a}>
            <strong>{a}</strong>
            <span>{b}</span>
            </div>)}</div>}</section>;
}
export function ServiceCards({ dark = false }: {
    dark?: boolean;
}) {
    return <div className={'service-grid ' + (dark ? 'dark-cards' : '')}>{services.map((s, i) => <Link href={'/services/' + s.slug + '/'} className={'service-card tone-' + i % 4} key={s.slug}>
        <span className="icon-box">
        <Icon name={s.icon} size={27}/>
        </span>
        <h3>{s.title}</h3>{!dark && <p>{s.summary}</p>}<span className="card-arrow">
        <Icon name="arrow" size={18}/>
        <span className="sr-only">Explore {s.title}</span>
        </span>{!dark && <span className="card-number">0{i + 1}</span>}</Link>)}</div>;
}
export function Process({ dark = false, hiring = false }: {
    dark?: boolean;
    hiring?: boolean;
}) {
    const steps = hiring ? [['file', 'Apply', 'Tell us about your experience.'], ['users', 'Review', 'We review your skills and interests.'], ['monitor', 'Interview', 'Get to know each other.'], ['rocket', 'Welcome', 'Start your next chapter.']] : [['search', 'Discover', 'Understand your goals and requirements.'], ['file', 'Plan', 'Create a strategy and project roadmap.'], ['design', 'Design', 'Craft clear, user-centred experiences.'], ['code', 'Develop', 'Build, test and optimise with care.'], ['rocket', 'Launch', 'Deploy and plan ongoing support.']];
    return <ol className={'process ' + (dark ? 'process-dark' : '')}>{steps.map(([icon, title, text], i) => <li key={title}>
        <span className="process-icon">
        <Icon name={icon} size={27}/>
        </span>
        <strong>0{i + 1}</strong>
        <h3>{title}</h3>
        <p>{text}</p>
        </li>)}</ol>;
}
export function Industries() {
    return <section className="section industries">
    <div className="wrap split">
    <div>
    <Eyebrow>Industries we serve</Eyebrow>
    <h2>A Diverse Range<br />
    <em>of Industries</em>
    </h2>
    <p>Practical digital solutions for different challenges, people and ways of working.</p>
    </div>
    <div className="industry-grid">{industries.map(([icon, text]) => <div key={text}>
        <Icon name={icon} size={29}/>
        <h3>{text}</h3>
        </div>)}</div>
    </div>
    </section>;
}
export function CTA({ light = false }: {
    light?: boolean;
}) {
    return <section className={'cta ' + (light ? 'cta-light' : '')}>
    <Photo name={light ? 'building' : 'sydney'} alt=""/>
    <div className="wrap cta-inner">
    <div>
    <Eyebrow>Let’s build what’s next</Eyebrow>
    <h2>Ready to Turn Your Ideas<br />
    <em>into Reality?</em>
    </h2>
    </div>
    <div>
    <p>Let’s discuss how Noveltech can help you achieve your business goals.</p>
    <Button href="/contact/" variant={light ? 'navy' : 'white'}>Get in Touch</Button>
    </div>
    </div>
    </section>;
}
export function Footer() {
    return <footer className="footer">
    <div className="wrap">
    <div className="footer-grid">
    <div>
    <Logo />
    <p>Innovative IT solutions for a smarter,<br />brighter and more connected world.</p>
    <p className="footer-motto">Ideas. Technology. Impact.</p>
    </div>
    <div>
    <h2>Quick Links</h2>{[['Home', '/'], ['About', '/about/'], ['Services', '/services/'], ['Career', '/career/'], ['Contact', '/contact/']].map(([a, b]) => <Link key={a} href={b}>{a}</Link>)}</div>
    <div>
    <h2>Our Services</h2>{services.map(s => <Link key={s.slug} href={'/services/' + s.slug + '/'}>{s.title}</Link>)}</div>
    <div>
    <h2>Contact Info</h2>
    <p>
    <Icon name="pin" size={18}/>{site.location}</p>
    <a href={'mailto:' + site.email}>
    <Icon name="mail" size={18}/>{site.email}</a>
    <a href={'tel:' + site.phoneLink}>
    <Icon name="call" size={18}/>{site.phone}</a>
    <button className="back-top" type="button" aria-label="Back to top">
    <Icon name="up" size={18}/>
    </button>
    </div>
    </div>
    <div className="footer-bottom">
    <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
    <span>Ideas <i /> Technology <i /> Impact</span>
    </div>
    </div>
    </footer>;
}
export function FAQ({ items }: {
    items: {
        q: string;
        a: string;
    }[];
}) {
    return <div className="faq-list">{items.map((f, i) => <details key={f.q} open={i === 0}>
        <summary>{f.q}<span aria-hidden="true">+</span>
        </summary>
        <p>{f.a}</p>
        </details>)}</div>;
}
export function ProjectInvite() {
    return <section className="section project-invite">
    <div className="wrap split">
    <div className="project-photo">
    <Photo name="building" alt="Contemporary glass office architecture"/>
    <div>
    <h2>Let’s Build<br />Your Next<br />Big Idea</h2>
    </div>
    </div>
    <div>
    <Eyebrow>Ready to get started?</Eyebrow>
    <h2>Let’s Create Something Great Together</h2>
    <p>Share your requirements with us and we’ll help you find the right next step for your business.</p>
    <div className="button-row">
    <Button href="/contact/">Get in Touch</Button>
    <Button href="/contact/#message" variant="outline light-outline">Discuss Your Project</Button>
    </div>
    </div>
    </div>
    </section>;
}
