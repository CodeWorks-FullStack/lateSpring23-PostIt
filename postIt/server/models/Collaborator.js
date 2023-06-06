import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CollaboratorSchema = new Schema({
  albumId: { type: ObjectId, required: true, ref: 'Album' },
  accountId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })


CollaboratorSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  ref: 'Album',
  justOne: true
})

CollaboratorSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
