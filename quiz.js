function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questionBank = {
  'Human Player': [
    {
      question: 'What should you do if a robot becomes a hazard on the field?',
      options: ['Ignore it', 'Push it off the field', 'Inform a referee', 'Attempt to fix it yourself'],
      correctAnswer: 2,
      explanation: 'Tell a referee immediately and do not enter the field — referees will stop play or remove the robot safely.'
    },
    {
      question: 'Who may be a Human Player during a match?',
      options: ['Any spectator', 'Only registered team members', 'Referees', 'Only the coach'],
      correctAnswer: 1,
      explanation: 'Human Players must be registered team members and follow the event rules about allowed actions.'
    },
    {
      question: 'What is a common allowed location for handing a game piece to your robot?',
      options: ['Anywhere behind the audience', 'From the Human Player station or designated drop zone', 'From inside the field', 'From the opposing alliance area'],
      correctAnswer: 1,
      explanation: 'Human Players may transfer pieces only from the designated Human Player station or an approved zone; entering the field is usually prohibited.'
    },
    {
      question: 'Can a Human Player enter the field to retrieve their robot during a match?',
      options: ['Yes, anytime', 'Yes, but only during Autonomous', 'No — never unless directed by a referee or event staff', 'Only during a timeout'],
      correctAnswer: 2,
      explanation: 'Entering the field during play is not allowed for safety; only referees or event staff may authorize entry.'
    },
    {
      question: 'If a Human Player places a game piece incorrectly and it blocks scoring, what should they do?',
      options: ['Fix it themselves by entering the field', 'Ask a referee to correct the placement', 'Ignore it', 'Remove the piece and throw it back'],
      correctAnswer: 1,
      explanation: 'Human Players should notify a referee; referees will apply the correct procedure rather than players entering the field.'
    },
    {
      question: 'Are Human Players allowed to use personal phones or tablets to control or assist the robot during a match?',
      options: ['Yes, if Wi‑Fi is available', 'Yes, with coach permission', 'No, unless the game manual explicitly permits that device', 'Only during Autonomous'],
      correctAnswer: 2,
      explanation: 'Using unauthorized devices to control or assist a robot is prohibited unless the rules specifically allow it.'
    },
    {
      question: 'What happens if a Human Player intentionally interferes with an opponent robot?',
      options: ['Nothing', 'The Human Player gets a warning only', 'A foul or penalty is assessed to the offending alliance, possibly increased for severe cases', 'The opposing team is disqualified automatically'],
      correctAnswer: 2,
      explanation: 'Intentional interference is penalized — referees assess fouls or technical penalties and can escalate for repeated or severe infractions.'
    },
    {
      question: 'When are Human Player substitutions normally allowed?',
      options: ['At any time during the match', 'Only between matches or as event procedures allow', 'During Autonomous', 'During the last 30 seconds only'],
      correctAnswer: 1,
      explanation: 'Substitutions are typically only allowed between matches; emergency replacements during a match require event staff approval.'
    },
    {
      question: 'If a Human Player accidentally steps into a restricted area for a moment, what is the usual referee response?',
      options: ['Immediate disqualification', 'No action ever', 'A warning or minor foul depending on circumstances; repeated or deliberate entries receive stronger penalties', 'Opponent awarded all points'],
      correctAnswer: 2,
      explanation: 'Accidental minor infractions often get a warning or minor foul; deliberate or repeated breaches lead to harsher penalties.'
    },
    {
      question: 'Are Human Players allowed to touch field elements not controlled by their team?',
      options: ['Yes, anytime', 'Yes, if it benefits their team', 'Only if the specific game rules or referees allow it', 'Only after the match ends'],
      correctAnswer: 2,
      explanation: 'Touching opponent field elements is usually restricted; do not move or remove opponent objects unless rules or referees permit.'
    },
    {
      question: 'Is wearing personal protective equipment (PPE), like safety glasses, required for Human Players?',
      options: ['No, PPE is optional', 'Yes, when in specified areas such as the field perimeter or pits', 'Only for drivers', 'Only for coaches'],
      correctAnswer: 1,
      explanation: 'Events require PPE in certain areas for safety — teams and Human Players must follow the event and Game Manual rules.'
    },
    {
      question: 'If a Human Player intentionally obscures an opponent driver’s view, what is the likely consequence?',
      options: ['No consequence', 'A minor encouragement', 'A foul or unsportsmanlike conduct penalty, possibly stronger sanctions', 'They gain extra points'],
      correctAnswer: 2,
      explanation: 'Deliberate interference with opponent drivers is unsportsmanlike and is penalized by referees.'
    },
    {
      question: 'May a Human Player reposition their robot by grabbing it during TeleOp?',
      options: ['Yes, anytime', 'Yes, if it helps scoring', 'No — physical manipulation of the robot during play is generally not allowed', 'Only with coach permission'],
      correctAnswer: 2,
      explanation: 'Physically moving or manipulating the robot during play is typically prohibited; follow referee guidance for repairs.'
    },
    {
      question: 'Can a Human Player intentionally remove an opponent game piece from the field?',
      options: ['Yes, if it blocks your robot', 'Only if a referee tells you to', 'No — removing opponent pieces is usually a penalty', 'Yes, during Autonomous'],
      correctAnswer: 2,
      explanation: 'Removing opponent pieces is interference and generally results in fouls or penalties.'
    },
    {
      question: 'During post‑match reset, who should Human Players follow for instructions about moving field elements?',
      options: ['Other teams', 'Field staff and referees', 'Anyone in the audience', 'Team parents'],
      correctAnswer: 1,
      explanation: 'Follow instructions from field staff and referees when resetting or handling field elements; do not act independently.'
    },
    {
      question: 'If a Human Player notices broken field equipment that affects scoring, what should they do?',
      options: ['Try to fix it themselves', 'Continue playing', 'Report it to a referee immediately', 'Move the equipment to a safer place'],
      correctAnswer: 2,
      explanation: 'Report equipment failures to a referee so event staff can repair or adjust scoring as needed.'
    },
    {
      question: 'Are Human Players allowed to use tools or modify the robot during a match from the driver station?',
      options: ['Yes, tools are allowed', 'Yes, if the coach agrees', 'No — in‑match modifications that change robot configuration are typically prohibited', 'Only during Autonomous'],
      correctAnswer: 2,
      explanation: 'Making in‑match modifications that change robot behavior is generally not allowed; emergency procedures are managed by referees.'
    },
    {
      question: 'What is the correct action when a Human Player is unsure whether an action is allowed?',
      options: ['Do it and hope for the best', 'Ask a teammate to do it', 'Ask a referee or event staff before acting', 'Wait until the end of the match and then act'],
      correctAnswer: 2,
      explanation: 'If unsure, consult a referee or event staff — they will tell you whether an action is permitted and avoid penalties.'
    },
    {
      question: 'If a Human Player causes damage to the field or equipment, who is responsible?',
      options: ['The opposing team', 'The event staff', 'The Human Player’s team (may be charged or penalized)', 'No one'],
      correctAnswer: 2,
      explanation: 'Teams are responsible for damage caused by their members; referees and event staff will apply rules and possible fees or penalties.'
    }
  ],

  Driver: [
    {
      question: 'Intentionally grabbing an opponent robot during TeleOp is:',
      options: ['Encouraged', 'Allowed if defending', 'A penalty (foul/technical)', 'A scoring strategy'],
      correctAnswer: 2,
      explanation: 'Physically grabbing or restraining an opponent robot is illegal and is penalized by referees.'
    },
    {
      question: 'If a driver leaves the driver station mid‑match without permission, the likely result is:',
      options: ['No effect', 'A minor warning only', 'A penalty or disqualification depending on circumstances', 'Extra time granted to the team'],
      correctAnswer: 2,
      explanation: 'Leaving the driver station can compromise safety and is subject to penalties or stronger sanctions based on event rules.'
    },
    {
      question: 'Using a phone or personal device to control the robot during a match without authorization is:',
      options: ['Permitted', 'Allowed during Autonomous', 'Prohibited and may result in a penalty', 'Allowed if coach approves'],
      correctAnswer: 2,
      explanation: 'Unauthorized devices used for control or assistance violate control and communications rules and are penalized.'
    },
    {
      question: 'Deliberately blocking an opponent driver’s view from the driver station is:',
      options: ['Sportsmanlike', 'Allowed when defending', 'Unsportsmanlike conduct and penalized', 'A way to earn bonus points'],
      correctAnswer: 2,
      explanation: 'Obstructing opponents or acting unsportsmanlike is penalized; teams must respect fair play and safety.'
    },
    {
      question: 'If a driver purposefully throws a game element onto the field to disrupt play, referees should:',
      options: ['Ignore it', 'Assess a penalty against that alliance', 'Award the element to the offending team', 'Give an extra timeout'],
      correctAnswer: 1,
      explanation: 'Deliberate interference with game pieces is penalized; referees apply fouls or technical penalties.'
    },
    {
      question: 'Driving a robot into the audience area or beyond field boundaries results in:',
      options: ['Extra points', 'No consequence', 'Immediate stop and likely penalty', 'Allowing the replay of the match'],
      correctAnswer: 2,
      explanation: 'Robots must remain within field boundaries; leaving the field is unsafe and typically results in stoppage and penalty.'
    },
    {
      question: 'Intentionally disabling an opponent’s communications (jamming) is:',
      options: ['A common tactic', 'Allowed with consent', 'Illegal and grounds for disqualification', 'Allowed during Autonomous'],
      correctAnswer: 2,
      explanation: 'Interfering with communications or attempting to disable opponent electronics is forbidden and can lead to disqualification.'
    },
    {
      question: 'If a driver repeatedly commits the same minor infraction after warnings, referees will likely:',
      options: ['Keep warning them', 'Escalate to stronger penalties', 'Ignore subsequent infractions', 'Give team bonus points'],
      correctAnswer: 1,
      explanation: 'Repeated infractions typically lead to escalating penalties, up to match penalties or disqualification.'
    },
    {
      question: 'A driver intentionally tries to detach parts of their robot during play to change scoring — this is:',
      options: ['Allowed', 'Encouraged', 'A rules violation and penalized', 'Ignored if quick'],
      correctAnswer: 2,
      explanation: 'Altering the robot during play to affect scoring or the field is usually illegal and penalized.'
    },
    {
      question: 'Physically entering the field to push your robot after it is stuck is:',
      options: ['Allowed for all teams', 'Allowed only when instructed by referees', 'Allowed during Autonomous', 'Never allowed'],
      correctAnswer: 1,
      explanation: 'Team members should not enter the field unless directed by a referee or event staff to ensure safety and fairness.'
    },
    {
      question: 'If a driver intentionally interferes with a scoring mechanism (e.g., blocks a sensor), referees will:',
      options: ['Credit the team', 'Assess penalties or correct scoring', 'Add extra time', 'Ignore it'],
      correctAnswer: 1,
      explanation: 'Interfering with scoring devices is illegal; referees will correct score and assess penalties as appropriate.'
    },
    {
      question: 'During TeleOp, handing objects to the robot from outside the allowed Human Player station is:',
      options: ['Permitted', 'Allowed only to the opposing alliance', 'A rules violation and penalized', 'Encouraged by referees'],
      correctAnswer: 2,
      explanation: 'Transfers must follow the game rules and designated zones; unauthorized handing of pieces is a penalty.'
    },
    {
      question: 'If a driver knowingly uses an illegal modification to gain advantage, consequences include:',
      options: ['A bonus', 'Match replay only', 'Penalties, possible disqualification, and removal from event', 'Extra time to fix it'],
      correctAnswer: 2,
      explanation: 'Using illegal modifications is a serious breach that can result in strong penalties up to disqualification.'
    },
    {
      question: 'Obstructing a referee or ignoring referee instructions during a match results in:',
      options: ['No impact', 'Possible penalty or match forfeit', 'Extra coaching time', 'Points awarded to your team'],
      correctAnswer: 1,
      explanation: 'Referees must be respected; ignoring or obstructing them can lead to penalties or stronger sanctions.'
    },
    {
      question: 'If a driver attempts to gain advantage by deliberately creating a hazardous situation, referees will:',
      options: ['Award the team', 'Stop the match and assess penalties', 'Allow the hazard', 'Give a warning only'],
      correctAnswer: 1,
      explanation: 'Creating hazards is unacceptable; referees will stop play and apply penalties and event consequences.'
    },
    {
      question: 'Intentionally removing an opponent’s game piece from a scoring area during play is:',
      options: ['Part of strategy', 'Allowed if accidental', 'A penalty against the offending alliance', 'Encouraged by the rules'],
      correctAnswer: 2,
      explanation: 'Removing opponent pieces to prevent scoring is interference and is penalized.'
    },
    {
      question: 'Rapidly pushing into an opponent robot to pin it without attempting to score is likely to be called:',
      options: ['A ramp action', 'A tactical move', 'A penalty for dangerous or obstructive contact', 'A scoring maneuver'],
      correctAnswer: 2,
      explanation: 'Excessive or dangerous contact intended to disable or pin an opponent is penalized to protect safety and fairness.'
    },
    {
      question: 'Using someone off your team to help operate or repair the robot during a match is:',
      options: ['Allowed with permission', 'Allowed if quick', 'Prohibited and may result in penalties', 'Required by rules'],
      correctAnswer: 2,
      explanation: 'Only authorized team members and event staff may work on or operate the robot; outside assistance is not allowed.'
    },
    {
      question: 'If a driver intentionally blocks sensors or vision systems on an opponent robot (e.g., shining lights), that behavior is:',
      options: ['Allowed', 'A valid defense', 'An illegal interference and penalized', 'Recommended'],
      correctAnswer: 2,
      explanation: 'Interfering with opponent electronics or sensors is illegal and can lead to penalties or disqualification.'
    },
    {
      question: 'Deliberately stalling the match or refusing to resume play after instructions is:',
      options: ['A strategy to win', 'Allowed during timeouts', 'Subject to penalties and possible forfeit', 'Ignored by referees'],
      correctAnswer: 2,
      explanation: 'Refusing to follow referee instructions or stalling play disrupts competition and will be penalized.'
    }
  ],

  Coach: [
    {
      question: 'What is a coach allowed to do during a match?',
      options: ['Directly control the robot', 'Assist with strategy and speak to referees if allowed', 'Operate game elements', 'Enter the field'],
      correctAnswer: 1,
      explanation: 'Coaches help with strategy and may talk to referees if event rules allow. They do not directly control the robot during matches.'
    }
  ],

  'Robot Inspection': [
    {
      question: 'A robot has exposed sharp edges that could injure volunteers — during inspection this is:',
      options: ['Legal if taped', 'Illegal and must be fixed before competing', 'Allowed if only small', 'Ignored by inspectors'],
      correctAnswer: 1,
      explanation: 'Sharp edges that can cause injury fail inspection; teams must remedy safety hazards before being cleared.'
    },
    {
      question: 'If a robot exceeds the size or weight limits in the Game Manual, the inspection result is:',
      options: ['Allowed for one match', 'Illegal until corrected', 'Given a temporary waiver automatically', 'Ignored if close'],
      correctAnswer: 1,
      explanation: 'Robots must meet size and weight requirements; exceeding limits is a rules violation until adjusted and re‑inspected.'
    },
    {
      question: 'An exposed battery connection that could short is found — inspector should:',
      options: ['Cover with tape and pass', 'Pass and note it later', 'Fail inspection until fixed', 'Replace with a different battery later'],
      correctAnswer: 2,
      explanation: 'Electrical hazards must be addressed before a robot is allowed to compete; inspectors will not pass a robot with unsafe wiring.'
    },
    {
      question: 'Teams are allowed to use non‑standard materials that provide unfair advantage if not listed in the manual:',
      options: ['Yes, always', 'Only if lightweight', 'No — illegal modifications must follow rules', 'Only during practice matches'],
      correctAnswer: 2,
      explanation: 'Materials or modifications that violate the construction rules or give an unfair advantage are not allowed and may fail inspection.'
    },
    {
      question: 'A robot uses a motor that is not on the approved motor list. During inspection this is:',
      options: ['Allowed if similar', 'Illegal until replaced with an approved motor', 'Ignored', 'Permitted with a fee'],
      correctAnswer: 1,
      explanation: 'Parts lists are enforced; non‑approved motors or electronics must be replaced with allowed components unless the manual allows exceptions.'
    },
    {
      question: 'If a robot emits excessive smoke or smells of burning during inspection, inspectors should:',
      options: ['Proceed quickly', 'Fail inspection and require fixes', 'Allow it if brief', 'Recommend different batteries'],
      correctAnswer: 1,
      explanation: 'Signs of overheating or burning indicate unsafe electrical or mechanical faults — robots are not passed until fixed.'
    },
    {
      question: 'Loose parts that may detach during play are discovered — inspector will:',
      options: ['Ignore if small', 'Require secure attachment before passing', 'Tape them loosely', 'Allow removal by Human Player'],
      correctAnswer: 1,
      explanation: 'Anything likely to detach and damage field or robots must be secured; inspection ensures all parts are safely attached.'
    },
    {
      question: 'A robot uses a custom pneumatic system not conforming to safety regs — this is:',
      options: ['Allowed if effective', 'Illegal until brought into compliance', 'Permitted outdoors only', 'Allowed with extra inspection fee'],
      correctAnswer: 1,
      explanation: 'Pneumatic systems must meet safety specifications; non‑compliant systems must be modified to pass inspection.'
    },
    {
      question: 'If an inspection finds the team has used prohibited adhesives that permanently alter field elements, the robot is:',
      options: ['Passed with note', 'Failed until adhesives are removed', 'Allowed for practice only', 'Given a penalty instead of failing'],
      correctAnswer: 1,
      explanation: 'Prohibited adhesives or coatings that could damage field elements are not allowed; teams must remove them to pass inspection.'
    },
    {
      question: 'Using an unshielded high‑voltage power source on the robot is:',
      options: ['Acceptable if labeled', 'Allowed with inspector discretion', 'Unsafe and not allowed', 'Permitted for advanced teams'],
      correctAnswer: 2,
      explanation: 'High‑voltage or unshielded power sources present safety risks and are not permitted under inspection rules.'
    },
    {
      question: 'If a team modifies a control system after passing inspection, they must:',
      options: ['Do nothing', 'Notify inspectors and get re‑inspected if changes affect compliance', 'Only notify opposing teams', 'Wait until the next season'],
      correctAnswer: 1,
      explanation: 'Major changes after inspection require re‑inspection to ensure ongoing compliance with safety and rules.'
    },
    {
      question: 'Wiring color codes are incorrect but connections are safe — inspectors will:',
      options: ['Ignore color', 'Require labeling or correction for clarity', 'Fail the team immediately', 'Replace wiring themselves'],
      correctAnswer: 1,
      explanation: 'While color can be a minor issue, inspectors often require clear labeling or correction to avoid confusion and ensure safety.'
    },
    {
      question: 'A robot contains unsecured liquids that could spill on electronics — inspection outcome is:',
      options: ['Allowed if sealed', 'Fail until liquids removed or secured', 'Allowed with a towel', 'Permitted only in practice area'],
      correctAnswer: 1,
      explanation: 'Liquids near electronics pose a hazard; teams must remove or properly secure any liquid containers before competing.'
    },
    {
      question: 'Use of live animals as part of the robot mechanism during competition is:',
      options: ['Allowed with care', 'Allowed if supervised', 'Prohibited', 'Allowed in special exhibition matches'],
      correctAnswer: 2,
      explanation: 'Using animals is not allowed in competition for safety and ethical reasons; robots must not include live animals.'
    },
    {
      question: 'If inspection shows a robot’s software includes prohibited autonomous behavior, inspectors will:',
      options: ['Request code comments', 'Require software changes and re‑inspection', 'Allow it with a warning', 'Remove the robot from the event permanently'],
      correctAnswer: 1,
      explanation: 'Prohibited software behavior (e.g., code enabling illegal actions) must be corrected; teams may need to update code and be re‑inspected.'
    }
  ]
};

