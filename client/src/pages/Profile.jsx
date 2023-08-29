import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiFillDelete,
} from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { useContext } from "react";
import { AccountContex } from "../App";
import UpdateAccount from "../components/UpdateAccount";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Profile() {
  const [isHovered, setIsHovered] = useState(false);
  const [showUploadFoto, setShowUploadFoto] = useState(false);
  const { showAccountPopUp, setShowAccountPopUp, setDataUpdateAccount, user } =
    useContext(AccountContex);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [notifikasi, setNotifikasi] = useOutletContext();

  
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("foto", selectedFile);
      const response = await fetch(
        "http://localhost:5000/api/Account/UploadFoto",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data) {
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

  return (
    <main className="flex flex-col p-2 justify-center items-center w-full text-lg min-h-[75vh] text-gray-800 lg:w-[80%]">
      {showAccountPopUp && <UpdateAccount />}
      {notifikasi && (
        <Alert
          severity={notifikasi.status === 200 ? "success" : "error"}
          className="pointer-events-auto absolute"
        >
          <AlertTitle>
            {notifikasi.status === 200 ? "Success" : "Error"}
          </AlertTitle>
          {notifikasi.pesan} —{" "}
          <Link
            className="underline font-bold"
            to={"/profile"}
            onClick={() => window.location.reload()}
          >
            check it out!
          </Link>
        </Alert>
      )}
      <div className="w-[90%] flex flex-col justify-center items-center gap-4 sm:w-[50%] md:w-[40%]">
        <h1 className="text-lg p-1 border-b-4 border-gray-800 w-full sm:text-2xl font-bold">
          Profile
        </h1>
        <div className="w-full flex flex-col justify-center items-center gap-6 sm:gap-12 md:gap-8">
          <div className="flex flex-col justify-center items-center gap-3">
            <Link
              className="fixed cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setShowUploadFoto(true)}
            >
              {isHovered && (
                <BsPencilFill className="hover-icon text-white" size={30} />
              )}
            </Link>
            <h2 className="text-2xl font-bold">{user.role}</h2>
            <img
              src={`http://localhost:5000/Uploads/${user.foto}`}
              alt={user.name}
              className="rounded-full object-cover w-[158px] h-[158px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {showUploadFoto && (
              <div className="flex justify-between items-center bg-gray-100 rounded-md cursor-pointer">
                <input
                  type="file"
                  className="p-1"
                  onChange={handleFileChange}
                />
                <div className="flex gap-4">
                  <AiFillDelete
                    className="hover:text-red-500"
                    onClick={() => setShowUploadFoto(false)}
                  />
                  <MdDone
                    className="hover:text-green-600"
                    onClick={() => {
                      setShowUploadFoto(false);
                      handleUpload();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col text-sm w-[300px] gap-3 p-2 hover:cursor-pointer">
              <div className="flex w-full items-center">
                <p className="flex gap-2 items-center border-b-2 w-full">
                  <AiOutlineMail size={25} />
                  {user.email}
                </p>
              </div>
              <div className="flex w-full items-center">
                <p className="flex gap-2 items-center border-b-2 w-full">
                  <AiOutlineUser size={25} />
                  {user.name}
                </p>
                <BsPencilFill
                  className="hover:text-red-600"
                  onClick={() => {
                    setShowAccountPopUp(true);
                    setDataUpdateAccount("Nama");
                  }}
                />
              </div>
              <div className="flex w-full items-center">
                <p className="flex gap-2 items-center border-b-2 w-full">
                  <AiOutlinePhone size={25} />
                  {user.phoneNumber}
                </p>
                <BsPencilFill
                  className="hover:text-red-600"
                  onClick={() => {
                    setShowAccountPopUp(true);
                    setDataUpdateAccount("No.Telepon");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
