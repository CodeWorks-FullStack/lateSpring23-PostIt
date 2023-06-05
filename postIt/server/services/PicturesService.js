import { dbContext } from "../db/DbContext.js"


class PicturesService {
  async findAlbumPictures(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator')
    return pictures
  }
  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    // TODO populate?
    await picture.populate('creator')
    return picture
  }

}

export const picturesService = new PicturesService()
