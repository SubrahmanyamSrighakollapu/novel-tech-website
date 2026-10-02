'use client';
import { useEffect, useState } from 'react';
import { services } from '@/data/services';
import { site } from '@/data/site';
import Icon from './icon';
export default function ContactForm() {
    const [status, setStatus] = useState('');
    const [draft, setDraft] = useState('');
    const [subject, setSubject] = useState('');
    const [service, setService] = useState('');
    useEffect(() => { const q = new URLSearchParams(window.location.search); const found = services.find(s => s.slug === q.get('service')); if (found)
        setService(found.slug); if (q.get('subject'))
        setSubject(q.get('subject')!.slice(0, 180));
    else if (found)
        setSubject(found.title + ' enquiry'); }, []);
    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity())
            return;
        const d = new FormData(form);
        const body = `Name: ${d.get('name')}
Email: ${d.get('email')}
Phone: ${d.get('phone') || 'Not provided'}
Service: ${services.find(s => s.slug === d.get('service'))?.title || 'General enquiry'}

${d.get('message')}`;
        setDraft(body);
        const link = 'mailto:' + site.email + '?subject=' + encodeURIComponent(String(d.get('subject'))) + '&body=' + encodeURIComponent(body);
        window.location.href = link;
        setStatus('Your email draft is ready. Please send it from your email app. Nothing has been submitted to a server. If your email app did not open, copy the message below and email us directly.');
    }
    async function copy() { try {
        await navigator.clipboard.writeText(draft);
        setStatus('Message copied. Paste it into an email to ' + site.email + '.');
    }
    catch {
        setStatus('Select and copy the message below, then email it to ' + site.email + '.');
    } }
    return <form className="contact-form" onSubmit={submit}>
    <div className="form-grid">
    <label>Full Name <span>*</span>
    <input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name"/>
    </label>
    <label>Email Address <span>*</span>
    <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/>
    </label>
    <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your phone number"/>
    </label>
    <label>Service<select name="service" value={service} onChange={e => setService(e.target.value)}>
    <option value="">General enquiry</option>{services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}</select>
    </label>
    <label className="full">Subject <span>*</span>
    <input name="subject" required maxLength={180} value={subject} onChange={e => setSubject(e.target.value)} placeholder="How can we help?"/>
    </label>
    <label className="full">Your Message <span>*</span>
    <textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Tell us about your requirements, goals and preferred timeline…"/>
    </label>
    </div>
    <p className="form-note">
    <Icon name="lock" size={15}/>Your details stay in this browser until you choose to send the email.</p>
    <button className="button" type="submit">Prepare Email <Icon name="arrow" size={18}/>
    </button>
    <p className="form-helper">Opens your email app. Please review and send the draft to complete your enquiry.</p>{status && <div className="form-result" role="status">
        <p>{status}</p>{draft && <>
            <textarea aria-label="Prepared email message" readOnly value={draft} rows={6}/>
            <button type="button" onClick={copy} className="text-button">Copy Message <Icon name="file" size={16}/>
            </button>
            <a href={'mailto:' + site.email}>Email {site.email}</a>
            </>}</div>}</form>;
}
