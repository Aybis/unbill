import { useState } from 'react';
import { Header, MobileMenu, Sidebar } from '.';

export default function Layout({ children, titlePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex">
      {/* Narrow sidebar */}
      <Sidebar />
      {/* Mobile menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* Content area */}
      <div className="ml-0 lg:ml-32 flex-1 flex flex-col overflow-hidden bg-zinc-100">
        <Header setMobileMenuOpen={setMobileMenuOpen} />
        {/* Main content */}
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
              <h1 id="primary-heading" className="sr-only">
                Content
              </h1>
              {/* Your content */}

              <div className="relative lg:p-8 p-4">
                <h1 className="text-2xl text-zinc-800 font-semibold capitalize">
                  {titlePage}
                </h1>
                {children}
              </div>
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          {/* <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto "> */}
          {/* Your content */}
          {/* </aside> */}
        </div>
      </div>
    </div>
  );
}
