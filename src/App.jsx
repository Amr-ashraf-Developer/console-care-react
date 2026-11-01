import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronRight, Clock3, Cpu, Gamepad2, Globe2, Laptop, MapPin, Menu, Monitor, ShieldCheck, Wrench, X } from 'lucide-react'

const translations = {
  en: {
    nav: ['Home', 'PlayStation', 'Xbox', 'PC & Laptop', 'About', 'Book Repair'],
    tagline: 'REPAIR. RESTORE. PLAY.',
    heroTitle: 'Back in the game.',
    heroText: 'Expert console and computer repairs, done right. Get your gear fixed by technicians who care about every detail.',
    book: 'Book a repair', services: 'Explore services', trusted: 'REPAIR YOU CAN TRUST',
    chooseTitle: 'What needs fixing?', chooseText: 'Specialist care for your favorite devices.',
    psTitle: 'PlayStation Repair', psText: 'HDMI ports, overheating, storage upgrades, controller issues and more.',
    xboxTitle: 'Xbox Repair', xboxText: 'Power issues, disc drives, overheating, display faults and more.',
    pcTitle: 'PC & Laptop Repair', pcText: 'Hardware upgrades, diagnostics, virus cleanup and performance tuning.',
    learn: 'Learn more', why: 'Why choose ConsoleCare?', whyText: 'Honest diagnostics, careful repairs and clear communication from start to finish.',
    benefits: ['Experienced technicians', 'Clear diagnosis before repair', 'Quality parts and careful testing', 'Friendly support at every step'],
    aboutTitle: 'We bring your tech back to life.', aboutText: 'ConsoleCare is built for players, creators and everyday users. We believe a good repair starts with an honest diagnosis and ends with a device you can rely on.',
    location: 'Our location', cairo: 'Cairo, Egypt', berlin: 'Berlin, Germany',
    bookingTitle: 'Book your repair', bookingText: 'Tell us what you are using and what went wrong. We will follow up to discuss the next steps.',
    fullName: 'Full name', email: 'Email address', device: 'Device', chooseDevice: 'Choose your device', issue: 'Describe the problem', issuePlaceholder: 'Tell us what happened, any error messages, and when it started…',
    send: 'Send booking request', sentTitle: 'Request prepared!', sentText: 'Your request has been validated. Connect a backend or email service to send it to the repair team.', contact: 'Contact details', hours: 'Working hours', hoursText: 'Saturday – Thursday · 10:00–20:00',
    psHeading: 'PlayStation repair specialists', xboxHeading: 'Xbox repair specialists', pcHeading: 'PC & laptop repair specialists',
    psIntro: 'From no-signal HDMI ports to loud fans and unexpected shutdowns, we diagnose the issue and explain your options before work begins.',
    xboxIntro: 'Get back to your game. We can help investigate power faults, disc reading problems, overheating and controller connectivity.',
    pcIntro: 'Slow computer, broken screen or upgrade on your mind? We offer practical diagnostics and repair options for desktops and laptops.',
    common: 'Common repairs', process: 'Our repair process', step1: 'Tell us the symptoms', step2: 'We diagnose the device', step3: 'Approve the quote', step4: 'We repair and test',
    issuesPS: ['HDMI port and display faults', 'Overheating and fan cleaning', 'Storage and SSD upgrades', 'Power and startup problems', 'Controller connection issues', 'Software troubleshooting'],
    issuesXbox: ['HDMI and display faults', 'Overheating and ventilation', 'Disc drive issues', 'Power and startup problems', 'Controller sync issues', 'System troubleshooting'],
    issuesPC: ['Slow performance and tune-ups', 'Screen, keyboard and battery', 'SSD, RAM and hardware upgrades', 'Windows and software issues', 'Virus and malware cleanup', 'Data backup guidance'],
    footer: 'Your gear. Our care.', footerText: 'Console, PC and laptop repair with a player-first mindset.', rights: 'All rights reserved.'
  },
  de: {
    nav: ['Startseite', 'PlayStation', 'Xbox', 'PC & Laptop', 'Über uns', 'Reparatur buchen'],
    tagline: 'REPARIEREN. ZURÜCKSETZEN. SPIELEN.',
    heroTitle: 'Zurück ins Spiel.',
    heroText: 'Professionelle Reparaturen für Konsolen und Computer. Unsere Techniker kümmern sich sorgfältig um jedes Detail.',
    book: 'Reparatur buchen', services: 'Leistungen entdecken', trusted: 'REPARATUR, DER DU VERTRAUEN KANNST',
    chooseTitle: 'Was muss repariert werden?', chooseText: 'Fachkundige Hilfe für deine Geräte.',
    psTitle: 'PlayStation-Reparatur', psText: 'HDMI-Anschluss, Überhitzung, Speicher-Upgrades, Controller-Probleme und mehr.',
    xboxTitle: 'Xbox-Reparatur', xboxText: 'Stromversorgung, Laufwerk, Überhitzung, Bildfehler und mehr.',
    pcTitle: 'PC- & Laptop-Reparatur', pcText: 'Hardware-Upgrades, Diagnose, Virenentfernung und Leistungsoptimierung.',
    learn: 'Mehr erfahren', why: 'Warum ConsoleCare?', whyText: 'Ehrliche Diagnose, sorgfältige Reparatur und klare Kommunikation.',
    benefits: ['Erfahrene Techniker', 'Klare Diagnose vor der Reparatur', 'Hochwertige Teile und gründliche Tests', 'Freundlicher Support bei jedem Schritt'],
    aboutTitle: 'Wir bringen deine Technik zurück ins Leben.', aboutText: 'ConsoleCare ist für Gamer, Kreative und alle, die zuverlässige Technik brauchen. Eine gute Reparatur beginnt mit einer ehrlichen Diagnose.',
    location: 'Unser Standort', cairo: 'Kairo, Ägypten', berlin: 'Berlin, Deutschland',
    bookingTitle: 'Reparatur buchen', bookingText: 'Wähle dein Gerät und beschreibe das Problem. Wir besprechen anschließend die nächsten Schritte.',
    fullName: 'Vollständiger Name', email: 'E-Mail-Adresse', device: 'Gerät', chooseDevice: 'Gerät auswählen', issue: 'Problem beschreiben', issuePlaceholder: 'Was ist passiert? Gibt es Fehlermeldungen? Seit wann besteht das Problem?',
    send: 'Anfrage vorbereiten', sentTitle: 'Anfrage vorbereitet!', sentText: 'Deine Angaben wurden geprüft. Verbinde einen Backend- oder E-Mail-Dienst, um die Anfrage tatsächlich zu versenden.', contact: 'Kontaktdaten', hours: 'Öffnungszeiten', hoursText: 'Samstag – Donnerstag · 10:00–20:00',
    psHeading: 'PlayStation-Reparatur vom Fach', xboxHeading: 'Xbox-Reparatur vom Fach', pcHeading: 'PC- & Laptop-Reparatur vom Fach',
    psIntro: 'Ob HDMI-Probleme, laute Lüfter oder unerwartete Abschaltungen: Wir suchen die Ursache und erklären die Optionen vor der Reparatur.',
    xboxIntro: 'Zurück ins Spiel: Wir prüfen Stromprobleme, Laufwerksfehler, Überhitzung und Verbindungsprobleme mit Controllern.',
    pcIntro: 'Ist dein Computer langsam, der Bildschirm defekt oder ein Upgrade geplant? Wir bieten verständliche Diagnosen und passende Reparaturen.',
    common: 'Häufige Reparaturen', process: 'So läuft die Reparatur ab', step1: 'Problem beschreiben', step2: 'Wir prüfen das Gerät', step3: 'Kostenvoranschlag bestätigen', step4: 'Wir reparieren und testen',
    issuesPS: ['HDMI- und Bildfehler', 'Überhitzung und Lüfterreinigung', 'Speicher- und SSD-Upgrades', 'Strom- und Startprobleme', 'Controller-Verbindung', 'Softwareprobleme'],
    issuesXbox: ['HDMI- und Bildfehler', 'Überhitzung und Lüftung', 'Laufwerksprobleme', 'Strom- und Startprobleme', 'Controller-Synchronisierung', 'Systemprobleme'],
    issuesPC: ['Langsame Leistung und Optimierung', 'Bildschirm, Tastatur und Akku', 'SSD-, RAM- und Hardware-Upgrades', 'Windows- und Softwareprobleme', 'Viren- und Malware-Entfernung', 'Hilfe bei Datensicherung'],
    footer: 'Deine Technik. Unsere Sorgfalt.', footerText: 'Konsolen-, PC- und Laptop-Reparaturen mit Fokus auf dich.', rights: 'Alle Rechte vorbehalten.'
  }
}

