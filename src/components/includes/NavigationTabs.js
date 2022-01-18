import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavigationTabs({ tabs }) {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-8 lg:w-1/2 lg:mx-auto ">
      <div className="bg-zinc-200 p-2 rounded-lg lg:bg-transparent">
        <div className="group transition-all duration-300  border-gray-200">
          <motion.nav
            className={`flex lg:grid lg:grid-cols-${tabs.length} gap-4`}
            aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                exact={true}
                key={tab.name}
                to={tab.href}
                className={[
                  'transition-all duration-300 ease-in-out rounded-none rounded-t-md border-b-2 pb-2',
                  location.pathname === tab.href
                    ? 'text-blue-600 border-blue-600 font-semibold'
                    : 'text-zinc-600 border-zinc-200 font-medium',
                ].join(' ')}>
                {tab.name}
              </NavLink>
            ))}
          </motion.nav>
        </div>
      </div>
    </motion.div>
  );
}