let currentIndex = 0;
let score = 0;

const scoreValueEl = document.getElementById('score-value');
const questionEl = document.getElementById('question');
const answerBtns = Array.from(document.querySelectorAll('.answer-btn'));
const nextBtn = document.getElementById('next-btn');
const resultScreen = document.getElementById('result-screen');
const finalScoreValue = document.getElementById('final-score-value');
const restartBtn = document.getElementById('restart-btn');
const quizSection = document.getElementById('quiz');
const explanationEl = document.getElementById('explanation');
const categoryBtns = Array.from(document.querySelectorAll('.category-btn'));

let selectedCategory = 'All';
let activeQuestions = [];

function getAllQuestions() {
  return Object.values(questionBank).flat();
}

function prepareQuiz(category = 'All', count = 10) {
  let pool = category === 'All' ? getAllQuestions() : (questionBank[category] || []).slice();

  pool = pool.map(q => ({ ...q, options: q.options.slice() }));

  shuffle(pool);
  const picked = pool.slice(0, Math.min(count, pool.length));

  const prepared = picked.map(q => {
    const opts = q.options.map((text, i) => ({ text, originalIndex: i }));
    shuffle(opts);
    const newOptions = opts.map(o => o.text);
    const newCorrect = opts.findIndex(o => o.originalIndex === q.correctAnswer);
    return {
      question: q.question,
      options: newOptions,
      correctAnswer: newCorrect,
      explanation: q.explanation,
      category: q.category || category
    };
  });

  shuffle(prepared);
  return prepared;
}

