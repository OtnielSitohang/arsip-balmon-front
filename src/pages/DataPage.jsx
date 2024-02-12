import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import DisplayData from '../component/DisplayData';
import config from '../config';  
import '../css/DataPage.css';
import SidebarComponent from "../component/sideBar/sidebar";

const DataPage = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}getAllData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data[0]);
        console.log(result.data[0]); // Ubah dari console.log(setData) menjadi console.log(result.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  const handleEdit = (item) => {
    // Implementasi logika untuk pengeditan data di sini
    console.log("Editing item:", item);
    history('/EditPage', { state: { dataToEdit: item } });
  };


  return (
    <div>
      <SidebarComponent />
      <h1>Rekap Data</h1>
      {/* <DisplayData data={data} /> */}
      <DisplayData data={data} handleEdit={handleEdit} />
    </div>
  );
};

export default DataPage;









