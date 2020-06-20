const projects = document.querySelectorAll('.project');
const projectSelector = document.querySelector('.projectSelector');

projects.forEach((project) => {
	project.addEventListener('click', () => {
		projectSelector.classList.remove('projectAA');
		projectSelector.classList.remove('projectAB');
		projectSelector.classList.remove('projectBA');
		projectSelector.classList.remove('projectBB');
		projectSelector.classList.add(`project${project.dataset.placement}`);
	});
});
