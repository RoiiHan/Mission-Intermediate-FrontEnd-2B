import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/homepage.css";
import preview from "/public/_PreviewBlock.png";
import InputField from "../components/InputField";

function HomePage() {
  const [inputNama, setInputNama] = useState("");
  const [nama, setNama] = useState("");
  const [dataKaryawan, setDataKaryawan] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNama(inputNama);
  };

  useEffect(() => {
    const data = localStorage.getItem("dataKaryawan");
    if (data) {
      setDataKaryawan(JSON.parse(data));
    }
  }, []);

  return (
    <section className="homepage">
      <div className="container">
        <div className="container-text">
          <div className="header">MOVIE STREAMING PLATFORM</div>
          <div className="deskrip">
            <p>Chill</p>
            Chill adalah aplikasi berbasis web yang dirancang untuk memberi pengguna akses ke library film dan acara TV yang luas dari perangkat mereka. Chill menawarkan antarmuka yang ramah pengguna yang memungkinkan pengguna mencari film dan acara TV, dan mulai menonton secara instan. Chill menawarkan rekomendasi hasil personalisasi berdasarkan kebiasaan menonton pengguna, membantu pengguna menemukan film dan acara TV baru yang mungkin tidak mereka temukan sebelumnya. Selain itu, Chill juga menawarkan konten orisinal, termasuk film dan acara TV, yang hanya dapat ditemukan di aplikasi Chill, menjadikannya sumber yang unik dan berharga bagi pengguna.
          </div>

          <Link to="/crud">
            <div className="link-crud">Pergi ke Halaman CRUD</div>
          </Link>
        </div>

        <div className="container-gambar">
          <h2>
            <img src={preview} alt="Preview" />
          </h2>
        </div>
      </div>

      <div className="container2">
        <div className="container2-nama">
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="Input Nama Anda"
              value={inputNama}
              onChange={(e) => setInputNama(e.target.value)}
            />

            <button type="submit">Selesai</button>
          </form>

          <h2>Selamat Datang, {nama}!</h2>
          <div className="data-karyawan">
            <h3>Data Karyawan:</h3>

            {dataKaryawan.length === 0 ? (
              <p>Belum ada data</p>
            ) : (
              dataKaryawan.map((item) => (
                <p key={item.id}>
                  {item.nama} - {item.jabatan}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;