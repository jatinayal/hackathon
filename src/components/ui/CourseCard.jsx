import React, { useState } from 'react';
import { Clock, Star, BookOpen, Award, Users } from 'lucide-react';

/**
 * 3D Flip Course Card Component
 * - FRONT: Course image, live badge, overlaid title & badges, bottom metadata & "Explore Course →"
 * - BACK (Hover / Touch): 3D rotateY(180deg) upper flip revealing detailed course breakdown (title, subtitle, duration, level, hours)
 * - BOTTOM SYNCHRONIZATION: Smoothly glides down and fades out, bringing in "Read More →" with glowing accent line
 */
export const CourseCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flip on mobile / touch tap
  const handleCardClick = (e) => {
    // If user clicked the CTA link directly, let default link action occur
    if (e.target.closest('.course-explore-link')) {
      return;
    }
    // On touch devices without hover, toggle flip
    if (window.matchMedia('(hover: none)').matches) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`course-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${course.title} course details`}
    >
      {/* 3D Flip Upper Area */}
      <div className="course-flip-container">
        <div className="course-flip-flipper">

          {/* ============ FRONT FACE ============ */}
          <div className="course-flip-face course-flip-front">
            {/* Course Thumbnail Image */}
            <img
              src={course.image}
              alt={course.title}
              className="course-thumb-img"
              loading="lazy"
            />

            {/* Dark Vignette Overlay for Title Contrast */}
            <div className="course-front-vignette" />

            {/* Live Badge (Top-Left) */}
            {course.isLive && (
              <div className="course-badge-live">
                <span className="live-dot" />
                <span>LIVE</span>
              </div>
            )}

            {/* Front Overlaid Content: Title & Badges (Bottom-Left) */}
            <div className="course-front-overlay">
              <h3 className="course-front-title">{course.title}</h3>
              <div className="course-front-badges">
                {course.isPopular && (
                  <span className="badge-popular">
                    <Star size={11} fill="currentColor" />
                    POPULAR
                  </span>
                )}
                {course.hours && (
                  <span className="badge-hours">
                    <BookOpen size={11} />
                    {course.hours}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ============ BACK FACE (Flipped 180deg) ============ */}
          <div className="course-flip-face course-flip-back">
            {/* Live Badge (Top-Left) */}
            {course.isLive && (
              <div className="course-badge-live">
                <span className="live-dot" />
                <span>LIVE</span>
              </div>
            )}

            {/* Back Details Content */}
            <div className="course-back-content">
              <h3 className="course-back-title">{course.title}</h3>
              <p className="course-back-subtitle">{course.subtitle}</p>

              <div className="course-back-details-list">
                {course.duration && (
                  <div className="course-back-detail-item">
                    <Clock size={15} className="detail-icon" />
                    <span>{course.duration}</span>
                  </div>
                )}
                <div className="course-back-detail-item">
                  <Award size={15} className="detail-icon" />
                  <span>{course.level || 'Beginner to Advanced'}</span>
                </div>
                {course.hours && (
                  <div className="course-back-detail-item">
                    <BookOpen size={15} className="detail-icon" />
                    <span>{course.hours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle Divider at bottom of upper flip area */}
            <div className="course-back-bottom-line" />
          </div>

        </div>
      </div>

      {/* ============ BOTTOM CONTENT AREA ============ */}
      <div className="course-info-wrapper">
        
        {/* Default / Front Bottom Content Layer */}
        <div className="course-info-layer course-info-front">
          <p className="course-bottom-subtitle">{course.subtitle}</p>

          <div className="course-bottom-meta-pill">
            <Clock size={13} className="meta-icon" />
            <span>{course.duration}</span>
            <span className="meta-divider" />
            <Users size={13} className="meta-icon-users" />
          </div>

          <a href={course.link} className="course-explore-link">
            <span>Explore Course</span>
            <span className="arrow-char">→</span>
          </a>
        </div>

        {/* Hover / Back Bottom Content Layer */}
        <div className="course-info-layer course-info-back">
          <p className="course-bottom-subtitle">{course.subtitle}</p>

          <div className="course-bottom-meta-pill simple-duration">
            <Clock size={13} className="meta-icon" />
            <span>{course.duration}</span>
          </div>

          {/* Glowing subtle horizontal line */}
          <div className="course-hover-divider" />

          <a href={course.link} className="course-explore-link read-more-link">
            <span>Read More</span>
            <span className="arrow-char">→</span>
          </a>
        </div>

      </div>
    </div>
  );
};
