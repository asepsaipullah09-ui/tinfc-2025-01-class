e# Fix Runtime TypeError di Galeri Page

## Steps:

- [x] Tambah null-safe checks di filteredGaleri dan availableYears useMemo + fix file corruption (line 1)
- [ ] Test: `npm run dev` → buka /galeri → cek console no error
- [ ] Opsional: Inspect data di lib/mockData.ts jika masih bermasalah

## Hasil:

- No `Cannot read properties of undefined (reading 'toLowerCase')`
- Filter galeri berfungsi dengan data corrupt/partial

Setelah test OK, hapus file ini.
