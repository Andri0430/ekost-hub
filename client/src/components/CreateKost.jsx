import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function CreateKost({ setShowCreate, kost, setKost }) {
  const typeKost = ["Pria", "Wanita", "Campuran"];
  const [notifikasi, setNotifikasi] = useOutletContext();
  const [addKost, setAddKost] = useState({
    kostName: "",
    kostPrice: "",
    qtyRoom: "",
    kostType: "",
    city: "",
    district: "",
    street: "",
  });

  const handleCreateKost = async () => {
    const response = await fetch("http://localhost:5000/api/Owner/add-kost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(addKost),
    });
    const data = await response.json();
    if (data.status === 200) {
      setNotifikasi({
        ...notifikasi,
        status: data.status,
        pesan: data.message,
      });
    } else {
      setNotifikasi({
        ...notifikasi,
        status: data.status,
        pesan: data.message,
      });
    }
  };

  return (
    <section className="flex fixed w-[50%] justify-center z-10 top-10">
      <form
        className="flex flex-col bg-white gap-6 border-2 border-gray-400 w-full shadow-xl p-5 rounded-md z-20"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateKost();
          console.log(addKost);
        }}
      >
        <h1 className="font-bold border-b-2 border-gray-700 w-full text-lg">
          Add Kost
        </h1>
        <div className="flex gap-3">
          <TextField
            label="Nama Kost"
            variant="outlined"
            className="w-[50%]"
            type="text"
            onChange={(e) => {
              setAddKost({ ...addKost, kostName: e.target.value });
            }}
            autoComplete="off"
            required
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={typeKost}
            renderInput={(params) => (
              <TextField {...params} label="Tipe Kost" />
            )}
            onChange={(_, newValue) =>
              setAddKost({ ...addKost, kostType: newValue })
            }
            required
            className="w-[50%]"
          />
        </div>
        <div className="flex gap-3">
          <TextField
            label="Jumlah Kamar"
            variant="outlined"
            className="w-[50%]"
            type="number"
            onChange={(e) => {
              setAddKost({ ...addKost, qtyRoom: e.target.value });
            }}
            autoComplete="off"
            required
          />
          <TextField
            label="Harga Kamar"
            variant="outlined"
            className="w-[50%]"
            type="number"
            onChange={(e) => {
              setAddKost({ ...addKost, kostPrice: e.target.value });
            }}
            autoComplete="off"
            required
          />
        </div>
        <p className="flex font-bold px-2">Alamat Kost</p>
        <div className="flex gap-3">
          <TextField
            label="Kota"
            variant="outlined"
            className="w-[50%]"
            type="text"
            onChange={(e) => {
              setAddKost({ ...addKost, city: e.target.value });
            }}
            autoComplete="off"
            required
          />
          <TextField
            label="Kecamatan"
            variant="outlined"
            className="w-[50%]"
            type="text"
            onChange={(e) => {
              setAddKost({ ...addKost, district: e.target.value });
            }}
            autoComplete="off"
            required
          />
        </div>
        <div className="flex gap-3">
          <TextField
            label="Jalan"
            variant="outlined"
            className="w-full"
            type="text"
            onChange={(e) => {
              setAddKost({ ...addKost, street: e.target.value });
            }}
            autoComplete="off"
            required
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outlined"
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setShowCreate(false);
              handleCreateKost();
            }}
            type="submit"
          >
            Simpan
          </Button>
        </div>
      </form>
    </section>
  );
}
