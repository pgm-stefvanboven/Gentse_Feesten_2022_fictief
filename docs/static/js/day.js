const EVENTS_URL = 'https://www.pgm.gent/data/gentsefeesten/events.json';

(() => {
  const app = {
    async init() {
      console.log('1. Application Initialized!');
      this.cacheElements();
      await this.getSearchEvents();
    },
    cacheElements() {
      console.log('2. Cache the elements!');
      this.$body = document.querySelector('body');
      this.$filterCategories = document.querySelector('.filter-content-up__links');
      this.$allEvents = document.querySelector('.day-events__container__content');
      this.$checkboxwheel = document.querySelector('.checkbox-wheel');
      this.$checkboxfree = document.querySelector('.checkbox-free');
    },
    async getEventData(url, result) {
      const eventsResponse = await fetch(url);
      const eventData = await eventsResponse.json();
      const filteredEvents = eventData.filter(element => element.day.includes(result));

      this.getCategories(filteredEvents, result);
    },
    async getSearchEvents() {
      const url = new URL(window.location);
      const result = url.searchParams.get('day');
      await this.getEventData(EVENTS_URL, result);
    },
    getCategories(data, result) {
      const categories = [...new Set(data.flatMap(event => event.category))];
      this.getHTMLForCategories(categories);
      this.getEventsByCategory(data, categories, result);
    },
    getHTMLForCategories(categories) {
      const linksHTML = categories.map(category => `
        <li class="filter-content-link">
          <a href="#${category}">
            ${category}
          </a>
        </li>`).join('');
      this.$filterCategories.innerHTML = `<ul class="filter-content-links">${linksHTML}</ul>`;
    },
    getEventsByCategory(data, categories, result) {
      const eventsHTML = categories.map(category => `
        <div class="day-events__container__content_day_events" id="${category}">
          <h2>${category}</h2>
          <div class="day-events__container__content_day_event">
            ${this.getHTMLForEvent(data, category, result)}
          </div>
        </div>`).join('');
      this.$allEvents.innerHTML += eventsHTML;
    },
    getHTMLForEvent(data, category, result) {
      const events = data.filter(event => event.category.includes(category));
      const eventsHTML = events.map(event => `
        <a href="detail.html?day=${result}&slug=${event.slug}" class="day-events__container__content_day_event_detail">
          <img src="${event.image ? event.image.full : '../static/assets/images/no-image.jpg'}" alt="eventpicture">
          <div class="day-event__date">${event.day_of_week} ${event.day} JULI</div>
          <div class="day-event__info">
            <h3>${event.title}</h3>
            <span class="day-event__location">${event.location}</span>
            <span class="day-event__time">${event.start} u.</span>
          </div>
        </a>`).join('');
      return eventsHTML;
    },
  };
  app.init();
})();