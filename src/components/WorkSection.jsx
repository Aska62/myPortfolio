import { useRef, useState, useEffect, useCallback } from "react";
import { db, storage } from '../firebase.config';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ImageViewer from "react-simple-image-viewer";
import SkillCard from "./SkillCard";

const WorkSection = ({ work, position}) => {
  const secRef = useRef();

  const [loading, setLoading] = useState(true);
  const [sectionTop, setSectionTop] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [mainImageData, setMainImageData] = useState('');
  const [visibleImage, setVisibleImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) {
      getImages();
    }
    setLoading(false);
  }, [work, imageUrls]);

  useEffect(() => {
    setSectionTop(secRef.current.offsetTop);
  }, [secRef]);

  useEffect(() => {
    if ((imageUrls.length > 0) && (sectionTop > 0) && (work.name === position)) {
      window.scrollTo({
        top: secRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [sectionTop, work, position, imageUrls]);

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

      imageQuerySnap.forEach((imgDoc) => {
        // Complete image path by adding name
        const imagePath = (imgDoc.data().isMain) ?
          `${baseMainImgPath}/${work.imgName}.${imgDoc.data().extension}` :
          `${baseImgPath}/${work.imgName}_${imgDoc.data().order}.${imgDoc.data().extension}`;

        // Prepare reference to get URL
        const imageRef = ref(storage, imagePath);

        getDownloadURL(imageRef)
          .then((url) => {
            // Set data
            setImageUrls((prevState) => ([
              ...prevState,
              url
            ]));

            // If the URL is for main image of the work, set as main image data
            if (imgDoc.data().isMain) {
              setMainImageData(url);
            }
          })
          .catch(err => {
            console.log(err)
          });
      });
    }
  }

  const openImageViewer = useCallback((index) => {
    setVisibleImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setVisibleImage(0);
    setIsViewerOpen(false);
  };

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
          <img
            src={mainImageData}
            className="w-11/12 sm:w-full h-fit my-8 hover:cursor-pointer hover:opacity-80 duration-300"
            onClick={() => openImageViewer(visibleImage)}
          />
          <p className=''>{work.description}</p>
          <div className="w-full mx-auto mt-6 mb-0 flex flex-wrap z-10">
            {imageUrls.length > 0 &&
              <>
                {isViewerOpen && (
                  <ImageViewer
                    src={imageUrls}
                    currentIndex={visibleImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                      backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                  />
                )}
              </>
            }
          </div>
        </>
      }
    </section>
  )
}

export default WorkSection