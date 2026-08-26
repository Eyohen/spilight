import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */

const BrandLogo = ({ to = '/', className = '', markClassName = 'h-8 w-8', textClassName = 'text-lg font-semibold tracking-[-0.03em]' }) => {
  return (
    <Link to={to} className={`flex items-center gap-3 ${className}`} aria-label="Spilight home">
      <img src="/favicon.svg" alt="" className={markClassName} />
      <span className={textClassName}>spilight</span>
    </Link>
  );
};

export default BrandLogo;
