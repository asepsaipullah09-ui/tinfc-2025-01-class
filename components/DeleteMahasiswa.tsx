"use client";

interface DeleteMahasiswaProps {
  id: number;
  onSuccess?: () => void;
}

export default function DeleteMahasiswa({ id, onSuccess }: DeleteMahasiswaProps) {
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus mahasiswa ini?")) {
      return;
    }

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
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      Hapus
    </button>
  );
}