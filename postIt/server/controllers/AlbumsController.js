import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.findAllAlbums)
      .get('/:albumId', this.findAlbumById)
      .get('/:albumId/pictures', this.findAlbumPictures)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:albumId', this.archiveAlbum)

  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async findAllAlbums(req, res, next) {
    try {
      const albums = await albumsService.findAllAlbums()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async findAlbumById(req, res, next) {
    try {
      const album = await albumsService.findAlbumById(req.params.albumId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(req, res, next) {
    try {
      const album = await albumsService.archiveAlbum(req.params.albumId, req.userInfo.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async findAlbumPictures(req, res, next) {
    try {
      const pictures = await picturesService.findAlbumPictures(req.params.albumId)
      res.send(pictures)
    } catch (error) {
      next(error)
    }
  }
}
