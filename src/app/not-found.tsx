import { Button } from '@/components/common';
export default function NotFound() {
    return <section className="not-found">
    <p className="eyebrow">404 · Page not found</p>
    <h1>Let’s Find a<br />
    <em>Better Direction.</em>
    </h1>
    <p>The page you’re looking for may have moved or the address may be incorrect.</p>
    <Button href="/">Back to Home</Button>
    </section>;
}
