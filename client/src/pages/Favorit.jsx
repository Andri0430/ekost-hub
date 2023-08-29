import { useEffect } from "react";
import { api } from "../utils";
import { useState } from "react";
import { useContext } from "react";
import { AccountContex } from "../App";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Favorit() {
  const { user } = useContext(AccountContex);
  const [dataFavorit, setDataFavorit] = useState([]);

  useEffect(() => {
    const response = api(`/Favorit?email=${user.email}`);
    response.then((favorit) => {
      setDataFavorit(favorit);
    });
  }, [user.email]);

  const fetchData = async () => {
    try {
      const response = await api(`/Favorit?email=${user.email}`);
      setDataFavorit(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user.email]);

  const handleDeleteFavorit = async (idKos) => {
    const response = await fetch("http://localhost:5000/api/Favorit", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(idKos),
    });
    fetchData();
  };

  if (dataFavorit.length !== 0) {
    return (
      <main className="flex flex-col w-full min-h-screen items-center text-gray-700 p-4 px-24 gap-3">
        <div className="flex bg-gray-200 rounded-md sm:w-full lg:w-[60%]">
          <h1 className="font-bold text-4xl border-b-4 w-full p-2">Favorit</h1>
        </div>
        <div className="flex flex-col gap-3 items-center w-[60%] hover:cursor-pointer sm:w-full lg:w-[60%]">
          {dataFavorit.map((favorit) => (
            <Link
              key={favorit.idKos}
              className="flex w-full p-2 shadow-md border-2 rounded-lg gap-4"
              to={`/kost/${favorit.idKos}`}
            >
              <div className="flex gap-4 w-fit">
                <img
                  src={`http://localhost:5000/Uploads/${favorit.gambarKost}`}
                  alt={favorit.namaKost}
                  className="w-[20%] rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <h1 className="text-xl font-bold">{favorit.namaKost}</h1>
                  <p className="border-2 w-fit font-bold rounded-md">
                    {favorit.typeKost}
                  </p>
                  <p>Rp.{favorit.hargaKost.toLocaleString("id")}</p>
                </div>
              </div>
              <div className="flex items-center text-3xl hover:text-red-600">
                <MdDelete
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteFavorit(favorit.idKos);
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex flex-col w-full min-h-[70vh] items-center text-gray-700 p-4 px-24 gap-20">
        <div className="flex w-[60%] bg-gray-200 rounded-md">
          <h1 className="font-bold text-4xl border-b-4 w-full p-2">Favorit</h1>
        </div>
        <div className="Flex p-4">
          <h1 className="text-4xl font-bold">Tidak Ada Favorit</h1>
        </div>
      </main>
    );
  }
}
