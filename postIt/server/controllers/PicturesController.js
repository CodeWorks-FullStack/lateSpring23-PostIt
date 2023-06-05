import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";


export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }

  async createPicture(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const picture = await picturesService.createPicture(req.body)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}
