function viewLoginAdmin() {
    return `
    <section class="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
            <div class="text-center mb-6">
                <div class="w-14 h-14 mx-auto gradient-primary text-white rounded-2xl flex items-center justify-center text-2xl mb-3 shadow">
                    <i class="fa-solid fa-user-gear"></i>
                </div>
                <h2 class="text-2xl font-extrabold text-slate-900">Admin Login Dashboard</h2>
                <p class="text-xs text-slate-500 mt-1">Sistem Terenkripsi SHA-256</p>
            </div>
            <form onsubmit="doLoginAdmin(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Username</label>
                    <input id="inUser" type="text" required placeholder="admin" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-600">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
                    <input id="inPassA" type="password" required placeholder="••••••" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-600">
                </div>
                <button type="submit" class="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition-all">
                    Masuk Ke Admin Dashboard
                </button>
            </form>
        </div>
    </section>
    `;
}

function showPengumumanModal(id) {
    const a = DB.pengumuman.find(x => x.id === id);
    if (!a) return;

    const html = `
        <div class="p-6 sm:p-8">
            <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                    <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${a.kategori === 'Penting' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">${a.kategori}</span>
                    <div class="text-xs text-slate-400 mt-2"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</div>
                </div>
                <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">${a.judul}</h2>
            <p class="text-slate-600 leading-relaxed text-xs sm:text-sm whitespace-pre-line">${a.isi}</p>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button onclick="closeModal()" class="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800">
                    Tutup Pengumuman
                </button>
            </div>
        </div>
    `;
    openModal(html);
}

