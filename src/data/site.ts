export const site = {
    name: 'Noveltech', legalName: 'Novel Technology Solutions',
    url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, ''),
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@noveltech.com.au',
    careerEmail: process.env.NEXT_PUBLIC_CAREER_EMAIL || 'admin@noveltechnology.com.au',
    phone: '+61 2 9876 4321', phoneLink: '+61298764321', location: 'Sydney, Australia',
    hours: 'Monday – Friday, 9:00 AM – 5:30 PM',
    description: 'Noveltech helps businesses plan, design and build websites, mobile applications and digital experiences, with practical technology consulting and support.',
    // Supplied mockups contain conflicting details. Verify this contact configuration before publishing.
};
export const industries = [['building', 'Construction & Architecture'], ['megaphone', 'Marketing Agencies'], ['graduation', 'Education'], ['heart', 'Not for Profit'], ['briefcase', 'Business Services'], ['more', 'And More']];
export const strengths = [{ icon: 'users', title: 'Client First Approach', text: 'Your goals, our priority.' }, { icon: 'bulb', title: 'Innovative Solutions', text: 'Think beyond the ordinary.' }, { icon: 'shield', title: 'Quality & Reliability', text: 'Built to last.' }, { icon: 'chart', title: 'Long-Term Partnership', text: 'We grow together.' }];
export const faqs = [{ q: 'How quickly can you respond to my enquiry?', a: 'We aim to respond within one business day during our usual business hours. For a detailed estimate, we may arrange a discovery conversation first.' }, { q: 'Do you work with small businesses?', a: 'Yes. We shape the scope around your priorities, budget and team, from a focused business website to a larger digital platform.' }, { q: 'Can you provide a custom solution for my business?', a: 'Yes. We start with your workflows and goals, then recommend an approach that fits your users and existing systems.' }, { q: 'How do I get a quote?', a: 'Tell us what you would like to build, who it is for and your preferred timeline. We will discuss the scope and provide a tailored proposal.' }];
