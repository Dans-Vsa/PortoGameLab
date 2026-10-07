(() => {
'use strict';

const D = window.PORTFOLIO || {};
const TILE = 32, MW = 48, MH = 32;
// Low-end devices (phones, <=4 cores / <=4 GB RAM) get a lighter render path from the start.
const LOW_END = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4
  || matchMedia('(pointer: coarse)').matches;
const S = LOW_END ? 1 : 2; // resolution of the pre-rendered map
let quality = LOW_END ? 0 : 1; // 1 = full effects, 0 = lite (dpr 1, no dust)

const $ = (s) => document.querySelector(s);
const esc = (s) => String(tr(s) ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = (u) => (/^\s*javascript:/i.test(u || '') ? '' : esc(u || ''));
const hexA = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const initials = (s) => String(tr(s) || '?').split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();

/* =========================================================
   I18N (ID / EN)
   ========================================================= */
const STR = {
  id: {
    room_about: 'Tentang Saya', room_skills: 'Lab Keahlian', room_tools: 'Bengkel Tools', room_hall: 'Koridor Utama',
    room_certs: 'Galeri Sertifikat', room_lobby: 'Lobi', room_projects: 'Arsip Proyek',
    ex_archive: 'Server Arsip', ex_profile: 'Profil Peneliti', ex_welcome: 'Papan Selamat Datang', ex_contact: 'Terminal Kontak',
    ex_cv: 'Kios CV', ex_dir: 'Denah Fasilitas',
    cv_welcome1: 'SELAMAT', cv_welcome2: 'DATANG', cv_reception: 'RESEPSIONIS',
    hint_talk: 'Bicara dengan {name}', hint_inspect: 'Periksa: {title}',
    default_name: 'Peneliti', intro_title: '{name}', intro_label: 'PORTOFOLIO', doc_title: '{name} — Portofolio',
    ach_prefix: 'PENCAPAIAN', location: 'LOKASI: {room}', transit: 'ZONA TRANSIT', sector: 'SEKTOR {code}',
    ach_explorer_t: 'Penjelajah', ach_explorer_d: 'Kamu sudah mengunjungi semua sektor lab.',
    rank1: 'PEMULA', rank2: 'MENENGAH', rank3: 'LANJUTAN', rank4: 'MAHIR',
    h_subject: 'SUBJEK', h_findings: 'TEMUAN UTAMA', h_fieldnotes: 'CATATAN LAPANGAN',
    fieldnotes: 'Riwayat pendidikan & pengalaman dipajang di papan-papan dalam ruangan ini.',
    category: 'Kategori', cert_ph: 'SERTIFIKAT', issued_by: 'Diterbitkan oleh', verify_cred: 'Verifikasi kredensial',
    live_demo: 'Demo langsung', source_code: 'Kode sumber',
    contact_text: 'Buka saluran komunikasi dengan sang peneliti:', cv_text: 'Unduh CV lengkap {name}.', download_cv: 'Unduh CV',
    welcome_text: 'Selamat datang di fasilitas riset milik <b>{name}</b>.', h_sectors: 'SEKTOR', h_howto: 'CARA BERMAIN',
    howto1: '<li>Jalan: <kbd>WASD</kbd> / tombol panah, lari dengan <kbd>Shift</kbd></li><li>Periksa exhibit & bicara: <kbd>E</kbd> atau <kbd>Spasi</kbd></li>',
    howto2: '<li>Exhibit bertanda ◆ kuning belum kamu scan</li><li>Buru-buru? Tekan <kbd>Q</kbd> untuk tampilan ringkas</li>',
    dir_text: 'Denah fasilitas & progres scan per sektor:',
    foot_close: '[ESC] / [E] TUTUP', foot_logged: 'DATA TERCATAT ✓',
    ach_first_t: 'Penemuan Pertama', ach_first_d: 'Kamu men-scan exhibit pertamamu.',
    ach_room_t: '{room} Tuntas', ach_room_d: 'Semua exhibit di Sektor {code} sudah di-scan.',
    ach_all_t: 'Akses Penuh', ach_all_d: 'Kamu sudah menjelajahi seluruh lab!',
    clear_tag: 'LEVEL KEAMANAN: MAKS', clear_title: 'Akses Penuh Diberikan',
    clear_text: 'Kamu sudah men-scan semua exhibit di lab — terima kasih sudah menjelajahi karya <b>{name}</b>!',
    clear_cta: 'Tertarik untuk berkolaborasi? Yuk ngobrol:',
    qv_tag: 'TAMPILAN KLASIK', qv_exp: 'PENGALAMAN', qv_edu: 'PENDIDIKAN', qv_skills: 'KEAHLIAN', qv_tools: 'TOOLS',
    qv_certs: 'SERTIFIKAT', qv_projects: 'PROYEK', qv_contact: 'KONTAK', verify: 'Verifikasi', code: 'Kode',
    help_tag: 'PANDUAN PENGUNJUNG', help_title: 'Cara menjelajah', reset_btn: 'Reset progres',
    reset_confirm: 'Reset semua progres scan & pencapaian?',
    ach_guide_t: 'Pengunjung Ramah', ach_guide_d: 'Kamu sudah mengobrol dengan {name}.',
    status_left: 'Laporan status: masih ada {n} exhibit yang belum di-scan.',
    status_full: 'Laporan status: kamu sudah punya AKSES PENUH. Luar biasa!',
    wait_t: '{name} MENUNGGUMU', wait_d: 'Bicaralah dengan robot di lobi untuk pengarahan singkat.',
    hud_data: 'DATA RISET', btn_quick: 'Ringkas', btn_quick_title: 'Tampilan ringkas (Q)', sound_title: 'Suara',
    help_attr: 'Bantuan (H)', lang_title: 'Ganti bahasa (L)', close: 'Tutup',
    kicker: 'SELAMAT DATANG DI', pass_head: 'CARA MENJELAJAH', pass_move: 'Jalan', pass_run: 'Lari',
    key_space: 'Spasi', pass_inspect: 'Periksa & bicara', pass_quick: 'Tampilan ringkas', pass_map: 'Peta mini',
    btn_start: 'JELAJAHI PORTOFOLIO ▶', btn_skip: 'Lewati game — lihat portofolio versi biasa', t_run: 'LARI',
  },
  en: {
    room_about: 'About Me', room_skills: 'Skills Lab', room_tools: 'Tools Workshop', room_hall: 'Main Corridor',
    room_certs: 'Certificate Gallery', room_lobby: 'Lobby', room_projects: 'Project Archive',
    ex_archive: 'Archive Server', ex_profile: 'Researcher Profile', ex_welcome: 'Welcome Board', ex_contact: 'Contact Terminal',
    ex_cv: 'Resume Kiosk', ex_dir: 'Facility Directory',
    cv_welcome1: 'WELCOME', cv_welcome2: 'READ ME', cv_reception: 'RECEPTION',
    hint_talk: 'Talk to {name}', hint_inspect: 'Inspect: {title}',
    default_name: 'Researcher', intro_title: '{name}', intro_label: 'PORTFOLIO', doc_title: '{name} — Portfolio',
    ach_prefix: 'ACHIEVEMENT', location: 'LOCATION: {room}', transit: 'TRANSIT ZONE', sector: 'SECTOR {code}',
    ach_explorer_t: 'Explorer', ach_explorer_d: 'You visited every sector of the lab.',
    rank1: 'APPRENTICE', rank2: 'INTERMEDIATE', rank3: 'ADVANCED', rank4: 'MASTER',
    h_subject: 'SUBJECT', h_findings: 'KEY FINDINGS', h_fieldnotes: 'FIELD NOTES',
    fieldnotes: 'Education & experience records are displayed on the boards in this room.',
    category: 'Category', cert_ph: 'CERTIFICATE', issued_by: 'Issued by', verify_cred: 'Verify credential',
    live_demo: 'Live demo', source_code: 'Source code',
    contact_text: 'Open a communication channel with the researcher:', cv_text: 'Download the full resume of {name}.', download_cv: 'Download CV',
    welcome_text: 'Welcome to the research facility of <b>{name}</b>.', h_sectors: 'SECTORS', h_howto: 'HOW TO PLAY',
    howto1: '<li>Move: <kbd>WASD</kbd> / arrow keys, run with <kbd>Shift</kbd></li><li>Inspect exhibits & talk: <kbd>E</kbd> or <kbd>Space</kbd></li>',
    howto2: '<li>Exhibits marked with a yellow ◆ have not been scanned yet</li><li>In a hurry? Press <kbd>Q</kbd> for the quick view</li>',
    dir_text: 'Facility map & scan progress per sector:',
    foot_close: '[ESC] / [E] CLOSE', foot_logged: 'DATA LOGGED ✓',
    ach_first_t: 'First Discovery', ach_first_d: 'You scanned your first exhibit.',
    ach_room_t: '{room} Cleared', ach_room_d: 'All exhibits in Sector {code} scanned.',
    ach_all_t: 'Full Clearance', ach_all_d: 'You explored the entire lab!',
    clear_tag: 'SECURITY LEVEL: MAX', clear_title: 'Full Clearance Granted',
    clear_text: "You've scanned every exhibit in the lab — thanks for exploring the work of <b>{name}</b>!",
    clear_cta: "Interested in collaborating? Let's talk:",
    qv_tag: 'CLASSIC VIEW', qv_exp: 'EXPERIENCE', qv_edu: 'EDUCATION', qv_skills: 'SKILLS', qv_tools: 'TOOLS',
    qv_certs: 'CERTIFICATES', qv_projects: 'PROJECTS', qv_contact: 'CONTACT', verify: 'Verify', code: 'Code',
    help_tag: 'VISITOR MANUAL', help_title: 'How to explore', reset_btn: 'Reset progress',
    reset_confirm: 'Reset all scan progress & achievements?',
    ach_guide_t: 'Friendly Visitor', ach_guide_d: 'You talked to {name}.',
    status_left: 'Status report: {n} exhibit(s) still unscanned.',
    status_full: 'Status report: you have FULL CLEARANCE. Impressive!',
    wait_t: '{name} IS WAITING', wait_d: 'Talk to the robot in the lobby for a quick briefing.',
    hud_data: 'RESEARCH DATA', btn_quick: 'Quick View', btn_quick_title: 'Quick view (Q)', sound_title: 'Sound',
    help_attr: 'Help (H)', lang_title: 'Switch language (L)', close: 'Close',
    kicker: 'WELCOME TO THE', pass_head: 'HOW TO EXPLORE', pass_move: 'Move', pass_run: 'Run',
    key_space: 'Space', pass_inspect: 'Inspect & talk', pass_quick: 'Quick view', pass_map: 'Minimap',
    btn_start: 'EXPLORE PORTFOLIO ▶', btn_skip: 'Skip the game — view classic portfolio', t_run: 'RUN',
  },
};
let lang = localStorage.getItem('lab-lang') || 'id';
if (!STR[lang]) lang = 'id';
function tt(key, vars = {}) {
  return String(STR[lang][key] ?? STR.id[key] ?? key).replace(/\{(\w+)\}/g, (_, n) => vars[n] ?? '');
}
// data value can be a plain string or { id: '...', en: '...' }
function tr(v) {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.id ?? v.en ?? '') : v;
}

/* =========================================================
   WORLD
   ========================================================= */
const ROOMS = [
  { id: 'about',    code: 'A', get name() { return tt('room_' + this.id); },        x: 1,  y: 1,  w: 14, h: 10, color: '#4fd1ff', door: 'bottom' },
  { id: 'skills',   code: 'B', get name() { return tt('room_' + this.id); },        x: 17, y: 1,  w: 14, h: 10, color: '#7cff6b', door: 'bottom' },
  { id: 'tools',    code: 'C', get name() { return tt('room_' + this.id); },       x: 33, y: 1,  w: 14, h: 10, color: '#ffb84f', door: 'bottom' },
  { id: 'hall',     code: 'H', get name() { return tt('room_' + this.id); },       x: 1,  y: 13, w: 46, h: 5,  color: '#8a8fff', door: null },
  { id: 'certs',    code: 'D', get name() { return tt('room_' + this.id); },   x: 1,  y: 20, w: 14, h: 11, color: '#ffd84f', door: 'top' },
  { id: 'lobby',    code: 'L', get name() { return tt('room_' + this.id); },                x: 17, y: 20, w: 14, h: 11, color: '#4fffc3', door: 'top' },
  { id: 'projects', code: 'E', get name() { return tt('room_' + this.id); },        x: 33, y: 20, w: 14, h: 11, color: '#ff5fa2', door: 'top' },
];
const roomById = Object.fromEntries(ROOMS.map((r) => [r.id, r]));

const grid = [], roomGrid = [];
for (let y = 0; y < MH; y++) { grid.push(new Array(MW).fill(1)); roomGrid.push(new Array(MW).fill(-1)); }
ROOMS.forEach((r, i) => {
  for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) { grid[y][x] = 0; roomGrid[y][x] = i; }
});
const doors = [];
ROOMS.forEach((r) => {
  if (!r.door) return;
  const dx = r.x + 6;
  const ys = r.door === 'bottom' ? [r.y + r.h, r.y + r.h + 1] : [r.y - 2, r.y - 1];
  ys.forEach((y) => { grid[y][dx] = 0; grid[y][dx + 1] = 0; });
  doors.push({ room: r, x: dx, ys });
});

/* =========================================================
   EXHIBITS
   ========================================================= */
const exhibits = [];
const HEIGHT = { pedestal: 50, case: 34, frame: 44, screen: 42, terminal: 34, board: 40, archive: 44, holosign: 48, kiosk: 40, desk: 18, plant: 26, directory: 40 };
const SLOTS = [[1, 2], [4, 2], [9, 2], [12, 2], [1, 5], [4, 5], [9, 5], [12, 5], [1, 8], [4, 8], [9, 8], [12, 8]];

function addEx(o) {
  const e = Object.assign({ tw: 1, countable: true, interact: true, data: {} }, o);
  e.color = e.color || roomById[e.room].color;
  const titleSrc = e.title;
  Object.defineProperty(e, 'title', { get: () => (e.tkey ? tt(e.tkey) : tr(titleSrc)), enumerable: true });
  e.px = e.tx * TILE; e.py = e.ty * TILE;
  e.box = { x: e.px + 3, y: e.py + 12, w: e.tw * TILE - 6, h: TILE - 14 };
  e.cx = e.px + (e.tw * TILE) / 2;
  e.by = e.py + TILE - 3;
  e.top = e.by - (HEIGHT[e.kind] || 36);
  if (!e.interact) e.countable = false;
  exhibits.push(e);
  return e;
}

function placeInRoom(roomId, entries) {
  const r = roomById[roomId];
  let list = entries;
  if (entries.length > SLOTS.length) {
    list = entries.slice(0, SLOTS.length - 1);
    list.push({ kind: 'archive', section: 'archive', tkey: 'ex_archive', data: { entries: entries.slice(SLOTS.length - 1) } });
  }
  list.forEach((en, i) => addEx({ ...en, id: `${roomId}-${i}`, room: roomId, tx: r.x + SLOTS[i][0], ty: r.y + SLOTS[i][1] }));
}

const about = D.about || {};
{
  const r = roomById.about;
  addEx({ id: 'about-profile', kind: 'terminal', section: 'profile', tkey: 'ex_profile', room: 'about', tx: r.x + 6, ty: r.y + 1, tw: 2 });
}
placeInRoom('about', [
  ...(about.education || []).map((d) => ({ kind: 'board', section: 'education', title: d.school, data: d, icon: '🎓' })),
  ...(about.experience || []).map((d) => ({ kind: 'board', section: 'experience', title: d.role, data: d, icon: '💼' })),
  ...(about.extras || []).map((d) => ({ kind: 'board', section: 'note', title: d.title, data: d, icon: d.icon || '★' })),
]);
placeInRoom('skills', (D.skills || []).map((d) => ({ kind: 'pedestal', section: 'skill', title: d.name, data: d })));
placeInRoom('tools', (D.tools || []).map((d) => ({ kind: 'case', section: 'tool', title: d.name, data: d })));
placeInRoom('certs', (D.certificates || []).map((d) => ({ kind: 'frame', section: 'cert', title: d.title, data: d })));
placeInRoom('projects', (D.projects || []).map((d) => ({ kind: 'screen', section: 'project', title: d.title, data: d })));

const L = roomById.lobby;
addEx({ id: 'lobby-welcome', kind: 'holosign', section: 'welcome', tkey: 'ex_welcome', room: 'lobby', tx: L.x + 1, ty: L.y + 2, tw: 2 });
addEx({ id: 'lobby-contact', kind: 'terminal', section: 'contact', tkey: 'ex_contact', room: 'lobby', tx: L.x + 11, ty: L.y + 2, tw: 2 });
if (D.cvUrl) addEx({ id: 'lobby-cv', kind: 'kiosk', section: 'cv', tkey: 'ex_cv', room: 'lobby', tx: L.x + 12, ty: L.y + 7 });
addEx({ id: 'lobby-desk', kind: 'desk', room: 'lobby', tx: L.x + 2, ty: L.y + 6, tw: 3, interact: false });
addEx({ id: 'hall-dir', kind: 'directory', section: 'directory', tkey: 'ex_dir', room: 'hall', tx: 15, ty: 15, tw: 2, countable: false });
addEx({ id: 'hall-dir2', kind: 'directory', section: 'directory', tkey: 'ex_dir', room: 'hall', tx: 31, ty: 15, tw: 2, countable: false });
[[L.x, L.y + 10], [L.x + 13, L.y + 10], [3, 13], [13, 17], [19, 13], [29, 17], [35, 13], [45, 17], [1, 17], [46, 13]]
  .forEach(([tx, ty], i) => addEx({ id: 'plant' + i, kind: 'plant', room: roomGrid[ty][tx] >= 0 ? ROOMS[roomGrid[ty][tx]].id : 'hall', tx, ty, interact: false }));


const countable = exhibits.filter((e) => e.countable);

/* =========================================================
   STATE / SAVE
   ========================================================= */
const SAVE_KEY = 'research-lab-save-v1';
let save = { visited: [], ach: [], rooms: [] };
try { save = Object.assign(save, JSON.parse(localStorage.getItem(SAVE_KEY)) || {}); } catch (_) {}
const visited = new Set(save.visited.filter((id) => countable.some((e) => e.id === id)));
const achieved = new Set(save.ach);
const roomsSeen = new Set(save.rooms);
const persist = () => {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ visited: [...visited], ach: [...achieved], rooms: [...roomsSeen] })); } catch (_) {}
};

