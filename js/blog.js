// ── State ──
const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
const storedComments = JSON.parse(localStorage.getItem('postComments') || '{}');
const storedLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');

function getLikes(postId) {
  return storedLikes[postId] ?? POSTS.find(p => p.id === postId)?.likes ?? 0;
}
function getComments(postId) {
  const base = POSTS.find(p => p.id === postId)?.comments ?? [];
  const extra = storedComments[postId] ?? [];
  return [...base, ...extra];
}

// ── Render post card ──
function createPostCard(post) {
  const card = document.createElement('article');
  card.className = 'post-card';
  card.dataset.id = post.id;

  const liked = likedPosts.includes(post.id);
  const likes = getLikes(post.id);
  const commentCount = getComments(post.id).length;

  card.innerHTML = `
    ${post.image ? `<img src="${post.image}" alt="${post.title}" loading="lazy" />` : ''}
    <div class="post-card-body">
      <span class="post-category">${post.category}</span>
      <h2>${post.title}</h2>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">
        <span>${post.author}</span>
        <span>·</span>
        <span>${formatDate(post.date)}</span>
      </div>
      <div class="post-actions">
        <button class="action-btn like-btn ${liked ? 'liked' : ''}" data-id="${post.id}">
          <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
          <span class="like-count">${likes}</span>
        </button>
        <button class="action-btn comment-btn" data-id="${post.id}">
          <i class="far fa-comment"></i>
          <span>${commentCount}</span>
        </button>
        <button class="action-btn share-btn" data-id="${post.id}">
          <i class="fas fa-share-nodes"></i> Compartilhar
        </button>
      </div>
    </div>`;

  card.querySelector('.like-btn').addEventListener('click', e => { e.stopPropagation(); toggleLike(post.id, card); });
  card.querySelector('.comment-btn').addEventListener('click', e => { e.stopPropagation(); openModal(post.id); });
  card.querySelector('.share-btn').addEventListener('click', e => { e.stopPropagation(); sharePost(post); });
  card.addEventListener('click', () => openModal(post.id));

  return card;
}

function formatDate(d) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

// ── Like ──
function toggleLike(postId, card) {
  const idx = likedPosts.indexOf(postId);
  const isLiked = idx > -1;
  if (isLiked) {
    likedPosts.splice(idx, 1);
    storedLikes[postId] = getLikes(postId) - 1;
  } else {
    likedPosts.push(postId);
    storedLikes[postId] = getLikes(postId) + 1;
  }
  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  localStorage.setItem('postLikes', JSON.stringify(storedLikes));

  const btn = card.querySelector('.like-btn');
  const icon = btn.querySelector('i');
  const count = btn.querySelector('.like-count');
  btn.classList.toggle('liked', !isLiked);
  icon.className = !isLiked ? 'fas fa-heart' : 'far fa-heart';
  count.textContent = getLikes(postId);

  renderSidebar();
  syncModalLike(postId);
}

