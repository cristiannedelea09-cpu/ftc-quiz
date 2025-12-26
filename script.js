function toSectionId(key) {
	if (!key) return null;
	return key.endsWith('-section') ? key : `${key}-section`;
}

function showSection(sectionKey) {
	const targetId = toSectionId(sectionKey);
	const container = document.querySelector('main') || document.body;
	if (!container) return;

	const sections = Array.from(container.querySelectorAll(':scope > section'));
	sections.forEach(s => {
		s.hidden = s.id !== targetId;
	});

	const navButtons = Array.from(document.querySelectorAll('.top-nav-btn, .section-btn'));
	navButtons.forEach(btn => btn.classList.remove('active'));
	const match = navButtons.find(btn => (btn.dataset.section || '') === sectionKey);
	if (match) match.classList.add('active');

	if (window.setContextTitle) {
		if (sectionKey === 'learn') {
			const activeLesson = document.querySelector('.lesson-btn.active, .learn-topic-btn.active');
			const lessonName = activeLesson ? (activeLesson.dataset.topic || activeLesson.textContent.trim()) : '';
			window.setContextTitle(lessonName ? `Learn → ${lessonName}` : 'Learn');
		} else if (sectionKey === 'tests') {
			const catBtn = document.querySelector('.category-btn.active');
			const cat = catBtn ? catBtn.dataset.cat || catBtn.textContent.trim() : '';
			window.setContextTitle(cat ? `Tests → ${cat}` : 'Tests');
		} else if (sectionKey === 'inspection') {
			window.setContextTitle('Inspection');
		} else {
			window.setContextTitle(sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1));
		}
	}
}

