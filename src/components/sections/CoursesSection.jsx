import React from 'react';
import { coursesData } from '../../data/coursesData';
import { CourseCard } from '../ui/CourseCard';

export const CoursesSection = () => {
  return (
    <section id="courses" className="courses-section">
      {/* Background Ambient Glows */}
      <div className="courses-bg-glow-1" />
      <div className="courses-bg-glow-2" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            Explore our comprehensive courses designed to elevate your skills
          </p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
