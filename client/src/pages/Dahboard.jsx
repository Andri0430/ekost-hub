import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountContex } from "../App";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai";
import CreateKost from "../components/CreateKost";
import { BsFillPencilFill, BsPlus } from "react-icons/bs";
import UpdateProfileKost from "../components/UpdateProfileKost";
import { useOutletContext } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import AddDescription from "../components/AddDescription";
import { BiTrash } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";
import AddFasilitas from "../components/AddFasilitas";

export default function Dashboard() {
  const [showFasilitas, setShowFasilitas] = useState(false);
  const [tipeFasilitas, setTipeFasilitas] = useState();
  const [fasilitas, setFasilitas] = useState({
    idKost: "",
    idFasilitas: "",
  });
  const [notifikasi, setNotifikasi] = useOutletContext();
  const { user } = useContext(AccountContex);
  const [kost, setKost] = useState([]);
  const [idKost, setIdKost] = useState("");
  const [detailKost, setDetailKost] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdateProfileKost, setShowUpdateProfileKost] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [showInputFile, setShowInputFile] = useState(false);
  const [description, setDescription] = useState({
    idKost: "",
    description: "",
  });
  const [profileKost, setProfileKost] = useState({
    idKost: "",
    namaKost: "",
    tipeKost: "",
    harga: "",
    alamat: "",
    sisa: "",
  });

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("Foto", selectedFile);
      formData.append("IdKost", idKost);
      const response = await fetch(
        "http://localhost:5000/api/Owner/kos/upload-foto",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === "success") {
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
    }
  };

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/Owner/get-kost?email=${user.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.email),
      }
    );
    const data = await response.json();
    setKost(data);
  };

  useEffect(() => {
    fetchData();
  }, [user.email]);

  const fetchDetailKost = async (id) => {
    const response = await fetch(`http://localhost:5000/api/Kost/id?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    const data = await response.json();
    setDetailKost(data);
  };

  return (
    <main className="flex justify-center min-h-screen w-full text-gray-800">
      {notifikasi && (
        <Alert
          severity={notifikasi.status === 200 ? "success" : "error"}
          className="pointer-events-auto fixed top-56"
        >
          <AlertTitle>
            {notifikasi.status === 200 ? "Success" : "Error"}
          </AlertTitle>
          {notifikasi.pesan} —{" "}
          <Link
            className="underline font-bold"
            onClick={(e) => {
              e.preventDefault();
              setNotifikasi(false);
              fetchDetailKost(idKost);
              fetchData();
            }}
          >
            check it out!
          </Link>
        </Alert>
      )}
      {showFasilitas && (
        <AddFasilitas
          showFasilitas={showFasilitas}
          setShowFasilitas={setShowFasilitas}
          tipeFasilitas={tipeFasilitas}
          setTipeFasilitas={setTipeFasilitas}
          fasilitas={fasilitas}
          setFasilitas={setFasilitas}
        />
      )}
      {showDescription && (
        <AddDescription
          showDescription={showDescription}
          setShowDescription={setShowDescription}
          description={description}
          setDescription={setDescription}
        />
      )}
      {showCreate && (
        <CreateKost
          setShowCreate={setShowCreate}
          kost={kost}
          setKost={setKost}
        />
      )}
      {showUpdateProfileKost && (
        <UpdateProfileKost
          setShowUpdateProfileKost={setShowUpdateProfileKost}
          profileKost={profileKost}
          setProfileKost={setProfileKost}
        />
      )}
      <section className="flex flex-col bg-gray-200 border-2 w-[20%] items-center gap-20">
        <div className="flex p-3">
          <h1 className="font-bold text-2xl">DashBoard</h1>
        </div>
        <div className="flex flex-col font-bold w-full items-center gap-4">
          <Link className="border-b-2 border-gray-800 w-[80%] text-center p-2 hover:bg-gray-300">
            Kelola Kost
          </Link>
          <Link className="border-b-2 border-gray-800 w-[80%] text-center p-2 hover:bg-gray-300">
            Penghuni Kost
          </Link>
        </div>
      </section>
      <section className="flex w-full">
        <div className="flex flex-col p-3 w-full h-full gap-2">
          <div className="flex justify-end p-2">
            <button
              className="font-bold border-2 border-gray-700 p-2 rounded-md flex items-center gap-1"
              onClick={() => setShowCreate(!showCreate)}
            >
              <AiOutlinePlus size={20} />
              Tambah Kost
            </button>
          </div>
          {kost.map((k) => (
            <div
              key={k.id}
              className="flex flex-col items-center p-1 border-b-2 rounded-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIdKost(k.id);
                fetchDetailKost(k.id);
              }}
            >
              <div className="flex w-full">
                <div className="flex w-full bg-gray-200 p-2 justify-between">
                  <h1 className="font-bold text-2xl">{k.namaKos}</h1>
                  <AiOutlineArrowDown size={30} className="text-gray-800" />
                </div>
              </div>
              {idKost === k.id && (
                <div className="flex w-full">
                  {detailKost && (
                    <div className="flex flex-col items-center p-2 w-full gap-4">
                      <div className="flex flex-col gap-3 w-full justify-center items-center p-2">
                        <img
                          src={`http://localhost:5000/Uploads/${detailKost.kostImage}`}
                          className="w-[200px] h-[200px] rounded-full p-2 border-4 border-gray-800"
                        />
                        {!showInputFile && (
                          <div
                            className="flex justify-center items-center gap-2 p-2 rounded-md hover:bg-gray-200"
                            onClick={() => setShowInputFile(true)}
                          >
                            <BsFillPencilFill />
                            <p>Upload Foto</p>
                          </div>
                        )}
                        {showInputFile && (
                          <div className="flex items-center justify-center border-2 p-2 gap-2 border-gray-600 rounded-lg">
                            <input
                              type="file"
                              className="p-1"
                              onChange={handleFileChange}
                            />
                            <BiTrash
                              size={24}
                              onClick={() => setShowInputFile(false)}
                            />
                            <FaFileUpload size={24} onClick={handleUpload()} />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 w-[60%] bg-slate-200 p-2 rounded-lg text-gray-700">
                        <div className="flex justify-between w-full items-center">
                          <h1 className="text-xl font-bold border-b-2 border-gray-800 text-black w-full">
                            Profile Kost
                          </h1>
                          <BsFillPencilFill
                            size={20}
                            className="hover:bg-gray-400 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setProfileKost({
                                ...profileKost,
                                idKost: detailKost.idKost,
                                namaKost: detailKost.kostName,
                                harga: detailKost.kostPrice,
                                tipeKost: detailKost.kostType,
                                sisa: detailKost.qtyRoom,
                                alamat: detailKost.kostAdress,
                              });
                              setShowUpdateProfileKost(true);
                            }}
                          />
                        </div>
                        <span className="flex gap-2">
                          <p className="font-bold">Nama Kost :</p>
                          <p>{detailKost.kostName}</p>
                        </span>
                        <span className="flex gap-2">
                          <p className="font-bold">Tipe :</p>
                          <p>{detailKost.kostType}</p>
                        </span>
                        <span className="flex gap-2">
                          <p className="font-bold">Harga :</p>
                          <p className="flex">
                            Rp.{detailKost.kostPrice.toLocaleString("id")}
                            /bulan
                          </p>
                        </span>
                        <span className="flex gap-2">
                          <p className="font-bold">Alamat :</p>
                          <p>{detailKost.kostAdress}</p>
                        </span>
                        <span className="flex gap-2">
                          <p className="font-bold">Sisa :</p>
                          <p>{detailKost.qtyRoom} Kamar</p>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-[60%] bg-slate-200 p-2 rounded-lg text-gray-700">
                        <div className="flex justify-between w-full items-center">
                          <h1 className="text-xl font-bold border-b-2 border-gray-800 text-black w-full">
                            Deskripsi
                          </h1>
                          <BsFillPencilFill
                            size={20}
                            className="hover:bg-gray-400 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDescription(true);
                              setDescription({
                                ...description,
                                idKost: detailKost.idKost,
                                description: detailKost.description,
                              });
                            }}
                          />
                        </div>
                        {!detailKost.description ? (
                          <div className="text-center flex items-center justify-center min-h-[100px] font-bold">
                            Deskripsi Belum Ditambahkan
                          </div>
                        ) : (
                          <p className="flex flex-wrap text-justify">
                            {detailKost.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-[60%] bg-slate-200 p-2 rounded-lg text-gray-700">
                        <div className="flex justify-between w-full items-center">
                          <h1 className="text-xl font-bold border-b-2 border-gray-800 text-black w-full">
                            Fasilitas Kamar
                          </h1>
                          <BsPlus
                            size={26}
                            className="hover:bg-gray-400 rounded-full"
                            onClick={() => {
                              //untuk tambah
                              setFasilitas({
                                ...fasilitas,
                                idKost: detailKost.idKost,
                              });
                              setTipeFasilitas("Fasilitas Kamar");
                              setShowFasilitas(true);
                            }}
                          />
                        </div>
                        {detailKost.fasilitasKamar.length === 0 ? (
                          <div className="text-center flex items-center justify-center min-h-[100px] font-bold">
                            Fasilitas Kamar Belum Ditambahkan
                          </div>
                        ) : (
                          <div className="flex flex-col p-2">
                            {detailKost.fasilitasKamar.map((fk) => (
                              <div
                                key={fk.id}
                                className="flex w-[30%] items-center justify-between border-b-2 border-gray-300"
                              >
                                <p>{fk.namaFasilitas}</p>
                                <BsFillPencilFill size={11} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-[60%] bg-slate-200 p-2 rounded-lg text-gray-700">
                        <div className="flex justify-between w-full items-center">
                          <h1 className="text-xl font-bold border-b-2 border-gray-800 text-black w-full">
                            Fasilitas Toilet
                          </h1>
                          <BsPlus
                            size={26}
                            className="hover:bg-gray-400 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setTipeFasilitas("Fasilitas Toilet");
                              setShowFasilitas(true);
                            }}
                          />
                        </div>
                        {detailKost.fasilitasToilet.length === 0 ? (
                          <div className="text-center flex items-center justify-center min-h-[100px] font-bold">
                            Fasilitas Toilet Belum Ditambahkan
                          </div>
                        ) : (
                          <div className="flex flex-col p-2">
                            {detailKost.fasilitasToilet.map((ft) => (
                              <div
                                key={ft.id}
                                className="flex w-[30%] items-center justify-between border-b-2 border-gray-300"
                              >
                                <p>{ft.namaFasilitas}</p>
                                <BsFillPencilFill size={11} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-[60%] bg-slate-200 p-2 rounded-lg text-gray-700">
                        <div className="flex justify-between w-full items-center">
                          <h1 className="text-xl font-bold border-b-2 border-gray-800 text-black w-full">
                            Fasilitas Umum
                          </h1>
                          <BsPlus
                            size={26}
                            className="hover:bg-gray-400 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setTipeFasilitas("Fasilitas Umum");
                              setShowFasilitas(true);
                            }}
                          />
                        </div>
                        {detailKost.fasilitasUmum.length === 0 ? (
                          <div className="text-center flex items-center justify-center min-h-[100px] font-bold">
                            Fasilitas Umum Belum Ditambahkan
                          </div>
                        ) : (
                          <div className="flex flex-col p-2">
                            {detailKost.fasilitasUmum.map((fu) => (
                              <div
                                key={fu.id}
                                className="flex w-[30%] items-center justify-between border-b-2 border-gray-300"
                              >
                                <p>{fu.namaFasilitas}</p>
                                <BsFillPencilFill size={11} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
