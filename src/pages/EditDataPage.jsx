import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Api from '../API/InserAPI'; // Pastikan impor Api dari lokasi yang benar
import { useNavigate } from 'react-router-dom';
import SidebarComponent from "../component/sideBar/sidebar";
import config from '../config'; // Impor config dari file yang benar

const EditDataPage = ({ dataToEdit }) => {
  const history = useNavigate();

  const [uraian_informasi, seturaian_informasi] = useState(dataToEdit.uraian_informasi);
  const [uraian_isi, seturaian_isi] = useState(dataToEdit.uraian_isi);
//   const [kurun_waktu, setkurun_waktu] = useState(dataToEdit.kurun_waktu);
  const [jumlah_lembar, setjumlah_lembar] = useState(dataToEdit.jumlah_lembar);
  const [lokasi, setLokasi] = useState(dataToEdit.lokasi);
  const [tingkat_perkembangan, settingkat_perkembangan] = useState(dataToEdit.tingkat_perkembangan);
console.log(dataToEdit);
const handleSave = async () => {
    try {
      const response = await fetch(`${config.apiUrl}editSurat/${dataToEdit.nomor_urut}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uraian_informasi,
            uraian_isi,
            // kurun_waktu,
            jumlah_lembar,
            lokasi,
            tingkat_perkembangan
        }),
    });
    console.log(response);
  
      if (response) {
        const { success, message, error } = response;
  
        if (response.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message || 'Data updated successfully!',
          }).then(() => {
            history('/ShowData');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error: ${error ? error.message : 'Unknown error'}`,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Unexpected or undefined response',
        });
      }
    } catch (error) {
        console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Error during API request',
    });
}
};

  const handleCancel = () => {
    history('/ShowData');
  };

  return (
    <div className="container">
      <SidebarComponent />
      <h1>Edit Data</h1>

      <div className="form-group">
  <label>Kode Klasifikasi</label>
  <input
    type="text"
    value={dataToEdit.kode_klasifikasi}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
  <label>Aktif</label>
  <input
    type="text"
    value={dataToEdit.aktif}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
  <label>Inaktif</label>
  <input
    type="text"
    value={dataToEdit.inaktif}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
  <label>Keterangan</label>
  <input
    type="text"
    value={dataToEdit.keterangan}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
  <label>Klasifikasi Keamanan</label>
  <input
    type="text"
    value={dataToEdit.klasifikasi_keamanan}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
  <label>Tingkat Akses</label>
  <input
    type="text"
    value={dataToEdit.tingkat_akses}
    disabled // agar tidak bisa diedit
  />
</div>

<div className="form-group">
        <label>Kurun Waktu</label>
        <input
          type="text"
          value={dataToEdit.kurun_waktu}
          disabled
        />
      </div>

      <div className="form-group">
        <label>Uraian Informasi</label>
        <input
          type="text"
          value={uraian_informasi}
          onChange={(e) => seturaian_informasi(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Uraian Isi</label>
        <input
          type="text"
          value={uraian_isi}
          onChange={(e) => seturaian_isi(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Jumlah Lembar</label>
        <input
          type="number"
          value={jumlah_lembar}
          onChange={(e) => setjumlah_lembar(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Lokasi</label>
        <input
          type="text"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tingkat_perkembangan">Tingkat Perkembangan</label>
        <select
          id="tingkat_perkembangan"
          value={tingkat_perkembangan}
          onChange={(e) => settingkat_perkembangan(e.target.value)}
          style={{ width: '100%', padding: '0.8rem' }}
        >
          <option value="Asli">Asli</option>
          <option value="Fotocopy">Fotocopy</option>
          <option value="Asli dan Fotocopy">Asli dan Fotocopy</option>
        </select>
      </div>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditDataPage;
