# PROMPT LOVABLE — HAIFA OFFICIAL STORE
## Website E-Commerce Busana Muslimah + Admin Panel

---

## KONTEKS PROYEK

Buat website e-commerce lengkap bernama **Haifa Official Store** — brand busana muslimah premium Indonesia yang terinspirasi nilai-nilai Islami dan solidaritas Palestina. Website terdiri dari dua bagian: **Storefront (publik)** dan **Admin Panel (privat)**.

---

## BRAND IDENTITY (wajib konsisten di seluruh halaman)

**Nama Brand:** Haifa Official Store
**Tagline:** Anggun dalam Iman, Indah dalam Hijab
**Sub-tagline:** الحجاب نور، والنور جمال

**Warna:**
- Primary: `#B17457` (Clay Brown)
- Background: `#FBF7F0` (Off White)
- Dark text: `#4C4947` (Charcoal Grey)
- Accent warm: `#E8A98A` (Peach)
- Accent dark: `#C96D3F` (Peach Dark)
- Surface cream: `#F7EFD8`

**Font:**
- Heading: DM Serif Display (italic untuk aksen)
- Body: Poppins (300/400/500)
- Arabic: Scheherazade New

**Pattern:** Keffiyeh pattern sebagai elemen dekoratif — gunakan CSS repeating-linear-gradient merah Palestine (`rgba(192,57,43,0.1)`) untuk border, section divider, atau background accent.

---

## BAGIAN 1: STOREFRONT (Halaman Publik)

### A. Navigasi & Layout Global

**Top Navbar (sticky):**
- Logo "haifa" dengan ikon kaligrafi Kufi (bisa SVG sederhana kotak-kotak geometris coklat)
- Menu desktop: Beranda, Koleksi, Produk, Palestine Series, Tentang Kami
- Ikon kanan: Search, Wishlist (dengan badge), Cart (dengan badge jumlah item)
- Mobile: hamburger menu → slide-in drawer dari kiri
- Efek: background blur `backdrop-filter: blur(24px)` saat scroll

**Bottom Navigation (mobile only):**
- 5 tab: Beranda, Koleksi, Cari, Wishlist, Keranjang
- Active state dengan warna Clay Brown

**Custom Cursor (desktop only):**
- Dot kecil + ring mengikuti mouse dengan lag smooth
- Ring membesar saat hover pada elemen interaktif

---

### B. Halaman Beranda

**Hero Section:**
- Full viewport height
- Background: foto muslimah outdoor dengan filter `brightness(0.55) saturate(0.85) sepia(0.15)`
- Overlay gradient gelap dari bawah
- Konten teks di kiri bawah:
  - Eyebrow: "New Collection 2025"
  - Heading besar: "Anggun dalam *Iman*, Indah dalam *Hijab*" (kata italic = warna peach)
  - Teks Arab: الحجاب نور، والنور جمال
  - Deskripsi singkat brand
  - 2 CTA button: "Belanja Sekarang" (filled) + "Lihat Koleksi" (ghost)
- Desktop: floating 3D product card di kanan dengan efek rotateY parallax saat mouse move
- 3 floating chips animasi (New Arrivals, Palestine Series, Free Ongkir)
- Scroll indicator dengan garis vertikal animasi pulse

**Marquee Bar:**
- Background charcoal, teks uppercase tracking lebar
- Konten: Premium Hijab · Busana Muslimah · Haifa Collection · Palestine Series · Free Ongkir se-Indonesia · 100% Bahan Premium
- Loop infinite tanpa jeda

**Koleksi Section:**
- Label: "Koleksi Terkurasi"
- Grid 2 kolom (mobile), 4 kolom (desktop)
- 4 kartu kategori: Kerudung Premium (48 produk), Gamis (32 produk), Palestine Series (16 produk), Aksesoris Hijab (24 produk)
- Setiap kartu: foto background, gradient overlay gelap, nama kategori (DM Serif italic), jumlah produk, arrow icon di pojok kanan atas
- Hover: scale up foto + shadow lebih dalam
- Klik → masuk halaman koleksi tersebut

**Produk Pilihan Section:**
- Label: "Produk Pilihan"
- Tab filter: Semua / Kerudung / Gamis / Palestine
- Grid produk: 2 kolom mobile, 4 kolom desktop
- Setiap kartu produk:
  - Foto dengan badge (Best Seller / New / Sold Out)
  - Nama produk
  - Varian/material
  - Harga (coret jika ada diskon) + harga baru
  - Tombol "+ Keranjang" atau "Notify Me" jika sold out
  - Heart icon untuk wishlist
  - Hover: foto zoom ringan + tombol muncul
- Animasi stagger reveal saat scroll (delay 70ms antar kartu)

**Editorial Banner:**
- Full-width image dengan teks overlay
- "Modest Fashion Tanpa Kompromi" + CTA "Lihat Lookbook"

