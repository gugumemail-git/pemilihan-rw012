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

        function viewDokumen() {
            return `
            <section class="gradient-primary text-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">PUSAT UNDUHAN</span>
                    <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Dokumen & Tata Tertib</h1>
                    <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Unduh dokumen resmi, tata tertib, dan berkas pendukung terkait Pemilihan Ketua RW 012 GMG.</p>
                </div>
            </section>

            <section class="py-12 max-w-5xl mx-auto px-4 sm:px-6">
                <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    ${DB.dokumen && DB.dokumen.length ? DB.dokumen.map(doc => `
                        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm card-lift flex flex-col justify-between">
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
                                        <i class="fa-solid fa-file-pdf"></i>
                                    </div>
                                    <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">${doc.kategori || 'Dokumen'}</span>
                                </div>
                                <h3 class="font-bold text-slate-900 text-sm mb-1 leading-snug">${doc.judul}</h3>
                            </div>
                            <div class="mt-4 pt-3 border-t border-slate-100">
                                <a href="${doc.url}" target="_blank" class="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow">
                                    <i class="fa-solid fa-download"></i> Lihat / Unduh
                                </a>
                            </div>
                        </div>
                    `).join("") : `
                        <div class="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-200">
                            <div class="text-4xl mb-3 text-slate-300"><i class="fa-solid fa-folder-open"></i></div>
                            <p class="text-slate-500">Belum ada dokumen yang diunggah.</p>
                        </div>
                    `}
                </div>
            </section>
            `;
        }

function switchTatibTab(tabNum) {
    activeTatibTab = tabNum;
    render();
}