<template>
  <div id="app">
    <octEditor v-model="html"></octEditor>
    <div>
      html: {{html}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: ''
    }
  }
}
</script>
