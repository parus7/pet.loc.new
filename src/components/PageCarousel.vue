<template>
  <Carousel :wrap-around="true">
    <Slide
      class="carousel__box"
      v-for="slide in slides"
      :key="slide">

      <h1>{{ slide["title"] }}</h1>
      <img class="carousel__item"
           :src="slide['slide']"
           alt="">

      <table>
        <tr>
          <td>Адрес:</td>
          <td>{{ slide["address"] }}</td>
        </tr>
        <tr>
          <td>Пн-Пт:</td>
          <td>{{ slide["weekdays"] }}</td>
        </tr>
        <tr>
          <td>Сб-Вс:</td>
          <td>{{ slide["weekends"] }}</td>
        </tr>
        <tr>
          <td>Телефон:</td>
          <td>{{ slide["phone"] }}</td>
        </tr>
      </table>

    </Slide>

    <template #addons>
      <Navigation />
    </template>

  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import Cafe1 from "@/assets/img/cafe1.jpeg";
import Cafe2 from "@/assets/img/cafe2.jpeg";
import Cafe3 from "@/assets/img/cafe3.jpeg";

import "vue3-carousel/dist/carousel.css";
import Page from "@/components/Page.vue";

export default defineComponent({
  name: "WrapAround",
  components: {
    Page,
    Carousel,
    Slide,
    Navigation
  },

  data() {
    return {
      slides: [
        {
          slide: Cafe1,
          title: "Pinzeria by Bontempi - 1",
          address: "г. Москва, Волхонка 16",
          weekdays: "11:00 — 23:00 , кухня 11:00 — 22:30",
          weekends: "11:00 - 23:45 , кухня 11:00 — 23:30",
          phone: " 499 678-30-09"
        },
        {
          slide: Cafe2,
          title: "Pinzeria by Bontempi - 2",
          address: "г. Москва, Волхонка 17",
          weekdays: "11:00 — 23:00 , кухня 11:00 — 22:30",
          weekends: "11:00 - 23:45 , кухня 11:00 — 23:30",
          phone: " 499 678-30-10"
        },
        {
          slide: Cafe3,
          title: "Pinzeria by Bontempi - 3",
          address: "г. Москва, Волхонка 18",
          weekdays: "11:00 — 23:00 , кухня 11:00 — 22:30",
          weekends: "11:00 - 23:45 , кухня 11:00 — 23:30",
          phone: " 499 678-30-11"
        }
      ]
    };
  }
});
</script>

<style>
td {
  min-width: 150px;
  text-align: start;
  padding: 10px;
}

.carousel__box {
  display: flex;
  flex-direction: column;
  background-color: var(--vt-c-archive-2);
  border-radius: 8px;
}

.carousel__item {
  width: 100%;
  min-height: 400px;
  border-radius: 8px;
  padding: 25px;
}

.carousel__slide {
  padding: 20px;
}

.carousel__prev,
.carousel__next {
  top: 45%;
  box-sizing: content-box;
  background-color: var(--vt-c-archive-2);
  border: 5px solid var(--vt-c-white);
}
</style>
