import { useEffect, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

type StageKey = 'ingest' | 'stream' | 'transform' | 'validate' | 'persist';

const EMAIL = 'tanishkmehta6@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/tanishk-mehta-469839244/';

const stages: { key: StageKey; title: string; label: string; sublabel: string; description: string }[] = [
  {
    key: 'ingest', title: '01 — Ingest with intent', label: '01 / INGEST', sublabel: 'FILE INTAKE',
    description: 'Start with predictable intake: prepare source files and establish clear boundaries before downstream processing begins.',
  },
  {
    key: 'stream', title: '02 — Move data as events', label: '02 / STREAM', sublabel: 'KAFKA + AVRO',
    description: 'A message stream decouples producers from consumers. Serialization and clear event contracts help services exchange structured data.',
  },
  {
    key: 'transform', title: '03 — Transform deliberately', label: '03 / TRANSFORM', sublabel: 'MAPPING',
    description: 'Map incoming records into the downstream representation with attention to schema expectations and processing correctness.',
  },
  {
    key: 'validate', title: '04 — Validate the important things', label: '04 / VALIDATE', sublabel: 'QUALITY GATES',
    description: 'Validation and explicit error paths help prevent malformed data from silently travelling further through the pipeline.',
  },
  {
    key: 'persist', title: '05 — Make outcomes durable', label: '05 / PERSIST', sublabel: 'DATA STORE',
    description: 'Persistence and recovery-aware handling help downstream applications use data consistently.',
  },
];

const projects = [
  {
    number: 'CASE STUDY / 01', type: 'EVENT-DRIVEN DATA', title: 'Making data movement dependable',
    description: 'Contributed to a mission-critical payment-file ingestion workflow in a regulated banking environment, processing high-volume NACHA files with a strong focus on reliability, validation, and downstream data integrity. I worked across the full ingestion lifecycle: file intake and preparation, parallelized directory monitoring, Kafka-based producer and consumer pipelines, Avro serialization, transformation into the standardized UPOv5 model, validation gates, and persistence into the operational data store for downstream consumption. The work required balancing throughput with traceability, failure handling, and compliance-sensitive processing while ensuring malformed or duplicate records were identified early instead of propagating silently through the pipeline.',
    tags: ['Java', 'Spring Boot', 'Kafka', 'Avro', 'Distributed systems', 'Data quality', 'Payments', 'ODS'],
    visual: 'pipeline',
    subject: 'Payment pipeline case study',
    linkText: 'Discuss the engineering decisions',
  },
  {
    number: 'CASE STUDY / 02', type: 'PRODUCT ENGINEERING', title: 'Modernizing the interface layer',
    description: 'Helped move a legacy JavaScript interface toward React components integrated with Spring Boot APIs, with attention to maintainability, metadata-driven behavior, and accessibility across the product experience.',
    tags: ['React', 'Spring Boot', 'REST APIs', 'Accessibility'],
    visual: 'ui',
    subject: 'Frontend modernization case study',
    linkText: 'Discuss the engineering decisions',
  },
  {
    number: 'CASE STUDY / 03', type: 'DELIVERY & QUALITY', title: 'Making delivery more repeatable',
    description: 'Worked across CI/CD workflows, automated testing, security checks, and deployment environments to support safer and more consistent software delivery.',
    tags: ['GitHub Actions', 'CI/CD', 'JUnit', 'Quality gates'],
    visual: 'deploy',
    subject: 'Delivery engineering case study',
    linkText: 'Discuss the engineering decisions',
  },
];

function gmailComposeUrl(subject: string, body = '') {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: EMAIL,
  });

  if (subject.trim()) {
    params.set('su', subject.trim());
  }

  if (body.trim()) {
    params.set('body', body.trim());
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function mailto(subject: string, body = '') {
  return gmailComposeUrl(subject, body);
}

function openEmailComposer(subject: string, body = '') {
  const url = gmailComposeUrl(subject, body);

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer,width=720,height=640');
  }

  return url;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '↘'}</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
      <div className="wrap nav">
        <a className="brand" href="#top" aria-label="Tanishk Mehta home" onClick={closeMenu}>
          <span className="brand-mark">TM</span>
          <span>TANISHK MEHTA <span className="brand-suffix">/ ENGINEERING</span></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navLinks" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'CLOSE −' : 'MENU +'}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} id="navLinks" aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#stack" onClick={closeMenu}>Toolkit</a>
          <a href="#education" onClick={closeMenu}>Background</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </div>
    </header>
  );
}

