<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Picture</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="createPicture()">
            <div class="modal-body">
                <div class="form-floating">
                    <input required type="text" class="form-control" id="floatingPassword" placeholder="Image URL"
                        v-model="editable.imgUrl">
                    <label for="floatingPassword">Image URL</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create Picture</button>
            </div>
        </form>

    </div>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { picturesService } from '../services/PicturesService.js';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';
export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async createPicture() {
                try {
                    // logger.log('creating picture')
                    const formData = editable.value
                    formData.albumId = route.params.id //NOTE: assign the albumId to the album we are currently on
                    await picturesService.createPicture(formData)
                    Modal.getOrCreateInstance('#createPicture').hide()
                    editable.value = {} //reset/clear out the form
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