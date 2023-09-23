const NEWS_URL = "https://www.pgm.gent/data/gentsefeesten/news.json";

(() => {
  const app = {
    async init() {
      console.log("1. Application Initialized!");
      this.cacheElements();
      await this.getNewsData(NEWS_URL);
    },
    cacheElements() {
      console.log("2. Cache the elements!");
      this.$news = document.querySelector(".news__articles__content");
    },
    async getNewsData(url) {
      const data = await this.fetchData(url);
      this.generateHTMLForNews(data);
    },
    async fetchData(url) {
      const response = await fetch(url);
      return response.json();
    },
    generateHTMLForNews(data) {
      this.$news.innerHTML = this.getHTMLForNews(data);
    },
    getHTMLForNews(news) {
      const newsHTML = news.slice(0, 5).map(item => `
        <div class="news__articles__content__article">
          <div class="news__articles__content__article__left">
            <div class="news__articles__content__article__left__title">
              <h3>${item.title}</h3>
            </div>
            <svg id="arrow-animation" class="news__article__arrow" viewBox="0 0 1197 269" aria-hidden="true">
              <path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="news__articles__content__article__right">
            <div class="news__articles__content__article__right__img">
              <img src="static/assets${item.picture.medium}">
            </div>
          </div>
        </div>`).join("");

      return newsHTML;
    },
  };
  app.init();
})();