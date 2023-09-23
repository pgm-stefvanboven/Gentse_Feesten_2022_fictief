const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";

(() => {
  const app = {
    init() {
      console.log("1. Application Initialized!");
      this.cacheElements();
      this.getSearchParams();
    },

    cacheElements() {
      console.log("2. Cache the elements!");
      this.$eventDetailContainer = document.querySelector(
        ".gf_event_detail__container"
      );
      this.$eventLocationContainer = document.querySelector(
        ".gf_event_location__container__content"
      );
      this.$eventMapLocation = document.querySelector(".gf_event_map");
      this.$eventsOnLocationContainer = document.querySelector(
        ".other_gf_events_on_location_container__content"
      );
      this.$eventsFromOrganizerContainer = document.querySelector(
        ".other_gf_events_from_organizer_container__content"
      );
      this.$organizerContainerButton = document.querySelector(
        ".other_gf_events_from_organizer_container__content__button"
      );
    },

    async getEventData(url, day, slug) {
      const response = await fetch(url);
      const data = await response.json();
      const [filteredEvent] = data.filter(
        (element) => element.day.includes(day) && element.slug.includes(slug)
      );

      if (filteredEvent) {
        const eventsOnLocation = data.filter(
          (item) =>
            item.location === filteredEvent.location &&
            item.day === filteredEvent.day
        );
        const eventsFromOrganizer = data.filter(
          (item) =>
            item.organizer === filteredEvent.organizer &&
            item.day === filteredEvent.day
        );

        this.getHTMLForEventDetail(filteredEvent, day);
        this.getHTMLForEventsOnLocation(eventsOnLocation);
        this.getHTMLForEventsFromOrganizer(eventsFromOrganizer);
      } else {
        console.error("No matching events found.");
      }
    },

    getSearchParams() {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
      const day = searchParams.get("day");
      const slug = searchParams.get("slug");

      this.getEventData(EVENTS_URL, day, slug);
    },

    getHTMLForEventDetail(event, day) {
      this.getHTMLForMapLocation(event.location);

      const img = event.image
        ? event.image.full
        : "../static/assets/images/no-image.jpg";

      this.$eventDetailContainer.innerHTML = `
        <div class="gf_event_detail__left">
          <a href="day.html?day=${day}" class="gf_event_detail_day">
            <svg id="arrow-animation-left" viewBox="0 0 1197 269" aria-hidden="true"><path d="M-0.159,111.093l639.756,0l-85.15,-76.855l29.643,-32.816l144.777,131.216l-143.608,129.655l-30.23,-32.081l84.144,-76.315l-639.756,0l0.424,-42.804Z" fill="#FFF"></path></svg>
            <span>Overzicht ${event.day_of_week} ${event.day} Juli</span>
          </a>
          <h2>${event.title}</h2>
          <p>
            <a href="#">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="32" viewBox="0 0 21 32"><title>marker</title><path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path></svg>${event.location}
            </a> ${event.start} u. - ${event.end} u.
          </p>
          <div class="gf_event_detail_info">
            <div class="gf_event_detail_info_organizer">
              <div>
                <span>Organisator:</span>
              </div>
              <a href="#">${event.organizer}</a>
            </div>
            <div class="gf_event_detail_info_category">
              <div>
                <span>Categorieën:</span>
              </div>
              <a href="#">${event.category}</a>
            </div>
          </div>
        </div>
        <div class="gf_event_detail__right">
          <img src="${img}" alt="gf_event_img">
          <div class="gf_event_socials">
            <a href="" class="gf_event_detail-tw"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>twitter</title><path d="M12.973 24c7.17 0 11.093-5.77 11.093-10.773 0-0.164-0.003-0.328-0.013-0.49 0.765-0.54 1.411-1.19 1.93-1.935l0.017-0.025c-0.653 0.288-1.41 0.498-2.202 0.591l-0.038 0.004c0.801-0.468 1.407-1.197 1.706-2.068l0.008-0.027c-0.714 0.419-1.544 0.739-2.427 0.912l-0.050 0.008c-1.473-1.526-3.942-1.603-5.512-0.172-0.755 0.684-1.228 1.668-1.232 2.761v0.001c0 0.29 0.035 0.58 0.103 0.863-3.134-0.153-6.055-1.59-8.036-3.956-1.032 1.73-0.504 3.942 1.208 5.054-0.65-0.019-1.255-0.192-1.787-0.483l0.021 0.010v0.048c0 1.802 1.307 3.355 3.125 3.712-0.308 0.085-0.662 0.133-1.027 0.133-0.259 0-0.513-0.025-0.758-0.071l0.025 0.004c0.512 1.541 1.975 2.598 3.642 2.63-1.321 1.011-2.996 1.62-4.814 1.62-0.009 0-0.018 0-0.027-0h0.001c-0.31 0-0.62-0.017-0.929-0.053 1.69 1.068 3.747 1.702 5.953 1.702 0.007 0 0.014 0 0.022-0h-0.001"></path></svg></a>
            <a href="" class="gf_event_detail-fb"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>facebook</title><path d="M17.49 25v-8.21h2.95l0.44-3.2h-3.39v-2.043c0-0.927 0.276-1.558 1.697-1.558l1.813-0.001v-2.862c-0.766-0.080-1.655-0.126-2.555-0.126-0.030 0-0.061 0-0.091 0h0.005c-2.614 0-4.403 1.491-4.403 4.23v2.36h-2.956v3.2h2.956v8.21h3.535z"></path></svg></a>
            <a href="" class="gf_event_detail-pin"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>pinterest</title><path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path></svg></a>
          </div>
        </div>
      `;
    },

    getHTMLForEventsOnLocation(events) {
      const eventsHTML = events
        .map(
          (event) => `
        <a href="detail.html?day=${event.day}&slug=${
            event.slug
          }" class="other_gf_event_from_organizer_detail_link">
          <img src="${
            event.image
              ? event.image.full
              : "../static/assets/images/no-image.jpg"
          }" alt="eventpicture">
          <div class="other_gf_event_from_organizer_detail_event__date">${
            event.day_of_week
          } ${event.day} JULI</div>
          <div class="other_gf_event_from_organizer_detail_event__info">
            <h3>${event.title}</h3>
            <span class="other_gf_event_from_organizer_detail_location">${
              event.location
            }</span>
            <span class="other_gf_event_from_organizer_detail_time">${
              event.start
            } u.</span>
          </div>
        </a>`
        )
        .join("");

      this.$eventsOnLocationContainer.innerHTML = eventsHTML;
    },

    getHTMLForEventsFromOrganizer(events) {
      const eventsHTML = events
        .slice(0, 4)
        .map(
          (event) => `
        <a href="detail.html?day=${event.day}&slug=${
            event.slug
          }" class="other_gf_events_from_organizer_event">
          <div class="other_gf_events_from_organizer_event__date">
            <span>${event.day_of_week.slice(0, 2)} ${event.day} JULI ${
            event.start
          } u.</span>
          </div>
          <div class="other_gf_events_from_organizer_event__title">
            <h3>${event.title}</h3>
          </div>
          <div class="other_gf_events_from_organizer_event__location">
            <span>${event.location}</span>
          </div>
        </a>`
        )
        .join("");

      this.$eventsFromOrganizerContainer.innerHTML = eventsHTML;
      this.$organizerContainerButton.innerHTML = `<a href="">alle evenementen van deze organisator</a>`;
    },

    getHTMLForMapLocation(location) {
      this.$eventMapLocation.innerHTML = `<a href=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="32" viewBox="0 0 21 32"><title>marker</title><path d="M10.4 0c-5.457 0-10.4 4.537-10.4 10.136 0 5.597 4.51 12.28 10.4 21.864 5.89-9.584 10.4-16.267 10.4-21.864 0-5.599-4.941-10.136-10.4-10.136zM10.4 14.667c-2.154 0-3.9-1.791-3.9-4s1.746-4 3.9-4c2.154 0 3.9 1.791 3.9 4s-1.746 4-3.9 4z"></path></svg><span>${location}<span></a>`;
    },
  };
  app.init();
})();