// ==========================================
// BAGIAN 1: STATE, LOGIN, & TAB INPUT SUARA
// ==========================================

var isHitungUnlocked = false;
var suaraTidakSahState = 0;
var activeHitungTab = "input"; 

supabaseClient.auth.getSession().then(function(res) {
    if (res.data && res.data.session) isHitungUnlocked = true;
});

function switchHitungTab(tab) {
    activeHitungTab = tab;
    render();
}

function viewHitungSuara() {
    if (!isHitungUnlocked) {
        return '<section class="min-h-[70vh] flex items-center justify-center px-4 py-12">' +
            '<div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200 text-center">' +
                '<div class="w-16 h-16 mx-auto gradient-primary text-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">' +
                    '<i class="fa-solid fa-user-shield"></i>' +
                '</div>' +
                '<h2 class="text-2xl font-extrabold text-slate-900 mb-2">Login Panitia</h2>' +
                '<p class="text-xs text-slate-500 mb-6">Silakan masuk dengan akun panitia yang terdaftar.</p>' +
                '<form onsubmit="loginPanitia(event)" class="space-y-4 text-left">' +
                    '<div>' +
                        '<label class="block text-xs font-bold uppercase text-slate-600 mb-1">Email Panitia</label>' +
                        '<input id="emailPanitia" type="email" required placeholder="panitia@gmg012.com" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600">' +
                    '</div>' +
                    '<div>' +
                        '<label class="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>' +
                        '<input id="passPanitia" type="password" required placeholder="••••••" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600">' +
                    '</div>' +
                    '<button type="submit" class="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-sm shadow transition-all hover:-translate-y-0.5">' +
                        'Masuk ke Penghitungan' +
                    '</button>' +
                '</form>' +
            '</div>' +
        '</section>';
    }

    var totalKandidat = DB.kandidat.reduce(function(s,c) { return s + (c.suara || 0); }, 0);
    var total = totalKandidat + (suaraTidakSahState || 0);
    var dptTarget = DB.profil.dpt || 100; 
    var pct = dptTarget ? Math.min(100, (total / dptTarget) * 100) : 0;
    var isFull = total >= dptTarget;
    
    var sorted = DB.kandidat.slice().sort(function(a,b) { return (b.suara || 0) - (a.suara || 0); });
    var top = sorted[0] || { nama: '-', suara: 0 };
    var tie = sorted.length > 1 && (sorted[1].suara || 0) === (top.suara || 0) && (top.suara || 0) > 0;

    var html = '<section class="relative overflow-hidden gradient-primary text-white pb-8 pt-6 md:pt-10">' +
        '<div class="absolute inset-0 pattern-dots opacity-20"></div>' +
        '<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
            '<div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">' +
                '<div class="text-xs font-bold text-amber-300"><i class="fa-solid fa-shield-halved mr-1"></i> Mode Panitia</div>' +
                '<div class="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">' +
                    '<button onclick="switchHitungTab(\'input\')" class="px-4 py-2 rounded-lg text-xs font-bold transition ' + (activeHitungTab === 'input' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-white hover:bg-white/10') + '">Input Suara</button>' +
                    '<button onclick="switchHitungTab(\'kandidat\')" class="px-4 py-2 rounded-lg text-xs font-bold transition ' + (activeHitungTab === 'kandidat' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-white hover:bg-white/10') + '">Kandidat</button>' +
                    '<button onclick="switchHitungTab(\'rekap\')" class="px-4 py-2 rounded-lg text-xs font-bold transition ' + (activeHitungTab === 'rekap' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-white hover:bg-white/10') + '">Rekap</button>' +
                    '<div class="w-px h-6 bg-white/20 mx-1"></div>' +
                    '<button onclick="logoutPanitia()" class="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-bold transition flex items-center gap-1.5"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>' +
                '</div>' +
            '</div>' +
            '<div class="grid lg:grid-cols-12 gap-6 items-center">' +
                '<div class="lg:col-span-5">' +
                    '<h1 class="text-3xl md:text-4xl font-black leading-tight tracking-tight">Hitung <span class="italic text-amber-300">Suara</span></h1>' +
                    '<div class="mt-5 grid grid-cols-3 gap-2 max-w-sm">' +
                        '<div class="glass rounded-xl p-2.5 text-center">' +
                            '<div class="text-xl font-black tabular-nums text-amber-300">' + total + '</div>' +
                            '<div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Masuk</div>' +
                        '</div>' +
                        '<div class="glass rounded-xl p-2.5 text-center">' +
                            '<div class="text-xl font-black tabular-nums text-white">' + Math.max(0, dptTarget - total) + '</div>' +
                            '<div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Sisa</div>' +
                        '</div>' +
                        '<div class="glass rounded-xl p-2.5 text-center">' +
                            '<div class="text-xl font-black tabular-nums text-white">' + pct.toFixed(0) + '%</div>' +
                            '<div class="text-[9px] uppercase tracking-wider text-emerald-200/70 font-bold mt-0.5">Partisipasi</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="lg:col-span-7">';

    if (isFull) {
        html += '<div id="winnerBanner" class="rounded-2xl p-5 text-center relative overflow-visible bg-gradient-to-br from-emerald-500 to-emerald-700 border-2 border-white/40 shadow-xl animate-pop">' +
                    '<div class="relative text-white">' +
                        '<div class="text-[10px] uppercase tracking-widest font-black text-amber-300">Pemungutan Suara Selesai</div>' +
                        '<div class="text-2xl md:text-3xl font-black mt-1 drop-shadow-md">Partisipasi 100%</div>' +
                    '</div>' +
                '</div>';
    } else if (total > 0) {
        html += '<div id="winnerBanner" class="rounded-2xl p-4 md:p-5 text-center relative overflow-visible bg-gradient-to-br from-amber-300 to-amber-400 border-2 border-amber-500 shadow-lg animate-pop">' +
                    '<div class="relative">' +
                        '<div class="text-[10px] uppercase tracking-widest font-black text-emerald-950">' + (tie ? 'Hasil Sementara Seri' : 'Perolehan Tertinggi Sementara') + '</div>' +
                        '<div class="text-2xl md:text-3xl font-black mt-1 text-emerald-950">' + (tie ? sorted.filter(function(c){ return (c.suara||0)===top.suara; }).map(function(c){ return c.nama; }).join(' & ') : top.nama) + '</div>' +
                        '<div class="text-xs font-bold mt-1 text-emerald-900">' + (top.suara || 0) + ' suara</div>' +
                    '</div>' +
                '</div>';
    } else {
        html += '<div class="rounded-2xl p-6 text-center border-2 border-dashed border-white/20 glass">' +
                    '<div class="text-sm font-bold text-white">Belum ada suara masuk</div>' +
                '</div>';
    }

    html += '</div></div></div></section>' +
    '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-16">';

    // TAB INPUT
    html += '<div class="' + (activeHitungTab === 'input' ? 'block' : 'hidden') + '">' +
        '<div class="grid md:grid-cols-3 gap-4 items-start">';
    
    DB.kandidat.forEach(function(c) {
        var p = total ? ((c.suara||0)/total)*100 : 0;
        var fotoHtml = (c.emoji && (c.emoji.indexOf('http') === 0 || c.emoji.indexOf('data:') === 0)) ? '<img src="' + c.emoji + '" class="w-full h-full object-cover">' : (c.emoji || c.no);
        
        html += '<div class="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col">' +
            '<div class="flex items-center gap-3 mb-2">' +
                '<div class="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl font-black shadow-lg overflow-hidden shrink-0">' + fotoHtml + '</div>' +
                '<div class="min-w-0 flex-1">' +
                    '<div class="font-bold text-sm truncate">' + c.nama + '</div>' +
                    '<div class="text-[11px] text-slate-500">No. Urut ' + c.no + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="text-center py-3">' +
                '<div class="text-4xl font-black tabular-nums text-emerald-700">' + (c.suara || 0) + '</div>' +
                '<div class="text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">Suara · ' + p.toFixed(1) + '%</div>' +
            '</div>' +
            '<div class="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">' +
                '<div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width:' + p + '%"></div>' +
            '</div>' +
            '<div class="flex gap-2 mb-3">' +
                '<button onclick="addVote(' + c.id + ')" ' + (isFull?'disabled':'') + ' class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-black text-sm shadow-lg transition-all">+1</button>' +
                '<button onclick="subVote(' + c.id + ')" ' + ((c.suara||0)===0?'disabled':'') + ' class="px-3.5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-30 transition">−1</button>' +
            '</div>' +
        '</div>';
    });

    html += '</div>' +
        '<div class="mt-6">' +
            '<h2 class="text-base font-black mb-3 text-slate-800"><i class="fa-solid fa-ban text-red-500 mr-2"></i>Surat Rusak / Tidak Sah</h2>' +
            '<div class="bg-red-50 rounded-3xl p-4 shadow-sm border border-red-200 flex flex-col md:flex-row items-center justify-between gap-4">' +
                '<div class="flex items-center gap-4 w-full md:w-auto">' +
                    '<div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl shadow-inner shrink-0"><i class="fa-solid fa-file-circle-xmark"></i></div>' +
                    '<div>' +
                        '<div class="font-bold text-sm text-red-900">Suara Tidak Sah</div>' +
                        '<div class="text-[11px] text-red-700/80">Hitung surat rusak, kosong, atau coblos ganda.</div>' +
                    '</div>' +
                '</div>' +
                '<div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">' +
                    '<div class="text-center pr-4 border-r border-red-200">' +
                        '<div class="text-3xl font-black text-red-700">' + (suaraTidakSahState || 0) + '</div>' +
                        '<div class="text-[9px] uppercase tracking-wider text-red-500 font-bold">Suara</div>' +
                    '</div>' +
                    '<div class="flex gap-2">' +
                        '<button onclick="addVote(\'tidak-sah\')" ' + (isFull?'disabled':'') + ' class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-black text-sm shadow-lg transition-all">+1</button>' +
                        '<button onclick="subVote(\'tidak-sah\')" ' + (!suaraTidakSahState?'disabled':'') + ' class="px-3.5 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-bold text-sm hover:bg-red-100 disabled:opacity-30 transition">−1</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>'; // End Tab Input
        // TAB KANDIDAT
    html += '<div class="' + (activeHitungTab === 'kandidat' ? 'block' : 'hidden') + '">' +
        
        // FORM PENGATURAN PEMILIHAN
        '<div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">' +
            '<h3 class="font-black text-sm mb-4"><i class="fa-solid fa-sliders text-emerald-600 mr-2"></i>Pengaturan Pemilihan</h3>' +
            '<div class="grid sm:grid-cols-2 gap-4 mb-4">' +
                '<div>' +
                    '<label class="text-xs font-bold text-slate-600 mb-1.5 block">Nama Pemilihan</label>' +
                    '<input id="setTitle" type="text" value="' + (DB.title || 'Pemilihan Ketua RW 012') + '" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">' +
                '</div>' +
                '<div>' +
                    '<label class="text-xs font-bold text-slate-600 mb-1.5 block">Target DPT</label>' +
                    '<input id="setDpt" type="number" min="0" value="' + (DB.profil.dpt || 100) + '" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">' +
                '</div>' +
            '</div>' +
            '<button onclick="saveSettings()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition">' +
                '<i class="fa-solid fa-floppy-disk mr-1.5"></i>Simpan Pengaturan' +
            '</button>' +
        '</div>' +

        // FORM TAMBAH KANDIDAT
        '<div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">' +
            '<h3 class="font-black text-sm mb-4"><i class="fa-solid fa-user-plus text-emerald-600 mr-2"></i>Tambah Kandidat</h3>' +
            '<div class="grid sm:grid-cols-2 gap-4 mb-4">' +
                '<div>' +
                    '<label class="text-xs font-bold text-slate-600 mb-1.5 block">Nomor Urut</label>' +
                    '<input id="newNo" type="number" min="1" placeholder="Contoh: 4" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">' +
                '</div>' +
                '<div>' +
                    '<label class="text-xs font-bold text-slate-600 mb-1.5 block">Nama Lengkap</label>' +
                    '<input id="newNama" type="text" placeholder="Nama kandidat" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">' +
                '</div>' +
            '</div>' +
            '<div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4">' +
                '<label class="text-xs font-bold text-slate-600 mb-2 block">Foto Kandidat (Pilih salah satu)</label>' +
                '<div class="mb-3">' +
                    '<label class="text-[11px] text-slate-500 font-bold mb-1 block">Opsi 1: Tempel Link URL Foto</label>' +
                    '<input id="newFotoUrl" type="text" placeholder="https://link-foto.com/gambar.jpg" class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm">' +
                '</div>' +
                '<div class="flex items-center gap-2 mb-3">' +
                    '<div class="h-px bg-slate-200 flex-1"></div>' +
                    '<span class="text-[10px] text-slate-400 font-bold uppercase">Atau</span>' +
                    '<div class="h-px bg-slate-200 flex-1"></div>' +
                '</div>' +
                '<div>' +
                    '<label class="text-[11px] text-slate-500 font-bold mb-1 block">Opsi 2: Upload File (Maks 2MB)</label>' +
                    '<input id="newFotoFile" type="file" accept="image/*" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all cursor-pointer border border-slate-300 rounded-xl bg-white">' +
                '</div>' +
            '</div>' +
            '<button onclick="addKandidat()" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition">' +
                '<i class="fa-solid fa-plus mr-1"></i>Tambah Kandidat' +
            '</button>' +
        '</div>' +
        
        // DAFTAR KANDIDAT
        '<div class="flex items-center justify-between mb-3">' +
            '<h3 class="font-black text-sm text-slate-800"><i class="fa-solid fa-users text-emerald-600 mr-2"></i>Daftar Kandidat (' + DB.kandidat.length + ')</h3>' +
            '<button onclick="resetVotes()" class="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">' +
                '<i class="fa-solid fa-rotate-left mr-1"></i>Reset Suara' +
            '</button>' +
        '</div>' +
        '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">';

    DB.kandidat.forEach(function(c) {
        var fotoHtml = (c.emoji && (c.emoji.indexOf('http') === 0 || c.emoji.indexOf('data:') === 0)) ? '<img src="' + c.emoji + '" class="w-full h-full object-cover">' : (c.emoji || '👤');
        html += '<div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">' +
            '<div class="flex items-center gap-3">' +
                '<div class="w-14 h-14 rounded-2xl bg-emerald-100 text-4xl flex items-center justify-center overflow-hidden shrink-0">' + fotoHtml + '</div>' +
                '<div class="flex-1 min-w-0">' +
                    '<div class="font-bold truncate">' + c.nama + '</div>' +
                    '<div class="text-xs text-slate-500">No. ' + c.no + ' · ' + (c.suara || 0) + ' suara</div>' +
                '</div>' +
                '<button onclick="confirmHapus(' + c.id + ')" class="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition" title="Hapus">' +
                    '<i class="fa-solid fa-trash text-xs"></i>' +
                '</button>' +
            '</div>' +
        '</div>';
    });

    html += '</div></div>'; // End Tab Kandidat

    // TAB REKAP
    html += '<div class="' + (activeHitungTab === 'rekap' ? 'block' : 'hidden') + '">' +
        '<div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6">' +
            '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">' +
                '<div>' +
                    '<h3 class="font-black text-sm text-slate-800"><i class="fa-solid fa-chart-simple text-emerald-600 mr-2"></i>Ekspor & Cetak</h3>' +
                    '<p class="text-xs text-slate-500 mt-1">Unduh hasil rekapitulasi atau pulihkan data dari file backup.</p>' +
                '</div>' +
                '<div class="flex flex-wrap gap-2">' +
                    '<button onclick="exportJSON()" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow">' +
                        '<i class="fa-solid fa-file-export mr-1.5"></i>Download Backup' +
                    '</button>' +
                    '<label class="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition shadow cursor-pointer flex items-center gap-1.5">' +
                        '<i class="fa-solid fa-upload"></i> Upload Backup (JSON)' +
                        '<input type="file" accept=".json" onchange="restoreBackupJSON(event)" class="hidden">' +
                    '</label>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">' +
            '<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">' +
                '<div class="flex items-center justify-between mb-1.5"><span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Masuk</span><i class="fa-solid fa-check-to-slot text-emerald-500 text-sm"></i></div>' +
                '<div class="text-2xl md:text-3xl font-black tabular-nums text-slate-900">' + total + '</div>' +
            '</div>' +
            '<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">' +
                '<div class="flex items-center justify-between mb-1.5"><span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Target DPT</span><i class="fa-solid fa-users text-slate-500 text-sm"></i></div>' +
                '<div class="text-2xl md:text-3xl font-black tabular-nums text-slate-900">' + dptTarget + '</div>' +
            '</div>' +
            '<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">' +
                '<div class="flex items-center justify-between mb-1.5"><span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Suara Tidak Sah</span><i class="fa-solid fa-ban text-red-500 text-sm"></i></div>' +
                '<div class="text-2xl md:text-3xl font-black tabular-nums text-slate-900">' + (suaraTidakSahState || 0) + '</div>' +
            '</div>' +
            '<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">' +
                '<div class="flex items-center justify-between mb-1.5"><span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Partisipasi</span><i class="fa-solid fa-chart-pie text-blue-500 text-sm"></i></div>' +
                '<div class="text-2xl md:text-3xl font-black tabular-nums text-slate-900">' + pct.toFixed(1) + '%</div>' +
            '</div>' +
        '</div>' +
        '<div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">' +
            '<div class="p-5 border-b border-slate-100">' +
                '<h3 class="font-black text-sm text-slate-800"><i class="fa-solid fa-table-list text-emerald-600 mr-2"></i>Tabel Rekapitulasi</h3>' +
            '</div>' +
            '<div class="overflow-x-auto">' +
                '<table class="w-full text-sm">' +
                    '<thead class="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-black">' +
                        '<tr>' +
                            '<th class="text-left px-4 py-3">No</th>' +
                            '<th class="text-left px-4 py-3">Kandidat</th>' +
                            '<th class="text-right px-4 py-3">Suara</th>' +
                            '<th class="text-right px-4 py-3">%</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody class="divide-y divide-slate-100">';

    sorted.forEach(function(c, i) {
        var p = total ? ((c.suara||0)/total)*100 : 0;
        var isTop = i===0 && (c.suara||0)>0 && (sorted.length===1 || (sorted[1].suara||0)<(c.suara||0));
        html += '<tr class="' + (isTop?'bg-amber-50':'') + '">' +
            '<td class="px-4 py-3 font-black text-emerald-700">' + c.no + '</td>' +
            '<td class="px-4 py-3 font-bold">' + c.nama + (isTop?' <span class="text-[9px] bg-amber-400 px-1.5 py-0.5 rounded ml-1 text-emerald-950">TOP</span>':'') + '</td>' +
            '<td class="px-4 py-3 text-right font-black tabular-nums text-emerald-700">' + (c.suara || 0) + '</td>' +
            '<td class="px-4 py-3 text-right tabular-nums text-slate-600">' + p.toFixed(1) + '%</td>' +
        '</tr>';
    });

    html += '<tr class="bg-red-50/50">' +
            '<td class="px-4 py-3 font-black text-red-500">-</td>' +
            '<td class="px-4 py-3 font-bold text-red-700">Suara Tidak Sah</td>' +
            '<td class="px-4 py-3 text-right font-black tabular-nums text-red-700">' + (suaraTidakSahState || 0) + '</td>' +
            '<td class="px-4 py-3 text-right tabular-nums text-red-500">' + (total ? (((suaraTidakSahState || 0)/total)*100).toFixed(1) : 0) + '%</td>' +
        '</tr>' +
        '</tbody></table></div></div></div>' + // End Tab Rekap
    '</section>';

    return html;
}
// ==========================================
// BAGIAN 3: FUNGSI AKSI & DATABASE
// ==========================================

async function loginPanitia(e) {
    e.preventDefault();
    var email = document.getElementById("emailPanitia").value;
    var password = document.getElementById("passPanitia").value;
    var res = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
    if (res.error) { showToast("❌", "Login Gagal: " + res.error.message); return; }
    isHitungUnlocked = true;
    showToast("🔓", "Selamat datang, Panitia!");
    render();
}

async function logoutPanitia() {
    await supabaseClient.auth.signOut();
    isHitungUnlocked = false;
    showToast("🔒", "Anda telah keluar.");
    render();
}

function saveSuaraTidakSah(val) {
    supabaseClient.from('site_config').upsert({ id: 1, data: Object.assign({}, DB.siteConfigRaw, { suaraTidakSah: val }) });
}

async function saveSettings() {
    var newTitle = document.getElementById('setTitle').value.trim();
    var newDpt = parseInt(document.getElementById('setDpt').value) || 100;
    if (!newTitle) return showToast('⚠️', 'Nama pemilihan tidak boleh kosong');
    
    DB.title = newTitle;
    DB.profil.dpt = newDpt;

    var updatedData = Object.assign({}, DB.siteConfigRaw);
    updatedData.profil = Object.assign({}, DB.siteConfigRaw.profil, { dpt: newDpt });

    var res = await supabaseClient.from('site_config').upsert({ id: 1, data: updatedData });
    if (res.error) return showToast('❌', 'Gagal menyimpan: ' + res.error.message);
    
    showToast('✅', 'Pengaturan berhasil disimpan!');
    render();
}

async function addVote(id) {
    var isTidakSah = id === 'tidak-sah';
    var c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(function(x) { return x.id == id; });
    if (!c) return;

    var totalKandidat = DB.kandidat.reduce(function(s,x) { return s + (x.suara || 0); }, 0);
    var total = totalKandidat + (suaraTidakSahState || 0);
    if (total >= (DB.profil.dpt || 100)) return showToast('⚠️', 'Target DPT sudah tercapai!');

    if (isTidakSah) {
        suaraTidakSahState = (suaraTidakSahState || 0) + 1;
        saveSuaraTidakSah(suaraTidakSahState);
    } else {
        c.suara = (c.suara || 0) + 1;
        var sessionRes = await supabaseClient.auth.getSession();
        if (!sessionRes.data.session) {
            c.suara--;
            showToast("❌", "Sesi login habis. Harap login ulang.");
            isHitungUnlocked = false; render(); return;
        }
        // Gunakan == agar tipe data integer dari database cocok
        var errRes = await supabaseClient.from('kandidat').update({ suara: c.suara }).eq('id', c.id);
        if (errRes.error) {
            c.suara--; 
            showToast("❌", 'Gagal menyimpan: ' + errRes.error.message); return;
        }
    }
    render();
    showToast("✅", '+1 suara ' + c.nama);
}

function subVote(id) {
    var isTidakSah = id === 'tidak-sah';
    // Gunakan == agar tipe data integer dari database cocok
    var c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(function(x) { return x.id == id; });
    if (!c) return;
    if (isTidakSah && (!suaraTidakSahState || suaraTidakSahState <= 0)) return;
    if (!isTidakSah && (!c.suara || c.suara <= 0)) return;

    openModal(
        '<div class="p-6 text-center">' +
            '<div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-triangle-exclamation"></i></div>' +
            '<h3 class="text-lg font-bold text-slate-900 mb-1">Kurangi 1 Suara?</h3>' +
            '<p class="text-xs text-slate-500 mb-6">Yakin ingin mengurangi 1 suara dari ' + c.nama + '?</p>' +
            '<div class="flex justify-center gap-3">' +
                '<button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>' +
                '<button onclick="executeSubVote(\'' + c.id + '\')" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Ya, Kurangi</button>' +
            '</div>' +
        '</div>'
    );
}

async function executeSubVote(id) {
    var isTidakSah = id === 'tidak-sah';
    var c = isTidakSah ? { nama: 'Suara Tidak Sah' } : DB.kandidat.find(function(x) { return x.id == id; });
    
    if (isTidakSah) {
        suaraTidakSahState--;
        saveSuaraTidakSah(suaraTidakSahState);
    } else {
        c.suara--;
        var sessionRes = await supabaseClient.auth.getSession();
        if (!sessionRes.data.session) {
            c.suara++; 
            closeModal();
            showToast("❌", "Sesi login habis. Harap login ulang.");
            isHitungUnlocked = false; render(); return;
        }
        var errRes = await supabaseClient.from('kandidat').update({ suara: c.suara }).eq('id', c.id);
        if (errRes.error) {
            c.suara++; 
            showToast("❌", 'Gagal update: ' + errRes.error.message); return;
        }
    }
    closeModal();
    render();
    showToast("↩️", 'Koreksi -1 suara ' + c.nama);
}

async function addKandidat(){
  var no = parseInt(document.getElementById('newNo').value);
  var nama = document.getElementById('newNama').value.trim();
  var fotoUrl = document.getElementById('newFotoUrl').value.trim();
  var fileInput = document.getElementById('newFotoFile');
  
  if(!no || !nama) return showToast('⚠️','Nomor & nama wajib diisi');
  if(DB.kandidat.some(function(c) { return c.no === no; })) return showToast('⚠️','Nomor urut sudah dipakai');
  
  var foto = '👤'; 
  if (fileInput.files && fileInput.files[0]) {
    var file = fileInput.files[0];
    if (file.size > 2 * 1024 * 1024) return showToast('⚠️', 'Ukuran foto maksimal 2MB');
    foto = await new Promise(function(resolve) {
      var reader = new FileReader();
      reader.onload = function(e) { resolve(e.target.result); };
      reader.readAsDataURL(file);
    });
  } else if (fotoUrl) {
    foto = fotoUrl;
  }

  // TIPS: Karena tabel 'kandidat' tidak punya kolom 'foto', kita simpan di 'emoji'
  var newData = { 
      id: Date.now(), 
      no: no, 
      nama: nama, 
      emoji: foto, 
      warna: "from-emerald-600 to-emerald-800",
      suara: 0 
  };

  var res = await supabaseClient.from('kandidat').insert([newData]);
  if (res.error) return showToast("❌", "Gagal menambah kandidat: " + res.error.message);

  DB = await loadDB(); 
  showToast('✅','Kandidat ditambahkan');
  render();
}

function confirmHapus(id){
  var c = DB.kandidat.find(function(x) { return x.id == id; });
  if(!c) return;
  openModal(
    '<div class="p-6 text-center">' +
        '<div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-trash-can"></i></div>' +
        '<h3 class="text-lg font-bold text-slate-900 mb-1">Hapus ' + c.nama + '?</h3>' +
        '<p class="text-xs text-slate-500 mb-6">Suara kandidat ini (' + c.suara + ') akan hilang permanen.</p>' +
        '<div class="flex justify-center gap-3">' +
            '<button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>' +
            '<button onclick="executeHapus(\'' + c.id + '\')" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Hapus</button>' +
        '</div>' +
    '</div>'
  );
}

async function executeHapus(id) {
    var res = await supabaseClient.from('kandidat').delete().eq('id', id);
    if (res.error) return showToast("❌", "Gagal menghapus: " + res.error.message);
    DB = await loadDB();
    closeModal();
    showToast('🗑️','Kandidat dihapus');
    render();
}

function resetVotes(){
  openModal(
    '<div class="p-6 text-center">' +
        '<div class="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fa-solid fa-rotate-left"></i></div>' +
        '<h3 class="text-lg font-bold text-slate-900 mb-1">Reset semua suara?</h3>' +
        '<p class="text-xs text-slate-500 mb-6">Semua perolehan suara kandidat dan tidak sah akan menjadi 0.</p>' +
        '<div class="flex justify-center gap-3">' +
            '<button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Batal</button>' +
            '<button onclick="executeResetVotes()" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Reset</button>' +
        '</div>' +
    '</div>'
  );
}

async function executeResetVotes() {
    for (var i = 0; i < DB.kandidat.length; i++) {
        await supabaseClient.from('kandidat').update({ suara: 0 }).eq('id', DB.kandidat[i].id);
    }
    suaraTidakSahState = 0;
    saveSuaraTidakSah(0);
    DB = await loadDB();
    closeModal();
    showToast('🗑️','Semua suara direset');
    render();
}

function exportJSON(){
  var dataStr = JSON.stringify(DB, null, 2);
  var blob = new Blob([dataStr], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  var now = new Date();
  var pad = function(n) { return String(n).padStart(2, '0'); };
  var dateStr = now.getFullYear() + pad(now.getMonth()+1) + pad(now.getDate()) + '_' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
  
  var a = document.createElement('a');
  a.href = url;
  a.download = 'backup_pilwe012_' + dateStr + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥','Backup JSON berhasil diunduh');
}

async function restoreBackupJSON(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = async function(e) {
        try {
            var parsed = JSON.parse(e.target.result);
            if (!parsed.kandidat) return showToast('❌', 'Format file JSON tidak valid!');
            
            showToast('⏳', 'Sedang memulihkan data ke database...');

            for (var i = 0; i < parsed.kandidat.length; i++) {
                var k = parsed.kandidat[i];
                await supabaseClient.from('kandidat').update({ suara: k.suara || 0 }).eq('id', k.id);
            }

            if (parsed.suaraTidakSah !== undefined) {
                suaraTidakSahState = parsed.suaraTidakSah;
                saveSuaraTidakSah(suaraTidakSahState);
            }

            DB = await loadDB();
            showToast('✅', 'Data berhasil dipulihkan dari Backup!');
            render();
        } catch (err) {
            showToast('❌', 'Gagal membaca file JSON.');
        }
    };
    reader.readAsText(file);
}