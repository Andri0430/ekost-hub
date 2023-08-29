import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useEffect } from "react";
import { api } from "./utils";
import { createContext } from "react";

export const AccountContex = createContext({
  showAccountPopUp: false,
  setShowAccountPopUp: () => {},
  dataUpdateAccount: {
    title: "",
    value: "",
  },
  setDataUpdateAccount: () => {},
  uploadFoto: "",
  setUploadFoto: () => {},
  user: "",
  setUser: () => {},
});

export default function App() {
  const location = useLocation();
  const loginPath = "/login";
  const registerPath = "/register";
  const [openSetting, setOpenSetting] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const showHeaderLogin = location.pathname !== loginPath;
  const showHeaderRegister = location.pathname !== registerPath;
  const [user, setUser] = useState({});
  const [openDialogProfile, setOpenDiaologProfile] = useState(false);
  const [showAccountPopUp, setShowAccountPopUp] = useState(false);
  const [dataUpdateAccount, setDataUpdateAccount] = useState("");
  const [uploadFoto, setUploadFoto] = useState("");
  const [notifikasi, setNotifikasi] = useState({
    status: false,
    pesan: "",
  });

  useEffect(() => {
    api("/Account/GetMe").then((user) => {
      if (!user) {
        setUser("");
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    <AccountContex.Provider
      value={{
        showAccountPopUp,
        setShowAccountPopUp,
        dataUpdateAccount,
        setDataUpdateAccount,
        user,
        setUser,
        uploadFoto,
        setUploadFoto,
      }}
    >
      <div className={openSetting && notifikasi && "pointer-events-none"}>
        {showHeaderLogin && showHeaderRegister && (
          <Header
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            setSideBar={setSideBar}
            sideBar={sideBar}
            user={user}
            setUser={setUser}
            openDialogProfile={openDialogProfile}
            setOpenDiaologProfile={setOpenDiaologProfile}
          />
        )}
        <div
          className="flex justify-center"
          onClick={() => setOpenDiaologProfile(false)}
        >
          <Outlet
            context={[openSetting, setOpenSetting, notifikasi, setNotifikasi]}
          />
          {showHeaderLogin && showHeaderRegister && (
            <SideBar sideBar={sideBar} setSideBar={setSideBar} user={user} />
          )}
        </div>
        {showHeaderLogin && showHeaderRegister && (
          <Footer setOpenDiaologProfile={setOpenDiaologProfile} />
        )}
      </div>
    </AccountContex.Provider>
  );
}
