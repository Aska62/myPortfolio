import { useRef, useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import SkillCard from "./SkillCard";

const WorkSection = ({ work, position}) => {
  const secRef = useRef();

  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    setSectionTop(secRef.current.offsetTop);
  }, [secRef]);

  useEffect(() => {
    if (sectionTop > 0 && (work.name === position)) {
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
    }
  }, [sectionTop, work, position]);

  return (
    <section className="w-11/12 mx-auto pt-12 h-screen" id={work.name} ref={secRef}>
      <div className="flex items-center">
        <h2 className="text-2xl">{work.name}</h2>
        <a href={`${process.env.REACT_APP_GITHUB_URL}/${work.gitHubRepo}`} target="_blank" rel="noopener noreferrer" className="pl-2 text-2lg hover:text-wineRed"><FaGithub /></a>
      </div>
      <div className="flex my-3">
        {work.skills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ) )}
      </div>
      <p className=''>{work.description}</p>
      <div className="mt-6">
        <div className="bg-lightGray w-full h-80"></div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      </div>
    </section>
  )
}

export default WorkSection