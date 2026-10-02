'use client';
import { useRef, useState } from 'react';
import { jobs, Job } from '@/data/jobs';
import { site } from '@/data/site';
import Icon from './icon';
export default function Careers() {
    const [query, setQuery] = useState('');
    const [department, setDepartment] = useState('');
    const [experience, setExperience] = useState('');
    const [job, setJob] = useState<Job | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement | null>(null);
    const filtered = jobs.filter(j => (!department || j.department === department) && (!experience || j.experience === experience) && [j.title, j.department, ...j.skills].join(' ').toLowerCase().includes(query.toLowerCase().trim()));
    function show(j: Job, event: React.MouseEvent<HTMLButtonElement>) { trigger.current = event.currentTarget; setJob(j); dialog.current?.showModal(); }
    function close() { dialog.current?.close(); trigger.current?.focus(); }
    return <>
    <div className="jobs-toolbar">
    <div>
    <p className="eyebrow">Career opportunities</p>
    <h2>Find Your Next Chapter</h2>
    <p>Explore the roles we typically hire for. Ask our team about current availability.</p>
    </div>
    <div className="job-filters">
    <label className="search-field">
    <span className="sr-only">Search roles by title or skill</span>
    <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search job title, skills or keyword…"/>
    <Icon name="search" size={19}/>
    </label>
    <div>
    <label>
    <span className="sr-only">Filter by department</span>
    <select value={department} onChange={e => setDepartment(e.target.value)}>
    <option value="">All Departments</option>{Array.from(new Set(jobs.map(j => j.department))).map(d => <option key={d}>{d}</option>)}</select>
    </label>
    <label>
    <span className="sr-only">Filter by experience</span>
    <select value={experience} onChange={e => setExperience(e.target.value)}>
    <option value="">All Experience Levels</option>
    <option>1+ year</option>
    <option>2+ years</option>
    </select>
    </label>
    <button type="button" className="text-button" onClick={() => { setQuery(''); setDepartment(''); setExperience(''); }}>Reset</button>
    </div>
    </div>
    </div>
    <p className="filter-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'role' : 'roles'} · Sydney, Australia</p>
    <div className="job-list">{filtered.map((j, i) => <article className={'job-row tone-' + i % 4} key={j.id}>
        <span className="icon-box">
        <Icon name={j.icon}/>
        </span>
        <div className="job-title">
        <h3>{j.title}</h3>
        <p>{j.department}</p>
        </div>
        <span>
        <Icon name="pin" size={17}/>{j.location}</span>
        <span>
        <Icon name="calendar" size={17}/>{j.experience}</span>
        <span>
        <Icon name="briefcase" size={17}/>{j.type}</span>
        <button className="button" onClick={e => show(j, e)}>View Role <Icon name="arrow" size={16}/>
        </button>
        </article>)}</div>{!filtered.length && <div className="empty-state">
        <Icon name="search" size={34}/>
        <h3>No matching roles</h3>
        <p>Try a different keyword or reset your filters.</p>
        </div>}<dialog ref={dialog} className="job-dialog" onClose={() => trigger.current?.focus()} onClick={e => { if (e.target === e.currentTarget)
        close(); }} aria-labelledby="job-heading">
    <button autoFocus className="dialog-close" onClick={close} aria-label="Close role details">
    <Icon name="close"/>
    </button>{job && <>
        <p className="eyebrow">Explore a career with Noveltech</p>
        <h2 id="job-heading">{job.title}</h2>
        <p className="job-meta">{job.location} · {job.experience} · {job.type}</p>
        <p>{job.summary}</p>
        <h3>What you could work on</h3>
        <ul>{job.responsibilities.map(t => <li key={t}>{t}</li>)}</ul>
        <h3>Relevant skills</h3>
        <div className="skill-tags">{job.skills.map(t => <span key={t}>{t}</span>)}</div>
        <p>Ask about current openings and include a short introduction, your experience and a link to your portfolio. Attach your résumé in your email app.</p>
        <a className="button" href={'mailto:' + site.careerEmail + '?subject=' + encodeURIComponent('Career enquiry: ' + job.title) + '&body=' + encodeURIComponent(`Hello Noveltech team,\n\nI am interested in ${job.title} opportunities.\n\nName:\nExperience:\nPortfolio / LinkedIn:\nAvailability:\n\nI have attached my résumé.\n`)}>Enquire About This Role <Icon name="mail" size={18}/>
        </a>
        <p className="form-helper">Opens an email draft. This does not submit an application automatically.</p>
        </>}</dialog>
    </>;
}
