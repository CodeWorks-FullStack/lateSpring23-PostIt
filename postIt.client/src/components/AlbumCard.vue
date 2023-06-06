<template>
    <router-link :to="{ name: 'AlbumDetails', params: { id: album.id } }">
        <div class="rounded elevation-5 album-card">
            <img class="rounded-top" :src="album.coverImg" :alt="album.title">
            <div class="text-center bg-success p-2 rounded-bottom">
                <p class="m-0">{{ album.title }}</p>
                <p class="m-0">27<i class="mdi mdi-heart ps-2"></i></p>
            </div>
        </div>
    </router-link>
</template>

<script>
import { Album } from '../models/Album.js';
export default {
    props: {
        album: { type: Album, required: true } // NOTE: when binding data to this component....it will reference the name of the prop
    },
    setup() {

        return {};
    },
};
</script>

<style lang="scss">
.album-card {
    box-shadow: 2px 2px white;


    img {
        height: 35vh;
        width: 100%;
        object-fit: cover;
    }
}
</style>