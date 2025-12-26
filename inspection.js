(function () {
	'use strict';

	const inspectionChecklist = {
		Size: [
			{
				description: 'Robot fits within the allowed size envelope for the game (height/width).',
				legalRequirement: 'Robot must start the match fully within the dimensions specified by the current season rules.',
				passFailExplanation: 'Pass: Robot dimensions are within the allowed envelope. Fail: Any part extends beyond the permitted starting size.'
			},
			{
				description: 'Moving mechanisms do not exceed permitted match-area reach when starting.',
				legalRequirement: 'Any mechanism that would extend beyond the boundary at match start must be retracted or within limits.',
				passFailExplanation: 'Pass: All parts are contained. Fail: Mechanisms protrude past allowed starting boundaries.'
			}
		],

		Weight: [
			{
				description: 'Robot weight does not exceed the maximum allowed by the rules.',
				legalRequirement: 'Total robot mass must be at or below the competition weight limit (including any batteries and consumables).',
				passFailExplanation: 'Pass: Measured weight ≤ limit. Fail: Measured weight > limit — team must remove weight or components.'
			},
			{
				description: 'Batteries and payloads are secured and accounted for in weight measurement.',
				legalRequirement: 'All batteries and attached payloads must be included when weighing the robot.',
				passFailExplanation: 'Pass: All items included and secured. Fail: Loose or missing items during measurement cause a fail until corrected.'
			}
		],

		Electronics: [
			{
				description: 'All electronics are properly insulated and mounted (no exposed wiring that can short).',
				legalRequirement: 'Wiring must be securely fastened and protected; no exposed conductors that create a short risk.',
				passFailExplanation: 'Pass: Wiring and connectors are covered and secured. Fail: Exposed live wires or loose connectors present a fail until fixed.'
			},
			{
				description: 'Control system (radio, wifi, controllers) uses approved frequencies and hardware.',
				legalRequirement: 'Only allowed control hardware and communication links may be used as defined by the event rules.',
				passFailExplanation: 'Pass: Approved devices detected. Fail: Unapproved or interfering devices must be removed or replaced.'
			}
		],

		Safety: [
			{
				description: 'No sharp edges or pinch points accessible to volunteers and other teams.',
				legalRequirement: 'Robots must not present safety hazards to people handling them during inspection or transport.',
				passFailExplanation: 'Pass: No exposed hazards. Fail: Sharp edges or unsafe parts must be covered or modified.'
			},
			{
				description: 'Battery terminals are insulated and batteries are mounted securely.',
				legalRequirement: 'Battery installation must prevent shorting and be secured against movement during match play.',
				passFailExplanation: 'Pass: Terminals covered and battery secured. Fail: Exposed terminals or loose batteries require correction.'
			}
		],

		'General Legality': [
			{
				description: 'Robot complies with game-specific prohibited materials or devices.',
				legalRequirement: 'Robots must not contain banned materials, mechanisms, or field-altering devices as listed in the rulebook.',
				passFailExplanation: 'Pass: No banned items present. Fail: Presence of prohibited items requires removal or disqualification per event rules.'
			},
			{
				description: 'Team identification (team number) is visible and legible on the robot.',
				legalRequirement: 'Team number and identification must be displayed in the required location and size.',
				passFailExplanation: 'Pass: ID is visible and correct. Fail: Missing or illegible ID must be fixed before play.'
			}
		]
	};

	window.inspectionChecklist = inspectionChecklist;

	const INSPECTION_STATE_KEY = 'inspection.state';

	function loadInspectionState() {
		try {
			const raw = localStorage.getItem(INSPECTION_STATE_KEY);
			const arr = raw ? JSON.parse(raw) : [];
			return new Set(Array.isArray(arr) ? arr : []);
		} catch (e) {
			return new Set();
		}
	}

	function saveInspectionState(set) {
		try {
			localStorage.setItem(INSPECTION_STATE_KEY, JSON.stringify(Array.from(set)));
		} catch (e) {
		}
	}

	let inspectionState = loadInspectionState();

	function createChecklistItemEl(item, id) {
		const li = document.createElement('li');
		li.className = 'checklist-item';

		const cb = document.createElement('input');
		cb.type = 'checkbox';
		cb.id = `check-${id}`;
		cb.className = 'checklist-checkbox';

		const label = document.createElement('label');
		label.htmlFor = cb.id;
		label.className = 'checklist-label';
		label.innerHTML = `<strong>${escapeHtml(item.description)}</strong>`;

		const req = document.createElement('div');
		req.className = 'checklist-requirement muted';
		req.innerHTML = `<em>Requirement:</em> ${escapeHtml(item.legalRequirement)}`;

		const fail = document.createElement('div');
		fail.className = 'checklist-fail muted';
		fail.style.marginTop = '8px';
		fail.innerHTML = `<strong>If fail:</strong> ${escapeHtml(item.passFailExplanation)}`;

		cb.checked = inspectionState.has(cb.id);
		fail.style.display = cb.checked ? 'none' : 'block';

		cb.addEventListener('change', () => {
			fail.style.display = cb.checked ? 'none' : 'block';
			if (cb.checked) inspectionState.add(cb.id); else inspectionState.delete(cb.id);
			saveInspectionState(inspectionState);
			updateInspectionStatus();
		});

		li.appendChild(cb);
		li.appendChild(label);
		li.appendChild(req);
		li.appendChild(fail);
		return li;
	}

	function renderInspectionChecklist(containerId = 'checklist-items') {
		const container = document.getElementById(containerId);
		if (!container) return;
		container.innerHTML = '';
		inspectionState = loadInspectionState();
		let idCounter = 0;
		Object.keys(inspectionChecklist).forEach(category => {
			const headerLi = document.createElement('li');
			headerLi.className = 'checklist-category';
			headerLi.innerHTML = `<h3>${escapeHtml(category)}</h3>`;
			container.appendChild(headerLi);

			const items = inspectionChecklist[category] || [];
			items.forEach(item => {
				idCounter += 1;
				const itemEl = createChecklistItemEl(item, idCounter);
				container.appendChild(itemEl);
			});
		});
		updateInspectionStatus();
	}

	function escapeHtml(str) {
		if (!str) return '';
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function showInspectionMode(mode) {
		const checklistSection = document.getElementById('inspection-checklist');
		const quizSection = document.getElementById('inspection-quiz');
		if (checklistSection) checklistSection.style.display = (mode === 'checklist') ? '' : 'none';
		if (quizSection) quizSection.style.display = (mode === 'quiz') ? '' : 'none';
		const checklistBtn = document.getElementById('inspection-mode-checklist');
		const quizBtn = document.getElementById('inspection-mode-quiz');
		if (checklistBtn) checklistBtn.classList.toggle('active', mode === 'checklist');
		if (quizBtn) quizBtn.classList.toggle('active', mode === 'quiz');
		if (window.setContextTitle) {
			if (mode === 'checklist') {
				window.setContextTitle('Inspection → Checklist');
			} else if (mode === 'quiz') {
				window.setContextTitle('Inspection → Quiz');
			}
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		renderInspectionChecklist();
		showInspectionMode('checklist');

		const checklistModeBtn = document.getElementById('inspection-mode-checklist');
		if (checklistModeBtn) {
			checklistModeBtn.addEventListener('click', () => {
				showInspectionMode('checklist');
			});
		}

		const quizModeBtn = document.getElementById('inspection-mode-quiz');
		if (quizModeBtn) {
			quizModeBtn.addEventListener('click', () => {
				showInspectionMode('quiz');
			});
		}

		const startBtn = document.getElementById('start-checklist-btn');
		if (startBtn) startBtn.addEventListener('click', () => renderInspectionChecklist());
	});

	function updateInspectionStatus() {
		const checklistSection = document.getElementById('inspection-checklist');
		if (!checklistSection) return;
		const container = document.getElementById('checklist-items');
		if (!container) return;
		const checkboxes = container.querySelectorAll('.checklist-checkbox');
		const total = checkboxes.length;
		let passed = 0;
		checkboxes.forEach(cb => { if (cb.checked) passed += 1; });

		let statusEl = document.getElementById('inspection-status');
		if (!statusEl) {
			statusEl = document.createElement('div');
			statusEl.id = 'inspection-status';
			statusEl.setAttribute('role', 'status');
			statusEl.style.marginBottom = '12px';
			checklistSection.insertBefore(statusEl, checklistSection.firstChild);
		}

		if (total === 0) {
			statusEl.textContent = 'NO ITEMS';
			statusEl.className = 'inspection-status neutral';
			return;
		}

		if (passed === total) {
			statusEl.textContent = `PASS — ${passed}/${total} items OK`;
			statusEl.className = 'inspection-status pass';
		} else {
			statusEl.textContent = `FAIL — ${passed}/${total} items OK`;
			statusEl.className = 'inspection-status fail';
		}
	}

	const inspectionScenarios = [
		{
			id: 's1',
			text: 'A robot has a small exposed sharp metal bracket near the intake area that a volunteer could touch during setup.',
			correct: 'ILLEGAL',
			explanation: 'Safety: Exposed sharp edges are a hazard. Robots must not present accessible sharp edges — cover or file them smooth to pass inspection.'
		},
		{
			id: 's2',
			text: 'The team battery is secured in a battery holder and terminals are insulated with protective covers.',
			correct: 'LEGAL',
			explanation: 'Batteries must be secured and terminals insulated to prevent shorting. This meets the safety and electronics requirements.'
		},
		{
			id: 's3',
			text: 'The robot uses a radio transmitter operating on an unapproved frequency that can interfere with other teams.',
			correct: 'ILLEGAL',
			explanation: 'Electronics: Only approved communication hardware and frequencies are allowed. Unapproved transmitters must be removed.'
		},
		{
			id: 's4',
			text: 'The team number is clearly visible on both sides of the robot in the required size.',
			correct: 'LEGAL',
			explanation: 'General Legality: Team identification must be visible and legible. This scenario satisfies that requirement.'
		},
		{
			id: 's5',
			text: 'At match start the robot will extend past the field boundary due to a permanently fixed overhang.',
			correct: 'ILLEGAL',
			explanation: 'Size: Robots must start within the allowed dimensions. Any permanently fixed part that extends beyond the starting envelope is not allowed.'
		}
	];

	let quizState = {
		questions: [],
		index: 0,
		score: 0,
		inProgress: false
	};

	function startInspectionQuiz() {
		quizState.questions = inspectionScenarios.slice();
		for (let i = quizState.questions.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[quizState.questions[i], quizState.questions[j]] = [quizState.questions[j], quizState.questions[i]];
		}
		quizState.index = 0; quizState.score = 0; quizState.inProgress = true;
		renderQuizQuestion();
		updateQuizUI();
	}

	function renderQuizQuestion() {
		const qEl = document.getElementById('inspection-question');
		const prog = document.getElementById('inspection-quiz-progress');
		const scoreEl = document.getElementById('inspection-quiz-score');
		const expl = document.getElementById('inspection-explanation');
		const nextBtn = document.getElementById('inspection-next-btn');
		const restartBtn = document.getElementById('inspection-restart-btn');
		expl.hidden = true; nextBtn.hidden = true; restartBtn.hidden = true;
		if (!qEl || !prog) return;
		const total = quizState.questions.length;
		if (quizState.index >= total) {
			qEl.textContent = `Quiz complete — Score: ${quizState.score} / ${total}`;
			prog.textContent = `Question ${total} / ${total}`;
			scoreEl.textContent = `Score: ${quizState.score}`;
			document.getElementById('inspection-answers').style.display = 'none';
			restartBtn.hidden = false;
			quizState.inProgress = false;
			return;
		}
		const cur = quizState.questions[quizState.index];
		qEl.textContent = cur.text;
		prog.textContent = `Question ${quizState.index + 1} / ${total}`;
		scoreEl.textContent = `Score: ${quizState.score}`;
		document.getElementById('inspection-answers').style.display = '';
	}

	function updateQuizUI() {
		const answerBtns = document.querySelectorAll('.inspection-answer-btn');
		answerBtns.forEach(b => b.disabled = !quizState.inProgress);
	}

	function handleInspectionAnswer(choice) {
		if (!quizState.inProgress) return;
		const cur = quizState.questions[quizState.index];
		const expl = document.getElementById('inspection-explanation');
		const nextBtn = document.getElementById('inspection-next-btn');
		if (!cur || !expl) return;
		const correct = cur.correct === choice;
		if (correct) quizState.score += 1;
		expl.hidden = false;
		expl.textContent = (correct ? 'Correct — ' : 'Incorrect — ') + cur.explanation;
		nextBtn.hidden = false;
		document.getElementById('inspection-answers').style.display = 'none';
		updateQuizUI();
	}

	function nextInspectionQuestion() {
		quizState.index += 1;
		renderQuizQuestion();
		updateQuizUI();
	}

	function restartInspectionQuiz() {
		startInspectionQuiz();
	}

	document.addEventListener('DOMContentLoaded', () => {
		const startBtn = document.getElementById('start-inspection-quiz-btn');
		if (startBtn) startBtn.addEventListener('click', () => startInspectionQuiz());
		const answerBtns = document.querySelectorAll('.inspection-answer-btn');
		answerBtns.forEach(b => b.addEventListener('click', (e) => {
			const val = e.currentTarget.dataset.answer;
			handleInspectionAnswer(val);
		}));
		const nextBtn = document.getElementById('inspection-next-btn');
		if (nextBtn) nextBtn.addEventListener('click', () => nextInspectionQuestion());
		const restartBtn = document.getElementById('inspection-restart-btn');
		if (restartBtn) restartBtn.addEventListener('click', () => restartInspectionQuiz());
	});

})();