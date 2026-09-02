(() => {
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const searchInput = document.querySelector('#publication-search');
  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publications = [...document.querySelectorAll('.publication')];
  const yearGroups = [...document.querySelectorAll('.publication-year')];

  if (!searchInput || filterButtons.length === 0) return;

  let activeType = 'all';

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();

    publications.forEach((publication) => {
      const typeMatches = activeType === 'all' || publication.dataset.type === activeType;
      const textMatches = !query || publication.textContent.toLowerCase().includes(query);
      publication.hidden = !(typeMatches && textMatches);
    });

    yearGroups.forEach((group) => {
      group.hidden = !group.querySelector('.publication:not([hidden])');
    });

    const visibleCount = publications.filter((publication) => !publication.hidden).length;
    const resultCount = document.querySelector('#publication-count');
    if (resultCount) resultCount.textContent = `${visibleCount} publication${visibleCount === 1 ? '' : 's'}`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeType = button.dataset.publicationFilter;
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);
  applyFilters();
})();
