import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PicturesService {

    async getPicturesByAlbumId(albumId) {
        AppState.pictures = [] //get rid of the ghost data
        const res = await api.get(`api/albums/${albumId}/pictures`)
        // const res = await api.get('api/albums' + albumId + '/pictures')
        logger.log('[GETTING PICTURES FOR ALBUMS]', res.data)
        AppState.pictures = res.data.map(p => new Picture(p))
        // logger.log(AppState.pictures)
    }

    async createPicture(formData) {
        const res = await api.post('api/pictures', formData)
        logger.log('[CREATING PICTURE]', res.data)
        AppState.pictures.push(new Picture(res.data))
    }

}

export const picturesService = new PicturesService()