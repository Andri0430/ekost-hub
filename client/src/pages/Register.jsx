import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Register() {
  const [notifikasi, setNotifikasi] = useOutletContext();
  const [role, setRole] = useState([]);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/Role").then((response) => {
      setRole(response.data);
    });
  }, []);

  const handleRegister = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Authentication/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setNotifikasi({ ...notifikasi, status: true, pesan: data.message });
      localStorage.setItem("token", data.token);
    } else {
      setNotifikasi({ ...notifikasi, status: true, pesan: data.message });
    }
  };

  return (
    <main
      className={`${
        notifikasi.status === true && "pointer-events-none"
      } flex justify-center h-full items-center text-gray-800 w-full`}
    >
      {notifikasi.status && (
        <Alert
          severity={
            notifikasi.pesan === "Register Berhasil" ? "success" : "error"
          }
          className="fixed z-40 w-[300px] pointer-events-auto"
        >
          <AlertTitle>{notifikasi.pesan}</AlertTitle>
          {notifikasi.pesan !== "Register Berhasil" && (
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setNotifikasi(!notifikasi)}
            >
              Kembali
            </span>
          )}
          {notifikasi.pesan === "Register Berhasil" && (
            <Link
              className="font-bold underline"
              to={"/login"}
              onClick={() => setNotifikasi(!notifikasi)}
            >
              Login Sekarang
            </Link>
          )}
        </Alert>
      )}
      <form
        className="flex flex-col items-center w-[400px] gap-5 p-10 sm:p-0 sm:w-[450px] md:w-[500px] lg:w-[400px]"
        method="Post"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <h1 className="font-bold text-6xl">Register</h1>
        <TextField
          label="Nama Lengkap"
          variant="outlined"
          className="w-full"
          type="text"
          onChange={(e) => setRegister({ ...register, name: e.target.value })}
          required
          autoComplete="off"
        />
        <div className="flex flex-col gap-6 w-full">
          <TextField
            label="Email"
            variant="outlined"
            className="w-full"
            type="email"
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
            required
            autoComplete="off"
          />
          <TextField
            label="Nomor Telepon"
            variant="outlined"
            className="w-full"
            type="text"
            onChange={(e) =>
              setRegister({ ...register, phoneNumber: e.target.value })
            }
            required
            autoComplete="off"
          />
          <TextField
            label="Password"
            variant="outlined"
            className="w-full"
            type="password"
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
            required
            autoComplete="off"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={role}
            renderInput={(params) => <TextField {...params} label="Role" />}
            onChange={(_, newValue) => {
              setRegister({ ...register, role: newValue });
            }}
          />
        </div>
        <button className="font-bold border-2 border-gray-800 w-full p-2 flex items-center justify-center rounded-md hover:bg-gray-800 hover:text-white">
          Register
        </button>
        <span className="text-sm flex gap-1">
          Have Account?
          <Link className="font-bold underline" to={"/login"}>
            Login
          </Link>
          Atau
          <Link className="font-bold underline" to={"/"}>
            Cari Kost
          </Link>
        </span>
      </form>
    </main>
  );
}
