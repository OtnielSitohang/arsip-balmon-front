// components/DisplayData.jsx
import React from 'react';

const DisplayData = ({ data }) => {
  return (
    <div>
      <h2>Data Fetched:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Urutan Input:</strong> {item.urutan_input} <br />
            <strong>Kode Klasifikasi:</strong> {item.kode_klasifikasi} <br />
            <strong>Uraian Berkas:</strong> {item.uraian_berkas} <br />
            <strong>Jumlah Folder:</strong> {item.jumlah_folder} <br />
            <strong>No. Isi Berkas:</strong> {item.no_isi_berkas} <br />
            <strong>Uraian Isi:</strong> {item.uraian_isi} <br />
            <strong>Kurun Waktu:</strong> {item.kurun_waktu} <br />
            <strong>Tingkat Perkembangan:</strong> {item.tingkat_perkembangan} <br />
            <strong>Jumlah Lembar:</strong> {item.jumlah_lembar} <br />
            <strong>Lokasi Laci:</strong> {item.lokasi_laci} <br />
            <strong>Folder:</strong> {item.folder} <br />
            <strong>Aktif:</strong> {item.aktif} <br />
            <strong>Inaktif:</strong> {item.inaktif} <br />
            <strong>Keterangan:</strong> {item.keterangan} <br />
            <strong>Klasifikasi Keamanan:</strong> {item.klasifikasi_keamanan} <br />
            <strong>Tingkat Akses:</strong> {item.tingkat_akses} <br />
            <strong>Tanggal Diinput:</strong> {item.tanggal_diinput} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
