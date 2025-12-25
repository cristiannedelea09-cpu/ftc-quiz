(function () {
  'use strict';

  const lessons = {
    Autonomous: {
      title: 'Autonomous',
      html: `
        <p>Autonomous is the match start when the robot runs on its own, using code and sensors.</p>
        <ul>
          <li>Robots score points by completing tasks set by the game rules.</li>
          <li>They must follow starting position and field boundary rules during this period.</li>
          <li>Sensors and simple, repeatable routines help the robot perform reliably.</li>
        </ul>
        <p class="muted">Tip: Simple, consistent routines work better than complex ones that break often.</p>
      `
    },

    TeleOp: {
      title: 'TeleOp',
      html: `
        <p>TeleOp is the part of the match when team members control the robot using controllers.</p>
        <ul>
          <li>Drivers must follow the rules for driver stations and allowed actions.</li>
          <li>Clear roles and good communication between drivers help the team perform better.</li>
          <li>Practice driving on a field like the competition field for consistency.</li>
        </ul>
      `
    },

    Endgame: {
      title: 'Endgame',
      html: `
        <p>The endgame is the short final part of the match with special tasks that give extra points.</p>
        <ul>
          <li>Endgame tasks (like parking or scoring in special goals) usually give extra points.</li>
          <li>Teams must decide whether the extra points are worth the risk in each match.</li>
        </ul>
      `
    },

    Penalties: {
      title: 'Penalties',
      html: `
        <p>Penalties are applied when rules are broken and can cost your team points.</p>
        <ul>
          <li>Examples: touching restricted parts of the field, going outside allowed areas, or unsafe robot actions.</li>
          <li>Referees call penalties — follow their instructions and the event rules to avoid them.</li>
        </ul>
      `
    },

    Roles: {
      title: 'Roles',
      html: `
        <p>Teams assign roles to organize who does what during matches.</p>
        <ul>
          <li>Driver/Operator: control the robot during TeleOp following the team plan.</li>
          <li>Coach: helps with strategy and talks to referees if allowed by the rules.</li>
          <li>Everyone on the team should know the rules and behave professionally at events.</li>
        </ul>
      `
    }
  };


  function ensureLearnSection() {
    let learn = document.getElementById('learn');
    if (!learn) {
      const main = document.querySelector('main') || document.body;
      learn = document.createElement('section');
      learn.id = 'learn';
      learn.setAttribute('aria-live', 'polite');
     
      main.insertBefore(learn, main.firstChild);
    }


    let nav = document.getElementById('lesson-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.id = 'lesson-nav';
      learn.appendChild(nav);
    }

    let content = document.getElementById('lesson-content');
    if (!content) {
      content = document.createElement('div');
      content.id = 'lesson-content';
      content.setAttribute('tabindex', '0');
      learn.appendChild(content);
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
      btn.className = 'lesson-btn';
      btn.dataset.topic = topic;
      btn.textContent = topic;
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

    const buttons = nav.querySelectorAll('.lesson-btn');
    buttons.forEach(b => b.classList.toggle('active', b.dataset.topic === topic));

    content.innerHTML = `\n      <h3>${lesson.title}</h3>\n      <div class="lesson-body">${lesson.html}</div>\n    `;
    content.focus();
    
    topics = Object.keys(lessons);
    const idx = topics.indexOf(topic);
    currentLessonIndex = idx >= 0 ? idx : 0;
    updateLessonControls();
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
