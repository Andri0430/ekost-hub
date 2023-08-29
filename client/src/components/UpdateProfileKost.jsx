import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";

export default function UpdateProfileKost({
  setShowUpdateProfileKost,
  profileKost,
  setProfileKost,
}) {
  const typeKost = ["Pria", "Wanita", "Campuran"];
  const [notifikasi, setNotifikasi] = useOutletContext();

  const handleUpdateKost = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Owner/update-kost",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileKost),
      }
    );
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
          handleUpdateKost();
        }}
      >
        <h1 className="font-bold border-b-2 border-gray-700 w-full text-lg">
          Update Profile Kost
        </h1>
        <div className="flex gap-3">
          <TextField
            label="Nama Kost"
            variant="outlined"
            className="w-[50%]"
            type="text"
            value={profileKost.namaKost}
            onChange={(e) => {
              setProfileKost({ ...profileKost, namaKost: e.target.value });
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
              setProfileKost({ ...profileKost, tipeKost: newValue })
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
              setProfileKost({ ...profileKost, sisa: e.target.value });
            }}
            autoComplete="off"
            value={profileKost.sisa}
            required
          />
          <TextField
            label="Harga Kamar"
            variant="outlined"
            className="w-[50%]"
            type="number"
            onChange={(e) => {
              setProfileKost({ ...profileKost, harga: e.target.value });
            }}
            autoComplete="off"
            value={profileKost.harga}
            required
          />
        </div>
        <p className="flex font-bold px-2">Alamat Kost</p>
        <div className="flex gap-3">
          <TextField
            label="Alamat Lengkap"
            variant="outlined"
            className="w-full"
            type="text"
            onChange={(e) => {
              setProfileKost({ ...profileKost, alamat: e.target.value });
            }}
            autoComplete="off"
            value={profileKost.alamat}
            required
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              setShowUpdateProfileKost(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateKost();
              setShowUpdateProfileKost(false);
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
