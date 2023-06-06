import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";



export class CollaboratorsController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCollaboration)
      .delete('/:collabId', this.removeCollaborator)
  }

  async createCollaboration(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const collab = await collaboratorsService.createCollaboration(req.body)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }

  async removeCollaborator(req, res, next) {
    try {
      const message = await collaboratorsService.removeCollaborator(req.params.collabId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