**Palestine × Haifa Section:**
- Split layout: teks kiri, foto kanan
- Background dengan keffiyeh pattern subtle
- Heading: "Berpakaian dengan *Makna* & Solidaritas"
- Teks Arab: فلسطين في قلبنا
- 4 poin keunggulan dengan checkmark:
  - 10% donasi untuk kemanusiaan Palestina
  - Motif keffiyeh eksklusif Haifa
  - Material premium ramah lingkungan
  - Diproduksi pengrajin lokal
- CTA: "Lihat Koleksi Palestine"
- Foto produk Palestine Series di kanan

**Stats Section:**
- 3 angka besar: 12K+ Pelanggan Setia / 200+ Pilihan Produk / 100% Bahan Premium
- Background cream dengan subtle pattern

**Newsletter Section:**
- Input email + tombol daftar
- Teks: "Daftar dan dapatkan diskon 15% untuk pembelian pertama Anda"

**Footer:**
- Logo + deskripsi brand
- 4 kolom link: Produk / Informasi / Bantuan / Ikuti Kami
- Social media icons: Instagram, TikTok, WhatsApp
- Copyright

---

### C. Halaman Produk / Shop

- Header dengan foto hero + judul "Shop"
- Filter sidebar (desktop) atau filter bottom sheet (mobile):
  - Kategori, Rentang Harga, Ukuran, Warna, In Stock saja
- Sort: Terbaru, Terlaris, Harga Naik/Turun
- Grid produk sama dengan komponen di beranda
- Pagination atau infinite scroll

**Halaman Detail Produk:**
- Galeri foto (swipe mobile, thumbnail desktop)
- Nama produk, harga, badge promo jika ada
- Pilih varian: Warna (swatch bulat) + Ukuran
- Stok tersedia / habis
- Tombol: "Tambah ke Keranjang" + "Beli Sekarang"
- Tab deskripsi: Deskripsi / Bahan & Perawatan / Ukuran
- Produk terkait di bawah

---

### D. Keranjang & Checkout

**Halaman Keranjang:**
- List produk dengan foto, nama, varian, harga, qty control
- Hapus item
- Subtotal + estimasi ongkir
- Tombol "Lanjut ke Checkout"

**Halaman Checkout:**
- Form: nama, alamat lengkap, kota, kode pos, nomor HP
- Pilih kurir (JNE, J&T, SiCepat) + estimasi harga ongkir
- Ringkasan order
- Kode promo/voucher
- Metode pembayaran: Transfer Bank / QRIS / COD
- Tombol konfirmasi order

---

### E. Halaman Lain

**About Us:** Visi Misi, Core Values, cerita brand, foto tim/produk
**Lookbook/Galeri:** Grid foto produk style editorial
**Blog:** List artikel + halaman detail artikel
**Kontak:** Form kontak + info WhatsApp, email, alamat

---

## BAGIAN 2: ADMIN PANEL

Route: `/admin` — protected dengan login (email + password)
Sidebar navigasi kiri dengan ikon.

---

### A. Dashboard

Tampilkan:
- Total pendapatan hari ini / bulan ini (grafik garis 30 hari)
- Total pesanan (Baru / Diproses / Dikirim / Selesai)
- Produk aktif vs stok habis
- Pengunjung website (chart sederhana)
- 5 pesanan terbaru (tabel ringkas)
- 5 produk terlaris (dengan foto kecil)

---

### B. Manajemen Produk

**List Produk:**
- Tabel: foto, nama, kategori, harga, stok, status (aktif/nonaktif), aksi (edit/hapus)
- Filter: kategori, status stok
- Search by nama
- Bulk action: nonaktifkan / hapus

**Tambah/Edit Produk:**
- Upload foto produk (multiple, bisa drag & drop, urutan bisa diatur)
- Nama produk
- Kategori (dropdown: Kerudung / Gamis / Palestine Series / Aksesoris)
- Deskripsi (rich text editor)
- Harga normal + harga promo (opsional)
- Stok
- Varian: tambah kombinasi Warna + Ukuran dengan stok per varian
- Badge: pilih None / Best Seller / New / Limited / Sold Out
- Bahan & Perawatan (tab terpisah)
- Status: Draft / Aktif
- Tombol: Simpan Draft / Publikasikan

---

### C. Manajemen Pesanan

**List Pesanan:**
- Tabel: ID pesanan, nama pembeli, produk, total, status, tanggal
- Filter status: Baru / Dikonfirmasi / Dikemas / Dikirim / Selesai / Dibatalkan
- Klik pesanan → detail lengkap

**Detail Pesanan:**
- Info pembeli + alamat
- List produk yang dibeli
- Total + metode bayar
- Resi pengiriman (input manual atau auto)
- Update status pesanan
- Catatan internal