document.querySelectorAll('.top-nav-btn, .section-btn').forEach(btn => {
	btn.addEventListener('click', (e) => {
		const target = btn.dataset.section;
		if (!target) return;
		showSection(target);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	showSection('learn');
	const topBtns = Array.from(document.querySelectorAll('.top-nav-btn'));
	if (topBtns.length) {
		topBtns.forEach(b => b.classList.remove('active'));
		const match = topBtns.find(b => (b.dataset.section || '') === 'learn');
		if (match) match.classList.add('active');
	}

	const progressBtn = document.querySelector('.section-btn[data-section="progress"]');
	if (progressBtn) {
		progressBtn.addEventListener('click', () => {
			showSection('progress');
			renderProgressSection();
		});
	}

	// Hamburger menu logic
	const hamburger = document.getElementById('hamburger-menu');
	const mobileNav = document.getElementById('mobile-nav');
	if (hamburger && mobileNav) {
		hamburger.addEventListener('click', () => {
			const expanded = hamburger.getAttribute('aria-expanded') === 'true';
			hamburger.setAttribute('aria-expanded', !expanded);
			mobileNav.hidden = expanded;
		});

		// Hide menu when clicking outside
		document.addEventListener('click', function(e) {
			if (!mobileNav.hidden && !mobileNav.contains(e.target) && e.target !== hamburger) {
				mobileNav.hidden = true;
				hamburger.setAttribute('aria-expanded', 'false');
			}
		});

		// Hide menu on navigation
		mobileNav.querySelectorAll('.top-nav-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				mobileNav.hidden = true;
				hamburger.setAttribute('aria-expanded', 'false');
			});
		});
	}

	// Learn section: Ensure users can always return to main menu and start a test
	const learnMenu = document.getElementById('learn-menu');
	if (learnMenu) {
		learnMenu.addEventListener('click', (e) => {
			if (e.target.classList.contains('learn-topic-btn')) {
				// Show loading state
				document.getElementById('learn-loading').style.display = 'block';
				document.getElementById('learn-content').style.display = 'none';
				setTimeout(() => {
					// Simulate lesson loaded
					document.getElementById('learn-loading').style.display = 'none';
					document.getElementById('learn-content').style.display = 'block';
				}, 600);
			}
		});
	}
	// Add a button to go directly to Tests from Learn
	if (learnMenu && !document.getElementById('go-to-tests-btn')) {
		const goToTestsBtn = document.createElement('button');
		goToTestsBtn.id = 'go-to-tests-btn';
		goToTestsBtn.textContent = 'Go to Tests';
		goToTestsBtn.className = 'section-btn';
		goToTestsBtn.style.marginTop = '10px';
		goToTestsBtn.addEventListener('click', () => {
			showSection('tests');
		});
		learnMenu.parentElement.appendChild(goToTestsBtn);
	}

	// Test section: Show loading/empty states, ensure navigation to Results and Progress
	const testSelectGrid = document.querySelector('.test-select-grid');
	if (testSelectGrid) {
		testSelectGrid.addEventListener('click', (e) => {
			if (e.target.classList.contains('test-select-btn')) {
				document.getElementById('quiz-loading').style.display = 'block';
				document.getElementById('quiz').style.display = 'none';
				setTimeout(() => {
					document.getElementById('quiz-loading').style.display = 'none';
					document.getElementById('quiz').style.display = 'block';
				}, 600);
			}
		});
	}
	// If no questions, show empty state
	function showQuizEmpty() {
		document.getElementById('quiz-empty').style.display = 'block';
		document.getElementById('quiz').style.display = 'none';
	}
	// Add button to go to Progress from Results
	const resultScreen = document.getElementById('result-screen');
	if (resultScreen && !document.getElementById('go-to-progress-btn')) {
		const goToProgressBtn = document.createElement('button');
		goToProgressBtn.id = 'go-to-progress-btn';
		goToProgressBtn.textContent = 'View Progress';
		goToProgressBtn.className = 'section-btn';
		goToProgressBtn.style.marginTop = '10px';
		goToProgressBtn.addEventListener('click', () => {
			showSection('progress');
			renderProgressSection();
		});
		resultScreen.querySelector('.quiz-result-actions').appendChild(goToProgressBtn);
	}

	// Inspection section: Show loading/empty states, ensure navigation to other sections
	const checklistBtn = document.getElementById('checklist-mode-btn');
	if (checklistBtn) {
		checklistBtn.addEventListener('click', () => {
			document.getElementById('inspection-checklist-loading').style.display = 'block';
			setTimeout(() => {
				document.getElementById('inspection-checklist-loading').style.display = 'none';
			}, 600);
		});
	}
	const inspectionQuizBtn = document.getElementById('inspection-quiz-btn');
	if (inspectionQuizBtn) {
		inspectionQuizBtn.addEventListener('click', () => {
			document.getElementById('inspection-quiz-loading').style.display = 'block';
			setTimeout(() => {
				document.getElementById('inspection-quiz-loading').style.display = 'none';
			}, 600);
		});
	}
	// Add button to go to Learn from Inspection
	const inspectionMain = document.getElementById('inspection-main');
	if (inspectionMain && !document.getElementById('go-to-learn-from-inspection')) {
		const goToLearnBtn = document.createElement('button');
		goToLearnBtn.id = 'go-to-learn-from-inspection';
		goToLearnBtn.textContent = 'Go to Learn';
		goToLearnBtn.className = 'section-btn';
		goToLearnBtn.style.marginTop = '10px';
		goToLearnBtn.addEventListener('click', () => {
			showSection('learn');
		});
		inspectionMain.appendChild(goToLearnBtn);
	}
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'reset-progress-btn') {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('quizResults');
            renderProgressSection();
        }
    }
});

