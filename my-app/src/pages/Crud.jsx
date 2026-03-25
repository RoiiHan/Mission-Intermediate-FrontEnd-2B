import { useState, useEffect } from "react";
import "../styling/Crud.css";
import InputField from "../components/InputField";
import {Link} from "react-router-dom";


function Crud() {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Ambil data dari localStorage
  useEffect(() => {
    const data = localStorage.getItem("dataKaryawan");
    if (data) {
      setList(JSON.parse(data));
    }
  }, []);

  //  CREATE
  const handleAdd = () => {
    if (!nama || !jabatan) return;

    const newData = {
      id: Date.now(),
      nama,
      jabatan,
    };

    const updatedList = [...list, newData];
    setList(updatedList);

    localStorage.setItem("dataKaryawan", JSON.stringify(updatedList));

    setNama("");
    setJabatan("");
  };

  // DELETE
  const handleDelete = (id) => {
    const filtered = list.filter((item) => item.id !== id);
    setList(filtered);

    localStorage.setItem("dataKaryawan", JSON.stringify(filtered));
  };

  // EDIT
  const handleEdit = (item) => {
    setNama(item.nama);
    setJabatan(item.jabatan);
    setEditId(item.id);
  };

  //  UPDATE
  const handleUpdate = () => {
    const updated = list.map((item) =>
      item.id === editId ? { ...item, nama, jabatan } : item
    );

    setList(updated);
    localStorage.setItem("dataKaryawan", JSON.stringify(updated));

    setEditId(null);
    setNama("");
    setJabatan("");
  };

  return (
    <div className="container-crud">
      <h1>CRUD Karyawan</h1>

      <div className="crud-content">
        <div className="crud-form">
          <InputField
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <InputField
            placeholder="Jabatan"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
          />

          <button onClick={editId ? handleUpdate : handleAdd}>
            {editId ? "Update" : "Tambah"}
          </button>
        </div>

        <div className="list-data">
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                {item.nama} - {item.jabatan}

                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/homepage">
          <button>Kembali Kehalaman Homepage </button>
        </Link>
      </div>
    </div>
  );
}

export default Crud;