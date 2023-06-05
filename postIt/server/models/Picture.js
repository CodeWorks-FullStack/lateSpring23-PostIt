import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
export const PictureSchema = new Schema({
  imgUrl: { type: String, required: true, maxlength: 300, minlength: 20 },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  albumId: { type: ObjectId, required: true, ref: 'Album' }
}, { timestamps: true, toJSON: { virtuals: true } })


// FIXME do i need virtuals here?
PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
