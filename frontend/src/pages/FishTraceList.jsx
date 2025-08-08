import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { MapPin, RefreshCcw } from 'lucide-react'

export default function FishTraceList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')

    if (!navigator.onLine) {
      setError('Offline: tidak dapat terhubung ke server.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('fish_traces')
        .select('trace_id,species,fisherman_id,processing_method,eco_status,caught_at,latitude,longitude,location_label')
        .order('caught_at', { ascending: false })
        .limit(100)
      if (error) throw error
      setItems(data || [])
    } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'Gagal menghubungi server (periksa koneksi / URL Supabase)' : e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Data Fish Origin</h1>
        <button onClick={load} className="flex items-center gap-2 border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50">
          <RefreshCcw size={16}/> Muat Ulang
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading && <div className="card">Memuat...</div>}
        {!loading && !error && items.length === 0 && <div className="card">Belum ada data</div>}
        {!loading && !error && items.length > 0 && (
          items.map((it) => (
            <div key={it.trace_id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Trace ID</div>
                  <div className="font-mono text-sm break-all">{it.trace_id}</div>
                </div>
                {it.latitude && it.longitude && (
                  <a
                    className="btn-primary"
                    href={`https://www.google.com/maps?q=${it.latitude},${it.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={16}/> Lihat Peta
                  </a>
                )}
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">Jenis Ikan</div>
                  <div className="text-gray-900">{it.species || '-'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Identitas Nelayan</div>
                  <div className="text-gray-900">{it.fisherman_id || '-'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Waktu Penangkapan</div>
                  <div className="text-gray-900">{it.caught_at ? new Date(it.caught_at).toLocaleString() : '-'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Metode Pengolahan</div>
                  <div className="text-gray-900">{it.processing_method || '-'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Status Lingkungan</div>
                  <div className="text-gray-900">{it.eco_status || '-'}</div>
                </div>
                <div>
                  <div className="text-gray-500">Pinpoint</div>
                  <div className="text-gray-900">{it.location_label || '-'}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
