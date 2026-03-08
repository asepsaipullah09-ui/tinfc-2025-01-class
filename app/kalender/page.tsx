"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface KalenderItem {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  created_at?: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function KalenderPage() {
  const [events, setEvents] = useState<KalenderItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<KalenderItem | null>(null);

  // Form state
  const [formJudul, setFormJudul] = useState("");
  const [formDeskripsi, setFormDeskripsi] = useState("");
  const [formTanggal, setFormTanggal] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/kalender");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEventsForDate = (date: Date): KalenderItem[] => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.tanggal === dateStr);
  };

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setShowForm(true);
    setEditingEvent(null);
    resetForm();
  };

  const resetForm = () => {
    setFormJudul("");
    setFormDeskripsi("");
    setFormTanggal("");
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formJudul || !formTanggal) {
      alert("Judul dan tanggal wajib diisi!");
      return;
    }

    setSubmitting(true);

    try {
      let res;

      if (editingEvent) {
        // Update existing event
        res = await fetch("/api/kalender", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingEvent.id,
            judul: formJudul,
            deskripsi: formDeskripsi,
            tanggal: formTanggal,
          }),
        });
      } else {
        // Create new event
        res = await fetch("/api/kalender", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            judul: formJudul,
            deskripsi: formDeskripsi,
            tanggal: formTanggal,
          }),
        });
      }

      if (res.ok) {
        alert(editingEvent ? "Acara berhasil diperbarui!" : "Acara berhasil ditambahkan!");
        resetForm();
        setShowForm(false);
        fetchEvents();
      } else {
        alert("Gagal menyimpan acara");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Gagal menyimpan acara");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event: KalenderItem) => {
    setEditingEvent(event);
    setFormJudul(event.judul);
    setFormDeskripsi(event.deskripsi || "");
    setFormTanggal(event.tanggal);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus acara ini?")) {
      return;
    }

    try {
      const res = await fetch("/api/kalender", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Acara berhasil dihapus!");
        fetchEvents();
      } else {
        alert("Gagal menghapus acara");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Gagal menghapus acara");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get dates that have events for highlighting
  const eventDates = events.map((event) => new Date(event.tanggal));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kalender Akademik</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              locale="id-ID"
              className="w-full"
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const hasEvent = events.some(
                    (event) =>
                      new Date(event.tanggal).toDateString() === date.toDateString()
                  );
                  if (hasEvent) {
                    return "bg-blue-100 rounded-full";
                  }
                }
                return "";
              }}
            />
          </div>

          {/* Selected Date Events */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Acara pada{" "}
              {selectedDate
                ? new Date(selectedDate as Date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Pilih tanggal"}
            </h2>

            {selectedDate && getEventsForDate(selectedDate as Date).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(selectedDate as Date).map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.judul}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.deskripsi || "Tidak ada deskripsi"}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(event.tanggal)}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Tidak ada acara pada tanggal ini.
              </p>
            )}

            <button
              onClick={() => {
                setShowForm(true);
                resetForm();
                if (selectedDate) {
                  setFormTanggal(
                    (selectedDate as Date).toISOString().split("T")[0]
                  );
                }
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Tambah Acara
            </button>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="bg-white p-4 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Semua Acara</h2>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada acara.</p>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {events
                .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
                .map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                    onClick={() => {
                      setSelectedDate(new Date(event.tanggal));
                      setShowForm(true);
                      setEditingEvent(event);
                      setFormJudul(event.judul);
                      setFormDeskripsi(event.deskripsi || "");
                      setFormTanggal(event.tanggal);
                    }}
                  >
                    <h3 className="font-medium">{event.judul}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(event.tanggal)}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingEvent ? "Edit Acara" : "Tambah Acara Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Acara *</label>
                <input
                  type="text"
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  placeholder="Contoh: UTS Pemrograman Web"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  placeholder="Contoh: Ujian Tengah Semester mata kuliah Pemrograman Web"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tanggal *</label>
                <input
                  type="date"
                  value={formTanggal}
                  onChange={(e) => setFormTanggal(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                  {submitting
                    ? "Menyimpan..."
                    : editingEvent
                    ? "Perbarui"
                    : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}