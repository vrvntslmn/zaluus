import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Asterisk, Menu, MoveUpRight, Sparkles, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BudgetSelector from './components/BudgetSelector';
import ContactForm from './components/ContactForm';
import { capabilities, concepts, processSteps, services } from './data';
import { contactConfig } from './config/contact';

gsap.registerPlugin(ScrollTrigger);

type ShowcaseTheme = 'market' | 'cafe' | 'orbit';
const themeOptions: { id: ShowcaseTheme; label: string; eyebrow: string; title: string; description: string; action: string }[] = [
  { id: 'market', label: 'Дэлгүүр', eyebrow: 'ӨДӨР ТУТМЫН ЭДЛЭЛ', title: 'Өөрийнхөөрөө сонго.', description: 'Хэрэгтэй зүйл. Ухаалаг сонголт.', action: 'ЦУГЛУУЛГА ҮЗЭХ' },
  { id: 'cafe', label: 'Кафе', eyebrow: 'ӨНӨӨДРИЙН ЦЭС', title: 'Амтлах мөчөө.', description: 'Шинэ амт, дулаан орчин.', action: 'ЦЭС ХАРАХ' },
  { id: 'orbit', label: 'Технологи', eyebrow: 'ШИНЭ ҮЕИЙН САНАА', title: 'Ирээдүй ойрхон.', description: 'Технологи таны хэмнэлээр.', action: 'ТАНИЛЦАХ' },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'Бидний тухай' },
    { href: '#services', label: 'Үйлчилгээ' },
    { href: '#work', label: 'Бүтээл' },
    { href: '#process', label: 'Явц' },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-is-open' : ''}`}>
      <a className="brand-mark" href="#top" aria-label="Залуус — нүүр хуудас" onClick={closeMenu}>
        <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-name">залуус<span>.</span></span>
      </a>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Үндсэн цэс">
        {links.map((link) => <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Ярилцъя <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Цэс хаах' : 'Цэс нээх'}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}

function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    visualRef.current?.style.setProperty('--pointer-x', `${x}%`);
    visualRef.current?.style.setProperty('--pointer-y', `${y}%`);
  }

  return (
    <div className="hero-art reveal" ref={visualRef} onPointerMove={moveLight} aria-label="Гэрэлтэх геометр дүрс бүхий бүтээлч студийн дүрслэл">
      <div className="hero-art-glow" />
      <div className="orbit orbit--outer" />
      <div className="orbit orbit--middle" />
      <div className="orbit orbit--inner" />
      <div className="orbit-axis orbit-axis--one" />
      <div className="orbit-axis orbit-axis--two" />
      <div className="core-shape">
        <span className="core-facet core-facet--left" />
        <span className="core-facet core-facet--right" />
        <span className="core-highlight" />
      </div>
      <span className="float-label float-label--top">САНАА <i>↗</i></span>
      <span className="float-label float-label--bottom">БОДИТ БҮТЭЭЛ <i>✳</i></span>
      <span className="orbit-dot orbit-dot--one" />
      <span className="orbit-dot orbit-dot--two" />
      <span className="orbit-dot orbit-dot--three" />
      <span className="art-coordinate">47°55' · 106°55'</span>
    </div>
  );
}

