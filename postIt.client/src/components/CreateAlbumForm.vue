<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Album</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- SECTION form -->
        <form @submit.prevent="createAlbum()">
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Album Title"
                        v-model="editable.title">
                    <label for="floatingInput">Album Title</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Cover Image"
                        v-model="editable.coverImg">
                    <label for="floatingPassword">Cover Image</label>
                </div>
                <div>
                    <select name="category" id="category" v-model="editable.category">
                        <option value="cats">Cats</option>
                        <option value="pugs">Pugs</option>
                        <option value="games">Games</option>
                        <option value="books">Books</option>
                        <option value="aesthetics">Aesthetics</option>
                        <option value="tattoos">Tattoos</option>
                        <option value="technology">Technology</option>
                        <option value="misc">Misc</option>
                        <option value="animals">Animals</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create Album</button>
            </div>
        </form>

    </div>
</template>



<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { albumsService } from '../services/AlbumsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,

            async createAlbum() {
                try {
                    // logger.log('creating album')
                    const formData = editable.value //NOTE: dig into and grab the VALUE of the object
                    const newAlbum = await albumsService.createAlbum(formData)
                    Modal.getOrCreateInstance('#createAlbum').hide()
                    editable.value = {} // reset the form
                    router.push({ name: 'AlbumDetails', params: { id: newAlbum.id } }) // push to the new album's page
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };
    },
};
</script>

<style></style>