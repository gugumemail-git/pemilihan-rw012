function viewPengumuman() {
    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">INFORMASI RESMI</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Pengumuman Panitia</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Informasi resmi seputar tahapan dan pelaksanaan PILWE 012 GMG.</p>
        </div>
    </section>
    <section class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div class="space-y-4">
            ${DB.pengumuman.map(a => `
                <div onclick="showPengumumanModal(${a.id})" class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-lift cursor-pointer">
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${a.kategori === 'Penting' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">${a.kategori}</span>
                        <span class="text-xs text-slate-400 font-medium"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2">${a.judul}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">${a.isi}</p>
                    <div class="mt-4 text-xs font-bold text-emerald-700">Baca Selengkapnya →</div>
                </div>
            `).join("")}
        </div>
    </section>
    `;
}

function viewTimeline() {
    const statusMap = {
        selesai: { label: "Selesai", badge: "bg-slate-200 text-slate-700", dot: "bg-emerald-600 text-white" },
        berjalan: { label: "Sedang Berlangsung", badge: "bg-amber-400 text-emerald-950 font-bold", dot: "bg-amber-400 text-emerald-950 animate-bounce" },
        akan: { label: "Akan Datang", badge: "bg-slate-100 text-slate-500", dot: "bg-slate-300 text-slate-600" }
    };
    const total = DB.timeline.length;
    const selesai = DB.timeline.filter(t => t.status === "selesai").length;
    const berjalan = DB.timeline.filter(t => t.status === "berjalan").length;
    const progress = total ? Math.round(((selesai + berjalan * 0.5) / total) * 100) : 0;

    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">TAHAPAN PEMILIHAN</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Timeline & Jadwal Kegiatan</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Alur tahapan pemilihan Ketua RW 012 Perum Grand Mutiara Gading secara transparan.</p>
        </div>
    </section>
    <section class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-10">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-extrabold uppercase tracking-wider text-slate-600">Progres Tahapan Pemilihan</span>
                <span class="text-sm font-black text-emerald-700">${progress}%</span>
            </div>
            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
            </div>
        </div>
        <div class="relative before:absolute before:inset-0 before:left-5 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 space-y-8">
            ${DB.timeline.map((t) => {
                const s = statusMap[t.status] || statusMap.akan;
                return `
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${s.dot} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-sm font-bold">${t.icon || '📝'}</div>
                    <div class="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border ${t.status === 'berjalan' ? 'border-amber-400 ring-2 ring-amber-100 shadow-md' : 'border-slate-200'} shadow-sm">
                        <div class="flex items-center justify-between gap-2 mb-2">
                            <span class="text-xs font-bold text-emerald-700">${t.tanggal}</span>
                            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${s.badge}">${s.label}</span>
                        </div>
                        <h3 class="font-bold text-slate-900 text-base mb-1">${t.judul}</h3>
                        <p class="text-xs text-slate-600 leading-relaxed">${t.desc}</p>
                    </div>
                </div>
                `;
            }).join("")}
        </div>
    </section>
    `;
}

function viewTatib() {
    const pdf1Url = DB.tatibPdf1 || DEFAULT_DATA.tatibPdf1;
    const pdf1Judul = DB.tatibJudul1 || "Dokumen Tata Tertib";
    const pdf2Url = DB.tatibPdf2 || DEFAULT_DATA.tatibPdf2;
    const pdf2Judul = DB.tatibJudul2 || "Dokumen Berita Acara";
    const currentUrl = activeTatibTab === 1 ? pdf1Url : pdf2Url;
    const currentJudul = activeTatibTab === 1 ? pdf1Judul : pdf2Judul;

    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">PANDUAN & ATURAN RESMI</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Tata Tertib & Berita Acara</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Dokumen resmi aturan, pedoman, serta berita acara pelaksanaan PILWE 012 GMG.</p>
        </div>
    </section>
    <section class="py-12 max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onclick="switchTatibTab(1)" class="p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${activeTatibTab === 1 ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-slate-100/90 border-slate-200 hover:bg-white'}">
                <div class="w-12 h-12 rounded-xl ${activeTatibTab === 1 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-2xl shrink-0 font-black"><i class="fa-solid fa-file-pdf"></i></div>
                <div class="overflow-hidden">
                    <span class="text-[10px] font-extrabold uppercase tracking-wider ${activeTatibTab === 1 ? 'text-emerald-700' : 'text-slate-500'}">DOKUMEN 1</span>
                    <h3 class="font-extrabold text-slate-900 text-xs sm:text-sm truncate">${pdf1Judul}</h3>
                </div>
            </button>
            <button onclick="switchTatibTab(2)" class="p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${activeTatibTab === 2 ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-slate-100/90 border-slate-200 hover:bg-white'}">
                <div class="w-12 h-12 rounded-xl ${activeTatibTab === 2 ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center text-2xl shrink-0 font-black"><i class="fa-solid fa-file-contract"></i></div>
                <div class="overflow-hidden">
                    <span class="text-[10px] font-extrabold uppercase tracking-wider ${activeTatibTab === 2 ? 'text-emerald-700' : 'text-slate-500'}">DOKUMEN 2</span>
                    <h3 class="font-extrabold text-slate-900 text-xs sm:text-sm truncate">${pdf2Judul}</h3>
                </div>
            </button>
        </div>
        <div class="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl shrink-0"><i class="fa-solid fa-file-pdf"></i></div>
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">DOKUMEN TAMPIL: DOKUMEN ${activeTatibTab}</span>
                    <h3 class="font-bold text-slate-900 text-sm sm:text-base">${currentJudul}</h3>
                </div>
            </div>
            <a href="${currentUrl}" target="_blank" download class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow">
                <i class="fa-solid fa-download"></i> Unduh PDF
            </a>
        </div>
        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <iframe src="${currentUrl}" class="w-full h-[75vh] min-h-[500px]" frameborder="0">
                <p class="p-6 text-center text-xs">Browser Anda tidak mendukung preview PDF. <a href="${currentUrl}" target="_blank" class="text-emerald-700 underline">Unduh di sini</a>.</p>
            </iframe>
        </div>
    </section>
    `;
}

function switchTatibTab(tabNum) {
    activeTatibTab = tabNum;
    render();
}