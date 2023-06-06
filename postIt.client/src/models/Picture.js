import { Profile } from "./Account.js"

export class Picture {
    constructor(data) {
        this.id = data.id
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.albumId = data.albumId
        this.creator = new Profile(data.creator)
    }
}