const player = { x: (L.x + 7) * TILE, y: (L.y + 8) * TILE + 16, dir: 'up', anim: 0, moving: false };
const robot = { x: (L.x + 9) * TILE + 16, y: (L.y + 6) * TILE + 20, name: (D.guide && D.guide.name) || 'ARIA' };
robot.box = { x: robot.x - 9, y: robot.y - 6, w: 18, h: 10 };

/* =========================================================
   AUDIO
   ========================================================= */
let soundOn = localStorage.getItem('lab-sound') !== 'off';
let actx = null;
function beep(freq = 660, dur = 0.08, type = 'square', vol = 0.035, delay = 0) {
  if (!soundOn) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = actx.currentTime + delay;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch (_) {}
}
const sfx = {
  open: () => { beep(520, 0.06); beep(780, 0.08, 'square', 0.03, 0.06); },
  close: () => beep(380, 0.06, 'triangle'),
  ach: () => [523, 659, 784, 1046].forEach((f, i) => beep(f, 0.12, 'square', 0.03, i * 0.08)),
  talk: () => beep(900 + Math.random() * 200, 0.02, 'square', 0.015),
  room: () => beep(300, 0.15, 'sine', 0.05),
};

/* =========================================================
   CANVAS + STATIC MAP
   ========================================================= */
