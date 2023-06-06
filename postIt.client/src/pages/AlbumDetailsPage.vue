<template>
    <div class="container-fluid">
        <!-- NOTE if you don't want to deal with elvis operators....wrap your component or page in a v-if -->
        <section class="row pt-4" v-if="album">
            <!-- SECTION side bar -->
            <div class="col-md-4">
                <div class="row">
                    <div class="col-8">
                        <img class="rounded album-creator white-shadow" :src="album?.coverImg" :alt="album?.title">
                    </div>
                    <div class="col-4">
                        <div class="album-details rounded white-shadow p-2 mb-3">
                            <p class="m-0">{{ album?.title }}</p>
                            <p class="m-0">by {{ album?.creator.name }}</p>
                        </div>
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#createPicture">Add
                            Picture</button>
                    </div>
                </div>
            </div>
            <!-- SECTION album pictures -->
            <div class="col-md-8">
                <div class="row">
                    <img v-for="p in pictures" :key="p.imgUrl" :src="p?.imgUrl" class="album-img white-shadow rounded"
                        alt="">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import { picturesService } from '../services/PicturesService.js'
import { AppState } from '../AppState.js';
export default {
    setup() {
        const route = useRoute()
        async function getAlbumById() {
            try {
                // debugger
                const albumId = route.params.id
                await albumsService.getAlbumById(albumId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getPicturesByAlbumId() {
            try {
                const albumId = route.params.id
                await picturesService.getPicturesByAlbumId(albumId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        onMounted(() => {
            getAlbumById()
            getPicturesByAlbumId()
        })

        return {
            album: computed(() => AppState.activeAlbum),
            pictures: computed(() => AppState.pictures)
        };
    },
};
</script>

<style>
.white-shadow {
    box-shadow: 2px 2px white;

}

.album-creator {
    height: 25vh;
    width: 100%;
    object-fit: cover;
}

.album-img {
    height: 35vh;
    width: 35vh;
    object-fit: cover;
}

.album-details {
    background-color: pink;

}
</style>