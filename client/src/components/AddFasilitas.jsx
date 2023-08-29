import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function AddFasilitas({
  setShowFasilitas,
  tipeFasilitas,
  fasilitas,
  setFasilitas,
}) {
  const [notifikasi, setNotifikasi] = useOutletContext();
  const [fasilitasKamar, setFasilitasKamar] = useState([]);
  const [fasilitasToilet, setFasilitasToilet] = useState([]);
  const [fasilitasUmum, setFasilitasUmum] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Facility/room-facility")
      .then((response) => {
        setFasilitasKamar(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Facility/toilet-facility")
      .then((response) => {
        setFasilitasToilet(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Facility/general-facility")
      .then((response) => {
        setFasilitasUmum(response.data);
      });
  }, []);

  const handleFasilitasKamar = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Facility/RoomFacility",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fasilitas),
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

  const handleFasilitasToilet = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Facility/ToiletFacility",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fasilitas),
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

  const handleFasilitasGeneral = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Facility/GeneralFacility",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fasilitas),
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
          if (tipeFasilitas === "Fasilitas Kamar") {
            handleFasilitasKamar();
          } else if (tipeFasilitas === "Fasilitas Toilet") {
            handleFasilitasToilet();
          } else if (tipeFasilitas === "Fasilitas Umum") {
            handleFasilitasGeneral();
          }
        }}
      >
        <h1 className="font-bold border-b-2 border-gray-700 w-full text-lg">
          Add Fasilitas
        </h1>
        <div className="flex gap-3">
          {tipeFasilitas === "Fasilitas Kamar" && (
            <Autocomplete
              className="w-full"
              disablePortal
              id="combo-box-demo"
              options={fasilitasKamar}
              getOptionLabel={(option) => option.namaFasilitas}
              renderInput={(params) => (
                <TextField {...params} label="Fasilitas Kamar" />
              )}
              onChange={(_, newValue) => {
                if (newValue) {
                  setFasilitas({ ...fasilitas, idFasilitas: newValue.id });
                }
              }}
            />
          )}

          {tipeFasilitas === "Fasilitas Toilet" && (
            <Autocomplete
              className="w-full"
              disablePortal
              id="combo-box-demo"
              options={fasilitasToilet}
              getOptionLabel={(option) => option.namaFasilitas}
              renderInput={(params) => (
                <TextField {...params} label="Fasilitas Toilet" />
              )}
              onChange={(_, newValue) => {
                if (newValue) {
                  setFasilitas({ ...fasilitas, idFasilitas: newValue.id });
                }
              }}
            />
          )}

          {tipeFasilitas === "Fasilitas Umum" && (
            <Autocomplete
              className="w-full"
              disablePortal
              id="combo-box-demo"
              options={fasilitasUmum}
              getOptionLabel={(option) => option.namaFasilitas}
              renderInput={(params) => (
                <TextField {...params} label="Fasilitas Umum" />
              )}
              onChange={(_, newValue) => {
                if (newValue) {
                  setFasilitas({ ...fasilitas, idFasilitas: newValue.id });
                }
              }}
            />
          )}
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              setShowFasilitas(false);
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setShowFasilitas(false);

              if (tipeFasilitas === "Fasilitas Kamar") {
                handleFasilitasKamar();
              } else if (tipeFasilitas === "Fasilitas Toilet") {
                handleFasilitasToilet();
              } else if (tipeFasilitas === "Fasilitas Umum") {
                handleFasilitasGeneral();
              }
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
