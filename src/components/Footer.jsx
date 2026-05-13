import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const quickLinks = [
  { name: 'Platform', to: '/platform' },
  { name: 'Workflow', to: '/workflow' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Early access', to: '/waitlist' },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <BrandLogo textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/46">
              Minimal cloud hosting for teams shipping production apps, workers, and databases.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold text-white">Product</h4>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-white/46 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="mailto:hello@spilight.cloud" className="text-sm text-white/46 transition-colors hover:text-white">Contact</a></li>
                <li><Link to="/waitlist" className="text-sm text-white/46 transition-colors hover:text-white">Beta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Status</h4>
              <p className="mt-4 text-sm text-white/46">Private beta</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>&copy; 2026 Spilight. All rights reserved.</p>
          <Link to="/privacy" className="transition-colors hover:text-white">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
