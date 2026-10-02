import { Hero, Eyebrow, Feature, Button, Process, Photo } from '@/components/common';
import Careers from '@/components/careers';
import { site } from '@/data/site';
import { metadata as seo } from '@/lib/seo';
import Icon from '@/components/icon';
export const metadata = seo('Careers', 'Explore development, design and technology careers at Noveltech. Discover our approach to work and ask about current opportunities.', '/career/', 'career-hero');
export default function Career() {
    return <>
    <Hero eyebrow="Careers at Noveltech" lines={['Build Your', 'Future With Us']} text="Be part of a team shaping a smarter tomorrow through technology. Grow your skills, work on meaningful projects and make an impact." image="career-hero" primary="Explore Opportunities" href="#opportunities" secondary="Life at Noveltech" secondaryHref="#life" features={[{ icon: 'briefcase', text: 'Meaningful Work' }, { icon: 'bulb', text: 'Learning & Growth' }, { icon: 'users', text: 'Supportive Team' }]}/>
    <section className="section" id="life">
    <div className="wrap career-values">
    <div>
    <Eyebrow>Why work with us</Eyebrow>
    <h2>More Than Just<br />a Job</h2>
    <p>Good work starts with good people. We value curiosity, honest communication and a shared commitment to making technology more useful.</p>
    <Button href="#opportunities">Find Your Place</Button>
    </div>{[{ icon: 'briefcase', title: 'Meaningful Work', text: 'Solve real problems for people and businesses. Bring your perspective to projects from the first discussion through delivery.' }, { icon: 'users', title: 'Life & Culture', text: 'Share ideas, ask questions and learn from one another. Collaboration and clear communication are part of how we work.' }, { icon: 'chart', title: 'Learning & Growth', text: 'Develop your skills through hands-on work, constructive feedback and exposure to different challenges.' }].map((f, i) => <Feature key={f.title} {...f} index={i}/>)}</div>
    </section>
    <section className="section soft-section" id="opportunities">
    <div className="wrap">
    <Careers />
    </div>
    </section>
    <section className="section" id="hiring-process">
    <div className="wrap hiring-grid">
    <div>
    <Eyebrow>Our hiring process</Eyebrow>
    <h2>A Simple & Fair<br />Process</h2>
    <p>We aim to give you a clear picture of the role, make space for your questions and understand what you can bring to the team.</p>
    <a className="text-button" href={'mailto:' + site.careerEmail}>Ask a question <Icon name="arrow" size={17}/>
    </a>
    </div>
    <Process hiring/>
    </div>
    </section>
    <section className="career-cta dark-section">
    <Photo name="sydney" alt=""/>
    <div className="wrap">
    <div>
    <Eyebrow>Ready to make an impact?</Eyebrow>
    <h2>Let’s Build a Better<br />Tomorrow <em>Together</em>
    </h2>
    </div>
    <div>
    <a className="button white" href={'mailto:' + site.careerEmail + '?subject=Career%20enquiry'}>Send Your Résumé <Icon name="arrow" size={18}/>
    </a>
    <p>Don’t see a suitable role? Introduce yourself at<br />
    <a href={'mailto:' + site.careerEmail}>{site.careerEmail}</a>.</p>
    </div>
    </div>
    </section>
    </>;
}
