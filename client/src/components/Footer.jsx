export default function Footer({ setOpenDiaologProfile }) {
  return (
    <footer
      className="flex text-[#272829] items-center justify-center border-t border-gray-400 w-full p-7"
      onClick={() => setOpenDiaologProfile(false)}
    >
      <span>Copy Right By Andriansyah</span>
    </footer>
  );
}