const devices = [
  { path: '/playstation', key: 'ps', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85' },
  { path: '/xbox', key: 'xbox', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1200&q=85' },
  { path: '/pc-laptop', key: 'pc', icon: Laptop, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85' }
]

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('consolecare-language') || 'en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[language]
  const location = useLocation()
  useEffect(() => { localStorage.setItem('consolecare-language', language); document.documentElement.lang = language }, [language])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }, [location.pathname])
  const navItems = [
    ['/', t.nav[0]], ['/playstation', t.nav[1]], ['/xbox', t.nav[2]], ['/pc-laptop', t.nav[3]], ['/about', t.nav[4]]
  ]
  return <div className="app-shell">
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand"><span className="brand-mark"><Wrench size={21}/></span><span>CONSOLE<span className="brand-red">CARE</span><small>REPAIR SPECIALISTS</small></span></Link>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map(([path, label]) => <NavLink key={path} to={path} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
          <div className="nav-actions">
            <button className="language-button" onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}><Globe2 size={16}/>{language === 'en' ? 'DE' : 'EN'}</button>
            <Link to="/book" className="button button-red nav-book">{t.nav[5]} <ArrowRight size={16}/></Link>
          </div>
        </nav>
      </div>
    </header>
    <Routes>
      <Route path="/" element={<Home t={t}/>}/>
      <Route path="/playstation" element={<DevicePage type="ps" t={t}/>}/>
      <Route path="/xbox" element={<DevicePage type="xbox" t={t}/>}/>
      <Route path="/pc-laptop" element={<DevicePage type="pc" t={t}/>}/>
      <Route path="/about" element={<About t={t} language={language}/>}/>
      <Route path="/book" element={<Booking t={t}/>}/>
      <Route path="*" element={<Home t={t}/>}/>
    </Routes>
    <Footer t={t}/>
  </div>
}