window.quizUtils = window.quizUtils || {};
window.quizUtils.prepareQuiz = prepareQuiz;

function initQuiz() {
  currentIndex = 0;
  score = 0;
  updateScoreDisplay();
  if (!activeQuestions || activeQuestions.length === 0) activeQuestions = getAllQuestions();
  shuffle(activeQuestions);
  showQuestion(currentIndex);
  nextBtn.disabled = true;
  resultScreen.hidden = true;
  quizSection.hidden = false;
  if (explanationEl) {
    explanationEl.hidden = true;
    explanationEl.textContent = '';
  }
}

function updateScoreDisplay() {
  scoreValueEl.textContent = String(score);
}

function showQuestion(index) {
  const q = activeQuestions[index];
  if (!q) return;
  questionEl.textContent = q.question;

  answerBtns.forEach((btn, i) => {
    btn.textContent = q.options[i] || '';
    btn.disabled = false;
    btn.classList.remove('selected', 'correct', 'wrong');
    btn.dataset.index = i;
  });

  nextBtn.disabled = true;
  if (explanationEl) {
    explanationEl.hidden = true;
    explanationEl.textContent = '';
  }
}

function handleAnswerClick(e) {
  const btn = e.currentTarget;
  const selected = Number(btn.dataset.index);
  const q = activeQuestions[currentIndex];

  if (btn.disabled) return;

  answerBtns.forEach(b => (b.disabled = true));

  btn.classList.add('selected');

  if (selected === q.correctAnswer) {
    score += 1;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    const correctBtn = answerBtns[q.correctAnswer];
    if (correctBtn) correctBtn.classList.add('correct');
  }

  updateScoreDisplay();

  if (explanationEl) {
    explanationEl.classList.remove('ex-correct', 'ex-wrong');
    if (selected === q.correctAnswer) {
      explanationEl.classList.add('ex-correct');
    } else {
      explanationEl.classList.add('ex-wrong');
    }
    explanationEl.textContent = q.explanation || '';
    explanationEl.hidden = false;
  }

  nextBtn.disabled = false;
}

function handleNext() {
  currentIndex += 1;
  if (currentIndex >= activeQuestions.length) {
    finalScoreValue.textContent = String(score);
    quizSection.hidden = true;
    resultScreen.hidden = false;
  } else {
    showQuestion(currentIndex);
  }
}

function handleRestart() {
  initQuiz();
}

answerBtns.forEach(btn => btn.addEventListener('click', handleAnswerClick));
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', handleRestart);

function setCategory(cat) {
  selectedCategory = cat;
  categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  activeQuestions = prepareQuiz(cat, 10);
  initQuiz();
}

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => setCategory(btn.dataset.cat));
});

document.addEventListener('DOMContentLoaded', initQuiz);
