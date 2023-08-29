import { MdClose } from "react-icons/md";

export default function Payment({ setShowPayment, booking, namaKost }) {
  const handleBooking = async () => {
    const response = await fetch("http://localhost:5000/api/KostTenant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const data = await response.json();
    console.log(data);
    // if (data.status === 200) {
    //   setNotifikasi({ ...notifikasi, status: true, pesan: data.message });
    //   localStorage.setItem("token", data.token);
    // } else {
    //   setNotifikasi({ ...notifikasi, status: true, pesan: data.message });
    // }
  };

  return (
    <section className="w-full fixed justify-center flex h-[50vh] items-center z-10">
      <div className="bg-white w-[400px] p-2 border-2 border-gray-600 rounded-lg flex flex-col gap-4 h-fit shadow-xl cursor-pointer z-20">
        <span className="flex w-full items-end justify-end">
          <MdClose size={30} onClick={() => setShowPayment(false)} />
        </span>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center justify-center w-full">
            Konfirmasi Pembayaran
          </h1>
          <div className="flex flex-col gap-1 w-[50%]">
            <p>Nama Kost : {namaKost}</p>
            <p>Mulai : {booking.tanggalMasuk}</p>
            <p>Lama Sewa : {booking.lamaKost}</p>
            <p>
              Total Biaya : Rp.
              {parseInt(booking.lamaKost[0] * booking.biaya).toLocaleString(
                "id"
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full justify-center">
          <button
            className="flex p-2 w-[100px] items-center justify-center font-bold rounded-lg border-2 border-gray-800 hover:bg-gray-600 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              handleBooking();
              setShowPayment(false);
            }}
          >
            Iya
          </button>
        </div>
      </div>
    </section>
  );
}
