import { useRef, useState, useEffect } from "react";
import { db, storage } from '../firebase.config';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SkillCard from "./SkillCard";

const WorkSection = ({ work, position}) => {
  const secRef = useRef();

  const [loading, setLoading] = useState(true);
  const [sectionTop, setSectionTop] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [visibleImage, setVisibleImage] = useState(0);

  useEffect(() => {
    if (imageData.length === 0) {
      getImages();
    }
    setLoading(false);
  }, [work, imageData]);

  const getImages = async () => {
    setLoading(true);
    // Get images
    const imageDataRef = collection(db, 'imageData');
    const imageDataQ = query(
      imageDataRef,
      where('workRef', '==', work.id),
      orderBy('imageTitle', 'asc')
    );

    const imageQuerySnap = await getDocs(imageDataQ);

    if (!imageQuerySnap.empty) {
      let fetchedImageData = [];
      imageQuerySnap.forEach((imgDoc) => {
        const imageRef = ref(storage, `${imgDoc.data().imageTitle}.png`);

        getDownloadURL(imageRef)
          .then((url) => {
            fetchedImageData = [...fetchedImageData, {
              imageUrl: url,
              description: imgDoc.data().description
            }];
            setImageData(fetchedImageData);
            setImageCount(fetchedImageData.length);
          })
          .catch(err => {
            console.log(err)
          })
      });
    }
  }

  useEffect(() => {
    setSectionTop(secRef.current.offsetTop);
  }, [secRef]);

  useEffect(() => {
    if ((imageData.length > 0) && (sectionTop > 0) && (work.name === position)) {
      window.scrollTo({
        top: secRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [sectionTop, work, position, imageData]);

  const switchImageBack = () => {
    const nextImage = (visibleImage === 0) ? imageCount - 1 : visibleImage - 1;
    setVisibleImage(nextImage);
  }

  const switchImageNext = () => {
    const nextImage = (visibleImage === (imageCount - 1)) ? 0 : visibleImage + 1;
    setVisibleImage(nextImage);
  }

  return (
    <section className="w-11/12 mx-auto pt-20 h-screen" id={work.name} ref={secRef}>
      {loading ? <p>Loading...</p> :
        <>
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">{work.name}</h2>
            <a href={`${process.env.REACT_APP_GITHUB_URL}/${work.gitHubRepo}`} target="_blank" rel="noopener noreferrer" className="pl-2 text-xl hover:text-wineRed"><FaGithub /></a>
            {work.extLink &&
              <a href={work.extLink} target="_blank" rel="noopener noreferrer" className="pl-2 text-lg ml-1 hover:text-wineRed" >
                <FaExternalLinkAlt />
              </a>
            }
          </div>
          <div className="flex my-3 flex-wrap">
            {work.skills.map((skill, index) => (
              <SkillCard skill={skill} key={index} />
            ) )}
          </div>
          <p className=''>{work.description}</p>
          <div className="mt-6 w-5/7 mx-auto flex flex-wrap z-10">
            {imageData.length > 0 &&
              <>
                <div className="w-full my-0 mx-8 relative">
                  <img src={imageData[visibleImage].imageUrl} className="bg-lightGray h-fit md:w-11/12 mx-auto" />
                  <div className="w-full h-full p-0 m-0 absolute top-0 left-0 flex">
                    <div className="w-1/2 h-full flex items-center justify-start text-3xl m-0 md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageBack}><IoIosArrowBack /></div>
                    <div className="w-1/2 h-full flex items-center justify-end text-3xl md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageNext}><IoIosArrowForward /></div>
                  </div>
                </div>
                <p className="w-5/7 text-wrap">{imageData[visibleImage].description}</p>
              </>
            }
          </div>
        </>
      }
    </section>
  )
}

export default WorkSection