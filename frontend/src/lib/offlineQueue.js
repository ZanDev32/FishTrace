// Simple IndexedDB-based offline queue for fish trace records
const DB_NAME = 'gemastik_offline'
const STORE_NAME = 'fish_traces_queue'
const DB_VERSION = 1

function toIdbError(e, fallback) {
  const msg = e?.target?.error?.message || e?.message || fallback
  return new Error(msg)
}

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'trace_id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = (e) => reject(toIdbError(e, 'IndexedDB open failed'))
  })
}

export async function queueTrace(record) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put(record)
    tx.oncomplete = () => resolve(true)
    tx.onerror = (e) => reject(toIdbError(e, 'IndexedDB write failed'))
  })
}

export async function getQueuedTraces() {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).getAll()
    req.onsuccess = () => resolve(req.result || [])
    req.onerror = (e) => reject(toIdbError(e, 'IndexedDB read failed'))
  })
}

export async function removeQueuedTrace(trace_id) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).delete(trace_id)
    tx.oncomplete = () => resolve(true)
    tx.onerror = (e) => reject(toIdbError(e, 'IndexedDB delete failed'))
  })
}
