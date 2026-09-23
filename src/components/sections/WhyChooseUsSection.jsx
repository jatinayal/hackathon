import React from 'react';
import interviewImg from '../../assets/images/sale_icon.jpg';

export const WhyChooseUsSection = () => {
  const weeklyData = [
    { day: 'Mon', height: '35%' },
    { day: 'Tue', height: '48%' },
    { day: 'Wed', height: '28%' },
    { day: 'Thu', height: '65%' },
    { day: 'Fri', height: '52%' },
    { day: 'Sat', height: '42%' },
    { day: 'Sun', height: '80%' }
  ];

  return (
    <section id="why-us" className="why-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Learn smarter with modern tools, guided mentors, and a platform built to help you grow
            your skills faster, setting a new benchmark for modern coding excellence.
          </p>
        </div>

        {/* 4 Bento Grid Cards */}
        <div className="why-grid">
          {/* Card 1: Interview Preparation */}
          <div className="why-card">
            <div>
              <h3 className="why-card-title">
                <span>Interview</span> Preparation
              </h3>
              <p className="why-card-desc">
                Learn faster with hands-on tracks and mentor feedback.
              </p>
            </div>

            <div className="interview-visual">
              <img
                src={interviewImg}
                alt="Interview Preparation"
                style={{
                  maxWidth: '220px',
                  objectFit: 'contain',
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              />
            </div>
          </div>

          {/* Card 2: AI Support */}
          <div className="why-card" style={{ alignItems: 'center', textAlign: 'center' }}>
            <h3 className="why-card-title">AI Support</h3>

            <div className="ai-visual">
              <div className="robot-container">
                <svg
                  width="180"
                  height="170"
                  viewBox="0 0 180 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Speech Bubble */}
                  <rect x="15" y="65" width="46" height="32" rx="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="28" cy="81" r="3" fill="#38bdf8" />
                  <circle cx="38" cy="81" r="3" fill="#38bdf8" />
                  <circle cx="48" cy="81" r="3" fill="#38bdf8" />

                  {/* Robot Head Antenna */}
                  <line x1="105" y1="20" x2="105" y2="40" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="105" cy="16" r="6" fill="#38bdf8" />

                  {/* Robot Head */}
                  <rect x="65" y="40" width="80" height="66" rx="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  {/* Screen Face */}
                  <rect x="75" y="50" width="60" height="46" rx="18" fill="#0f172a" />
                  {/* Cute Cyan Eyes */}
                  <path d="M86 68 Q92 62 98 68" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M112 68 Q118 62 124 68" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  {/* Smile */}
                  <path d="M100 82 Q105 88 110 82" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Robot Body */}
                  <path d="M75 110 Q105 105 135 110 L145 150 Q105 160 65 150 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="105" cy="132" r="8" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />

                  {/* Waving Arm */}
                  <path d="M142 118 Q165 110 162 90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Projects Based Learning */}
          <div className="why-card">
            <div>
              <h3 className="why-card-title">
                <span>Projects</span> Based Learning
              </h3>
            </div>

            <div className="projects-visual">
              <svg
                width="220"
                height="150"
                viewBox="0 0 220 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flowchart nodes */}
                <rect x="20" y="20" width="65" height="35" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="32" y="42" fill="#c7d2fe" fontSize="10" fontFamily="monospace">API</text>

                <path d="M85 37 L120 37" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />

                <polygon points="140,20 175,37 140,54 105,37" fill="#2e1065" stroke="#c084fc" strokeWidth="1.5" />

                <path d="M140 54 L140 85" stroke="#c084fc" strokeWidth="2" />

                <rect x="110" y="85" width="60" height="32" rx="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Robotic Touch Hand */}
                <path
                  d="M30 135 L60 90 L85 95 L95 105 L60 145 Z"
                  fill="#6b21a8"
                  fillOpacity="0.7"
                  stroke="#a855f7"
                  strokeWidth="2"
                />
                <circle cx="85" cy="95" r="4" fill="#a855f7" />
              </svg>
            </div>
          </div>

          {/* Card 4: Track Your Progress */}
          <div className="why-card progress-card">
            <div>
              <div className="progress-header">
                <div>
                  <h3 className="why-card-title">Track Your Progress</h3>
                  <div className="progress-tagline">Grow With Strike</div>
                </div>
                <div className="progress-badge">
                  <span className="live-dot" style={{ background: '#22c55e' }} />
                  <span>Live Progress Tracking</span>
                </div>
              </div>

              {/* Progress SVG Glowing Curve */}
              <div className="progress-chart-container">
                <svg
                  className="chart-svg"
                  viewBox="0 0 500 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Faded grid lines */}
                  <line x1="20" y1="20" x2="480" y2="20" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="20" y1="60" x2="480" y2="60" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="20" y1="100" x2="480" y2="100" stroke="#27272a" strokeDasharray="3 3" />

                  {/* Main Growing Trajectory */}
                  <path
                    d="M 30 100 Q 140 90, 240 60 T 470 20"
                    stroke="url(#curveGradient)"
                    strokeWidth="3.5"
                    fill="none"
                    filter="url(#glowEffect)"
                  />

                  {/* Data Points on curve */}
                  <circle cx="30" cy="100" r="5" fill="#4ade80" />
                  <circle cx="150" cy="85" r="5" fill="#4ade80" />
                  <circle cx="260" cy="55" r="5" fill="#4ade80" />
                  <circle cx="360" cy="38" r="5" fill="#4ade80" />
                  <circle cx="470" cy="20" r="7" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Activity Bars for each Day */}
                <div className="chart-bars">
                  {weeklyData.map((item) => (
                    <div key={item.day} className="chart-bar-col">
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ height: item.height }}
                        />
                      </div>
                      <span className="bar-day">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
