// js/views/info.js

// Helper merender Grid Galeri Dokumentasi
function renderGaleriPengumuman(a, maxPreview = 4) {
    const fotos = Array.isArray(a.fotoUrls) ? a.fotoUrls.filter(Boolean) : [];
    if (fotos.length === 0) return "";

    const total = fotos.length;
    const tampil = fotos.slice(0, maxPreview);
    const sisa = total - maxPreview;

    // Layout grid menyesuaikan jumlah foto (1 foto = lebar penuh, 2 = 2 kolom, 3+ = 3 atau 4 kolom)
    let gridClass = "grid-cols-2 sm:grid-cols-4";
    let aspectClass = "aspect-square";
    if (total === 1) {
        gridClass = "grid-cols-1";
        aspectClass = "aspect-video max-h-80";
    } else if (total === 2) {
        gridClass = "grid-cols-2";
        aspectClass = "aspect-[4/3]";
    } else if (total === 3) {
        gridClass = "grid-cols-3";
        aspectClass = "aspect-square";
    }

    return `
        <div class="mt-4 pt-4 border-t border-slate-100" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-2.5">
                <span class="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <i class="fa-regular fa-images text-emerald-600"></i> Dokumentasi Kegiatan (${total} Foto)
                </span>
                ${a.albumUrl ? `
                    <a href="${a.albumUrl}" target="_blank" rel="noopener noreferrer"
                       class="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1">
                        <i class="fa-brands fa-google-drive"></i> Album Google Drive
                    </a>
                ` : ""}
            </div>

            <div class="grid ${gridClass} gap-2.5">
                ${tampil.map((rawUrl, idx) => {
                    const imgSrc = getGdriveImageUrl(rawUrl);
                    const isLastWithMore = (idx === maxPreview - 1) && sisa > 0;
                    return `
                        <button type="button" onclick="openLightbox(${a.id}, ${idx})"
                                class="group relative ${aspectClass} w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 focus:outline-none">
                            <img src="${imgSrc}" alt="Dokumentasi ${idx + 1}" loading="lazy"
                                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                 onerror="this.src='https://placehold.co/400x400/e2e8f0/64748b?text=Foto+Drive'">
                            ${isLastWithMore ? `
                                <div class="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                                    <span class="text-lg sm:text-xl font-black">+${sisa}</span>
                                    <span class="text-[10px] font-bold uppercase tracking-wider">Foto Lainnya</span>
                                </div>
                            ` : `
                                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                                    <span class="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center text-xs shadow transition">
                                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                                    </span>
                                </div>
                            `}
                        </button>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}

