import React from 'react';

class FormData extends React.Component {
  render() {
    const { data, uraian_informasi, uraian_isi, kurun_waktu, folder, lokasi, tingkatPerkembangan, jumlah_lembar } = this.props;

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
          <label>URAIAN INFORMASI BERKAS/INDEKS</label>
          <input
            type="text"
            value={uraian_informasi}
            onChange={(e) => this.props.seturaian_informasi(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>JUMLAH FOLDER</label>
          <input
            type="number"
            value={folder}
            onChange={(e) => this.props.setFolder(e.target.value)}
            onKeyPress={(e) => {
              const isValidInput = /[0-9]/.test(e.key);
              if (!isValidInput) {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className="form-group">
          <label>NOMOR ISI BERKAS</label>
          <input
            type="text"
            value={uraian_isi}
            onChange={(e) => this.props.seturaian_isi(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>KURUN WAKTU</label>
          <input
            type="text"
            value={kurun_waktu}
            onChange={(e) => this.props.setkurun_waktu(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Jumlah Lembar</label>
          <input
            type="number"
            value={jumlah_lembar}
            onChange={(e) => this.props.setjumlah_lembar(e.target.value)}
            onKeyPress={(e) => {
              const isValidInput = /[0-9]/.test(e.key);
              if (!isValidInput) {
                e.preventDefault();
              } 
            }}
          />
        </div>

        <select
          id="tingkatPerkembangan"
          value={tingkatPerkembangan}
          onChange={(e) => this.props.setTingkatPerkembangan(e.target.value)}
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


        <div className="form-group">
          <label htmlFor="lokasi">Lokasi Laci</label>
          <select
            id="lokasi"
            value={lokasi}
            onChange={(e) => this.props.setLokasi(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>
              Pilih Lokasi Laci
            </option>
            <option value="Laci 1">Laci 1</option>
            <option value="Laci 2">Laci 2</option>
            <option value="Laci 3">Laci 3</option>
            <option value="Laci 4">Laci 4</option>
          </select>
        </div>

        <div className="form-group">
          <label>AKTIF</label>
          <input type="text" value={data.aktif} readOnly />
        </div>

        <div className="form-group">
          <label>INAKTIF</label>
          <input type="text" value={data.inaktif} readOnly />
        </div>

        <div className="form-group">
          <label>KETERANGAN</label>
          <input type="text" value={data.keterangan} readOnly />
        </div>

        <div className="form-group">
          <label>KLASIFIKASI KEAMANAN</label>
          <input
            type="text"
            value={data.Klasifikasi_keamanan}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>TINGKAT AKSES</label>
          <input
            type="text"
            value={data.tingkat_akses}
            readOnly
          />
        </div>

        <button onClick={this.props.handleRekap}>Rekap</button>
      </div>
    );
  }
}

export default FormData;
