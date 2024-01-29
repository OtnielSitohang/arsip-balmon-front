// ArsipBalom.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Api from '../API/InserAPI';
import '../css/ArsipBalmon.css';
import FormData from '../component/FormData';

const ArsipBalom = () => {
  const [kodeArsip, setKodeArsip] = useState('');
  const [data, setData] = useState(null);
  const [uraian_berkas, setUraianBerkas] = useState('');
  const [jumlahFolder, setJumlahFolder] = useState('');
  const [nomorIsiBerkas, setNomorIsiBerkas] = useState('');
  const [uraian_isi, setUraianIsi] = useState('');
  const [kurun_waktu, setKurunWaktu] = useState('');
  const [jumlah_lembar, setJumlahLembar] = useState('');
  const [perkembangan, setPerkembangan] = useState('');
  const [lokasi_laci, setLokasiLaci] = useState('');
  const [aktif, setAktif] = useState('');
  const [inaktif, setInaktif] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [tanggalDiinput, setTanggalDiinput] = useState('');
  const [folder, setFolder] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showInsertForm, setShowInsertForm] = useState(false);

  const toggleInsertForm = () => {
    setShowInsertForm(!showInsertForm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = async () => {
    const { data, message, error } = await Api.fetchData(kodeArsip);

    if (data) {
      setData(data);
      setMessage(message);
      setErrorMessage('');
      setKodeArsip(data.kode_arsip || '');
      setUraianBerkas('');
      setJumlahFolder('');
      setNomorIsiBerkas('');
      setUraianIsi('');
      setKurunWaktu('');
      setJumlahLembar(data.jumlah_lembar || '');
      setPerkembangan(data.tingkat_perkembangan || '');
      setLokasiLaci(data.lokasi_laci || '');
      setAktif('');
      setInaktif('');
      setKeterangan('');
      setTanggalDiinput('');
      setFolder('');
    } else {
      setData(null);
      setMessage(message);
      setErrorMessage(error);
    }
  };

  const handleRekap = async () => {
    if (!validateFields()) {
      return;
    }

    const { data } = await Api.fetchData(kodeArsip);
    const kode_klasifikasi = data?.kode_arsip || '';
    const klasifikasi_keamanan_fetched = data?.Klasifikasi_keamanan || '';
    const tingkat_akses_fetched = data?.tingkat_akses || '';

    const arsipData = {
      kode_klasifikasi,
      uraian_berkas,
      jumlah_folder: jumlahFolder,
      no_isi_berkas: nomorIsiBerkas,
      uraian_isi,
      kurun_waktu,
      tingkat_perkembangan: perkembangan,
      jumlah_lembar,
      lokasi_laci,
      folder,
      aktif,
      inaktif,
      keterangan,
      klasifikasi_keamanan: klasifikasi_keamanan_fetched,
      tingkat_akses: tingkat_akses_fetched,
      tanggal_diinput: new Date().toISOString(),
    };

    try {
      const { success, message, error } = await Api.insertData(arsipData);

      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: message || 'Data inserted successfully!',
        }).then(() => {
          setErrorMessage('');
          setMessage('');
          setKodeArsip('');
          setData(null);
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `Error: ${error ? error[1] : 'Unknown error'}`,
        }).then(() => {
          setErrorMessage(error);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error during API request',
      }).then(() => {
        console.error("API Request Error:", error);
        setErrorMessage('Error during API request');
      });
    }
  };

  const validateFields = () => {
    // Add validation logic here, return false if validation fails
    if (!uraian_berkas || !jumlahFolder || !nomorIsiBerkas || !uraian_isi || !kurun_waktu || !jumlah_lembar || !perkembangan || !lokasi_laci || !aktif || !inaktif || !keterangan || !folder) {
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
      <h1>Data Arsip</h1>
      <input
        type="text"
        value={kodeArsip}
        onChange={(e) => setKodeArsip(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <i className="fa fa-search" style={{ marginRight: '50%' }}></i>
        Cari
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {data && (
        <div>
          <button onClick={toggleInsertForm}>
            {showInsertForm ? 'Hide Insert Form' : 'Insert Data'}
          </button>

          {showInsertForm && (
            <FormData
              data={data}
              uraian_berkas={uraian_berkas}
              setUraianBerkas={setUraianBerkas}
              jumlahFolder={jumlahFolder}
              setJumlahFolder={setJumlahFolder}
              nomorIsiBerkas={nomorIsiBerkas}
              setNomorIsiBerkas={setNomorIsiBerkas}
              uraian_isi={uraian_isi}
              setUraianIsi={setUraianIsi}
              kurun_waktu={kurun_waktu}
              setKurunWaktu={setKurunWaktu}
              jumlah_lembar={jumlah_lembar}
              setJumlahLembar={setJumlahLembar}
              perkembangan={perkembangan}
              setPerkembangan={setPerkembangan}
              lokasi_laci={lokasi_laci}
              setLokasiLaci={setLokasiLaci}
              aktif={aktif}
              setAktif={setAktif}
              inaktif={inaktif}
              setInaktif={setInaktif}
              keterangan={keterangan}
              setKeterangan={setKeterangan}
              tanggalDiinput={tanggalDiinput}
              setTanggalDiinput={setTanggalDiinput}
              folder={folder}
              setFolder={setFolder}
              handleRekap={handleRekap}
              showInsertForm={showInsertForm}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ArsipBalom;
