<template>
  <header>
    <Navbar />
  </header>
  <main class="background-img">
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>

  <!-- use my modal component and give it a unique id  -->
  <Modal id="createAlbum">
    <!-- injecting whatever I want to draw into the modal using slots -->
    <CreateAlbumForm />
  </Modal>

  <Modal id="createPicture">
    <CreatePictureForm />
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.background-img {
  background-image: url('./assets/img/backgroundImg.png');
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
