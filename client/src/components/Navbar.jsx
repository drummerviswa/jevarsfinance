import 'animate.css';
import React, { useContext, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link, useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from '../context/authContext';

function Navbar() {
  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Loan', href: '/loan' },
    { name: 'Deposit', href: '/deposit' },
    { name: 'EMI', href: '/emi' },
    { name: 'Profits', href: '/profit' },
  ];
  let location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout(currentUser);
      navigate("/login",{replace:true})
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className={"flex flex-col -m-1.5 p-1.5"&&location.pathname=="/"?"animate__animated animate__pulse animate__infinite":""}>
              <span className="sr-only">Jevars Finance</span>
              <img
                className="h-20 w-auto"
                src="logo.png"
                alt=""
                />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className={"text-sm font-semibold leading-6 text-gray-900"&&location.pathname.split("/")[1]==item.href.split("/")[1]?"underline font-bold decoration-2":""}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
              Log Out <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Jevars</span>
                <img
                  className="h-8 w-auto"
                  src={"logo.png"}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  )
}

export default Navbar