import { ChartBarIcon, ClipboardListIcon } from '@heroicons/react/solid';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { toAbsoluteUrl } from '../../helpers/Assets';

const sidebarNavigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon, current: true },
  {
    name: 'List Unbill',
    href: '/list-unbill',
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: 'List Piutang',
    href: '/list-piutang',
    icon: ClipboardListIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const { path } = useRouteMatch();

  return (
    <div className="hidden w-32 bg-white fixed h-screen overflow-y-auto md:block border-r-2 border-zinc-100">
      <div className="w-full py-6 flex flex-col items-center">
        <div className="flex-shrink-0 flex items-center">
          <img
            className="h-8 w-auto"
            src={toAbsoluteUrl('/assets/images/pins.png')}
            alt="Workflow"
          />
        </div>
        <div className="flex-1 mt-6 w-full px-2 space-y-1">
          {sidebarNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={classNames(
                path === item.href
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium',
              )}
              aria-current={path === item.href ? 'page' : undefined}>
              <item.icon
                className={classNames(
                  path === item.href
                    ? 'text-white'
                    : 'text-zinc-400 group-hover:text-white',
                  'h-6 w-6',
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
