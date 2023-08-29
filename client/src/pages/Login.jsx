import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [notifikasi, setNotifikasi] = useOutletContext();
  const [role, setRole] = useState([]);
  const [login, setLogin] = useState({
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Role")
      .then((response) => {
        setRole(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Authentication/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
        credentials: "include",
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
        notifikasi && "pointer-events-none bg-slate-700"
      } flex justify-center min-h-screen items-center text-gray-800 w-full`}
    >
      {notifikasi && (
        <Alert
          severity={`${
            notifikasi.pesan === "Login Berhasil" ? "success" : "error"
          }`}
          className="fixed z-10 w-fit pointer-events-auto"
        >
          <AlertTitle>
            {notifikasi.pesan !== "Login Berhasil" ? "Gagal Login" : "Succes"}
          </AlertTitle>
          {notifikasi.pesan} —{" "}
          <Link
            className="font-bold underline"
            onClick={() => {
              setNotifikasi(!notifikasi);
              if (notifikasi.pesan === "Login Berhasil") {
                navigate("/");
              }
            }}
          >
            {notifikasi.pesan !== "Login Berhasil" ? "Kembali" : "Oke"}
          </Link>
        </Alert>
      )}
      <form
        className="flex flex-col items-center w-[400px] gap-5 p-10 sm:p-0 sm:w-[450px] md:w-[500px] lg:w-[400px]"
        method="Post"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h1 className="font-bold text-6xl">Login</h1>
        <div className="flex flex-col gap-6 w-full">
          <TextField
            label="Email"
            variant="outlined"
            className="w-full"
            type="email"
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
            autoComplete="off"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            className="w-full"
            type="password"
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
            required
          />
        </div>
        <RadioGroup
          row
          aria-label="role"
          name="role"
          value={login.role}
          onChange={(e) => setLogin({ ...login, role: e.target.value })}
          className="w-full flex justify-around"
          required
        >
          {role.map((r, i) => (
            <FormControlLabel key={i} value={r} control={<Radio />} label={r} />
          ))}
        </RadioGroup>
        <button className="font-bold border-2 border-gray-800 w-full p-2 flex items-center justify-center rounded-md hover:bg-gray-800 hover:text-white">
          Login
        </button>
        <span className="text-sm flex gap-1">
          Dont Have Account?
          <Link className="font-bold underline" to={"/register"}>
            Register
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