// Progress section: Show loading/empty states, ensure navigation to Tests
function renderProgressSection() {
	document.getElementById('progress-loading').style.display = 'block';
	document.querySelector('.progress-summary').style.display = 'none';
	setTimeout(() => {
		document.getElementById('progress-loading').style.display = 'none';
		document.querySelector('.progress-summary').style.display = 'block';
		let results = [];
		try {
			results = JSON.parse(localStorage.getItem('quizResults') || '[]');
		} catch (e) {}
		if (!Array.isArray(results) || results.length === 0) {
			document.getElementById('progress-empty').style.display = 'block';
			return;
		} else {
			document.getElementById('progress-empty').style.display = 'none';
		}

		document.getElementById('progress-total-quizzes').textContent = results.length;

		let avg = 0;
		if (results.length) {
			avg = results.reduce((sum, r) => sum + (r.score / (r.total || 1)), 0) / results.length;
		}
		const avgPercent = (avg * 100);
		const avgScoreEl = document.getElementById('progress-average-score');
		avgScoreEl.textContent = avgPercent.toFixed(1) + '%';
		avgScoreEl.className = avgPercent >= 80 ? 'score-success' : (avgPercent < 50 ? 'score-warning' : 'score-neutral');

		const best = {};
		results.forEach(r => {
			if (!r.type) return;
			const percent = (r.score / (r.total || 1));		if (!best[r.type] || percent > best[r.type].percent) {
				best[r.type] = { score: r.score, total: r.total, percent };
			}
		});
		const bestList = document.getElementById('progress-best-scores');
		bestList.innerHTML = '';
		Object.entries(best).forEach(([type, data]) => {
			const percent = data.percent * 100;
			const li = document.createElement('li');
			const scoreSpan = document.createElement('span');
			scoreSpan.textContent = `${type}: ${data.score} / ${data.total} (${percent.toFixed(1)}%)`;
			scoreSpan.className = percent >= 80 ? 'score-success' : (percent < 50 ? 'score-warning' : 'score-neutral');
			li.appendChild(scoreSpan);
			const bar = document.createElement('div');
			bar.className = 'progress-bar';
			const barInner = document.createElement('div');
			barInner.className = 'progress-bar-inner ' + (percent >= 80 ? 'progress-success' : (percent < 50 ? 'progress-warning' : 'progress-neutral'));
			barInner.style.width = Math.max(6, percent) + '%';
			bar.appendChild(barInner);
			li.appendChild(bar);
			bestList.appendChild(li);
		});

		// Add button to go to Tests
		if (!document.getElementById('go-to-tests-from-progress')) {
			const goToTestsBtn = document.createElement('button');
			goToTestsBtn.id = 'go-to-tests-from-progress';
			goToTestsBtn.textContent = 'Go to Tests';
			goToTestsBtn.className = 'section-btn';
			goToTestsBtn.style.marginTop = '10px';
			goToTestsBtn.addEventListener('click', () => {
				showSection('tests');
			});
			document.querySelector('.progress-summary').appendChild(goToTestsBtn);
		}
	}, 600);
}

window.setContextTitle = function(text) {
	const el = document.getElementById('context-title');
	if (!el) return;
	// Custom breadcrumb logic
	const testsSection = document.getElementById('tests-section');
	const progressSection = document.getElementById('progress-section');
	if (testsSection && !testsSection.hidden) {
		// Tests section
		const catBtn = document.querySelector('.category-btn.active');
		const cat = catBtn ? catBtn.dataset.cat || catBtn.textContent.trim() : '';
		const quizVisible = document.getElementById('quiz') && !document.getElementById('quiz').hidden;
		const resultVisible = document.getElementById('result-screen') && !document.getElementById('result-screen').hidden;
		if (resultVisible) {
			el.textContent = `Tests → ${cat || 'All'} → Results`;
		} else if (quizVisible) {
			el.textContent = `Tests → ${cat || 'All'} → Quiz`;
		} else {
			el.textContent = cat ? `Tests → ${cat}` : 'Tests';
		}
		return;
	}
	if (progressSection && !progressSection.hidden) {
		el.textContent = 'Progress → Overview';
		return;
	}
	// Fallback/default
	el.textContent = String(text || '').trim();
};

