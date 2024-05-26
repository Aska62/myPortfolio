import { skills } from '../constants.js';
import SkillCard from "../components/SkillCard";

const Home = () => {
  return (
    <div className="w-full h-svh p-0 flex flex-col items-center justify-center lg:flex-row lg:justify-center">
      <div className="w-40 h-40 bg-darkGray rounded-full text-center">Photo</div>
      <div className="w-64 md:w-80 lg:w-96 mt-6 lg:mt-0 flex flex-col lg:mx-6">
        <h1 className="font-bold text-xl">Aska Takahashi</h1>
        <h2 className="font-semibold text-lg">Web Application Developer</h2>
        <p className='mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <div className='w-full flex flex-wrap mt-3'>
          {skills.map((skill, index) => (
            <SkillCard skill={skill} key={index} />
          ) )}
        </div>
      </div>
    </div>
  )
}

export default Home