import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";
import { BsChatLeftDots, BsBicycle } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { PiCubeDuotone, PiToiletDuotone } from "react-icons/pi";
import { MdOutlineBathtub } from "react-icons/md";
import { FaShower, FaMotorcycle } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";

export default function DetailKost() {
  const [kost, setKost] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/Kost/id?id=${id}`)
      .then((response) => response.json())
      .then((kost) => {
        setKost(kost);
      });
  }, [id]);
  return (
    <main className="flex w-full px-12 py-5 gap-3 text-gray">
      {kost && (
        <div key={kost.id} className="flex gap-6">
          <div className="flex flex-col gap-3">
            <img src={kost.gambar} alt={kost.kostName} className="rounded-lg" />
            <p className="text-3xl font-bold">{kost.kostName}</p>
            <div className="flex gap-2 py-3">
              <p className="border-2 border-gray-800 w-[84px] text-center rounded-md">
                {kost.typeKost}
              </p>
              <div className="flex justify-center items-center gap-1">
                <SiGooglemaps />
                <p>{kost.address}</p>
              </div>
            </div>
            <div className="flex gap-3 border-b-2 py-3 flex-col">
              <h1 className="font-bold text-2xl">Deskripsi Kost</h1>
              {kost && (
                <p className="text-justify">{kost.detailKost.description}</p>
              )}
            </div>
            <div className="flex gap-3 border-b-2 py-3 flex-col">
              <h1 className="font-bold text-2xl">Spesifikasi Kamar</h1>
              {kost.detailKost.fasilitas[0].fasilitasKamar.map((fk) => (
                <div key={fk.id} className="mx-5">
                  <span className="flex gap-1 items-center">
                    {fk.id == 1 ? (
                      <PiCubeDuotone size={20} />
                    ) : (
                      <GiElectric size={20} />
                    )}
                    {fk.namaFasilitas}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 border-b-2 py-3 flex-col">
              <h1 className="font-bold text-2xl">Fasilitas Kamar Mandi</h1>
              {kost.detailKost.fasilitas[0].fasilitasToilet.map((ft) => (
                <div key={ft.id} className="mx-5">
                  <span className="flex gap-1 items-center">
                    {ft.id == 1 && <MdOutlineBathtub size={20} />}
                    {ft.id == 2 && <PiToiletDuotone size={20} />}
                    {ft.id === 3 && <FaShower size={20} />}
                    {ft.namaFasilitas}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 border-b-2 py-3 flex-col">
              <h1 className="font-bold text-2xl">Fasilitas Umum</h1>
              {kost.detailKost.fasilitas[0].fasilitasUmum.map((fu) => (
                <div key={fu.id} className="mx-5">
                  <span className="flex gap-1 items-center">
                    {fu.id === 1 && <LuRefrigerator size={20} />}
                    {fu.id === 2 && <BsBicycle size={20} />}
                    {fu.id === 3 && <FaMotorcycle size={20} />}
                    {fu.namaFasilitas}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col shadow-gray-400 shadow-md p-5 gap-10 h-min rounded-lg sticky top-[84px]">
            <div className="flex flex-col gap-4">
              <div className="text-2xl flex">
                <p className="font-bold">Rp{kost.price.toLocaleString("id")}</p>
                <p>/bulan</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="date"
                  className="border-2 border-gray-600 p-3 rounded-lg w-[164px]"
                />
                <select
                  name=""
                  id=""
                  className="border-2 border-gray-600 p-3 rounded-lg w-[164px]"
                >
                  <option value="">Per bulan</option>
                  <option value="">Per 3 bulan</option>
                  <option value="">Per 6 bulan</option>
                  <option value="">Per Tahun</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col text-md gap-2">
              <button className="flex justify-center items-center border-2 p-2 rounded-md border-gray-600 gap-2">
                <BsChatLeftDots />
                Tanya Pemilik
              </button>
              <button className="flex justify-center items-center p-2 rounded-md bg-gray-600 text-white">
                Ajukan Sewa
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
