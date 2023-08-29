export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-gray-700 p-2 rounded-lg text-white w-full font-bold text-lg hover: shadow-lg"
    >
      {children}
    </button>
  );
}
