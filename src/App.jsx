import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Check, ChevronDown, ClipboardList, Clock3, Menu, Phone, Quote, ShieldCheck, Users, X } from 'lucide-react'

const siteUrl = 'https://bigbounceevents.com.ng'
const contactLink = 'https://wa.me/2348065077992?text=Hello%20Big%20Bounce%20Events%2C%20I%20would%20like%20to%20hire%20bouncers%20for%20my%20event.'

const images = {
  logo: new URL('../white_logo-removebg-preview.png', import.meta.url).href,
  hero: new URL('../img bounce/first use.jpg', import.meta.url).href,
  team: new URL('../img bounce/IMG_2565.jpg', import.meta.url).href,
  event: new URL('../img bounce/IMG_2134.jpg', import.meta.url).href,
  private: new URL('../img bounce/IMG_2134.jpg', import.meta.url).href,
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

function Seo() {
  const { pathname } = useLocation()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Big Bounce Events',
    url: siteUrl,
    telephone: '+2348065077992',
    email: 'bigbouncesecure@gmail.com',
    areaServed: { '@type': 'City', name: 'Lagos' },
    description: 'Professional bouncers and event security services for events in Lagos, Nigeria.',
  }
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const links = [['/', 'Home'], ['/bouncers', 'Bouncers'], ['/event-security', 'Event Security'], ['/ushers', 'Ushers'], ['/event-rentals', 'Rentals'], ['/about', 'About'], ['/contact', 'Contact']]
  const isLight = ['/contact', '/faq'].includes(pathname)
  return <header className={`site-header ${isLight ? 'is-light' : ''}`}><a className="skip-link" href="#main">Skip to content</a><nav className="nav-shell" aria-label="Main navigation"><Link className="brand" to="/" onClick={() => setOpen(false)}><img src={images.logo} alt="Big Bounce Events" /></Link><button className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}<span className="sr-only">{open ? 'Close' : 'Open'} menu</span></button><div className={`nav-links ${open ? 'is-open' : ''}`} id="site-menu">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}<a className="button button-small nav-cta" href={contactLink} onClick={() => setOpen(false)}>Hire Bouncers <ArrowRight size={16} /></a></div></nav></header>
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><div><Link className="brand footer-brand" to="/"><img src={images.logo} alt="Big Bounce Events" /></Link><p>Professional bouncers and event support for occasions across Lagos, Nigeria.</p><a className="footer-phone" href="tel:+2348065077992"><Phone size={17} /> +234 806 507 7992</a></div><div><h2>Explore</h2><Link to="/bouncers">Bouncer services</Link><Link to="/event-security">Event security</Link><Link to="/ushers">Professional ushers</Link><Link to="/event-rentals">Event rentals</Link></div><div><h2>Plan an event</h2><Link to="/contact">Request a quote</Link><Link to="/faq">Frequently asked questions</Link><Link to="/about">About Big Bounce</Link><a href="mailto:bigbouncesecure@gmail.com">bigbouncesecure@gmail.com</a></div></div><div className="footer-bottom"><span>Serving Lagos, Nigeria</span><span>© {new Date().getFullYear()} Big Bounce Events</span></div></footer>
}

function Layout({ children }) { return <><Seo /><Header /><main id="main">{children}</main><Footer /></> }
function Cta({ secondary = false, children = 'Hire Bouncers' }) { return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={secondary ? 'tel:+2348065077992' : contactLink}>{children} {!secondary && <ArrowRight size={18} />}</a> }
function Eyebrow({ children }) { return <p className="eyebrow"><span />{children}</p> }

function Home() {
  return <Layout><section className="hero"><img className="hero-image" src={images.hero} alt="Professional bouncer at an event" fetchPriority="high" /><div className="hero-shade" /><div className="hero-content"><Eyebrow>Lagos event security</Eyebrow><h1>Professional bouncers for <em>events that matter.</em></h1><p>Big Bounce Events provides polished, event-focused bouncers and security personnel for parties, weddings, corporate events, concerts, clubs, and private occasions in Lagos.</p><div className="hero-actions"><Cta /><Cta secondary>Call for a quote</Cta></div><div className="hero-notes"><span><ShieldCheck /> Event-focused teams</span><span><CalendarCheck /> Simple booking process</span></div></div></section><TrustSection /><BouncerSection /><Process /><OtherServices /><TestimonialReady /><FaqPreview /><FinalCta /></Layout>
}

