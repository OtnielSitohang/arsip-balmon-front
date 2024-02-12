import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const DisplayData = ({ data, handleEdit }) => {
  if (!Array.isArray(data)) {
    return <p>Data is not in the expected format</p>;
  }

  const formatDate = (inputDate) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="table-container">
      <table border="1">
        <thead>
          <tr>
            <th>Nomor Urut</th>
            <th>Nomor Berkas</th>
            <th>Kode Klasifikasi</th>
            <th>Uraian Informasi</th>
            <th>Folder</th>
            <th>Uraian Isi</th>
            <th>Kurun Waktu</th>
            <th>Tingkat Perkembangan</th>
            <th>Jumlah</th>
            <th>Lokasi</th>
            <th>Aktif</th>
            <th>Inaktif</th>
            <th>Keterangan</th>
            <th>Klasifikasi Keamanan</th>
            <th>Tingkat Akses</th>
            <th>Tanggal Diinput</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.nomor_urut}</td>
              <td>{item.nomor_berkas}</td>
              <td>{item.kode_klasifikasi}</td>
              <td>{item.uraian_informasi}</td>
              <td>{item.folder} folder</td>
              <td>{item.uraian_isi}</td>
              <td>{item.kurun_waktu}</td>
              <td>{item.tingkat_perkembangan}</td>
              <td>{item.jumlah_lembar} lembar</td>
              <td>{item.lokasi}</td>
              <td>{item.aktif}</td>
              <td>{item.inaktif}</td>
              <td>{item.keterangan}</td>
              <td>{item.klasifikasi_keamanan}</td>
              <td>{item.tingkat_akses}</td>
              <td>{formatDate(item.tanggal_diinput)}</td>
              <td>
                <button>
                  <FontAwesomeIcon icon={faPlus} /> Tambah
                </button>
                <button onClick={() => handleEdit(item)}> {/* Menggunakan handleEdit untuk memulai pengeditan */}
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;


const navigateToShowData = () => {
  history.push('/ShowData');
};