function Home({t}) {
  return <main>
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="eyebrow"><span className="eyebrow-line"></span>{t.tagline}</div>
        <h1>{t.heroTitle.split(' ').slice(0,-1).join(' ')} <span>{t.heroTitle.split(' ').slice(-1)}</span></h1>
        <p>{t.heroText}</p>
        <div className="hero-buttons"><Link to="/book" className="button button-red">{t.book}<ArrowRight size={18}/></Link><a href="#services" className="button button-outline">{t.services}<ChevronRight size={18}/></a></div>
        <div className="hero-proof"><div className="proof-icons"><ShieldCheck/><CheckCircle2/><Wrench/></div><span>{t.trusted}</span></div>
      </div>
      <div className="hero-bottom container"><span><span className="status-dot"></span> TECHNICIANS WHO CARE</span><span>01 / 03</span></div>
    </section>
    <section id="services" className="section container">
      <div className="section-heading"><div><span className="section-kicker">OUR SERVICES</span><h2>{t.chooseTitle}</h2></div><p>{t.chooseText}</p></div>
      <div className="device-grid">{devices.map((d, i) => {
        const Icon = d.icon
        const title = t[`${d.key}Title`], desc = t[`${d.key}Text`]
        return <article className="device-card" key={d.key}>
          <div className="device-image" style={{backgroundImage:`linear-gradient(0deg, #111 0%, transparent 80%), url("${d.image}")`}}><span className="device-number">0{i+1}</span><Icon size={28}/></div>
          <div className="device-card-content"><h3>{title}</h3><p>{desc}</p><Link to={d.path} className="text-link">{t.learn}<ArrowRight size={16}/></Link></div>
        </article>
      })}</div>
    </section>
    <section className="why-section"><div className="container why-layout"><div className="why-visual"><img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85" alt="Technician working on electronic equipment"/><div className="experience-badge"><Wrench/><strong>CARE</strong><span>IN EVERY REPAIR</span></div></div><div className="why-copy"><span className="section-kicker">THE CONSOLECARE DIFFERENCE</span><h2>{t.why}</h2><p>{t.whyText}</p><ul>{t.benefits.map(item=><li key={item}><CheckCircle2 size={19}/>{item}</li>)}</ul><Link to="/about" className="button button-outline">{t.nav[4]}<ArrowRight size={17}/></Link></div></div></section>
    <section className="cta-section container"><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Let's get your device <span>back to life.</span></h2></div><Link to="/book" className="button button-red">{t.book}<ArrowRight size={18}/></Link></section>
  </main>
}

