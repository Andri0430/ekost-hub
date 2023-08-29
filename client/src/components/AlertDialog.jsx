import { AiOutlineClose } from "react-icons/ai";

export default function AlertDialog() {
  return (
    <section className="flex flex-col absolute z-10 font-bold bg-white p-3 rounded-lg w-[30%] gap-4 shadow-lg">
      <h1 className="text-3xl border-b-2 p-2">Notifikasi</h1>
      <div className="flex flex-col gap-2">
        <p className="text-center text-red-500">Berhasil Login</p>
        <AiOutlineClose className="w-full text-red-500" size={40} />
      </div>
    </section>
  );
}
