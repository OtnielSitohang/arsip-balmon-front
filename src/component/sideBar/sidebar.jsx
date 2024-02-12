import { useState } from "react";
import "./sidebar.css"; // Assuming you have a separate CSS file for app bar styling
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AppBarComponent = () => {
  const [isExpanded, setExpendState] = useState(false);

  const logout = () => {
    Swal.fire({
      title: "Apakah Anda Yakin Ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("USER");
        Swal.fire({
          title: "Sukses!",
          text: "Berhasil Logout!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    });
  };

  const gantiPassword = () => {
    // ... (unchanged)
  };

  return (
    <div className={isExpanded ? "app-bar-container" : "app-bar-container app-bar-container-NX"}>
      <div className="app-bar-upper">
        <div className="app-bar-heading">
          {isExpanded && (
            <div className="app-bar-brand">
              {/* <img src="../../src/assets/logo.svg" alt="Logo" /> */}
              <h2>
                <strong>ARSIP</strong>
              </h2>
            </div>
          )}
          <button className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"} onClick={() => setExpendState(!isExpanded)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {isExpanded && (
          <div className="app-bar-menu">
            {/* Adjust the styling for menu items */}
            <Link to="/Input">Rekap Data</Link>
            <Link to="/ShowData">Semua Data</Link>
            {/* <Link to="/jadwalUmum">Jadwal Umum</Link>
            <Link to="/jadwalHarian">Jadwal Harian</Link> */}
          </div>
        )}
      </div>
      <div className="app-bar-footer">
        {isExpanded && (
          <div className="app-bar-details">
            <img className="app-bar-avatar" onClick={() => gantiPassword()} src="../../src/assets/admin-avatar.svg" alt="Admin Avatar" />
            <div className="app-bar-info">
              <p className="app-bar-user-name">Arsip</p>
              <p className="app-bar-user-position">
                <strong>Anjay</strong>
              </p>
            </div>
          </div>
        )}
        <img onClick={logout} className="logout-icon" src="../../src/assets/logout.svg" alt="Logout" />
      </div>
    </div>
  );
};

export default AppBarComponent;
