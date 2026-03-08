"use client";

interface DeleteMahasiswaProps {
  id: number;
  onSuccess?: () => void;
}

export default function DeleteMahasiswa({ id, onSuccess }: DeleteMahasiswaProps) {
  const handleDelete = async () => {
    await fetch("/api/mahasiswa", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (onSuccess) {
      onSuccess();
    }
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