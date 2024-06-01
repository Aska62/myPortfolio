import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const [worksOpen, setWorksOpen] = useState(false);
  const [mbWorksOpen, setMbWorksOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 flex justify-between items-top w-screen z-20 h-12 ${worksOpen ? 'md:h-36' : 'md:h-12'} duration-75 m-0 py-3 px-5 bg-brightYellow shadow-md`}>
        <Link
          to={'/'}
          className="font-semibold px-0 hover:text-wineRed"
          onClick={() => setWorksOpen(false)}
        >My Portfolio</Link>

        {/* Menu for larger devices */}
        <div className="hidden md:flex align-top">
          <div className="text-sm flex flex-col w-24">
            <Link
              to={'/'}
              className="mt-px h-12 px-3 w-28 font-semibold hover:text-wineRed"
              onClick={() => setWorksOpen(false)}
            >
              <p className="mr-2">Home</p>
            </Link>
          </div>
          <div className="text-sm flex flex-col w-24">
            <div
              className="absolute top-0 h-12 py-3 hover:text-wineRed hover:cursor-pointer font-semibold flex items-center duration-150"
              onClick={() => setWorksOpen(!worksOpen)}
            >
              <p className="mr-2">Wroks</p>
              <IoIosArrowDown className={`${worksOpen ? 'rotate-180' : ''} duration-150`} />
            </div>
            <Link
              to={'/works'}
              state={{ title: "DivLog" }}
              className={`bg-brightYellow w-24 ${worksOpen ? 'py-3 block absolute top-8 duration-150' : 'hidden h-0 py-0'} hover:text-wineRed hover:cursor-pointer duration-150`}
              onClick={() => setWorksOpen(false)}
            >DivLog</Link>
            <Link
              to={'/works'}
              state={{ title: "PhotoStory" }}
              className={`bg-brightYellow w-24 ${worksOpen ? 'py-0 block absolute top-20 duration-150' : 'hidden h-0 py-0 '} hover:text-wineRed hover:cursor-pointer duration-150`}
              onClick={() => setWorksOpen(false)}
            >PhotoStory</Link>
            <Link
              to={'/works'}
              state={{ title: "Brewtech Supports" }}
              className={`bg-brightYellow w-24 ${worksOpen ? 'py-0 block absolute top-28 duration-500' : 'hidden h-0 py-0 '} hover:text-wineRed hover:cursor-pointer duration-150`}
              onClick={() => setWorksOpen(false)}
            >Brewtech</Link>
          </div>
        </div>
      </nav>

      {/* Menu for smaller devices */}
      <div
        className={`bg-lightGray opacity-80 h-screen w-screen ${hamburgerOpen ? 'fixed' : 'hidden'} top-0 left-0 duration-150 z-10`}
        onClick={() => setHamburgerOpen(false)}
      >
      </div>
      <div
        className={`bg-lightYellow h-screen fixed top-0 right-0 flex flex-col items-start ${hamburgerOpen ? ' w-2/3' : 'w-0'} duration-150 z-20`}
      >
        <div className="py-3 pl-6 mt-16 flex flex-col">
        <div >
          <Link
            to={'/'}
            className="h-10 hover:text-wineRed flex items-center"
            onClick={() => setHamburgerOpen(false)}
          >
            <p className="h-10 mr-2">Home</p>
          </Link>
        </div>
          <div
            state={{ title: "" }}
            className=" hover:text-wineRed hover:cursor-pointer duration-150 flex items-center mb-2"
            onClick={() => setMbWorksOpen(!mbWorksOpen)}
          >
            <p className="h-10 leading-10 mr-2">Wroks</p>
            <IoIosArrowDown className={`${mbWorksOpen ? 'rotate-180' : ''} duration-150`} />
          </div>
          <Link
            to={'/works'}
            state={{ title: "" }}
            className={`px-3 h-10 hover:text-wineRed ${mbWorksOpen ? 'block' : 'hidden'} duration-150`}
            onClick={() => setHamburgerOpen(false)}
          >Works Top</Link>
          <Link
            to={'/works'}
            state={{ title: "DivLog" }}
            className={`px-3 h-10 hover:text-wineRed ${mbWorksOpen ? 'block' : 'hidden'} duration-150`}
            onClick={() => setHamburgerOpen(false)}
          >DivLog</Link>
          <Link
            to={'/works'}
            state={{ title: "PhotoStory" }}
            className={`px-3 h-10 hover:text-wineRed ${mbWorksOpen ? 'block' : 'hidden'} duration-150`}
            onClick={() => setHamburgerOpen(false)}
          >PhotoStory</Link>
          <Link
            to={'/works'}
            state={{ title: "Brewtech Supports" }}
            className={`px-3 h-10 hover:text-wineRed ${mbWorksOpen ? 'block' : 'hidden'} duration-150`}
            onClick={() => setHamburgerOpen(false)}
          >Brewtech Supports</Link>
        </div>
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