import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Kost() {
  const [kost, setKost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Kost")
      .then((response) => response.json())
      .then((kost) => setKost(kost));
  }, []);

  return (
    <main className="flex text-gray-800 py-1 gap-8 bg-gray-50 min-h-fit justify-center flex-wrap">
      {kost.map((kost) => (
        <Link
          to={`/kost/${kost.id}`}
          key={kost.id}
          className="flex flex-col gap-3 p-2 shadow-xl rounded-xl bg-white h-[296px] justify-center hover:bg-gray-100 hover:cursor-pointer w-[256px]"
        >
          <img src={kost.gambar} alt={kost.kostName} className="w-fit" />
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold">{kost.kostName}</h1>
            <p className="border-2 w-[82px] text-sm text-center rounded-md">
              {kost.typeKost}
            </p>
            <p className="text-sm">{kost.address}</p>
            <span className="flex">
              <p className="font-bold">Rp.{kost.price.toLocaleString("id")}</p>
              <p>/bulan</p>
            </span>
          </div>
        </Link>
      ))}
    </main>
  );
}
