/* =========================================================
   DATA PORTOFOLIO — edit file ini saja untuk mengganti isi web.
   Semua ruangan & exhibit di dalam lab dibuat otomatis dari data ini.
   Isi disamakan dengan portofolio utama: https://my-portofolio-bay-nine.vercel.app

   DUA BAHASA (ID/EN):
   - Teks biasa  : "Halo"                       -> tampil sama di kedua bahasa
   - Dwibahasa   : { id: "Halo", en: "Hello" }  -> mengikuti tombol 🌐 ID/EN
   Bisa dipakai di field teks mana pun (name, role, desc, title, dst).

   - Gambar: taruh di folder assets/ lalu tulis path-nya, mis. "assets/sertif-1.jpg"
   - Proyek: "image" = screenshot utama, "gallery" = screenshot tambahan (opsional)
   - Skill/tools: "usedIn" = daftar repo GitHub yang memakai tech tsb ([] = belum ada repo publik)
   - Kosongkan ("") field yang tidak dipakai.
   - Maks 12 exhibit per ruangan; kelebihannya otomatis masuk ke "Server Arsip".
   ========================================================= */
window.PORTFOLIO = {
  name: "Danish Vesa Bintang Parikesit",
  nickname: "Vesa",
  githubUser: "Dans-Vsa",
  role: "Frontend Developer & UI/UX Designer",
  tagline: {
    id: "Mengubah ide kreatif dan kebutuhan pengguna menjadi antarmuka web modern, mudah diakses, dan terasa natural.",
    en: "Turning creative concepts and user needs into modern, accessible web interfaces that feel obvious."
  },
  photo: "",
  location: "Yogyakarta, Indonesia",
  cvUrl: { id: "assets/cv/Danish-Vesa-CV-ID.pdf", en: "assets/cv/Danish-Vesa-CV-EN.pdf" },

  about: {
    bio: {
      id: "Saya Danish Vesa Bintang Parikesit (panggil saja Vesa). Frontend Developer dan UI/UX Designer dengan pengalaman lebih dari 2 tahun membangun aplikasi web yang modern, responsif, dan berpusat pada pengguna. Perjalanan saya berawal dari rasa penasaran tentang bagaimana antarmuka yang baik bisa mengubah cara orang merasakan sebuah produk. Sekarang saya mengubah desain mockup menjadi website interaktif yang presisi dengan React, Tailwind CSS, dan tooling frontend modern. Bagi saya, desain yang hebat bukan sekadar tampilan. Desain yang hebat berarti fungsi yang mulus, aksesibel, dan pengalaman digital yang bisa diandalkan setiap hari.",
      en: "I'm Danish Vesa Bintang Parikesit (call me Vesa). A Frontend Developer and UI/UX Designer with over 2 years of experience creating modern, responsive, user-centered web applications. My journey started with a fascination for how a good interface can change the way people feel about a product. Today I turn design mockups into pixel-perfect, interactive websites with React, Tailwind CSS and modern frontend tooling. For me, great design is more than looks. It is smooth functionality, accessibility, and digital journeys that real people can rely on every day."
    },
    highlights: [
      { id: "30+ proyek selesai", en: "30+ projects completed" },
      { id: "2+ tahun pengalaman", en: "2+ years of experience" },
      { id: "15+ klien puas", en: "15+ happy clients" },
      { id: "Terbuka untuk proyek freelance dan posisi full-time", en: "Available for freelance projects and full-time roles" }
    ],
    education: [
      {
        school: { id: "Universitas Teknologi Digital Indonesia (UTDI)", en: "Digital Technology University of Indonesia (UTDI)" },
        degree: "Informatika",
        period: "",
        desc: { id: "Universitas", en: "University" }
      }
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
      }
    ],
    // "Yang saya kerjakan" + penutup dari halaman About portofolio utama
    extras: [
      { title: "Frontend Development", icon: "💻",
        text: { id: "Antarmuka yang responsif dan cepat dengan React dan Tailwind CSS, dari landing page sampai aplikasi web utuh.",
                en: "Responsive, fast interfaces in React and Tailwind CSS, from landing pages to full web apps." } },
      { title: "UI/UX Design", icon: "🎨",
        text: { id: "Wireframe, prototipe, dan design system di Figma yang dirancang sesuai cara orang benar-benar memakai produk.",
                en: "Wireframes, prototypes and design systems in Figma, shaped around how people actually use a product." } },
      { title: "Creative Design", icon: "✨",
        text: { id: "Identitas visual, animasi, dan detail kecil yang memberi produk karakternya sendiri.",
                en: "Visual identity, motion and small details that give a product its own character." } },
      { title: { id: "Di Luar Ngoding", en: "Beyond Code" }, icon: "🧭",
        text: { id: "Di luar ngoding dan mendesain, saya suka mengikuti tren web, bereksperimen dengan design system, atau mengulik ide-ide open source.",
                en: "When I'm not coding or designing, I'm exploring web trends, experimenting with design systems, or tinkering with open-source ideas." } }
    ]
  },

  // Tech stack (sama dengan portofolio utama). Lab Keahlian = frontend, bahasa, game.
  skills: [
    { name: "React",        icon: "⚛",   category: "Frontend",                         usedIn: ["my-portofolio", "MedicalSystem"] },
    { name: "Tailwind CSS", icon: "TW",  category: "Frontend",                         usedIn: ["my-portofolio", "Foodstall-System", "MedicalSystem"] },
    { name: "Bootstrap",    icon: "BS",  category: "Frontend",                         usedIn: [] },
    { name: "JavaScript",   icon: "JS",  category: { id: "Bahasa", en: "Language" },   usedIn: ["legenda-lembah-angin", "PortoGameLab", "fujimoto-archive", "look-back"] },
    { name: "HTML5",        icon: "</>", category: { id: "Bahasa", en: "Language" },   usedIn: ["fujimoto-archive", "chainsaw-man-fanblog", "look-back"] },
    { name: "CSS3",         icon: "CSS", category: { id: "Bahasa", en: "Language" },   usedIn: ["fujimoto-archive", "chainsaw-man-fanblog", "look-back"] },
    { name: "Python",       icon: "PY",  category: { id: "Bahasa", en: "Language" },   usedIn: ["spendwise-api", "gitpulse", "gesture-pilot"] },
    { name: "Java",         icon: "JV",  category: { id: "Bahasa", en: "Language" },   usedIn: ["Game-PlatypusD", "Game-ALIENKI"] },
    { name: "Godot Engine", icon: "GD",  category: "Game Dev",                         usedIn: ["kopi-tycoon", "legenda-lembah-angin"] }
  ],

  // Bengkel Tools = backend, database, desain, dan tools.
  tools: [
    { name: "Node.js",  icon: "🟢", category: "Backend",                         usedIn: [] },
    { name: "PHP",      icon: "🐘", category: "Backend",                         usedIn: ["Foodstall-System", "PFW-InstalBreeze-JetSream"] },
    { name: "Laravel",  icon: "🔺", category: "Backend",                         usedIn: ["Foodstall-System", "PFW-InstalBreeze-JetSream"] },
    { name: "FastAPI",  icon: "⚡", category: "Backend",                         usedIn: ["spendwise-api"] },
    { name: "MySQL",    icon: "🐬", category: "Database",                        usedIn: ["Foodstall-System"] },
    { name: "SQLite",   icon: "🪶", category: "Database",                        usedIn: ["spendwise-api"] },
    { name: "MongoDB",  icon: "🍃", category: "Database",                        usedIn: [] },
    { name: "Figma",    icon: "🎨", category: { id: "Desain", en: "Design" },    usedIn: ["MedicalSystem"] },
    { name: "Git",      icon: "🌿", category: "Tools",                           usedIn: [] },
    { name: "VS Code",  icon: "🧩", category: "Tools",                           usedIn: [] },
    { name: "Docker",   icon: "🐳", category: "Tools",                           usedIn: ["spendwise-api"] },
    { name: "Vite",     icon: "💜", category: "Tools",                           usedIn: ["my-portofolio", "Foodstall-System", "MedicalSystem"] }
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

  // Urutan sama dengan portofolio utama.
  projects: [
    { title: "Legenda Lembah Angin", icon: "🗡",
      desc: {
        id: "RPG turn-based dengan sistem Active Time Battle yang jalan di browser. Tiga pahlawan, kelemahan elemen, jurus burst, pertarungan bos, dan fitur simpan. Semua pixel art dan musik chiptune dibuat lewat kode.",
        en: "Turn-based RPG with an Active Time Battle system that runs in the browser. Three heroes, elemental weaknesses, burst skills, a boss fight and saves, with all pixel art and chiptune music generated in code."
      },
      tech: ["JavaScript", "Canvas", "Godot 4"],
      image: "assets/projects/legenda-battle.jpg",
      gallery: ["assets/projects/legenda-village.jpg", "assets/projects/legenda-title.jpg"],
      demo: "https://dans-vsa.github.io/legenda-lembah-angin/",
      repo: "https://github.com/Dans-Vsa/legenda-lembah-angin" },
    { title: "Kopi Tycoon", icon: "☕",
      desc: {
        id: "Game idle clicker tentang membesarkan kedai kopi, dibuat dengan Godot 4. Enam generator, upgrade, prestige, penghasilan offline, dan suasana kafe yang makin ramai seiring bisnis tumbuh.",
        en: "Idle clicker about growing a coffee shop, built with Godot 4. Six generators, upgrades, prestige, offline earnings and a café scene that fills up as the business grows."
      },
      tech: ["Godot 4", "GDScript", "Web export"],
      image: "assets/projects/kopi-tycoon.jpg",
      demo: "https://dans-vsa.github.io/kopi-tycoon/",
      repo: "https://github.com/Dans-Vsa/kopi-tycoon" },
    { title: "PortoGameLab", icon: "🔬",
      desc: {
        id: "Portofolio yang dijelajahi seperti game. Berjalan di laboratorium riset, scan exhibit, kumpulkan research data dan achievement, lengkap dengan minimap dan UI dua bahasa.",
        en: "A portfolio you explore as a game. Walk a research lab, scan exhibits, collect research data and achievements, with a minimap and a bilingual UI."
      },
      tech: ["JavaScript", "Canvas", "Game design"],
      image: "assets/projects/gamelab.webp",
      demo: "https://dans-vsa.github.io/PortoGameLab/",
      repo: "https://github.com/Dans-Vsa/PortoGameLab" },
    { title: "Fujimoto Archive", icon: "📚",
      desc: {
        id: "Arsip fan semua karya Tatsuki Fujimoto dengan enam situs pendamping: Chainsaw Man, Look Back, Fire Punch, Goodbye Eri, Just Listen to the Song, dan Before Chainsaw Man.",
        en: "Fan archive of every Tatsuki Fujimoto work with six companion sites: Chainsaw Man, Look Back, Fire Punch, Goodbye Eri, Just Listen to the Song and Before Chainsaw Man."
      },
      tech: ["JavaScript", { id: "7 situs", en: "7 sites" }, "ID/EN"],
      image: "assets/projects/fujimoto.webp",
      demo: "https://dans-vsa.github.io/fujimoto-archive/",
      repo: "https://github.com/Dans-Vsa/fujimoto-archive" },
    { title: "SpendWise API", icon: "💰",
      desc: {
        id: "REST API keuangan pribadi dengan autentikasi JWT, transaksi, anggaran bulanan, laporan, serta impor/ekspor CSV. Diuji dengan pytest, siap Docker, dan memakai CI.",
        en: "REST API for personal finance with JWT auth, transactions, monthly budgets, reports and CSV import/export. Tested with pytest and shipped with Docker and CI."
      },
      tech: ["FastAPI", "SQLAlchemy", "Docker"],
      image: "assets/projects/spendwise.webp",
      demo: "",
      repo: "https://github.com/Dans-Vsa/spendwise-api" },
    { title: "gitpulse", icon: "📈",
      desc: {
        id: "Analitik terminal untuk repositori git: kontributor, hotspot perubahan, dan heatmap aktivitas, bisa diekspor ke JSON, CSV, atau Markdown.",
        en: "Terminal analytics for git repositories: contributors, churn hotspots and activity heatmaps, exportable to JSON, CSV or Markdown."
      },
      tech: ["Python", "CLI", "Rich"],
      image: "assets/projects/gitpulse.webp",
      demo: "",
      repo: "https://github.com/Dans-Vsa/gitpulse" }
  ],

  // Sama dengan halaman Kontak portofolio utama.
  contact: [
    { label: "Email",     icon: "✉", value: "danishbintang80@gmail.com", url: "mailto:danishbintang80@gmail.com" },
    { label: "WhatsApp",  icon: "💬", value: "+62 813 8244 9254",         url: "https://wa.me/6281382449254" },
    { label: "Instagram", icon: "📷", value: "@dasnhilo",                 url: "https://www.instagram.com/dasnhilo/" },
    { label: "GitHub",    icon: "🐙", value: "Dans-Vsa",                  url: "https://github.com/Dans-Vsa" },
    { label: { id: "Portofolio utama", en: "Main portfolio" }, icon: "🌐", value: "my-portofolio-bay-nine.vercel.app", url: "https://my-portofolio-bay-nine.vercel.app" }
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
