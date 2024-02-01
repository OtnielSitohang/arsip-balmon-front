import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const DisplayData = ({ data }) => {
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
            <th>Urutan Input</th>
            <th>Kode Klasifikasi</th>
            <th>Uraian Berkas</th>
            <th>Jumlah Folder</th>
            <th>No. Isi Berkas</th>
            <th>Uraian Isi</th>
            <th>Kurun Waktu</th>
            <th>Tingkat Perkembangan</th>
            <th>Jumlah Lembar</th>
            <th>Lokasi Laci</th>
            <th>Folder</th>
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
              <td>{item.urutan_input}</td>
              <td>{item.kode_klasifikasi}</td>
              <td>{item.uraian_berkas}</td>
              <td>{item.jumlah_folder}</td>
              <td>{item.no_isi_berkas}</td>
              <td>{item.uraian_isi}</td>
              <td>{item.kurun_waktu}</td>
              <td>{item.tingkat_perkembangan}</td>
              <td>{item.jumlah_lembar}</td>
              <td>{item.lokasi_laci}</td>
              <td>{item.folder}</td>
              <td>{item.aktif}</td>
              <td>{item.inaktif}</td>
              <td>{item.keterangan}</td>
              <td>{item.klasifikasi_keamanan}</td>
              <td>{item.tingkat_akses}</td>
              <td>{formatDate(item.tanggal_diinput)}</td>
              <button>
                  <FontAwesomeIcon icon={faPlus} /> Tambah
                </button>
                <button>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
