import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { metadata as seo, structured, breadcrumb } from '@/lib/seo';
import { Hero, Eyebrow, Feature, Button, Photo, Heading, Process, ProjectInvite } from '@/components/common';
import Icon from '@/components/icon';
export const dynamicParams = false;
export function generateStaticParams() { return services.map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const s = services.find(x => x.slug === slug); return s ? seo(s.title, s.intro, '/services/' + s.slug + '/', s.image) : {}; }
export default async function ServicePage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const s = services.find(x => x.slug === slug);
    if (!s)
        notFound();
    const features = [{ icon: s.icon, title: 'Custom Solutions', text: 'Built around your goals and workflows.' }, { icon: 'users', title: 'People First', text: 'Clear experiences for the people who use them.' }, { icon: 'shield', title: 'Quality & Reliability', text: 'Careful planning, review and testing.' }, { icon: 'chart', title: 'Business Focused', text: 'Practical decisions with a clear purpose.' }];
    return <>
    <Hero eyebrow={s.title} lines={s.headline} text={s.intro} image={s.image} primary="Get a Free Consultation" secondary="Explore Our Approach" secondaryHref="#our-process" breadcrumb={s.title} features={[{ icon: 'chart', text: 'Scalable Solutions' }, { icon: 'settings', text: 'Modern Approaches' }, { icon: 'users', text: 'Business Focused' }]}/>
    <section className="section">
    <div className="wrap split">
    <div>
    <Eyebrow>Why choose us</Eyebrow>
    <h2>{s.value}<br />
    <em>{s.accent}</em>
    </h2>
    <p>{s.summary}</p>
    <Button href={'/contact/?service=' + s.slug}>Let’s Create Together</Button>
    </div>
    <div className="feature-grid">{features.map((f, i) => <Feature {...f} key={f.title} index={i}/>)}</div>
    </div>
    </section>
    <section className="section soft-section">
    <div className="wrap">
    <Heading eyebrow="What we offer" title={'Our ' + s.title + ' Services'} text="Focused capabilities, thoughtful delivery and a collaborative approach from beginning to end."/>
    <div className="offering-grid">{s.offers.map((o, i) => <article className="offering-card" key={o.title}>
        <Photo name={o.image} alt={o.title + ' workspace illustration'}/>
        <div>
        <h3>{o.title}</h3>
        <p>{o.text}</p>
        <details>
        <summary>Learn More <Icon name="arrow" size={16}/>
        </summary>
        <p>{o.detail}</p>
        <a href={'/contact/?service=' + s.slug + '&subject=' + encodeURIComponent(o.title)}>Discuss this service <Icon name="arrow" size={14}/>
        </a>
        </details>
        </div>
        </article>)}</div>
    </div>
    </section>
    <section className="section" id="our-process">
    <div className="wrap">
    <Heading eyebrow="Our process" title="A Clear Path from Idea" accent="to Impact" text="We agree on the scope, communicate through each stage and review the outcome together."/>
    <Process />
    </div>
    </section>
    <section className="tech-strip dark-section">
    <div className="wrap">
    <div>
    <Eyebrow>Tools & approaches</Eyebrow>
    <h2>Modern Thinking.<br />
    <em>Practical Solutions.</em>
    </h2>
    </div>
    <ul>{s.technologies.map((t, i) => <li key={t}>
        <span>
        <Icon name={['code', 'settings', 'database', 'globe', 'checks', 'bulb'][i]} size={25}/>
        </span>{t}</li>)}</ul>
    </div>
    </section>
    <ProjectInvite />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured([breadcrumb([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: s.title, path: '/services/' + s.slug + '/' }]), { '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.intro, url: site.url + '/services/' + s.slug + '/', provider: { '@type': 'Organization', name: site.legalName, url: site.url }, areaServed: 'Australia' }]) }}/>
    </>;
}
