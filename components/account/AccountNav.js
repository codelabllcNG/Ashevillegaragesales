import Image from 'next/image';
import React from 'react'
import AccountNavItems from './AccountNavItems';

function AccountNav() {
  return (
    <div className="w-[30%] max-w-[15.4rem] bg-black text-white  py-5 px-[1.25rem] hidden  sm:block">


    <AccountNavItems />
  </div>
  )
}

export default AccountNav