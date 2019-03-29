<template>
  <div>
    <p class="card" @click="clickMessage">
      {{text}}dddd
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods:{
    clickMessage(){
      console.log('---------fjefhejkfheiufhejifkuehfief')
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
