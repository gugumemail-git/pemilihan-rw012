async function doLoginAdmin(e) {
    e.preventDefault();
    const u = document.getElementById("inUser").value.trim();
    const p = document.getElementById("inPassA").value.trim();

    // --- MODE TES: LOGIN TEKS BIASA (BYPASS HASH) ---
    const validUser = "admin";
    const validPass = "admin123"; 

    if (u !== validUser || p !== validPass) {
        showToast("❌", "Username atau Password salah!");
        return;
    }

    setSession({ role: "admin", nama: "Administrator PILWE 012" });
    showToast("✅", "Login Admin berhasil!");
    go("admin");
}

function doLogout() {
    clearSession();
    showToast("👋", "Anda telah keluar dari Admin Dashboard.");
    go("beranda");
}

async function simpanAgendaBar(e) {
    e.preventDefault();
    if (!DB.agendaBar) DB.agendaBar = {};
    DB.agendaBar.badge = document.getElementById("abBadge").value.trim();
    DB.agendaBar.judulText = document.getElementById("abJudulText").value.trim();
    DB.agendaBar.jamText = document.getElementById("abJamText").value.trim();
    DB.agendaBar.lokasiText = document.getElementById("abLokasiText").value.trim();

    // Simpan ke Supabase (asumsi tabel site_config dengan id=1)
    const { error } = await supabaseClient.from('site_config').update({ 
        data: { ...DB } // Menyimpan seluruh object DB ke kolom data JSON
    }).eq('id', 1);

    if (error) {
        // Jika gagal update, mungkin baris belum ada, coba insert
        await supabaseClient.from('site_config').insert([{ id: 1, data: DB }]);
    }

    saveDB();
    showToast("✅", "Running Bar berhasil diperbarui!");
    render();
}

async function simpanKontakProfil(e) {
    e.preventDefault();
    const p = DB.profil;
    p.wa = document.getElementById("eWaPanitia").value.trim();
    p.jamLayanan = document.getElementById("eJamLayanan").value.trim();
    p.email = document.getElementById("eEmailPanitia").value.trim();
    p.alamatSekretariat = document.getElementById("eAlamatSekretariat").value.trim();

    const { error } = await supabaseClient.from('site_config').update({ data: DB }).eq('id', 1);
    if (error) await supabaseClient.from('site_config').insert([{ id: 1, data: DB }]);

    saveDB();
    showToast("✅", "Informasi Kontak berhasil diperbarui!");
    render();
}

async function simpanTatibPdf(e) {
    e.preventDefault();
    DB.tatibJudul1 = document.getElementById("inTatibJudul1").value.trim();
    DB.tatibPdf1 = document.getElementById("inTatibPdfUrl1").value.trim();
    DB.tatibJudul2 = document.getElementById("inTatibJudul2").value.trim();
    DB.tatibPdf2 = document.getElementById("inTatibPdfUrl2").value.trim();

    const { error } = await supabaseClient.from('site_config').update({ data: DB }).eq('id', 1);
    if (error) await supabaseClient.from('site_config').insert([{ id: 1, data: DB }]);

    saveDB();
    showToast("✅", "Dokumen PDF berhasil disimpan!");
    render();
}