---

### D. Manajemen Blog

**List Artikel:**
- Tabel: judul, kategori, status (draft/published), tanggal, aksi

**Tambah/Edit Artikel:**
- Judul
- Slug URL (auto-generate dari judul)
- Foto thumbnail (upload)
- Kategori (Style Guide / Tips Hijab / Palestine / Brand Story)
- Konten (rich text editor dengan heading, bold, italic, list, foto)
- Meta description (untuk SEO)
- Status: Draft / Publish
- Tanggal publish

---

### E. Manajemen Promo & Voucher

**List Promo:**
- Tabel: nama promo, tipe, nilai diskon, berlaku, status

**Tambah Promo:**
- Nama promo (misal: "Promo Kemerdekaan 17%")
- Tipe:
  - Voucher kode (input kode, misal: HAIFA17)
  - Diskon otomatis (berlaku tanpa kode)
  - Flash sale (harga khusus untuk produk tertentu + timer countdown)
  - Free ongkir (minimal belanja X)
  - Beli X Gratis Y
- Nilai diskon: persentase atau nominal
- Minimum pembelian
- Maksimum penggunaan (total / per user)
- Masa berlaku: tanggal mulai & selesai
- Produk yang berlaku: semua / pilihan kategori / pilihan produk spesifik
- Status: Aktif / Nonaktif

**Flash Sale Manager:**
- Pilih produk
- Set harga flash sale
- Set durasi (timer countdown tampil di storefront)
- Stok khusus flash sale

---

### F. Manajemen Konten Beranda

Fitur drag-and-drop untuk atur ulang section beranda:
- Edit teks hero (heading, subheading, CTA)
- Upload/ganti foto hero
- Atur banner promo (gambar + link)
- Aktif/nonaktifkan section (newsletter, Palestine section, dll)

---

### G. Pengaturan Toko

- Nama toko, tagline, logo, favicon
- Info kontak: WhatsApp, email, Instagram, TikTok
- Pengaturan ongkir: integrasi RajaOngkir atau flat rate
- Metode pembayaran: aktif/nonaktif per metode
- Rekening bank untuk transfer
- Pengaturan donasi Palestine (% dari setiap transaksi)
- WhatsApp Business number untuk order via WA

---

## FITUR TAMBAHAN YANG DIREKOMENDASIKAN

**1. WhatsApp Order Integration**
Tombol "Order via WhatsApp" di setiap halaman produk. Klik → buka WhatsApp dengan pesan otomatis berisi nama produk, varian, harga.

**2. Countdown Timer Flash Sale**
Banner countdown di beranda saat flash sale aktif. Harga coret + harga flash + timer real-time.

**3. Wishlist**
Simpan produk favorit. Login tidak wajib (simpan di localStorage), login untuk sync antar device.

**4. Product Reviews**
Pembeli bisa beri rating bintang + komentar + upload foto. Tampil di halaman produk.

**5. Size Guide Modal**
Popup tabel ukuran saat klik "Panduan Ukuran" di halaman produk.

**6. Stock Notification**
Tombol "Beritahu Saya" untuk produk sold out. Input email → notif saat stok tersedia.

**7. Recently Viewed**
Row produk yang baru dilihat di bagian bawah halaman produk.

**8. Order Tracking**
Halaman publik: input nomor pesanan → lihat status pesanan real-time.

**9. Affiliate / Referral**
Setiap customer dapat link referral unik. Dapat cashback/diskon jika ada yang beli lewat link mereka.

**10. SEO Ready**
Meta title, description, OG image untuk setiap halaman. Sitemap otomatis. URL produk yang SEO-friendly.

---

## TECH STACK (sesuaikan dengan Lovable/Supabase)

- **Frontend:** React + Tailwind CSS
- **Backend/DB:** Supabase (auth, database, storage untuk foto produk)
- **File upload:** Supabase Storage
- **Rich text editor:** Quill.js atau TipTap
- **Charts dashboard:** Recharts
- **State management:** Zustand atau React Context

---

## CATATAN PENTING

1. Semua halaman mobile-first dan responsive
2. Loading state di setiap fetch data (skeleton loader, bukan spinner saja)
3. Toast notification untuk setiap aksi: tambah keranjang, hapus, simpan
4. Animasi subtle: scroll reveal, hover transition, page transition
5. Pattern keffiyeh Palestina digunakan sebagai elemen dekoratif di section Palestine, bukan sebagai background penuh yang mengganggu keterbacaan
6. Font Arabic (Scheherazade New) hanya untuk teks Arab, bukan seluruh konten
7. Admin panel: route `/admin` redirect ke `/admin/login` jika belum auth, redirect ke `/admin/dashboard` jika sudah

---

*Mulai dengan halaman Beranda + sistem produk dulu, lalu lanjut ke checkout dan admin panel secara bertahap.*