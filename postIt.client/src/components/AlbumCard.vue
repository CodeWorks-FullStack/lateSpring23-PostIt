<template>
    <router-link :to="{ name: 'AlbumDetails', params: { id: album.id } }">
        <div class="rounded elevation-5 album-card fredoka-one">
            <img class="rounded-top" :src="album.coverImg" :alt="album.title">
            <div class="text-center p-2 rounded-bottom text-white fw-bold" :class="getRandomBg()">
                <p class="m-0">{{ album.title }}</p>
                <!-- TODO put album collab count here -->
                <p class="m-0">{{ album.memberCount }}<i class="mdi mdi-heart ps-2"></i></p>
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
        // ANCHOR this array and the getRandomBg() method handle getting a random bg color
        const bgs = [
            'bg-success',
            'bg-danger',
            'bg-warning',
            'bg-info',
            'bg-primary',
            'bg-secondary'
        ]
        return {
            getRandomBg() {
                return bgs[Math.floor(bgs.length * Math.random())]
            }
        };
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