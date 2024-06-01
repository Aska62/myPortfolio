import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from '../firebase.config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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

    try {
      // Get all works
      const workQ = query(worksRef,  orderBy('order', 'asc'));

      const querySnap = await getDocs(workQ);

      if (!querySnap.empty) {
        let fetchedData = [];
        querySnap.forEach(async(doc) => {
          fetchedData.push({
            id         : doc.id,
            name       : doc.data().name,
            gitHubRepo : doc.data().gitHubRepo,
            extLink    : doc.data().extLink,
            description: doc.data().description,
            skills     : doc.data().skills,
          });

          setWorks(fetchedData);
        });
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