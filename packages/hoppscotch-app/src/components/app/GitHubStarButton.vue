<template>
  <GithubButton
    title="Forked from this magnificient project!"
    href="https://github.com/hoppscotch/hoppscotch"
    :data-color-scheme="
      colorMode.value != 'light'
        ? colorMode.value == 'black'
          ? 'dark'
          : 'dark_dimmed'
        : 'light'
    "
    data-show-count="true"
    data-text="OG Code"
    aria-label="Forked from this magnificient project!"
    :data-size="size"
  />
</template>

<script setup lang="ts">
import GithubButton from "vue-github-button"
import { useColorMode } from "@composables/theming"

const colorMode = useColorMode()

defineProps({
  size: {
    type: String,
    default: undefined,
  },
})
</script>
