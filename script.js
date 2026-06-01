/* ===================================================
   SCRIPT.JS – Sejarah-Mu
   JavaScript murni tanpa library
   Pusaka MASTIF | PAI A | 2026
   =================================================== */

/* ===== 1. HAMBURGER MENU (Mobile) ===== */
// Ambil elemen hamburger dan menu
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  // Saat hamburger diklik, buka/tutup menu
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Tutup menu jika salah satu link diklik
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

/* ===== 2. NAVBAR – tambah shadow saat di-scroll ===== */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ===== 3. SMOOTH SCROLL ===== */
// Semua link yang href-nya diawali # akan scroll halus
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const topPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  });
});

/* ===== 4. ANIMASI REVEAL SAAT SCROLL ===== */
// Semua elemen dengan kelas .reveal akan muncul perlahan
const revealElements = document.querySelectorAll('.reveal');

// Fungsi untuk cek apakah elemen sudah terlihat di layar
function checkReveal() {
  revealElements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    // Jika elemen sudah memasuki 85% bawah layar, tampilkan
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('visible');
    }
  });
}

// Cek saat halaman pertama kali dimuat
checkReveal();

// Cek setiap kali user menggulir halaman
window.addEventListener('scroll', checkReveal);

/* ===== 5. FALLBACK GAMBAR GAGAL DIMUAT ===== */
// Jika gambar gagal dimuat, tampilkan teks fallback
document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('error', function () {
    // Sembunyikan gambar
    this.style.display = 'none';
    // Tambahkan kelas fallback ke wrapper-nya
    const wrapper = this.parentElement;
    if (wrapper) {
      wrapper.classList.add('img-fallback');
    }
  });
});

/* ===================================================
   BELAJAR.HTML – Navigasi Sidebar
   Fungsi-fungsi berikut digunakan di belajar.html
   =================================================== */

/* Buka/tutup sidebar (mobile) */
function toggleSidebar() {
  const sidebar = document.getElementById('belajar-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

/* Buka/tutup subbab di sidebar */
function toggleBab(babId) {
  const subbabEl  = document.getElementById('subbab-' + babId);
  const btnEl     = document.getElementById('btn-bab-' + babId);

  if (!subbabEl || !btnEl) return;

  // Toggle kelas open
  subbabEl.classList.toggle('open');
  btnEl.classList.toggle('open');
}

/* Tampilkan konten bab yang dipilih */
function tampilkanBab(babId, babBtnEl) {
  // Sembunyikan semua konten bab
  document.querySelectorAll('.bab-content').forEach(function (el) {
    el.classList.remove('active');
  });

  // Tampilkan bab yang dipilih
  const target = document.getElementById('bab-' + babId);
  if (target) {
    target.classList.add('active');
  }

  // Tandai tombol bab yang aktif
  document.querySelectorAll('.sidebar-bab-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });

  // Buka accordion bab yang diklik
  toggleBab(babId);

  // Scroll ke atas konten di mobile
  const konten = document.querySelector('.belajar-content');
  if (konten) {
    konten.scrollTop = 0;
  }

  // Tutup sidebar di mobile setelah pilih bab
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('belajar-sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }
}

/* Tampilkan konten subbab (scroll ke anchor-nya) */
function tampilkanSubbab(babId, subbabId) {
  // Pastikan bab-nya aktif dulu
  document.querySelectorAll('.bab-content').forEach(function (el) {
    el.classList.remove('active');
  });

  const babTarget = document.getElementById('bab-' + babId);
  if (babTarget) babTarget.classList.add('active');

  // Tandai subbab aktif
  document.querySelectorAll('.sidebar-subbab-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });

  const subbabBtn = document.getElementById('subbab-btn-' + subbabId);
  if (subbabBtn) subbabBtn.classList.add('active');

  // Scroll ke subbab yang dituju
  setTimeout(function () {
    const target = document.getElementById('subbab-' + subbabId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);

  // Tutup sidebar di mobile
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('belajar-sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }
}