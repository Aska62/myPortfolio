import { FaGithub } from "react-icons/fa";
import SkillCard from "../components/SkillCard";

const Works = () => {
  const divLogSkills = [
    'React',
    'Node.js',
    'Express',
    'MongoDB'
  ]

  return (
    <div className="w-full min-h-dvh mb-12">
      <h1 className="m-6 mt-16">Works</h1>
      <section className="w-11/12 mx-auto">
        <div className="flex items-center">
          <h2 className="text-2xl">DivLog</h2>
          <a href="https://github.com/Aska62/DivLog" target="_blank" rel="noopener noreferrer" className="pl-2 text-2lg hover:text-wineRed"><FaGithub /></a>
        </div>
        <div className="flex my-3">
          {divLogSkills.map((skill, index) => (
            <SkillCard skill={skill} key={index} />
          ) )}
        </div>
        <p className=''>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <div className="mt-6">
          <div className="bg-lightGray w-full h-80"></div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        </div>
      </section>
    </div>
  )
}

export default Works