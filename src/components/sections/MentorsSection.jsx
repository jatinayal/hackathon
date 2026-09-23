import React from 'react';
import { mentorsData } from '../../data/mentorsData';
import rohitImg from '../../assets/images/rohit_negi.jpg';
import adityaImg from '../../assets/images/aditya_tandon.jpg';

export const MentorsSection = () => {
  return (
    <section id="mentors" className="mentors-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Meet With Our Mentors</h2>
        </div>

        {/* Mentors Grid */}
        <div className="mentors-grid">
          {mentorsData.map((mentor) => {
            const imgSrc = mentor.id === 'rohit-negi' ? rohitImg : adityaImg;
            return (
              <div key={mentor.id} className="mentor-card">
                {/* Avatar */}
                <div
                  className={`mentor-avatar-wrapper ${
                    mentor.id === 'rohit-negi'
                      ? 'mentor-avatar-rohit'
                      : 'mentor-avatar-aditya'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={mentor.name}
                    className="mentor-img"
                    loading="lazy"
                  />
                </div>

                {/* Identity */}
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-role">{mentor.role}</p>

                {/* Tags */}
                <div className="mentor-tags">
                  <span className="mentor-tag">{mentor.company}</span>
                  <span className="mentor-tag">{mentor.education}</span>
                  <span className="mentor-tag">{mentor.package}</span>
                  <span className="mentor-tag">{mentor.expertise}</span>
                </div>

                {/* Bio */}
                <p className="mentor-bio">{mentor.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
