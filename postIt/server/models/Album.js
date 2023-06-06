import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId



export const AlbumSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 25, minlength: 3 },
    category: {
      type: String, required: true, enum: ['cats', 'pugs', 'games',
        'books', 'aesthetics', 'tattoos', 'technology', 'misc', 'animals']
    },
    coverImg: { type: String, required: true, maxlength: 300, default: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
    archived: { type: Boolean, required: true, default: false },
    creatorId: { type: ObjectId, required: true, ref: 'Account' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// TODO we will comeback to member count
AlbumSchema.virtual('memberCount', {
  localField: '_id',
  foreignField: 'albumId',
  ref: 'Collaborator',
  count: true,
})

