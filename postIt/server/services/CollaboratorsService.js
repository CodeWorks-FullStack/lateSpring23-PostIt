import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CollaboratorsService {
  async createCollaboration(collabData) {
    const collab = await dbContext.Collaborators.create(collabData)
    await collab.populate('profile album')
    return collab
  }

  async findAlbumCollaborators(albumId) {
    const collabs = await dbContext.Collaborators.find({ albumId: albumId }).populate('profile album')
    return collabs
  }
  async getAccountCollaborations(accountId) {
    // const collabs = await dbContext.Collaborators.find({ accountId: accountId }).populate('album').populate({ path: 'album', populate: { path: 'memberCount' } }) IF you are crazy enough to do nested population
    const collabs = await dbContext.Collaborators.find({ accountId: accountId }).populate('album profile')
    return collabs
  }

  // this just lets the controller dictacte what is pulled from the service
  async getCollabs(filter) {
    const collabs = await dbContext.Collaborators.find(filter).populate('album profile')
    return collabs
  }
  async removeCollaborator(collabId, userId) {
    const collab = await dbContext.Collaborators.findById(collabId).populate('album profile')

    if (!collab) throw new BadRequest(`Collaboration at id: ${collabId} does not exist`)
    if (collab.accountId != userId) throw new Forbidden("Not yours to delete")

    await collab.remove()
    return `collaboration between ${collab.profile.name} and ${collab.album.title} has ended.`
  }

}

export const collaboratorsService = new CollaboratorsService()
