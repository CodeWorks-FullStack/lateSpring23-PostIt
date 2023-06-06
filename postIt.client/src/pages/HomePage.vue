<template>
  <div class="container-fluid">
    <!-- SECTION my albums -->
    <section class="row"></section>
    <!-- SECTION filter buttons -->
    <section class="row"></section>
    <!-- SECTION all albums -->
    <section class="row px-5">
      <div class="col-md-3 my-3 p-4" v-for="a in albums" :key="a.id">
        <!-- STUB album card template -->
        <AlbumCard :album="a" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { albumsService } from '../services/AlbumsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
export default {
  setup() {

    async function getAlbums() {
      try {
        logger.log('getting albums')
        await albumsService.getAlbums()
      } catch (error) {
        Pop.error(error.message)
        logger.log(error)
      }
    }

    onMounted(() => {
      getAlbums()
    })

    return {
      albums: computed(() => AppState.albums) // use computed to access the data in the AppState
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
