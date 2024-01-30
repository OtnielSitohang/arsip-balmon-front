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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await Api.fetchData(kodeArsip);
      console.log(response); // Log the response to the console to inspect its structure
      const { data, message, error } = response;
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
        setAktif(data.aktif);
        setInaktif(data.inaktif);
        setKeterangan(data.keterangan);
        setTanggalDiinput('');
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

    const { data } = await Api.fetchData(kodeArsip);
    console.log('Data from fetchData:', data);
    // const kode_klasifikasi = data?.kode_arsip || '';
    // const klasifikasi_keamanan_fetched = data?.Klasifikasi_keamanan || '';
    // const aktif_fetched = data?.aktif || '';
    // const inaktif_fetched = data?.inaktif || '';
    // const keterangan_fetched = data?.keterangan || '';

    const arsipData = {
      kode_klasifikasi: data?.kode_arsip || '',
      uraian_berkas,
      jumlah_folder: jumlahFolder,
      no_isi_berkas: nomorIsiBerkas,
      uraian_isi,
      kurun_waktu,
      tingkat_perkembangan: perkembangan,
      jumlah_lembar,
      lokasi_laci,
      folder,
      aktif: data?.aktif || '', // Pastikan nilai aktif tersedia
      inaktif: data?.inaktif || '', // Pastikan nilai inaktif tersedia
      keterangan: data?.keterangan || '', // Pastikan nilai keterangan tersedia
      klasifikasi_keamanan: data?.Klasifikasi_keamanan || '',
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
    if (!uraian_berkas || !jumlahFolder || !nomorIsiBerkas || !uraian_isi || !kurun_waktu || !jumlah_lembar || !perkembangan || !lokasi_laci  || !folder) {
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
        />
      )}
    </div>
  );
};

export default ArsipBalom;
