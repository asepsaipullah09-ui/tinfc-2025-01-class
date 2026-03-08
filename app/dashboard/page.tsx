"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardData {
  totalMahasiswa: number;
  totalMateri: number;
  totalTugas: number;
  totalGaleri: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalMahasiswa: 0,
    totalMateri: 0,
    totalTugas: 0,
    totalGaleri: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const barChartData = {
    labels: ["Mahasiswa", "Materi", "Tugas", "Galeri"],
    datasets: [
      {
        label: "Jumlah Data",
        data: [
          data.totalMahasiswa,
          data.totalMateri,
          data.totalTugas,
          data.totalGaleri,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ["Mahasiswa", "Materi", "Tugas", "Galeri"],
    datasets: [
      {
        data: [
          data.totalMahasiswa,
          data.totalMateri,
          data.totalTugas,
          data.totalGaleri,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const totalAll = data.totalMahasiswa + data.totalMateri + data.totalTugas + data.totalGaleri;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard TINFC-2025-01</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Mahasiswa</h2>
          <p className="text-3xl font-bold">{data.totalMahasiswa}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Materi</h2>
          <p className="text-3xl font-bold">{data.totalMateri}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Tugas</h2>
          <p className="text-3xl font-bold">{data.totalTugas}</p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Galeri</h2>
          <p className="text-3xl font-bold">{data.totalGaleri}</p>
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8 text-center">
        <p className="text-gray-600">Total Semua Data:</p>
        <p className="text-4xl font-bold text-gray-800">{totalAll}</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Grafik Bar</h2>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Grafik Donat</h2>
          <div className="h-64 flex justify-center">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}