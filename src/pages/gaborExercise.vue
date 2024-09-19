<template lang="pug">
  .exercise
    .timer {{ formattedTime }}
    .gabor-grid
      .gabor-spot(v-for="(spot, index) in shuffledSpots" :key="index")
        canvas(:ref="el => canvasRefs[index] = el" width="100" height="100")
    gt-button(
      :text="$t('buttons.exit')"
      @click="backToHome"
    )
</template>

<script>
import { useRouter } from 'vue-router'

import GtButton from "../components/buttons/gtButton.vue";

function generateGaborPatch(canvas, size = 100, options = {}) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const lambda = options.lambda || 10;
  const sigma = options.sigma || 15;
  const theta = options.theta || Math.PI / 4;
  const phase = options.phase || Math.PI / 2;
  const contrast = options.contrast || 1.0;

  const w = canvas.width;
  const h = canvas.height;
  const midX = w / 2;
  const midY = h / 2;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const xr = (x - midX) * Math.cos(theta) + (y - midY) * Math.sin(theta);
      const yr = -(x - midX) * Math.sin(theta) + (y - midY) * Math.cos(theta);
      const gaborValue = contrast * Math.exp(-(xr ** 2 + yr ** 2) / (2 * sigma ** 2)) * Math.cos(2 * Math.PI * xr / lambda + phase);
      const intensity = Math.floor((gaborValue + 1) * 128);
      ctx.fillStyle = `rgb(${intensity},${intensity},${intensity})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default {
  name: 'gaborExercise',

  components: { GtButton },

  data() {
    return {
      spots: Array(30).fill(null),
      shuffledSpots: [],
      canvasRefs: [],
      timeLeft: 180
    };
  },

  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },

  methods: {
    startTimer() {
      const timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    },
  },

  setup() {
    const router = useRouter();
    const backToHome = () => router.push('/');

    return { backToHome };
  },

  mounted() {
    this.startTimer();

    const uniqueSpots = [];
    for (let i = 0; i < 30; i++) {
      uniqueSpots.push({
        lambda: Math.random() * 20 + 5,
        sigma: Math.random() * 20 + 5,
        theta: Math.random() * Math.PI,
        phase: Math.random() * Math.PI * 2,
        contrast: Math.random() * 0.8 + 0.2
      });
    }

    this.shuffledSpots = shuffleArray([...uniqueSpots, ...uniqueSpots]);

    this.$nextTick(() => {
      this.canvasRefs.forEach((canvas, index) => {
        if (canvas) {
          const spot = this.shuffledSpots[index];
          generateGaborPatch(canvas, 100, spot);
        }
      });
    });
  }
};
</script>

<style scoped lang="stylus">
.exercise
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap 12px

  .timer
    font-size 24px
    font-weight bold

  .gabor-grid
    display grid
    grid-template-columns repeat(10, 1fr)
    grid-template-rows repeat(6, 1fr)
    gap 10px
    margin 0 auto

    .gabor-spot
      display flex
      justify-content center
      align-items center
      background-color $gabor-bg-color
      width 100px
      height 100px
      border-radius 8px
      box-shadow 0 4px 8px rgba(0, 0, 0, 0.2)
      cursor default

      canvas
        width 100px
        height 100px
</style>
