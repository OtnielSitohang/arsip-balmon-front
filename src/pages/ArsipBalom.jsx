// pages/ArsipBalomPage.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Api from '../API/InserAPI';
import '../css/ArsipBalmon.css';
import DisplayData from '../component/DisplayData';

class ArsipBalomPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kodeArsip: '',
      data: null,
      uraian_berkas: '',
      jumlahFolder: '',
      nomorIsiBerkas: '',
      uraian_isi: '',
      kurun_waktu: '',
      jumlah_lembar: '',
      perkembangan: '',
      lokasi_laci: '',
      aktif: '',
      inaktif: '',
      keterangan: '',
      tanggalDiinput: '',
      folder: '',
      message: '',
      errorMessage: '',
    };
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.fetchData();
    }
  };

  fetchData = async () => {
    try {
      const response = await Api.fetchData(this.state.kodeArsip);
      const { data, message, error } = response;
      if (data) {
        this.setState({
          data,
          message,
          errorMessage: '',
          kodeArsip: data.kode_arsip || '',
          uraian_berkas: '',
          jumlahFolder: '',
          nomorIsiBerkas: '',
          uraian_isi: '',
          kurun_waktu: '',
          jumlah_lembar: data.jumlah_lembar || '',
          perkembangan: data.tingkat_perkembangan || '',
          lokasi_laci: data.lokasi_laci || '',
          aktif: data.aktif,
          inaktif: data.inaktif,
          keterangan: data.keterangan,
          tanggalDiinput: '',
          folder: '',
        });
      } else {
        this.setState({
          data: null,
          message,
          errorMessage: error || 'Data tidak ditemukan.',
          aktif: '',
          inaktif: '',
          keterangan: '',
        });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      this.setState({ errorMessage: 'Error during API request' });
    }
  };

  handleRekap = async () => {
    if (!this.validateFields()) {
      return;
    }

    try {
      const { data } = await Api.fetchData(this.state.kodeArsip);
      console.log('Data from fetchData:', data);

      const arsipData = {
        kode_klasifikasi: data?.kode_arsip || '',
        tingkat_akses: data?.tingkat_akses || '',
        uraian_berkas: this.state.uraian_berkas,
        jumlah_folder: this.state.jumlahFolder,
        no_isi_berkas: this.state.nomorIsiBerkas,
        uraian_isi: this.state.uraian_isi,
        kurun_waktu: this.state.kurun_waktu,
        tingkat_perkembangan: this.state.perkembangan,
        jumlah_lembar: this.state.jumlah_lembar,
        lokasi_laci: this.state.lokasi_laci,
        folder: this.state.folder,
        aktif: data?.aktif || '',
        inaktif: data?.inaktif || '',
        keterangan: data?.keterangan || '',
        klasifikasi_keamanan: data?.Klasifikasi_keamanan || '',
        tingkat_akses: data?.tingkat_akses || '',
        tanggal_diinput: new Date().toISOString(),
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
            this.setState({
              errorMessage: '',
              message: '',
              kodeArsip: '',
              data: null,
            });
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Error: ${error ? error.message : 'Unknown error'}`,
          }).then(() => {
            this.setState({ errorMessage: error && error.message ? error.message : 'Unknown error' });
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Unexpected or undefined response',
        }).then(() => {
          this.setState({ errorMessage: 'Unexpected or undefined response' });
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Error during API request',
      }).then(() => {
        console.error("API Request Error:", error);
        this.setState({ errorMessage: 'Error during API request' });
      });
    }
  };

  validateFields = () => {
    if (!this.state.uraian_berkas || !this.state.jumlahFolder || !this.state.nomorIsiBerkas ||
      !this.state.uraian_isi || !this.state.kurun_waktu || !this.state.jumlah_lembar ||
      !this.state.perkembangan || !this.state.lokasi_laci || !this.state.folder) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error!',
        text: 'Please fill in all required fields.',
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <div className="container">
        <h1>Data Arsip</h1>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={this.state.kodeArsip}
            onChange={(e) => this.setState({ kodeArsip: e.target.value })}
            onKeyPress={this.handleKeyPress}
            style={{
              marginRight: '10px',
              flex: '1',
              padding: '10px',
              borderRadius: '8px',
            }}
          />
          <button onClick={this.fetchData} style={{ padding: '10px', width: '30%' }}>
            <i className="fa fa-search" style={{ marginRight: '5px' }}></i> Cari
          </button>
        </div>

        <button
        style={{ marginLeft: '10px', padding: '10px' }}
        onClick={() => history.push('/ShowData')}  // Use history.push to navigate
      >
        Show All Data
      </button>

        {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}

        {this.state.data && (
          <DisplayData
            data={this.state.data}
            uraian_berkas={this.state.uraian_berkas}
            setUraianBerkas={(value) => this.setState({ uraian_berkas: value })}
            jumlahFolder={this.state.jumlahFolder}
            setJumlahFolder={(value) => this.setState({ jumlahFolder: value })}
            nomorIsiBerkas={this.state.nomorIsiBerkas}
            setNomorIsiBerkas={(value) => this.setState({ nomorIsiBerkas: value })}
            uraian_isi={this.state.uraian_isi}
            setUraianIsi={(value) => this.setState({ uraian_isi: value })}
            kurun_waktu={this.state.kurun_waktu}
            setKurunWaktu={(value) => this.setState({ kurun_waktu: value })}
            jumlah_lembar={this.state.jumlah_lembar}
            setJumlahLembar={(value) => this.setState({ jumlah_lembar: value })}
            perkembangan={this.state.perkembangan}
            setPerkembangan={(value) => this.setState({ perkembangan: value })}
            lokasi_laci={this.state.lokasi_laci}
            setLokasiLaci={(value) => this.setState({ lokasi_laci: value })}
            aktif={this.state.aktif}
            setAktif={(value) => this.setState({ aktif: value })}
            inaktif={this.state.inaktif}
            setInaktif={(value) => this.setState({ inaktif: value })}
            keterangan={this.state.keterangan}
            setKeterangan={(value) => this.setState({ keterangan: value })}
            tanggalDiinput={this.state.tanggalDiinput}
            setTanggalDiinput={(value) => this.setState({ tanggalDiinput: value })}
            folder={this.state.folder}
            setFolder={(value) => this.setState({ folder: value })}
            handleRekap={this.handleRekap}
          />
        )}
      </div>
    );
  }
}

export default ArsipBalomPage;