function DevicePage({type,t}) {
  const info = {
    ps: {title:t.psHeading, intro:t.psIntro, image:devices[0].image, issues:t.issuesPS, icon:Gamepad2},
    xbox: {title:t.xboxHeading, intro:t.xboxIntro, image:devices[1].image, issues:t.issuesXbox, icon:Gamepad2},
    pc: {title:t.pcHeading, intro:t.pcIntro, image:devices[2].image, issues:t.issuesPC, icon:Laptop}
  }[type]
  const Icon = info.icon
  return <main className="inner-page"><section className="device-hero container"><div className="device-hero-copy"><span className="section-kicker">CONSOLECARE / {type.toUpperCase()}</span><div className="large-icon"><Icon size={34}/></div><h1>{info.title}</h1><p>{info.intro}</p><Link to="/book" className="button button-red">{t.book}<ArrowRight size={17}/></Link></div><div className="device-hero-image" style={{backgroundImage:`linear-gradient(90deg,#0b0b0b 0%,transparent 65%),url("${info.image}")`}}><span>DIAGNOSE <b>•</b> REPAIR <b>•</b> TEST</span></div></section>
    <section className="section container repair-details"><div className="section-heading"><div><span className="section-kicker">WHAT WE CAN HELP WITH</span><h2>{t.common}</h2></div><p>{t.whyText}</p></div><div className="issue-grid">{info.issues.map((issue,i)=><div className="issue-card" key={issue}><span className="issue-index">0{i+1}</span><CheckCircle2 size={20}/><h3>{issue}</h3></div>)}</div></section>
    <section className="process-section"><div className="container"><span className="section-kicker">SIMPLE & TRANSPARENT</span><h2>{t.process}</h2><div className="process-grid">{[t.step1,t.step2,t.step3,t.step4].map((s,i)=><div className="process-step" key={s}><span>0{i+1}</span><h3>{s}</h3></div>)}</div></div></section>
    <section className="cta-section container"><div><span className="section-kicker">NEED A HAND?</span><h2>Tell us what <span>went wrong.</span></h2></div><Link to="/book" className="button button-red">{t.book}<ArrowRight size={18}/></Link></section>
  </main>
}

