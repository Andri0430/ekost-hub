import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { AccountContex } from "../App";
import { useState } from "react";

export default function UpdateAccount() {
  const { showAccountPopUp, setShowAccountPopUp, dataUpdateAccount, user } =
    useContext(AccountContex);

  const [nameAccount, setNameAccount] = useState({
    email: user.email,
    name: user.name,
  });

  const [phoneAccount, setPhoneAccount] = useState({
    email: user.email,
    phone: user.phoneNumber,
  });

  const HandleUpdateAccount = async () => {
    if (dataUpdateAccount === "Nama") {
      const response = await fetch(
        "http://localhost:5000/api/Account/update-name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nameAccount),
        }
      );
      const data = await response.json();
      console.log(data);
    } else {
      const response = await fetch(
        "http://localhost:5000/api/Account/update-phone",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phoneAccount),
        }
      );
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <section className="flex flex-col bg-white fixed border-2 border-gray-300 rounded-lg p-3 shadow-xl w-[380px] gap-8 pointer-events-auto">
      <h1 className="font-bold border-b-2 border-gray-500 p-1">
        Update {dataUpdateAccount}
      </h1>
      <form className="flex flex-col w-full gap-2">
        <TextField
          id="outlined-basic"
          label={dataUpdateAccount === "Nama" ? "Nama baru" : "No.Telepon baru"}
          variant="outlined"
          value={
            dataUpdateAccount === "Nama" ? nameAccount.name : phoneAccount.phone
          }
          onChange={(e) => {
            dataUpdateAccount === "Nama"
              ? setNameAccount({ ...nameAccount, name: e.target.value })
              : setPhoneAccount({ ...phoneAccount, phone: e.target.value });
          }}
          required
        />
      </form>

      <div className="flex justify-between">
        <button
          className="text-sm py-1 font-bold border-2 border-gray-800 w-[100px] flex items-center justify-center rounded-md hover:bg-gray-800 hover:text-white"
          onClick={() => {
            setShowAccountPopUp(!showAccountPopUp);
          }}
        >
          Batal
        </button>
        <button
          className="text-sm py-1 font-bold border-2 bg-gray-600 text-white  w-[100px] flex items-center justify-center rounded-md hover:bg-gray-800"
          onClick={() => {
            HandleUpdateAccount();
            setShowAccountPopUp(false);
            window.location.reload();
          }}
        >
          Simpan
        </button>
      </div>
    </section>
  );
}
