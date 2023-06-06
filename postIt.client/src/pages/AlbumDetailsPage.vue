<template>
    <div class="container-fluid fredoka-one fw-bold">
        <!-- NOTE if you don't want to deal with elvis operators....wrap your component or page in a v-if -->
        <section class="row pt-4" v-if="album">
            <!-- SECTION side bar -->
            <div class="col-md-4">
                <div class="row">
                    <div class="col-7">
                        <img class="rounded album-creator white-shadow" :src="album?.creator.picture" :alt="album?.title">
                    </div>
                    <div class="col-5">
                        <div class="bg-warning rounded white-shadow p-2 mb-3">
                            <p class="m-0 fs-4 text-white">{{ album?.title }}</p>
                            <p class="m-0">by {{ album?.creator.name }}</p>
                        </div>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#createPicture"
                            :disabled="album.archived == true"><i class="mdi mdi-plus"></i> add
                            Picture</button>
                        <button v-if="album.creatorId == user.id" class="btn btn-success" @click="archiveAlbum()"><i
                                class="mdi mdi-minus"></i>
                            archive
                            album</button>
                    </div>
                    <div class="col-6 text-white pt-3">
                        <div class="white-shadow bg-info rounded p-1 fw-bold fs-5">
                            <!-- TODO add # of collabs here -->
                            <p class="m-0">{{ album.memberCount }}</p>
                            <p>Collaborators</p>
                        </div>
                    </div>
                    <div class="col-6 pt-3 ">
                        <!-- TODO conditionally render button -->
                        <button v-if="!isCollaborator" class="btn btn-info text-center white-shadow fs-5 text-white fw-bold"
                            @click="createCollab()"><i class="mdi mdi-heart"></i>
                            Collab</button>
                        <button v-else class="btn btn-dark text-center white-shadow fs-5 text-white fw-bold"
                            @click="removeCollab()"><i class="mdi mdi-heart-broken"></i>
                            Uncollab</button>
                    </div>
                </div>
                <!-- TODO draw album collaborators here -->
                <div class="row p-2">
                    <img v-for="c in collabs" :key="c.id" :src="c.profile.picture" :alt="c.profile.name"
                        class="collab-img white-shadow rounded">

                </div>
            </div>
            <!-- SECTION album pictures -->
            <div class="col-md-8">
                <div class="row">
                    <img v-for="p in pictures" :key="p.imgUrl" :src="p?.imgUrl" class="album-img rounded m-2" alt="">
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
import { collaboratorsService } from '../services/CollaboratorsService.js';
export default {
    setup() {
        const route = useRoute()

        async function getCollabsByAlbumId() {
            try {
                const albumId = route.params.id
                await collaboratorsService.getCollabsByAlbumId(albumId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

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
            getCollabsByAlbumId()
        })

        return {
            album: computed(() => AppState.activeAlbum),
            pictures: computed(() => AppState.pictures),
            collabs: computed(() => AppState.collabs),
            // NOTE if the appstate.collabs includes my id return true, if it doesn't return false
            isCollaborator: computed(() => AppState.collabs.find(c => c.accountId == AppState.user.id)),
            user: computed(() => AppState.user),

            async createCollab() {
                try {
                    const albumId = route.params.id
                    await collaboratorsService.createCollab(albumId)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },

            async removeCollab() {
                try {
                    if (await Pop.confirm) {
                        const collab = AppState.collabs.find(c => c.accountId == AppState.account.id)
                        await collaboratorsService.removeCollab(collab.id)
                    }
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },

            async archiveAlbum() {
                try {
                    if (await Pop.confirm()) {
                        await albumsService.archiveAlbum(route.params.id)
                    }
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
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
    box-shadow: 2px 2px white;

}

.collab-img {
    height: 10vh;
    width: 10vh;
    object-fit: cover;
}
</style>