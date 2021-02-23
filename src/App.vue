<template>
  <Header />
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/history">History</router-link>
  </div>
  <router-view />
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
$vue-dark: #2c3e50;
$vue-light: #42b983;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $vue-dark;
}

#nav {
  padding: 60px 0 30px;
}

#nav a {
  font-weight: bold;
  color: $vue-dark;
}

#nav a.router-link-exact-active {
  color: $vue-light;
}
</style>
