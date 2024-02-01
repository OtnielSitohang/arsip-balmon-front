import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
import DisplayData from '../component/DisplayData';
import config from '../config';  
import '../css/DataPage.css';


const DataPage = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}ShowAllData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToShowData = () => {
    history.push('/ShowData');
  };

  return (
    <div>
      <h1>Rekap Data</h1>
      <DisplayData data={data} />

      {/* Use the Link component to navigate to "/Input" */}
      <Link to="/Input">
        <button style={{ marginLeft: '10px', padding: '10px' }}>Back to ArsipBalmon</button>
      </Link>
    </div>
  );
};

export default DataPage;
