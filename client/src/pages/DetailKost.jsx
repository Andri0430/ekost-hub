import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { api } from "../utils";
import { useContext } from "react";
import { AccountContex } from "../App";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MdEmail, MdPhone } from "react-icons/md";
import { BiSolidDoorOpen } from "react-icons/bi";
import Payment from "../components/Payment";

export default function DetailKost() {
  const { id } = useParams();
  const [detailKost, setDetailKost] = useState();
  const [favorit, setFavorit] = useState([]);
  const { user } = useContext(AccountContex);
  const [userFavorit, setUserFavorit] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [booking, setBooking] = useState({
    idKost: "",
    email: "",
    tanggalMasuk: "",
    lamaKost: "",
    biaya: "",
  });
  const [namaKost, setNamaKost] = useState("");
  const bulan = ["1 Bulan", "3 Bulan", "6 Bulan"];

  useEffect(() => {
    const response = api(`/Kost/id?id=${id}`);
    response.then((kost) => {
      setDetailKost(kost);
      setFavorit(kost.favorits);
    });
  }, [id]);

  useEffect(() => {
    const found = favorit.some((f) => f.email === user.email);
    setUserFavorit(found);
  }, [favorit, user.email]);

  const handleAddFavorit = () => {
    api("/Favorit/kos", "POST", id).then((response) => {
      if (response.status === 200) {
        setUserFavorit(true);
      }
    });
  };

  const handleDeleteFavorit = async () => {
    const response = await fetch("http://localhost:5000/api/Favorit", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    if (response.status === 200) {
      setUserFavorit(false);
    }
  };
  return (
    <main className="flex flex-col w-full py-3  min-h-screen items-start lg:flex-row lg:px-10">
      {showPayment && (
        <Payment
          setShowPayment={setShowPayment}
          showPayment={showPayment}
          booking={booking}
          namaKost={namaKost}
        />
      )}
      {detailKost && (
        <div
          className="flex flex-col justify-center w-full px-7 lg:px-3"
          key={detailKost.id}
        >
          <img
            src={`http://localhost:5000/uploads/${detailKost.kostImage}`}
            alt={detailKost.kostName}
            className="w-full rounded-sm lg:rounded-lg"
          />
          <div className="flex flex-col w-full justify-center text-gray-900 text-2xl p-2 font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            <p>{detailKost.kostName}</p>
            <p className="text-xl text-gray-700 sm:text-2xl md:text-3xl">
              {detailKost.kostAdress}
            </p>
          </div>
          <div className="flex flex-col w-full text-gray-900 p-2 justify-center text-md gap-2 sm:text-xl md:text-2xl lg:gap-8">
            <p className="border w-fit border-gray-700 rounded-sm p-1 font-bold">
              {detailKost.kostType}
            </p>
            <div className="flex items-center border-b py-3 font-bold gap-4 lg:gap-10">
              <div className="flex items-center gap-1">
                <BiSolidDoorOpen />
                <p>Tersisa : {detailKost.qtyRoom}</p>
              </div>
              <button
                className={`${
                  userFavorit ? "text-green-600" : "text-gray-800"
                } flex items-center gap-1 rounded-md hover:bg-gray-200 p-1`}
                onClick={() => {
                  userFavorit ? handleDeleteFavorit() : handleAddFavorit();
                }}
              >
                <BsFillBookmarkHeartFill />
                <span>Simpan</span>
              </button>
            </div>
            <div className="flex flex-col border-b py-1 gap-1 sm:text-lg md:text-xl lg:gap-3">
              <p className="font-bold text-lg md:text-2xl">Pemilik Kos</p>
              <div className="flex flex-col">
                <span className="flex gap-2 items-center">
                  <MdEmail />
                  <p>{detailKost.pemilikKost.email}</p>
                </span>
                <span className="flex gap-2 items-center">
                  <MdPhone />
                  <p>{detailKost.pemilikKost.phoneNumber}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col border-b py-1 gap-1 md:text-xl lg:gap-3">
              <p className="font-bold text-lg md:text-2xl">Deskripsi</p>
              <p className="text-justify">{detailKost.description}</p>
            </div>
            <div className="flex flex-col border-b py-1 gap-1 md:text-xl lg:gap-3">
              <p className="font-bold text-lg md:text-2xl">Fasilitas Kamar</p>
              {detailKost.fasilitasKamar.map((fk) => (
                <p key={fk.id}>{fk.namaFasilitas}</p>
              ))}
            </div>
            <div className="flex flex-col border-b py-1 gap-1 md:text-xl lg:gap-3">
              <p className="font-bold text-lg md:text-2xl">Fasilitas Toilet</p>
              {detailKost.fasilitasToilet.map((ft) => (
                <p key={ft.id}>{ft.namaFasilitas}</p>
              ))}
            </div>
            <div className="flex flex-col border-b py-1 gap-1 md:text-xl">
              <p className="font-bold text-lg md:text-2xl">Fasilitas Umum</p>
              {detailKost.fasilitasUmum.map((fu) => (
                <p key={fu.id}>{fu.namaFasilitas}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      {detailKost && (
        <div className="flex p-2 text-xl w-full items-center justify-between sticky bottom-0 bg-white border-t-2 py-3 lg:hidden">
          <div className="flex md:text-2xl items-center">
            <span className="font-bold">
              Rp.{detailKost.kostPrice.toLocaleString("id")}
            </span>
            <span>/Bulan</span>
          </div>
          <button className="font-bold px-3 bg-gray-700 py-2 flex items-center text-white rounded-md">
            Ajukan Sewa
          </button>
        </div>
      )}
      {detailKost && (
        <form
          className="hidden w-[450px] items-start shadow-lg p-4 border-2 rounded-lg sticky top-[86px] lg:flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setNamaKost(detailKost.kostName);
            setShowPayment(true);
          }}
        >
          <div className="flex items-center">
            <span className="font-bold text-2xl">
              Rp.{detailKost.kostPrice.toLocaleString("id")}
            </span>
            <span>/Bulan</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold">Mulai Kost :</p>
            <input
              type="date"
              className="border-2 border-gray-800 p-2 rounded-md w-full"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  tanggalMasuk: e.target.value,
                  email: user.email,
                  idKost: detailKost.idKost,
                  biaya: detailKost.kostPrice,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold">Mulai Kost :</p>
            <Autocomplete
              required
              id="combo-box-demo"
              options={bulan}
              renderInput={(params) => (
                <TextField {...params} placeholder="Per Bulan" />
              )}
              className="w-full"
              onChange={(_, newValue) =>
                setBooking({ ...booking, lamaKost: newValue })
              }
            />
          </div>
          <button className="font-bold border-2 border-gray-800 w-full p-2 flex items-center justify-center rounded-md hover:bg-gray-800 hover:text-white">
            Ajukan Sewa
          </button>
        </form>
      )}
    </main>
  );
}
