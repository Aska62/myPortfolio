import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [worksOpen, setWorksOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 flex justify-between items-top w-screen ${worksOpen ? 'h-28' : 'h-12'} duration-150 m-0 py-3 px-5 bg-brightYellow shadow-md`}>
        <Link
          to={'/'}
          className="font-semibold px-0 hover:text-wineRed"
        >My Portfolio</Link>

        {/* Menu for larger devices */}
        <div className="hidden md:flex align-top">
          <div className="text-sm flex flex-col w-24">
            <p className="absolute top-0 h-12 py-3 hover:text-wineRed hover:cursor-pointer font-semibold" onClick={() => setWorksOpen(!worksOpen)}>Wroks</p>
            <Link to={'#'} className={`bg-brightYellow w-24 ${worksOpen ? 'py-3 block absolute top-8 duration-300' : 'hidden h-0 py-0'} hover:text-wineRed hover:cursor-pointer duration-300`}>DivLog</Link>
            <Link to={'#'} className={`bg-brightYellow w-24 ${worksOpen ? 'py-0 block absolute top-20 duration-300' : 'hidden h-0 py-0 '} hover:text-wineRed hover:cursor-pointer duration-300`}>PhotoStory</Link>
          </div>
          <Link
            to={'#'}
            className="text-sm h-12 px-3 w-16 font-semibold hover:text-wineRed"
          >About</Link>
        </div>
      </nav>

      {/* Menu for smaller devices */}
      <div
        className={`bg-lightGray opacity-80 h-screen w-screen ${hamburgerOpen ? 'fixed' : 'hidden'} top-0 left-0 duration-300 z-10`}
        onClick={() => setHamburgerOpen(false)}
      >
      </div>
      <div
        className={`bg-lightYellow h-screen fixed top-0 right-0 flex flex-col items-start ${hamburgerOpen ? ' w-2/3' : 'w-0'} duration-300 z-20`}
      >
        <div className="py-3 pl-6 mt-16 flex flex-col">
          <p className="h-10">Wroks</p>
            <Link
            to={'#'}
            className="px-3 h-10 hover:text-wineRed"
          >DivLog</Link>
          <Link
            to={'#'}
            className="px-3 h-10 hover:text-wineRed"
          >PhotoStory</Link>
        </div>
        <Link
          to={'#'}
          className="h-12 pl-6 hover:text-wineRed"
        >About</Link>
      </div>
      {/* Menu opener for smaller devices */}
      <div
        className={`md:hidden w-6 h-6 p-0 fixed right-3 top-3 flex flex-col ${hamburgerOpen ? '' : 'justify-around'} hover:cursor-pointer z-30`}
        onClick={() => setHamburgerOpen(!hamburgerOpen)}
      >
        <div className={`w-full h-px m-0 p-0 bg-black origin-top-left ${hamburgerOpen ? 'rotate-45 absolute top-0.5' : ''} transition duration-300`}></div>
        <div className={`w-full h-px m-0 p-0 bg-black ${hamburgerOpen ? 'hidden' : 'block'} transition duration-300`}></div>
        <div className={`w-full h-px m-0 p-0 bg-black origin-bottom-left ${hamburgerOpen ? '-rotate-45 absolute bottom-1' : ''} transition duration-300`}></div>
      </div>
    </>
  )
}

export default Header