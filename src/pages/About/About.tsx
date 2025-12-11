// About Page Placeholder
import { Helmet } from 'react-helmet-async';

export default function About() {
    return (
        <>
            <Helmet>
                <title>About | House of Venus</title>
            </Helmet>
            <div className="container section">
                <h1>About House of Venus</h1>
                <p>Our story, philosophy, and the cosmic inspiration behind our brand.</p>
            </div>
        </>
    );
}