function handleUploadTatibPdf(e, docNum) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
        showToast("❌", "File harus berformat .pdf!");
        return;
    }
    const reader = new FileReader();
    reader.onload = async function(evt) {
        if (docNum === 1) DB.tatibPdf1 = evt.target.result;
        else DB.tatibPdf2 = evt.target.result;
        
        await supabaseClient.from('site_config').update({ data: DB }).eq('id', 1);
        saveDB();
        showToast("✅", "File PDF berhasil diunggah!");
        render();
    };
    reader.readAsDataURL(file);
}
// ================= KELOLA TIMELINE =================
function formTimeline(id) {
    const isEdit = !!id;
    const t = isEdit ? DB.timeline.find(x => x.id === id) : {
        tanggal: "", judul: "", desc: "", status: "akan", icon: "📝"
    };

    const html = `
        <div class="gradient-primary text-white p-6 relative">
            <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-xl font-bold">${isEdit ? 'Edit Tahapan Timeline' : 'Tambah Tahapan Timeline Baru'}</h3>
        </div>
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div class="grid sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">Tanggal / Rentang Waktu *</label>
                    <input id="tlTanggal" type="text" value="${t.tanggal}" placeholder="cth: 15–25 Des 2026" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">Status Tahapan *</label>
                    <select id="tlStatus" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                        <option value="selesai" ${t.status === 'selesai' ? 'selected' : ''}>Selesai</option>
                        <option value="berjalan" ${t.status === 'berjalan' ? 'selected' : ''}>Sedang Berlangsung</option>
                        <option value="akan" ${t.status === 'akan' ? 'selected' : ''}>Akan Datang</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Pilih Ikon Emoji Timeline *</label>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-2" id="iconPickerBox">
                    ${TIMELINE_ICONS.map(item => `
                        <button type="button" onclick="selectTimelineIcon('${item.icon}')" class="icon-option p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${t.icon === item.icon ? 'bg-emerald-100 border-emerald-600 ring-2 ring-emerald-500 font-bold' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}">
                            <span class="text-2xl">${item.icon}</span>
                            <span class="text-[9px] text-slate-600 leading-none truncate w-full">${item.label}</span>
                        </button>
                    `).join('')}
                </div>
                <input id="tlIcon" type="hidden" value="${t.icon || '📝'}">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Judul Tahapan *</label>
                <input id="tlJudul" type="text" value="${t.judul}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Deskripsi Tahapan *</label>
                <textarea id="tlDesc" rows="3" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none">${t.desc}</textarea>
            </div>
        </div>
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
            <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
            <button onclick="simpanTimeline(${isEdit ? id : 'null'})" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs">Simpan</button>
        </div>
    `;
    openModal(html);
}

function selectTimelineIcon(iconVal) {
    document.getElementById("tlIcon").value = iconVal;
    document.querySelectorAll("#iconPickerBox .icon-option").forEach(btn => {
        if (btn.querySelector("span").textContent === iconVal) {
            btn.className = "icon-option p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 bg-emerald-100 border-emerald-600 ring-2 ring-emerald-500 font-bold";
        } else {
            btn.className = "icon-option p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 bg-slate-50 border-slate-200 hover:bg-slate-100";
        }
    });
}

