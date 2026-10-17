"use client"

import { useEffect, useSyncExternalStore } from "react"

/**
 * 把练习草稿存进 localStorage。
 *
 * 刻意做成一个极小的「外部 store」再用 useSyncExternalStore 读，而不是在 useEffect 里
 * 读出来再 setState：服务端没有 localStorage，首屏必须渲染空串才能保证 hydration 一致，
 * 而 effect + setState 既会多触发一轮渲染，也是 React 明确不推荐的写法。
 * 写入做了 400ms 防抖，避免每敲一个字就落一次盘。
 *
 * store 按 key 缓存在模块级 Map 里，所以同一次会话里反复挂载同一份草稿拿到的是同一个对象，
 * subscribe / getSnapshot 的引用也始终稳定（useSyncExternalStore 要求如此）。
 */
type DraftStore = {
  subscribe: (onChange: () => void) => () => void
  getSnapshot: () => string
  set: (value: string) => void
  clear: () => void
  flushIfPending: () => void
}

const stores = new Map<string, DraftStore>()

/** 服务端以及客户端首帧的快照：固定空串，保证两端一致 */
const EMPTY_SNAPSHOT = () => ""

function readRaw(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? ""
  } catch {
    // 隐私模式下 localStorage 可能直接抛错，退化成「不保存草稿」
    return ""
  }
}

function storeFor(key: string): DraftStore {
  const hit = stores.get(key)
  if (hit) return hit

  let cache: string | null = null
  let timer: ReturnType<typeof setTimeout> | null = null
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((l) => l())

  const flush = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    try {
      window.localStorage.setItem(key, cache ?? "")
    } catch {
      // 写不进去就算了，不影响这次练习
    }
  }

  const store: DraftStore = {
    subscribe(onChange) {
      listeners.add(onChange)
      return () => {
        listeners.delete(onChange)
      }
    },
    getSnapshot() {
      // 第一次读盘后缓存起来，之后直接返回缓存，保证快照引用稳定
      if (cache === null) cache = readRaw(key)
      return cache
    },
    set(value) {
      cache = value
      notify()
      if (timer) clearTimeout(timer)
      timer = setTimeout(flush, 400)
    },
    clear() {
      cache = ""
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      try {
        window.localStorage.removeItem(key)
      } catch {
        // 忽略
      }
      notify()
    },
    flushIfPending() {
      if (timer) flush()
    },
  }

  stores.set(key, store)
  return store
}

export function useLocalDraft(storageKey: string) {
  const store = storeFor(storageKey)
  const draft = useSyncExternalStore(store.subscribe, store.getSnapshot, EMPTY_SNAPSHOT)

  // 切走页面时把还没落盘的草稿补写一次
  useEffect(() => {
    return () => store.flushIfPending()
  }, [store])

  return { draft, setDraft: store.set, clear: store.clear }
}
