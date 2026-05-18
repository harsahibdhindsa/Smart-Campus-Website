


// MEMBER 1: NAVIGATION + DOM INITIALIZATION


// ── MOBILE NAV TOGGLE ──────────────────────────
function toggleNav() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('open');
}



// ── INIT on DOM ready ───────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Attach hamburger click
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleNav);

  // Attach gallery filter buttons (Member 2 function call)
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      filterGallery(this.dataset.filter, this);
    });
  });

  // Attach contact form submit (Member 2 function call)
  const contactForm = document.querySelector('form.contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleSubmit);

  // Attach personality navigation (Member 3 functions)
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', function () { nextStep(parseInt(this.dataset.next)); });
  });

  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', function () { prevStep(parseInt(this.dataset.prev)); });
  });

  // Result + Reset (Member 4 functions)
  const showResultBtn = document.getElementById('show-result-btn');
  if (showResultBtn) showResultBtn.addEventListener('click', showResult);

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetTest);

  // Hover effects
  document.querySelectorAll('.quick-link-item').forEach(link => {
    link.addEventListener('mouseenter', () => link.style.color = 'var(--gold)');
    link.addEventListener('mouseleave', () => link.style.color = 'rgba(255,255,255,0.75)');
  });

});




//  MEMBER 2: GALLERY + CONTACT FORM


// ── GALLERY FILTER ─────────────────────────────
function filterGallery(cat, btn) {

  // Update active button
  document.querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  // Show/hide items
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
      item.style.opacity = '1';
    } else {
      item.style.display = 'none';
    }
  });
}


// ── CONTACT FORM SUBMIT ────────────────────────
function handleSubmit(event) {
  event.preventDefault();

  const successMsg = document.getElementById('success-msg');

  if (successMsg) {
    successMsg.style.display = 'block';
    event.target.style.display = 'none';
  }
}



// =====================================================
// 👤 MEMBER 3: PERSONALITY TEST NAVIGATION
// =====================================================

let currentStep = 1;
const totalSteps = 5;


// ── UPDATE PROGRESS BAR ───────────────────────
function updateProgress(step) {
  const fill = document.getElementById('progress-fill');

  if (fill) fill.style.width = ((step / totalSteps) * 100) + '%';

  for (let i = 1; i <= totalSteps; i++) {
    const dot = document.getElementById('dot-' + i);

    if (!dot) continue;

    dot.classList.remove('active', 'done');

    if (i < step) dot.classList.add('done');
    else if (i === step) dot.classList.add('active');
  }
}


// ── NEXT STEP ─────────────────────────────────
function nextStep(from) {
  const current = document.getElementById('step-' + from);
  const next = document.getElementById('step-' + (from + 1));

  if (current) current.classList.remove('active');
  if (next) next.classList.add('active');

  currentStep = from + 1;
  updateProgress(currentStep);

  const wrap = document.querySelector('.personality-form-wrap');
  if (wrap) window.scrollTo({ top: wrap.offsetTop - 80, behavior: 'smooth' });
}


// ── PREVIOUS STEP ─────────────────────────────
function prevStep(from) {
  const current = document.getElementById('step-' + from);
  const prev = document.getElementById('step-' + (from - 1));

  if (current) current.classList.remove('active');
  if (prev) prev.classList.add('active');

  currentStep = from - 1;
  updateProgress(currentStep);
}



// =====================================================
// 👤 MEMBER 4: PERSONALITY LOGIC + RESULT SYSTEM
// =====================================================

// ── GET INPUT VALUES ──────────────────────────
function getChecked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map(el => el.value);
}

function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
}


// ── SHOW RESULT ───────────────────────────────
function showResult() {

  const interests = getChecked('interest');
  const role = getRadio('role');
  const goal = getRadio('goal');
  const social = getRadio('social');

  let type, emoji, desc, clubs, courses, compat;

  // Personality Logic (conditions)
  if (interests.includes('coding') || goal === 'tech' || role === 'analyst') {
    type = 'The Innovator 💻';
    emoji = '🚀';
    desc = 'Logical and technical thinker...';

  } else {
    type = 'The Explorer 🌍';
    emoji = '🌟';
    desc = 'Curious and open-minded...';
  }

  // Hide steps
  for (let i = 1; i <= totalSteps; i++) {
    const s = document.getElementById('step-' + i);
    if (s) s.classList.remove('active');
  }

  // Show result section
  const resultSection = document.getElementById('result-section');
  if (resultSection) resultSection.style.display = 'block';
}


// ── RESET TEST ────────────────────────────────
function resetTest() {

  const resultSection = document.getElementById('result-section');

  if (resultSection) resultSection.style.display = 'none';

  currentStep = 1;

  const firstStep = document.getElementById('step-1');
  if (firstStep) firstStep.classList.add('active');

  updateProgress(1);

  document.querySelectorAll('input').forEach(el => {
    if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
    else el.value = '';
  });
}




let arr = [1,2,3,4,5,6]
document.querySelectorAll("div")

(=>())