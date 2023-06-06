import { Profile } from "./Account.js"

export class Album {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.category = data.category
        this.coverImg = data.coverImg
        this.archived = data.archived
        this.creatorId = data.creatorId
        this.memberCount = data.memberCount
        this.creator = new Profile(data.creator) // this is not neccessary, but allows for better intellisense by passing the creator POJO through the constructor
    }
}