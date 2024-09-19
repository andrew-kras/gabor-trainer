<template lang="pug">
.settings-modal(
  v-if='visible'
  @click.self='close'
)
  .modal
    .title {{ $t('settings.title') }}
    .content
      .language
        label.language-title {{ $t('settings.language') }}
        select.language-dropdown(v-model="selectedLanguage" @change="changeLanguage")
          option(value="auto") {{ $t('settings.auto') }}
          option(value="en") {{ $t('settings.en') }}
          option(value="ru") {{ $t('settings.ru') }}
    .buttons
      gt-button(
        :text="$t('settings.exit')"
        @click="close()"
      )
      gt-button(
        :text="$t('settings.save')"
        @click="saveSettings()"
      )
</template>

<script>
import GtButton from "./buttons/gtButton.vue";

export default {
  name: 'settingsModal',

  components: { GtButton },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectedLanguage: 'auto'
    };
  },

  emits: ['update:visible'],

  methods: {
    close() {
      this.$emit('update:visible', false)
    },

    changeLanguage() {
      if (this.selectedLanguage === 'auto') {
        this.$i18n.locale = navigator.language.split('-')[0];
        localStorage.removeItem('gt-selected-language');
      } else {
        this.$i18n.locale = this.selectedLanguage;
      }
    },

    saveSettings() {
      if (this.selectedLanguage !== 'auto') {
        localStorage.setItem('gt-selected-language', this.selectedLanguage);
      }
      this.close();
    }
  },

  mounted() {
    const savedLanguage = localStorage.getItem('gt-selected-language');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    } else {
      this.selectedLanguage = 'auto';
    }
  }
}
</script>

<style scoped lang="stylus">
.settings-modal
  position absolute
  left 0
  top 0
  width 100vw
  height 100vh

  z-index 100

  display flex
  justify-content center
  align-items center

  background $modal-blur-color
  backdrop-filter blur(2px)

  .modal
    display flex
    flex-direction column

    width 700px

    padding 24px

    border-radius 8px

    background-color $app-bg-color
    box-shadow 0 13px 40px 0 $modal-shadow-color

    .content
      display flex
      flex-direction column
      justify-content flex-start
      align-items start

      .language
        display flex
        align-items center
        gap 100px
        color $app-text-color

    .title
      flex-grow 1
      margin-bottom 24px
      font-weight 600

    .buttons
      margin-top 32px

      display flex
      justify-content flex-end
      gap 16px

.language-dropdown
  appearance none
  width 200px
  padding 12px
  border-radius 12px
  background-color $buttons-bg-color
  box-shadow  0 8px 16px rgba(0, 0, 0, 0.2)
  border none
  font-size 16px
  color $app-text-color
  outline none
  cursor pointer
  transition all 0.3s ease

  &:hover
    box-shadow 0 12px 24px rgba(0, 0, 0, 0.3)

  &:focus
    box-shadow 0 6px 12px rgba(0, 0, 0, 0.15)

option
  padding 10px 15px
  background-color $buttons-bg-color
  color $app-text-color
  font-size 14px
  cursor pointer
  transition background-color 0.3s ease

  &:hover
    background-color lighten($buttons-bg-color, 5%)

  &:focus
    background-color lighten($buttons-bg-color, 10%)

  &:checked
    background-color darken($buttons-bg-color, 5%)
</style>