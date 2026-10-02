import { Hero, Eyebrow, Photo, FAQ, CTA } from '@/components/common';
import ContactForm from '@/components/contact-form';
import Icon from '@/components/icon';
import { site, faqs } from '@/data/site';
import { metadata as seo, structured } from '@/lib/seo';
export const metadata = seo('Contact Us', 'Talk to Noveltech about your next website, mobile app, design project or technology challenge. Let’s create something great together.', '/contact/', 'contact-hero');
export default function Contact() {
    return <>
    <Hero eyebrow="Get in touch" lines={['Let’s Build', 'Something Great', 'Together']} text="Have a project in mind? Need advice? We’re here to help. Reach out to our team and let’s create a smarter tomorrow for your business." image="contact-hero" primary="Tell Us About Your Project" href="#message" features={[{ icon: 'mail', text: 'Talk to Our Team' }, { icon: 'rocket', text: 'Tailored Solutions' }, { icon: 'users', text: 'Start Your Journey' }]}/>
    <section className="section soft-section" id="message">
    <div className="wrap">
    <div className="contact-grid">
    <div className="panel">
    <Eyebrow>Send us a message</Eyebrow>
    <h2>We’d Love to Hear From You</h2>
    <p>Tell us a little about your project and prepare an email to our team.</p>
    <ContactForm />
    </div>
    <aside className="panel contact-info">
    <Eyebrow>Get in touch</Eyebrow>
    <h2>Contact Information</h2>
    <p>Reach out through any of the channels below. We’re happy to help.</p>{[{ icon: 'pin', title: 'Our Location', text: site.location, href: '' }, { icon: 'call', title: 'Call Us', text: site.phone, href: 'tel:' + site.phoneLink }, { icon: 'mail', title: 'Email Us', text: site.email, href: 'mailto:' + site.email }, { icon: 'clock', title: 'Business Hours', text: site.hours + ' · Weekends closed', href: '' }].map((x, i) => <div className={'contact-detail tone-' + i} key={x.title}>
        <span className="icon-box">
        <Icon name={x.icon}/>
        </span>
        <div>
        <h3>{x.title}</h3>{x.href ? <a href={x.href}>{x.text}</a> : <p>{x.text}</p>}</div>
        </div>)}<div className="contact-note">
    <Icon name="globe" size={22}/>
    <p>Working with businesses across Australia.<br />Remote project conversations are welcome.</p>
    </div>
    </aside>
    </div>
    <div className="visit-grid">
    <div className="location-photo">
    <Photo name="sydney" alt="Sydney Harbour, the Opera House and city skyline"/>
    <div className="floating-label">
    <Icon name="pin"/>
    <span>Novel Technology Solutions<small>Sydney, Australia</small>
    </span>
    </div>
    </div>
    <div className="visit-card">
    <div>
    <h3>Let’s Meet</h3>
    <p>Arrange a conversation with our team to explore your ideas and the next steps for your business.</p>
    <a className="button outline light-outline" href={'mailto:' + site.email + '?subject=Meeting%20request'}>Arrange a Meeting <Icon name="arrow" size={16}/>
    </a>
    </div>
    <Photo name="about-hero" alt="A contemporary office reception area"/>
    </div>
    </div>
    </div>
    </section>
    <section className="section" id="faqs">
    <div className="wrap split faq-section">
    <div>
    <Eyebrow>Quick answers</Eyebrow>
    <h2>Frequently Asked<br />Questions</h2>
    <p>Find answers to common questions. Can’t find what you’re looking for? Get in touch with our team.</p>
    </div>
    <FAQ items={faqs}/>
    </div>
    </section>
    <CTA />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structured({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }}/>
    </>;
}
