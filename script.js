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
			const activeLesson = document.querySelector('.lesson-btn.active');
			const lessonText = activeLesson ? activeLesson.textContent.trim() : '';
			window.setContextTitle(lessonText ? `Learn → ${lessonText}` : 'Learn');
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
});

window.setContextTitle = function(text) {
	const el = document.getElementById('context-title');
	if (!el) return;
	el.textContent = String(text || '').trim();
};