const canvas = $('#game');
const ctx = canvas.getContext('2d');
const mini = $('#minimap');
const mctx = mini.getContext('2d');
let dpr = 1, zoom = 2, vw = 0, vh = 0, cam = { x: 0, y: 0 };
let needsRender = true;

function resize() {
  dpr = quality ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  vw = window.innerWidth; vh = window.innerHeight;
  canvas.width = Math.round(vw * dpr); canvas.height = Math.round(vh * dpr);
  const base = Math.min(vw / (15 * TILE), vh / (10 * TILE));
  zoom = Math.max(0.9, Math.min(2.4, base)) * dpr;
  buildVignette();
  needsRender = true;
}
window.addEventListener('resize', resize);
resize();

const off = document.createElement('canvas');
off.width = MW * TILE * S; off.height = MH * TILE * S;
function drawStatic() {
  const o = off.getContext('2d');
  o.setTransform(S, 0, 0, S, 0, 0);
  o.fillStyle = '#04060b'; o.fillRect(0, 0, MW * TILE, MH * TILE);
  const isFloor = (x, y) => y >= 0 && y < MH && x >= 0 && x < MW && grid[y][x] === 0;
  const roomColorAt = (x, y) => {
    const ri = roomGrid[y] && roomGrid[y][x];
    return ri >= 0 ? ROOMS[ri].color : roomById.hall.color;
  };

  // big faint sector letters
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
    const T = TILE, px = x * T, py = y * T;
    if (grid[y][x] === 0) {
      const ri = roomGrid[y][x];
      const r = ri >= 0 ? ROOMS[ri] : null;
      o.fillStyle = (x + y) & 1 ? '#0d1320' : '#0b101b';
      o.fillRect(px, py, T, T);
      if (r) { o.fillStyle = hexA(r.color, r.id === 'hall' ? 0.025 : 0.04); o.fillRect(px, py, T, T); }
      o.strokeStyle = 'rgba(255,255,255,0.035)'; o.strokeRect(px + 0.5, py + 0.5, T - 1, T - 1);
      o.fillStyle = 'rgba(255,255,255,0.06)';
      o.fillRect(px + 2, py + 2, 1, 1); o.fillRect(px + T - 3, py + 2, 1, 1);
      o.fillRect(px + 2, py + T - 3, 1, 1); o.fillRect(px + T - 3, py + T - 3, 1, 1);
      if (ri < 0) { // doorway
        o.fillStyle = '#121a2b'; o.fillRect(px, py, T, T);
        const c = '#ffd84f';
        for (let i = 0; i < T; i += 6) {
          o.fillStyle = (i / 6) & 1 ? c : '#1a1a1a';
          if (!isFloor(x - 1, y)) o.fillRect(px, py + i, 3, 6);
          if (!isFloor(x + 1, y)) o.fillRect(px + T - 3, py + i, 3, 6);
        }
      }
      if (!isFloor(x, y - 1)) { // shadow under walls
        const g = o.createLinearGradient(0, py, 0, py + 10);
        g.addColorStop(0, 'rgba(0,0,0,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        o.fillStyle = g; o.fillRect(px, py, T, 10);
      }
    } else {
      o.fillStyle = '#070a12'; o.fillRect(px, py, T, T);
      if (isFloor(x, y + 1)) {
        const c = roomColorAt(x, y + 1);
        o.fillStyle = '#161d31'; o.fillRect(px, py + 8, T, T - 8);
        o.fillStyle = '#1c2540'; o.fillRect(px, py + 8, T, 3);
        o.fillStyle = 'rgba(0,0,0,0.35)'; o.fillRect(px + T - 1, py + 12, 1, T - 12);
        o.fillStyle = hexA(c, 0.8); o.fillRect(px, py + T - 6, T, 2);
        o.fillStyle = hexA(c, 0.15); o.fillRect(px, py + T - 10, T, 4);
        if ((x * 7 + y) % 5 === 0) { o.fillStyle = hexA(c, 0.5); o.fillRect(px + 12, py + 15, 8, 4); }
      } else {
        o.fillStyle = '#0a0e19';
        if (isFloor(x - 1, y)) o.fillRect(px, py, 2, T);
        if (isFloor(x + 1, y)) o.fillRect(px + T - 2, py, 2, T);
        if (isFloor(x, y - 1)) o.fillRect(px, py, T, 2);
      }
    }
  }

  // sector letters on floor
  ROOMS.forEach((r) => {
    if (r.id === 'hall') return;
    o.save();
    o.font = 'bold 150px "Press Start 2P", monospace';
    o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillStyle = hexA(r.color, 0.035);
    o.fillText(r.code, (r.x + r.w / 2) * TILE, (r.y + r.h / 2) * TILE + 10);
    o.restore();
  });

  // hall lane
  o.strokeStyle = hexA(roomById.hall.color, 0.18); o.setLineDash([10, 10]); o.lineWidth = 2;
  o.beginPath(); o.moveTo(TILE, 15.5 * TILE); o.lineTo(47 * TILE, 15.5 * TILE); o.stroke(); o.setLineDash([]);

  // door decals in corridor
  doors.forEach((d) => {
    const r = d.room;
    const cx = (d.x + 1) * TILE;
    const cy = r.door === 'bottom' ? 13 * TILE + 14 : 18 * TILE - 14;
    o.font = '7px "Press Start 2P", monospace'; o.textAlign = 'center'; o.textBaseline = 'middle';
    const label = `${r.code} · ${r.name.toUpperCase()}`;
    const w = o.measureText(label).width + 14;
    o.fillStyle = 'rgba(5,8,15,0.8)'; o.fillRect(cx - w / 2, cy - 8, w, 16);
    o.strokeStyle = hexA(r.color, 0.7); o.strokeRect(cx - w / 2 + 0.5, cy - 7.5, w - 1, 15);
    o.fillStyle = r.color; o.fillText(label, cx, cy + 1);
    o.fillText(r.door === 'bottom' ? '▲' : '▼', cx, r.door === 'bottom' ? cy + 18 : cy - 18);
  });
}
drawStatic();

/* =========================================================
   DRAWING HELPERS
   ========================================================= */