// ================= PENGUMUMAN =================
function viewPengumuman() {
    const list = DB.pengumuman.slice().sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">INFORMASI RESMI</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Pengumuman Panitia</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Seluruh informasi, pengumuman resmi, dan dokumentasi kegiatan Pemilihan Ketua RW 012 Perum Grand Mutiara Gading.</p>
        </div>
    </section>

    <section class="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        ${list.length === 0 ? `
            <div class="text-center text-sm text-slate-400 py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                <i class="fa-regular fa-bell-slash text-3xl mb-3 block"></i>
                Belum ada pengumuman.
            </div>
        ` : `
            <div class="space-y-5">
                ${list.map(a => {
                    const jmlFoto = Array.isArray(a.fotoUrls) ? a.fotoUrls.filter(Boolean).length : 0;
                    return `
                    <div onclick="showPengumumanModal(${a.id})" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-lift cursor-pointer">
                        <div class="flex items-center justify-between text-xs mb-3 flex-wrap gap-2">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${a.kategori === 'Penting' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">${a.kategori}</span>
                                ${a.tampilDiBeranda ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800"><i class="fa-solid fa-eye mr-1"></i>Di Beranda</span>` : ''}
                                ${jmlFoto > 0 ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700"><i class="fa-regular fa-images mr-1"></i>${jmlFoto} Foto</span>` : ''}
                            </div>
                            <span class="text-slate-400"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</span>
                        </div>
                        <h3 class="font-bold text-slate-900 text-base sm:text-lg mb-2">${a.judul}</h3>
                        <p class="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">${a.isi}</p>
                        
                        ${renderGaleriPengumuman(a, 4)}

                        <div class="mt-4 text-xs font-bold text-emerald-700 flex items-center gap-1">Baca Selengkapnya <i class="fa-solid fa-chevron-right text-[10px]"></i></div>
                    </div>
                `;}).join("")}
            </div>
        `}
    </section>
    `;
}

function showPengumumanModal(id) {
    const a = DB.pengumuman.find(x => x.id === id);
    if (!a) return;

    const fotos = Array.isArray(a.fotoUrls) ? a.fotoUrls.filter(Boolean) : [];

    openModal(`
        <div class="gradient-primary text-white p-6 relative">
            <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><i class="fa-solid fa-xmark"></i></button>
            <span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider mb-2">${a.kategori}</span>
            <h3 class="text-xl font-extrabold leading-tight pr-8">${a.judul}</h3>
            <div class="text-xs text-emerald-100 mt-2"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</div>
        </div>
        <div class="p-6">
            <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">${a.isi}</p>
            ${fotos.length > 0 ? renderGaleriPengumuman(a, 12) : ""}
        </div>
        <div class="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            ${a.albumUrl ? `
                <a href="${a.albumUrl}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition">
                    <i class="fa-brands fa-google-drive"></i> Buka Folder Google Drive
                </a>
            ` : `<div></div>`}
            <button onclick="closeModal()" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition ml-auto">Tutup</button>
        </div>
    `);
}

// ================= TIMELINE =================
function viewTimeline() {
    const list = DB.timeline.slice().sort((a, b) => (a.urutan || 0) - (b.urutan || 0));

    const statusBadge = (s) => {
        if (s === 'selesai') return `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700"><i class="fa-solid fa-check mr-1"></i>Selesai</span>`;
        if (s === 'berjalan') return `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700"><i class="fa-solid fa-spinner mr-1"></i>Berlangsung</span>`;
        return `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600"><i class="fa-regular fa-clock mr-1"></i>Akan Datang</span>`;
    };

    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">ALUR & JADWAL</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Timeline Pemilihan</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Tahapan resmi Pemilihan Ketua RW 012 Perum Grand Mutiara Gading.</p>
        </div>
    </section>

    <section class="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative">
            <div class="absolute left-5 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
            <div class="space-y-4">
                ${list.map(t => `
                    <div class="relative pl-14">
                        <div class="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-4 border-emerald-600 flex items-center justify-center text-lg shadow">${t.icon || '📝'}</div>
                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <div class="text-xs font-bold text-emerald-700">${t.tanggal}</div>
                                ${statusBadge(t.status)}
                            </div>
                            <h3 class="font-extrabold text-slate-900 text-sm">${t.judul}</h3>
                            <p class="text-xs text-slate-600 mt-1 leading-relaxed">${t.desc || ''}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    </section>
    `;
}

// ================= DOKUMEN =================
function viewDokumen() {
    const list = DB.dokumen || [];

    const kategoriBadge = (k) => {
        const map = {
            'Tata Tertib': 'bg-emerald-100 text-emerald-700',
            'Berita Acara': 'bg-amber-100 text-amber-700',
            'Formulir': 'bg-blue-100 text-blue-700',
            'Lainnya': 'bg-slate-100 text-slate-700'
        };
        return map[k] || 'bg-slate-100 text-slate-700';
    };

    const defaultDocs = [];
    if (DB.tatibPdf1) defaultDocs.push({ id: 'tatib1', judul: DB.tatibJudul1 || 'Tata Tertib', kategori: 'Tata Tertib', url: DB.tatibPdf1 });
    if (DB.tatibPdf2) defaultDocs.push({ id: 'tatib2', judul: DB.tatibJudul2 || 'Berita Acara', kategori: 'Berita Acara', url: DB.tatibPdf2 });

    const allDocs = [...defaultDocs, ...list];

    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">DOKUMEN RESMI</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Dokumen & Berkas</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Unduh dokumen resmi seputar Pemilihan Ketua RW 012 Perum Grand Mutiara Gading.</p>
        </div>
    </section>

    <section class="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        ${allDocs.length === 0 ? `
            <div class="text-center text-sm text-slate-400 py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                <i class="fa-regular fa-folder-open text-3xl mb-3 block"></i>
                Belum ada dokumen tersedia.
            </div>
        ` : `
            <div class="grid sm:grid-cols-2 gap-4">
                ${allDocs.map(d => `
                    <a href="${d.url}" target="_blank" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-lift flex items-start gap-4">
                        <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="min-w-0">
                            <div class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${kategoriBadge(d.kategori)} mb-1">${d.kategori}</div>
                            <h3 class="font-bold text-slate-900 text-sm line-clamp-2">${d.judul}</h3>
                            <div class="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">Buka Dokumen <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></div>
                        </div>
                    </a>
                `).join("")}
            </div>
        `}
    </section>
    `;
}