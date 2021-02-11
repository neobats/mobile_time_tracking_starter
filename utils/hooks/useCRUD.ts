import { useState } from "react"
import "react-native-get-random-values"
import { v4 as uuid } from "uuid"

export type CollectionItem = { id: string }

export interface CRUDFuncs<T extends CollectionItem> {
  create: (newItem: Exclude<T, { id: string }> | T) => T
  find: (existingId: string) => T | undefined
  map: <R extends CollectionItem = CollectionItem>(
    fn: (t: T) => R
  ) => [R[], CRUDFuncs<R>]
  remove: (idToBeRemoved: Pick<T, "id">) => boolean
  update: (id: string, timer: Partial<T>) => T | null
  updateAll: (fn: (t: T) => T) => T[]
}

export const useCRUD = <T extends CollectionItem>(
  initialItems: T | T[]
): [T[], CRUDFuncs<T>] => {
  type Collection = T[]
  type NewItem = Exclude<T, { id: string }>

  const initial = initialItems instanceof Array ? initialItems : [initialItems]
  // USE STATE HOOK CALL
  const [items, setItems] = useState<Collection>(initial)

  const create: CRUDFuncs<T>["create"] = (newItem: NewItem | T) => {
    if (newItem.id) {
      setItems([newItem, ...items])
      return newItem
    }
    const item = { ...newItem, id: uuid() }
    setItems([item, ...items])
    return item
  }

  const find: CRUDFuncs<T>["find"] = (existingId: string) => {
    return items.find(({ id }) => id === existingId)
  }

  const update: CRUDFuncs<T>["update"] = (
    id: string,
    newProperties: Partial<T>
  ) => {
    let newItem = {} as T
    setItems(
      items.map(t => {
        if (t.id === id) {
          newItem = { ...t, ...newProperties }
          return newItem
        } else {
          return t
        }
      })
    )
    // return null if id wasn't found.
    return newItem || null
  }

  const updateAll: CRUDFuncs<T>["updateAll"] = (fn: (item: T) => T): T[] => {
    const newList = items.map(fn)
    setItems(newList)
    return newList
  }

  const map: CRUDFuncs<T>["map"] = <R extends CollectionItem = T>(
    fn: (item: T) => R
  ): [R[], CRUDFuncs<R>] => {
    const newList = items.map(fn)

    return useCRUD<R>(newList)
  }

  const remove: CRUDFuncs<T>["remove"] = (idToBeRemoved: Pick<T, "id">) => {
    const newItemList = items.filter(({ id }) => id !== "" + idToBeRemoved) // have to cast to string for some strange reason
    // true if not deleted
    const wasDeleted = newItemList.length === items.length
    setItems(newItemList)
    // return whether or not the item was deleted.
    return !wasDeleted
  }

  return [items, { create, find, map, remove, update, updateAll }]
}
