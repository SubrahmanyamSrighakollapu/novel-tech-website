import { Hero, Eyebrow, Photo, Button, ServiceCards, Industries, CTA, Feature } from '@/components/common';
import { metadata as seo } from '@/lib/seo';
export const metadata = seo('About Us', 'Meet Noveltech: people, ideas and technology working together to build practical digital solutions for Australian businesses.', '/about/', 'about-hero');
export default function About() {
    return <>
    <Hero eyebrow="About us" lines={['We Are', 'Novel Technology']} text="Enhancing business through technology. We bring a thoughtful approach to digital services for Australian businesses." image="about-hero" primary="Our Journey" href="#our-story" secondary="Explore Our Services" secondaryHref="/services/" features={[{ icon: 'users', text: 'People First' }, { icon: 'bulb', text: 'Ideas That Matter' }, { icon: 'target', text: 'Client Focused' }]}/>
    <section className="section" id="our-story">
    <div className="wrap split story-grid">
    <div>
    <Eyebrow>Our story</Eyebrow>
    <h2>At NTS We Enhance<br />Business Through<br />
    <em>Technology</em>
    </h2>
    <p className="lead">We put thoughtful technology to work for Australian businesses.</p>
    <p>We believe the best solutions begin with listening. Understanding your team, your customers and your goals helps us recommend technology that makes sense for your business.</p>
    <p>From your first website to a connected digital platform, we combine design, development and practical advice to help you move forward with confidence.</p>
    <Button href="/contact/">Let’s Get to Know You</Button>
    </div>
    <div className="story-collage">
    <Photo name="sydney" alt="Sydney harbour and city skyline"/>
    <div className="image-caption">Proudly Sydney Based<br />Globally Minded</div>
    <Photo name="career-hero" alt="A team collaborating around a table" className="story-inset"/>
    <div className="floating-label">
    <span>People<br />Technology<br />Growth</span>
    </div>
    </div>
    </div>
    </section>
    <section className="section soft-section">
    <div className="wrap expertise-grid">
    <div>
    <Eyebrow>What we do</Eyebrow>
    <h2>Complete Digital Solutions<br />for Every Business</h2>
    <p>Design, development, marketing and technology advice — connected around your business priorities.</p>
    </div>
    <div className="compact-services">
    <ServiceCards dark/>
    </div>
    </div>
    </section>
    <section className="values dark-section">
    <Photo name="values" alt="Climbers helping one another reach a mountain summit"/>
    <div className="wrap">
    <div className="values-copy">
    <Eyebrow>Our values</Eyebrow>
    <h2>The Principles<br />Behind Our Work</h2>
    <p>Our values guide how we collaborate, solve problems and build lasting relationships with our clients.</p>
    </div>
    <div className="values-grid">{[{ icon: 'shield', title: 'Integrity', text: 'We do what’s right.' }, { icon: 'bulb', title: 'Innovation', text: 'We explore new possibilities.' }, { icon: 'users', title: 'Collaboration', text: 'We grow stronger together.' }, { icon: 'star', title: 'Excellence', text: 'We aim higher.' }].map((v, i) => <Feature key={v.title} {...v} index={i}/>)}</div>
    </div>
    </section>
    <Industries />
    <section className="section soft-section">
    <div className="wrap split">
    <div className="rounded-photo">
    <Photo name="building" alt="Modern glass office building"/>
    </div>
    <div>
    <Eyebrow>Our reach</Eyebrow>
    <h2>Digital Services for Businesses<br />of Every Size</h2>
    <p>Every business deserves a technology partner who takes its needs seriously. We work with small teams and growing organisations to define realistic priorities and deliver focused solutions.</p>
    <p>As your needs evolve, we help you plan the next step with the same care, clarity and attention to detail.</p>
    <Button href="/services/" variant="outline light-outline">Explore Our Capabilities</Button>
    </div>
    </div>
    </section>
    <CTA />
    </>;
}
