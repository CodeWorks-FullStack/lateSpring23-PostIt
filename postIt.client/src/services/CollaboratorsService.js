import { AppState } from "../AppState.js"
import { Collab } from "../models/Collab.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CollaboratorsService {

    async getMyCollabs() {
        const res = await api.get('account/collaborators')
        logger.log('[GETTING ACCOUNT COLLABS]', res.data)
        AppState.myCollabs = res.data.map(c => new Collab(c))
        logger.log(AppState.myCollabs)
    }

    async getCollabsByAlbumId(albumId) {
        const res = await api.get(`api/albums/${albumId}/collaborators`)
        logger.log('[GETTING ALBUM COLLABS]', res.data)
        AppState.collabs = res.data.map(c => new Collab(c))
    }

    async createCollab(albumId) {
        const res = await api.post('api/collaborators', { albumId }) //NOTE: make sure you are formatting this as an object, if you just send up the albumId.... your server will reject it!
        logger.log('[CREATING COLLAB]', res.data)
        AppState.activeAlbum.memberCount++
        AppState.collabs.push(new Collab(res.data))
    }

    async removeCollab(collabId) {
        const res = await api.delete(`api/collaborators/${collabId}`)
        logger.log('[DELETING COLLAB]', res.data)
        AppState.activeAlbum.memberCount--

        AppState.collabs = AppState.collabs.filter(c => c.id != collabId) // gives us reactivity when deleting a collab
    }
}

export const collaboratorsService = new CollaboratorsService()