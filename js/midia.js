// ── State ──
let currentFilter = 'all';
let currentView = 'day';
let lightboxItems = [];
let lightboxIndex = 0;

// ── Helpers ──
function parseDate(str) { return new Date(str + 'T00:00:00'); }

function formatGroupLabel(dateStr, view) {
  const d = parseDate(dateStr);
  if (view === 'day') {
    const label = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  // week: get Monday of that week
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = dt => dt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  return `Semana de ${fmt(monday)} a ${fmt(sunday)}`;
}

function getGroupKey(dateStr, view) {
  if (view === 'day') return dateStr;
  const d = parseDate(dateStr);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return monday.toISOString().slice(0, 10);
}

// ── Render timeline ──
function renderTimeline() {
  const filtered = MEDIA_ITEMS.filter(m => currentFilter === 'all' || m.type === currentFilter);

  // Group
  const groups = {};
  filtered.forEach(item => {
    const key = getGroupKey(item.date, currentView);
    if (!groups[key]) groups[key] = { key, label: formatGroupLabel(item.date, currentView), items: [] };
    groups[key].items.push(item);
  });

  // Sort groups descending
  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
  lightboxItems = filtered;

  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  if (sortedKeys.length === 0) {
    timeline.innerHTML = '<p style="color:var(--muted);text-align:center;padding:60px 0">Nenhuma mídia encontrada.</p>';
    return;
  }

  sortedKeys.forEach(key => {
    const group = groups[key];
    const groupEl = document.createElement('div');
    groupEl.className = 'timeline-group';

    const totalCount = group.items.length;
    const photoCount = group.items.filter(i => i.type === 'photo').length;
    const videoCount = group.items.filter(i => i.type === 'video').length;
    const sub = [photoCount && `${photoCount} foto${photoCount > 1 ? 's' : ''}`, videoCount && `${videoCount} vídeo${videoCount > 1 ? 's' : ''}`].filter(Boolean).join(' · ');

    groupEl.innerHTML = `
      <div class="timeline-label">
        <div class="timeline-dot"></div>
        <div>
          <span class="timeline-label-text">${group.label}</span>
          <span class="timeline-label-sub">${sub}</span>
        </div>
      </div>
      <div class="timeline-track">
        <div class="timeline-grid" id="grid-${key}"></div>
      </div>`;

    const grid = groupEl.querySelector(`#grid-${key}`);
    group.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'media-item';
      el.dataset.id = item.id;
      el.innerHTML = `
        <div class="media-thumb">
          <img src="${item.thumb}" alt="${item.caption}" loading="lazy" />
          ${item.type === 'video' ? '<div class="play-icon"><i class="fas fa-play-circle"></i></div>' : ''}
        </div>
        <div class="media-item-info">
          <span class="media-type-badge">${item.type === 'photo' ? 'Foto' : 'Vídeo'}</span>
          <span>${item.caption.slice(0, 40)}</span>
        </div>`;
      el.addEventListener('click', () => openLightbox(item.id));
      grid.appendChild(el);
    });

    timeline.appendChild(groupEl);
  });
}

// ── Lightbox ──
function openLightbox(itemId) {
  lightboxIndex = lightboxItems.findIndex(i => i.id === itemId);
  showLightboxItem();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem() {
  const item = lightboxItems[lightboxIndex];
  if (!item) return;
  const content = document.getElementById('lightbox-content');
  if (item.type === 'photo') {
    content.innerHTML = `<img src="${item.src}" alt="${item.caption}" />`;
  } else {
    content.innerHTML = `<video src="${item.src}" controls autoplay style="border-radius:14px;max-height:80vh;max-width:90vw"></video>`;
  }
  document.getElementById('lightbox-caption').textContent = item.caption;
  document.getElementById('lightbox-prev').style.display = lightboxIndex === 0 ? 'none' : 'flex';
  document.getElementById('lightbox-next').style.display = lightboxIndex === lightboxItems.length - 1 ? 'none' : 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-content').innerHTML = '';
  document.body.style.overflow = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => { if (lightboxIndex > 0) { lightboxIndex--; showLightboxItem(); } });
document.getElementById('lightbox-next').addEventListener('click', () => { if (lightboxIndex < lightboxItems.length - 1) { lightboxIndex++; showLightboxItem(); } });
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxIndex > 0) { lightboxIndex--; showLightboxItem(); }
  if (e.key === 'ArrowRight' && lightboxIndex < lightboxItems.length - 1) { lightboxIndex++; showLightboxItem(); }
});

// ── Filters & toggle ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTimeline();
  });
});

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    renderTimeline();
  });
});

// hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('open');
});

// ── Init ──
renderTimeline();
