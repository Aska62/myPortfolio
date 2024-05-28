import { useRef, useState, useEffect } from "react";
import { storage } from '../firebase.config';
import { ref, getDownloadURL } from "firebase/storage";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SkillCard from "./SkillCard";

const WorkSection = ({ work, position}) => {
  const secRef = useRef();

  const [sectionTop, setSectionTop] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [visibleImage, setVisibleImage] = useState(0);

  const switchImageBack = () => {
    const nextImage = (visibleImage === 0) ? imageCount - 1 : visibleImage - 1;
    setVisibleImage(nextImage);
  }

  const switchImageNext = () => {
    const nextImage = (visibleImage === (imageCount - 1)) ? 0 : visibleImage + 1;
    setVisibleImage(nextImage);
  }


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

  let imagUrlsSet = false;
  useEffect(() => {
    if ((imageUrls.length === 0) && !imagUrlsSet) {
      getImageUrls(work.images);
      setImageCount(work.images.length);
      imagUrlsSet = true;
    }
  }, [work, imageUrls]);

  const getImageUrls = async (images) => {
    images.forEach(image => {
      const imageRef = ref(storage, `${image}.png`);
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrls((prevState) => ([...prevState, url]))
        })
        .catch(err => {
          console.log(err)
        })
    })
  }


  return (
    <section className="w-11/12 mx-auto mb-12 pt-12 h-fit" id={work.name} ref={secRef}>
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
      <div className="mt-6 w-5/7 mx-auto flex flex-wrap relative">
        <div className="w-full my-10 mx-8">
          <img src={imageUrls[visibleImage]} className="bg-lightGray w-full" />
          <p className="w-5/7 text-wrap">{work.imageDesc[visibleImage]}</p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 flex">
          <div className="w-1/2 h-full flex items-center justify-start text-3xl md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageBack}><IoIosArrowBack /></div>
          <div className="w-1/2 h-full flex items-center justify-end text-3xl md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageNext}><IoIosArrowForward /></div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection