# 🔬 Research Lab Portfolio

Portofolio interaktif bergaya game: pengunjung berjalan di dalam laboratorium riset dan "men-scan" exhibit untuk melihat isi portofolio.

## Denah Lab
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ A ABOUT  │ │ B SKILLS │ │ C TOOLS  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
═════╧═══════ MAIN CORRIDOR ═══╧══════
┌────┴─────┐ ┌────┴─────┐ ┌────┴─────┐
│ D CERTIF │ │ L LOBBY  │ │ E PROJECT│
└──────────┘ └──────────┘ └──────────┘
```
- **Lobby**: tempat spawn, robot pemandu ARIA, Welcome Board, Contact Terminal, kiosk CV
- **About Me**: terminal profil + papan pendidikan, pengalaman, dan hobi
- **Skills Lab**: pedestal hologram (tech + repo GitHub yang memakainya)
- **Tools Workshop**: etalase kaca berisi backend, database, desain & tools
- **Certificate Gallery**: bingkai sertifikat (thumbnail gambar otomatis tampil)
- **Project Archive**: monitor proyek

## Fitur game
- Jalan dengan WASD / panah, lari dengan Shift, inspeksi dengan E / Space
- Progress "Research Data", achievement, minimap, banner saat masuk sektor
- Progress tersimpan di browser (localStorage)
- Tombol **Quick View** untuk recruiter yang mau lihat versi biasa
- Kontrol sentuh (d-pad) otomatis muncul di HP

## Dua bahasa (ID/EN)
Tombol **🌐 ID/EN** ada di layar intro dan di HUD (shortcut: tombol `L`). Pilihan bahasa tersimpan di browser.
Di `data.js`, setiap teks bisa ditulis biasa (`"Halo"`, tampil sama di kedua bahasa) atau dwibahasa:
```js
desc: { id: "Game petualangan RPG.", en: "An RPG adventure game." }
```
Teks bawaan game (nama ruangan, tombol, achievement) ada di objek `STR` di bagian atas `game.js`.

## Cara mengganti isi
Edit **`data.js`** saja. Gambar (foto, sertifikat, screenshot proyek, CV) taruh di folder `assets/`.
Exhibit akan muncul otomatis sesuai jumlah data (maks 12 per ruangan; lebihnya masuk ke "Archive Server").

## Menjalankan di komputer
```
python -m http.server 5500
```
lalu buka http://localhost:5500 (atau langsung buka `index.html`).

## Performa
Web ini 100% statis (tanpa server/database), jadi berapa pun pengunjungnya ditangani CDN hosting.
Supaya tetap ringan di perangkat pengunjung:
- **Mode Lite otomatis**: HP / perangkat ≤4 core atau ≤4 GB RAM langsung pakai resolusi lebih rendah tanpa partikel debu.
  Perangkat lain juga otomatis pindah ke Lite kalau FPS-nya turun di bawah ~45.
- Game berhenti merender saat layar intro atau jendela exhibit terbuka, dan saat tab tidak aktif.
- Gambar sertifikat baru dimuat saat bingkainya terlihat di layar.
- **Kompres gambar** sebelum ditaruh di `assets/`: pakai format `.webp`/`.jpg`, lebar ±1200px, idealnya <200 KB per file
  (bisa pakai https://squoosh.app).

## Deploy (gratis)
Upload folder ini ke GitHub, lalu aktifkan **GitHub Pages**, atau drag-and-drop ke **Netlify** / **Vercel**.
