import React, { useState } from 'react';
import axios from 'axios';
import '../css/ArsipBalmon.css'; 

const ArsipBalom = () => {
  const [kodeArsip, setKodeArsip] = useState('');
  const [data, setData] = useState(null);
  const [uraianInformasi, setUraianInformasi] = useState(''); 
  const [jumlahFolder, setjumlahFolder] = useState(''); 
  const [nomorIsiBerkas, setnomorIsiBerkas] = useState(''); 
  const [Isi, setIsi] = useState(''); 
  const [Waktu, setWaktu] = useState(''); 
  const [jumlahLembar, setjumlahLembar] = useState(''); 
  const [Perkembangan, setPerkembangan] = useState(''); 
  const [Lokasi, setLokasi] = useState(''); 
  const [message, setMessage] = useState('');
  // const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/find', {
        kode_arsip: kodeArsip
      });

      if (response.data.message === 'Data ditemukan') {
        const fetchedData = response.data.payload && response.data.payload.data;

        if (fetchedData && fetchedData.length > 0) {
          const firstData = fetchedData[0];

          setData(firstData);
          setMessage('Data ditemukan.');
          setErrorMessage('');
          setUraianInformasi(''); 
          setjumlahFolder(''); 
          setjumlahLembar(''); 
          setnomorIsiBerkas(''); 
          setPerkembangan(''); 
          setIsi(''); 
          setLokasi(''); 
          setWaktu(''); 
        } else {
          setData(null);
          setMessage('Data tidak ditemukan.');
          setErrorMessage('Data structure from the server is not as expected.');
        }
      } else {
        setData(null);
        setMessage('');
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('');
      setErrorMessage(`Error fetching data from the server: ${error.message}`);
      setData(null);
    }
  };

  return (
    <div className="container">
      <h1>Data Arsip</h1>

      <input
        type="text"
        value={kodeArsip}
        onChange={(e) => setKodeArsip(e.target.value)}
      />
      <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <i className="fa fa-search" style={{ marginRight: '5px' }}></i>
        Cari
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {data && (
        <div>
          <h2>Data Ditemukan</h2>

          {/* Form groups with read-only input fields */}
          <div className="form-group">
            <label>KODE ARSIP</label>
            <input type="text" value={data.kode_arsip} readOnly />
          </div>

          <div className="form-group">
            <label>JENIS ARSIP:</label>
            <input type="text" value={data.Jenis_arsip} readOnly />
          </div>

          <div className="form-group">
            <label>KLASIFIKASI KEAMANAN:</label>
            <input type="text" value={data.Klasifikasi_keamanan} readOnly />
          </div>

          {/* <div className="form-group">
            <label>Hak Akses:</label>
            <input type="text" value={data.hak_akses} readOnly />
          </div> */}

          <div className="form-group">
            <label>TINGKAT AKSES:</label>
            <input type="text" value={data.tingkat_akses} readOnly />
          </div>

          {/* <div className="form-group">
            <label>Unit Pengolahan:</label>
            <input type="text" value={data.unit_pengolahan} readOnly />
          </div> */}

          {/* input for Uraian Informasi */}
          <div className="form-group">
            <label htmlFor="Uraian">URAIAN INFORMASI BERKAS/INDEKS</label>
            <textarea
              id="Uraian"
              value={uraianInformasi}
              onChange={(e) => setUraianInformasi(e.target.value)}
              required
              className="form-control"
              placeholder={'Write Here'}
            ></textarea>
          </div>
         
          {/* input for Jumlah Folder */}
          <div className="form-group">
            <label htmlFor="Uraian">JUMLAH FOLDER</label>
            <input
              id="Uraian"
              type="number"
              value={jumlahFolder}
              onChange={(e) => setjumlahFolder(e.target.value)}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/.test(e.key);
                if (!isValidInput) {
                  e.preventDefault();
                }
              }}
              required
              className="form-control"
              placeholder={'Folder'}
            />
          </div>
                   
          {/* input for Nomor Isi Berkas */}
          <div className="form-group">
            <label htmlFor="Uraian">NOMOR ISI BERKAS</label>
            <input
              id="Uraian"
              type="number"
              value={nomorIsiBerkas}
              onChange={(e) => setnomorIsiBerkas(e.target.value)}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/.test(e.key);
                if (!isValidInput) {
                  e.preventDefault();
                }
              }}
              required
              className="form-control"
              placeholder={'Isi Berkas'}
            />
          </div>

           {/* input for Uraian/Isi */}
           <div className="form-group">
            <label htmlFor="Uraian">URAIAN/ISI</label>
            <textarea
              id="isi"
              value={Isi}
              onChange={(e) => setIsi(e.target.value)}
              required
              className="form-control"
              placeholder={'Write Here'}
            ></textarea>
          </div>

          {/* input for Kurun Waktu */}
          <div className="form-group">
            <label htmlFor="Uraian">KURUN WAKTU</label>
            <input
              id="Waktu"
              type="number"
              value={Waktu}
              onChange={(e) => setWaktu(e.target.value)}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/.test(e.key);
                if (!isValidInput) {
                  e.preventDefault();
                }
              }}
              required
              className="form-control"
              placeholder={'Tahun'}
            />
          </div>

          {/* Tingkat Perkembangan */}
        <div className="form-group">
          <label htmlFor="Perkembangan">Tingkat Perkembangan</label>
          <select
            id="Perkembangan"
            value={Perkembangan}
            onChange={(e) => setPerkembangan(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>
              Pilih Tingkat Perkembangan
            </option>
            <option value="Asli">Asli</option>
            <option value="Fotocopy">Fotocopy</option>
            <option value="AsliFotocopy">Asli dan Fotocopy</option>
          </select>
        </div>

              {/* input for Jumlah LEMBAR */}
          <div className="form-group">
            <label htmlFor="Uraian">JUMLAH LEMBAR</label>
            <input
              id="lembar"
              type="number"
              value={jumlahLembar}
              onChange={(e) => setjumlahLembar(e.target.value)}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/.test(e.key);
                if (!isValidInput) {
                  e.preventDefault();
                }
              }}
              required
              className="form-control"
              placeholder={'Jumlah Lembar'}
            />
          </div>

        {/* Lokasi Laci*/}
        <div className="form-group">
          <label htmlFor="Lokasi">Lokasi Laci</label>
          <select
            id="Lokasi"
            value={Lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>
              Pilih Lokasi Laci
            </option>
            <option value="Laci1">Laci 1</option>
            <option value="Laci2">Laci 2</option>
            <option value="Laci3">Laci 3</option>
            <option value="Laci4">Laci 4</option>
          </select>
        </div>
          
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ArsipBalom;
