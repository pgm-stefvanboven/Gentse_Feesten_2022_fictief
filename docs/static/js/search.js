const EVENTS_URL = 'https://www.pgm.gent/data/gentsefeesten/events.json';

(() => {
  const app = {
    async init() {
      console.log('1. Application Initialized!');
      this.cacheElements();
      this.handleSearchEvents();
    },
    cacheElements() {
      console.log('2. Cache the elements!');
      this.$searchContainerTitle = document.querySelector('.search__container__title');
      this.$eventResultsCount = document.querySelector('.event-results-count');
      this.$eventSearchResults = document.querySelector('.event-search-results');
    },
    async fetchJSON(url) {
      const response = await fetch(url);
      return response.json();
    },
    async handleSearchEvents() {
      const searchParam = new URLSearchParams(window.location.search).get('eventsSearch');
      
      if (!searchParam) {
        this.$searchContainerTitle.style.display = 'block';
        this.$eventResultsCount.style.display = 'none';
      } else {
        this.$searchContainerTitle.style.display = 'none';
        this.$eventResultsCount.style.display = 'block';
        
        const eventData = await this.fetchJSON(EVENTS_URL);
        const filteredEvents = eventData.filter(event =>
          event.category.some(category => category.toLowerCase().includes(searchParam)) ||
          event.title.toLowerCase().includes(searchParam) || 
          event.location.toLowerCase().includes(searchParam)
        );
        
        this.generateHTMLForEvents(filteredEvents, searchParam);
      }
    },
    generateHTMLForEvents(data, result) {
      const eventResultsCount = data.length;
      this.$eventResultsCount.innerHTML = `<span><span class="result-count__bold">${eventResultsCount} resultaten</span> voor "${result}"</span>`;
      
      const eventResultsHTML = data.map(event => `
        <a href="events/detail.html?day=${event.day}&slug=${event.slug}" class="search__event__result__content">
          <img src="${event.image ? event.image.full : 'static/assets/images/no-image.jpg'}" alt="eventpicture">
          <div class="search__event__result__content__date">${event.day_of_week} ${event.day} JULI</div>
          <div class="search__event__result__content__info">
            <h3>${event.title}</h3>
            <span class="search__event__result__content__location">${event.location}</span>
            <span class="search__event__result__content__time">${event.start} u.</span>
          </div>
        </a>
      `).join('');
      
      this.$eventSearchResults.innerHTML = eventResultsHTML;
    },
  };
  
  app.init();
})();