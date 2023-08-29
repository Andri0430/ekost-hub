import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImManWoman, ImWoman, ImMan } from "react-icons/im";

export default function Setting({
  openSetting,
  setOpenSetting,
  tipeKost,
  setTipeKost,
  harga,
  setHarga,
}) {
  const [typeKost, setTypeKost] = useState([]);
  useEffect(() => {
    async function fetchDataKost() {
      const response = await axios.get("http://localhost:5000/api/TypeKost");
      setTypeKost(response.data);
    }
    fetchDataKost();
  }, []);

  return (
    <section className="flex flex-col p-6 border-spacing-2 w-[80%] shadow-xl rounded-lg gap-2 hover:cursor-pointer bg-white absolute pointer-events-auto sm:w-[65%] md:w-[40%]">
      <div className="flex justify-between w-full items-center text-2xl font-bold h-[24px] border-b-2 border-black py-6">
        <h1 className="w-[120%] flex justify-center">Filter</h1>
        <AiOutlineClose onClick={() => setOpenSetting(!openSetting)} />
      </div>
      <div className="flex flex-col gap-3 p-3 border-b-2">
        <div className="flex flex-col font-bold">
          <h2>Tipe Kost</h2>
        </div>
        <div className="flex justify-between gap-5">
          {typeKost.map((tk, i) => (
            <div
              key={i}
              className={`shadow-md p-2 flex justify-center items-center w-full border-2 font-bold rounded-md gap-1`}
              onClick={() => {
                setTipeKost(tk);
              }}
            >
              {tk === "Pria" && <ImMan size={22} />}
              {tk === "Wanita" && <ImWoman size={22} />}
              {tk === "Campuran" && <ImManWoman size={22} />}
              <span className="hidden md:block">{tk}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3 border-b-2">
        <div className="flex flex-col font-bold gap-3 text-sm">
          <h2>Harga</h2>
          <div className="flex justify-center gap-5 items-center">
            <div
              className={`shadow-md p-3 flex justify-center items-center w-[100px] border font-bold rounded-md gap-1 sm:w-[140px] pointer-events-auto`}
              onClick={() => {
                setHarga("Termurah");
              }}
            >
              Harga Termurah
            </div>
            <div
              className="shadow-md p-3 flex justify-center items-center w-[100px] border font-bold rounded-md gap-1 sm:w-[140px]"
              onClick={() => {
                setHarga("Termahal");
              }}
            >
              Harga Termahal
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-end">
        <button
          className="bg-gray-600 p-1 w-[100px] rounded-md font-bold text-white hover:shadow-lg"
          onClick={() => {
            setOpenSetting(!openSetting);
          }}
        >
          Cari
        </button>
      </div>
    </section>
  );
}
