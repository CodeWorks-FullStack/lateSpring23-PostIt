import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumsService {

    async getAlbums() {
        const res = await api.get('api/albums')
        logger.log('[GETTING ALBUMS]', res.data)
        AppState.albums = res.data.map(a => new Album(a))
        // logger.log(AppState.albums)
    }

    async getAlbumById(albumId) {
        const res = await api.get(`api/albums/${albumId}`)
        logger.log('[GETTING ALBUM BY ID]', res.data)
        AppState.activeAlbum = new Album(res.data)
        // logger.log(AppState.activeAlbum)
    }

    async createAlbum(formData) {
        const res = await api.post('api/albums', formData)
        logger.log('[CREATING ALBUM]', res.data)
        return res.data // NOTE: return the response so then we can access the id for the router push
    }

    async archiveAlbum(albumId) {
        const res = await api.delete(`api/albums/${albumId}`)
        logger.log(res.data)
    }

}

export const albumsService = new AlbumsService()