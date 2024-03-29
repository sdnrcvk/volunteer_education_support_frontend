import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserIcon, DocumentDuplicateIcon, DocumentArrowUpIcon
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/pages/contexts/authContext'
import { InboxIcon } from '@heroicons/react/20/solid'

export default function Navbar() {
  const router = useRouter();
  const {user, logout}=useAuth();

  const navigation = [
    { name: 'Ana Sayfa', href: '/', current: router.pathname === '/' },
    { name: 'Özel Dersler', href: '/courses', current: router.pathname === '/courses' },
    { name: 'Bize Ulaşın', href: '/contact', current: router.pathname === '/contact' },
  ]

  if (user && user.detail && user.detail.user_type === "admin") {
    navigation.splice(2, 0, { 
      name: 'Onay Bekleyen Özel Dersler', 
      href: '/courses-admin', 
      current: router.pathname === '/courses-admin' 
    });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" style={{backgroundColor:"#EEEEEE"}}>
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={"/"}>
                    <Image className="block h-8 w-auto lg:hidden"
                      src={"/logo.png"} width={1000} height={237}
                      alt="Site Logosu"/>
                    <Image
                      className="hidden h-8 w-auto lg:block"
                      src={"/logo.png"} width={1000} height={237}
                      alt="Site Logosu"
                    />
                  </Link> 
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-sky-900 text-white' : 'text-dark-300 hover:bg-amber-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* Arama Kutusu */}
                    <form className="d-flex flex-grow-1 justify-content-center" role="search">
                      <input className="form-control me-2 flex-grow-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" placeholder="Ara" aria-label="Search"/>
                      <button className="btn text-white bg-amber-500 hover:bg-amber-600	focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm" type="submit">Ara</button>
                    </form>
                  </div>
                </div>
              </div>
              

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Login-Register Buttons */}
                {!user && (
                <div className='flex items-center justify-center'>
                  <div className="border w-fit rounded-xl shadow-sm">
                      <Link href={"/login"} className="px-2 py-2 rounded-l-xl text-white m-0 bg-sky-900	hover:bg-sky-800 transition">Giriş Yap</Link>
                      <Link href={"/register"} className="px-2 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition">Üye Ol</Link>
                  </div>
                </div>
                )}

                {/* Profile dropdown */}
                {user && (
                <Menu as="div" className="relative ml-3 z-40">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Kullanıcı Menüsü</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"
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
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={user ? "/profile/"+user.id : "/"}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <span className="inline-block align-middle">
                              <UserIcon className="h-5" aria-hidden="true" />
                            </span>
                            <span className="inline-block align-middle ml-2">
                              Profil
                            </span>
                          </Link>
                        )}
                      </Menu.Item>
                      {user && user.detail && user.detail.user_type === "admin" && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/messages"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <span className="inline-block align-middle">
                              <InboxIcon className="h-5" aria-hidden="true" />
                            </span>
                            <span className="inline-block align-middle ml-2">
                              Mesajlar
                            </span>
                          </Link>
                        )}
                      </Menu.Item>
                      )}
                      {user && user.detail && user.detail.user_type === "user" && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                            href={"/unconfirmed-courses/"+user?.id}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <span className="inline-block align-middle">
                                <Cog6ToothIcon className="h-5" aria-hidden="true" />
                              </span>
                              <span className="inline-block align-middle ml-2">
                                Onaylanmamış
                              </span>
                              <span className="inline-block align-middle ml-2">
                                Dersler
                              </span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={"/given-courses/"+user?.id}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <span className="inline-block align-middle">
                                <DocumentArrowUpIcon className="h-5" aria-hidden="true" />
                              </span>
                              <span className="inline-block align-middle ml-2">
                                Verilen Dersler
                              </span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={"/received-courses/"+user?.id}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <span className="inline-block align-middle">
                                <DocumentDuplicateIcon className="h-5" aria-hidden="true" />
                              </span>
                              <span className="inline-block align-middle ml-2">
                                Alınan Dersler
                              </span>
                            </Link>
                          )}
                        </Menu.Item>                        
                      </>
                      )}
                      <hr />
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={logout}
                          >
                            <span className="inline-block align-middle">
                              <ArrowRightOnRectangleIcon className="h-5" aria-hidden="true" />
                            </span>
                            <span className="inline-block align-middle ml-2">
                              Çıkış Yap
                            </span>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-dark-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}