import { Hero, Heading, ServiceCards, Process, Eyebrow, Feature, Photo, Button, Industries, CTA } from '@/components/common';
import { metadata as seo } from '@/lib/seo';
export const metadata = seo('Our Services', 'Explore eight digital services: web and mobile development, design, e-commerce, SEO, email marketing, data backup and technology consulting.', '/services/', 'services-hero');
export default function Services() {
    return <>
    <Hero eyebrow="Our services" lines={['Technology', 'Solutions for a', 'Brighter Tomorrow']} text="From strategy to execution, we deliver digital solutions that help businesses innovate, grow and create lasting impact." image="services-hero" primary="Discuss Your Requirements" features={[{ icon: 'shield', text: 'Reliable Solutions' }, { icon: 'users', text: 'Collaborative Team' }, { icon: 'chart', text: 'Business Focused' }]}/>
    <section className="section" id="all-services">
    <div className="wrap">
    <Heading eyebrow="Our services" title="End-to-End" accent="Digital Solutions" text="Whether you need a modern website, an intuitive application or clearer technology direction — find the right starting point here."/>
    <ServiceCards />
    </div>
    </section>
    <section className="section dark-section service-process">
    <div className="wrap">
    <Heading eyebrow="Our process" title="From Challenges to" accent="Comprehensive Solutions" text="A structured and collaborative approach to deliver solutions that create real business value."/>
    <Process dark/>
    </div>
    </section>
    <section className="section">
    <div className="wrap partner-grid">
    <div>
    <Eyebrow>Why choose Noveltech</Eyebrow>
    <h2>Your Trusted<br />
    <em>Technology Partner</em>
    </h2>
    <p>We combine people, technology and strategy to help you make confident decisions and move forward.</p>
    <Button href="/contact/">Let’s Work Together</Button>
    </div>
    <div className="feature-grid">{[{ icon: 'users', title: 'Client-Centric Approach', text: 'Your goals guide the work.' }, { icon: 'bulb', title: 'Practical Thinking', text: 'Ideas with a clear purpose.' }, { icon: 'shield', title: 'Reliable & Secure', text: 'Care in every detail.' }, { icon: 'chart', title: 'Long-Term Partnerships', text: 'We grow with your business.' }].map((s, i) => <Feature key={s.title} {...s} index={i}/>)}</div>
    <Photo name="building" alt="Modern glass building with blue reflections"/>
    </div>
    </section>
    <Industries />
    <CTA />
    </>;
}
