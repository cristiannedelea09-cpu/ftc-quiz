(function () {
  'use strict';

  const lessons = {
    Autonomous: {
      title: 'Autonomous',
      body: `
        <p>Autonomous is the part of the match when your robot runs without driver input. The robot follows pre-written code and uses sensors to interact with the field.</p>
        <ul>
          <li>Complete clear, rule-approved tasks to score points automatically.</li>
          <li>Start from approved positions and respect field boundaries.</li>
          <li>Favor simple, repeatable routines over complex ones that may fail.</li>
        </ul>
      `,
      tips: `
        <ul>
          <li>Test routines from exact starting positions every time.</li>
          <li>Use sensors for decisions but add safe fallbacks if a sensor fails.</li>
          <li>Focus on reliably scoring small amounts rather than risky huge plays.</li>
        </ul>
      `
    },

    TeleOp: {
      title: 'TeleOp',
      body: `
        <p>TeleOp is when drivers control the robot using controllers. This phase relies on teamwork, communication, and consistent driving.</p>
        <ul>
          <li>Follow rules for driver stations and allowed actions.</li>
          <li>Assign clear roles (driver, operator, spotter) to avoid confusion.</li>
          <li>Practice with the same field layout and game pieces used in competition.</li>
        </ul>
      `,
      tips: `
        <ul>
          <li>Run short practice drills focused on common match tasks.</li>
          <li>Keep control mappings simple and consistent between drivers.</li>
          <li>Use clear, short callouts for important moments (e.g., "Ready", "Go").</li>
        </ul>
      `
    },

    Endgame: {
      title: 'Endgame',
      body: `
        <p>The endgame is the short final period with special tasks that often award bonus points. Timing and reliability matter most here.</p>
        <ul>
          <li>Endgame tasks often give extra points but may be riskier.</li>
          <li>Teams should plan whether to attempt high-value plays based on match situation.</li>
        </ul>
      `,
      tips: `
        <ul>
          <li>Design a simple, repeatable endgame your team can perform under pressure.</li>
          <li>Practice the timing so drivers know when to start endgame actions.</li>
        </ul>
      `
    },

    Penalties: {
      title: 'Penalties',
      body: `
        <p>Penalties are applied when rules are broken and usually reduce your score. Avoiding penalties is often more important than risky point attempts.</p>
        <ul>
          <li>Common penalties include unsafe actions, leaving allowed areas, or interfering with other robots.</li>
          <li>Referees enforce the rulebook — always follow their instructions.</li>
        </ul>
      `,
      tips: `
        <ul>
          <li>Learn the penalty rules that affect your team most and train to avoid them.</li>
          <li>Perform quick safety checks before each match.</li>
          <li>When unsure, ask mentors or officials — don't guess during a match.</li>
        </ul>
      `
    },

    Roles: {
      title: 'Roles',
      body: `
        <p>Roles organize who does what during practice and matches. Common roles include drivers, coach, and support staff for setup and inspections.</p>
        <ul>
          <li>Driver/Operator: control the robot during TeleOp following team strategy.</li>
          <li>Coach: manages strategy, communicates with alliance partners, and helps with match planning.</li>
          <li>Support: handles robot setup, inspections, and safety checks between matches.</li>
        </ul>
      `,
      tips: `
        <ul>
          <li>Practice clear, short communication and callouts.</li>
          <li>Rotate roles during practice so backups gain experience.</li>
          <li>Keep a calm, professional attitude at events to help the team perform.</li>
        </ul>
      `
    }
  };

  const STORAGE_KEY = 'learn.completed';
  function loadCompletedSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }
  let completedSet = loadCompletedSet();
  function saveCompletedSet() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedSet)));
    } catch (e) {
    }
  }
  function markCompleted(topic) {
    if (!topic) return;
    if (!completedSet.has(topic)) {
      completedSet.add(topic);
      saveCompletedSet();
      const btn = document.querySelector(`[data-topic="${CSS.escape(topic)}"]`);
      if (btn) {
        const check = btn.querySelector('.lesson-check');
        if (check) check.textContent = '✓';
      }
    }
  }


  function ensureLearnSection() {
    let learn = document.getElementById('learn-section') || document.getElementById('learn');
    if (!learn) {
      const main = document.querySelector('main') || document.body;
      learn = document.createElement('section');
      learn.id = 'learn';
      learn.setAttribute('aria-live', 'polite');
      main.insertBefore(learn, main.firstChild);
    }

    let nav = document.getElementById('learn-menu') || document.getElementById('lesson-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.id = 'lesson-nav';
      learn.appendChild(nav);
    }

    let content = document.getElementById('learn-content') || document.getElementById('lesson-content');
    if (!content) {
      content = document.createElement('div');
      content.id = 'lesson-content';
      content.setAttribute('tabindex', '0');
      learn.appendChild(content);
    } else {
      if (!content.hasAttribute('tabindex')) content.setAttribute('tabindex', '0');
    }

    let controls = document.getElementById('lesson-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.id = 'lesson-controls';
      controls.className = 'lesson-controls';
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.id = 'lesson-prev';
      prev.textContent = 'Previous';
      prev.className = 'lesson-nav-btn';
      const next = document.createElement('button');
      next.type = 'button';
      next.id = 'lesson-next';
      next.textContent = 'Next';
      next.className = 'lesson-nav-btn';
      controls.appendChild(prev);
      controls.appendChild(next);
      learn.appendChild(controls);
    }

    return { learn, nav, content };
  }


  function buildNav(navEl, selectedTopic) {
    navEl.innerHTML = '';
    topics = Object.keys(lessons);
    Object.keys(lessons).forEach(topic => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lesson-btn learn-topic-btn';
      btn.dataset.topic = topic;
      btn.textContent = topic;
      const check = document.createElement('span');
      check.className = 'lesson-check';
      check.textContent = completedSet.has(topic) ? '✓' : '';
      check.setAttribute('aria-hidden', 'true');
      btn.appendChild(check);
      if (topic === selectedTopic) btn.classList.add('active');
      btn.addEventListener('click', () => loadLesson(topic));
      navEl.appendChild(btn);
    });
  }

  let topics = Object.keys(lessons);
  let currentLessonIndex = 0;

  function loadLesson(topic) {
    const { content, nav } = ensureLearnSection();
    const lesson = lessons[topic];
    if (!lesson) {
      content.innerHTML = `<p class="muted">Lesson not found: ${topic}</p>`;
      return;
    }

    const buttons = nav.querySelectorAll('.learn-topic-btn, .lesson-btn');
    buttons.forEach(b => {
      if (b.dataset.topic === topic) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    content.innerHTML = `\n      <h3>${lesson.title}</h3>\n      <div class="lesson-body">${lesson.body}</div>\n      <div class="lesson-tips">\n        <h4>Tips</h4>\n        <div class="tips-body muted">${lesson.tips}</div>\n      </div>\n    `;
    content.focus();
    
    topics = Object.keys(lessons);
    const idx = topics.indexOf(topic);
    currentLessonIndex = idx >= 0 ? idx : 0;
    updateLessonControls();
    markCompleted(topic);
    if (window.setContextTitle) {
      window.setContextTitle(`Learn → ${lesson.title}`);
    }
  }

  function updateLessonControls() {
    const prev = document.getElementById('lesson-prev');
    const next = document.getElementById('lesson-next');
    if (!prev || !next) return;
    prev.disabled = currentLessonIndex <= 0;
    next.disabled = currentLessonIndex >= topics.length - 1;
  }

  function nextLesson() {
    if (currentLessonIndex < topics.length - 1) {
      loadLesson(topics[currentLessonIndex + 1]);
    }
  }

  function prevLesson() {
    if (currentLessonIndex > 0) {
      loadLesson(topics[currentLessonIndex - 1]);
    }
  }

  function initLessons(defaultTopic = 'Autonomous') {
    const { nav, content } = ensureLearnSection();
    buildNav(nav, defaultTopic);
    if (!Object.prototype.hasOwnProperty.call(lessons, defaultTopic)) {
      const first = Object.keys(lessons)[0];
      loadLesson(first);
    } else {
      loadLesson(defaultTopic);
    }
    const prev = document.getElementById('lesson-prev');
    const next = document.getElementById('lesson-next');
    if (prev && next) {
      prev.removeEventListener('click', prevLesson);
      next.removeEventListener('click', nextLesson);
      prev.addEventListener('click', prevLesson);
      next.addEventListener('click', nextLesson);
    }
  }

  window.learnLessons = {
    init: initLessons,
    load: loadLesson,
    topics: Object.keys(lessons)
  };

  document.addEventListener('DOMContentLoaded', () => initLessons());

})();
