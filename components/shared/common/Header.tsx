import { useState } from 'react';
import clsx from 'clsx';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconHeaderLogo } from "@/components/icons";

type HeaderProps = {
  logo?: React.ReactNode;
  navList?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  logoPosition?: 'left' | 'center' | 'right';
};

const Header = ({
  logo,
  navList,
  actions,
  children,
  logoPosition = 'left',
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-2 flex items-center justify-between bg-white shadow-md relative z-10 md:flex-row md:items-center">
      {logoPosition === 'left' && (
        <>
          <div className="flex items-center w-full md:w-auto">
            {logo ? logo : <img src={IconHeaderLogo} alt="Logo" className="w-12 h-12" />}
          </div>
          <div className="hidden md:flex flex-1 justify-between">
            <nav className="flex items-center space-x-4">{navList}</nav>
            <div className="flex items-center space-x-4">{actions}</div>
          </div>
        </>
      )}
      {logoPosition === 'center' && (
        <>
          <div className="hidden md:flex flex-1 justify-start">
            <nav className="flex items-center space-x-4">{navList}</nav>
          </div>
          <div className="flex items-center w-full md:w-auto justify-center">
            {logo ? logo : <img src={IconHeaderLogo} alt="Logo" className="w-12 h-12" />}
          </div>
          <div className="hidden md:flex flex-1 justify-end">
            <div className="flex items-center space-x-4">{actions}</div>
          </div>
        </>
      )}
      {logoPosition === 'right' && (
        <>
          <div className="hidden md:flex flex-1 justify-between">
            <nav className="flex items-center space-x-4">{navList}</nav>
            <div className="flex items-center space-x-4">{actions}</div>
          </div>
          <div className="flex items-center w-full md:w-auto ml-4 justify-end">
            {logo ? logo : <img src={IconHeaderLogo} alt="Logo" className="w-12 h-12" />}
          </div>
        </>
      )}
      <div className="flex md:hidden items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col space-y-2 p-4 md:hidden">
          <nav className="flex flex-col space-y-2 w-full">
            {navList}
          </nav>
          <div className="flex flex-col space-y-2 w-full">
            {actions}
          </div>
        </div>
      )}
      {children}
    </header>
  );
};

export default Header;