function SystemExplorer() {
  const [activeStage, setActiveStage] = useState<StageKey>('ingest');
  const selected = stages.find((stage) => stage.key === activeStage) ?? stages[0];

  const handleNodeKeyDown = (event: KeyboardEvent<SVGGElement>, key: StageKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveStage(key);
    }
  };

  return (
    <div className="system-card" aria-label="Interactive event-driven system diagram">
      <div className="card-top">
        <span className="card-label">FIELD NOTE / 001<br /><span className="card-label-sub">EVENT-DRIVEN SYSTEMS</span></span>
        <span className="live"><span className="dot" /> SYSTEM STUDY</span>
      </div>
      <svg className="diagram" viewBox="0 0 420 250" role="group" aria-label="Select a pipeline stage to learn about its purpose">
        <path className="wire" d="M105 55 H155 M245 55 H295 M340 80 V119 H210 V151 M165 176 H105 M255 176 H315" />
        <path d="M149 50 l7 5 -7 5 M289 50 l7 5 -7 5 M204 145 l6 7 6 -7 M109 171 l-7 5 7 5 M309 171 l7 5 -7 5" stroke="#B5F4B0" fill="none" strokeWidth="1.4" />
        {[
          { key: 'ingest' as const, x: 15, y: 30, w: 90, h: 50 },
          { key: 'stream' as const, x: 155, y: 30, w: 90, h: 50 },
          { key: 'transform' as const, x: 295, y: 30, w: 110, h: 50 },
          { key: 'validate' as const, x: 165, y: 151, w: 90, h: 50 },
          { key: 'persist' as const, x: 315, y: 151, w: 90, h: 50 },
        ].map((node) => {
          const detail = stages.find((stage) => stage.key === node.key)!;
          return (
            <g key={node.key} className={activeStage === node.key ? 'diagram-node active' : 'diagram-node'}
              transform={`translate(${node.x} ${node.y})`} role="button" tabIndex={0}
              aria-label={`${detail.label.replace('/', '').toLowerCase()} stage`} aria-pressed={activeStage === node.key}
              onClick={() => setActiveStage(node.key)} onKeyDown={(event) => handleNodeKeyDown(event, node.key)}>
              <rect width={node.w} height={node.h} rx="4" />
              <text x={node.w / 2} y="21" textAnchor="middle">{detail.label}</text>
              <text className="node-sublabel" x={node.w / 2} y="35" textAnchor="middle">{detail.sublabel}</text>
            </g>
          );
        })}
        <circle cx="60" cy="111" r="3" fill="#B5F4B0" />
        <circle cx="350" cy="111" r="3" fill="#B5F4B0" />
        <path d="M60 80 V111 H165 M360 111 V151" stroke="#46564A" strokeDasharray="2 5" fill="none" />
        <text className="diagram-caption" x="15" y="235">CONCEPTUAL MODEL · SANITIZED</text>
        <text className="diagram-caption" x="405" y="235" textAnchor="end">SELECT A NODE ↑</text>
      </svg>
      <div className="system-detail" aria-live="polite">
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
      </div>
      <div className="card-foot"><span>Architecture, not decoration</span><span>Explore ↗</span></div>
    </div>
  );
}

function ProjectVisual({ type }: { type: string }) {
  if (type === 'pipeline') {
    return <div className="visual-pipeline" aria-hidden="true">
      <div className="v-row"><div className="v-box">FILE INTAKE</div><span className="v-arrow">→</span><div className="v-box">PRODUCER</div></div>
      <div className="v-row"><div className="v-box v-box-accent">KAFKA / AVRO</div><span className="v-arrow">→</span><div className="v-box">CONSUMER</div></div>
      <div className="v-row"><div className="v-box">VALIDATE</div><span className="v-arrow">→</span><div className="v-box">PERSIST</div></div>
      <div className="v-caption"><span>INGEST</span><span>TRANSFORM</span><span>RECOVER</span></div>
    </div>;
  }
  if (type === 'ui') {
    return <div className="visual-ui" aria-hidden="true"><div className="ui-sidebar"><i /><i /><i /><i /></div><div className="ui-main"><i /><i /><i /><i /><i /></div></div>;
  }
  return <div className="visual-deploy" aria-hidden="true"><div className="deploy-node">CODE</div><div className="deploy-line" /><div className="deploy-node">TEST</div><div className="deploy-line" /><div className="deploy-node">SHIP</div></div>;
}

