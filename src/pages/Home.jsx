import { FaMailBulk, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { skills } from '../constants.js';
import SkillCard from "../components/SkillCard";

const Home = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_CONTACT_EMAIL)
    alert('Copied address to clipboard');
  };

  return (
    <div className="w-full h-svh p-0 flex flex-col items-center justify-center lg:flex-row lg:justify-center">
      <div className="prof-pic w-40 h-40 rounded-full text-center bg-cover"></div>
      <div className="w-64 md:w-80 lg:w-96 mt-6 lg:mt-0 flex flex-col lg:mx-6">
        <h1 className="font-bold text-xl">Aska Takahashi</h1>
        <h2 className="font-semibold text-lg">Web Application Developer</h2>
        <p className='mt-3'>A developer with experience of building web applications who loves to code in React and Node.js.<br/>
          Never stopped learning new skills.
        </p>
        <div className='w-full flex flex-wrap mt-3'>
          {skills.map((skill, index) => (
            <SkillCard skill={skill} key={index} />
          ) )}
        </div>
        <div className="column w-fit mt-4 mb-3 mx-auto flex justify-center">
          <a href={`${process.env.REACT_APP_GITHUB_URL}`} target="_blank" rel="noopener noreferrer" className="w-min text-2xl hover:text-wineRed">
            <FaGithub />
          </a>
          <a href={`${process.env.REACT_APP_LINKEDIN_URL}`} target="_blank" rel="noopener noreferrer" className="w-min pl-4 text-2xl hover:text-wineRed">
            <FaLinkedin />
          </a>
          <a href={`${process.env.REACT_APP_INSTAGRAM_URL}`} target="_blank" rel="noopener noreferrer" className="w-min pl-4 text-2xl hover:text-wineRed">
            <FaInstagram />
          </a>
          <div className="w-min pl-4 text-2xl hover:text-wineRed" onClick={copyToClipboard} >
            <FaMailBulk />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home