const questions = [
	{
		question: 'How many drivers are allowed to control the robot during a match?',
		options: ['One', 'Two', 'Three', 'Unlimited'],
		correctAnswer: 1, // Two
		category: 'Driver rules',
		explanation: 'FTC teams typically operate with two drivers (Driver and Operator). Check the current season rules for role names.'
	},
	{
		question: 'What is the typical match duration in FTC (excluding endgame)?',
		options: ['30 seconds', '2 minutes', '1 minute', '90 seconds'],
		correctAnswer: 3, // 90 seconds
		category: 'Human player',
		explanation: 'A standard FTC match is commonly 90 seconds long; seasons may vary so consult the official rules for exact timing.'
	},
	{
		question: 'Which area is the robot allowed to enter during autonomous?',
		options: ['Only its starting tile', 'Anywhere on the field', "Opponents' Safe Zone", 'Audience area'],
		correctAnswer: 0, // Only its starting tile
		category: 'Driver rules',
		explanation: 'During autonomous, robots must generally remain within their starting area unless the season rules allow otherwise.'
	},
	{
		question: 'What should you do if a robot becomes a hazard on the field?',
		options: ['Ignore it', 'Push it off the field', 'Inform a referee', 'Attempt to fix it yourself'],
		correctAnswer: 2, // Inform a referee
		category: 'Human player',
		explanation: 'If a robot is a hazard, inform a referee immediately — they will handle removal or stopping play safely. Do not enter the field.'
	},
	{
		question: 'When must a robot pass inspection?',
		options: ['Before every tournament', 'Only at the season start', 'Before being allowed to compete', 'No inspection required'],
		correctAnswer: 2, // Before being allowed to compete
		category: 'Robot inspection',
		explanation: 'Robots must pass inspection before being cleared to compete to ensure safety and compliance with the rules.'
	},
	{
		question: 'Who may be a human player during a match?',
		options: ['Any spectator', 'Only registered team members', 'Referees', 'Only the coach'],
		correctAnswer: 1, // Only registered team members
		category: 'Human player',
		explanation: 'Human players are typically registered members of the team and must follow the rules regarding conduct and allowed actions.'
	}
];

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
let activeQuestions = questions.slice();

function initQuiz() {
	currentIndex = 0;
	score = 0;
	updateScoreDisplay();
	if (!activeQuestions || activeQuestions.length === 0) activeQuestions = questions.slice();
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
	if (cat === 'All') activeQuestions = questions.slice();
	else activeQuestions = questions.filter(q => q.category === cat);
	initQuiz();
}

categoryBtns.forEach(btn => {
	btn.addEventListener('click', () => setCategory(btn.dataset.cat));
});

document.addEventListener('DOMContentLoaded', initQuiz);

