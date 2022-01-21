import { Menu, Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { imageApiAvatarUser } from '../../helpers/Assets';
import { convertDate } from '../../helpers/ConvertDate';
import { userLogout } from '../../redux/actions/user';

export default function Header({ setMobileMenuOpen }) {
  const USER = useSelector((state) => state.user);
  const handlerLogout = (event) => {
    event.preventDefault();
    userLogout()
      .then((res) => {
        swal('Yeay!', res.message, 'success');
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        swal('Oh No!', err.message, 'error');
      });
  };

  return (
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex justify-start items-center">
            <span className=" font-light text-zinc-500">
              {convertDate('tanggalHari')}
            </span>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button className="bg-white rounded-md flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-md"
                    src={imageApiAvatarUser(USER?.profile?.name)}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <button
                      onClick={handlerLogout}
                      className={
                        'block px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 w-full'
                      }>
                      Logout
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
