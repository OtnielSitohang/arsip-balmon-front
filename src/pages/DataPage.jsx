// pages/DataPage.jsx
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DisplayData from '../component/DisplayData';
import config from '../config';  // Make sure to import your config file

const DataPage = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}ShowAllData`);
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
      <h1>Data Page</h1>
      <DisplayData data={data} />

      <button
        style={{ marginLeft: '10px', padding: '10px' }}
        onClick={navigateToShowData}
      >
        Rekap Di Folder Yang Sama
      </button>
    </div>
  );
};

export default DataPage;
