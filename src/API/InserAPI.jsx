import axios from 'axios';
import config from '../config';

class Api {
  static async fetchData(kode_klasifikasi) {
    try {
      const response = await axios.post(`${config.apiUrl}/cariData`, {
        kode_arsip: kode_klasifikasi,
      });
      
  
      if (response.data.message === 'Data ditemukan') {
        const fetchedData = response.data.data;
  
        if (fetchedData) {
          // Check and set default values if needed
          const aktifValue = fetchedData.aktif || 'Data belum diset';
          const inaktifValue = fetchedData.inaktif || 'Data belum diset';
          const keteranganValue = fetchedData.keterangan || 'Data belum diset';
  
          return {
            data: {
              ...fetchedData,
              aktif: aktifValue,
              inaktif: inaktifValue,
              keterangan: keteranganValue,
            },
            message: 'Data ditemukan.',
          };
        } else {
          return {
            data: null,
            message: 'Data tidak ditemukan.',
            error: 'Data structure from the server is not as expected.',
          };
        }
      } else {
        return {
          data: null,
          message: '',
          error: response.data.message,
        };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: null,
        message: '',
        error: 'Data tidak Valid',
      };
    }
  }
  

  static async insertData(arsipData) {
    try {
      console.log('Request payload:', arsipData);

      const insertResponse = await axios.post(`${config.apiUrl}insertBerkasSurat`, arsipData);
      console.log(insertResponse);
      if (insertResponse.data.success) {
        return {
          success: true,
          message: 'Rekap berhasil dilakukan.',
        };
      } else {
        return {
          success: false,
          message: insertResponse.data.message || 'Gagal melakukan rekap. Silakan coba lagi.',
        };
      }
    } catch (error) {
      console.error('Error during rekap:', error);
      console.error('Server responded with:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);

      return {
        success: false,
        message: 'Gagal melakukan rekap. Silakan coba lagi.',
      };
    }
  }
  
  static async updateSurat(nomor_surat, editedData) {
    try {
      console.log("rest");
      const response = await fetch(`${config.apiUrl}editSurat/${nomor_surat}`, {
        method: 'POST', // Metode permintaan adalah POST
        headers: {
          'Content-Type': 'application/json', // Header Content-Type untuk mengindikasikan tipe konten yang dikirim
        },
        body: JSON.stringify(editedData), // Mengonversi data yang akan dikirim menjadi JSON
      });
      console.log(response);
      
      // Mengonversi respons fetch menjadi objek JSON
      const responseData = await response.json();

      return responseData; // Mengembalikan respons dari server
    } catch (error) {
      throw error;
    }
  }
}

export default Api;
