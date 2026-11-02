function viewBeranda() {
    const p = DB.profil;
    const ab = DB.agendaBar || DEFAULT_DATA.agendaBar;
    return `
    <section class="relative gradient-primary text-white overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div class="absolute inset-0 pattern-dots opacity-30 pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7 text-center lg:text-left reveal">
                    <div class="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 mb-6 backdrop-blur shadow-sm">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        PORTAL RESMI · PILWE 012 GMG PERIODE ${p.periode}
                    </div>
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
                        Pemilihan Ketua RW 012<br/>
                        <span class="text-amber-300">Grand Mutiara Gading</span>
                    </h1>
                    <p class="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                        ${p.tagline}
                    </p>
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <a href="#kandidat" class="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                            <i class="fa-solid fa-users"></i> Lihat Calon Ketua RW
                        </a>
                        <button onclick="go('timeline')" class="px-6 py-3.5 rounded-xl glass hover:bg-white/20 text-white font-bold text-sm transition-all flex items-center gap-2">
                            <i class="fa-solid fa-calendar-check text-amber-300"></i> Alur Pemilihan
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-5 reveal">
                    <div class="bg-emerald-950/85 border border-emerald-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur relative">
                        <div class="flex items-center justify-between pb-4 border-b border-emerald-800">
                            <div>
                                <span class="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">PUNCAK ACARA</span>
                                <h3 class="text-lg font-bold text-white">Hari Pemungutan Suara</h3>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">
                                <i class="fa-solid fa-vote-yea text-lg"></i>
                            </div>
                        </div>

                        <div id="heroCountdown" class="grid grid-cols-4 gap-2 my-6 text-center"></div>

                        <div class="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                            <i class="fa-solid fa-location-dot text-amber-300 text-2xl"></i>
                            <div class="text-xs">
                                <div class="font-bold text-white">Lokasi TPS:</div>
                                <div class="text-emerald-200 mt-0.5 font-bold" id="heroLokasiTps">${ab.lokasiText || 'Sekretariat RW 012 Perum GMG'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold shrink-0"><i class="fa-solid fa-user-tie"></i></div>
                <div><div class="text-2xl font-black text-slate-900">${DB.kandidat.length} Paslon</div><div class="text-xs font-semibold text-slate-500">Kandidat Ketua RW</div></div>
            </div>
            <div class="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold shrink-0"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><div class="text-2xl font-black text-slate-900">LUBER</div><div class="text-xs font-semibold text-slate-500">Langsung, Umum, Bebas</div></div>
            </div>
            <div class="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold shrink-0"><i class="fa-solid fa-shield-halved"></i></div>
                <div><div class="text-2xl font-black text-slate-900">JURDIL</div><div class="text-xs font-semibold text-slate-500">Jujur & Adil</div></div>
            </div>
            <div class="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold shrink-0"><i class="fa-solid fa-house-user"></i></div>
                <div><div class="text-2xl font-black text-slate-900">1 Suara</div><div class="text-xs font-semibold text-slate-500">Tiap Kepala Keluarga</div></div>
            </div>
        </div>
    </section>

    <section id="kandidat" class="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div class="text-center max-w-3xl mx-auto mb-14 reveal">
            <span class="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full mb-3">CALON KETUA RW 012 GMG</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Mengenal Kandidat Pemimpin RW 012</h2>
            <p class="text-slate-600 mt-3 text-sm sm:text-base">Klik tombol detail untuk membaca rincian Visi, Misi, serta Program Kerja Unggulan dari masing-masing calon.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${DB.kandidat.map(k => `
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md card-lift flex flex-col justify-between reveal">
                    <div>
                        <div class="bg-gradient-to-r ${k.warna} p-6 text-white text-center relative overflow-hidden">
                            <div class="absolute -right-4 -bottom-4 opacity-10 text-8xl font-black">${k.no}</div>
                            <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">Nomor Urut 0${k.no}</span>
                            <h3 class="text-2xl font-extrabold">${k.nama}</h3>
                            <p class="text-emerald-100 text-xs mt-1">Calon Ketua RW 012 GMG</p>
                        </div>
                        <div class="pt-6 px-6 text-center">
                            <div class="w-28 h-28 mx-auto rounded-2xl bg-emerald-50 border-4 border-white shadow-lg flex items-center justify-center text-6xl">${k.emoji}</div>
                            <div class="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">📍 ${k.alamat} • 💼 ${k.pekerjaan}</div>
                        </div>
                        <div class="p-6">
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 text-left">
                                <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Visi Utama:</h4>
                                <p class="text-xs text-slate-700 line-clamp-3 leading-relaxed">${k.visi}</p>
                            </div>
                        </div>
                    </div>
                    <div class="px-6 pb-6">
                        <button onclick="showKandidatModal(${k.id})" class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow">
                            <i class="fa-solid fa-circle-info"></i> Lihat Visi Misi & Program
                        </button>
                    </div>
                </div>
            `).join("")}
        </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 sm:px-6 my-12 reveal">
        <div class="gradient-primary text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-emerald-600">
            <div class="absolute inset-0 pattern-dots opacity-25"></div>
            <div class="relative z-10 max-w-2xl mx-auto">
                <h2 class="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Tandai Tanggalnya!</h2>
                <p class="text-emerald-50/95 text-xs sm:text-sm md:text-base leading-relaxed mb-8">
                    Pastikan Anda hadir dan menggunakan hak pilih pada hari pemilihan, <strong>Ahad, 17 Januari 2027</strong>, pukul <strong>06.00–11.00 WIB</strong> di <strong>${ab.lokasiText || 'GOR Perum GMG'}</strong>. Suara Anda menentukan masa depan lingkungan kita.
                </p>
                <div class="mb-8">
                    <div class="text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-2">COUNTDOWN MENUJU PENCOBLOSAN</div>
                    <div id="mainCountdown" class="grid grid-cols-4 gap-3 max-w-md mx-auto"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-slate-100/80 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 reveal">
                <div>
                    <span class="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">INFORMASI TERKINI</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Pengumuman Panitia</h2>
                </div>
                <button onclick="go('pengumuman')" class="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">Lihat Semua Pengumuman <i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                ${DB.pengumuman.slice(0, 3).map(a => `
                    <div onclick="showPengumumanModal(${a.id})" class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm card-lift cursor-pointer flex flex-col justify-between reveal">
                        <div>
                            <div class="flex items-center justify-between text-xs mb-3">
                                <span class="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${a.kategori === 'Penting' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">${a.kategori}</span>
                                <span class="text-slate-400"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</span>
                            </div>
                            <h3 class="font-bold text-slate-900 text-base mb-2 line-clamp-2">${a.judul}</h3>
                            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">${a.isi}</p>
                        </div>
                        <div class="text-xs font-bold text-emerald-700 flex items-center gap-1">Baca Selengkapnya <i class="fa-solid fa-chevron-right text-[10px]"></i></div>
                    </div>
                `).join("")}
            </div>
        </div>
    </section>
    `;
}