function About({t,language}) {
  const mapQuery = language === 'en' ? 'Cairo%2C%20Egypt' : 'Berlin%2C%20Germany'
  return <main className="inner-page"><section className="about-intro container"><div className="about-copy"><span className="section-kicker">WHO WE ARE</span><h1>{t.aboutTitle}</h1><p>{t.aboutText}</p><div className="about-stats"><div><strong>01</strong><span>HONEST DIAGNOSIS</span></div><div><strong>02</strong><span>CAREFUL REPAIR</span></div><div><strong>03</strong><span>QUALITY TESTING</span></div></div></div><div className="about-image"><img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85" alt="Repair specialist working at a bench"/></div></section>
    <section className="section container location-section"><div className="section-heading"><div><span className="section-kicker">COME SAY HELLO</span><h2>{t.location}</h2></div><div className="location-label"><MapPin size={20}/><span>{language === 'en' ? t.cairo : t.berlin}</span></div></div><div className="map-frame"><iframe title={t.location} src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=12&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe><div className="map-caption"><MapPin size={18}/><div><strong>{language === 'en' ? t.cairo : t.berlin}</strong><span>{language === 'en' ? 'Serving gamers across Cairo' : 'Service für Gamer in Berlin'}</span></div></div></div></section>
    <section className="contact-strip"><div className="container contact-strip-inner"><div><span className="section-kicker">{t.contact}</span><h2>Here to help.</h2></div><div className="contact-info"><Clock3/><div><strong>{t.hours}</strong><span>{t.hoursText}</span></div></div><Link to="/book" className="button button-red">{t.book}<ArrowRight size={17}/></Link></div></section>
  </main>
}

function Booking({t}) {
  const [submitted,setSubmitted] = useState(false)
  const [form,setForm] = useState({name:'',email:'',device:'',issue:''})
  const update = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = e => { e.preventDefault(); setSubmitted(true) }
  return <main className="inner-page booking-page"><section className="booking-layout container"><div className="booking-intro"><span className="section-kicker">LET'S FIX IT</span><h1>{t.bookingTitle.split(' ').slice(0,-1).join(' ')} <span>{t.bookingTitle.split(' ').slice(-1)}</span></h1><p>{t.bookingText}</p><div className="booking-assurance"><ShieldCheck size={23}/><div><strong>{t.trusted}</strong><span>{t.whyText}</span></div></div><div className="booking-decoration"><Gamepad2 size={88}/><Wrench size={48}/><Monitor size={70}/></div></div>
    <form className="booking-form" onSubmit={submit}><div className="form-top"><CalendarCheck/><div><h2>{t.book}</h2><p>01 / REPAIR REQUEST</p></div></div>
      <label>{t.fullName}<input name="name" value={form.name} onChange={update} placeholder="Alex Morgan" required/></label>
      <label>{t.email}<input name="email" type="email" value={form.email} onChange={update} placeholder="alex@example.com" required/></label>
      <label>{t.device}<select name="device" value={form.device} onChange={update} required><option value="">{t.chooseDevice}</option><option value="PlayStation">PlayStation</option><option value="Xbox">Xbox</option><option value="PC & Laptop">PC & Laptop</option></select></label>
      <label>{t.issue}<textarea name="issue" rows="5" value={form.issue} onChange={update} placeholder={t.issuePlaceholder} required/></label>
      <button type="submit" className="button button-red submit-button">{t.send}<ArrowRight size={18}/></button>
      {submitted && <div className="form-success"><CheckCircle2/><div><strong>{t.sentTitle}</strong><p>{t.sentText}</p><button type="button" onClick={()=>{setSubmitted(false);setForm({name:'',email:'',device:'',issue:''})}}>OK</button></div></div>}
      <p className="form-note"><ShieldCheck size={14}/> Your information is used for this repair request only.</p>
    </form></section></main>
}

function Footer({t}) {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark"><Wrench size={21}/></span><span>CONSOLE<span className="brand-red">CARE</span><small>REPAIR SPECIALISTS</small></span></Link><p>{t.footerText}</p></div><div className="footer-nav"><strong>EXPLORE</strong><Link to="/playstation">{t.nav[1]}</Link><Link to="/xbox">{t.nav[2]}</Link><Link to="/pc-laptop">{t.nav[3]}</Link><Link to="/about">{t.nav[4]}</Link></div><div className="footer-nav"><strong>GET STARTED</strong><Link to="/book">{t.book}</Link><Link to="/about">{t.location}</Link><span className="footer-status"><span className="status-dot"/> AVAILABLE FOR REPAIRS</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} CONSOLECARE. {t.rights}</span><span>{t.footer}</span></div></footer>
}

export default App
