<template lang="pug">
  button.gt-button(
    :class='classes'
    :disabled='disabled'
    @click='$emit("buttonEvent")'
  )
    | {{ text }}
</template>

<script>
export default {
  name: 'gtButton',
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        [this.variant]: true,
        [this.size]: true,
        'disabled': this.disabled
      }
    }
  }
}
</script>

<style scoped lang="stylus">
button
  padding 10px 20px
  width max-content
  border-radius 12px

  font-size 16px

  background-color $buttons-bg-color
  color $app-text-color

  border none
  cursor pointer
  outline none

  transition all 0.3s ease
  box-shadow 0 8px 16px rgba(0, 0, 0, 0.2)

  &:hover
    box-shadow 0 12px 24px rgba(0, 0, 0, 0.3)

  &:active
    box-shadow 0 6px 12px rgba(0, 0, 0, 0.15)

    transform translateY(2px)

  &.disabled
    cursor not-allowed
    opacity 0.6


.gt-button.small
  padding 8px 16px
  font-size 14px

.gt-button.medium
  padding 10px 20px
  font-size 16px

.gt-button.large
  padding 12px 24px
  font-size 18px

.gt-button.primary
  background-color $bg-color

.gt-button.secondary
  background-color $buttons-bg-color-secondary
</style>
