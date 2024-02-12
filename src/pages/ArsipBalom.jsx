import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Api from '../API/InserAPI';
import '../css/ArsipBalmon.css';
import FormData from '../component/FormData';
import DisplayData from '../component/DisplayData';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from "../component/sideBar/sidebar";

const ArsipBalom = () => {
  const history = useNavigate();

  const [kodeKlasifikasi, setKodeKlasifikasi] = useState('');
  const [data, setData] = useState(null);
  const [uraian_informasi, seturaian_informasi] = useState('');
  const [uraian_isi, seturaian_isi] = useState('');
  const [kurun_waktu, setkurun_waktu] = useState('');
  const [jumlah_lembar, setjumlah_lembar] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [aktif, setAktif] = useState('');
  const [inaktif, setInaktif] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [folder, setFolder] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tingkatPerkembangan, setTingkatPerkembangan] = useState('');

  const handleShowData = () => {
    history('/ShowData');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await Api.fetchData(kodeKlasifikasi);
      console.log(response); // Log the response to the console to inspect its structure
      const { data, message, error } = response;
      if (data) {
        setData(data);
        setMessage(message);
        setErrorMessage('');
        setKodeKlasifikasi(data.kode_klasifikasi || '');
        seturaian_informasi('');
        seturaian_isi('');
        setkurun_waktu(data.kurun_waktu || '');
        setjumlah_lembar(data.jumlah_lembar || '');
        setLokasi(data.lokasi || '');
        setAktif(data.aktif);
        setInaktif(data.inaktif);
        setKeterangan(data.keterangan);
        setFolder('');
      } else {
        setData(null);
        setMessage(message);
        setErrorMessage(error || 'Data tidak ditemukan.');
        setAktif('');
        setInaktif('');
        setKeterangan('');
      }
    } catch (error) {
      console.error("Error during API request:", error);
      setErrorMessage('Error during API request');
    }
  };

  const handleRekap = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      const arsipData = {
        kode_klasifikasi: data?.kode_arsip || '',
        kurun_waktu: kurun_waktu,
        aktif: aktif,
        inaktif: inaktif,
        keterangan: keterangan,
        klasifikasi_keamanan: data?.Klasifikasi_keamanan || '',
        tingkat_akses: data.tingkat_akses,
        uraian_informasi: uraian_informasi,
        uraian_isi: uraian_isi,
        tingkat_perkembangan: tingkatPerkembangan,
        jumlah_lembar: jumlah_lembar,
        lokasi: lokasi
      };
  
      const response = await Api.insertData(arsipData);
  
      if (response) {
        const { success, message, error } = response;
  
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message || 'Data inserted successfully!',
          }).then(() => {
            setErrorMessage('');
            setMessage('');
            setKodeKlasifikasi('');
            setData(null);
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error: ${error ? error.message : 'Unknown error'}`,
          }).then(() => {
            setErrorMessage(error && error.message ? error.message : 'Unknown error');
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Unexpected or undefined response',
        }).then(() => {
          setErrorMessage('Unexpected or undefined response');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Error during API request',
      }).then(() => {
        console.error("API Request Error:", error);
        setErrorMessage('Error during API request');
      });
    }
  };
  

  const validateFields = () => {
    if (!uraian_informasi || !uraian_isi || !kurun_waktu || !jumlah_lembar || !lokasi || !aktif || !inaktif || !keterangan || !folder) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error!',
        text: 'Please fill in all required fields.',
      });
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <SidebarComponent />
      <h1>Data Arsip</h1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={kodeKlasifikasi}
          onChange={(e) => setKodeKlasifikasi(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            marginRight: '10px',
            flex: '1',
            padding: '10px',
            borderRadius: '8px', // Adjust the border-radius as needed
          }}
        />
        <button onClick={fetchData} style={{ padding: '10px', width: '30%' }}>
          <i className="fa fa-search" style={{ marginRight: '5px' }}></i> Cari
        </button>
      </div>

      <button
        style={{ marginLeft: '10px', padding: '10px' }}
        onClick={handleShowData}
      >
        Show All Data
      </button>


      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {data && (
        <FormData
          data={data}
          uraian_informasi={uraian_informasi}
          uraian_isi={uraian_isi}
          kurun_waktu={kurun_waktu}
          folder={folder}
          lokasi={lokasi}
          tingkatPerkembangan={tingkatPerkembangan}
          jumlah_lembar={jumlah_lembar}
          seturaian_informasi={seturaian_informasi}
          seturaian_isi={seturaian_isi}
          setkurun_waktu={setkurun_waktu}
          setjumlah_lembar={setjumlah_lembar}
          setLokasi={setLokasi}
          setTingkatPerkembangan={setTingkatPerkembangan}
          setFolder={setFolder}
          handleRekap={handleRekap}
        />
      )}
    </div>
  );
};

export default ArsipBalom;
