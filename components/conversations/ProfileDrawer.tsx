import useOtherUser from '@/hooks/useOtherUser';
import { ConversationType } from '@/type'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Message, User } from '@prisma/client'
import { format } from 'date-fns';
import React, { Fragment, useMemo } from 'react'

interface ProfileDrawerProps {
    data: ConversationType;
    onClose: () => void
    isOpen?: boolean
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, onClose, isOpen }) => {

    const otherUser = useOtherUser(data);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title =useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if(data.isGroup) {
            return `${data.users.length} members`;
        }

        return 'Active';
    }, [data]);

    return (
        <Transition show={isOpen}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
              as="div"
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>
      
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden"> {/* Fixed typo here */}
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as="div"
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md"> {/* DialogPanel changed to Dialog.Panel */}
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-end">
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                onClick={onClose}
                              >
                                <span className="sr-only">Close panel</span>
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      );
}

export default ProfileDrawer
