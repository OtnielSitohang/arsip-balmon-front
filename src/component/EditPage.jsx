import React from 'react';
import EditDataPage from '../pages/EditDataPage'; // Ubah path sesuai dengan struktur proyek Anda
import { useLocation } from 'react-router-dom';

const EditPage = () => {
  // Mendapatkan data yang akan diedit dari location.state
  const location = useLocation();
  const { dataToEdit, handleSave, handleCancel } = location.state;

  return (
    <div>
      {/* Menampilkan judul */}
      <h2>Edit Data</h2>

      {/* Menampilkan komponen EditDataPage untuk mengedit data */}
      <EditDataPage
        dataToEdit={dataToEdit}
        handleSave={handleSave} // Melewatkan handleSave method
        handleCancel={handleCancel} // Melewatkan handleCancel method
      />
    </div>
  );
}

export default EditPage;