function Portfolio() {
  const [active, setActive] = useState(0);
  const concept = concepts[active] ?? concepts[0];

  return (
    <section className="portfolio-section section-pad" id="work">
      <div className="section-head portfolio-head reveal">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> БИДНИЙ БОЛОМЖ</span>
          <h2>Бид юу хийж <span className="italic-accent">чадах вэ?</span></h2>
        </div>
        <p>Эдгээр нь жишээ санааг харуулах <b>концепц загварууд</b> — бодит захиалагчийн ажил биш.</p>
      </div>
      <div className="portfolio-layout">
        <div className="portfolio-list" role="tablist" aria-label="Концепц загвар сонгох">
          {concepts.map((item, index) => (
            <button
              className={`portfolio-list-item${active === index ? ' is-active' : ''}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="portfolio-preview"
              id={`portfolio-tab-${index}`}
              key={item.id}
              onClick={() => setActive(index)}
              type="button"
            >
              <span className="portfolio-list-number">0{index + 1}</span>
              <span className="portfolio-list-copy"><small>{item.type}</small><strong>{item.title}</strong></span>
              <ArrowUpRight size={18} />
            </button>
          ))}
          <div className="portfolio-caption"><span className="tiny-spark">✳</span><span>Гурван өөр салбар.<br />Гурван өөр өнгө төрх.</span></div>
        </div>
        <div className="portfolio-preview" id="portfolio-preview" role="tabpanel" aria-labelledby={`portfolio-tab-${active}`} key={concept.id}>
          <div className={`concept-image concept-image--${concept.theme}`}>
            <img src={concept.image} alt={concept.alt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            <div className="concept-image-scrim" />
            <div className="concept-chip"><span /> КОНЦЕПЦ ЗАГВАР</div>
            <div className="concept-browser-bar"><span className="browser-dots"><i /><i /><i /></span><span>үзүүлбэр / 0{active + 1}</span><ArrowUpRight size={14} /></div>
            <div className="concept-title-over-image"><small>{concept.type}</small><h3>{concept.title}</h3><p>{concept.subtitle}</p></div>
            <span className="image-index">0{active + 1} <i>/ 03</i></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreativeShowcase() {
  const [theme, setTheme] = useState<ShowcaseTheme>('market');
  const selected = themeOptions.find((option) => option.id === theme) ?? themeOptions[0];

  return (
    <section className="showcase-section section-pad" id="playground">
      <div className="showcase-top reveal">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> ТУРШИЖ ҮЗЭЭРЭЙ</span>
          <h2>Нэг санаа.<br /><span className="italic-accent">Олон өнгө.</span></h2>
        </div>
        <p>Нэг бүтэц, гурван өөр уур амьсгал. Сонголтоо сольж, дизайн санааг хэрхэн өөрчилж болохыг үзээрэй.</p>
      </div>
        <div className="showcase-stage reveal">
          <div className="showcase-toolbar">
            <div className="browser-dots"><i /><i /><i /></div>
            <span className="address-bar"><span /> студи / загвар</span>
            <span className="toolbar-label">ИНТЕРАКТИВ ТУРШИЛТ</span>
          </div>
          <div className={`live-preview live-preview--${theme}`}>
            <div className="live-preview-nav">
              <span className="preview-brand"><i>◈</i> {theme === 'market' ? 'ХЭЛБЭР' : theme === 'cafe' ? 'ӨРГӨӨ' : 'НОВА'}</span>
              <div><span>ТАНИЛЦУУЛГА</span><span>ЦУГЛУУЛГА</span><span>БИДНИЙ ТУХАЙ</span></div>
              <a href="#contact" aria-label="Төслөө ярилцах">↗</a>
            </div>
            <div className="live-preview-content">
              <div className="live-preview-copy">
                <span className="live-eyebrow"><span /> {selected.eyebrow}</span>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
                <a href="#contact" className="live-preview-action">{selected.action} <ArrowUpRight size={14} /></a>
            </div>
            <div className="live-preview-object" aria-hidden="true">
              <div className="preview-object-orbit preview-object-orbit--one" />
              <div className="preview-object-orbit preview-object-orbit--two" />
              <div className="preview-object-core"><span /><i>✳</i></div>
              <span className="preview-object-stamp">{theme === 'market' ? 'ЭДЛЭЛ / 01' : theme === 'cafe' ? 'АМТ / 01' : 'САНАА / 01'}</span>
            </div>
          </div>
          <div className="live-preview-foot"><span>01 — ХЭВ МАЯГ</span><span>ӨӨРЧЛӨЛТИЙГ МЭДЭР <ArrowDownRight size={14} /></span></div>
        </div>
        <div className="showcase-switcher">
          <span className="micro-label">ХЭВ МАЯГ СОНГОХ</span>
          <div role="group" aria-label="Вебийн хэв маяг сонгох">
            {themeOptions.map((option, index) => (
              <button className={theme === option.id ? 'is-active' : ''} type="button" key={option.id} aria-pressed={theme === option.id} onClick={() => setTheme(option.id)}>
                <i>0{index + 1}</i> {option.label}
              </button>
            ))}
          </div>
          <span className="showcase-live"><i /> АМЬД ТУРШИЛТ</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand-mark" href="#top" aria-label="Залуус — нүүр хуудас">
        <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-name">залуус<span>.</span></span>
      </a>
      <span className="footer-line">ШИНЭ САНААГААС — ШИНЭ ВЕБ РҮҮ</span>
      <div className="footer-links">
        {contactConfig.email ? <a href={`mailto:${contactConfig.email}`}>И-мэйл <ArrowUpRight size={13} /></a> : <span>И-мэйл тохируулаагүй</span>}
        {contactConfig.phone ? <a href={`tel:${contactConfig.phone.replace(/\s/g, '')}`}>Утас <ArrowUpRight size={13} /></a> : <span>Утас тохируулаагүй</span>}
        {contactConfig.facebook && <a href={contactConfig.facebook} target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13} /></a>}
        {contactConfig.instagram && <a href={contactConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>}
      </div>
      <a className="back-top" href="#top">ДЭЭШ <ArrowUp size={13} /></a>
    </footer>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    function onPointerMove(event: globalThis.PointerEvent) {
      cursor?.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor?.style.setProperty('--cursor-y', `${event.clientY}px`);
      cursor?.classList.add('is-visible');
      const isInteractive = event.target instanceof Element && Boolean(event.target.closest('a, button, input, select, textarea, [role="button"]'));
      cursor?.classList.toggle('is-interactive', isInteractive);
    }

    function onPointerLeave() {
      cursor?.classList.remove('is-visible', 'is-interactive');
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>;
}

export default function App() {
  const [budget, setBudget] = useState(2);
  const heroRef = useRef<HTMLElement>(null);

  function handleHeroPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    heroRef.current?.style.setProperty('--hero-shift-x', `${x * 7}px`);
    heroRef.current?.style.setProperty('--hero-shift-y', `${y * 7}px`);
  }

  function handleMagneticPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function resetMagneticPointer(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty('transform');
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { yPercent: 115, rotateX: -12, opacity: 0 }, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.13,
        delay: 0.12,
      });
      gsap.fromTo('.hero-intro, .hero-actions, .hero-art', { y: 28, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.46,
      });
      gsap.fromTo('.process-line span', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.process-steps', start: 'top 76%', end: 'bottom 72%', scrub: 0.65 },
      });
      gsap.utils.toArray<HTMLElement>('.reveal:not(.hero-art)').forEach((element) => {
        gsap.fromTo(element, { y: 32, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.78,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div className="site-shell">
      <SiteHeader />
      <CustomCursor />
      <main>
        <section className="hero-section" id="top" ref={heroRef} onPointerMove={handleHeroPointer}>
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-main">
            <div className="hero-copy">
              <span className="hero-kicker"><i className="live-dot" /> БҮТЭЭЛЧ ВЕБ СТУДИ <span>·</span> МОНГОЛ</span>
              <h1 className="hero-title">
                <span className="hero-title-mask"><span className="hero-title-line">Санааг тань</span></span>
                <span className="hero-title-mask"><span className="hero-title-line hero-title-line--accent">веб сайт болгоё<span className="hero-dot">.</span></span></span>
              </h1>
              <div className="hero-intro">
                <span className="intro-marker">✳</span>
                <p>Бид бол шинэ санаа, бүтээлч шийдлээр дүүрэн оюутан хөгжүүлэгчид. Таны хүсэл, хэрэгцээ, төсөвт тохирсон орчин үеийн веб сайтыг бүтээнэ.</p>
              </div>
              <p className="hero-budget-line">Таны төсөвт тааруулж, <strong>таны хүссэн вебийг бүтээнэ.</strong></p>
              <div className="hero-actions">
                <a className="button-primary magnetic" href="#contact" onPointerMove={handleMagneticPointer} onPointerLeave={resetMagneticPointer}><span>Веб сайт захиалах</span><span className="button-icon"><ArrowUpRight size={18} /></span></a>
                <a className="button-secondary" href="#work">Бидний чадварыг харах <ArrowDownRight size={17} /></a>
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="hero-bottomline">
            <span>САНААНААС — ЦАХИМ ОРОН ЗАЙ РУУ</span>
            <a href="#about"><span className="scroll-icon"><ArrowDown size={14} /></span> ДОШЛООР ҮЗЭХ</a>
            <span>SCROLL TO DISCOVER</span>
          </div>
          <div className="hero-index" aria-hidden="true">01 <i>/ 06</i></div>
        </section>

        <div className="ticker-strip" aria-label="Залуус веб студийн бүтээлч зарчим">
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((iteration) => <span key={iteration}>ӨӨРӨӨР СЭТГЭ <Asterisk /> САЙХНЫГ БҮТЭЭ <Asterisk /> ТӨСӨВТӨӨ ТААРУУЛ <Asterisk /> ШИНЭ САНААГ ТУРШ <Asterisk /></span>)}
          </div>
        </div>

        <section className="about-section section-pad" id="about">
          <div className="about-topline reveal"><span className="eyebrow"><span className="eyebrow-line" /> БИД ХЭН БЭ</span><span className="about-index">ДИЖИТАЛ СЭТГЭЛГЭЭ · 2026</span></div>
          <div className="about-main">
            <div className="about-heading reveal"><h2>Залуу <span>сэтгэлгээ.</span><br /><em>Хязгааргүй</em><br /><span className="about-final">боломж<span className="hero-dot">.</span></span></h2></div>
            <div className="about-copy reveal">
              <span className="about-copy-mark">↘</span>
              <p>Бид бол технологид дуртай, шинэ санааг бодит бүтээл болгох хүсэлтэй оюутнууд. Бидний хувьд веб сайт гэдэг зүгээр нэг хуудас биш, харин таны бизнесийг илэрхийлэх цахим орон зай юм.</p>
              <a href="#services" className="underlined-link">Юу бүтээж болох вэ? <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="capability-band reveal">
            <span className="capability-label">БИДНИЙГ ТОДОРХОЙЛОХ НЬ</span>
            <div className="capability-list">{capabilities.map((item) => <span className="capability-item" key={item.number}><i>{item.number}</i>{item.title}</span>)}</div>
          </div>
          <div className="about-annotation" aria-hidden="true"><span>ЗАЛУУС<br />+ САНАА</span><span className="annotation-glyph">✳</span></div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-head services-head reveal">
            <div><span className="eyebrow"><span className="eyebrow-line" /> ЮУ БҮТЭЭХ ВЭ</span><h2>Таны санаанд<br /><span className="italic-accent">хэлбэр өгье.</span></h2></div>
            <p>Том, жижиг гэлтгүй санаа бүрд өөр өөр шийдэл хэрэгтэй. Таны хэрэгцээнээс эхэлье.</p>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="service-row reveal" key={service.number}>
                <span className="service-number">/{service.number}</span>
                <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
                <span className="service-note">{service.note}</span>
                <span className={`service-mini service-mini--${service.number}`} aria-hidden="true">
                  <span className="service-mini-top"><i /><i /><i /><b /></span>
                  <span className="service-mini-content"><i className="service-mini-art" /><i className="service-mini-art" /><i className="service-mini-copy" /></span>
                </span>
                <span className="service-glyph" aria-hidden="true">{service.glyph}</span>
                <a className="service-action" href="#contact" aria-label={`${service.title} захиалах`}><ArrowUpRight size={18} /></a>
              </article>
            ))}
          </div>
          <div className="services-foot reveal"><span>ХАМАГИЙН САЙН ШИЙДЭЛ ГЭДЭГ — ТАНД ТОХИРСОН ШИЙДЭЛ.</span><a href="#contact">САНААГАА ЯРИЛЦАХ <ArrowUpRight size={14} /></a></div>
        </section>

        <section className="budget-section section-pad" id="budget">
          <div className="budget-visual reveal">
            <span className="eyebrow"><span className="eyebrow-line" /> ҮНЭ ЦЭНЭ БА УЯН ХАТАН БАЙДАЛ</span>
            <div className="budget-heading"><h2>Төсөвтөө<br /><span>тааруул.</span><br /><em>Чанараа</em><br />бүү алд<span className="hero-dot">.</span></h2></div>
            <div className="budget-orbit-art" aria-hidden="true"><div /><div /><div /><i>₮</i><span>ХҮРЭЭГЭЭ<br />ХАМТДАА</span></div>
            <span className="budget-side-note">ЧАНАР · ХЭРЭГЦЭЭ · БОЛОМЖ</span>
          </div>
          <div className="budget-content reveal">
            <div className="budget-lead"><span className="budget-lead-no">02 <i>— 05</i></span><p>Веб сайт хийлгэхэд заавал их мөнгө хэрэггүй. Бид таны хэрэгцээ, зорилго, санхүүгийн боломжид тулгуурлан хамгийн тохиромжтой шийдлийг санал болгоно.</p></div>
            <div className="budget-facts"><span><i>01</i> Хэрэгцээнд суурилсан ажлын хүрээ</span><span><i>02</i> Үнэ ярихаас өмнө тодорхой ярилцана</span><span><i>03</i> Илүүдэл боломж, зардал нэмэхгүй</span><span><i>04</i> Жижиг бизнес, шинэ төслүүдэд бодит шийдэл</span></div>
            <div className="budget-selector-wrap">
              <BudgetSelector value={budget} onChange={setBudget} />
            </div>
            <a href="#contact" className="button-primary magnetic budget-cta" onPointerMove={handleMagneticPointer} onPointerLeave={resetMagneticPointer}><span>Төсөвтөө тохирсон санал авах</span><span className="button-icon"><ArrowUpRight size={18} /></span></a>
            <p className="budget-promise"><Sparkles size={16} /> Жижиг бизнесээс эхлээд том санаа хүртэл — төсөв бүрд тохирох веб шийдэл бий.</p>
          </div>
        </section>

        <Portfolio />
        <CreativeShowcase />

        <section className="process-section section-pad" id="process">
          <div className="process-head reveal"><div><span className="eyebrow"><span className="eyebrow-line" /> ЯАЖ АЖИЛЛАДАГ ВЭ</span><h2>Санаанаас<br /><span className="italic-accent">бодит веб хүртэл.</span></h2></div><p>Тодорхой, ойлгомжтой. Бид алхам бүрд хамт байна.</p></div>
          <div className="process-line" aria-hidden="true"><span /></div>
          <div className="process-steps">
            {processSteps.map((step) => (
              <article className="process-step reveal" key={step.number}>
                <span className="step-number">{step.number}<i>.</i></span>
                <span className="step-dot" aria-hidden="true" />
                <h3>{step.title}</h3><p>{step.description}</p>
              </article>
            ))}
          </div>
          <div className="process-foot"><span>ХАМТДАА СЭТГЭЖ</span><ArrowRight size={15} /><span>ХАМТДАА БҮТЭЭЕ</span></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-backdrop" aria-hidden="true"><span>САНАА</span><i>✳</i></div>
          <div className="contact-intro reveal">
            <span className="eyebrow"><span className="eyebrow-line" /> ЭХЛЭХЭД БЭЛЭН ҮҮ</span>
            <h2>Танд санаа<br />байна уу?<br /><em>Бид бүтээж өгье.</em></h2>
            <p>Таны төсөв ямар байхаас үл хамааран ярилцаад, тохирох шийдлийг хамтдаа олъё.</p>
            <div className="contact-availability"><span className="live-dot" /> САНААНД ТАНЬ НЭЭЛТТЭЙ</div>
            <a href="#contact-form" className="contact-text-link">Үнийн санал авах <ArrowDownRight size={16} /></a>
          </div>
          <ContactForm budgetIndex={budget} onBudgetChange={setBudget} />
        </section>
      </main>
      <Footer />
      <a className="floating-contact" href="#contact" aria-label="Төслөө ярилцах"><MoveUpRight size={17} /><span>Ярилцъя</span></a>
    </div>
  );
}
