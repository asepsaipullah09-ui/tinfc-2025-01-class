"use client";

export default function DeleteMahasiswa({ id }: { id: number }) {
  const handleDelete = async () => {
    await fetch("/api/mahasiswa", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    window.location.reload();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1"
    >
      Hapus
    </button>
  );
}

