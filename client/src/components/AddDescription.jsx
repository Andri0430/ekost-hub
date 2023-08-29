import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";

export default function AddDescription({
  showDescription,
  setShowDescription,
  description,
  setDescription,
}) {
  const [notifikasi, setNotifikasi] = useOutletContext();

  const handleDescription = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Owner/kos/deskripsi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(description),
      }
    );
    const data = await response.json();
    console.log(data);
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
          handleDescription();
        }}
      >
        <h1 className="font-bold border-b-2 border-gray-700 w-full text-lg">
          Add Description
        </h1>
        <div className="flex gap-3">
          <TextField
            fullWidth
            label="Description"
            id="fullWidth"
            required
            value={description.description}
            onChange={(e) =>
              setDescription({ ...description, description: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outlined"
            onClick={(e) => {
              setShowDescription(false);
              console.log(description);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setShowDescription(false);
              handleDescription();
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