function viewAdmin() {
    if (!session || session.role !== "admin") {
        return `
        <section class="min-h-[50vh] flex items-center justify-center px-4 py-12">
            <div class="text-center">
                <div class="text-5xl mb-3 text-red-500"><i class="fa-solid fa-lock"></i></div>
                <h2 class="text-xl font-bold text-slate-900">Akses Terbatas</h2>
                <p class="text-xs text-slate-500 mt-1 mb-4">Silakan login sebagai admin panitia terlebih dahulu.</p>
                <button onclick="go('loginAdmin')" class="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">Login Admin</button>
            </div>
        </section>
        `;
    }

    const p = DB.profil;
    const ab = DB.agendaBar || DEFAULT_DATA.agendaBar;

    return `
    <section class="gradient-primary text-white py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
                <span class="text-xs font-bold text-amber-300">ADMINISTRATOR CONTROL PANEL</span>
                <h1 class="text-2xl sm:text-3xl font-extrabold">Kelola Data PILWE 012 GMG</h1>
            </div>
            <button onclick="doLogout()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20">
                <i class="fa-solid fa-right-from-bracket mr-1"></i> Keluar Admin
            </button>
        </div>
    </section>

    <section class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="text-xs text-slate-500 font-bold uppercase">Total Kandidat</div>
                <div class="text-2xl font-black text-emerald-700 mt-1">${DB.kandidat.length} Paslon</div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="text-xs text-slate-500 font-bold uppercase">Total Timeline</div>
                <div class="text-2xl font-black text-emerald-700 mt-1">${DB.timeline.length} Tahapan</div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="text-xs text-slate-500 font-bold uppercase">Dokumen Tatib</div>
                <div class="text-2xl font-black text-red-600 mt-1">2 File PDF</div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="text-xs text-slate-500 font-bold uppercase">Total Pengumuman</div>
                <div class="text-2xl font-black text-emerald-700 mt-1">${DB.pengumuman.length} Item</div>
            </div>
        </div>

        <div class="bg-amber-500/10 border border-amber-400/40 p-6 sm:p-8 rounded-3xl shadow-sm">
            <div class="flex items-center gap-3 mb-2">
                <span class="px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-black rounded-full uppercase">BAGIAN 1</span>
                <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-bullhorn text-amber-600 mr-1"></i>Edit Running Bar</h3>
            </div>
            <p class="text-xs text-slate-600 mb-6">Ubah teks running bar paling atas & lokasi TPS di Hero Countdown.</p>
            <form onsubmit="simpanAgendaBar(event)" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Badge Teks Label *</label>
                        <input id="abBadge" type="text" required value="${ab.badge}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-amber-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Jam Acara *</label>
                        <input id="abJamText" type="text" required value="${ab.jamText}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                    </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Teks Judul Agenda *</label>
                        <input id="abJudulText" type="text" required value="${ab.judulText}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Nama Tempat (Lokasi TPS) *</label>
                        <input id="abLokasiText" type="text" required value="${ab.lokasiText}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-emerald-800">
                    </div>
                </div>
                <button type="submit" class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs shadow">
                    Simpan Perubahan Top Bar
                </button>
            </form>
        </div>

        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-2">
                <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase">BAGIAN 2</span>
                <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-address-book text-emerald-700 mr-1"></i>Edit Kontak & Sekretariat</h3>
            </div>
            <form onsubmit="simpanKontakProfil(event)" class="space-y-4 mt-4">
                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">No. WhatsApp Panitia *</label>
                        <input id="eWaPanitia" type="text" required value="${p.wa}" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Email Resmi Panitia</label>
                        <input id="eEmailPanitia" type="email" value="${p.email}" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Jam Layanan</label>
                    <input id="eJamLayanan" type="text" value="${p.jamLayanan}" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Alamat Lengkap Sekretariat</label>
                    <textarea id="eAlamatSekretariat" rows="2" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs resize-none">${p.alamatSekretariat}</textarea>
                </div>
                <button type="submit" class="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow">
                    Simpan Kontak & Sekretariat
                </button>
            </form>
        </div>

        <div class="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-700 shadow-md">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-amber-300">SECURITY & DATA SAFETY</span>
                    <h3 class="text-xl font-extrabold mt-1">Backup & Restore File JSON</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <button onclick="downloadBackupJSON()" class="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs shadow flex items-center gap-2">
                        <i class="fa-solid fa-download"></i> Download Backup
                    </button>
                    <label class="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs cursor-pointer border border-white/20 flex items-center gap-2">
                        <i class="fa-solid fa-upload"></i> Restore JSON
                        <input type="file" accept=".json" onchange="restoreBackupJSON(event)" class="hidden">
                    </label>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-2">
                <span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-black rounded-full uppercase">DOKUMEN PDF</span>
                <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-file-pdf text-red-600 mr-1"></i>Kelola 2 Dokumen PDF</h3>
            </div>
            <form onsubmit="simpanTatibPdf(event)" class="space-y-6 mt-4">
                <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div class="font-extrabold text-xs text-emerald-800 uppercase tracking-wider">DOKUMEN 1 (TATA TERTIB)</div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Judul Dokumen 1 *</label>
                        <input id="inTatibJudul1" type="text" required value="${DB.tatibJudul1 || 'Dokumen Tata Tertib'}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">URL File PDF 1 *</label>
                        <input id="inTatibPdfUrl1" type="url" required value="${DB.tatibPdf1 || ''}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                    </div>
                    <div class="pt-2">
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Atau Upload PDF 1:</label>
                        <input type="file" id="inTatibPdfFile1" accept="application/pdf" onchange="handleUploadTatibPdf(event, 1)" class="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">
                    </div>
                </div>
                <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div class="font-extrabold text-xs text-emerald-800 uppercase tracking-wider">DOKUMEN 2 (BERITA ACARA)</div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Judul Dokumen 2 *</label>
                        <input id="inTatibJudul2" type="text" required value="${DB.tatibJudul2 || 'Dokumen Berita Acara'}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">URL File PDF 2 *</label>
                        <input id="inTatibPdfUrl2" type="url" required value="${DB.tatibPdf2 || ''}" class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                    </div>
                    <div class="pt-2">
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Atau Upload PDF 2:</label>
                        <input type="file" id="inTatibPdfFile2" accept="application/pdf" onchange="handleUploadTatibPdf(event, 2)" class="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">
                    </div>
                </div>
                <button type="submit" class="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow">
                    Simpan Kedua Dokumen PDF
                </button>
            </form>
        </div>

        <!-- KELOLA TIMELINE DENGAN DRAG & DROP -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-timeline text-emerald-700 mr-2"></i>Kelola Timeline</h3>
                    <p class="text-[11px] text-slate-500 mt-1">💡 Tips: Tahan dan geser kotak di bawah untuk mengubah urutan.</p>
                </div>
                <button onclick="formTimeline()" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow hover:bg-emerald-800 transition"><i class="fa-solid fa-plus mr-1"></i> Tambah Tahapan</button>
            </div>
            <div class="space-y-3" id="sortableTimeline">
                ${DB.timeline.map((t) => `
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-move hover:bg-white transition-colors" data-id="${t.id}">
                        <div class="flex items-start sm:items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center shrink-0 shadow-xs"><i class="fa-solid fa-grip-vertical text-slate-400 mr-2"></i> ${t.icon || '📝'}</div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-slate-900 text-sm">${t.judul}</span>
                                    <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${t.status === 'selesai' ? 'bg-slate-200 text-slate-700' : (t.status === 'berjalan' ? 'bg-amber-400 text-emerald-950 font-extrabold animate-pulse' : 'bg-slate-100 text-slate-500')}">
                                        ${t.status === 'selesai' ? 'Selesai' : (t.status === 'berjalan' ? 'Berlangsung' : 'Akan Datang')}
                                    </span>
                                </div>
                                <div class="text-xs text-emerald-700 font-medium mt-0.5"><i class="fa-regular fa-calendar mr-1"></i>${t.tanggal}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 shrink-0 self-end sm:self-center">
                            <button onclick="formTimeline(${t.id})" class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs hover:bg-emerald-200 transition"><i class="fa-solid fa-pen mr-1"></i> Edit</button>
                            <button onclick="confirmHapusTimeline(${t.id})" class="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200 transition"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-users text-emerald-700 mr-2"></i>Kelola Kandidat</h3>
                </div>
                <button onclick="formKandidat()" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow hover:bg-emerald-800 transition"><i class="fa-solid fa-plus mr-1"></i> Tambah Kandidat</button>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${DB.kandidat.map(k => `
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold text-sm flex items-center justify-center shrink-0">0${k.no}</div>
                            <div>
                                <div class="font-bold text-xs text-slate-900">${k.nama}</div>
                                <div class="text-[10px] text-slate-500">${k.alamat}</div>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="formKandidat(${k.id})" class="p-2 text-xs text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200"><i class="fa-solid fa-pen"></i> Edit</button>
                            <button onclick="confirmHapusKandidat(${k.id})" class="p-2 text-xs text-red-600 bg-red-100 rounded-lg hover:bg-red-200"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-extrabold text-slate-900 text-lg"><i class="fa-solid fa-bullhorn text-emerald-700 mr-2"></i>Kelola Pengumuman</h3>
                </div>
                <button onclick="formPengumuman()" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow hover:bg-emerald-800 transition"><i class="fa-solid fa-plus mr-1"></i> Tambah Pengumuman</button>
            </div>
            <div class="space-y-3">
                ${DB.pengumuman.map(a => `
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${a.kategori === 'Penting' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}">${a.kategori}</span>
                                <span class="text-xs font-bold text-slate-900">${a.judul}</span>
                            </div>
                            <div class="text-[11px] text-slate-500"><i class="fa-regular fa-calendar mr-1"></i>${fmtTanggal(a.tanggal)}</div>
                        </div>
                        <div class="flex gap-2 shrink-0 self-end sm:self-center">
                            <button onclick="formPengumuman(${a.id})" class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs hover:bg-emerald-200 transition"><i class="fa-solid fa-pen mr-1"></i> Edit</button>
                            <button onclick="confirmHapusPengumuman(${a.id})" class="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-bold text-xs hover:bg-red-200 transition"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="bg-red-50 p-6 rounded-3xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <div class="font-bold text-red-900 text-sm">Reset Data Ke Default</div>
                <div class="text-xs text-red-700 mt-0.5">Kembalikan seluruh data ke kondisi data awal terbaru.</div>
            </div>
            <button onclick="confirmResetData()" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0">
                Reset Data LocalStorage
            </button>
        </div>
    </section>
    `;
}