function rr(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function ellipse(x, y, rx, ry, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); }
// radial glows are pre-rendered once per color and reused as sprites
const glowCache = new Map();
function glow(x, y, rad, color, a) {
  let c = glowCache.get(color);
  if (!c) {
    c = document.createElement('canvas'); c.width = c.height = 64;
    const gc = c.getContext('2d');
    const g = gc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, hexA(color, 1)); g.addColorStop(1, hexA(color, 0));
    gc.fillStyle = g; gc.fillRect(0, 0, 64, 64);
    glowCache.set(color, c);
  }
  const pa = ctx.globalAlpha;
  ctx.globalAlpha = pa * a; ctx.imageSmoothingEnabled = true;
  ctx.drawImage(c, x - rad, y - rad, rad * 2, rad * 2);
  ctx.globalAlpha = pa; ctx.imageSmoothingEnabled = false;
}
function text(str, x, y, size, color, font = '"Press Start 2P", monospace') {
  ctx.font = `${size}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

const DRAW = {
  pedestal(e, t) {
    const { cx, by, color } = e;
    glow(cx, by - 30, 30, color, 0.18);
    ellipse(cx, by, 12, 5, '#0a0e18');
    ctx.fillStyle = '#222b44'; ctx.fillRect(cx - 9, by - 14, 18, 13);
    ctx.fillStyle = '#2e3a5c'; ctx.fillRect(cx - 9, by - 14, 18, 3);
    ctx.fillStyle = color; ctx.fillRect(cx - 9, by - 7, 18, 1.5);
    ctx.globalAlpha = 0.14; ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(cx - 6, by - 14); ctx.lineTo(cx - 13, by - 36); ctx.lineTo(cx + 13, by - 36); ctx.lineTo(cx + 6, by - 14); ctx.fill();
    const fy = by - 42 + Math.sin(t * 2 + e.tx) * 2;
    ctx.globalAlpha = 0.85 + Math.sin(t * 13 + e.tx) * 0.1;
    rr(ctx, cx - 12, fy - 8, 24, 16, 3); ctx.fillStyle = hexA(color, 0.18); ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke();
    const ic = e.data.icon || initials(e.data.name);
    text(ic, cx, fy + 1, ic.length > 2 ? 5 : 7, color, ic.length <= 3 && /^[\x00-\x7F]+$/.test(ic) ? undefined : 'sans-serif');
    ctx.globalAlpha = 1;
  },
  case(e, t) {
    const { cx, by, color } = e;
    ellipse(cx, by, 13, 4, '#0a0e18');
    ctx.fillStyle = '#272d44'; ctx.fillRect(cx - 12, by - 11, 24, 11);
    ctx.fillStyle = color; ctx.fillRect(cx - 12, by - 11, 24, 2);
    ctx.fillStyle = 'rgba(160,220,255,0.08)'; ctx.fillRect(cx - 11, by - 32, 22, 21);
    ctx.strokeStyle = 'rgba(190,235,255,0.45)'; ctx.strokeRect(cx - 10.5, by - 31.5, 21, 21);
    glow(cx, by - 22, 14, color, 0.25);
    text(e.data.icon || '🔧', cx, by - 21 + Math.sin(t * 2 + e.tx) * 1.2, 12, '#fff', 'sans-serif');
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.moveTo(cx - 8, by - 29); ctx.lineTo(cx - 3, by - 29); ctx.moveTo(cx - 9, by - 26); ctx.lineTo(cx - 7, by - 26); ctx.stroke();
  },
  frame(e, t) {
    const { cx, by } = e;
    if (!e.img && e.data.image) { e.img = new Image(); e.img.decoding = 'async'; e.img.src = e.data.image; } // load only once visible
    glow(cx, by - 30, 26, '#ffd84f', 0.12 + Math.sin(t * 1.5 + e.tx) * 0.03);
    ellipse(cx, by, 10, 3, '#0a0e18');
    ctx.fillStyle = '#3a2f1c'; ctx.fillRect(cx - 1, by - 14, 2, 14); ctx.fillRect(cx - 8, by - 2, 16, 2);
    ctx.fillStyle = '#d9a93a'; ctx.fillRect(cx - 14, by - 40, 28, 24);
    ctx.fillStyle = '#7a5a18'; ctx.fillRect(cx - 12, by - 38, 24, 20);
    if (e.img && e.img.complete && e.img.naturalWidth) {
      ctx.drawImage(e.img, cx - 11, by - 37, 22, 18);
    } else {
      ctx.fillStyle = '#f3ead2'; ctx.fillRect(cx - 11, by - 37, 22, 18);
      ctx.fillStyle = '#b9ad8c'; ctx.fillRect(cx - 8, by - 33, 16, 1); ctx.fillRect(cx - 6, by - 30, 12, 1); ctx.fillRect(cx - 8, by - 27, 10, 1);
      ellipse(cx + 6, by - 23, 3, 3, '#c33d3d');
    }
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(cx - 11, by - 37, 4, 18);
  },
  screen(e, t) {
    const { cx, by, color } = e;
    ellipse(cx, by, 12, 3, '#0a0e18');
    ctx.fillStyle = '#1b2236'; ctx.fillRect(cx - 2, by - 16, 4, 15); ctx.fillRect(cx - 8, by - 3, 16, 3);
    glow(cx, by - 28, 26, color, 0.2);
    ctx.fillStyle = '#0e121c'; rr(ctx, cx - 15, by - 40, 30, 23, 2); ctx.fill();
    if (!e.img && e.data.image) { e.img = new Image(); e.img.decoding = 'async'; e.img.src = e.data.image; } // load only once visible
    if (e.img && e.img.complete && e.img.naturalWidth) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(e.img, cx - 13, by - 38, 26, 19);
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'rgba(255,255,255,' + (0.06 + Math.sin(t * 3 + e.tx) * 0.03) + ')'; // screen sheen
      ctx.fillRect(cx - 13, by - 38, 26, 19);
    } else {
      ctx.fillStyle = hexA(color, 0.18); ctx.fillRect(cx - 13, by - 38, 26, 19);
      for (let i = 0; i < 4; i++) {
        const w = 6 + ((Math.sin(t * 2 + i * 1.7 + e.tx) + 1) * 7) | 0;
        ctx.fillStyle = hexA(color, 0.7); ctx.fillRect(cx - 11, by - 36 + i * 4, w, 2);
      }
      text(e.data.icon || '▣', cx + 7, by - 26, 8, '#fff', 'sans-serif');
    }
  },
  terminal(e, t) {
    const { cx, by, color, tw } = e;
    const w = tw * TILE - 6;
    ctx.fillStyle = '#1c2337'; ctx.fillRect(cx - w / 2, by - 13, w, 13);
    ctx.fillStyle = '#2a3452'; ctx.fillRect(cx - w / 2, by - 15, w, 4);
    ctx.fillStyle = color; ctx.fillRect(cx - w / 2, by - 6, w, 1.5);
    glow(cx, by - 26, 30, color, 0.22);
    ctx.fillStyle = '#0d111b'; ctx.fillRect(cx - 13, by - 34, 26, 18);
    ctx.fillStyle = hexA(color, 0.25); ctx.fillRect(cx - 11, by - 32, 22, 14);
    ctx.fillStyle = color;
    for (let i = 0; i < 3; i++) ctx.fillRect(cx - 9, by - 30 + i * 4, 8 + ((i * 5 + e.tx) % 9), 1.5);
    if ((t * 2 | 0) % 2) ctx.fillRect(cx + 4, by - 22, 4, 2);
    ctx.fillStyle = '#3a4566'; ctx.fillRect(cx - 9, by - 14, 18, 2);
  },
  board(e, t) {
    const { cx, by, color } = e;
    ctx.fillStyle = '#1b2236'; ctx.fillRect(cx - 11, by - 18, 2, 18); ctx.fillRect(cx + 9, by - 18, 2, 18);
    ctx.fillStyle = '#121a2c'; ctx.fillRect(cx - 14, by - 38, 28, 22);
    ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.strokeRect(cx - 13.5, by - 37.5, 27, 21);
    text(e.icon || '★', cx - 6, by - 28, 9, '#fff', 'sans-serif');
    ctx.fillStyle = hexA(color, 0.6); ctx.fillRect(cx, by - 32, 9, 1.5); ctx.fillRect(cx, by - 28, 7, 1.5); ctx.fillRect(cx, by - 24, 9, 1.5);
    glow(cx, by - 28, 20, color, 0.12);
  },
  archive(e, t) {
    const { cx, by, color } = e;
    ctx.fillStyle = '#121828'; ctx.fillRect(cx - 11, by - 42, 22, 42);
    ctx.strokeStyle = '#2a3452'; ctx.strokeRect(cx - 10.5, by - 41.5, 21, 41);
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = '#1d2540'; ctx.fillRect(cx - 9, by - 39 + i * 6, 18, 4);
      ctx.fillStyle = Math.sin(t * 6 + i * 2.1 + e.tx) > 0 ? color : '#2a3452'; ctx.fillRect(cx + 4, by - 38 + i * 6, 2, 2);
    }
    glow(cx, by - 20, 24, color, 0.15);
  },
  holosign(e, t) {
    const { cx, by, color } = e;
    ellipse(cx, by - 2, 18, 5, '#1c2337');
    ctx.fillStyle = color; ctx.fillRect(cx - 14, by - 4, 28, 1.5);
    ctx.globalAlpha = 0.12; ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(cx - 10, by - 4); ctx.lineTo(cx - 26, by - 26); ctx.lineTo(cx + 26, by - 26); ctx.lineTo(cx + 10, by - 4); ctx.fill();
    ctx.globalAlpha = 0.8 + Math.sin(t * 11) * 0.08;
    const fy = by - 40 + Math.sin(t * 1.6) * 1.5;
    rr(ctx, cx - 28, fy - 12, 56, 24, 3); ctx.fillStyle = hexA(color, 0.15); ctx.fill(); ctx.strokeStyle = color; ctx.stroke();
    text(tt('cv_welcome1'), cx, fy - 3, 6, color); text(tt('cv_welcome2'), cx, fy + 6, 4, '#fff');
    ctx.globalAlpha = 1;
  },
  kiosk(e, t) {
    const { cx, by, color } = e;
    ctx.fillStyle = '#1c2337'; ctx.fillRect(cx - 8, by - 30, 16, 30);
    ctx.fillStyle = hexA(color, 0.3); ctx.fillRect(cx - 6, by - 28, 12, 12);
    text('CV', cx, by - 22, 5, '#fff');
    ctx.fillStyle = color; ctx.fillRect(cx - 8, by - 12, 16, 1.5);
    glow(cx, by - 22, 20, color, 0.2);
  },
  desk(e) {
    const x = e.px + 3, w = e.tw * TILE - 6, by = e.by;
    ctx.fillStyle = '#1c2337'; ctx.fillRect(x, by - 16, w, 16);
    ctx.fillStyle = '#2d3a5e'; ctx.fillRect(x, by - 19, w, 4);
    ctx.fillStyle = e.color; ctx.fillRect(x, by - 8, w, 1.5);
    ctx.fillStyle = '#0d111b'; ctx.fillRect(x + w - 20, by - 30, 14, 11);
    ctx.fillStyle = hexA(e.color, 0.3); ctx.fillRect(x + w - 19, by - 29, 12, 9);
    text(tt('cv_reception'), x + w / 2 - 6, by - 11, 4, e.color);
  },
  plant(e, t) {
    const { cx, by } = e;
    ellipse(cx, by, 9, 3, '#05070d');
    ctx.fillStyle = '#3b4562'; ctx.fillRect(cx - 7, by - 11, 14, 11);
    ctx.fillStyle = '#4a5577'; ctx.fillRect(cx - 7, by - 11, 14, 2);
    const sway = Math.sin(t * 1.3 + e.tx) * 1;
    [['#2f9e5b', -5, -16, 6], ['#39b86a', 4, -18, 6], ['#2b8a50', 0, -24, 6], ['#4fd682', -2, -19, 4]].forEach(([c, dx, dy, r]) => ellipse(cx + dx + sway * (dy / -20), by + dy, r, r, c));
  },
  directory(e, t) {
    const { cx, by, color } = e;
    ctx.fillStyle = '#1b2236'; ctx.fillRect(cx - 2, by - 14, 4, 14);
    ctx.fillStyle = '#0d1220'; ctx.fillRect(cx - 22, by - 38, 44, 26);
    ctx.strokeStyle = color; ctx.strokeRect(cx - 21.5, by - 37.5, 43, 25);
    const sx = (cx - 20), sy = by - 36, k = 40 / MW;
    ROOMS.forEach((r) => { ctx.fillStyle = hexA(r.color, 0.55); ctx.fillRect(sx + r.x * k, sy + r.y * k * 0.7, r.w * k, r.h * k * 0.7); });
    if ((t * 2 | 0) % 2) { ctx.fillStyle = '#fff'; ctx.fillRect(sx + (player.x / TILE) * k - 1, sy + (player.y / TILE) * k * 0.7 - 1, 2, 2); }
  },
};

function drawPlayer(t) {
  const { x, y, dir } = player;
  const step = player.moving ? Math.sin(player.anim) : 0;
  const bob = player.moving ? Math.abs(Math.sin(player.anim)) * 1.2 : Math.sin(t * 2) * 0.4;
  ellipse(x, y, 8, 3, 'rgba(0,0,0,0.45)');
  // legs
  ctx.fillStyle = '#1f2a44';
  if (dir === 'left' || dir === 'right') {
    ctx.fillRect(x - 3 + step * 3, y - 8, 3, 7); ctx.fillRect(x - step * 3, y - 8, 3, 7);
  } else {
    ctx.fillRect(x - 5, y - 8 - Math.max(0, step) * 2, 4, 7);
    ctx.fillRect(x + 1, y - 8 - Math.max(0, -step) * 2, 4, 7);
  }
  ctx.fillStyle = '#0e1220'; ctx.fillRect(x - 5, y - 2, 4, 2); ctx.fillRect(x + 1, y - 2, 4, 2);
  const by = y - 8 - bob;
  // lab coat
  ctx.fillStyle = '#e8eef9'; rr(ctx, x - 7, by - 12, 14, 13, 3); ctx.fill();
  ctx.fillStyle = '#c4cee3'; ctx.fillRect(x - 7, by - 2, 14, 2);
  if (dir !== 'up') {
    ctx.fillStyle = '#2b3f6b'; ctx.fillRect(x - 1, by - 12, 2, 8);
    ctx.fillStyle = '#4fffc3'; ctx.fillRect(x + 2, by - 9, 3, 3); // badge
  }
  // arms
  ctx.fillStyle = '#d6deef';
  const sw = player.moving ? step * 2 : 0;
  if (dir === 'left' || dir === 'right') { ctx.fillRect(x - 2 + sw, by - 10, 4, 9); }
  else { ctx.fillRect(x - 9, by - 10 + sw, 3, 9); ctx.fillRect(x + 6, by - 10 - sw, 3, 9); }
  ctx.fillStyle = '#f2c9a0';
  if (!(dir === 'left' || dir === 'right')) { ctx.fillRect(x - 9, by - 1 + sw, 3, 2); ctx.fillRect(x + 6, by - 1 - sw, 3, 2); }
  // head
  const hy = by - 23;
  ctx.fillStyle = '#f2c9a0'; rr(ctx, x - 6, hy, 12, 11, 3); ctx.fill();
  ctx.fillStyle = '#2a1d17';
  if (dir === 'up') { rr(ctx, x - 6.5, hy - 1, 13, 10, 3); ctx.fill(); }
  else {
    rr(ctx, x - 6.5, hy - 1.5, 13, 5, 2); ctx.fill();
    if (dir === 'left') ctx.fillRect(x + 3, hy, 3.5, 7);
    else if (dir === 'right') ctx.fillRect(x - 6.5, hy, 3.5, 7);
    else { ctx.fillRect(x - 6.5, hy, 2, 6); ctx.fillRect(x + 4.5, hy, 2, 6); }
    ctx.fillStyle = '#10131c';
    const blink = (t % 4) < 0.12;
    if (!blink) {
      if (dir === 'down') { ctx.fillRect(x - 3.5, hy + 5, 2, 2.5); ctx.fillRect(x + 1.5, hy + 5, 2, 2.5); }
      if (dir === 'left') ctx.fillRect(x - 4, hy + 5, 2, 2.5);
      if (dir === 'right') ctx.fillRect(x + 2, hy + 5, 2, 2.5);
    }
  }
  // goggles strap
  ctx.fillStyle = '#4fd1ff'; ctx.fillRect(x - 6, hy + 2, 12, 1);
}

function drawRobot(t) {
  const { x, y } = robot;
  const bob = Math.sin(t * 3) * 2.5;
  ellipse(x, y, 8 - bob * 0.4, 3, 'rgba(0,0,0,0.4)');
  glow(x, y - 4, 10, '#4fd1ff', 0.35 + Math.sin(t * 9) * 0.1);
  const by = y - 12 + bob;
  ctx.fillStyle = '#dfe8f5'; rr(ctx, x - 9, by - 16, 18, 16, 6); ctx.fill();
  ctx.fillStyle = '#b7c3d9'; ctx.fillRect(x - 9, by - 5, 18, 2);
  ctx.fillStyle = '#0d1424'; rr(ctx, x - 7, by - 13, 14, 7, 3); ctx.fill();
  ctx.fillStyle = '#4fd1ff';
  if ((t % 3.5) > 0.12) { ctx.fillRect(x - 4, by - 11, 2, 3); ctx.fillRect(x + 2, by - 11, 2, 3); }
  ctx.fillStyle = '#9aa7c0'; ctx.fillRect(x - 0.5, by - 21, 1, 5);
  ellipse(x, by - 22, 2, 2, Math.sin(t * 4) > 0 ? '#ff5fa2' : '#4fffc3');
  ctx.fillStyle = '#c8d3e8'; ctx.fillRect(x - 12, by - 10 + Math.sin(t * 3 + 1) * 1.5, 3, 6); ctx.fillRect(x + 9, by - 10 - Math.sin(t * 3 + 1) * 1.5, 3, 6);
}

/* =========================================================
   PARTICLES (ambient dust)
   ========================================================= */
const dust = Array.from({ length: 90 }, () => ({ x: Math.random() * MW * TILE, y: Math.random() * MH * TILE, s: Math.random() * 0.6 + 0.2, p: Math.random() * 6 }));

/* =========================================================
   INPUT
   ========================================================= */
const keys = new Set();
const touchDirs = new Set();
let touchRun = false;
const KEYMAP = { KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down', KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right' };
let started = false;

window.addEventListener('keydown', (ev) => {
  if (!started) { if (ev.code === 'Enter') startGame(); return; }
  if (KEYMAP[ev.code] || ev.code === 'Space') ev.preventDefault();
  if (ev.repeat && !KEYMAP[ev.code]) return;
  const act = ev.code === 'KeyE' || ev.code === 'Space' || ev.code === 'Enter';
  if (!modalEl.classList.contains('hidden')) {
    if (ev.code === 'Escape' || ev.code === 'KeyE') closeModal();
    return;
  }
  if (!dialogEl.classList.contains('hidden')) {
    if (act) advanceDialog();
    else if (ev.code === 'Escape') endDialog();
    return;
  }
  if (KEYMAP[ev.code]) keys.add(KEYMAP[ev.code]);
  if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') keys.add('run');
  if (act) interact();
  if (ev.code === 'KeyQ') openQuickView();
  if (ev.code === 'KeyH') openHelp();
  if (ev.code === 'KeyM') mini.classList.toggle('hidden');
  if (ev.code === 'KeyL') setLang(lang === 'id' ? 'en' : 'id');
});
window.addEventListener('keyup', (ev) => {
  if (KEYMAP[ev.code]) keys.delete(KEYMAP[ev.code]);
  if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') keys.delete('run');
});
window.addEventListener('blur', () => { keys.clear(); touchDirs.clear(); });

const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
document.querySelectorAll('#touch [data-dir]').forEach((b) => {
  const on = (ev) => { ev.preventDefault(); touchDirs.add(b.dataset.dir); b.classList.add('on'); };
  const offF = () => { touchDirs.delete(b.dataset.dir); b.classList.remove('on'); };
  b.addEventListener('pointerdown', on);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((n) => b.addEventListener(n, offF));
});
$('#t-act').addEventListener('pointerdown', (ev) => {
  ev.preventDefault();
  if (!modalEl.classList.contains('hidden')) closeModal();
  else if (!dialogEl.classList.contains('hidden')) advanceDialog();
  else interact();
});
$('#t-run').addEventListener('pointerdown', (ev) => { ev.preventDefault(); touchRun = !touchRun; ev.currentTarget.classList.toggle('on', touchRun); });

/* =========================================================
   GAME LOGIC
   ========================================================= */
function overlaps(b, x0, y0, x1, y1) { return x1 > b.x && x0 < b.x + b.w && y1 > b.y && y0 < b.y + b.h; }
function blocked(x, y) {
  const x0 = x - 7, x1 = x + 7, y0 = y - 5, y1 = y + 2;
  for (let ty = Math.floor(y0 / TILE); ty <= Math.floor(y1 / TILE); ty++)
    for (let tx = Math.floor(x0 / TILE); tx <= Math.floor(x1 / TILE); tx++)
      if (ty < 0 || tx < 0 || ty >= MH || tx >= MW || grid[ty][tx]) return true;
  for (const e of exhibits) if (overlaps(e.box, x0, y0, x1, y1)) return true;
  return overlaps(robot.box, x0, y0, x1, y1);
}

function distToBox(b, x, y) {
  const dx = Math.max(b.x - x, 0, x - (b.x + b.w));
  const dy = Math.max(b.y - y, 0, y - (b.y + b.h));
  return Math.hypot(dx, dy);
}
let nearest = null;
function findNearest() {
  let best = null, bd = 22;
  for (const e of exhibits) {
    if (!e.interact) continue;
    const d = distToBox(e.box, player.x, player.y - 4);
    if (d < bd) { bd = d; best = e; }
  }
  if (distToBox(robot.box, player.x, player.y - 4) < bd) best = robot;
  return best;
}

let currentRoom = null;
function update(dt) {
  const paused = !started || !modalEl.classList.contains('hidden') || !dialogEl.classList.contains('hidden');
  const dirs = new Set([...keys, ...touchDirs]);
  let dx = 0, dy = 0;
  if (!paused) {
    dx = (dirs.has('right') ? 1 : 0) - (dirs.has('left') ? 1 : 0);
    dy = (dirs.has('down') ? 1 : 0) - (dirs.has('up') ? 1 : 0);
  }
  player.moving = !!(dx || dy);
  if (player.moving) {
    const run = keys.has('run') || touchRun;
    const sp = (run ? 250 : 155) * dt / Math.hypot(dx, dy);
    const nx = player.x + dx * sp, ny = player.y + dy * sp;
    if (!blocked(nx, player.y)) player.x = nx;
    if (!blocked(player.x, ny)) player.y = ny;
    if (dx && dy) player.dir = Math.abs(dy) >= 1 && (player.dir === 'up' || player.dir === 'down') ? player.dir : (dx > 0 ? 'right' : 'left');
    else player.dir = dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
    player.anim += dt * (run ? 18 : 13);
  }

  // room tracking
  const ri = roomGrid[Math.floor(player.y / TILE)]?.[Math.floor(player.x / TILE)];
  if (ri >= 0 && ROOMS[ri] !== currentRoom) {
    currentRoom = ROOMS[ri];
    enterRoom(currentRoom);
  }

  nearest = paused ? null : findNearest();
  hintEl.classList.toggle('show', !!nearest);
  if (nearest) {
    const key = isTouch ? 'E' : 'E';
    const label = nearest === robot ? tt('hint_talk', { name: robot.name }) : tt('hint_inspect', { title: nearest.title });
    if (hintEl.dataset.label !== label) { hintEl.dataset.label = label; hintEl.innerHTML = `<kbd>${key}</kbd> ${esc(label)}`; }
  }

  // camera
  const cw = canvas.width / zoom, ch = canvas.height / zoom;
  let tx = player.x - cw / 2, ty = player.y - 20 - ch / 2;
  const ww = MW * TILE, wh = MH * TILE;
  tx = cw > ww ? (ww - cw) / 2 : Math.max(0, Math.min(ww - cw, tx));
  ty = ch > wh ? (wh - ch) / 2 : Math.max(0, Math.min(wh - ch, ty));
  const k = 1 - Math.pow(0.0001, dt);
  cam.x += (tx - cam.x) * k; cam.y += (ty - cam.y) * k;
}

function render(t) {
  const cw = canvas.width / zoom, ch = canvas.height / zoom;
  const cx = Math.round(cam.x * zoom) / zoom, cy = Math.round(cam.y * zoom) / zoom;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#03050a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(zoom, 0, 0, zoom, -cx * zoom, -cy * zoom);
  ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, MW * TILE, MH * TILE);

  // sort drawables by baseline
  const list = exhibits.filter((e) => e.px + e.tw * TILE > cx - 40 && e.px < cx + cw + 40 && e.py > cy - 80 && e.py < cy + ch + 80)
    .map((e) => ({ y: e.box.y + e.box.h, f: () => DRAW[e.kind](e, t) }));
  list.push({ y: player.y, f: () => drawPlayer(t) });
  list.push({ y: robot.y + 2, f: () => drawRobot(t) });
  list.sort((a, b) => a.y - b.y).forEach((d) => d.f());

  // dust
  ctx.fillStyle = 'rgba(180,220,255,0.35)';
  if (quality) dust.forEach((p) => {
    const px = p.x + Math.sin(t * 0.3 + p.p) * 12, py = p.y + Math.cos(t * 0.2 + p.p) * 10;
    if (px > cx && px < cx + cw && py > cy && py < cy + ch) { ctx.globalAlpha = 0.3 + Math.sin(t + p.p) * 0.2; ctx.fillRect(px, py, p.s * 2, p.s * 2); }
  });
  ctx.globalAlpha = 1;

  // unscanned markers + prompt
  for (const e of exhibits) {
    if (!e.countable || visited.has(e.id)) continue;
    const my = e.top - 8 + Math.sin(t * 4 + e.tx) * 2;
    ctx.fillStyle = '#ffd84f';
    ctx.beginPath(); ctx.moveTo(e.cx, my - 4); ctx.lineTo(e.cx + 3, my); ctx.lineTo(e.cx, my + 4); ctx.lineTo(e.cx - 3, my); ctx.fill();
  }
  if (nearest) {
    const nx = nearest === robot ? robot.x : nearest.cx;
    const ny = (nearest === robot ? robot.y - 44 : nearest.top - 20) + Math.sin(t * 6) * 1.5;
    rr(ctx, nx - 7, ny - 7, 14, 13, 3); ctx.fillStyle = '#0d1424'; ctx.fill();
    ctx.strokeStyle = '#4fffc3'; ctx.lineWidth = 1; ctx.stroke();
    text('E', nx, ny, 6, '#4fffc3');
  }

  // lighting vignette
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const sx = (player.x - cx) * zoom, sy = (player.y - 16 - cy) * zoom;
  const R = Math.max(canvas.width, canvas.height) * 2;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(vignette, sx - R, sy - R, R * 2, R * 2);
  ctx.imageSmoothingEnabled = false;

  drawMinimap(t);
}

// small pre-rendered vignette, stretched over the screen (cheaper than a per-frame gradient)
var vignette; // var: resize() runs before this line
function buildVignette() {
  vignette = vignette || document.createElement('canvas');
  vignette.width = vignette.height = 256;
  const v = vignette.getContext('2d');
  // canvas covers radius 2R; light falls off between 0.12R and 0.7R
  const g = v.createRadialGradient(128, 128, 128 * 0.06, 128, 128, 128 * 0.35);
  g.addColorStop(0, 'rgba(2,4,10,0)'); g.addColorStop(1, 'rgba(2,4,10,0.7)');
  v.fillStyle = g; v.fillRect(0, 0, 256, 256);
}

const miniBase = document.createElement('canvas');
miniBase.width = 144; miniBase.height = 96;
let miniSeen = -1, miniLast = 0;
function drawMinimap(t) {
  if (mini.classList.contains('hidden') || t - miniLast < 0.12) return;
  miniLast = t;
  const k = 3;
  if (miniSeen !== roomsSeen.size) { // rebuild static layer only when a new room is discovered
    miniSeen = roomsSeen.size;
    const b = miniBase.getContext('2d');
    b.fillStyle = '#05070d'; b.fillRect(0, 0, 144, 96);
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
      if (grid[y][x]) continue;
      const ri = roomGrid[y][x];
      b.fillStyle = ri >= 0 ? hexA(ROOMS[ri].color, roomsSeen.has(ROOMS[ri].id) ? 0.35 : 0.12) : 'rgba(255,216,79,0.4)';
      b.fillRect(x * k, y * k, k, k);
    }
  }
  mctx.drawImage(miniBase, 0, 0);
  exhibits.forEach((e) => {
    if (!e.countable) return;
    mctx.fillStyle = visited.has(e.id) ? e.color : ((t * 2 | 0) % 2 ? '#ffd84f' : '#6b5a1a');
    mctx.fillRect(e.tx * k, e.ty * k, k, k);
  });
  mctx.fillStyle = '#fff';
  mctx.fillRect((player.x / TILE) * k - 2, (player.y / TILE) * k - 2, 4, 4);
}

/* =========================================================
   UI: HUD / toasts / banner
   ========================================================= */
const hintEl = $('#hint');
const modalEl = $('#modal');
const modalContent = $('#m-content');
const dialogEl = $('#dialog');

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = tt(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = tt(el.dataset.i18nTitle); });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', tt(el.dataset.i18nAria)));
  document.querySelectorAll('.btn-lang').forEach((b) => {
    b.innerHTML = `🌐 <b class="${lang === 'id' ? 'on' : ''}">ID</b>/<b class="${lang === 'en' ? 'on' : ''}">EN</b>`;
  });
  const name = tr(D.name) || tt('default_name');
  $('#hud-name').textContent = name;
  $('#hud-role').textContent = tr(D.role) || '';
  $('#intro-title').textContent = tt('intro_title', { name });
  $('#intro-role').textContent = tr(D.role) || '';
  $('#intro-tagline').textContent = tr(D.tagline) || '';
  document.title = tt('doc_title', { name });
  $('#location').textContent = tt('location', { room: (currentRoom || roomById.lobby).name.toUpperCase() });
  hintEl.dataset.label = '';
  drawStatic();
}
function setLang(l) {
  lang = l;
  try { localStorage.setItem('lab-lang', l); } catch (_) {}
  applyLang();
}
document.querySelectorAll('.btn-lang').forEach((b) => b.addEventListener('click', () => setLang(lang === 'id' ? 'en' : 'id')));
// keep keyboard focus off HUD buttons so Space/Enter don't re-trigger them
document.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => b.blur()));
applyLang();

function updateProgress() {
  const n = visited.size, total = countable.length;
  $('#ptext').textContent = `${n}/${total}`;
  $('#pfill').style.width = `${total ? (n / total) * 100 : 0}%`;
}

function toast(icon, title, msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ic">${icon}</span><div><b>${esc(title)}</b><small>${esc(msg)}</small></div>`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 450); }, 3800);
}

