import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from '../firebase.config';
import { collection, getDocs, query } from 'firebase/firestore';
import WorkSection from "../components/WorkSection";

const Works = () => {
  const state = useLocation();
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    if (works.length === 0) {
      fetchWorksData();
      }
  }, [works]);

  const fetchWorksData = async () => {
    const worksRef = collection(db, 'works');
    setLoading(true);
    try {
      // Get all works
      let q = query(worksRef)
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        let fetchedData = [];

        querySnap.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            name: doc.data().name,
            gitHubRepo: doc.data().gitHubRepo,
            description: doc.data().description,
            skills: doc.data().skills,
            images: doc.data().images,
            imageDesc: doc.data().imageDesc
          });
        });

        setWorks(fetchedData);
      } else {
        console.log('No works found')
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-dvh mb-12">
      <h1 className="m-6 mt-16">Works</h1>
      {loading ? <p>Loading...</p> : <>
        {works.length > 0 && works.map((work, index) => (<WorkSection work={work} position={state.state.title} key={index} />))}
      </>}
    </div>
  )
}

export default Works