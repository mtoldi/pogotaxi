import Image from 'next/image';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar: React.FC = () => {
    return (
        <div className='flex justify-between p-4 px-10 bg-gray-100 shadow-md'>
            <div className='flex gap-10 items-center'>
                <Image 
                    src='/logo.png'
                    alt='logo'
                    width={500}
                    height={150}
                />

                <div className='hidden md:flex gap-6'>
                    <Link href='/'>
                        <span className='hover:bg-yellow-300 p-4 rounded-xl cursor-pointer transition-all text-black font-bold text-[25px]'>Home</span>
                    </Link>
                    <Link href='/history'>
                        <span className='hover:bg-yellow-300 p-4 rounded-xl cursor-pointer transition-all text-black font-bold text-[25px]'>History</span>
                    </Link>
                    <Link href='/help'>
                        <span className='hover:bg-yellow-300 p-4 rounded-xl cursor-pointer transition-all text-black font-bold text-[25px]'>Help</span>
                    </Link>
                    <Link href='/sign-in'>
                    <span className='text-black p-4 rounded-xl hover:bg-yellow-300 cursor-pointer transition-all text-[25px] font-bold'>
                        Sign In
                    </span>
                </Link>
                <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    );
}

export default NavBar;