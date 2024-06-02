import { useRef, useState, useEffect } from "react";
import { db, storage } from '../firebase.config';
import { collection, getDocs, getDoc, orderBy, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SkillCard from "./SkillCard";

const WorkSection = ({ work, position}) => {
  const secRef = useRef();

  const [loading, setLoading] = useState(true);
  const [sectionTop, setSectionTop] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [mainImageData, setMainImageData] = useState({});
  const [imageCount, setImageCount] = useState(0);
  const [visibleImage, setVisibleImage] = useState(0);

  useEffect(() => {
    if (imageData.length === 0) {
      getImages();
    }
    setLoading(false);
  }, [work, imageData]);

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

  const getImages = async () => {
    setLoading(true);
    // Get images
    const imageDataRef = collection(db, `imageData_${process.env.REACT_APP_WORK_ENV}`);
    const imageDataQ = query(
      imageDataRef,
      where('workRef', '==', work.id),
      orderBy('order', 'asc')
    );

    const imageQuerySnap = await getDocs(imageDataQ);

    if (!imageQuerySnap.empty) {
      // Paths for images
      const baseMainImgPath = `${process.env.REACT_APP_WORK_ENV}/main`;
      const baseImgPath = `${process.env.REACT_APP_WORK_ENV}/slides`;

      let fetchedImageData = [];

      imageQuerySnap.forEach((imgDoc) => {
        // Complete image path by adding name
        const imagePath = (imgDoc.data().isMain) ?
          `${baseMainImgPath}/${work.imgName}.${imgDoc.data().extension}` :
          `${baseImgPath}/${work.imgName}_${imgDoc.data().order}.${imgDoc.data().extension}`;

        // Prepare reference to get URL
        const imageRef = ref(storage, imagePath);

        getDownloadURL(imageRef)
          .then((url) => {
            // Prepare data to set
            const data = {
              imageUrl: url,
              description: imgDoc.data().description
            }

            // Set the data
            if (imgDoc.data().isMain) {
              setMainImageData(data);
            } else {
              fetchedImageData = [...fetchedImageData, data];
              setImageData(fetchedImageData);
              setImageCount(fetchedImageData.length);
            }
          })
          .catch(err => {
            console.log(err)
          })
      });
    }
  }

  const switchImageBack = () => {
    const nextImage = (visibleImage === 0) ? imageCount - 1 : visibleImage - 1;
    setVisibleImage(nextImage);
  }

  const switchImageNext = () => {
    const nextImage = (visibleImage === (imageCount - 1)) ? 0 : visibleImage + 1;
    setVisibleImage(nextImage);
  }

  return (
    <section className="w-11/12 sm:w-6/12 min-h-screen sm:min-h-96 mx-auto pt-20 pb-10" id={work.name} ref={secRef}>
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
          <img src={mainImageData.imageUrl} className="w-11/12 md:w-full h-fit my-8" />
          <p className=''>{work.description}{mainImageData.url}</p>
          <div className="w-full mx-auto mt-6 mb-0 flex flex-wrap z-10">
            {imageData.length > 0 &&
              <>
                <div className="w-full my-0 mx-8 relative">
                  <img src={imageData[visibleImage].imageUrl} className="w-full md:w-11/12 mx-auto" />
                  <div className="w-full h-full p-0 m-0 absolute top-0 left-0 flex">
                    <div className="w-1/2 h-full flex items-center justify-start text-3xl md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageBack}><IoIosArrowBack className="-ml-8 md:-ml-12" /></div>
                    <div className="w-1/2 h-full flex items-center justify-end text-3xl md:text-7xl opacity-55 hover:opacity-80" onClick={switchImageNext}><IoIosArrowForward className="-mr-8 md:-ml-12" /></div>
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