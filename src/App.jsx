import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, CalendarCheck, Check, ChevronDown, Clock3, Menu, Phone, Quote, ShieldCheck, Users, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const siteUrl = 'https://bigbounceevents.com.ng'
const contactLink = 'https://wa.me/2348065077992?text=Hello%20Big%20Bounce%20Events%2C%20I%20would%20like%20to%20hire%20bouncers%20for%20my%20event.'

const images = {
  logo: new URL('../white_logo-removebg-preview.png', import.meta.url).href,
  hero: new URL('../img bounce/first use.jpg', import.meta.url).href,
  door: new URL('../img bounce/IMG_2565.jpg', import.meta.url).href,
  nightlife: new URL('../img bounce/IMG_2134.jpg', import.meta.url).href,
  event: new URL('../img bounce/IMG_2133.jpg', import.meta.url).href,
  wedding: new URL('../img bounce/WhatsApp Image 2024-07-02 at 03.30.10_f38171be.jpg', import.meta.url).href,
  private: new URL('../img bounce/image_67232257.JPG', import.meta.url).href,
  usher: new URL('../img bounce/Ushers/WhatsApp Image 2024-09-03 at 14.42.40_34ed056a.jpg', import.meta.url).href,
  usherGroup: new URL('../img bounce/Ushers/WhatsApp Image 2024-09-03 at 14.42.41_3f377cd8.jpg', import.meta.url).href,
  barricade: new URL('../Rentals/IMG-20240816-WA0003.jpg', import.meta.url).href,
  rental: new URL('../Rentals/Screenshot_20220118-082709_Galaxy Store.jpg', import.meta.url).href,
}

const pageMeta = {
  '/': ['Professional Bouncers in Lagos | Big Bounce Events', 'Hire professional bouncers and event security personnel for parties, weddings, corporate events, concerts, and private events across Lagos.'],
  '/bouncers': ['Hire Professional Bouncers in Lagos | Big Bounce Events', 'Book professional bouncers in Lagos for parties, weddings, corporate functions, clubs, and private events.'],
  '/event-security': ['Event Security Services in Lagos | Big Bounce Events', 'Event-focused security personnel for corporate events, concerts, private functions, and celebrations across Lagos.'],
  '/ushers': ['Professional Ushers in Lagos | Big Bounce Events', 'Professional ushers for polished guest management, seating support, and event coordination in Lagos.'],
  '/event-rentals': ['Barricade and Event Rentals in Lagos | Big Bounce Events', 'Hire barricades and event rentals for safer, better organised events in Lagos.'],
  '/about': ['About Big Bounce Events | Lagos Event Security Team', 'Learn about Big Bounce Events, a Lagos-based provider of professional bouncers, event security, ushers, and event support.'],
  '/contact': ['Contact Big Bounce Events | Hire Bouncers in Lagos', 'Tell Big Bounce Events about your Lagos event and request professional bouncers, event security, ushers, or rentals.'],
  '/faq': ['Bouncer Hire FAQs | Big Bounce Events Lagos', 'Answers to common questions about hiring professional bouncers and event security personnel in Lagos.'],
}

const bouncerServices = [
  ['Party bouncers', 'Calm, professional personnel for birthdays, celebrations, and social occasions.'],
  ['Wedding security', 'A composed, event-aware presence for ceremonies, receptions, and guest flow.'],
  ['Corporate event security', 'Professional support for launches, conferences, dinners, and brand events.'],
  ['Concert and festival security', 'Event staffing for crowd-facing moments, entry points, and venue coordination.'],
  ['Club security', 'Professional door and venue support for nightlife and entertainment spaces.'],
  ['Private event security', 'Discreet support tailored to the size, format, and needs of your event.'],
]

const reelEvents = [
  ['01', 'Weddings', images.wedding, 'A composed presence for ceremonies and celebrations.'],
  ['02', 'Nightlife', images.nightlife, 'For doors, venues, and late-night energy.'],
  ['03', 'Private parties', images.private, 'Security support shaped around your gathering.'],
  ['04', 'Corporate', images.event, 'Polished teams for moments that represent your brand.'],
  ['05', 'Live events', images.door, 'People-facing event support when the room is moving.'],
]

