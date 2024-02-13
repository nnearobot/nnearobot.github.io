'use client';

import { useState } from 'react';
import { navLinks, snsLinks } from '../data/links';
import { Exo_2 } from 'next/font/google';
import Tri from '@/components/Svg/Tri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const exo2 = Exo_2({
  weight: ['400'],
  subsets: ['latin']
})

const Navbar = ({...props}) => {
  const [state, setState] = useState(false)

  let colors = props.dark
  ? "text-zinc-400 stroke-zinc-400 fill-zinc-400 border-zinc-400 hover:text-white hover:stroke-white hover:fill-white hover:border-white"
  : "text-zinc-600 stroke-zinc-600 fill-zinc-600 border-zinc-600 hover:text-zinc-900 hover:stroke-zinc-900 hover:fill-zinc-900 hover:border-zinc-900"

  return (
      <nav className="w-full md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a className={`${colors} text-xl`} href="/">
                        <Tri
                            className={`w-[40px] h-[40px] inline-block mr-1 -mt-1`}
                        />
                        Nnearobot.io
                    </a>
                    <div className="md:hidden">
                        <button className={`${props.dark ? 'text-zinc-50' : 'text-zinc-600'} outline-none p-2 rounded-md focus:border-zinc-400 focus:border`}
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-6 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                    <ul className={`justify-center items-center space-y-4 md:flex md:space-x-6 md:space-y-0 ${exo2.className}`}>
                        {
                            navLinks.map((item, idx) => {
                                return (
                                    <li key={idx} className={`${colors} pb-4 md:pb-0 border-b md:border-0`}>
                                        <a href={item.url}>
                                            { item.title }
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="md:inline-block">
                    {
                        snsLinks.map((item, idx) => {
                            return (
                                <a key={idx} href={item.url} title={ item.title } className={colors}>
                                    <FontAwesomeIcon icon={item.icon} className="text-xl inline-block ml-4" />
                                </a>
                            )
                        })
                    }
                </div>
          </div>
      </nav>
  )
};

export default Navbar;