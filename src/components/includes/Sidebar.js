import { ChartBarIcon, ClipboardListIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { toAbsoluteUrl } from '../../helpers/Assets';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const USER = useSelector((state) => state.user);
  const [sidebarNavigation, setsidebarNavigation] = useState([]);

  const { path } = useRouteMatch();

  const isAdmin = ['masdeiri', 'oktriana', 'asrie', 'abdul.muchtar'];

  const privileges = async () => {
    return (await isAdmin.includes(USER?.profile?.username))
      ? setsidebarNavigation([
          { name: 'Dashboard', href: '/', icon: ChartBarIcon, current: true },
          {
            name: 'Unbill',
            href: '/unbill',
            icon: ClipboardListIcon,
            current: false,
          },
          {
            name: 'Piutang',
            href: '/piutang',
            icon: ClipboardListIcon,
            current: false,
          },
          {
            name: 'LOP',
            href: '/lop',
            icon: ClipboardListIcon,
            current: false,
          },
        ])
      : setsidebarNavigation([
          { name: 'Dashboard', href: '/', icon: ChartBarIcon, current: true },
          {
            name: 'Unbill',
            href: '/unbill',
            icon: ClipboardListIcon,
            current: false,
          },
        ]);
  };

  useEffect(() => {
    privileges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hidden w-0 lg:w-32 bg-white fixed h-screen overflow-y-auto md:block border-r-2 border-zinc-100">
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
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white font-medium',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs ',
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
