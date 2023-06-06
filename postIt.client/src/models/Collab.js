import { Profile } from "./Account.js"
import { Album } from "./Album.js"

export class Collab {
    constructor(data) {
        this.id = data.id
        this.accountId = data.accountId
        this.albumId = data.albumId
        // ANCHOR: we are just going to use POJO's here
        this.profile = data.profile // profile or it's null
        this.album = data.album // album or it's null
    }
}

export class AlbumMember extends Collab {
    constructor(data) {
        super(data)
        this.profileId = data.profile.id
        this.name = data.profile.name
        this.picture = data.profile.picture
    }
}

export class CollabedAlbum extends Collab {
    constructor(data) {
        super(data)
        this.title = data.album.title
        this.coverImg = data.album.coverImg
    }
}