function achieve(id, icon, title, msg) {
  if (achieved.has(id)) return;
  achieved.add(id); persist();
  sfx.ach(); toast(icon, `${tt('ach_prefix')} · ${title}`, msg);
}

let bannerTimer;
function enterRoom(r) {
  const banner = $('#banner');
  $('#location').textContent = tt('location', { room: r.name.toUpperCase() });
  $('#location').style.color = r.color;
  banner.style.setProperty('--c', r.color);
  banner.querySelector('small').textContent = r.id === 'hall' ? tt('transit') : tt('sector', { code: r.code });
  banner.querySelector('b').textContent = r.name.toUpperCase();
  banner.classList.add('show');
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => banner.classList.remove('show'), 1800);
  if (started) sfx.room();
  roomsSeen.add(r.id); persist();
  if (ROOMS.every((x) => roomsSeen.has(x.id))) achieve('explorer', '🧭', tt('ach_explorer_t'), tt('ach_explorer_d'));
}

/* =========================================================
   CONTENT RENDERERS
   ========================================================= */
const tags = (arr) => (arr && arr.length ? `<div class="tags">${arr.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>` : '');
const rankOf = (l) => tt(l >= 90 ? 'rank4' : l >= 75 ? 'rank3' : l >= 55 ? 'rank2' : 'rank1');
const contactLinks = () => `<div class="contact-list">${(D.contact || []).map((c) =>
  `<a href="${url(c.url)}" target="_blank" rel="noopener"><span class="ci">${esc(c.icon || String(tr(c.label))[0])}</span><div><b>${esc(c.label)}</b><small>${esc(c.value)}</small></div></a>`).join('')}</div>`;

