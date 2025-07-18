import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom';
import { ShoppingCartIcon,ShoppingBagIcon} from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useThemeStore } from '../store/useThemeStore.js';
import { useProductStore } from '../store/useProductStore.js';

function NavBar() {
  const {pathname}=useResolvedPath() 
  const isHomePage=pathname==="/"
  const {products}=useProductStore

  

  
  return (
    <div className='bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50'>
        <div className='max-w-8xl mx-auto'>
            <div className='navbar px-4 min-h-[4rem] justify-between'>
                {/* Logo */}
                <div className="flex-1 lg:flex-none">
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-2">
                      <ShoppingCartIcon className="size-9 text-primary" />
                        <span
                          className="font-semibold font-mono tracking-widest text-2xl 
                            bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                        >
                          POSGRESTORE
                        </span>
                    </div>
                  </Link>
                </div>

                {/* right section */}
                <div className='flex items-center gap-4'>
                  <ThemeSelector/>
                   {isHomePage && (
                      <div className='indicator'>
                        <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                          <ShoppingBagIcon className="size-5" />
                          <span className="badge badge-sm badge-primary indicator-item">5</span>
                        </div>
                      </div>
                   )}

                </div>

            </div>

        </div>
    </div>
  );
}


export default NavBar;