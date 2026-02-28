/* =============================================
   GENÇİŞ — Ana Uygulama Mantığı
   ============================================= */

// ---------- STATE ----------
let state = {
  screen: 'onboarding',
  obSlide: 0,
  isDark: true,
  currentUser: null,
  isAdmin: false,
  currentFilter: 'Tümü',
  currentJobId: null,
  currentRating: 0,
  postedJobs: [...JOBS]
};

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  populateCitySelects();
  renderFilterBar();
  renderJobs();
  renderSpecialJobs();
  renderPostedJobsList();
  renderAdminJobs();

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
});

// ---------- SCREENS ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.screen = id;
}

// ---------- ONBOARDING ----------
function nextSlide() {
  document.getElementById('ob' + state.obSlide).classList.remove('active');
  state.obSlide++;
  document.getElementById('ob' + state.obSlide).classList.add('active');
  updateObDots();
}

function updateObDots() {
  document.querySelectorAll('.ob-nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === state.obSlide);
  });
}

function goToAuth() { showScreen('auth'); }

// ---------- AUTH VIEWS ----------
function showLoginView() {
  document.getElementById('viewLogin').style.display = 'block';
  document.getElementById('viewRegister').style.display = 'none';
  document.getElementById('viewAdmin').style.display = 'none';
}
function showRegisterView() {
  document.getElementById('viewLogin').style.display = 'none';
  document.getElementById('viewRegister').style.display = 'block';
  document.getElementById('viewAdmin').style.display = 'none';
}
function showAdminView() {
  document.getElementById('viewLogin').style.display = 'none';
  document.getElementById('viewRegister').style.display = 'none';
  document.getElementById('viewAdmin').style.display = 'block';
}

// ---------- LOGIN ----------
function doLogin() {
  const name = document.getElementById('loginName').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (!name || !pass) { showToast('⚠️ Lütfen tüm alanları doldurun'); return; }

  const successEl = document.getElementById('loginSuccess');
  successEl.style.display = 'block';
  state.currentUser = { name, initial: name[0].toUpperCase(), city: 'İstanbul', edu: 'Lisans' };

  setTimeout(() => {
    successEl.style.display = 'none';
    launchApp();
  }, 1900);
}

// ---------- REGISTER ----------
function doRegister() {
  const name   = document.getElementById('regName').value.trim();
  const user   = document.getElementById('regUser').value.trim();
  const email  = document.getElementById('regEmail').value.trim();
  const phone  = document.getElementById('regPhone').value.trim();
  const city   = document.getElementById('regCity').value;
  const edu    = document.getElementById('regEdu').value;
  const pass   = document.getElementById('regPass').value;

  if (!name || !user || !email || !city || !edu || !pass) {
    showToast('⚠️ Zorunlu (*) alanları doldurun'); return;
  }

  const successEl = document.getElementById('registerSuccess');
  successEl.style.display = 'block';
  state.currentUser = { name, user, email, phone, city, edu, initial: name[0].toUpperCase() };

  setTimeout(() => {
    successEl.style.display = 'none';
    launchApp();
  }, 1900);
}

// ---------- ADMIN LOGIN ----------
function doAdminLogin() {
  const u = document.getElementById('adminUser').value;
  const p = document.getElementById('adminPass').value;
  if (u === 'admin' && p === 'admin123') {
    state.isAdmin = true;
    showScreen('adminPanel');
    renderAdminJobs();
    showToast('✅ Admin paneline hoş geldiniz');
  } else {
    showToast('❌ Hatalı admin bilgileri');
  }
}

// ---------- LAUNCH APP ----------
function launchApp() {
  const u = state.currentUser;
  document.getElementById('welcomeName').textContent = u.name + ' 👋';
  document.getElementById('userAvatar').textContent = u.initial;
  document.getElementById('profileAvatarBig').textContent = u.initial;
  document.getElementById('profileNameBig').textContent = u.name;
  document.getElementById('profileLocEdu').textContent = (u.city || 'Türkiye') + ' • ' + (u.edu || 'Belirtilmedi');
  showScreen('app');
  goPage('home');
}

// ---------- LOGOUT ----------
function logout() {
  state.currentUser = null;
  state.isAdmin = false;
  state.obSlide = 0;
  document.querySelectorAll('.ob-slide').forEach((s, i) => s.classList.toggle('active', i === 0));
  updateObDots();
  showScreen('onboarding');
}

// ---------- NAVIGATION ----------
function goPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  const idx = { home: 0, jobs: 1, special: 2, profile: 3 }[page];
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems[idx]) navItems[idx].classList.add('active');
}

// ---------- JOBS RENDER ----------
function renderFilterBar() {
  const filters = ['Tümü', 'Depo', 'Servis', 'Etkinlik', 'Ofis', 'Staj', 'Fabrika', 'Temizlik', 'Güvenlik'];
  const icons   = ['🔍', '📦', '🍽️', '🎪', '💼', '🎓', '🏭', '🧹', '🔒'];
  const bar = document.getElementById('filterBar');
  bar.innerHTML = filters.map((f, i) =>
    `<div class="filter-chip ${f === 'Tümü' ? 'active' : ''}" onclick="setFilter('${f}', this)">${icons[i]} ${f}</div>`
  ).join('');
}

