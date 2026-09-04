import mongoose from 'mongoose'
import { FollowModel, type FollowEntityType as FollowEntityTypeModel } from '../models/Follow'

export type FollowEntityType = FollowEntityTypeModel

export interface FollowRecord {
  id: string
  userId: string
  entityType: FollowEntityType
  entityId: string
  createdAt: string
}

export class FollowService {
  private readonly memory = new Map<string, FollowRecord[]>()

  private persistToMongo(record: FollowRecord): void {
    if (mongoose.connection.readyState !== 1) {
      return
    }

    void FollowModel.findOneAndUpdate(
      { userId: record.userId, entityType: record.entityType, entityId: record.entityId },
      { $setOnInsert: { userId: record.userId, entityType: record.entityType, entityId: record.entityId } },
      { upsert: true, new: true },
    ).catch(() => undefined)
  }

  private deleteFromMongo(userId: string, entityType: FollowEntityType, entityId: string): void {
    if (mongoose.connection.readyState !== 1) {
      return
    }

    void FollowModel.deleteOne({ userId, entityType, entityId }).catch(() => undefined)
  }

  follow(userId: string, entityType: FollowEntityType, entityId: string): FollowRecord {
    const list = this.memory.get(userId) ?? []
    const existing = list.find(
      (item) => item.entityType === entityType && item.entityId === entityId,
    )

    if (existing) {
      this.persistToMongo(existing)
      return existing
    }

    const record: FollowRecord = {
      id: `${userId}:${entityType}:${entityId}`,
      userId,
      entityType,
      entityId,
      createdAt: new Date().toISOString(),
    }

    this.memory.set(userId, [...list, record])
    this.persistToMongo(record)
    return record
  }

  unfollow(userId: string, entityType: FollowEntityType, entityId: string): boolean {
    const list = this.memory.get(userId) ?? []
    const next = list.filter(
      (item) => !(item.entityType === entityType && item.entityId === entityId),
    )

    if (next.length === list.length) {
      this.deleteFromMongo(userId, entityType, entityId)
      return false
    }

    this.memory.set(userId, next)
    this.deleteFromMongo(userId, entityType, entityId)
    return true
  }

  getUserFollows(userId: string): FollowRecord[] {
    return [...(this.memory.get(userId) ?? [])]
  }

  getEntityIdsByType(userId: string, entityType: FollowEntityType): Set<string> {
    const ids = new Set<string>()

    for (const item of this.getUserFollows(userId)) {
      if (item.entityType === entityType) {
        ids.add(item.entityId)
      }
    }

    return ids
  }

  has(userId: string, entityType: FollowEntityType, entityId: string): boolean {
    return this.getUserFollows(userId).some(
      (item) => item.entityType === entityType && item.entityId === entityId,
    )
  }
}

export const followService = new FollowService()