async function simpanTimeline(id) {
    const tanggal = document.getElementById("tlTanggal").value.trim();
    const icon = document.getElementById("tlIcon").value.trim() || "📝";
    const judul = document.getElementById("tlJudul").value.trim();
    const status = document.getElementById("tlStatus").value;
    const desc = document.getElementById("tlDesc").value.trim();

    if (!tanggal || !judul) { showToast("⚠️", "Tanggal & Judul wajib diisi!"); return; }

    const data = { tanggal, icon, judul, status, desc };
    let response;
    if (id) response = await supabaseClient.from('timeline').update(data).eq('id', id);
    else { data.id = Date.now(); response = await supabaseClient.from('timeline').insert([data]); }

    if (response.error) { showToast("❌", "Gagal: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("✅", "Timeline disimpan!"); render();
}

function confirmHapusTimeline(id) {
    openModal(`
        <div class="p-6 text-center">
            <div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-trash-can"></i></div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Hapus Tahapan?</h3>
            <div class="flex justify-center gap-3 mt-6">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
                <button onclick="hapusTimeline(${id})" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Ya, Hapus</button>
            </div>
        </div>
    `);
}

async function hapusTimeline(id) {
    const response = await supabaseClient.from('timeline').delete().eq('id', id);
    if (response.error) { showToast("❌", "Gagal hapus: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("🗑️", "Timeline dihapus."); render();
}

// ================= KELOLA KANDIDAT =================
function formKandidat(id) {
    const isEdit = !!id;
    const k = isEdit ? DB.kandidat.find(x => x.id === id) : {
        no: (DB.kandidat.length ? Math.max(...DB.kandidat.map(x => x.no)) + 1 : 1),
        nama: "", umur: 40, pekerjaan: "Wiraswasta", alamat: "Blok GMG",
        emoji: "👨‍💼", warna: "from-emerald-600 to-emerald-800", visi: "", misi: ["Meningkatkan keamanan dan kebersihan."]
    };

    openModal(`
        <div class="gradient-primary text-white p-6 relative">
            <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-xl font-bold">${isEdit ? 'Edit Kandidat' : 'Tambah Kandidat'}</h3>
        </div>
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div class="grid sm:grid-cols-2 gap-3">
                <div><label class="block text-xs font-bold mb-1">Nomor Urut *</label><input id="fNo" type="number" value="${k.no}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"></div>
                <div><label class="block text-xs font-bold mb-1">Nama Lengkap *</label><input id="fNama" type="text" value="${k.nama}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"></div>
            </div>
            <div class="grid sm:grid-cols-2 gap-3">
                <div><label class="block text-xs font-bold mb-1">Alamat Blok *</label><input id="fAlamat" type="text" value="${k.alamat}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"></div>
                <div><label class="block text-xs font-bold mb-1">Pekerjaan</label><input id="fPekerjaan" type="text" value="${k.pekerjaan}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"></div>
            </div>
            <div><label class="block text-xs font-bold mb-1">Visi</label><textarea id="fVisi" rows="3" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs">${k.visi}</textarea></div>
            <div><label class="block text-xs font-bold mb-1">Misi (Satu per baris)</label><textarea id="fMisi" rows="4" class="w-full px-3 py-2 bg-slate-50 border text-xs">${k.misi.join("\n")}</textarea></div>
        </div>
        <div class="p-4 bg-slate-50 border-t flex justify-end gap-2">
            <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
            <button onclick="simpanKandidat(${isEdit ? id : 'null'})" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs">Simpan</button>
        </div>
    `);
}

async function simpanKandidat(id) {
    const no = parseInt(document.getElementById("fNo").value);
    const nama = document.getElementById("fNama").value.trim();
    if (!no || !nama) { showToast("⚠️", "Nomor & Nama wajib diisi!"); return; }

    const data = {
        no, nama,
        alamat: document.getElementById("fAlamat").value.trim(),
        pekerjaan: document.getElementById("fPekerjaan").value.trim(),
        umur: 40, emoji: "👨‍💼", warna: "from-emerald-600 to-emerald-800",
        visi: document.getElementById("fVisi").value.trim(),
        misi: document.getElementById("fMisi").value.split("\n").filter(s => s.trim()),
        program: [{ icon: "⭐", judul: "Program Kerja Utama", desc: "Optimalisasi kebersihan & keamanan RW 012." }]
    };

    let response;
    if (id) response = await supabaseClient.from('kandidat').update(data).eq('id', id);
    else { data.id = Date.now(); response = await supabaseClient.from('kandidat').insert([data]); }

    if (response.error) { showToast("❌", "Gagal: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("✅", "Kandidat disimpan!"); render();
}

function confirmHapusKandidat(id) {
    openModal(`
        <div class="p-6 text-center">
            <div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-trash-can"></i></div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Hapus Kandidat?</h3>
            <div class="flex justify-center gap-3 mt-6">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
                <button onclick="hapusKandidat(${id})" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Ya, Hapus</button>
            </div>
        </div>
    `);
}

async function hapusKandidat(id) {
    const response = await supabaseClient.from('kandidat').delete().eq('id', id);
    if (response.error) { showToast("❌", "Gagal hapus: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("🗑️", "Kandidat dihapus."); render();
}

// ================= KELOLA PENGUMUMAN =================
function formPengumuman(id) {
    const isEdit = !!id;
    const a = isEdit ? DB.pengumuman.find(x => x.id === id) : {
        kategori: "Informasi", judul: "", isi: "", tanggal: new Date().toISOString().slice(0, 10)
    };

    openModal(`
        <div class="gradient-primary text-white p-6 relative">
            <button onclick="closeModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><i class="fa-solid fa-xmark"></i></button>
            <h3 class="text-xl font-bold">${isEdit ? 'Edit Pengumuman' : 'Tambah Pengumuman'}</h3>
        </div>
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div class="grid sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold mb-1">Kategori *</label>
                    <select id="fKatPengumuman" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-semibold">
                        <option value="Informasi" ${a.kategori === 'Informasi' ? 'selected' : ''}>Informasi</option>
                        <option value="Penting" ${a.kategori === 'Penting' ? 'selected' : ''}>Penting</option>
                    </select>
                </div>
                <div><label class="block text-xs font-bold mb-1">Tanggal *</label><input id="fTglPengumuman" type="date" value="${a.tanggal}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"></div>
            </div>
            <div><label class="block text-xs font-bold mb-1">Judul *</label><input id="fJudulPengumuman" type="text" value="${a.judul}" class="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"></div>
            <div><label class="block text-xs font-bold mb-1">Isi Pengumuman *</label><textarea id="fIsiPengumuman" rows="5" class="w-full px-3 py-2 bg-slate-50 border text-xs resize-none">${a.isi}</textarea></div>
        </div>
        <div class="p-4 bg-slate-50 border-t flex justify-end gap-2">
            <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
            <button onclick="simpanPengumuman(${isEdit ? id : 'null'})" class="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs">Simpan</button>
        </div>
    `);
}

async function simpanPengumuman(id) {
    const kat = document.getElementById("fKatPengumuman").value;
    const tgl = document.getElementById("fTglPengumuman").value || new Date().toISOString().slice(0, 10);
    const judul = document.getElementById("fJudulPengumuman").value.trim();
    const isi = document.getElementById("fIsiPengumuman").value.trim();

    if (!judul || !isi) { showToast("⚠️", "Judul & Isi wajib diisi!"); return; }

    const data = { kategori: kat, tanggal: tgl, judul, isi };
    let response;
    if (id) response = await supabaseClient.from('pengumuman').update(data).eq('id', id);
    else { data.id = Date.now(); response = await supabaseClient.from('pengumuman').insert([data]); }

    if (response.error) { showToast("❌", "Gagal: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("✅", "Pengumuman disimpan!"); render();
}

function confirmHapusPengumuman(id) {
    openModal(`
        <div class="p-6 text-center">
            <div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-trash-can"></i></div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Hapus Pengumuman?</h3>
            <div class="flex justify-center gap-3 mt-6">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
                <button onclick="hapusPengumuman(${id})" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Ya, Hapus</button>
            </div>
        </div>
    `);
}

async function hapusPengumuman(id) {
    const response = await supabaseClient.from('pengumuman').delete().eq('id', id);
    if (response.error) { showToast("❌", "Gagal hapus: " + response.error.message); return; }
    DB = await loadDB(); closeModal(); showToast("🗑️", "Pengumuman dihapus."); render();
}

// ================= BACKUP & RESET =================
function downloadBackupJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DB, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `Backup-PILWE-${new Date().getTime()}.json`);
    document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();
    showToast("📥", "Backup JSON berhasil diunduh!");
}

function restoreBackupJSON(event) {
    const fileReader = new FileReader();
    fileReader.onload = async function (e) {
        try {
            const parsedData = JSON.parse(e.target.result);
            if (parsedData.profil && parsedData.kandidat) {
                DB = parsedData;
                await supabaseClient.from('site_config').update({ data: DB }).eq('id', 1);
                saveDB(); showToast("✅", "Data dipulihkan!"); render();
            } else {
                showToast("❌", "Format JSON tidak valid.");
            }
        } catch (err) { showToast("❌", "Gagal membaca JSON."); }
    };
    if (event.target.files[0]) fileReader.readAsText(event.target.files[0]);
}

function confirmResetData() {
    openModal(`
        <div class="p-6 text-center">
            <div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Reset Semua Data?</h3>
            <p class="text-xs text-slate-500 mb-6">Data lokal akan dikembalikan ke default, namun data di Supabase mungkin perlu dihapus manual.</p>
            <div class="flex justify-center gap-3">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
                <button onclick="doResetData()" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Reset</button>
            </div>
        </div>
    `);
}

function doResetData() {
    localStorage.removeItem("pilwe012_v8_db");
    localStorage.removeItem("pilwe012_session");
    window.location.reload(); 
}