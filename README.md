
# My List — A Simple To-Do App (Vue 3 + Vite)

Project ini adalah aplikasi To-Do sederhana dibuat dengan Vue 3, Vite, Pinia, dan Vue Router.
Fokusnya untuk latihan state management, routing, dan penyimpanan lokal (localStorage).

## Timothius Abel Gunther Sinulingga

## Link Video


## Prasyarat

- Node.js sesuai: lihat `engines` di `package.json` (direkomendasikan Node 20+).
- `npm` atau `pnpm` untuk mengelola paket.

## Instalasi

Jalankan perintah berikut di direktori proyek:

```powershell
npm install
```

## Menjalankan aplikasi (development)

```powershell
npm run dev
```

Buka browser di `http://localhost:5173` (atau port yang ditampilkan oleh Vite).

## Build untuk produksi

```powershell
npm run build
npm run preview
```

## Script penting

- `dev`: jalankan server pengembangan (Vite).
- `build`: build untuk produksi.
- `preview`: preview hasil build secara lokal.
- `lint`: jalankan ESLint dan perbaiki otomatis.
- `format`: format file `src/` dengan Prettier.

## Fitur Aplikasi

- Tambah To-Do baru.
- Tandai To-Do sebagai selesai (Completed).
- Tandai/un-tandai Bookmark pada To-Do.
- Hapus To-Do.
- Lihat daftar To-Do yang belum selesai dan yang sudah selesai.
- Data disimpan di `localStorage` sehingga bertahan antar reload.

## Catatan implementasi (singkat)

- Store utama ada di `src/stores/todos.js` (Pinia). Fungsi penting:
  - `initFromStorage()` membaca `localStorage` pada saat aplikasi dibuat.
  - `storeTodo`, `updateTodo`, `destroyTodo`, `toggleBookmark`, dan `saveToStorage()`.
- `App.vue` memanggil `useTodos().initFromStorage()` saat created untuk mengisi state dari penyimpanan lokal.
- Routing sederhana di `src/router/index.js` — rute `/` untuk `Todo.vue` dan `/completed` untuk `Completed.vue`.
- Komponen UI utama: `src/components/Header.vue` dan `src/components/Footer.vue`.

## Struktur file penting

- `src/App.vue`: layout dasar dan inisialisasi store.
- `src/main.js`: entrypoint, register Pinia dan Router.
- `src/router/index.js`: definisi rute.
- `src/stores/todos.js`: Pinia store untuk daftar To-Do.
- `src/views/Todo.vue`: tampilan utama (tambah, list pending, bookmark).
- `src/views/Completed.vue`: tampilan item yang sudah selesai.

## Cara kontribusi singkat

1. Fork repo dan buat branch fitur: `git checkout -b feat/nama-fitur`.
2. Tambah/ubah kode, jalankan `npm run lint` dan `npm run format` bila perlu.
3. Commit dan buka pull request dengan penjelasan perubahan.

## Lain-lain
- Proyek ini dibuat sebagai latihan pembelajaran.
- Jika butuh bantuan menambahkan testing atau CI, beri tahu saya dan saya bantu menambahkan rekomendasi.

---

Jika Anda ingin README dibuat lebih panjang (mis. menambahkan screenshot, demo, atau penjelasan arsitektur), beri tahu fitur mana yang ingin ditonjolkan.