function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const [title, description] = pageMeta[pathname] || pageMeta['/']
    const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`
    document.title = title
    const set = (selector, attribute, value, content) => {
      let element = document.head.querySelector(selector)
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, value); document.head.appendChild(element) }
      element.setAttribute('content', content)
    }
    let canonicalLink = document.head.querySelector('link[rel="canonical"]')
    if (!canonicalLink) { canonicalLink = document.createElement('link'); canonicalLink.rel = 'canonical'; document.head.appendChild(canonicalLink) }
    canonicalLink.href = canonical
    set('meta[name="description"]', 'name', 'description', description)
    set('meta[property="og:title"]', 'property', 'og:title', title)
    set('meta[property="og:description"]', 'property', 'og:description', description)
    set('meta[property="og:url"]', 'property', 'og:url', canonical)
    set('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  }, [pathname])
  const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Big Bounce Events', url: siteUrl, telephone: '+2348065077992', email: 'bigbouncesecure@gmail.com', areaServed: { '@type': 'City', name: 'Lagos' }, description: 'Professional bouncers and event security services for events in Lagos, Nigeria.' }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function useMotion(scope, setup, dependencies = []) {
  useLayoutEffect(() => {
    if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(setup, scope)
    return () => context.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const links = [['/', 'Home'], ['/bouncers', 'Bouncers'], ['/event-security', 'Event Security'], ['/ushers', 'Ushers'], ['/event-rentals', 'Rentals'], ['/about', 'About'], ['/contact', 'Contact']]
  const isLight = ['/contact', '/faq'].includes(pathname)
  useEffect(() => { const update = () => setScrolled(window.scrollY > 20); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  useEffect(() => setOpen(false), [pathname])
  return <header className={`site-header ${isLight ? 'is-light' : ''} ${scrolled ? 'is-scrolled' : ''}`}><a className="skip-link" href="#main">Skip to content</a><nav className="nav-shell" aria-label="Main navigation"><Link className="brand" to="/"><img src={images.logo} alt="Big Bounce Events" /></Link><button className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}<span className="sr-only">{open ? 'Close' : 'Open'} menu</span></button><div className={`nav-links ${open ? 'is-open' : ''}`} id="site-menu">{links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}<a className="button button-small nav-cta" href={contactLink}>Hire Bouncers <ArrowRight size={16} /></a></div></nav></header>
}

function Footer() { return <footer className="footer"><div className="footer-top"><div><Link className="brand footer-brand" to="/"><img src={images.logo} alt="Big Bounce Events" /></Link><p>Professional bouncers and event support for occasions across Lagos, Nigeria.</p><a className="footer-phone" href="tel:+2348065077992"><Phone size={17} /> +234 806 507 7992</a></div><div><h2>Explore</h2><Link to="/bouncers">Bouncer services</Link><Link to="/event-security">Event security</Link><Link to="/ushers">Professional ushers</Link><Link to="/event-rentals">Event rentals</Link></div><div><h2>Plan an event</h2><Link to="/contact">Request a quote</Link><Link to="/faq">Frequently asked questions</Link><Link to="/about">About Big Bounce</Link><a href="mailto:bigbouncesecure@gmail.com">bigbouncesecure@gmail.com</a></div></div><div className="footer-bottom"><span>Serving Lagos, Nigeria</span><span>Copyright {new Date().getFullYear()} Big Bounce Events</span></div></footer> }
function Layout({ children }) { return <><Seo /><Header /><main id="main">{children}</main><Footer /></> }
function Cta({ secondary = false, children = 'Hire Bouncers' }) { return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={secondary ? 'tel:+2348065077992' : contactLink}><span>{children}</span>{!secondary && <ArrowRight size={18} />}</a> }
function Eyebrow({ children }) { return <p className="eyebrow"><span />{children}</p> }

function Home() {
  const scope = useRef(null)
  useMotion(scope, () => {
    gsap.from('.hero-kicker, .hero-title > span, .hero-copy, .hero-actions, .hero-meta', { y: 48, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', delay: .15 })
    gsap.to('.hero-image', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    gsap.utils.toArray('.reveal').forEach((element) => gsap.from(element, { y: 42, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%' } }))
  })
  return <Layout><div ref={scope}><section className="hero"><img className="hero-image" src={images.hero} alt="Big Bounce professional bouncer team at a Lagos event" fetchPriority="high" /><div className="hero-shade" /><div className="hero-stamp" aria-hidden="true">LAGOS<br />EVENT<br />SECURITY</div><div className="hero-content"><Eyebrow><span className="hero-kicker">Big Bounce Events / Lagos</span></Eyebrow><h1 className="hero-title"><span>THE DOOR</span><span>STARTS <em>HERE.</em></span></h1><p className="hero-copy">Professional bouncers and event security for parties, weddings, clubs, concerts, corporate gatherings, and private events in Lagos.</p><div className="hero-actions"><Cta>Hire bouncers</Cta><a className="hero-reel-link" href="#event-reel">See the highlight reel <ArrowDownRight size={19} /></a></div><div className="hero-meta"><span><ShieldCheck /> Event-first teams</span><span><CalendarCheck /> Lagos coverage</span></div></div></section><Marquee /><WhyBigBounce /><HighlightReel /><BouncerShowcase /><ServiceStrip /><Process /><OtherServices /><FaqPreview /><FinalCta /></div></Layout>
}

function Marquee() { return <div className="marquee" aria-hidden="true"><div>BIG EVENTS <i>•</i> BIG ENERGY <i>•</i> BIG BOUNCE <i>•</i> BIG EVENTS <i>•</i> BIG ENERGY <i>•</i> BIG BOUNCE <i>•</i></div></div> }
function WhyBigBounce() { return <section className="section statement reveal"><Eyebrow>Why Big Bounce</Eyebrow><h2>Professional people.<br /><em>Serious presence.</em></h2><div className="statement-grid"><p>We build bouncer and event-security support around the room you are creating, not a generic checklist.</p><div><span><ShieldCheck /> Event-specific deployment</span><span><Users /> Professional appearance</span><span><Clock3 /> Organised coordination</span></div></div></section> }

function HighlightReel() {
  const scope = useRef(null)
  useMotion(scope, () => {
    const rail = scope.current.querySelector('.reel-rail')
    if (window.innerWidth < 900) return undefined
    const getDistance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 56)
    gsap.to(rail, { x: () => -getDistance(), ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top top', end: () => `+=${getDistance() + 420}`, scrub: 1, pin: true, invalidateOnRefresh: true } })
    return undefined
  })
  return <section className="event-reel" id="event-reel" ref={scope}><div className="reel-heading"><Eyebrow>The highlight reel</Eyebrow><h2>We have been<br /><em>at the door.</em></h2><p>Real moments. Real rooms. A considered presence when it matters.</p></div><div className="reel-rail">{reelEvents.map(([number, title, image, caption]) => <article className="reel-card" key={number} tabIndex="0"><img src={image} alt={`${title} event supported by Big Bounce Events`} loading="lazy" /><div className="reel-overlay" /><div className="reel-caption"><span>{number}</span><h3>{title}</h3><p>{caption}</p><ArrowRight /></div></article>)}</div><p className="reel-hint">Scroll to explore <ArrowDownRight size={16} /></p></section>
}

function BouncerShowcase() { return <section className="bouncer-showcase reveal"><div className="showcase-title"><Eyebrow>Our primary service</Eyebrow><h2>THE<br /><em>BOUNCERS.</em></h2><p>From private rooms to public stages, Big Bounce helps create the right presence for the occasion.</p><Link className="text-link" to="/bouncers">Explore bouncer services <ArrowRight size={17} /></Link></div><div className="showcase-images"><figure className="showcase-large"><img src={images.door} alt="Big Bounce bouncers working at an event" loading="lazy" /><figcaption>01 / The room</figcaption></figure><figure className="showcase-small"><img src={images.nightlife} alt="Professional event security at a nightlife event" loading="lazy" /><figcaption>02 / The door</figcaption></figure></div><div className="showcase-types" aria-label="Bouncer service types">{['Weddings', 'Parties', 'Clubs', 'Concerts', 'Corporate', 'Private events'].map((item) => <span key={item}>{item}</span>)}</div></section> }

function ServiceStrip() { const services = [['01', 'Bouncers', 'Professional people, serious presence.', '/bouncers'], ['02', 'Event security', 'Event-aware support from the entrance onward.', '/event-security'], ['03', 'Ushers', 'A polished guest experience.', '/ushers'], ['04', 'Event rentals', 'Barricades and practical event support.', '/event-rentals']]; return <section className="service-strip reveal"><div className="section strip-inner"><Eyebrow>What we bring</Eyebrow><div className="service-list">{services.map(([num, title, text, link], index) => <Link to={link} className={index === 0 ? 'is-primary' : ''} key={title}><span>{num}</span><h3>{title}</h3><p>{text}</p><ArrowRight /></Link>)}</div></div></section> }

function Process() { const steps = [['01', 'Tell us about your event', 'Date, venue area, format, and the support you are considering.'], ['02', 'We build your team', 'We discuss the best event support approach and your quote.'], ['03', 'Confirm the booking', 'Approve the details and reserve the appropriate support.'], ['04', 'You run the event', 'Your professional team arrives ready for the agreed plan.']]; return <section className="process"><div className="section process-inner"><Eyebrow>How it works</Eyebrow><h2>Your event.<br /><em>Our door.</em></h2><ol>{steps.map(([number, title, text]) => <li className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section> }

function OtherServices() { return <section className="section other-services reveal"><div className="section-heading"><Eyebrow>Beyond the door</Eyebrow><h2>The support that keeps an event moving.</h2></div><div className="other-grid"><Link to="/event-rentals" className="media-service"><img src={images.barricade} alt="Metal barricades available for event rentals" loading="lazy" /><div><span>01 / Barricade rentals</span><h3>Guide the room.</h3><ArrowRight /></div></Link><Link to="/ushers" className="media-service"><img src={images.usher} alt="Professional usher at an event" loading="lazy" /><div><span>02 / Professional ushers</span><h3>Welcome the room.</h3><ArrowRight /></div></Link></div></section> }

const faqs = [['How much does it cost to hire a bouncer?', 'Pricing depends on the date, event format, location, duration, and the support required. Contact us with your event details for a tailored quote.'], ['How many bouncers do I need for my event?', 'The right number depends on guest count, venue layout, entry points, event type, and the responsibilities you need covered.'], ['Can I hire bouncers for a private party or wedding?', 'Yes. Big Bounce Events supports private parties, weddings, and other social occasions across Lagos.'], ['How far in advance should I book?', 'Earlier booking gives more room to plan your event support. Contact us as soon as you have your event date and core details.']]
function FaqPreview() { return <section className="section faq-section reveal"><div className="section-heading"><Eyebrow>FAQs</Eyebrow><h2>Before you book.</h2></div><div className="faq-list">{faqs.slice(0, 3).map(([q, a]) => <details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div><Link className="text-link" to="/faq">See all questions <ArrowRight size={17} /></Link></section> }
function FinalCta() { return <section className="final-cta"><img src={images.event} alt="" loading="lazy" /><div className="final-cta-shade" /><div><Eyebrow>Ready when you are</Eyebrow><h2>YOUR EVENT.<br /><em>OUR DOOR.</em></h2><p>Tell us what you are planning and let us build the right team for it.</p><Cta>Get a quote</Cta></div></section> }

function PageHero({ eyebrow, title, text, image }) { return <section className="page-hero"><img src={image} alt="" /><div /><div className="page-hero-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><Cta /></div></section> }
function ServicePage({ type }) { const data = type === 'bouncers' ? { eyebrow: 'Professional bouncers in Lagos', title: 'Bouncers designed around your event.', text: 'Tell us what you are planning and we will help shape practical, professional event support around the occasion.', image: images.door, heading: 'Bouncer services for the moments that need them', items: bouncerServices } : { eyebrow: 'Event security in Lagos', title: 'A composed approach to event security.', text: 'Big Bounce Events provides event-focused security personnel for occasions where planning, guest flow, and a professional presence matter.', image: images.event, heading: 'Event-focused support for', items: [['Corporate events', 'Professional support for conferences, launches, dinners, and business events.'], ['Live events', 'Personnel for concerts, festivals, and guest-facing venues.'], ['Private functions', 'Discreet support for celebrations and invitation-only events.']] }; return <Layout><PageHero {...data} /><section className="section service-page"><div className="section-heading"><Eyebrow>Service coverage</Eyebrow><h2>{data.heading}</h2></div><div className="service-grid">{data.items.map(([title, text]) => <article key={title}><ShieldCheck /><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="section split-copy"><img src={images.private} alt="Big Bounce team member at an event" loading="lazy" /><div><Eyebrow>Plan with clarity</Eyebrow><h2>Start with the event details.</h2><p>For a useful quote, tell us your event date, venue area, format, estimated guest count, and the type of support you are considering. We will discuss the right next step.</p><Cta /></div></section><FinalCta /></Layout> }
function Ushers() { return <Layout><PageHero eyebrow="Professional ushers in Lagos" title="A polished welcome for every guest." text="Professional ushers for guest management, seating support, directions, and event coordination." image={images.usherGroup} /><section className="section split-copy reverse"><img src={images.usher} alt="Professional usher ready to welcome guests" loading="lazy" /><div><Eyebrow>Usher support</Eyebrow><h2>Help guests feel expected and looked after.</h2><p>Our ushers can provide welcoming, directions, seating support, and calm event-day assistance that helps the occasion run smoothly.</p><ul className="check-list"><li><Check /> Corporate and social events</li><li><Check /> Guest arrival and seating support</li><li><Check /> On-the-day coordination assistance</li></ul><Cta /></div></section><FinalCta /></Layout> }
function Rentals() { return <Layout><PageHero eyebrow="Event rentals in Lagos" title="Barricades and rental support for better organised events." text="Barricade rentals and practical event support are available as a secondary service alongside our bouncer and security work." image={images.barricade} /><section className="section rental-grid"><article><img src={images.barricade} alt="Event barricade rental" loading="lazy" /><div><Eyebrow>Priority rental</Eyebrow><h2>Barricade rentals</h2><p>Practical barriers for crowd guidance, event layout, and clearly defined venue spaces.</p><Cta /></div></article><article><img src={images.rental} alt="Event rental equipment" loading="lazy" /><div><Eyebrow>Event support</Eyebrow><h2>Rental enquiries</h2><p>Let us know the event setup you are planning. We will discuss suitable available rental support.</p><Cta /></div></article></section><FinalCta /></Layout> }
function About() { return <Layout><PageHero eyebrow="About Big Bounce Events" title="Professional event people for Lagos occasions." text="Big Bounce Events is focused on professional bouncers, event security personnel, ushers, and practical event support." image={images.event} /><section className="section about-copy"><div><Eyebrow>Our focus</Eyebrow><h2>Security first. Event-aware throughout.</h2><p>We put professional bouncer and event security support first, then provide additional services that help guests and organisers have a smoother event experience.</p></div><div><Eyebrow>Our service area</Eyebrow><h2>Supporting events across Lagos.</h2><p>We serve Lagos, Nigeria. Contact us with your venue area, date, and event requirements so we can discuss availability and the right support.</p></div></section><FinalCta /></Layout> }
function Contact() { return <Layout><section className="contact-page"><div><Eyebrow>Request a quote</Eyebrow><h1>Tell us about your event.</h1><p>Share the essentials and we will discuss professional bouncer, security, usher, or rental support for your Lagos event.</p><div className="contact-direct"><a href="tel:+2348065077992"><Phone /> +234 806 507 7992</a><a href="mailto:bigbouncesecure@gmail.com">bigbouncesecure@gmail.com</a></div></div><form action="https://formspree.io/f/xrbzjnga" method="POST"><label>Name<input name="name" autoComplete="name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><label>Email address <span>(optional)</span><input name="email" type="email" autoComplete="email" /></label><label>Event date<input name="event-date" type="date" required /></label><label>What support do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Professional bouncers</option><option>Event security</option><option>Professional ushers</option><option>Barricade or event rentals</option></select></label><label>Tell us about the event<textarea name="message" rows="5" placeholder="Event type, venue area, guest count, and anything else helpful" required /></label><button className="button" type="submit"><span>Send enquiry</span><ArrowRight size={18} /></button></form></section></Layout> }
function FaqPage() { return <Layout><section className="simple-page"><Eyebrow>Frequently asked questions</Eyebrow><h1>Helpful answers before you hire.</h1><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div><Cta /></section></Layout> }
function NotFound() { return <Layout><section className="simple-page"><Eyebrow>Page not found</Eyebrow><h1>Let's get you back to Big Bounce Events.</h1><Link className="button" to="/"><span>Go home</span><ArrowRight size={18} /></Link></section></Layout> }

export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/bouncers" element={<ServicePage type="bouncers" />} /><Route path="/event-security" element={<ServicePage type="security" />} /><Route path="/ushers" element={<Ushers />} /><Route path="/event-rentals" element={<Rentals />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/faq" element={<FaqPage />} /><Route path="*" element={<NotFound />} /></Routes> }
