// js/views/hitung.js

// State lokal
let isHitungUnlocked = false;
let suaraTidakSahState = 0;

function saveSuaraTidakSah(val) {
    supabaseClient.from('site_config').upsert({ 
        id: 1, 
        data: { 
            ...DB.siteConfigRaw, 
            suaraTidakSah: val 
        } 
    });
}

// Fungsi Unlock via Password
// Fungsi Unlock via Password (Aman dengan Hash SHA-256)
// Ganti fungsi unlockHitung lama dengan ini
async function loginPanitia(e) {
    e.preventDefault();
    const email = document.getElementById("emailPanitia").value;
    const password = document.getElementById("passPanitia").value;

    // Login ke Supabase Auth
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showToast("❌", "Login Gagal: " + error.message);
        return;
    }

    // Jika berhasil
    isHitungUnlocked = true;
    showToast("🔓", "Selamat datang, Panitia!");
    render();
}

// Fungsi Logout
async function logoutPanitia() {
    await supabaseClient.auth.signOut();
    isHitungUnlocked = false;
    showToast("🔒", "Anda telah keluar.");
    render();
}



function viewHitungSuara() {
    // Ambil angka suara tidak sah dari Supabase (jika ada), jika tidak ada pakai 0
        // --- TAMPILAN JIKA TERKUNCI ---
    if (!isHitungUnlocked) {
        return `
        <section class="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200 text-center">
                <div class="w-16 h-16 mx-auto gradient-primary text-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <h2 class="text-2xl font-extrabold text-slate-900 mb-2">Login Panitia</h2>
                <p class="text-xs text-slate-500 mb-6">Silakan masuk dengan akun panitia yang sudah terdaftar.</p>
                
                <form onsubmit="loginPanitia(event)" class="space-y-4 text-left">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Email Panitia</label>
                        <input id="emailPanitia" type="email" required placeholder="panitia@gmg012.com" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
                        <input id="passPanitia" type="password" required placeholder="••••••" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600">
                    </div>
                    <button type="submit" class="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-sm shadow transition-all hover:-translate-y-0.5">
                        Masuk ke Penghitungan
                    </button>
                </form>
            </div>
        </section>
        `;
    }

    // --- TAMPILAN JIKA SUDAH MASUK PASSWORD (HITUNG SUARA) ---
    const totalKandidat = DB.kandidat.reduce((s,c) => s + (c.suara || 0), 0);
    const total = totalKandidat + (suaraTidakSahState || 0);
    const dptTarget = DB.profil.dpt || 100; 
    const pct = dptTarget ? Math.min(100, (total / dptTarget) * 100) : 0;
    const isFull = total >= dptTarget;
    
    const sorted = [...DB.kandidat].sort((a,b) => (b.suara || 0) - (a.suara || 0));
    const top = sorted[0];
    const tie = sorted.length > 1 && (sorted[1].suara || 0) === (top.suara || 0) && (top.suara || 0) > 0;

    return `
    <section class="relative overflow-hidden gradient-primary text-white pb-8 pt-6 md:pt-10">
        <div class="absolute inset-0 pattern-dots opacity-20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-end mb-4">
                <button onclick="logoutPanitia()" class="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white text-xs font-bold shadow transition flex items-center gap-2">
    <i class="fa-solid fa-right-from-bracket"></i> Logout Panitia
</button>
            </div>
            <div class="grid lg:grid-cols-12 gap-6 items-center">
                <div class="lg:col-span-5">
                    <h1 class="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        Input <span class="italic text-amber-300" style="font-family:'Instrument Serif',serif;">Suara</span>
                    </h1>
                    <div class="mt-5 grid grid-cols-3 gap-2 max-w-sm">
                        <div class="glass rounded-xl p-2.5 text-center">
                            <div class="text-xl font-black tabular-nums text-amber-300">${total}</div>
                            <div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Masuk</div>
                        </div>
                        <div class="glass rounded-xl p-2.5 text-center">
                            <div class="text-xl font-black tabular-nums text-white">${Math.max(0, dptTarget - total)}</div>
                            <div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Sisa</div>
                        </div>
                        <div class="glass rounded-xl p-2.5 text-center">
                            <div class="text-xl font-black tabular-nums text-white">${pct.toFixed(0)}%</div>
                            <div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Partisipasi</div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-7">
                    ${isFull ? `
                        <div class="rounded-2xl p-5 text-center relative overflow-visible bg-gradient-to-br from-emerald-500 to-emerald-700 border-2 border-white/40 shadow-xl">
                            <div class="relative text-white">
                                <div class="text-[10px] uppercase tracking-widest font-black text-amber-300">🎉 Pemungutan Suara Selesai 🎉</div>
                                <div class="text-2xl md:text-3xl font-black mt-1 drop-shadow-md">Partisipasi 100%</div>
                            </div>
                        </div>
                    ` : total>0 ? `
                        <div class="rounded-2xl p-4 md:p-5 text-center relative overflow-visible bg-gradient-to-br from-amber-300 to-amber-400 border-2 border-amber-500 shadow-lg">
                            <div class="relative">
                                <div class="text-[10px] uppercase tracking-widest font-black text-emerald-950">${tie?'⚠️ Hasil Sementara Seri':'🏆 Perolehan Tertinggi Sementara'}</div>
                                <div class="text-2xl md:text-3xl font-black mt-1 text-emerald-950">${tie?sorted.filter(c=>(c.suara||0)===top.suara).map(c=>c.nama).join(' & '):top.nama}</div>
                                <div class="text-xs font-bold mt-1 text-emerald-900">${top.suara || 0} suara</div>
                            </div>
                        </div>
                    ` : `
                        <div class="rounded-2xl p-6 text-center border-2 border-dashed border-white/20 glass">
                            <div class="text-sm font-bold text-white">Belum ada suara masuk</div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        <div class="grid md:grid-cols-3 gap-4 items-start">
            ${DB.kandidat.map(c => {
                const p = total ? ((c.suara||0)/total)*100 : 0;
                return `
                <div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl font-black shadow-lg overflow-hidden shrink-0">
                            ${c.emoji || c.no}
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="font-bold text-sm truncate">${c.nama}</div>
                            <div class="text-[11px] text-slate-500">No. Urut ${c.no}</div>
                        </div>
                    </div>
                    <div class="text-center py-3">
                        <div class="text-4xl font-black tabular-nums text-emerald-700">${c.suara || 0}</div>
                        <div class="text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">Suara · ${p.toFixed(1)}%</div>
                    </div>
                    <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                        <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width:${p}%"></div>
                    </div>
                    <div class="flex gap-2 mb-3">
                        <button onclick="addVote(${c.id})" ${isFull?'disabled':''} class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black text-sm shadow-lg transition-all">+1</button>
                        <button onclick="subVote(${c.id})" ${(c.suara||0)===0?'disabled':''} class="px-3.5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed transition">−1</button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>

        <!-- Suara Tidak Sah -->
        <div class="mt-6">
            <h2 class="text-base font-black mb-3 text-slate-800"><i class="fa-solid fa-ban text-red-500 mr-2"></i>Surat Rusak / Tidak Sah</h2>
            <div class="bg-red-50 rounded-3xl p-4 shadow-sm border border-red-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-4 w-full md:w-auto">
                    <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl shadow-inner shrink-0">
                        <i class="fa-solid fa-file-circle-xmark"></i>
                    </div>
                    <div>
                        <div class="font-bold text-sm text-red-900">Suara Tidak Sah</div>
                        <div class="text-[11px] text-red-700/80">Hitung surat rusak, kosong, atau coblos ganda.</div>
                    </div>
                </div>
                <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div class="text-center pr-4 border-r border-red-200">
                        <div class="text-3xl font-black text-red-700">${suaraTidakSahState || 0}</div>
                        <div class="text-[9px] uppercase tracking-wider text-red-500 font-bold">Suara</div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="addVote('tidak-sah')" ${isFull?'disabled':''} class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-black text-sm shadow-lg transition-all">+1</button>
                        <button onclick="subVote('tidak-sah')" ${(!suaraTidakSahState)?'disabled':''} class="px-3.5 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-30 transition">−1</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

async function addVote(id) {
    const isTidakSah = id === 'tidak-sah';
    const c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(x => x.id === id);
    if (!c) return;

    const totalKandidat = DB.kandidat.reduce((s,c) => s + (c.suara || 0), 0);
    const total = totalKandidat + (suaraTidakSahState || 0);
    const dptTarget = DB.profil.dpt || 100;
    if (total >= dptTarget) return showToast('⚠️', 'Target DPT sudah tercapai!');

    if (isTidakSah) {
        suaraTidakSahState = (suaraTidakSahState || 0) + 1;
        saveSuaraTidakSah(suaraTidakSahState); // Simpan ke Supabase
    } else {
        c.suara = (c.suara || 0) + 1;
        const { error } = await supabaseClient.from('kandidat').update({ suara: c.suara }).eq('id', id);
        if (error) {
            c.suara--; 
            showToast('❌', 'Gagal menyimpan: ' + error.message);
            return;
        }
    }
    render();
    showToast('✅', `+1 suara ${c.nama}`);
}

function subVote(id) {
    const isTidakSah = id === 'tidak-sah';
    const c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(x => x.id === id);
    if (!c) return;

    if (isTidakSah && (!suaraTidakSahState || suaraTidakSahState <= 0)) return;
    if (!isTidakSah && (!c.suara || c.suara <= 0)) return;

    openModal(`
        <div class="p-6 text-center">
            <div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Kurangi 1 Suara?</h3>
            <p class="text-xs text-slate-500 mb-6">Yakin ingin mengurangi 1 suara dari ${c.nama}?</p>
            <div class="flex justify-center gap-3">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>
                <!-- PASTIKAN NAMANYA executeSubVote, BUKAN exeecuteSubVote -->
                <button onclick="executeSubVote('${id}')" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Ya, Kurangi</button>
            </div>
        </div>
    `);
}

async function executeSubVote(id) {
    const isTidakSah = id === 'tidak-sah';
    const c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(x => x.id === id);
    
    // 1. Kurangi jumlah di memori (UI)
    if (isTidakSah) {
        suaraTidakSahState--;
        saveSuaraTidakSah(suaraTidakSahState);
    } else {
        c.suara--;
    }

    // 2. Simpan perubahan ke Supabase Database
    if (!isTidakSah) {
        const { error } = await supabaseClient
            .from('kandidat')
            .update({ suara: c.suara })
            .eq('id', id);

        if (error) {
            // Jika gagal, kembalikan angkanya
            c.suara++; 
            showToast('❌', 'Gagal update: ' + error.message);
            return;
        }
    }

    // 3. Tutup modal dan render ulang tampilan
    closeModal();
    render();
    showToast('↩️', `Koreksi -1 suara ${c.nama}`);
}