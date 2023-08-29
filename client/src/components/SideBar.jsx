import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";

export default function SideBar({ sideBar, user, setSideBar }) {
  return (
    <section
      className={`${
        sideBar ? "right-0" : "right-[-40%]"
      } bg-white flex justify-center h-screen fixed w-[40%] border-x-2 border-gray-300 transition-all lg:${
        sideBar && "hidden"
      }`}
    >
      {user.role === "User" && (
        <div className="flex flex-col py-16 gap-10 items-center">
          <Link
            className="flex h-fit items-center rounded-md w-[90%] shadow-lg"
            to={"/profile"}
            onClick={() => setSideBar(false)}
          >
            <img
              src={`http://localhost:5000/Uploads/${user.foto}`}
              alt={user.name}
              className="w-[19%] rounded-full"
            />
            <p className="font-bold p-4">{user.email}</p>
          </Link>
          <div className="flex py-8 flex-col w-full items-center gap-6">
            <Link
              className="p-2 border-b-2 w-[90%] flex justify-center font-bold hover:shadow-md"
              onClick={() => setSideBar(false)}
              to={"/favorit"}
            >
              Favorit
            </Link>
            <Link
              className="p-2 border-b-2 w-[90%] flex justify-center font-bold hover:shadow-md"
              onClick={() => setSideBar(false)}
            >
              History
            </Link>
          </div>
          <Link
            className="p-3 border-b-2 w-[90%] flex justify-center items-center font-bold hover:shadow-md gap-2"
            onClick={() => {
              setSideBar(false);
              localStorage.clear("token");
              window.location.reload();
            }}
            to={"/login"}
          >
            <BiLogOut size={24} />
            <span>Logout</span>
          </Link>
        </div>
      )}
      {!user && (
        <div className="flex flex-col py-20 gap-8 items-center w-full">
          <GiHouse size={100} />
          <div className="flex w-full flex-col gap-4 items-center justify-center">
            <Link
              className="flex h-[50px] items-center w-[90%] rounded-md shadow-lg border-2 border-gray-700 cursor-pointer gap-2 p-3 justify-center hover:bg-gray-600 hover:text-white hover:border-none"
              to={"/register"}
            >
              <AiOutlineUserAdd size={24} />
              <p className="font-bold w-full">Register</p>
            </Link>
            <Link
              className="flex h-[50px] items-center w-[90%] rounded-md shadow-lg border-2 border-gray-700 cursor-pointer gap-2 p-3 justify-center hover:bg-gray-600 hover:text-white hover:border-none"
              to={"/login"}
            >
              <AiOutlineUser size={24} />
              <p className="font-bold w-full">Login</p>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
