const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";
const NEWS_URL = "https://www.pgm.gent/data/gentsefeesten/news.json";
const CATEGORIES_URL = "https://www.pgm.gent/data/gentsefeesten/categories.json";

(() => {
  const app = {
    init() {
      console.log("1. Application Initialized!");
      // Variables
      // Call the function cacheElements
      this.cacheElements();
      // Call the function generateUI
      this.getEventData(EVENTS_URL);
      this.getNewsData(NEWS_URL);
    },
    cacheElements() {
      console.log("2. Cache the elements!");
      this.$events = document.querySelector(".events-content");
      this.$news = document.querySelector(".news-content");
    },
    async getEventData(url) {
      const events = await fetch(url, { method: "GET" });
      const data = await events.json();

      this.eventsData = data;
      this.generateHTMLForEvents();
    },
    async getNewsData(url) {
      const news = await fetch(url, { method: "GET" });
      const data = await news.json();

      this.generateHTMLForNews(data);
    },
    generateHTMLForEvents() {
      const eventsToShow = this.eventsData.slice(0, 5);

      this.getHTMLForEvent(eventsToShow);
    },
    generateHTMLForNews(data) {
      this.$news.innerHTML = this.getHTMLForNews(data);
    },
    getHTMLForEvent(events) {
      let tmpStr = "";
      for (let i = 0; i < events.length; i++) {
        let img = events[i].image
          ? events[i].image.thumb
          : "static/assets/images/no-image.jpg";

        tmpStr += `
          <a href="events/detail.html?day=${events[i].day}&slug=${events[i].slug}" class="events-info">
            <img src="${img}" alt="event-picture">
            <div class="events__date">${events[i].day_of_week} ${events[i].day} JULI</div>
            <div class="events__info">
              <h3>${events[i].title}</h3>
              <span class="events__location">${events[i].location}</span>
              <span class="events__time">${events[i].start} u.</span>
            </div>
          </a>`;
      }
      this.$events.innerHTML = tmpStr;
    },   
    getHTMLForNews(news) {
      console.log(news);
      let tmpStr = "";
      tmpStr += `
          <div class="news__title">
            <h2>Nieuws</h2>
          </div>

          <div class="news__content__left">
            <div class="news__content__left__left__content">
              <a class="news__link" href="./news.html">
                <h3 class="news__content__left__left__title">
                  ${news[0].title}
                </h3>

                <svg id="arrow-animation" class="news-arrow" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#fff"></path></svg>
              </a>
            </div>

            <div class="news__content__left__right__content">
              <a class="news__link" href="./news.html">
                <h3 class="news__content__left__left__title">
                  ${news[1].title}
                </h3>

                <svg id="arrow-animation" class="news-arrow" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#fff"></path></svg>
              </a>
            </div>

            <div class="news__content__down__left__content">
              <a class="news__link" href="./news.html">
                <h3 class="news__content__left__left__title">
                  ${news[2].title}
                </h3>

                <svg id="arrow-animation" class="news-arrow" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#fff"></path></svg>
              </a>
            </div>
          </div>

          <div class="news__content__right">
            <div class="news__content__right__img">
              <img src="static/assets/images/bg-twitterfeed.jpg">
            </div>
          </div>
        `;
      return tmpStr;
    },
  };
  app.init();
})();