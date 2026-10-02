import { Hero, Heading, Feature, ServiceCards, Process, CTA, Button, Eyebrow, Photo } from '@/components/common';
import { strengths } from '@/data/site';
import Icon from '@/components/icon';
import { metadata as seo } from '@/lib/seo';
export const metadata = seo('Digital Solutions for Your Business', 'Websites, mobile applications, design, e-commerce and technology consulting. Turn your ideas into useful digital experiences with Noveltech.', '/');
export default function Home() {
    return <>
    <Hero home eyebrow="Ideas today. A brighter tomorrow." lines={['Building', 'What’s Next', 'Together.']} text="We partner with businesses to design, develop and deliver technology solutions that drive growth and create lasting impact." image="home-hero" primary="Start Your Project" secondary="Our Story"/>
    <section className="section">
    <div className="wrap">
    <Heading eyebrow="Why choose Noveltech" title="More Than a Tech Company" accent="A Growth Partner" text="We combine creativity, technology and strategy to deliver solutions that create real business value."/>
    <div className="strengths">{strengths.map((s, i) => <Feature {...s} index={i} key={s.title}/>)}</div>
    </div>
    </section>
    <section className="section expertise dark-section">
    <Photo name="contact-hero" alt=""/>
    <div className="wrap expertise-grid">
    <div>
    <Eyebrow>Our expertise</Eyebrow>
    <h2>Digital Solutions<br />for Real-World<br />Challenges</h2>
    <p>From strategy to execution, we deliver digital solutions tailored to your business goals.</p>
    <Button href="/services/" variant="outline">Explore All Services</Button>
    </div>
    <ServiceCards dark/>
    </div>
    </section>
    <section className="section">
    <div className="wrap">
    <Heading eyebrow="Our process" title="A Clear Path" accent="to Your Success." text="A structured and collaborative process turns your ideas into useful, scalable digital solutions."/>
    <Process />
    </div>
    </section>
    <section className="testimonial dark-section">
    <Photo name="career-hero" alt=""/>
    <div className="wrap testimonial-grid">
    <div>
    <Eyebrow>Our commitment</Eyebrow>
    <h2>Good People.<br />Meaningful Work.</h2>
    </div>
    <div className="glass-quote">
    <Icon name="handshake" size={38}/>
    <blockquote>We listen carefully, communicate clearly and build with your goals in mind. From the first conversation to the next improvement, we work as part of your team.</blockquote>
    <p>THE NOVELTECH APPROACH</p>
    </div>
    <p className="script-note">Real People.<br />Real Impact.</p>
    </div>
    </section>
    <CTA light/>
    </>;
}
