function viewPanitia() {
    const p = DB.panitia;
    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">ORGANISASI PELAKSANA</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Panitia PILWE 012 GMG</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Susunan Panitia Pemilihan Ketua RW 012 Perum Grand Mutiara Gading.</p>
        </div>
    </section>
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            ${[
                { role: p.ketua.jabatan, nama: p.ketua.nama, icon: "fa-user-tie", bg: "gradient-primary text-white" },
                { role: p.wakil.jabatan, nama: p.wakil.nama, icon: "fa-user-shield", bg: "bg-slate-900 text-white" },
                { role: p.sekretaris.jabatan, nama: p.sekretaris.nama, icon: "fa-file-signature", bg: "bg-emerald-800 text-white" },
                { role: p.bendahara.jabatan, nama: p.bendahara.nama, icon: "fa-wallet", bg: "bg-amber-500 text-emerald-950" }
            ].map(x => `
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center card-lift">
                    <div class="w-14 h-14 mx-auto rounded-2xl ${x.bg} flex items-center justify-center text-xl mb-4 shadow"><i class="fa-solid ${x.icon}"></i></div>
                    <span class="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">${x.role}</span>
                    <h3 class="font-extrabold text-slate-900 text-base mt-1">${x.nama}</h3>
                </div>
            `).join("")}
        </div>
        <div>
            <h3 class="text-xl font-extrabold text-slate-900 mb-6 text-center sm:text-left"><i class="fa-solid fa-users text-emerald-700 mr-2"></i>Seksi & Anggota Panitia</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                ${p.anggota.map(a => `
                    <div class="bg-white p-4 rounded-xl border border-slate-200/80 text-center shadow-xs">
                        <div class="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-2 font-bold text-sm"><i class="fa-solid fa-user"></i></div>
                        <div class="font-bold text-slate-900 text-xs">${a.nama}</div>
                        <div class="text-[10px] text-slate-500 mt-0.5">${a.jabatan}</div>
                    </div>
                `).join("")}
            </div>
        </div>
    </section>
    `;
}
function viewKontak() {
    const p = DB.profil;
    const ab = DB.agendaBar || DEFAULT_DATA.agendaBar;
    const lokasiPanitia = ab.lokasiText || p.lokasiTps || 'Sekretariat RW 012';
    return `
    <section class="gradient-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span class="text-xs font-extrabold uppercase tracking-widest text-amber-300">LOKASI TPS & SEKRETARIAT</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold mt-1">Kontak & Lokasi TPS</h1>
            <p class="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl">Hubungi Panitia PILWE 012 GMG atau lihat petunjuk lokasi TPS & Sekretariat RW 012 Perum GMG.</p>
        </div>
    </section>
    <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8">
            <div class="lg:col-span-5 space-y-4">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0 font-bold"><i class="fa-solid fa-location-dot"></i></div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">Alamat Panitia</h4>
                        <p class="text-xs font-black text-emerald-700 mt-0.5">Sekretariat RW 012 Perum GMG</p>
                        <p class="text-xs text-slate-600 mt-1 leading-relaxed">${p.alamatSekretariat}</p>
                        <a href="${p.mapsLink}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline mt-2"><i class="fa-solid fa-map-location-dot"></i> Buka Google Maps</a>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-clock"></i></div>
                    <div><h4 class="font-bold text-slate-900 text-sm">Jam Layanan</h4><p class="text-xs text-slate-600 mt-1">${p.jamLayanan}</p></div>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0"><i class="fa-brands fa-whatsapp"></i></div>
                    <div><h4 class="font-bold text-slate-900 text-sm">WhatsApp & Email</h4><p class="text-xs text-slate-600 mt-1">WA: ${p.wa}<br/>Email: ${p.email}</p></div>
                </div>
            </div>
            <div class="lg:col-span-7">
                <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
                    <h3 class="text-xl font-bold text-slate-900 mb-1">Formulir Aspirasi Warga</h3>
                    <p class="text-xs text-slate-500 mb-6">Pesan Anda akan otomatis tersambung langsung ke WhatsApp Panitia.</p>
                    <form onsubmit="handleSendWa(event)" class="space-y-4">
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Nama Lengkap *</label>
                                <input id="fWaNama" type="text" required placeholder="Nama Anda" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-all">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Alamat Blok / RT *</label>
                                <input id="fWaBlok" type="text" required placeholder="cth: Blok A2 / RT 01" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-all">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Isi Pesan / Pertanyaan *</label>
                            <textarea id="fWaPesan" rows="4" required placeholder="Tuliskan masukan atau pertanyaan Anda..." class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition-all resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                            <i class="fa-brands fa-whatsapp text-lg"></i> Kirim via WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div class="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm flex items-center justify-between">
                <span><i class="fa-solid fa-map-location-dot text-emerald-700 mr-2"></i>Peta Lokasi: ${lokasiPanitia}</span>
            </div>
            <iframe class="w-full h-72 sm:h-80" loading="lazy" src="https://www.google.com/maps?q=${p.koordinat.lat},${p.koordinat.lng}&z=${p.koordinat.zoom}&output=embed"></iframe>
        </div>
    </section>
    `;
}

function handleSendWa(e) {
    e.preventDefault();
    const nama = document.getElementById("fWaNama").value.trim();
    const blok = document.getElementById("fWaBlok").value.trim();
    const pesan = document.getElementById("fWaPesan").value.trim();

    if (!nama || !pesan) {
        showToast("⚠️", "Mohon isi nama dan pesan Anda.");
        return;
    }
    const text = encodeURIComponent(`Halo Panitia PILWE 012 GMG,\n\nNama: ${nama}\nAlamat: ${blok}\n\nPesan:\n${pesan}`);
    const cleanWa = DB.profil.wa.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${text}`, '_blank');
    showToast("✅", "Mengarahkan ke WhatsApp Panitia...");
}
function showKandidatModal(id) {
    const k = DB.kandidat.find(x => x.id === id);
    if (!k) return;

    const html = `
        <div class="bg-gradient-to-r ${k.warna} text-white p-6 sm:p-8 relative overflow-hidden">
            <button onclick="closeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white z-10 transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="relative flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl sm:text-6xl border border-white/30 shrink-0">
                    ${k.emoji}
                </div>
                <div>
                    <span class="inline-block px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-black uppercase mb-2">NOMOR URUT 0${k.no}</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold">${k.nama}</h2>
                    <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-100 mt-2 justify-center sm:justify-start">
                        <span>📍 ${k.alamat}</span>
                        <span>💼 ${k.pekerjaan}</span>
                        <span>🎂 ${k.umur} Thn</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
            <div>
                <div class="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                    <i class="fa-solid fa-bullseye"></i> VISI UTAMA
                </div>
                <p class="text-xs sm:text-sm text-slate-700 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 leading-relaxed">${k.visi}</p>
            </div>

            <div>
                <div class="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                    <i class="fa-solid fa-list-check"></i> MISI PEMBANGUNAN
                </div>
                <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
                    ${k.misi.map(m => `
                        <li class="flex items-start gap-2.5">
                            <i class="fa-solid fa-circle-check text-emerald-600 mt-0.5"></i>
                            <span>${m}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>

            ${k.program && k.program.length ? `
            <div>
                <div class="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                    <i class="fa-solid fa-star"></i> PROGRAM UNGGULAN
                </div>
                <div class="grid sm:grid-cols-3 gap-3">
                    ${k.program.map(p => `
                        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center sm:text-left">
                            <div class="text-2xl mb-1">${p.icon}</div>
                            <div class="font-bold text-slate-900 text-xs">${p.judul}</div>
                            <div class="text-[11px] text-slate-500 mt-0.5">${p.desc}</div>
                        </div>
                    `).join("")}
                </div>
            </div>
            ` : ''}
        </div>

        <div class="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button onclick="closeModal()" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition">
                Tutup Window
            </button>
        </div>
    `;
    openModal(html);
}