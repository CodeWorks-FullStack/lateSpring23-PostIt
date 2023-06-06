import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class AlbumsService {
  async create(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator memberCount')
    return album
  }
  async findAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator memberCount')
    return albums
  }
  async findAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator memberCount')
    if (!album) throw new BadRequest(`Album at id: ${albumId} could not be found, try again.`)

    return album
  }

  async archiveAlbum(albumId, userId) {
    const album = await this.findAlbumById(albumId)
    if (album.creatorId != userId) throw new Forbidden("That's my purse, i don't know you!")

    album.archived = true // !album.archived to allow toggling
    await album.save()
    return album
  }

}

export const albumsService = new AlbumsService()
