import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const words = ["horizons.'", "abhay.'", "gratitude.'"];
  
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Current Time Updater
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Animated Words
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    // Scroll Reveal & Active Nav
    const handleScroll = () => {
      let current = 'home';
      sectionsRef.current.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, { threshold: 0.15 });

    sectionsRef.current.forEach(sec => {
      if (sec) revealObserver.observe(sec);
    });

    return () => {
      clearInterval(timeInterval);
      clearInterval(wordInterval);
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={`site-container ${loading ? 'site-hidden' : 'site-revealed'}`}>
      {/* Left Sidebar */}
      <aside className="left-sidebar">
        <div className="b-logo blue-dot">
          b
          <span className="b-logo-dot"></span>
        </div>
        <div className="vertical-text">
          <span>BY THE HORIZONS</span>
          <span className="dot">•</span>
          <span>ABHAY P.</span>
        </div>
        <div className="copyright">© 2026</div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Right Bar */}
        <header className="top-bar">
          <div className="status-badge">
            <span className="status-dot"></span>
            Available for Work
          </div>
          <div className="time-badge">
            <span>{time}</span> IST
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section reveal-section" id="home" ref={addToRefs}>
          <div className="hero-content">
            <div className="version-tag">
              <span className="blue-dot"></span> By The Horizons
            </div>
            
            <h1 className="hero-title">
              Freelance Web<br />
              Developer.<br />
              <span className="serif-italic">'by the </span>
              <span className="animated-word-container" id="animated-words-container">
                {words.map((word, i) => (
                  <span 
                    key={word} 
                    className={`serif-italic blue-text animated-word ${i === currentWordIndex ? 'active' : ''} ${i === (currentWordIndex - 1 + words.length) % words.length ? 'leaving' : ''}`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>
            
            <p className="hero-subtitle">
              I'm <strong>Abhay</strong> - I build fast, interactive sites for brands and individuals.
              Honest scopes, quick delivery on most projects, and an interface you'll actually want to use.
            </p>
            
            <div className="hero-actions">
              <a href="#work" onClick={(e) => scrollTo(e, 'work')} className="btn btn-primary">View selected work <span className="arrow">↓</span></a>
              <a href="mailto:hey@abhayp.xyz" className="btn btn-secondary">hey@abhayp.xyz</a>
            </div>
            
            <div className="tech-stack">
              REACT • PHP • NODE.JS • MONGODB • PYTHON • LINUX
            </div>
          </div>

          {/* Hero Graphic Area */}
          <div className="hero-graphic">
            <div className="hero-image-wrapper">
              <img src="/hero-graphics.png" alt="Hero Graphic" loading='lazy' />
            </div>
          </div>
        </section>

        {/* Stats Grid Section */}
        <section className="stats-grid reveal-section" ref={addToRefs}>
          <div className="stat-item">
            <div className="stat-title">AVG. DELIVERY</div>
            <div className="stat-value">3 days</div>
            <div className="stat-desc">From kickoff to shipped, on most projects.</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">RESPONSE TIME</div>
            <div className="stat-value">12 hours</div>
            <div className="stat-desc">Usually faster. Always within the same day.</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">PROJECT RANGE</div>
            <div className="stat-value">$250 — $500</div>
            <div className="stat-desc">Scope-dependent. Larger builds quoted on a call.</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">CURRENTLY</div>
            <div className="stat-value">Available</div>
            <div className="stat-desc">Shipping projects contantly which stands out.</div>
          </div>
        </section>

        {/* Works Section */}
        <section className="works-section reveal-section" id="work" ref={addToRefs}>
          <div className="section-header">
            <div className="section-label">SELECTED WORKS</div>
            <div className="section-title-wrap">
              <h2 className="section-title serif">Three sites, three different problems.</h2>
              <p className="section-desc">Each one shipped end-to-end — design, build, and the small details that make a site feel alive.</p>
            </div>
          </div>

          <div className="projects-list">
            <article className="project-item">
              <div className="project-image">
                <img src="/project-thepowerdown.png" alt="Power Down Hosting" loading='lazy'/>
              </div>
              <div className="project-info">
                <div className="project-meta">01. / CLOUD INFRASTRUCTURE & VPS</div>
                <h3 className="project-title serif">Power Down Hosting</h3>
                <p className="project-description">A next-gen hosting brand: scalable VPS, military-grade security, and an interface built for engineers in a hurry.</p>
                <div className="project-tags">
                  <span className="tag">Next.js</span>
                  <span className="tag">Marketing</span>
                  <span className="tag">Design System</span>
                </div>
                <a href="https://thepowerdown.in" target='_blank' className="project-link">Visit the site ↗</a>
              </div>
            </article>

            <article className="project-item reverse">
              <div className="project-image">
                <img src="/project-acs.png" alt="ACS Infotech" loading='lazy'/>
              </div>
              <div className="project-info">
                <div className="project-meta">02. / CLOUD HOSTING, NEPAL</div>
                <h3 className="project-title serif">ACS Infotech Pvt. Ltd.</h3>
                <p className="project-description">Full website for an enterprise IT services company — multi-currency pricing, localized copy, and a deeply technical product catalog.</p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">Cloud</span>
                  <span className="tag">Nepal First</span>
                </div>
                <a href="https://acsinfotech.com.np" target='_blank' className="project-link">Visit the site ↗</a>
              </div>
            </article>

            <article className="project-item">
              <div className="project-image">
                <img src="/project-cartve.png" alt="Cartve" loading='lazy'/>
              </div>
              <div className="project-info">
                <div className="project-meta">03. / STARTUP E-COMMERCE PLATFORM</div>
                <h3 className="project-title serif">Cartve</h3>
                <p className="project-description">A one-stop platform for creators to launch storefronts, accept secure checkouts, and track real-time orders — no coding required.</p>
                <div className="project-tags">
                  <span className="tag">SaaS</span>
                  <span className="tag">Dashboard</span>
                  <span className="tag">Payments</span>
                </div>
                <a href="https://cartve.abhayp.xyz" target='_blank' className="project-link">Visit the site ↗</a>
              </div>
            </article>
          </div>
        </section>

        {/* Journey Section */}
        <section className="journey-section reveal-section" id="journey" ref={addToRefs}>
          <div className="journey-header">
            <div className="section-label">THE JOURNEY</div>
            <h2 className="section-title serif">A few years of <span className="serif-italic blue-text">looking up.</span></h2>
            <p className="section-desc">I treat freelance like a craft, not a side hustle. Here's the short version of how I got here.</p>
          </div>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker active"></div>
              <div className="timeline-content">
                <div className="timeline-date">NOW</div>
                <h3 className="timeline-title">By The Horizons</h3>
                <p className="timeline-desc">Focused on boutique work for founders who care about the details. Interactive storytelling, 3D, and interfaces that hold up under scrutiny.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2026</div>
                <h3 className="timeline-title">Scale & automation</h3>
                <p className="timeline-desc">Shipped Cartve and the ACS Infotech platform — high-stakes systems where reliability is a feature, not an afterthought.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2025</div>
                <h3 className="timeline-title">Going independent</h3>
                <p className="timeline-desc">Left agency work to freelance full time. Refined a 3-day delivery workflow that still leaves room for craft.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023-24</div>
                <h3 className="timeline-title">First lines of code</h3>
                <p className="timeline-desc">Started building for friends and small shops on the web. Fell in love with the part where pixels become products.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Words Section */}
        <section className="words-section reveal-section" id="words" ref={addToRefs}>
          <div className="section-label">KIND WORDS</div>
          <h2 className="section-title serif">What clients have said.</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">Abhay delivered our entire infrastructure site ahead of schedule. The interactions feel hand-crafted — nothing about it screams template.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <span className="author-name">Founder</span>
                  <span className="author-company">Power Down Hosting</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">The fastest response time we've had from any developer. We sent feedback at midnight, woke up to a fix and a thoughtful note.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <span className="author-name">Director</span>
                  <span className="author-company">ACS Infotech</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">It's me Abhay, Cartve is not just any Other Project but a Revolution for Startup Owners for their Storefront.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <span className="author-name">Founder</span>
                  <span className="author-company">Cartve</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section reveal-section" id="contact" ref={addToRefs}>
          <div className="contact-label">GET IN TOUCH</div>
          <h2 className="contact-title serif">Got something <span className="serif-italic blue-text">worth building?</span></h2>
          <p className="contact-desc">Tell me what you're working on. Most projects land between $250 and $500 — and I'll be honest with you about scope before we start.</p>
          <a href="mailto:hey@abhayp.xyz" className="btn-contact">hey@abhayp.xyz →</a>
          
          <div className="social-links">
            <a href="https://www.instagram.com/webxabhay/" className="social-link">Instagram</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
            <a href="https://github.com/itsabh4y" className="social-link">Github</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
            <a href="mailto:hey@abhayp.xyz" className="social-link">Email</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer reveal-section" ref={addToRefs}>
          <div className="footer-logo">By the Horizons</div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/webxabhay/" className="footer-social-link" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://discord.com/users/1334928033848623246" className="footer-social-link" title="Discord"><i className="fa-brands fa-discord"></i></a>
            <a href="mailto:hey@abhayp.xyz" className="footer-social-link" title="Email"><i className="fa-regular fa-envelope"></i></a>
            <a href="https://github.com/itsabh4y" className="footer-social-link" title="Github"><i className="fa-brands fa-github"></i></a>
          </div>
          <div className="footer-rights">
            2026 ABHAY — ALL RIGHTS RESERVED <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span> <Link to="/sitemap" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Sitemap</Link>
          </div>
        </footer>
      </main>

      {/* Bottom Navigation — Desktop */}
      <nav className="bottom-nav">
        <ul id="nav-list">
          <li><a href="#home" onClick={(e) => scrollTo(e, 'home')} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} data-target="home">Home</a></li>    
          <li><a href="#work" onClick={(e) => scrollTo(e, 'work')} className={`nav-link ${activeSection === 'work' ? 'active' : ''}`} data-target="work">Work</a></li>
          <li><a href="#journey" onClick={(e) => scrollTo(e, 'journey')} className={`nav-link ${activeSection === 'journey' ? 'active' : ''}`} data-target="journey">Journey</a></li>
          <li><a href="#words" onClick={(e) => scrollTo(e, 'words')} className={`nav-link ${activeSection === 'words' ? 'active' : ''}`} data-target="words">Words</a></li>
          <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} data-target="contact">Contact</a></li>
          <li><a href="#hire" onClick={(e) => scrollTo(e, 'contact')} className="btn-hire">Hire me →</a></li>
        </ul>
      </nav>

      {/* Mobile Navigation Bar — Hamburger + Hire Me */}
      <nav className="mobile-nav-bar">
        <button
          className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
        <a href="#hire" onClick={(e) => scrollTo(e, 'contact')} className="mobile-hire-btn">Hire me →</a>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          <li><a href="#home" onClick={(e) => scrollTo(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
          <li><a href="#work" onClick={(e) => scrollTo(e, 'work')} className={activeSection === 'work' ? 'active' : ''}>Work</a></li>
          <li><a href="#journey" onClick={(e) => scrollTo(e, 'journey')} className={activeSection === 'journey' ? 'active' : ''}>Journey</a></li>
          <li><a href="#words" onClick={(e) => scrollTo(e, 'words')} className={activeSection === 'words' ? 'active' : ''}>Words</a></li>
          <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
        <a href="mailto:hey@abhayp.xyz" className="mobile-menu-email">hey@abhayp.xyz</a>
      </div>
    </div>
    </>
  );
}

export default App;