const R = {
  profile: () => `
    <div class="profile">
      ${D.photo ? `<img class="avatar" src="${url(D.photo)}" alt="${esc(D.name)}">` : `<div class="avatar">${esc(initials(D.name))}</div>`}
      <div>
        <h3>// ${tt('h_subject')}</h3>
        <p><b>${esc(D.name)}</b><br><span class="meta">${esc(D.role)}${D.location ? ` · 📍 ${esc(D.location)}` : ''}</span></p>
        <p>${esc(about.bio)}</p>
      </div>
    </div>
    ${about.highlights && about.highlights.length ? `<h3>// ${tt('h_findings')}</h3><ul>${about.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
    <!--fieldnotes--><h3>// ${tt('h_fieldnotes')}</h3><p class="meta">${tt('fieldnotes')}</p>`,
  education: (d) => `<div class="timeline-item"><b>${esc(d.degree)}</b><br><span class="meta">${esc(d.school)} · ${esc(d.period)}</span><p>${esc(d.desc)}</p></div>`,
  experience: (d) => `<div class="timeline-item"><b>${esc(d.role)}</b><br><span class="meta">${esc(d.company)} · ${esc(d.period)}</span><p>${esc(d.desc)}</p></div>`,
  note: (d) => `<div class="big-icon">${esc(d.icon || '★')}</div><p>${esc(d.text)}</p>`,
  skill: (d) => {
    const lvl = Math.max(0, Math.min(100, +d.level || 0));
    return `<div class="big-icon" style="font-family:var(--pixel);font-size:30px;color:var(--c)">${esc(d.icon || initials(d.name))}</div>
      <p class="meta">${tt('category')}: ${esc(d.category)}</p>
      <div style="display:flex;justify-content:space-between"><span class="rank">${rankOf(lvl)}</span><span class="rank">${lvl}%</span></div>
      <div class="bar"><i style="width:${lvl}%"></i></div>
      <p style="margin-top:14px">${esc(d.desc)}</p>`;
  },
  tool: (d) => `<div class="big-icon">${esc(d.icon || '🔧')}</div><p class="meta" style="text-align:center">${esc(d.category)}</p><p>${esc(d.desc)}</p>`,
  cert: (d) => `
    ${d.image ? `<img class="cert-img" src="${url(d.image)}" alt="${esc(d.title)}">` : `<div class="cert-ph">${tt('cert_ph')}<br>${esc(d.title)}<br>— ${esc(d.issuer)} —</div>`}
    <p class="meta">${tt('issued_by')} <b>${esc(d.issuer)}</b>${d.date ? ` · ${esc(d.date)}` : ''}</p>
    <p>${esc(d.desc)}</p>${tags(d.tags)}
    ${d.url ? `<div class="btns"><a class="btn" href="${url(d.url)}" target="_blank" rel="noopener">🔗 ${tt('verify_cred')}</a></div>` : ''}`,
  project: (d) => {
    const shots = [d.image, ...(d.gallery || [])].filter(Boolean);
    return `
    ${shots.length ? `<img class="proj-img" src="${url(shots[0])}" alt="${esc(d.title)}">` : `<div class="big-icon">${esc(d.icon || '▣')}</div>`}
    ${shots.length > 1 ? `<div class="gallery">${shots.map((s, i) =>
      `<button class="thumb${i ? '' : ' on'}" data-src="${url(s)}"><img src="${url(s)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    <p>${esc(d.desc)}</p>${tags(d.tech)}
    <div class="btns">
      ${d.demo ? `<a class="btn" href="${url(d.demo)}" target="_blank" rel="noopener">▶ ${tt('live_demo')}</a>` : ''}
      ${d.repo ? `<a class="btn" href="${url(d.repo)}" target="_blank" rel="noopener">⌥ ${tt('source_code')}</a>` : ''}
    </div>`;
  },
  contact: () => `<p>${tt('contact_text')}</p>${contactLinks()}`,
  cv: () => `<p>${tt('cv_text', { name: esc(D.name) })}</p><div class="btns"><a class="btn" href="${url(D.cvUrl)}" target="_blank" rel="noopener" download>⬇ ${tt('download_cv')}</a></div>`,
  welcome: () => `
    <p>${tt('welcome_text', { name: esc(D.name) })} ${esc(D.tagline)}</p>
    <h3>// ${tt('h_sectors')}</h3>${sectorList()}
    <h3>// ${tt('h_howto')}</h3>
    <ul>${tt('howto1')}
    ${tt('howto2')}</ul>`,
  directory: () => `<p>${tt('dir_text')}</p>${sectorList()}`,
  archive: (d) => d.entries.map((en) => `<h3>${esc(en.title)}</h3>${R[en.section](en.data)}`).join('<hr>'),
};

function sectorList() {
  return `<div class="sector-list">${ROOMS.filter((r) => r.id !== 'hall').map((r) => {
    const items = countable.filter((e) => e.room === r.id);
    const done = items.filter((e) => visited.has(e.id)).length;
    return `<div style="--sc:${r.color}"><span><b>${r.code}</b> · ${esc(r.name)}</span><span class="meta">${done}/${items.length}</span></div>`;
  }).join('')}</div>`;
}

/* =========================================================
   MODAL
   ========================================================= */
let pendingClearance = false;
function showModal(html, color = '#4fd1ff', wide = false) {
  const card = modalEl.querySelector('.m-card');
  card.style.setProperty('--c', color);
  card.classList.toggle('wide', wide);
  modalContent.innerHTML = html;
  modalEl.classList.remove('hidden');
  card.scrollTop = 0;
  keys.clear();
}
function closeModal() {
  if (modalEl.classList.contains('hidden')) return;
  modalEl.classList.add('hidden');
  sfx.close();
  if (pendingClearance) { pendingClearance = false; setTimeout(openClearance, 250); }
}
modalEl.addEventListener('click', (ev) => {
  if (ev.target === modalEl) { closeModal(); return; }
  const th = ev.target.closest('.thumb'); // gallery thumbnail -> swap the main screenshot
  if (!th) return;
  const box = th.closest('.m-body');
  box.querySelector('.proj-img').src = th.dataset.src;
  box.querySelectorAll('.thumb').forEach((b) => b.classList.toggle('on', b === th));
});
modalEl.querySelector('.m-close').addEventListener('click', closeModal);

function openExhibit(e) {
  const r = roomById[e.room];
  const sub = { education: e.data.period, experience: e.data.company, skill: e.data.category, tool: e.data.category, cert: e.data.issuer }[e.section] || '';
  const idx = String(exhibits.indexOf(e) + 1).padStart(3, '0');
  showModal(`
    <div class="m-head"><span class="m-tag">${tt('sector', { code: r.code })} · ${esc(r.name.toUpperCase())} · EXHIBIT #${idx}</span>
      <h2>${esc(e.title)}</h2>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}</div>
    <div class="m-body">${R[e.section](e.data)}</div>
    <div class="m-foot">${tt('foot_close')}${e.countable ? ' · ' + tt('foot_logged') : ''}</div>`, e.color);
  sfx.open();
  if (e.countable && !visited.has(e.id)) {
    visited.add(e.id); persist(); updateProgress();
    achieve('first', '🔬', tt('ach_first_t'), tt('ach_first_d'));
    const items = countable.filter((x) => x.room === e.room);
    if (items.every((x) => visited.has(x.id))) achieve('room-' + e.room, '🏅', tt('ach_room_t', { room: r.name }), tt('ach_room_d', { code: r.code }));
    if (visited.size === countable.length) { achieve('all', '👑', tt('ach_all_t'), tt('ach_all_d')); pendingClearance = true; }
  }
}

function openClearance() {
  showModal(`
    <div class="m-head"><span class="m-tag">${tt('clear_tag')}</span><h2>🎉 ${tt('clear_title')}</h2></div>
    <div class="m-body"><p>${tt('clear_text', { name: esc(D.name) })}</p>
    <p>${tt('clear_cta')}</p>${contactLinks()}</div>`, '#ffd84f');
  sfx.ach();
}

function openQuickView() {
  const sec = (title, body) => (body ? `<h3>// ${title}</h3>${body}` : '');
  const cards = (arr, fn) => (arr && arr.length ? `<div class="qv-grid">${arr.map((d) => `<div class="qv-card">${fn(d)}</div>`).join('')}</div>` : '');
  showModal(`
    <div class="m-head"><span class="m-tag">${tt('qv_tag')}</span><h2>${esc(D.name)}</h2><div class="sub">${esc(D.role)}</div></div>
    <div class="m-body">
      ${R.profile().replace(/<!--fieldnotes-->[\s\S]*$/, '')}
      ${D.cvUrl ? `<div class="btns"><a class="btn" href="${url(D.cvUrl)}" target="_blank" rel="noopener">⬇ ${tt('download_cv')}</a></div>` : ''}
      ${sec(tt('qv_exp'), (about.experience || []).map(R.experience).join(''))}
      ${sec(tt('qv_edu'), (about.education || []).map(R.education).join(''))}
      ${sec(tt('qv_skills'), cards(D.skills, (d) => `<b>${esc(d.name)}</b><div class="meta">${esc(d.category)} · ${+d.level || 0}%</div><div class="bar"><i style="width:${+d.level || 0}%"></i></div>`))}
      ${sec(tt('qv_tools'), cards(D.tools, (d) => `<b>${esc(d.icon || '')} ${esc(d.name)}</b><div class="meta">${esc(d.category)}</div>`))}
      ${sec(tt('qv_certs'), cards(D.certificates, (d) => `<b>${esc(d.title)}</b><div class="meta">${esc(d.issuer)} · ${esc(d.date)}</div>${d.url ? `<a href="${url(d.url)}" target="_blank" rel="noopener">${tt('verify')} →</a>` : ''}`))}
      ${sec(tt('qv_projects'), cards(D.projects, (d) => `<b>${esc(d.icon || '')} ${esc(d.title)}</b><div class="meta">${esc(d.desc)}</div>${tags(d.tech)}${d.demo ? `<a href="${url(d.demo)}" target="_blank" rel="noopener">Demo</a> ` : ''}${d.repo ? `<a href="${url(d.repo)}" target="_blank" rel="noopener">${tt('code')}</a>` : ''}`))}
      ${sec(tt('qv_contact'), contactLinks())}
    </div>`, '#4fd1ff', true);
}

function openHelp() {
  showModal(`<div class="m-head"><span class="m-tag">${tt('help_tag')}</span><h2>${tt('help_title')}</h2></div>
    <div class="m-body">${R.welcome()}<div class="btns"><button class="btn" id="btn-reset">↺ ${tt('reset_btn')}</button></div></div>`, '#4fffc3');
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm(tt('reset_confirm'))) return;
    visited.clear(); achieved.clear(); roomsSeen.clear(); persist(); updateProgress(); closeModal();
  });
}

