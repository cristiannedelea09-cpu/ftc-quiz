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

