import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { collaboratorsService } from '../services/CollaboratorsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getAccountCollaborations)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountCollaborations(req, res, next) {
    try {
      const userId = req.userInfo.id
      const collabs = await collaboratorsService.getAccountCollaborations(req.userInfo.id)
      // const collabs = await collaboratorsService.getCollabs({ accountId: userId }) refactor
      return res.send(collabs)
    } catch (error) {
      next(error)
    }
  }
}