/* =========================================================
   DIALOG (robot guide)
   ========================================================= */
const guideLines = (D.guide && D.guide.lines && D.guide.lines.length) ? D.guide.lines : [{ id: 'Halo, pengunjung!', en: 'Hello, visitor!' }];
let dlg = { lines: [], i: 0, shown: 0, timer: null };
function startDialog(lines) {
  dlg = { lines, i: 0, shown: 0, timer: null };
  dialogEl.querySelector('.d-name').textContent = robot.name;
  dialogEl.classList.remove('hidden');
  keys.clear();
  typeLine();
}
function typeLine() {
  clearInterval(dlg.timer);
  const line = dlg.lines[dlg.i];
  const el = dialogEl.querySelector('.d-text');
  dlg.shown = 0;
  dlg.timer = setInterval(() => {
    dlg.shown++;
    el.textContent = line.slice(0, dlg.shown);
    if (dlg.shown % 3 === 0) sfx.talk();
    if (dlg.shown >= line.length) clearInterval(dlg.timer);
  }, 22);
}
function advanceDialog() {
  const line = dlg.lines[dlg.i];
  if (dlg.shown < line.length) { clearInterval(dlg.timer); dlg.shown = line.length; dialogEl.querySelector('.d-text').textContent = line; return; }
  dlg.i++;
  if (dlg.i >= dlg.lines.length) endDialog(); else typeLine();
}
function endDialog() {
  clearInterval(dlg.timer);
  dialogEl.classList.add('hidden');
  achieve('guide', '🤖', tt('ach_guide_t'), tt('ach_guide_d', { name: robot.name }));
}
dialogEl.addEventListener('click', advanceDialog);