function renderJobs(filter = 'Tümü', search = '') {
  const list = document.getElementById('jobList');
  const filtered = state.postedJobs.filter(j => {
    const matchCat = filter === 'Tümü' || j.cat === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.city.toLowerCase().includes(q) ||
      j.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">Bu kriterlere uygun ilan bulunamadı.<br>Farklı filtre deneyin.</div></div>`;
    return;
  }

  list.innerHTML = filtered.map(j => `
    <div class="job-card" onclick="openJob(${j.id})">
      <div class="job-emoji-banner">${j.icon}</div>
      <div class="job-card-header">
        <div>
          <div class="job-company">${j.company} &middot; ${j.city}</div>
          <div class="job-title">${j.title}</div>
        </div>
        <div class="job-wage">${j.wage}<span style="font-size:0.72rem;font-weight:500;color:var(--text2)">/${j.wageType}</span></div>
      </div>
      <div class="job-tags">
        <span class="tag">${j.duration}</span>
        ${j.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
        <span class="tag" style="font-size:0.7rem;color:var(--text2)">${j.posted}</span>
      </div>
    </div>
  `).join('');
}

function renderSpecialJobs() {
  const list = document.getElementById('specialJobList');
  list.innerHTML = SPECIAL_JOBS.map(j => `
    <div class="job-card" onclick="openSpecialJob(${j.id})">
      <div class="job-card-header">
        <div>
          <div class="job-company">${j.company} &middot; ${j.city}</div>
          <div class="job-title">${j.icon} ${j.title}</div>
        </div>
        <div class="job-wage">${j.wage}<span style="font-size:0.72rem;font-weight:500;color:var(--text2)">/${j.wageType}</span></div>
      </div>
      <div class="job-tags">
        <span class="tag">${j.duration}</span>
        ${j.tags.map(t => `<span class="tag tag-green">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderPostedJobsList() {
  const el = document.getElementById('myPostedJobs');
  el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-text">Henüz ilan vermediniz.</div></div>`;
}

function renderAdminJobs() {
  const el = document.getElementById('adminJobList');
  if (!el) return;
  el.innerHTML = state.postedJobs.map(j => `
    <div class="user-row">
      <div>
        <div style="font-weight:600;font-size:0.9rem;">${j.title}</div>
        <div style="font-size:0.75rem;color:var(--text2);">${j.company} · ${j.city} · ${j.wage}/${j.wageType}</div>
      </div>
      <span class="tag tag-green">Aktif</span>
    </div>
  `).join('');
}

// ---------- FILTER / SEARCH ----------
function filterJobs() {
  const search = document.getElementById('homeSearch').value;
  renderJobs(state.currentFilter, search);
}

function setFilter(cat, el) {
  state.currentFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterJobs();
}

// ---------- JOB DETAIL MODAL ----------
function openJob(id) {
  const j = state.postedJobs.find(x => x.id === id);
  if (!j) return;
  state.currentJobId = id;
  document.getElementById('jobModalContent').innerHTML = buildJobDetail(j);
  openModal('jobModal');
}

function openSpecialJob(id) {
  const j = SPECIAL_JOBS.find(x => x.id === id);
  if (!j) return;
  state.currentJobId = id;
  document.getElementById('jobModalContent').innerHTML = buildJobDetail(j, true);
  openModal('jobModal');
}

function buildJobDetail(j, isSpecial = false) {
  return `
    <div style="font-size:3.5rem;text-align:center;padding:1rem 0;background:var(--bg3);border-radius:12px;margin-bottom:1rem;">${j.icon}</div>
    <div style="font-size:0.82rem;color:var(--text2);margin-bottom:0.3rem;">${j.company}</div>
    <div class="modal-title">${j.title}</div>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
      <span class="tag tag-accent">${j.wage}/${j.wageType}</span>
      <span class="tag">${j.city}</span>
      <span class="tag">${j.duration}</span>
      ${j.quota ? `<span class="tag tag-green">${j.quota} Kişi Aranıyor</span>` : ''}
    </div>
    <p style="color:var(--text2);font-size:0.9rem;line-height:1.75;margin-bottom:1rem;">${j.desc}</p>
    <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1.5rem;">
      ${j.tags.map(t => `<span class="${isSpecial ? 'tag tag-green' : 'tag'}">${t}</span>`).join('')}
    </div>
    <div style="display:flex;gap:0.8rem;">
      <button class="btn btn-accent" style="flex:1" onclick="openApplyModal()">Başvur 🚀</button>
      <button class="btn btn-outline" onclick="closeModal('jobModal'); setTimeout(()=>openModal('rateModal'),200)">Değerlendir ⭐</button>
    </div>
  `;
}

// ---------- APPLY MODAL ----------
function openApplyModal() {
  closeModal('jobModal');
  setTimeout(() => openModal('applyModal'), 220);
}

function submitApplication() {
  const text = document.getElementById('applyText').value.trim();
  if (!text) { showToast('⚠️ Başvuru yazısı gerekli'); return; }
  closeModal('applyModal');
  document.getElementById('applyText').value = '';
  showToast('✅ Başvurun başarıyla gönderildi!');
}

// ---------- POST JOB ----------
function postJob() {
  const title = document.getElementById('jobTitle').value.trim();
  const city  = document.getElementById('jobCity').value;
  const wage  = document.getElementById('jobWage').value;
  const desc  = document.getElementById('jobDesc').value.trim();
  const cat   = document.getElementById('jobCat').value.split(' ')[0];
  const dur   = document.getElementById('jobDuration').value;

  if (!title || !city || !wage) { showToast('⚠️ Başlık, şehir ve ücret zorunludur'); return; }

  const newJob = {
    id: Date.now(), title,
    company: state.currentUser?.name || 'Şirketiniz',
    city, wage: '₺' + wage, wageType: 'gün',
    duration: dur, cat, tags: getSelectedEmployerSkills(),
    icon: '📋', desc: desc || 'Detay belirtilmedi.',
    posted: 'Az önce', quota: null
  };
  state.postedJobs.unshift(newJob);

  // Reset form
  ['jobTitle','jobWage','jobDesc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('photoPreview').innerHTML = '';
  document.querySelectorAll('.skill-option.selected').forEach(el => el.classList.remove('selected'));

  const myList = document.getElementById('myPostedJobs');
  myList.innerHTML = `
    <div class="job-card">
      <div class="job-card-header">
        <div>
          <div class="job-company">${city}</div>
          <div class="job-title">${title}</div>
        </div>
        <div class="job-wage">₺${wage}/gün</div>
      </div>
      <div class="job-tags"><span class="tag">${dur}</span><span class="tag tag-green">Yeni Yayınlandı</span></div>
    </div>
  ` + myList.innerHTML.replace(/<div class="empty-state">[\s\S]*?<\/div><\/div>/, '');

  showToast('🚀 İlanın yayınlandı! Eşleştirme başlıyor…');
}

function getSelectedEmployerSkills() {
  return Array.from(document.querySelectorAll('#employerSkills .skill-option.selected'))
    .map(el => el.textContent.trim());
}

// ---------- PHOTO UPLOAD ----------
function triggerPhotoUpload() {
  document.getElementById('photoUpload').click();
}

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('photoPreview').innerHTML =
      `<img src="${ev.target.result}" alt="Fotoğraf önizlemesi" class="job-card-img" style="margin-top:0.8rem;">`;
  };
  reader.readAsDataURL(file);
}

// ---------- SKILLS TOGGLE ----------
function toggleSkill(el) { el.classList.toggle('selected'); }

// ---------- RATING ----------
function setRating(n) {
  state.currentRating = n;
  document.querySelectorAll('#ratingStars .star-btn').forEach((s, i) => {
    s.classList.toggle('lit', i < n);
  });
}

function submitRating() {
  if (!state.currentRating) { showToast('⚠️ Lütfen bir puan seçin'); return; }
  closeModal('rateModal');
  state.currentRating = 0;
  document.querySelectorAll('#ratingStars .star-btn').forEach(s => s.classList.remove('lit'));
  showToast('⭐ Değerlendirmen kaydedildi, teşekkürler!');
}

// ---------- ADMIN ACTIONS ----------
function blockUser(btn, name) {
  btn.textContent = '✓ Engellendi';
  btn.style.background = 'var(--bg3)';
  btn.style.color = 'var(--text2)';
  btn.disabled = true;
  showToast('🚫 ' + name + ' platformdan engellendi');
}

// ---------- PROFILE SETTINGS ----------
function saveProfile() {
  closeModal('editProfileModal');
  showToast('✅ Profil bilgilerin güncellendi!');
}
function savePassword() {
  closeModal('changePassModal');
  showToast('✅ Şifren başarıyla değiştirildi!');
}
function saveEmail() {
  closeModal('changeEmailModal');
  showToast('✅ E-posta adresin güncellendi!');
}
function savePhone() {
  closeModal('changePhoneModal');
  showToast('✅ Telefon numaran güncellendi!');
}

// ---------- MODALS ----------
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ---------- THEME ----------
function toggleTheme() {
  state.isDark = !state.isDark;
  document.body.classList.toggle('light', !state.isDark);
  const icon = state.isDark ? '🌙' : '☀️';
  document.querySelectorAll('[data-theme-btn]').forEach(b => b.textContent = icon);
}

// ---------- CITIES ----------
function populateCitySelects() {
  const selects = document.querySelectorAll('.city-select');
  selects.forEach(sel => {
    sel.innerHTML = '<option value="">Şehir seçin…</option>' +
      CITIES.map(c => `<option value="${c}">${c}</option>`).join('');
  });
}

// ---------- TOAST ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}
