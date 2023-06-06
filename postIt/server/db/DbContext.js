import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album.js';
import { PictureSchema } from '../models/Picture.js';
import { CollaboratorSchema } from '../models/Collaborator.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Albums = mongoose.model('Album', AlbumSchema)
  Pictures = mongoose.model('Picture', PictureSchema)
  Collaborators = mongoose.model('Collaborator', CollaboratorSchema)
}

export const dbContext = new DbContext()
