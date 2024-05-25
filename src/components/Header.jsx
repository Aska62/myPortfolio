import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [worksOpen, setWorksOpen] = useState(false);

  return (
    <nav className="flex justify-between w-screen h-12 m-0 py-3 px-5 bg-brightYellow">
      <Link
        to={'/'}
        className="font-semibold px-0 hover:text-wineRed"
      >My Portfolio</Link>
      <div className="flex align-top">
        <div className="text-sm flex flex-col w-24">
          <p className="h-12 pb-4 hover:text-wineRed hover:cursor-pointer font-semibold" onClick={() => setWorksOpen(!worksOpen)}>Wroks</p>
          <Link to={'#'} className={`bg-brightYellow w-24 ${worksOpen ? 'h-12 py-3' : 'hidden h-0 py-0'} hover:text-wineRed hover:cursor-pointer transition duration-300`}>DivLog</Link>
          <Link to={'#'} className={`bg-brightYellow w-24 ${worksOpen ? 'h-12 py-3' : 'hidden h-0 py-0'} hover:text-wineRed hover:cursor-pointer transition duration-300`}>PhotoStory</Link>
        </div>
        <Link
          to={'#'}
          className="text-sm px-3 w-16 h-full font-semibold hover:text-wineRed"
        >About</Link>
      </div>
    </nav>
  )
}

export default Header