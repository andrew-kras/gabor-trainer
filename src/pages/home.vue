<template lang="pug">
.home
  .exercise-description
    p {{ $t('exercise.description.intro') }}
    p {{ $t('exercise.description.task') }}

    h2 {{ $t('exercise.description.howTo') }}
    p {{ $t('exercise.description.howToDetails') }}
    p {{ $t('exercise.description.howToDetails2') }}

    h2 {{ $t('exercise.description.why') }}
    p {{ $t('exercise.description.whyDetails') }}
  gt-button(
    :text="$t('buttons.startExercise')"
    size="large"
    @click="startExercise"
  )
  gt-button(
    :text="$t('buttons.settings')"
    size="large"
    @click="settingsModalVisible = !settingsModalVisible"
  )

settings-modal(
  v-model:visible="settingsModalVisible"
)
</template>

<script>
import { useRouter } from 'vue-router'
import GtButton from "../components/buttons/gtButton.vue";
import SettingsModal from "../components/gaborSettings.vue";

export default {
  name: 'home',

  components: {SettingsModal, GtButton},

  data: () => ({
    settingsModalVisible: false,
  }),

  setup() {
    const router = useRouter()
    const startExercise = () => router.push('/exercise')

    return { startExercise }
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap 24px

  padding-top 24px

  .exercise-description
    text-align center
    max-width 600px
    margin-bottom 20px
    line-height 1.5
    color $app-text-color

    h2
      font-weight 600
      margin-top 16px
      margin-bottom 8px

    p
      margin-bottom 12px

  @media (max-width: 768px)
    padding-left 16px
    padding-right 16px
    gap 16px

    .exercise-description
      max-width 100%
      margin-bottom 16px

      h2
        font-size 1.2rem
        margin-top 12px
        margin-bottom 6px

      p
        font-size 0.9rem
        margin-bottom 8px

  @media (max-width: 480px)
    .exercise-description
      h2
        font-size 1rem
        margin-top 10px
        margin-bottom 4px

      p
        font-size 0.85rem
        margin-bottom 6px

</style>