# Progress Menghilangkan Database

## Status: On Progress

### Steps:

- [x] 1. Pahami files & buat plan
- [x] 2. Buat TODO.md
- [x] 3. Buat lib/mockData.ts (data dummy mahasiswa, materi, tugas, users)
- [x] 4. Hapus files DB: lib/db.ts, lib/schema.sql, db-init.js, seed.js, check-db.mjs
- [x] 5. Update package.json (hapus mysql2, pg deps)
- [x] 6. Update auth.ts ke mock hardcoded users
- [x] 7. Update API routes (mahasiswa ✅, materi, tugas, register, dll.) ke mock + JSON persist
- [ ] 8. Update app/page.tsx & check-db.mjs (hapus/refactor)
- [ ] 9. Cleanup: hapus node_modules, npm install
- [ ] 10. Test: npm run dev, cek semua pages jalan tanpa DB error
- [ ] 11. Complete task
