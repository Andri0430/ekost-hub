import { GiHouse, GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import DialogProfile from "./DialogProfile";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AccountContex } from "../App";

export default function Header({
  openSetting,
  setOpenSetting,
  setSideBar,
  sideBar,
  openDialogProfile,
  setOpenDiaologProfile,
}) {
  const { user } = useContext(AccountContex);
  const location = useLocation();
  const showLocation = location.pathname === "/";
  return (
    <header className="flex justify-between gap-3 h-[74px] border-1 top-0 sticky bg-white shadow-md p-6 items-center text-[#272829] z-10">
      <div className="flex w-full gap-4">
        <NavLink
          className="flex text-4xl font-bold items-center gap-1 cursor-pointer"
          to={"/"}
        >
          <GiHouse />
          <span className="text-2xl">KostHub</span>
        </NavLink>
        {showLocation && (
          <form className="hidden items-center p-2 hover:cursor-pointer gap-2 w-full lg:w-[450px] lg:flex">
            <LuSettings2
              size={24}
              className="hover:cursor-pointer pointer-events-auto"
              onClick={() => setOpenSetting(!openSetting)}
            />
            <input
              type="text"
              className=" h-[44px] rounded-md w-full shadow-md px-3 border"
              placeholder="Cari Kos"
            />
            <BiSearch className="text-2xl" />
          </form>
        )}
      </div>
      {user && showLocation && (
        <div className="hidden font-bold items-center lg:flex justify-center px-10 relative">
          <Link
            className="p-6 hover:border-b-4 border-b-[#272829] h-[74px] w-[110px] flex justify-center"
            to={"/favorit"}
          >
            Favorit
          </Link>
        </div>
      )}
      <Link
        className={`${
          user && "border-none"
        } hidden border-2 border-[#272829] p-2 w-[120px] rounded-md font-bold lg:flex lg:justify-center hover:bg-slate-200`}
        onClick={() => setOpenDiaologProfile(!openDialogProfile)}
        to={!user && "/login"}
      >
        {user ? (
          <img
            src={`http://localhost:5000/Uploads/${user.foto}`}
            className="rounded-full object-cover w-[48px] h-[48px]"
          />
        ) : (
          "Masuk"
        )}
        {openDialogProfile && <DialogProfile />}
      </Link>
      <GiHamburgerMenu
        size={22}
        className={`lg:hidden hover:cursor-pointer`}
        onClick={() => setSideBar(!sideBar)}
      />
    </header>
  );
}
