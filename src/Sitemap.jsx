import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sitemap() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-container">
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
      <main className="main-content" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        {/* Top Right Bar */}
        <header className="top-bar">
          <div className="status-badge">
            <span className="status-dot"></span>
            Available for Work
          </div>
          <div className="time-badge">
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Back to Home</Link>
          </div>
        </header>

        <section className="reveal-section reveal-visible" style={{ padding: '120px 80px 80px 80px' }}>
          <div className="section-label">NAVIGATION</div>
          <h1 className="section-title serif">HTML <span className="serif-italic blue-text">Sitemap.</span></h1>
          <p className="section-desc" style={{ marginBottom: '60px' }}>Overview of the website structure and featured projects.</p>
          
          <div className="sitemap-list" style={{ fontSize: '18px', lineHeight: '2.5' }}>
            <div style={{ marginBottom: '24px' }}>
              <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: '8px' }}>Home</Link>
              <ul style={{ listStyleType: 'none', paddingLeft: '24px', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                <li>
                  <Link to="/#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Selected Work</Link>
                  <ul style={{ listStyleType: 'none', paddingLeft: '24px', fontSize: '15px', marginTop: '8px', marginBottom: '8px' }}>
                    <li style={{ position: 'relative' }}><span className="blue-dot" style={{ position: 'absolute', left: '-16px', top: '15px' }}></span><Link to="/#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Power Down Hosting - Cloud Infrastructure & VPS</Link></li>
                    <li style={{ position: 'relative' }}><span className="blue-dot" style={{ position: 'absolute', left: '-16px', top: '15px' }}></span><Link to="/#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>ACS Infotech - Cloud Hosting, Nepal</Link></li>
                    <li style={{ position: 'relative' }}><span className="blue-dot" style={{ position: 'absolute', left: '-16px', top: '15px' }}></span><Link to="/#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cartve - Startup E-Commerce Platform</Link></li>
                  </ul>
                </li>
                <li><Link to="/#journey" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>My Journey</Link></li>
                <li><Link to="/#words" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Testimonials</Link></li>
                <li><Link to="/#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Me</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer reveal-section reveal-visible">
          <div className="footer-logo">By the Horizons</div>
          <div className="footer-socials">
            <a href="#" className="footer-social-link" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="footer-social-link" title="Discord"><i className="fa-brands fa-discord"></i></a>
            <a href="#" className="footer-social-link" title="Email"><i className="fa-regular fa-envelope"></i></a>
            <a href="#" className="footer-social-link" title="Behance"><i className="fa-brands fa-behance"></i></a>
            <a href="#" className="footer-social-link" title="Github"><i className="fa-brands fa-github"></i></a>
          </div>
          <div className="footer-rights">
            2026 ABHAY — ALL RIGHTS RESERVED <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span> <Link to="/sitemap" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Sitemap</Link>
          </div>
        </footer>
      </main>

      <nav className="bottom-nav">
        <ul id="nav-list">
          <li><Link to="/" className="nav-link" data-target="home">Back to Home</Link></li>
          <li><Link to="/sitemap" className="nav-link active">Sitemap</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sitemap;
