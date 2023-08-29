import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import Setting from "../components/Setting";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Kost() {
  const [kost, setKost] = useState([]);
  const [openSetting, setOpenSetting] = useOutletContext();
  const [tipeKost, setTipeKost] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    async function fetchDataKost() {
      const response = await axios.get("http://localhost:5000/api/Kost");
      setKost(response.data);
    }
    fetchDataKost();
  }, []);
  const filteredKost = kost.filter((k) => k.kostType.includes(tipeKost));

  return (
    <main className="flex flex-col items-center min-h-[85vh] gap-2 md:p-2 lg:p-4 overflow-x-hidden lg:px-12">
      {openSetting && (
        <Setting
          openSetting={openSetting}
          setOpenSetting={setOpenSetting}
          tipeKost={tipeKost}
          setTipeKost={setTipeKost}
          harga={harga}
          setHarga={setHarga}
        />
      )}
      <section className="flex justify-center items-center gap-4 p-4 w-full lg:hidden">
        <LuSettings2
          size={24}
          className="hover:cursor-pointer"
          onClick={() => setOpenSetting(!openSetting)}
        />
        <form className="flex items-center p-2 hover:cursor-pointer gap-2 w-full">
          <input
            type="text"
            className=" h-[44px] rounded-md w-full shadow-md px-3 border"
            placeholder="Cari Kos"
          />
          <BiSearch className="text-2xl" />
        </form>
      </section>
      <section className="flex flex-col gap-2">
        {filteredKost.map((k) => (
          <Link
            key={k.id}
            className="flex gap-2 border-b-2 p-2 h-full hover:cursor-pointer hover:shadow-lg"
            to={`/kost/${k.id}`}
          >
            <img
              src={`http://localhost:5000/Uploads/${k.kostImage}`}
              alt={k.kostName}
              className="w-[35%] rounded-md lg:w-[24%]"
            />
            <div className="text-sm flex flex-col gap-1 w-full h-full p-2 sm:text-xl">
              <p className="border-2 border-gray-600 rounded-md flex justify-center w-fit px-2 font-bold lg:text-base">
                {k.kostType}
              </p>
              <p className="font-bold text-2xl">{k.kostName}</p>
              <p>{k.kostAdress}</p>
              {k.qtyRoom <= 3 && <p>Tersisa :{k.qtyRoom}</p>}
              <p className="flex justify-end items-end sm:h-14">
                <span className="font-bold">
                  Rp.{k.kostPrice.toLocaleString("id")}
                </span>
                <span>/Bulan</span>
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
