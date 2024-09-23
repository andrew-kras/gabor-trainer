<template lang="pug">
  .app
    .header
      img.logo(
        src='/logo.svg'
      )
      h1 {{ $t('header.title') }}
    .main
      router-view
    .footer
      a(href='https://github.com/andrew-kras', target='_blank')
        img.github-icon(src='/github_logo.png', alt='GitHub')
</template>

<script>

</script>

<style lang="stylus">
@import "./styles/globals.styl"
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')

.app
  height 100vh
  width 100vw

  font-family "Montserrat", sans-serif
  font-weight 400
  font-style normal
  text-align center

  color $app-text-color
  background-color $app-bg-color

  .header
    background-color $header-bg-color
    border-bottom 1px solid $header-border-color
    padding 10px
    box-shadow 0 2px 4px $header-shadow-color
    display flex
    justify-content center
    align-items center
    gap 10px
    width 100%

    .logo
      width 36px
      height 36px

  .main
    padding 30px

  .footer
    border-top 1px solid $footer-border-color
    background-color $footer-bg-color
    width 100%
    position fixed
    bottom 0
    display flex
    justify-content center
    align-items center

    img.github-icon
      width 52px
      height 22px
</style>