function interact() {
  if (!nearest) return;
  if (nearest === robot) {
    const left = countable.length - visited.size;
    const extra = left > 0 ? tt('status_left', { n: left }) : tt('status_full');
    startDialog([...guideLines.map(tr), extra]);
  } else openExhibit(nearest);
}

/* =========================================================
   BOOT
   ========================================================= */
function startGame() {
  if (started) return;
  started = true;
  $('#intro').classList.add('leave');
  setTimeout(() => $('#intro').classList.add('hidden'), 700);
  if (isTouch) $('#touch').classList.remove('hidden');
  beep(440, 0.1, 'sine', 0.05); beep(660, 0.1, 'sine', 0.05, 0.1); beep(880, 0.15, 'sine', 0.05, 0.2);
  enterRoom(currentRoom || roomById.lobby);
  if (!achieved.has('guide')) setTimeout(() => toast('🤖', tt('wait_t', { name: robot.name.toUpperCase() }), tt('wait_d')), 1500);
}
$('#btn-start').addEventListener('click', startGame);
$('#btn-skip').addEventListener('click', () => { startGame(); setTimeout(openQuickView, 300); });
$('#btn-quick').addEventListener('click', openQuickView);
$('#btn-help').addEventListener('click', openHelp);
const soundBtn = $('#btn-sound');
const syncSound = () => { soundBtn.textContent = soundOn ? '🔊' : '🔇'; };
soundBtn.addEventListener('click', () => { soundOn = !soundOn; localStorage.setItem('lab-sound', soundOn ? 'on' : 'off'); syncSound(); });
syncSound();
updateProgress();

// snap camera to player at start
currentRoom = roomById.lobby;
{
  const cw = canvas.width / zoom, ch = canvas.height / zoom;
  cam.x = Math.max(0, Math.min(MW * TILE - cw, player.x - cw / 2));
  cam.y = Math.max(0, Math.min(MH * TILE - ch, player.y - 20 - ch / 2));
}

let last = performance.now();
let slowFrames = 0, sampled = 0;
function loop(now) {
  const raw = now - last;
  const dt = Math.min(0.05, raw / 1000);
  last = now;
  update(dt);
  // the intro screen and exhibit modal cover the canvas: draw one frame, then idle
  const covered = !started || !modalEl.classList.contains('hidden');
  if (!covered || needsRender) {
    render(now / 1000);
    needsRender = covered ? false : true;
    // adaptive quality: if the device can't hold ~45 fps, switch to lite mode once
    if (!covered && quality && raw < 200) {
      sampled++; if (raw > 22) slowFrames++;
      if (sampled >= 120) {
        if (slowFrames > 60) { quality = 0; resize(); }
        sampled = 0; slowFrames = 0;
      }
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
// redraw static map once web fonts are ready (sector labels use the pixel font)
if (document.fonts && document.fonts.load) document.fonts.load('10px "Press Start 2P"').then(drawStatic).catch(() => {});
})();