function Projects() {
  return <div className="work-grid">
    {projects.map((project, index) => <article className={`project reveal ${index === 0 ? 'project-featured' : ''}`} key={project.number}>
      <div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div>
      <div className="project-visual"><ProjectVisual type={project.visual} /></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <a className="project-link" href={mailto(project.subject)} target="_blank" rel="noopener noreferrer"><span>{project.linkText}</span><span aria-hidden="true">↗</span></a>
    </article>)}
  </div>;
}

function Contact() {
  const [formMessage, setFormMessage] = useState('This form opens your email application with your message prepared. Nothing is stored or sent by this website.');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const body = `Hi Tanishk,\n\n${message}\n\n— ${name}\nReply to: ${email}`;
    setFormMessage('Your email application should open with the message prepared. If it does not, email tanishkmehta6@gmail.com directly.');
    openEmailComposer(subject || "Let's connect", body);
  };

  return <section className="contact-section" id="contact"><div className="wrap"><div className="contact-panel reveal"><div className="contact-content">
    <div className="eyebrow kicker"><span className="dot" /> OPEN TO THE RIGHT CONVERSATION</div>
    <h2>Have a good<br />problem? <em>Let's talk.</em></h2>
    <p>Interested in backend engineering, distributed systems, platform work, or thoughtful collaboration? Send a note. I would be glad to connect.</p>
    <div className="contact-links">
      <a className="btn btn-primary" href={mailto("Let's connect")} target="_blank" rel="noopener noreferrer">Email me <Arrow diagonal /></a>
      <a className="btn btn-secondary" href={LINKEDIN} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Arrow diagonal /></a>
    </div>
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="How should I address you?" required maxLength={100} /></div>
      <div className="field"><label htmlFor="email">Your email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></div>
      <div className="field full"><label htmlFor="subject">What is this about?</label><input id="subject" name="subject" placeholder="A role, an idea, a project…" required maxLength={150} /></div>
      <div className="field full"><label htmlFor="message">A little context</label><textarea id="message" name="message" rows={4} placeholder="Tell me a little more…" required maxLength={5000} /></div>
      <div className="field full"><button className="btn btn-primary" type="submit">Prepare email <Arrow diagonal /></button><p className="form-note" role="status">{formMessage}</p></div>
    </form>
  </div></div></div></section>;
}

