import mongoose, { type Document, Schema } from 'mongoose'

export type FollowEntityType = 'team' | 'player' | 'league'

export interface IFollowDocument extends Document {
  userId: string
  entityType: FollowEntityType
  entityId: string
  createdAt: Date
  updatedAt: Date
}

const FollowSchema = new Schema<IFollowDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['team', 'player', 'league'],
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

FollowSchema.index({ userId: 1, entityType: 1, entityId: 1 }, { unique: true })

export const FollowModel =
  mongoose.models.Follow || mongoose.model<IFollowDocument>('Follow', FollowSchema)
