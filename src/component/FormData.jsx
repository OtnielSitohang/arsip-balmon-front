// FormData.js
import React from 'react';

class FormData extends React.Component {
  render() {
    const { data, uraian_berkas, jumlahFolder, nomorIsiBerkas, uraian_isi, kurun_waktu, jumlah_lembar, perkembangan, lokasi_laci, aktif, inaktif, keterangan, tanggalDiinput, folder } = this.props;

    return (
      <div>
        <h2>Data Ditemukan</h2>

        <div className="form-group">
          <label>KODE KLASIFIKASI</label>
          <input type="text" value={data.kode_arsip} readOnly />
        </div>

        <div className="form-group">
          <label>JENIS ARSIP:</label>
          <input type="text" value={data.Jenis_arsip} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="Uraian">URAIAN INFORMASI BERKAS/INDEKS</label>
          <textarea
            id="Uraian"
            value={uraian_berkas}
            onChange={(e) => this.props.setUraianBerkas(e.target.value)}
            required
            className="form-control"
            placeholder={'Write Here'}
          ></textarea>
          {uraian_berkas === '' && (
            <p style={{ color: 'red' }}>Uraian Informasi tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="Uraian">JUMLAH FOLDER</label>
          <input
            id="Uraian"
            type="number"
            value={jumlahFolder}
            onChange={(e) => this.props.setJumlahFolder(e.target.value)}
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
          {jumlahFolder === '' && (
            <p style={{ color: 'red' }}>Jumlah Folder tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="Uraian">NOMOR ISI BERKAS</label>
          <input
            id="Uraian"
            type="text"
            value={nomorIsiBerkas}
            onChange={(e) => this.props.setNomorIsiBerkas(e.target.value)}
            required
            className="form-control"
            placeholder={'Isi Berkas'}
          />
          {nomorIsiBerkas === '' && (
            <p style={{ color: 'red' }}>Nomor Isi Berkas tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="uraian_isi">URAIAN / ISI</label>
          <textarea
            id="uraian_isi"
            value={uraian_isi}
            onChange={(e) => this.props.setUraianIsi(e.target.value)}
            required
            className="form-control"
            placeholder={'Write Here'}
          ></textarea>
          {uraian_isi === '' && (
            <p style={{ color: 'red' }}>Uraian Informasi tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="kurun_waktu">KURUN WAKTU</label>
          <input
            id="kurun_waktu"
            type="number"
            value={kurun_waktu}
            onChange={(e) => this.props.setKurunWaktu(e.target.value)}
            onKeyPress={(e) => {
              const isValidInput = /[0-9]/.test(e.key);
              if (!isValidInput) {
                e.preventDefault();
              }
            }}
            required
            className="form-control"
            placeholder={'Kurun Waktu'}
          />
          {kurun_waktu === '' && (
            <p style={{ color: 'red' }}>KURUN WAKTU tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tingkat_perkembangan">Tingkat Perkembangan</label>
          <select
            id="tingkat_perkembangan"
            value={perkembangan}
            onChange={(e) => this.props.setPerkembangan(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>
              Pilih Tingkat Perkembangan
            </option>
            <option value="Asli">Asli</option>
            <option value="Fotocopy">Fotocopy</option>
            <option value="Asli dan Fotocopy">Asli dan Fotocopy</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jumlah_lembar">JUMLAH LEMBAR</label>
          <input
            id="jumlah_lembar"
            type="number"
            value={jumlah_lembar}
            onChange={(e) => this.props.setJumlahLembar(e.target.value)}
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
          {jumlah_lembar === '' && (
            <p style={{ color: 'red' }}>KURUN WAKTU tidak boleh kosong</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lokasi_laci">Lokasi Laci</label>
          <select
            id="lokasi_laci"
            value={lokasi_laci}
            onChange={(e) => this.props.setLokasiLaci(e.target.value)}
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

        <div className="form-group">
          <label htmlFor="Folder">FOLDER</label>
          <input
            id="Folder"
            type="text"
            value={folder}
            onChange={(e) => this.props.setFolder(e.target.value)}
            required
            className="form-control"
            placeholder={'Folder'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Aktif">AKTIF</label>
          <input
            id="Aktif"
            type="text"
            value={aktif}
            onChange={(e) => this.props.setAktif(e.target.value)}
            required
            className="form-control"
            placeholder={'Aktif'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Inaktif">INAKTIF</label>
          <input
            id="Inaktif"
            type="text"
            value={inaktif}
            onChange={(e) => this.props.setInaktif(e.target.value)}
            required
            className="form-control"
            placeholder={'Inaktif'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Keterangan">KETERANGAN</label>
          <input
            id="Keterangan"
            type="text"
            value={keterangan}
            onChange={(e) => this.props.setKeterangan(e.target.value)}
            required
            className="form-control"
            placeholder={'Keterangan'}
          />
        </div>

        <div className="form-group">
          <label>KLASIFIKASI KEAMANAN:</label>
          <input type="text" value={data.Klasifikasi_keamanan} readOnly />
        </div>

        <div className="form-group">
          <label>TINGKAT AKSES:</label>
          <input type="text" value={data.tingkat_akses} readOnly />
        </div>

        

        <button
          onClick={this.props.handleRekap}
          style={{ display: 'flex', alignItems: 'center', padding: '10px' }}
        >
          Rekap
        </button>
      </div>
    );
  }
}

export default FormData;