function TrustSection() { const items = [[ShieldCheck, 'Professional presence', 'Well-presented personnel selected for the specific environment and format of your event.'], [Users, 'Event-aware support', 'A team that understands guest experience matters just as much as a calm, organised venue.'], [Clock3, 'Clear coordination', 'Tell us the details, receive a quote, and confirm your team before event day.']]; return <section className="section trust"><div className="section-heading"><Eyebrow>Why Big Bounce</Eyebrow><h2>Security support that fits the occasion.</h2></div><div className="benefit-grid">{items.map(([Icon, title, text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section> }

function BouncerSection() { return <section className="section bouncer-feature"><div className="image-stack"><img src={images.team} alt="Big Bounce bouncers working at an event" loading="lazy" /><div><ShieldCheck size={22} /><span>Professional bouncer services in Lagos</span></div></div><div><Eyebrow>Our primary service</Eyebrow><h2>Bring the right presence to your event.</h2><p className="lead">From intimate celebrations to large public occasions, we help you plan event-appropriate bouncer coverage with professional people at the centre.</p><ul className="check-list"><li><Check /> Parties, weddings and private events</li><li><Check /> Corporate functions and launches</li><li><Check /> Concerts, festivals and clubs</li></ul><Link className="text-link" to="/bouncers">Explore bouncer services <ArrowRight size={17} /></Link></div></section> }

function Process() { return <section className="process"><div className="section process-inner"><div className="section-heading"><Eyebrow>How it works</Eyebrow><h2>A straightforward route from event brief to team.</h2></div><ol>{[['01', 'Tell us about your event', 'Share your date, venue area, event type, and the support you need.'], ['02', 'Receive a quote', 'We will discuss the right event staffing approach and your quote.'], ['03', 'Confirm your booking', 'Approve the details and secure your requested event support.'], ['04', 'Meet your team', 'Your professional team arrives prepared for the agreed event plan.']].map(([n, title, text]) => <li key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section> }

function OtherServices() { return <section className="section"><div className="section-heading compact"><Eyebrow>Additional support</Eyebrow><h2>Useful event services, after security comes first.</h2></div><div className="secondary-services"><article><img src={images.barricade} alt="Metal barricades available for event rentals" loading="lazy" /><div><p className="service-tag">Barricade rentals</p><h3>Keep event spaces organised.</h3><p>Hire barricades and event rental support for practical venue setup.</p><Link to="/event-rentals">View event rentals <ArrowRight size={16} /></Link></div></article><article><img src={images.usher} alt="Professional usher at an event" loading="lazy" /><div><p className="service-tag">Professional ushers</p><h3>Welcome guests with confidence.</h3><p>Friendly, polished usher support for guest flow and event coordination.</p><Link to="/ushers">Explore usher services <ArrowRight size={16} /></Link></div></article></div></section> }

function TestimonialReady() { return <section className="section testimonial-ready"><Quote aria-hidden="true" /><div><Eyebrow>Client experiences</Eyebrow><h2>Real client feedback belongs here.</h2><p>We are keeping this space ready for verified client testimonials. Add approved feedback, names, and event context when they are available.</p></div><Link className="text-link" to="/contact">Plan your event with us <ArrowRight size={17} /></Link></section> }

const faqs = [['How much does it cost to hire a bouncer?', 'Pricing depends on the date, event format, location, duration, and the support required. Contact us with your event details for a tailored quote.'], ['How many bouncers do I need for my event?', 'The right number depends on guest count, venue layout, entry points, event type, and the responsibilities you need covered.'], ['Can I hire bouncers for a private party or wedding?', 'Yes. Big Bounce Events supports private parties, weddings, and other social occasions across Lagos.'], ['How far in advance should I book?', 'Earlier booking gives more room to plan your event support. Contact us as soon as you have your event date and core details.']]
function FaqPreview() { return <section className="section faq-section"><div className="section-heading"><Eyebrow>FAQs</Eyebrow><h2>Before you book.</h2></div><div className="faq-list">{faqs.slice(0, 3).map(([q, a]) => <details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div><Link className="text-link" to="/faq">See all questions <ArrowRight size={17} /></Link></section> }
function FinalCta() { return <section className="final-cta"><div><Eyebrow>Ready when you are</Eyebrow><h2>Hire professional bouncers for your Lagos event.</h2></div><Cta /></section> }

function PageHero({ eyebrow, title, text, image }) { return <section className="page-hero"><img src={image} alt="" /><div /><div className="page-hero-content"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p><Cta /></div></section> }
function ServicePage({ type }) {
  const data = type === 'bouncers' ? { eyebrow: 'Professional bouncers in Lagos', title: 'Bouncers designed around your event.', text: 'Tell us what you are planning and we will help shape practical, professional event support around the occasion.', image: images.team, heading: 'Bouncer services for the moments that need them', items: bouncerServices } : { eyebrow: 'Event security in Lagos', title: 'A composed approach to event security.', text: 'Big Bounce Events provides event-focused security personnel for occasions where planning, guest flow, and a professional presence matter.', image: images.event, heading: 'Event-focused support for', items: [['Corporate events', 'Professional support for conferences, launches, dinners, and business events.'], ['Live events', 'Personnel for concerts, festivals, and guest-facing venues.'], ['Private functions', 'Discreet support for celebrations and invitation-only events.']] }
  return <Layout><PageHero {...data} /><section className="section service-page"><div className="section-heading"><Eyebrow>Service coverage</Eyebrow><h2>{data.heading}</h2></div><div className="service-grid">{data.items.map(([title, text]) => <article key={title}><ShieldCheck /><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="section split-copy"><img src={images.private} alt="Big Bounce team member at an event" loading="lazy" /><div><Eyebrow>Plan with clarity</Eyebrow><h2>Start with the event details.</h2><p>For a useful quote, tell us your event date, venue area, format, estimated guest count, and the type of support you are considering. We will discuss the right next step.</p><Cta /></div></section><FinalCta /></Layout>
}
function Ushers() { return <Layout><PageHero eyebrow="Professional ushers in Lagos" title="A polished welcome for every guest." text="Professional ushers for guest management, seating support, directions, and event coordination." image={images.usherGroup} /><section className="section split-copy reverse"><img src={images.usher} alt="Professional usher ready to welcome guests" loading="lazy" /><div><Eyebrow>Usher support</Eyebrow><h2>Help guests feel expected and looked after.</h2><p>Our ushers can provide welcoming, directions, seating support, and calm event-day assistance that helps the occasion run smoothly.</p><ul className="check-list"><li><Check /> Corporate and social events</li><li><Check /> Guest arrival and seating support</li><li><Check /> On-the-day coordination assistance</li></ul><Cta /></div></section><FinalCta /></Layout> }
function Rentals() { return <Layout><PageHero eyebrow="Event rentals in Lagos" title="Barricades and rental support for better organised events." text="Barricade rentals and practical event support are available as a secondary service alongside our bouncer and security work." image={images.barricade} /><section className="section rental-grid"><article><img src={images.barricade} alt="Event barricade rental" loading="lazy" /><div><Eyebrow>Priority rental</Eyebrow><h2>Barricade rentals</h2><p>Practical barriers for crowd guidance, event layout, and clearly defined venue spaces.</p><Cta /></div></article><article><img src={images.rental} alt="Event rental equipment" loading="lazy" /><div><Eyebrow>Event support</Eyebrow><h2>Rental enquiries</h2><p>Let us know the event setup you are planning. We will discuss suitable available rental support.</p><Cta /></div></article></section><FinalCta /></Layout> }
function About() { return <Layout><PageHero eyebrow="About Big Bounce Events" title="Professional event people for Lagos occasions." text="Big Bounce Events is focused on professional bouncers, event security personnel, ushers, and practical event support." image={images.event} /><section className="section about-copy"><div><Eyebrow>Our focus</Eyebrow><h2>Security first. Event-aware throughout.</h2><p>We put professional bouncer and event security support first, then provide additional services that help guests and organisers have a smoother event experience.</p></div><div><Eyebrow>Our service area</Eyebrow><h2>Supporting events across Lagos.</h2><p>We serve Lagos, Nigeria. Contact us with your venue area, date, and event requirements so we can discuss availability and the right support.</p></div></section><FinalCta /></Layout> }
function Contact() { return <Layout><section className="contact-page"><div><Eyebrow>Request a quote</Eyebrow><h1>Tell us about your event.</h1><p>Share the essentials and we will discuss professional bouncer, security, usher, or rental support for your Lagos event.</p><div className="contact-direct"><a href="tel:+2348065077992"><Phone /> +234 806 507 7992</a><a href="mailto:bigbouncesecure@gmail.com">bigbouncesecure@gmail.com</a></div></div><form action="https://formspree.io/f/xrbzjnga" method="POST"><label>Name<input name="name" autoComplete="name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><label>Email address <span>(optional)</span><input name="email" type="email" autoComplete="email" /></label><label>Event date<input name="event-date" type="date" required /></label><label>What support do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Professional bouncers</option><option>Event security</option><option>Professional ushers</option><option>Barricade or event rentals</option></select></label><label>Tell us about the event<textarea name="message" rows="5" placeholder="Event type, venue area, guest count, and anything else helpful" required /></label><button className="button" type="submit">Send enquiry <ArrowRight size={18} /></button></form></section></Layout> }
function FaqPage() { return <Layout><section className="simple-page"><Eyebrow>Frequently asked questions</Eyebrow><h1>Helpful answers before you hire.</h1><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div><Cta /></section></Layout> }
function NotFound() { return <Layout><section className="simple-page"><Eyebrow>Page not found</Eyebrow><h1>Let’s get you back to Big Bounce Events.</h1><Link className="button" to="/">Go home <ArrowRight size={18} /></Link></section></Layout> }

export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/bouncers" element={<ServicePage type="bouncers" />} /><Route path="/event-security" element={<ServicePage type="security" />} /><Route path="/ushers" element={<Ushers />} /><Route path="/event-rentals" element={<Rentals />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/faq" element={<FaqPage />} /><Route path="*" element={<NotFound />} /></Routes> }
