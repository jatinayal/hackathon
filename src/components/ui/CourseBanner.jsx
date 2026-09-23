import React from 'react';
import thunderImg from '../../assets/images/thunder.png';
import devopsImg from '../../assets/images/devops.png';
import courseImg from '../../assets/images/course.png';

export const CourseBanner = ({ courseId, image, title = 'Course Banner' }) => {
  let imgSrc = image;
  if (!imgSrc) {
    if (courseId === 'thunder-web') {
      imgSrc = thunderImg;
    } else if (courseId === 'devops') {
      imgSrc = devopsImg;
    } else {
      imgSrc = courseImg;
    }
  }

  return (
    <img
      src={imgSrc}
      alt={title}
      className="course-thumb-img"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
      }}
      loading="lazy"
    />
  );
};