function App() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <div className="app-shell" id="top">
    <Header />
    <main>
      <div className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow kicker"><span className="dot" /> SOFTWARE ENGINEER <span className="eyebrow-slash">/</span> BENGALURU, INDIA</div>
          <h1>Systems<br />that move<br /><span className="serif accent">the world.</span></h1>
          <p className="hero-lede">I build <strong>reliable software for complex flows of data</strong> — from event-driven payment pipelines to applications that make critical work simpler. Java, Spring Boot, Kafka, and modern interfaces all play a part in the systems I care about.</p>
          <div className="actions"><a className="btn btn-primary" href="#work">Explore selected work <Arrow /></a><a className="btn btn-secondary" href={mailto('Résumé request')} target="_blank" rel="noopener noreferrer">Request résumé <Arrow diagonal /></a></div>
          <div className="hero-meta">
            <div className="meta-item"><span>Current chapter</span><span>Software Engineer</span></div>
            <div className="meta-item tech-stack"><span>Building with</span><span>Java, Spring Boot, Kafka, Avro, React, TypeScript, REST APIs, PostgreSQL, MongoDB, Docker, Kubernetes, Jenkins, GitHub Actions, JUnit, Mockito, BDD, AWS</span></div>
          </div>
        </div>
        <SystemExplorer />
      </div>
      <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 2 }, (_, index) => <div className="marquee-group" key={index}><span>Distributed systems</span><span>Event-driven design</span><span>Platform thinking</span><span>Reliable delivery</span><span>Product-minded engineering</span></div>)}</div></div>
      <section id="work"><div className="wrap"><div className="section-head reveal"><div className="section-index">01 / SELECTED WORK</div><div><h2>Less noise.<br /><em>More substance.</em></h2><p>Focused engineering work that improves reliability, clarity, and execution across distributed systems.</p></div></div><Projects /></div></section>
      <section id="about"><div className="wrap"><div className="section-head reveal"><div className="section-index">02 / THE PERSON BEHIND THE SYSTEMS</div><div><h2>Curiosity is the<br /><em>real engine.</em></h2><p>I enjoy untangling complex flows, making the right trade-offs explicit, and building systems that stay understandable as they scale.</p></div></div><div className="about-layout"><div className="about-aside reveal"><div className="about-stamp"><div className="stamp-text"><strong>TM</strong><span>BUILDING WITH INTENT</span></div></div><p className="about-note">Systems design, backend engineering, product thinking, and practical delivery.</p></div><div className="about-copy reveal"><h3>Small defaults, strong outcomes.</h3><p>I work across data movement, platform logic, and product interfaces, with an emphasis on thoroughly understanding the problem before choosing a solution.</p><p>That usually means designing for failure modes early, keeping data contracts explicit, and valuing maintainability as much as speed.</p><div className="timeline"><div className="timeline-item"><div className="timeline-date">2024<br />— Present</div><div className="timeline-content"><h4>Software Engineer</h4><p>Working across distributed data flows, service reliability, and product-facing engineering decisions.</p></div></div><div className="timeline-item"><div className="timeline-date">2023<br />— 2024</div><div className="timeline-content"><h4>Engineering focus</h4><p>Built and refined event-driven workflows with Java, Spring Boot, Kafka, and API integrations.</p></div></div></div></div></div></div></section>
      <div className="stack-section" id="stack"><section><div className="wrap stack-layout"><div className="stack-intro reveal"><div className="section-index">03 / TOOLKIT</div><h2>The tools are<br /><em>secondary.</em></h2><p>I work at the intersection of backend engineering, distributed systems, and product thinking — building services that are reliable under load, easy to reason about, and ready for the realities of production. Good systems come from strong constraints, good habits, and clear trade-offs, not from chasing the newest stack for its own sake.</p></div><div className="stack-groups reveal">
        <div className="stack-group"><h3>Core</h3><p>Java<br />Spring Boot<br />REST APIs<br />Microservices<br />OOP & design patterns</p></div>
        <div className="stack-group"><h3>Data & messaging</h3><p>Kafka<br />Avro<br />PostgreSQL<br />MongoDB<br />SQL & data validation</p></div>
        <div className="stack-group"><h3>Interfaces</h3><p>React<br />TypeScript<br />JavaScript<br />HTML / CSS<br />Accessibility-minded UI</p></div>
        <div className="stack-group"><h3>Quality & delivery</h3><p>JUnit<br />Mockito<br />BDD<br />CI/CD<br />GitHub Actions / Jenkins</p></div>
        <div className="stack-group"><h3>Cloud & platform</h3><p>AWS<br />Docker<br />Kubernetes<br />Git<br />SAST & platform reliability</p></div>
      </div></div></section></div>
      <section id="education"><div className="wrap"><div className="section-head reveal"><div className="section-index">04 / BACKGROUND</div><div><h2>Grounded in fundamentals.<br /><em>Always learning.</em></h2><p>My work is shaped by practical systems thinking, software engineering fundamentals, and a strong bias toward learning by doing.</p></div></div><div className="education"><div className="edu-card reveal"><div className="kicker">Education</div><h3>Vellore Institute of Technology (VIT), Vellore</h3><p><span>CGPA: 9.67 / 10.0</span> <span>• Graduated Jan 2024</span></p></div><div className="edu-card reveal"><div className="kicker">Certifications</div><h3>Cloud & AI</h3><p>AWS Certified Cloud Practitioner<br />AWS Certified AI Practitioner</p></div></div></div></section>
      <Contact />
    </main>
    <footer><div className="wrap footer-row"><span>© {new Date().getFullYear()} TANISHK MEHTA · MADE WITH INTENT</span><span>SOFTWARE ENGINEER / BENGALURU, INDIA</span><div className="footer-links"><a href={mailto('Email')}>Email</a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></footer>
  </div>;
}

export default App;
