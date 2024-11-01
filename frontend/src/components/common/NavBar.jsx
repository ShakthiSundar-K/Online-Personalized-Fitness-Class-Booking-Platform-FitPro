import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/horizontallogo.png";
import useLogout from "../../hooks/useLogut";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const logout = useLogout();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const options = [
    { value: "HOME", path: "/home", role: ["trainer", "user"] },
    { value: "CLASSES", path: "/user/classes", role: ["user"] },
    { value: "CLASS", path: "/trainer/class", role: ["trainer"] },
    { value: "TRAINERS", path: "/user/trainers", role: ["user"] },
    { value: "ABOUT", path: "/about", role: ["user", "trainer"] },
    { value: "SERVICES", path: "/services", role: ["user", "trainer"] },
    { value: "USER MANAGEMENT", path: "/admin/users", role: ["admin"] },
    { value: "TRAINER MANAGEMENT", path: "/admin/trainers", role: ["admin"] },
    { value: "CLASS MANAGEMENT", path: "/admin/classes", role: ["admin"] },
  ];

  const filteredOptions = options.filter((option) =>
    option.role.includes(role)
  );

  return (
    <header className='absolute inset-x-0 top-0 z-50 pt-3'>
      <div className='mx-auto sm:px-8 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-1 md:flex md:items-center md:gap-12 px-3'>
            <Link to='/' className='block text-teal-600'>
              <img
                className='h-28 w-auto'
                src={logo}
                alt='Logo'
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          <div className='md:flex md:items-center md:gap-12'>
            <nav aria-label='Global' className='hidden md:block'>
              <ul className='flex items-center gap-6 text-sm'>
                {filteredOptions.map((option) => (
                  <li key={option.path} className='hover:text-orange-500'>
                    <Link
                      to={option.path}
                      className='text-white transition hover:text-orange-500 active:text-orange-500 font-medium no-underline'
                    >
                      {option.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Profile Button and Dropdown */}
            <div className='hidden md:relative md:block'>
              <button
                type='button'
                className='overflow-hidden rounded-full border border-gray-300 shadow-inner'
                onClick={toggleDropdown}
              >
                <span className='sr-only'>Toggle dashboard menu</span>
                <img
                  src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt=''
                  className='size-10 object-cover'
                />
              </button>

              {isDropdownOpen && (
                <div
                  className='absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg'
                  role='menu'
                >
                  <div className='p-2'>
                    <Link
                      to='/profile'
                      className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      role='menuitem'
                    >
                      My profile
                    </Link>
                    <Link
                      to='/billing'
                      className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      role='menuitem'
                    >
                      Billing summary
                    </Link>
                    <Link
                      to='/team-settings'
                      className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      role='menuitem'
                    >
                      Team settings
                    </Link>
                  </div>

                  <div className='p-2'>
                    <button
                      onClick={logout}
                      className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                      role='menuitem'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className='block md:hidden pr-3'>
              <button
                className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'
                onClick={toggleMobileMenu}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className='md:hidden'>
          <ul className='flex flex-col gap-4 p-4 text-sm'>
            {filteredOptions.map((option) => (
              <li key={option.path}>
                <Link
                  to={option.path}
                  className='text-white transition hover:text-orange-500 active:text-orange-500 font-medium no-underline'
                >
                  {option.value}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default NavBar;
