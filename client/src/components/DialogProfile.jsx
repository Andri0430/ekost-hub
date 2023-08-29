import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";

export default function DialogProfile() {
  const [openDialogProfile, setOpenDiaologProfile] = useState(false);
  
  return (
    <section className="flex flex-col shadow-xl h-fit py-4 px-2 bg-white rounded-lg fixed top-[70px] border-2 right-11 justify-center items-center gap-4">
      <Link
        className="w-[184px] flex justify-center gap-4 items-center p-2 hover:border-2 border-gray-400 rounded-md h-[40px]"
        onClick={() => setOpenDiaologProfile(!openDialogProfile)}
        to={"/profile"}
      >
        <AiOutlineUser />
        <p>Profile</p>
      </Link>
      <Link
        className="w-[184px] flex justify-center gap-4 items-center p-2 hover:border-2 border-gray-400 rounded-md h-[40px]"
        onClick={() => {
          setOpenDiaologProfile(!openDialogProfile);
          localStorage.clear("token");
        }}
        to={"/login"}
      >
        <BiLogOut />
        <p>Logout</p>
      </Link>
    </section>
  );
}
