<template>
  <div class="carousel-wrapper">
    <n-carousel autoplay class="carousel">
      <img
        src="~/assets/images/carousel/diagram.png"
        alt="diagram"
        class="carousel-img"
      />
      <img
        src="~/assets/images/carousel/graphimg.png"
        alt="graphimg"
        class="carousel-img"
      />
      <img
        src="~/assets/images/carousel/main.png"
        alt="main"
        class="carousel-img"
      />
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { NCarousel } from 'naive-ui'
</script>

<style scoped lang="scss">
.carousel-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.carousel {
  width: 70%;
  .carousel-img {
    width: 100%;
    object-fit: cover;
  }

  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    justify-content: center;
    li {
      display: inline-block;
      width: 12px;
      height: 4px;
      margin: 0 3px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.4);
      transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      &.is-active {
        width: 40px;
        background: #000;
      }
    }
  }
}
</style>
