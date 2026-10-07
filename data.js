/* =========================================================
   DATA PORTOFOLIO — edit file ini saja untuk mengganti isi web.
   Semua ruangan & exhibit di dalam lab dibuat otomatis dari data ini.

   DUA BAHASA (ID/EN):
   - Teks biasa  : "Halo"                       -> tampil sama di kedua bahasa
   - Dwibahasa   : { id: "Halo", en: "Hello" }  -> mengikuti tombol 🌐 ID/EN
   Bisa dipakai di field teks mana pun (name, role, desc, title, dst).

   - Gambar: taruh di folder assets/ lalu tulis path-nya, mis. "assets/sertif-1.jpg"
   - Proyek: "image" = screenshot utama, "gallery" = screenshot tambahan (opsional)
   - Kosongkan ("") field yang tidak dipakai.
   - Maks 12 exhibit per ruangan; kelebihannya otomatis masuk ke "Server Arsip".
   ========================================================= */
window.PORTFOLIO = {
  name: "Danish Vesa Bintang Parikesit",
  role: { id: "Mahasiswa Informatika & Game Developer", en: "Informatics Student & Game Developer" },
  tagline: {
    id: "Membangun hal-hal bermanfaat dengan kode, data, dan rasa ingin tahu.",
    en: "Building useful things with code, data, and curiosity."
  },
  photo: "",                 // contoh: "assets/me.jpg"
  location: "Yogyakarta, Indonesia",
  cvUrl: "",                 // contoh: "assets/cv.pdf" — kalau diisi, muncul kios CV di Lobi

  about: {
    bio: {
      id: "Halo! Saya seorang developer yang senang mengubah ide menjadi pengalaman interaktif. Ganti teks ini dengan ceritamu sendiri: apa yang kamu kerjakan, apa yang memotivasimu, dan apa yang sedang kamu cari.",
      en: "Hi! I'm a developer who loves turning ideas into interactive experiences. Replace this text with your own story: what you do, what drives you, and what you're looking for."
    },
    highlights: [
      { id: "3+ tahun membangun aplikasi web", en: "3+ years building web applications" },
      { id: "Tertarik pada AI, game development, dan UI/UX", en: "Interested in AI, game dev, and UI/UX" },
      { id: "Terbuka untuk magang & proyek freelance", en: "Open for internships & freelance work" }
    ],
    // XXX = belum diisi
    education: [
      { school: "XXX", degree: "XXX", period: "XXX", desc: "XXX" },
      { school: "XXX", degree: "XXX", period: "XXX", desc: "XXX" }
    ],
    experience: [
      {
        company: "PT Vinix Seven Aurum (Vinix7) · MSIB Batch 4",
        role: { id: "Magang Python Machine Learning", en: "Python Machine Learning Intern" },
        period: { id: "23 Feb — 23 Jun 2026", en: "Feb 23 — Jun 23, 2026" },
        desc: {
          id: "Mengikuti program Magang Mandiri MSIB (Kampus Merdeka) Batch 4 di Divisi Python Machine Learning dan menyelesaikannya dengan predikat sangat baik.",
          en: "Took part in the MSIB (Kampus Merdeka) Batch 4 independent internship in the Python Machine Learning Division and completed it with a very good rating."
        }
      },
      { company: "XXX", role: "XXX", period: "XXX", desc: "XXX" }
    ],
    extras: [
      {
        title: { id: "Hobi", en: "Hobbies" }, icon: "🎮",
        text: { id: "Membuat game, fotografi, dan membaca novel fiksi ilmiah.", en: "Game development, photography, and reading sci-fi." }
      }
    ]
  },

  // level: 0-100
  skills: [
    { name: "JavaScript", icon: "JS",  category: { id: "Pemrograman", en: "Programming" }, level: 88, desc: "ES6+, DOM, async, Canvas API." },
    { name: "Python",     icon: "PY",  category: { id: "Pemrograman", en: "Programming" }, level: 80, desc: { id: "Scripting, analisis data, otomasi.", en: "Scripting, data analysis, automation." } },
    { name: "React",      icon: "⚛",   category: "Frontend", level: 78, desc: { id: "Hooks, state management, desain komponen.", en: "Hooks, state management, component design." } },
    { name: "HTML & CSS", icon: "</>", category: "Frontend", level: 90, desc: { id: "HTML semantik, layout responsif, animasi.", en: "Semantic HTML, responsive layouts, animations." } },
    { name: "Node.js",    icon: "NJ",  category: "Backend",  level: 70, desc: { id: "Membuat REST API dengan Express.", en: "REST APIs with Express." } },
    { name: "SQL",        icon: "DB",  category: "Data",     level: 72, desc: { id: "MySQL & PostgreSQL, optimasi query.", en: "MySQL & PostgreSQL, query optimization." } },
    { name: "UI/UX",      icon: "UX",  category: { id: "Desain", en: "Design" }, level: 75, desc: { id: "Wireframe dan prototipe di Figma.", en: "Wireframing and prototyping in Figma." } },
    { name: "Problem Solving", icon: "∑", category: "Soft Skill", level: 85, desc: { id: "Memecah masalah kompleks menjadi langkah-langkah yang jelas.", en: "Breaking down complex problems into clear steps." } }
  ],

  tools: [
    { name: "VS Code", icon: "🧩", category: "Editor", desc: { id: "Andalan harian untuk semua proyek.", en: "Daily driver for every project." } },
    { name: "Git & GitHub", icon: "🐙", category: "Version Control", desc: "Branching, pull request, CI." },
    { name: "Figma", icon: "🎨", category: { id: "Desain", en: "Design" }, desc: { id: "Desain UI dan prototipe.", en: "UI design and prototyping." } },
    { name: "Docker", icon: "🐳", category: "DevOps", desc: { id: "Membungkus aplikasi agar lingkungannya konsisten.", en: "Containerizing apps for consistent environments." } },
    { name: "Postman", icon: "📮", category: "API", desc: { id: "Menguji dan mendokumentasikan API.", en: "Testing and documenting APIs." } },
    { name: "Unity", icon: "🕹", category: "Game Engine", desc: { id: "Membuat prototipe game kecil.", en: "Prototyping small games." } }
  ],

  // urutan = urutan di Galeri Sertifikat (maks 12 per ruangan)
  certificates: [
    { title: { id: "Magang MSIB Batch 4 — Python Machine Learning", en: "MSIB Batch 4 Internship — Python Machine Learning" },
      issuer: "PT Vinix Seven Aurum (Vinix7)", date: { id: "23 Feb – 23 Jun 2026", en: "Feb 23 – Jun 23, 2026" },
      image: "assets/certs/magang-vinix7.jpg", url: "",
      desc: { id: "Menyelesaikan program Magang Mandiri MSIB (Kampus Merdeka) Batch 4 dengan predikat sangat baik di Divisi Python Machine Learning. No: 007/Batch-IV-MSIB/VINIX7/Div-Python Machine Learning",
              en: "Completed the MSIB (Kampus Merdeka) Batch 4 independent internship program with a very good rating in the Python Machine Learning Division. No: 007/Batch-IV-MSIB/VINIX7/Div-Python Machine Learning" },
      tags: ["Python", "Machine Learning", { id: "Magang", en: "Internship" }, "MSIB"] },
    { title: "AI for Software Engineer", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/ai-software-engineer.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Memanfaatkan AI dalam alur kerja software engineering. ID kredensial: MS-8/12/2025-CVAP9wOHDmSvRq28HmnO",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Using AI in the software engineering workflow. Credential ID: MS-8/12/2025-CVAP9wOHDmSvRq28HmnO" },
      tags: ["AI", "Software Engineering"] },
    { title: "Artificial Intelligence Introduction", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/ai-introduction.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Pengenalan konsep dasar kecerdasan buatan. ID kredensial: MS-8/12/2025-tqtFIjkl3CcTtCR9c26a",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Introduction to the fundamentals of artificial intelligence. Credential ID: MS-8/12/2025-tqtFIjkl3CcTtCR9c26a" },
      tags: ["AI"] },
    { title: "Maximizing the Use of AI Tools", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/maximizing-ai-tools.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Memaksimalkan berbagai AI tools untuk produktivitas. ID kredensial: MS-8/12/2025-rGa78gWkDRzMGKjEnVLI",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Getting the most out of AI tools for productivity. Credential ID: MS-8/12/2025-rGa78gWkDRzMGKjEnVLI" },
      tags: ["AI", { id: "Produktivitas", en: "Productivity" }] },
    { title: "Maximizing the Use of ChatGPT", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/maximizing-chatgpt.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Teknik memaksimalkan ChatGPT dan prompting. ID kredensial: MS-8/12/2025-Mu4dFTn6LAZZXCwpmC63",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Techniques for getting the most out of ChatGPT and prompting. Credential ID: MS-8/12/2025-Mu4dFTn6LAZZXCwpmC63" },
      tags: ["AI", "ChatGPT"] },
    { title: "AI for Spreadsheets", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/ai-spreadsheets.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Memanfaatkan AI untuk mengolah data di spreadsheet. ID kredensial: MS-8/12/2025-zm4yUQedVw59JuriQpa8",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Using AI to work with data in spreadsheets. Credential ID: MS-8/12/2025-zm4yUQedVw59JuriQpa8" },
      tags: ["AI", "Spreadsheet"] },
    { title: "AI for Content Marketing", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/ai-content-marketing.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Memanfaatkan AI untuk membuat konten pemasaran. ID kredensial: MS-8/12/2025-afHYavizqfmksDhd26Wi",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Using AI to create marketing content. Credential ID: MS-8/12/2025-afHYavizqfmksDhd26Wi" },
      tags: ["AI", "Marketing"] },
    { title: "Note-Taking Using AI", issuer: "MySkill", date: { id: "8 Desember 2025", en: "December 8, 2025" },
      image: "assets/certs/note-taking-ai.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Artificial Intelligence. Mencatat dan merangkum informasi dengan bantuan AI. ID kredensial: MS-8/12/2025-MkzTmULgUum6xd7zrFxu",
              en: "MySkill e-learning course, topic: Artificial Intelligence. Taking and summarizing notes with the help of AI. Credential ID: MS-8/12/2025-MkzTmULgUum6xd7zrFxu" },
      tags: ["AI", { id: "Produktivitas", en: "Productivity" }] },
    { title: "Introduction to CSS", issuer: "MySkill", date: { id: "12 Oktober 2025", en: "October 12, 2025" },
      image: "assets/certs/introduction-css.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Frontend - CSS. Dasar-dasar CSS untuk menata tampilan web. ID kredensial: MS-12/10/2025-Y79oEup3HewOAWlsP0gB",
              en: "MySkill e-learning course, topic: Frontend - CSS. CSS fundamentals for styling web pages. Credential ID: MS-12/10/2025-Y79oEup3HewOAWlsP0gB" },
      tags: ["CSS", "Frontend"] },
    { title: "CSS Box Model", issuer: "MySkill", date: { id: "12 Oktober 2025", en: "October 12, 2025" },
      image: "assets/certs/css-box-model.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Frontend - CSS. Memahami box model CSS: margin, border, padding, dan content. ID kredensial: MS-12/10/2025-ZCa6blKbyX3ytMrOkmUu",
              en: "MySkill e-learning course, topic: Frontend - CSS. Understanding the CSS box model: margin, border, padding, and content. Credential ID: MS-12/10/2025-ZCa6blKbyX3ytMrOkmUu" },
      tags: ["CSS", "Frontend"] },
    { title: "Internet Introduction", issuer: "MySkill", date: { id: "12 Oktober 2025", en: "October 12, 2025" },
      image: "assets/certs/internet-introduction.jpg", url: "",
      desc: { id: "Kursus e-learning MySkill, topik Website Development Fundamental. Dasar cara kerja internet dan web. ID kredensial: MS-12/10/2025-SfHUoJLya7JebST1vo20",
              en: "MySkill e-learning course, topic: Website Development Fundamental. Fundamentals of how the internet and the web work. Credential ID: MS-12/10/2025-SfHUoJLya7JebST1vo20" },
      tags: ["Web", { id: "Dasar", en: "Fundamentals" }] }
  ],

  projects: [
    { title: "Legenda Lembah Angin", icon: "🗡",
      desc: {
        id: "Game RPG turn-based dengan sistem ATB (Active Time Battle) yang bisa dimainkan langsung di browser. Tiga pengembara (Kael, Rina, dan Lyra) berangkat menghentikan Wyrm Kabut. Fitur: bar BURST untuk jurus pamungkas, kelemahan elemen (Api, Es, Petir), serangan kritis, status racun, level up & skill baru, desa dengan toko dan NPC, peti harta, pertarungan bos, serta save/load. Semua grafis pixel art dan musik chiptune dibuat lewat kode. Tersedia juga versi Godot 4.",
        en: "A turn-based RPG with an ATB (Active Time Battle) system, playable right in the browser. Three wanderers (Kael, Rina, and Lyra) set out to stop the Mist Wyrm. Features: BURST gauge for ultimate moves, elemental weaknesses (Fire, Ice, Lightning), critical hits, poison status, level-ups & new skills, a village with shops and NPCs, treasure chests, a boss fight, and save/load. All pixel art and chiptune music are generated in code. A Godot 4 version is also available."
      },
      tech: ["JavaScript", "HTML5 Canvas", "Web Audio", "Godot 4"],
      image: "assets/projects/legenda-battle.jpg",
      gallery: ["assets/projects/legenda-village.jpg", "assets/projects/legenda-title.jpg"],
      demo: "https://dans-vsa.github.io/legenda-lembah-angin/",
      repo: "https://github.com/Dans-Vsa/legenda-lembah-angin" },
    { title: "Kopi Tycoon", icon: "☕",
      desc: {
        id: "Game incremental (idle clicker) bertema kedai kopi untuk mata kuliah Workshop Game. Mulai dari menyeduh kopi manual hingga punya perkebunan sendiri: 6 generator otomatis, tampilan kafe yang hidup dengan pelanggan dan dekorasi, sistem unlock, upgrade & prestige (Biji Emas), save otomatis, dan penghasilan offline. Semua gambar (SVG) dan suara dibuat khusus untuk proyek ini.",
        en: "An incremental (idle clicker) coffee shop game made for the Game Workshop course. Start by brewing coffee by hand and grow to owning a plantation: 6 automatic generators, a lively café view with customers and decorations, unlock system, upgrades & prestige (Golden Beans), auto-save, and offline earnings. All art (SVG) and sound were made specifically for this project."
      },
      tech: ["Godot 4", "GDScript"],
      image: "assets/projects/kopi-tycoon.jpg",
      demo: "https://github.com/Dans-Vsa/kopi-tycoon/releases",
      repo: "https://github.com/Dans-Vsa/kopi-tycoon" }
  ],

  contact: [
    { label: "Email",     icon: "✉", value: "XXX",                       url: "#" },
    { label: "GitHub",    icon: "🐙", value: "github.com/Dans-Vsa",       url: "https://github.com/Dans-Vsa" },
    { label: "LinkedIn",  icon: "in", value: "XXX",                       url: "#" },
    { label: "Instagram", icon: "📷", value: "XXX",                       url: "#" }
  ],

  // Robot asisten di Lobi
  guide: {
    name: "ARIA",
    lines: [
      { id: "Selamat datang di lab, pengunjung! Saya ARIA, asisten riset di sini.",
        en: "Welcome to the lab, visitor! I'm ARIA, the research assistant." },
      { id: "Fasilitas ini menyimpan semua hal tentang sang peneliti: keahlian, tools, sertifikat, dan proyek.",
        en: "This facility stores everything about the researcher: skills, tools, certificates, and projects." },
      { id: "Berjalanlah dengan WASD atau tombol panah. Tahan Shift untuk berlari. Tekan L untuk ganti bahasa.",
        en: "Walk with WASD or the arrow keys. Hold Shift to run. Press L to switch language." },
      { id: "Exhibit dengan tanda ◆ melayang belum kamu scan. Mendekatlah lalu tekan E untuk memeriksanya.",
        en: "Exhibits with a floating ◆ haven't been scanned yet. Get close and press E to inspect." },
      { id: "Scan semua exhibit untuk mendapatkan AKSES PENUH. Semoga berhasil!",
        en: "Scan every exhibit to reach FULL CLEARANCE. Good luck!" }
    ]
  }
};
