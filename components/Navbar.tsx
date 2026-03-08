export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">TINFC-2025-01 Class</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">Portal Kelas</span>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
      </div>
    </nav>
  );
}