const SECTION_IDS = ['learn', 'tests', 'inspection'];

function showSection(sectionId) {
	const target = document.getElementById(sectionId);

	if (target) {
		const container = target.parentElement || document.querySelector('main') || document.body;
		const siblings = container.querySelectorAll('section');
		siblings.forEach(s => {
			s.hidden = (s !== target);
		});

		target.hidden = false;
	} else {
		SECTION_IDS.forEach(id => {
			const el = document.getElementById(id);
			if (!el) return;
			el.hidden = (id !== sectionId);
		});
	}

	const sectionBtns = document.querySelectorAll('.section-btn');
	sectionBtns.forEach(btn => {
		const targetId = btn.dataset.section;
		btn.classList.toggle('active', targetId === sectionId);
	});
}

document.querySelectorAll('.section-btn').forEach(btn => {
	btn.addEventListener('click', () => {
		const target = btn.dataset.section;
		if (target) showSection(target);
	});
});

document.addEventListener('DOMContentLoaded', () => showSection('learn'));

