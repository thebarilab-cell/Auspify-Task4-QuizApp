import './style.css';
import { QUESTIONS, shuffle, scoreAnswers } from './quiz.js';

const app = document.querySelector('#app');
const letters = ['A', 'B', 'C', 'D'];
let state = { screen: 'welcome', questions: [], index: 0, answers: [], selected: null, locked: false, error: '' };

function startQuiz() {
  state = { screen: 'quiz', questions: shuffle(QUESTIONS), index: 0, answers: Array(QUESTIONS.length).fill(null), selected: null, locked: false, error: '' };
  render();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function renderWelcome() {
  app.innerHTML = `<section class="welcome layout-grid"><div class="welcome-copy">
    <div class="eyebrow"><span class="eyebrow-line"></span> THE WEB DEVELOPMENT QUIZ <span class="eyebrow-count">NO. 04</span></div>
    <h1>Good websites<br />start with <span>good questions.</span></h1>
    <p class="intro">A quick check-in on the craft behind the web. Explore the fundamentals, trust what you know, and pick up something new along the way.</p>
    <div class="welcome-actions"><button class="button button-primary" data-action="start">Start the quiz <span aria-hidden="true">↗</span></button><span class="time-note"><span aria-hidden="true">◷</span> 18 questions <i>·</i> about 5 minutes</span></div>
    <div class="topic-list"><span>IN THIS EDITION</span><div><b>HTML</b><b>CSS</b><b>JAVASCRIPT</b><b>WEB BASICS</b></div></div>
  </div><aside class="hero-art" aria-label="Abstract web design illustration"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="art-label label-top">A LITTLE KNOWLEDGE<br />GOES A LONG WAY</div><div class="art-card card-back"><span class="mini-dots">● ● ●</span><span class="code-row long"></span><span class="code-row medium"></span><span class="code-row short"></span></div><div class="art-card card-front"><div class="card-topline"><span class="mini-dots">● ● ●</span><span>index.html</span></div><div class="code-art"><span class="code-pink">&lt;section</span> <span class="code-lime">class</span>=<span class="code-yellow">"you"</span><span class="code-pink">&gt;</span><br /><span class="indent code-pink">&lt;h1&gt;</span><span class="code-white">Keep exploring.</span><span class="code-pink">&lt;/h1&gt;</span><br /><span class="indent code-pink">&lt;p&gt;</span><span class="code-white">You’ve got this.</span><span class="code-pink">&lt;/p&gt;</span><br /><span class="code-pink">&lt;/section&gt;</span></div><div class="card-footer"><span class="live-dot"></span> BUILT FOR THE CURIOUS</div></div><div class="art-sticker">18<span>QUESTIONS</span></div><div class="art-label label-bottom">AUSPIFY<br />TECHNOLOGIES <span>✳</span></div></aside></section>
    <section class="welcome-bottom"><div class="bottom-line"></div><p>Curiosity is a <em>superpower.</em> Put yours to work.</p><span>01 — 04</span></section>`;
}

function renderQuiz() {
  const q = state.questions[state.index];
  const progress = (state.index / state.questions.length) * 100;
  const isLast = state.index === state.questions.length - 1;
  app.innerHTML = `<section class="quiz-wrap"><div class="quiz-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> YOUR KNOWLEDGE, IN MOTION</div><h1>Let’s see what <span>you know.</span></h1></div><button class="text-button" data-action="quit">Exit quiz <span aria-hidden="true">×</span></button></div>
    <div class="progress-meta"><span>QUESTION <strong>${String(state.index + 1).padStart(2, '0')}</strong> <i>/</i> ${String(state.questions.length).padStart(2, '0')}</span><span>${Math.round(progress)}% COMPLETE</span></div><div class="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow="${state.index}" aria-valuemin="0" aria-valuemax="${state.questions.length}"><span style="width:${progress}%"></span></div>
    <article class="question-card" key="question-${state.index}"><div class="question-kicker"><span class="category-pill">${escapeHtml(q.category)}</span><span class="question-id">Q${String(state.index + 1).padStart(2, '0')}</span></div><h2>${escapeHtml(q.question)}</h2><p class="choose-note">Choose one answer to continue.</p>
    <div class="options" role="radiogroup" aria-label="Answer options">${q.options.map((option, i) => { let cls = 'option'; if (state.locked && i === q.answer) cls += ' correct'; if (state.locked && i === state.selected && i !== q.answer) cls += ' incorrect'; if (state.selected === i && !state.locked) cls += ' selected'; return `<button class="${cls}" role="radio" aria-checked="${state.selected === i}" data-action="answer" data-index="${i}" ${state.locked ? 'disabled' : ''}><span class="option-letter">${letters[i]}</span><span class="option-text">${escapeHtml(option)}</span><span class="option-mark" aria-hidden="true">${state.locked && i === q.answer ? '✓' : state.locked && i === state.selected ? '×' : '↗'}</span></button>`; }).join('')}</div>
    ${state.error ? `<p class="validation-message" role="alert">${state.error}</p>` : ''}${state.locked ? `<div class="feedback ${state.selected === q.answer ? 'feedback-correct' : 'feedback-incorrect'}" role="status"><span>${state.selected === q.answer ? 'Nice work — that’s right.' : 'Not quite — here’s the idea.'}</span><p>${escapeHtml(q.explanation)}</p></div>` : ''}
    <div class="question-footer"><span class="keyboard-hint">TIP <i>Use Tab to move and Enter to select</i></span><button class="button button-primary next-button" data-action="next" ${state.locked ? '' : 'aria-describedby="selection-hint"'}>${state.locked ? (isLast ? 'See my results' : 'Next question') : 'Check answer'} <span aria-hidden="true">${state.locked && isLast ? '↗' : '→'}</span></button><span id="selection-hint" class="sr-only">Select an answer before continuing.</span></div></article><div class="quiz-footnote"><span>TAKE YOUR TIME. THERE’S NO TIMER.</span><span>MADE WITH CURIOSITY <i>✳</i></span></div></section>`;
}

function renderResults() {
  const score = scoreAnswers(state.questions, state.answers);
  const pct = Math.round((score / state.questions.length) * 100);
  const message = pct >= 85 ? ['Outstanding work.', 'You’ve got a strong grasp of the web’s building blocks. Keep making things.'] : pct >= 60 ? ['A solid foundation.', 'You know your way around the essentials. A little more practice will take you further.'] : ['Every expert starts somewhere.', 'You’ve got the curiosity. Keep exploring these foundations and give it another go.'];
  const circumference = 2 * Math.PI * 55;
  app.innerHTML = `<section class="results-wrap"><div class="eyebrow"><span class="eyebrow-line"></span> THAT’S A WRAP <span class="eyebrow-count">18 / 18</span></div><div class="results-main"><div class="score-ring" style="--score:${pct}%"><svg viewBox="0 0 128 128" aria-hidden="true"><circle class="ring-bg" cx="64" cy="64" r="55"/><circle class="ring-value" cx="64" cy="64" r="55" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference * (1 - pct / 100)}"/></svg><div><strong>${pct}<small>%</small></strong><span>YOUR SCORE</span></div></div><div class="results-copy"><span class="score-caption">${score} <i>/</i> ${state.questions.length} CORRECT</span><h1>${message[0]}</h1><p>${message[1]}</p><div class="results-actions"><button class="button button-primary" data-action="review">Review answers <span aria-hidden="true">↗</span></button><button class="button button-secondary" data-action="restart">Try again <span aria-hidden="true">↻</span></button></div></div></div><div class="results-note"><span class="note-star">✳</span><p>Knowledge grows every time you <em>show up.</em><br /><span>Thanks for playing along with Auspify Technologies.</span></p><span class="note-code">FIN. / 04</span></div></section>`;
}

function renderReview() {
  const score = scoreAnswers(state.questions, state.answers);
  const cards = state.questions.map((q, i) => {
    const chosen = state.answers[i]; const correct = chosen === q.answer;
    return `<article class="review-card ${correct ? 'review-right' : 'review-wrong'}"><div class="review-card-top"><span class="question-id">Q${String(i + 1).padStart(2, '0')}</span><span class="review-result">${correct ? '✓ CORRECT' : '× REVIEW'}</span></div><h2>${escapeHtml(q.question)}</h2><div class="review-answers"><div class="review-answer ${correct ? 'your-answer right-answer' : 'your-answer wrong-answer'}"><span>YOUR ANSWER</span><p>${chosen === null ? 'No answer selected' : escapeHtml(q.options[chosen])}</p></div>${!correct ? `<div class="review-answer correct-answer"><span>CORRECT ANSWER</span><p>${escapeHtml(q.options[q.answer])}</p></div>` : ''}</div><p class="review-explanation">${escapeHtml(q.explanation)}</p></article>`;
  }).join('');
  app.innerHTML = `<section class="review-wrap"><div class="review-heading"><button class="text-button" data-action="results">← Back to results</button><div class="eyebrow"><span class="eyebrow-line"></span> A CLOSER LOOK</div><h1>Review your <span>answers.</span></h1><p>You got <strong>${score} out of ${state.questions.length}</strong> right. Here’s what happened, question by question.</p></div><div class="review-list">${cards}</div><div class="review-end"><span>YOU MADE IT THROUGH ALL ${state.questions.length} QUESTIONS.</span><button class="button button-primary" data-action="restart">Try again <span aria-hidden="true">↻</span></button></div></section>`;
}

function render() {
  if (!app) return;
  if (state.screen === 'welcome') renderWelcome();
  else if (state.screen === 'quiz') renderQuiz();
  else if (state.screen === 'results') renderResults();
  else renderReview();
  app.focus({ preventScroll: true });
}

app?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'start' || action === 'restart') startQuiz();
  if (action === 'quit') { state = { screen: 'welcome', questions: [], index: 0, answers: [], selected: null, locked: false, error: '' }; render(); }
  if (action === 'answer' && !state.locked) { state.selected = Number(button.dataset.index); state.error = ''; render(); document.querySelector(`[data-action="answer"][data-index="${state.selected}"]`)?.focus(); }
  if (action === 'next') {
    if (!state.locked && state.selected === null) { state.error = 'Choose an answer before moving on.'; render(); document.querySelector('.validation-message')?.scrollIntoView({ block: 'nearest' }); return; }
    if (!state.locked) { state.answers[state.index] = state.selected; state.locked = true; render(); return; }
    if (state.index === state.questions.length - 1) state.screen = 'results';
    else { state.index += 1; state.selected = null; state.locked = false; state.error = ''; }
    render();
  }
  if (action === 'review') { state.screen = 'review'; render(); }
  if (action === 'results') { state.screen = 'results'; render(); }
});

app?.addEventListener('keydown', (event) => {
  if (state.screen !== 'quiz' || state.locked || event.altKey || event.ctrlKey || event.metaKey) return;
  const key = event.key.toLowerCase();
  const index = /^[1-4]$/.test(key) ? Number(key) - 1 : letters.findIndex(letter => letter.toLowerCase() === key);
  if (index >= 0 && index < 4) { state.selected = index; state.error = ''; render(); document.querySelector(`[data-action="answer"][data-index="${index}"]`)?.focus(); }
});

render();
