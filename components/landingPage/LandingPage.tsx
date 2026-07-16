'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('Doctor');

  const faqs = [
    {
      q: 'Can I consult a doctor online?',
      a: 'Yes. Most specialties on MediSlotBook offer secure video consultations — search by specialty, pick an open slot, and join from your browser at the scheduled time.'
    },
    {
      q: 'Can I reschedule or cancel my appointment?',
      a: 'Appointments can be rescheduled or cancelled from your account up to two hours before the visit, free of charge.'
    },
    {
      q: 'What should I prepare before a video consultation?',
      a: 'Have a list of current medications, recent symptoms, and any relevant test results on hand, along with a stable internet connection.'
    },
    {
      q: 'How do I find a doctor on this platform?',
      a: 'Use the search bar to filter by specialty, city, and preferred date and time — results are ranked by rating and next availability.'
    }
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const doctors = [
    {
      name: 'Dr. Jekri Wilson',
      spec: 'Cardiology, Internal Medicine',
      loc: '79 King Street, Aberdeen',
      rating: '4.9',
      color: '#1F4D3F',
      initials: 'JW',
      image: 'https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Dr. Harrison Wood',
      spec: 'Dentistry, Endodontics',
      loc: '75 3rd Ave, California',
      rating: '4.8',
      color: '#C68A24',
      initials: 'HW',
      image: 'https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.jpg?s=2048x2048&w=is&k=20&c=BLoZsEopjCiEvwmyyy7LZqrRkrB7nvvhwzJsN5bZc9Y=',
    },
    {
      name: 'Dr. William Smith',
      spec: 'Primary Care',
      loc: '75 3rd Ave, Florida',
      rating: '4.9',
      color: '#3d554d',
      initials: 'WS',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Dr. Denish Smith',
      spec: 'Colonoscopy Screening',
      loc: '75 3rd Ave, Texas',
      rating: '4.7',
      color: '#2a5f4e',
      initials: 'DS',
      image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --ink: #132621;
          --ink-soft: #3d554d;
          --paper: #F5F3EC;
          --paper-raised: #FFFFFF;
          --pine: #1F4D3F;
          --pine-deep: #123329;
          --sage: #C6D5BE;
          --sage-soft: #E6EBDE;
          --amber: #E2A63B;
          --amber-deep: #C68A24;
          --line: #DCD5C4;
          --radius: 18px;
          --shadow: 0 20px 50px -25px rgba(19, 38, 33, 0.35);
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          line-height: 1.55;
        }
        h1, h2, h3, h4 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 500;
          margin: 0 0 0.4em 0;
          color: var(--pine-deep);
          letter-spacing: -0.01em;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 12.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--amber-deep);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          font-weight: 700;
        }
        .eyebrow::before {
          content: '';
          width: 22px;
          height: 2px;
          background: var(--amber-deep);
          display: inline-block;
        }
        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 28px;
        }
        section {
          padding: 96px 0;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 26px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease;
          white-space: nowrap;
        }
        .btn-primary {
          background: var(--pine);
          color: #fff;
        }
        .btn-primary:hover {
          background: var(--pine-deep);
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .btn-amber {
          background: var(--amber);
          color: var(--pine-deep);
        }
        .btn-amber:hover {
          background: var(--amber-deep);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .btn-ghost {
          background: transparent;
          border-color: var(--pine);
          color: var(--pine);
        }
        .btn-ghost:hover {
          background: var(--pine);
          color: #fff;
        }
        .btn-sm {
          padding: 10px 18px;
          font-size: 13.5px;
        }
        .sec-head {
          max-width: 640px;
          margin-bottom: 52px;
        }
        .sec-head.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
        .sec-head h2 {
          font-size: clamp(28px, 3vw, 40px);
        }
        .sec-head p {
          color: var(--ink-soft);
          font-size: 16px;
        }
        .sec-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }
        .doctor-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0;
        }
        .doctor-image-container {
          aspect-ratio: 1/0.95;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Georgia, serif';
          font-size: 44px;
          color: #fff;
          font-weight: 500;
          overflow: hidden;
          position: relative;
        }
        .doctor-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .doctor-image-container .fallback {
          position: absolute;
          font-size: 44px;
          font-weight: 500;
          font-family: 'Georgia, serif';
        }
        .hero-visual-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }
        .why-visual-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 24px;
        }
        .why-visual-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/3.2;
          background: var(--sage-soft);
        }
        .telehealth-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .telehealth-container {
          background: var(--pine-deep);
          border-radius: 20px;
          padding: 14px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        @media (max-width: 980px) {
          section { padding: 64px 0; }
          .nav-links { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .search-fields { grid-template-columns: 1fr 1fr !important; }
          .specialty-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .doctor-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .video-cta { grid-template-columns: 1fr !important; padding: 44px 28px !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .foot-grid { grid-template-columns: 1fr 1fr !important; }
          .steps { padding: 50px 28px !important; }
        }
        @media (max-width: 560px) {
          .search-fields { grid-template-columns: 1fr !important; }
          .foot-grid { grid-template-columns: 1fr !important; }
          .newsletter { padding: 36px 24px !important; }
          .nl-form { min-width: 0 !important; width: 100% !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(245,243,236,0.88)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 28px',
          maxWidth: '1180px',
          margin: '0 auto',
        }}>
          <a href="#top" style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            fontSize: 24,
            color: 'var(--pine-deep)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
              <path d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z" stroke="#1F4D3F" strokeWidth="1.6" />
              <path d="M4 12h3l2-4 3 8 2-5h6" stroke="#E2A63B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            MediSlotBook
          </a>
          <nav className="nav-links" style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
            <Link href="#specialties" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>Specialties</Link>
            <Link href="#how" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>How it works</Link>
            <Link href="#doctors" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>Doctors</Link>
            <Link href="#pricing" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>Pricing</Link>
            <Link href="#faq" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>FAQ</Link>
            <Link href="#blog" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink-soft)' }}>Journal</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Link href="/auth/login" style={{ fontSize: 14, fontWeight: 600, color: 'var(--pine-deep)' }}>Log in</Link>
            <Link href="/auth/login" className="btn btn-primary btn-sm">Book a visit</Link>
          </div>
        </div>
      </header>

      {/* HERO WITH DOCTOR IMAGE */}
      <section className="hero" style={{ position: 'relative', padding: '88px 0 60px', overflow: 'hidden' }}>
        <svg className="pulse-track" viewBox="0 0 1180 80" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 80, opacity: 0.5, pointerEvents: 'none' }}>
          <polyline points="0,40 180,40 210,10 240,70 270,40 420,40 450,20 480,60 510,40 1180,40" fill="none" stroke="#C6D5BE" strokeWidth="2" />
        </svg>
        <div className="wrap">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <div className="eyebrow">Telehealth &amp; in-person care</div>
              <h1 style={{ fontSize: 'clamp(38px, 4.6vw, 62px)', lineHeight: 1.04, color: 'var(--pine-deep)' }}>
                Find the right doctor,<br /><em style={{ fontStyle: 'italic', color: 'var(--amber-deep)' }}>right now.</em>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 460, marginBottom: 28 }}>
                MediSlotBook connects you to licensed clinicians for video visits or nearby appointments — searchable by specialty, availability, and city, in under two minutes.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 34 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--ink-soft)' }}>
                  <div style={{ display: 'flex' }}>
                    {['JW', 'HW', 'WS', 'DS'].map((init, i) => (
                      <span key={i} style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        border: '2px solid var(--paper)',
                        background: 'var(--sage)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Courier New, monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--pine-deep)',
                        marginLeft: i === 0 ? 0 : -10,
                      }}>{init}</span>
                    ))}
                  </div>
                  <div><span style={{ color: 'var(--amber-deep)', letterSpacing: 1 }}>★★★★★</span> 4.9 from 30k+ visits</div>
                </div>
              </div>
            </div>
            <div style={{
              position: 'relative',
              aspectRatio: '1/1.05',
              borderRadius: 28,
              background: 'linear-gradient(160deg, var(--pine) 0%, var(--pine-deep) 100%)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor caring for patient"
                className="hero-visual-image"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.75,
                  zIndex: 1,
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
           
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(19,38,33,0.6), transparent)',
                zIndex: 1,
              }} />
              <div style={{
                position: 'absolute',
                bottom: 22,
                left: 22,
                right: 22,
                background: 'rgba(255,255,255,0.94)',
                borderRadius: 14,
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 12px 30px -12px rgba(0,0,0,0.4)',
                zIndex: 2,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fae6b', boxShadow: '0 0 0 4px rgba(63,174,107,0.18)' }}></span>
                <div>
                  <strong style={{ fontSize: 14.5, color: 'var(--pine-deep)' }}>Dr. avail. in 8 min</strong>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-soft)' }}>Next open video slot near you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div id="search" style={{
            background: 'var(--paper-raised)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            padding: 8,
            marginTop: -30,
            position: 'relative',
            zIndex: 3,
          }}>
            <div style={{ display: 'flex', gap: 4, padding: '10px 10px 4px' }}>
              {['Doctor', 'Hospital', 'Clinic'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    border: 'none',
                    background: tab === activeTab ? 'var(--sage-soft)' : 'none',
                    padding: '10px 18px',
                    borderRadius: 10,
                    fontFamily: 'Courier New, monospace',
                    fontSize: 12.5,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                    color: tab === activeTab ? 'var(--pine-deep)' : 'var(--ink-soft)',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr auto', gap: 2, padding: 6, alignItems: 'end' }}>
              {[
                { label: 'Specialization', type: 'select', options: ['Select specialization', 'Cardiology', 'Dermatology', 'Dentistry', 'Orthopedic Surgery', 'Obstetrics & Gynecology', 'Primary Care'] },
                { label: 'Date / Time', type: 'input', placeholder: 'Choose date & time' },
                { label: 'City', type: 'input', placeholder: 'Enter your city' },
              ].map((field, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 12 }}>
                  <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 5 }}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select style={{ border: 'none', background: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: 'var(--ink)', width: '100%', padding: 0, fontWeight: 600 }}>
                      {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input type="text" placeholder={field.placeholder} readOnly={field.label === 'Date / Time'} style={{ border: 'none', background: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: 'var(--ink)', width: '100%', padding: 0, fontWeight: 600 }} />
                  )}
                </div>
              ))}
              <button className="btn btn-primary" style={{ padding: '16px 24px' }}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="specialties">
        <div className="wrap">
          <div className="sec-top">
            <div className="sec-head">
              <div className="eyebrow">Select a category</div>
              <h2>Top searched health specialties</h2>
              <p>The specialties patients rely on most — browse by care type to see verified clinicians near you.</p>
            </div>
            <Link className="btn btn-ghost btn-sm" href="/auth/login">Browse all specialties</Link>
          </div>
          <div className="specialty-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Cardiology', count: 18, icon: 'M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z' },
              { name: 'Dentistry', count: 26, icon: 'M8 3l2 4M16 3l-2 4 M6 8c0 6 2 8 6 8s6-2 6-8 M6 17a3 3 0 106 0 M18 17a3 3 0 106 0' },
              { name: 'Pediatrics', count: 14, icon: 'M12 12a9 9 0 109 9 M9 10h.01M15 10h.01 M8 15c1.2 1 2.6 1.5 4 1.5s2.8-.5 4-1.5' },
              { name: 'Orthopedics', count: 9, icon: 'M6 4v6a6 6 0 0012 0V4 M4 4h4M16 4h4M12 16v5M9 21h6' },
              { name: 'Laboratory', count: 21, icon: 'M12 3v6M9 6h6M7 12h10l1 8H6l1-8z' },
              { name: 'Obstetrics & Gynecology', count: 12, icon: 'M12 8a4 4 0 100 8 4 4 0 000-8z M4 21c0-4 4-6 8-6s8 2 8 6' },
              { name: 'Mental Health', count: 17, icon: 'M12 2a5 5 0 015 5c0 3-2 4-2 7h-6c0-3-2-4-2-7a5 5 0 015-5z M9 19h6M10 22h4' },
              { name: 'Primary Care', count: 33, icon: 'M4 4h16v16H4z M12 8v8M8 12h8' },
            ].map((spec, i) => (
              <div key={i} style={{
                background: 'var(--paper-raised)',
                border: '1px solid var(--line)',
                borderRadius: 16,
                padding: 26,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--sage-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: 'var(--pine)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={spec.icon} />
                  </svg>
                </div>
                <h4 style={{ fontSize: 18, marginBottom: 4 }}>{spec.name}</h4>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontFamily: 'Courier New, monospace' }}>{spec.count} listings</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="wrap">
          <div className="steps" style={{
            background: 'var(--pine-deep)',
            color: '#F5F3EC',
            borderRadius: 28,
            padding: '70px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="sec-head">
              <div className="eyebrow" style={{ color: 'var(--amber)' }}>How a visit works</div>
              <h2 style={{ color: '#F5F3EC' }}>Three steps between you and care</h2>
              <p style={{ color: '#c7d6cd', fontSize: 16 }}>The same path every time, whether it's a video consult tonight or a specialist visit next week.</p>
            </div>
            <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, position: 'relative', zIndex: 2 }}>
              {[
                { num: '01', title: "Find the right doctor for your symptoms.", desc: "Select a specialty and book an available slot that suits you." },
                { num: '02', title: 'Book an available slot', desc: "Compare ratings, languages, and next-available slots, then lock in a time that works for you." },
                { num: '03', title: 'Meet by video or in person', desc: "Join a secure video room from any device, or get directions if you'd rather visit the clinic." },
              ].map((step, i) => (
                <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 22 }}>
                  <span style={{ fontFamily: 'Courier New, monospace', color: 'var(--amber)', fontSize: 14, marginBottom: 14, display: 'block' }}>{step.num}</span>
                  <h3 style={{ color: '#fff', fontSize: 21 }}>{step.title}</h3>
                  <p style={{ color: '#c7d6cd', fontSize: 15 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 18,
            overflow: 'hidden',
            marginTop: 20,
          }}>
            {[
              { value: '13', label: 'Hospitals' },
              { value: '520', label: 'Clinicians' },
              { value: '24K', label: 'Patients served' },
              { value: '98%', label: 'Would return' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'var(--paper-raised)', padding: '34px 24px', textAlign: 'center' }}>
                <strong style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: 'var(--pine-deep)', display: 'block' }}>{stat.value}</strong>
                <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', fontFamily: 'Courier New, monospace', textTransform: 'uppercase', letterSpacing: '.06em' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Why MediSlotBook</div>
            <h2>Care built around your calendar, not a waiting room</h2>
          </div>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginTop: 60 }}>
            <div className="why-visual-container">
              <img
                src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor consulting with patient"
                className="why-visual-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallbackSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    fallbackSVG.setAttribute('viewBox', '0 0 480 384');
                    fallbackSVG.setAttribute('preserveAspectRatio', 'xMidYMid slice');
                    fallbackSVG.style.width = '100%';
                    fallbackSVG.style.height = '100%';
                    fallbackSVG.innerHTML = `
                      <rect width="480" height="384" fill="#E6EBDE" />
                      <circle cx="120" cy="90" r="70" fill="#C6D5BE" />
                      <rect x="60" y="150" width="120" height="160" rx="40" fill="#C6D5BE" />
                      <circle cx="340" cy="230" r="90" fill="#1F4D3F" opacity="0.9" />
                      <polyline points="270,230 310,230 322,205 340,255 358,230 410,230" fill="none" stroke="#E2A63B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    `;
                    parent.appendChild(fallbackSVG);
                  }
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {[
                { icon: 'M12 12a9 9 0 109 9 M12 7v5l3 3', title: 'Available around the clock', desc: 'Book a private appointment online any hour, any day — no phone tag required.' },
                { icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z', title: 'Fast, without cutting corners', desc: 'Skip long queues and fully booked practices — most visits are matched within minutes.' },
                { icon: 'M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z', title: 'Licensed & verified only', desc: 'Every clinician on MediSlotBook is credential-checked before they ever see a patient.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 18 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--pine)', color: '#fff', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d={item.icon} /></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 17, marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors">
        <div className="wrap">
          <div className="sec-top">
            <div className="sec-head">
              <div className="eyebrow">Top rated doctors</div>
              <h2>Searched top doctors</h2>
              <p>Browse profiles, check reviews, and book with confidence.</p>
            </div>
            <Link className="btn btn-ghost btn-sm" href="/auth/login">See all doctors</Link>
          </div>
          <div className="doctor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
            {doctors.map((doc, i) => (
              <div key={i} style={{
                background: 'var(--paper-raised)',
                border: '1px solid var(--line)',
                borderRadius: 18,
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="doctor-image-container" style={{ background: doc.color }}>
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="doctor-photo-img"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'fallback';
                        fallback.textContent = doc.initials;
                        fallback.style.color = '#fff';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div style={{ padding: '18px 18px 22px' }}>
                  <h4 style={{ fontSize: 16.5, marginBottom: 2 }}>{doc.name}</h4>
                  <div style={{ fontSize: 13, color: 'var(--amber-deep)', fontWeight: 600, marginBottom: 10 }}>{doc.spec}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 12 }}>📍 {doc.loc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                    <span style={{ color: 'var(--amber-deep)', letterSpacing: 1, fontSize: 13 }}>★★★★★</span>
                    <span style={{ fontWeight: 600 }}>{doc.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="wrap">
          <div className="sec-head center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Patient stories</div>
            <h2>What people say after their visit</h2>
          </div>
          <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {[
              { quote: 'The video call felt just like an in-office visit — the doctor was thorough, and my prescription was ready within the hour.', name: 'Lussa Wood', role: 'Periodontology patient', initials: 'LW' },
              { quote: "Booking took under two minutes and I could actually see the doctor's reviews before choosing. That mattered a lot to me.", name: 'Renee Marsh', role: 'Primary care patient', initials: 'RM' },
              { quote: 'I rescheduled twice without any hassle, and the reminders meant I never missed a follow-up. Simple and dependable.', name: 'Aiden Kerr', role: 'Orthopedic patient', initials: 'AK' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'var(--paper-raised)', border: '1px solid var(--line)', borderRadius: 18, padding: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ color: 'var(--amber-deep)', letterSpacing: 1, fontSize: 14 }}>★★★★★</span>
                <p style={{ fontSize: 15, color: 'var(--ink-soft)', flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sage)', color: 'var(--pine-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: 13 }}>{t.initials}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14 }}>{t.name}</strong>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TELEHEALTH CTA - WITH REAL IMAGE */}
      <section>
        <div className="wrap">
          <div className="video-cta" style={{ background: 'var(--sage-soft)', borderRadius: 28, padding: '70px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Telehealth</div>
              <h2>Integrated video calls, built for care</h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>Wherever your patients are, they get high-quality video calling — no downloads, no waiting rooms, no dropped connections.</p>
              <div style={{ display: 'flex', gap: 34, marginTop: 30, alignItems: 'center', flexWrap: 'wrap', opacity: 0.75 }}>
                {['HIPAA compliant', '256-bit encryption', '99.9% uptime'].map((tag) => (
                  <span key={tag} style={{ fontFamily: 'Courier New, monospace', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', border: '1px solid var(--line)', padding: '8px 14px', borderRadius: 8 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="telehealth-container">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Video consultation with doctor"
                className="telehealth-image"
                onError={(e) => {
                  // Fallback to a simpler image if the main one fails
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="sec-head center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Your questions answered</div>
            <h2>Frequently asked questions</h2>
            <p>Everything you need to know before your first visit.</p>
          </div>
          <div className="faq-list" style={{ maxWidth: 820, margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '24px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                    fontFamily: 'Georgia, serif',
                    fontSize: 19,
                    color: 'var(--pine-deep)',
                  }}
                >
                  <span>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: 13, color: 'var(--amber-deep)', marginRight: 14 }}>{String(index + 1).padStart(2, '0')}.</span>
                    {faq.q}
                  </span>
                  <span style={{ fontSize: 22, color: 'var(--pine)', transition: 'transform 0.25s ease', flex: 'none', transform: faqOpen === index ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                <div style={{
                  maxHeight: faqOpen === index ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{ padding: '0 4px 24px 44px', color: 'var(--ink-soft)', fontSize: 15, maxWidth: 640 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="wrap">
          <div className="sec-head center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>For clinics &amp; practices</div>
            <h2>Affordable plans for every practice size</h2>
            <p>Straightforward pricing, no setup fees — cancel any time.</p>
          </div>
          <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { tier: 'Basic', name: 'Solo practice', price: '$29', features: ['Image gallery', 'Appointment booking', '1 branch location', 'Email support'] },
              { tier: 'Standard', name: 'Growing clinic', price: '$59', features: ['Everything in Basic', 'Video gallery', 'Team management', 'Up to 5 branches', 'Priority support'], featured: true },
              { tier: 'Premium', name: 'Hospital network', price: '$99', features: ['Everything in Standard', 'Unlimited branches', 'Custom invoicing', 'Dedicated account manager'] },
            ].map((plan, i) => (
              <div key={i} style={{
                border: '1px solid var(--line)',
                borderRadius: 20,
                padding: 34,
                background: plan.featured ? 'var(--pine-deep)' : 'var(--paper-raised)',
                color: plan.featured ? '#fff' : 'inherit',
                transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
                boxShadow: plan.featured ? 'var(--shadow)' : 'none',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: plan.featured ? 'var(--amber)' : 'var(--amber-deep)', marginBottom: 10 }}>{plan.tier}</span>
                <h3 style={{ color: plan.featured ? '#fff' : 'var(--pine-deep)' }}>{plan.name}</h3>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, color: plan.featured ? '#fff' : 'var(--pine-deep)', margin: '6px 0 0' }}>
                  {plan.price}<sup style={{ fontSize: 18, top: -18, position: 'relative' }}>/mo</sup>
                </div>
                <span style={{ fontSize: 13, color: plan.featured ? '#c7d6cd' : 'var(--ink-soft)', marginBottom: 24, display: 'block' }}>Billed annually</span>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {plan.features.map((feature, fi) => (
                    <li key={fi} style={{ fontSize: 14.5, display: 'flex', gap: 10, alignItems: 'center', color: plan.featured ? '#c7d6cd' : 'inherit' }}>
                      <span style={{ color: plan.featured ? 'var(--amber)' : 'var(--amber-deep)', fontWeight: 700 }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <a className={`btn ${plan.featured ? 'btn-amber' : 'btn-ghost'}`} href="#">Subscribe now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog">
        <div className="wrap">
          <div className="sec-top">
            <div className="sec-head">
              <div className="eyebrow">Read articles</div>
              <h2>Latest from the journal</h2>
            </div>
            <a className="btn btn-ghost btn-sm" href="#">Explore more articles</a>
          </div>
          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { date: '17 Oct, 2025', title: 'The hidden ways stress affects your dental health', excerpt: "Chronic stress shows up in the mouth long before anywhere else — here's what to watch for.", views: 89, bg: '#C6D5BE' },
              { date: '16 Oct, 2025', title: 'Build strong immunity naturally: proven tips', excerpt: 'Small, consistent habits do more for your immune system than any single supplement.', views: 114, bg: '#E2A63B' },
              { date: '16 Oct, 2025', title: 'What to expect at your first cardiology visit', excerpt: 'A walkthrough of the tests, questions, and paperwork so nothing catches you off guard.', views: 64, bg: '#2a5f4e' },
            ].map((post, i) => (
              <div key={i} style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--paper-raised)' }}>
                <div style={{ aspectRatio: '16/10', background: post.bg }}>
                  <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
  <rect width="400" height="250" fill={post.bg} />
  {i === 0 && (
    <image 
      href="https://aonetheme.com/carelystwp/wp-content/uploads/2025/10/12.png" 
      x="0" y="0" 
      width="400" height="250" 
      preserveAspectRatio="xMidYMid slice" 
    />
  )}
  {i === 1 && (
    <image 
      href="https://aonetheme.com/carelystwp/wp-content/uploads/2025/10/9-840x550.jpg" 
      x="0" y="0" 
      width="400" height="250" 
      preserveAspectRatio="xMidYMid slice" 
    />
  )}
  {i === 2 && (
    <image 
      href="https://aonetheme.com/carelystwp/wp-content/uploads/2025/10/7-840x550.jpg" 
      x="0" y="0" 
      width="400" height="250" 
      preserveAspectRatio="xMidYMid slice" 
    />
  )}
</svg>
                </div>
                <div style={{ padding: 22 }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: 11.5, color: 'var(--amber-deep)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10, display: 'block' }}>{post.date}</span>
                  <h4 style={{ fontSize: 18, marginBottom: 10 }}>{post.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 14 }}>{post.excerpt}</p>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                    <span>By Admin</span>
                    <span>{post.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="newsletter" style={{ background: 'var(--pine)', borderRadius: 28, padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap', color: '#fff' }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: 28, maxWidth: 420 }}>Get health tips in your inbox</h3>
              <p style={{ color: '#cfe0d6', marginTop: 8 }}>One short email a month — no spam, unsubscribe any time.</p>
            </div>
            <form className="nl-form" style={{ display: 'flex', gap: 10, background: '#fff', padding: 6, borderRadius: 999, minWidth: 360 }} onSubmit={(e) => { e.preventDefault(); e.currentTarget.querySelector('input')!.value = 'Subscribed ✓'; }}>
              <input type="email" placeholder="you@example.com" required style={{ border: 'none', outline: 'none', flex: 1, padding: '10px 16px', fontFamily: 'Inter, sans-serif', fontSize: 14.5 }} />
              <button className="btn btn-amber btn-sm" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--pine-deep)', color: '#cfe0d6', padding: '80px 0 30px', marginTop: 96 }}>
        <div className="wrap">
          <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 40, marginBottom: 60 }}>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z" stroke="#fff" strokeWidth="1.6" /></svg>
                MediSlotBook
              </div>
              <p style={{ fontSize: 14, color: '#a9c2b6', maxWidth: 280 }}>13–15 Bouverie Street, 2nd Floor, London. Care@mediSlotBookhealth.com · +1 (708) 450-4554</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                {['f', 'x', 'i'].map((social) => (
                  <a key={social} href="#" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #2c5346', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a9c2b6' }}>{social}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Company', links: ['Pricing', 'About us', 'Case gallery', 'Privacy policy'] },
              { title: 'Listing', links: ['Doctors', 'Medical genetics', 'Nursing', 'Primary care'] },
            ].map((col, i) => (
              <div key={i}>
                <h5 style={{ fontFamily: 'Courier New, monospace', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', marginBottom: 18 }}>{col.title}</h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((link) => (
                    <li key={link}><a href="#" style={{ fontSize: 14, color: '#a9c2b6' }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h5 style={{ fontFamily: 'Courier New, monospace', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', marginBottom: 18 }}>Newsletter</h5>
              <p style={{ fontSize: 14, color: '#a9c2b6' }}>Sign up for our monthly digest of health tips and platform updates.</p>
            </div>
          </div>
          <div className="foot-bottom" style={{ borderTop: '1px solid #2c5346', paddingTop: 26, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8fac9e', flexWrap: 'wrap', gap: 12 }}>
            <span>© 2026 MediSlotBook. All rights reserved.</span>
            <div>
              {['Terms', 'Cookies', 'Privacy'].map((link) => (
                <a key={link} href="#" style={{ color: '#8fac9e', marginLeft: 20 }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}