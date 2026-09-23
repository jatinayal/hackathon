import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={baseClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
