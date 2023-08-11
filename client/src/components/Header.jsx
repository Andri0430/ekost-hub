import { FcBusinessman } from "react-icons/fc";

export default function Header() {
  return (
    <header className="flex h-[64px] justify-evenly border-2 top-0 sticky bg-white shadow-gray-200 shadow-md">
      <div className="flex items-center gap-1 text-4xl font-bold">
        <FcBusinessman />
        <span className="text-2xl">asprokost</span>
      </div>
    </header>
  );
}