// ── Share ──
async function sharePost(post) {
  const url = location.origin + location.pathname + '?post=' + post.id;
  if (navigator.share) {
    await navigator.share({ title: post.title, text: post.excerpt, url });
  } else {
    await navigator.clipboard.writeText(url).catch(() => {});
    showToast('Link copiado! ✓');
  }
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Modal ──
function openModal(postId) {
  const post = POSTS.find(p => p.id === postId);
  if (!post) return;

  const liked = likedPosts.includes(post.id);
  const likes = getLikes(post.id);
  const comments = getComments(post.id);

  const commentsHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-avatar">${c.name[0].toUpperCase()}</div>
      <div class="comment-body">
        <strong>${c.name}</strong><time>${c.time || ''}</time>
        <p>${c.text}</p>
      </div>
    </div>`).join('');

  document.getElementById('modal-content').innerHTML = `
    ${post.image ? `<img src="${post.image}" class="modal-post-img" alt="${post.title}" />` : ''}
    <span class="post-category">${post.category}</span>
    <h2 class="modal-post-title">${post.title}</h2>
    <p class="modal-post-meta">${post.author} · ${formatDate(post.date)}</p>
    <div class="modal-post-body">${post.body}</div>
    <div class="modal-actions">
      <button class="action-btn like-btn modal-like ${liked ? 'liked' : ''}" data-id="${post.id}">
        <i class="${liked ? 'fas' : 'far'} fa-heart"></i>
        <span class="like-count">${likes}</span> curtidas
      </button>
      <button class="action-btn modal-share" data-id="${post.id}">
        <i class="fas fa-share-nodes"></i> Compartilhar
      </button>
    </div>
    <section class="comments-section">
      <h3><i class="far fa-comment"></i> Comentários (${comments.length})</h3>
      <form class="comment-form" id="comment-form-${post.id}">
        <input type="text" placeholder="Escreva um comentário..." maxlength="300" required />
        <button type="submit">Enviar</button>
      </form>
      <div class="comments-list" id="comments-list-${post.id}">${commentsHTML}</div>
    </section>`;

  document.getElementById('modal-content').querySelector('.modal-like')
    .addEventListener('click', e => {
      const card = document.querySelector(`.post-card[data-id="${post.id}"]`);
      if (card) toggleLike(post.id, card);
      else { /* modal-only toggle */
        const btn = e.currentTarget;
        const idx = likedPosts.indexOf(post.id);
        const isLiked = idx > -1;
        if (isLiked) { likedPosts.splice(idx, 1); storedLikes[post.id] = getLikes(post.id) - 1; }
        else { likedPosts.push(post.id); storedLikes[post.id] = getLikes(post.id) + 1; }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        localStorage.setItem('postLikes', JSON.stringify(storedLikes));
        btn.classList.toggle('liked', !isLiked);
        btn.querySelector('i').className = !isLiked ? 'fas fa-heart' : 'far fa-heart';
        btn.querySelector('.like-count').textContent = getLikes(post.id);
      }
    });

  document.getElementById('modal-content').querySelector('.modal-share')
    .addEventListener('click', () => sharePost(post));

  document.getElementById(`comment-form-${post.id}`)
    .addEventListener('submit', e => {
      e.preventDefault();
      const input = e.target.querySelector('input');
      const text = input.value.trim();
      if (!text) return;
      const newComment = { name: 'Visitante', text, time: new Date().toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }).replace(',','·') };
      if (!storedComments[post.id]) storedComments[post.id] = [];
      storedComments[post.id].push(newComment);
      localStorage.setItem('postComments', JSON.stringify(storedComments));
      const list = document.getElementById(`comments-list-${post.id}`);
      const el = document.createElement('div');
      el.className = 'comment-item';
      el.innerHTML = `
        <div class="comment-avatar">${newComment.name[0]}</div>
        <div class="comment-body">
          <strong>${newComment.name}</strong><time>${newComment.time}</time>
          <p>${newComment.text}</p>
        </div>`;
      list.appendChild(el);
      input.value = '';
      // update comment count on card
      const card = document.querySelector(`.post-card[data-id="${post.id}"]`);
      if (card) {
        const cnt = card.querySelector('.comment-btn span');
        if (cnt) cnt.textContent = getComments(post.id).length;
      }
    });

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function syncModalLike(postId) {
  const btn = document.querySelector('#modal-content .modal-like');
  if (!btn || +btn.dataset.id !== postId) return;
  const liked = likedPosts.includes(postId);
  btn.classList.toggle('liked', liked);
  btn.querySelector('i').className = liked ? 'fas fa-heart' : 'far fa-heart';
  btn.querySelector('.like-count').textContent = getLikes(postId);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Sidebar ──
function renderSidebar() {
  // Categories
  const counts = {};
  POSTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  const catList = document.getElementById('category-list');
  catList.innerHTML = Object.entries(counts).map(([cat, n]) =>
    `<li><a href="#">${cat}</a><span>${n}</span></li>`).join('');

  // Top liked
  const sorted = [...POSTS].sort((a, b) => getLikes(b.id) - getLikes(a.id)).slice(0, 4);
  document.getElementById('top-liked').innerHTML = sorted.map(p =>
    `<li onclick="openModal(${p.id})"><i class="fas fa-heart"></i>${p.title.slice(0, 48)}…</li>`).join('');
}

// ── Init ──
function init() {
  const feed = document.getElementById('posts-feed');
  POSTS.forEach(p => feed.appendChild(createPostCard(p)));
  renderSidebar();

  // hamburger
  document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('open');
  });

  // deep-link
  const urlParams = new URLSearchParams(location.search);
  const pid = parseInt(urlParams.get('post'));
  if (pid) openModal(pid);
}

init();
