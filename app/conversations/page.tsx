'use client';

import clsx from "clsx";
import UseConversation from "@/hooks/UseConversation";
import EmptyState from "@/components/EmptyState";

const page = () => {

  const {isOpen} = UseConversation();
  return (
    <div
      className={
        clsx(`
          lg:pl-80 h-full lg:block        
        `, isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  )
}

export default page
