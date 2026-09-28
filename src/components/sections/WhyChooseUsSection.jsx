import React, { useEffect, useRef } from 'react';

function CardVideo({ src, label, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    let disposed = false;
    const removeRetry = () => {
      document.removeEventListener('pointerdown', play);
      document.removeEventListener('keydown', play);
    };
    const play = () => {
      if (disposed) return;
      video.play()?.then(removeRetry).catch(() => {
        // Some mobile/browser policies still reject muted autoplay. Keep the
        // loaded frame and retry on a user gesture without showing controls.
        if (disposed) return;
        document.addEventListener('pointerdown', play);
        document.addEventListener('keydown', play);
      });
    };
    video.muted = true;
    video.defaultMuted = true;
    play();
    return () => { disposed = true; removeRetry(); };
  }, [src]);

  return <video ref={ref} src={src} className={className} aria-label={label}
    autoPlay muted loop playsInline controls={false} preload="auto" />;
}

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
          <div className="why-card why-media-card">
            <div className="why-card-copy">
              <h3 className="why-card-title">
                <span>Interview</span> Preparation
              </h3>
              <p className="why-card-desc">
                Learn faster with hands-on tracks and mentor feedback.
              </p>
            </div>

            <div className="interview-visual">
              <img
                src="https://dolia18uq98lp.cloudfront.net/sale-icons/7ebc7314-dcfe-4e82-a2cb-677df6f9c57e.jpg"
                alt="Interview Preparation"
                className="why-interview-media"
              />
            </div>
          </div>

          {/* Card 2: AI Support */}
          <div className="why-card why-media-card" style={{ textAlign: 'center' }}>
            <div className="why-card-copy">
              <h3 className="why-card-title">AI Support</h3>
            </div>

            <div className="ai-visual">
              <CardVideo
                src="https://dolia18uq98lp.cloudfront.net/Videos/website_video.mp4"
                label="AI Support" className="why-ai-media"
              />
            </div>
          </div>

          {/* Card 3: Projects Based Learning */}
          <div className="why-card why-media-card">
            <div className="why-card-copy">
              <h3 className="why-card-title">
                <span>Projects</span> Based Learning
              </h3>
            </div>

            <div className="projects-visual">
              <CardVideo
                src="https://dolia18uq98lp.cloudfront.net/Videos/website_video2.mp4"
                label="Projects Based Learning" className="why-projects-media"
              />
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
