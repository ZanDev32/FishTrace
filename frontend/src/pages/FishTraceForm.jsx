import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { queueTrace, getQueuedTraces, removeQueuedTrace } from '../lib/offlineQueue'
import { MapPin, CalendarClock, Fish, User, Leaf, Cog, Upload, AlertCircle } from 'lucide-react'

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const DEFAULT_STATUS = 'eco_friendly'

export default function FishTraceForm() {
  const [form, setForm] = useState({
    trace_id: '',
    species: '',
    fisherman_id: '',
    processing_method: '',
    eco_status: DEFAULT_STATUS,
    caught_at: '',
    latitude: null,
    longitude: null,
    location_label: '',
  })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [queued, setQueued] = useState([])
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState('')
  const [accuracy, setAccuracy] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setForm(f => ({ ...f, trace_id: uuidv4(), caught_at: new Date().toISOString() }))
    refreshQueue()
    // Try to get current position once (best effort)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm(f => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude }))
        setAccuracy(Math.round(pos.coords.accuracy))
      })
    }
    // Auto sync when back online
    const onOnline = () => syncQueued()
    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [])

  async function refreshQueue() {
    const q = await getQueuedTraces()
    setQueued(q)
  }

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'latitude' || name === 'longitude') {
      const num = value === '' ? null : parseFloat(value)
      setForm(f => ({ ...f, [name]: Number.isNaN(num) ? null : num }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  async function requestGPS() {
    setGpsError('')
    if (!('geolocation' in navigator)) {
      setGpsError('Perangkat tidak mendukung Geolocation')
      return
    }
    setGpsLoading(true)
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        })
      })
      setForm(f => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude }))
      setAccuracy(Math.round(pos.coords.accuracy))
    } catch (e) {
      let msg = e.message
      if (e.code === 1) msg = 'Izin lokasi ditolak'
      if (e.code === 2) msg = 'Tidak dapat memperoleh lokasi'
      if (e.code === 3) msg = 'Permintaan lokasi kedaluwarsa (timeout)'
      setGpsError(msg)
    } finally {
      setGpsLoading(false)
    }
  }

  async function saveRecord(toQueueOnly = false) {
    setPending(true)
    setError('')

    const record = { ...form }

    try {
      if (!navigator.onLine || toQueueOnly) {
        await queueTrace(record)
        await refreshQueue()
        alert('Data disimpan offline. Akan disinkronkan saat online.')
        setPending(false)
        return
      }

      const { error } = await supabase.from('fish_traces').insert({
        trace_id: record.trace_id,
        species: record.species,
        fisherman_id: record.fisherman_id,
        processing_method: record.processing_method,
        eco_status: record.eco_status,
        caught_at: record.caught_at,
        latitude: record.latitude,
        longitude: record.longitude,
        location_label: record.location_label,
      })

      if (error) throw error
      alert('Data berhasil dikirim!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  async function syncQueued() {
    if (!navigator.onLine) return
    const items = await getQueuedTraces()

    for (const item of items) {
      const { error } = await supabase.from('fish_traces').insert({
        trace_id: item.trace_id,
        species: item.species,
        fisherman_id: item.fisherman_id,
        processing_method: item.processing_method,
        eco_status: item.eco_status,
        caught_at: item.caught_at,
        latitude: item.latitude,
        longitude: item.longitude,
        location_label: item.location_label,
      })
      if (!error) {
        await removeQueuedTrace(item.trace_id)
      }
    }
    await refreshQueue()
  }

  function openGoogleMaps() {
    if (form.latitude && form.longitude) {
      const url = `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
      window.open(url, '_blank')
    } else {
      alert('Koordinat belum tersedia')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Input Data Pelacakan (Fish Origin)</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-sm text-gray-700 flex items-center gap-2"><Fish size={16}/> Jenis Ikan</span>
            <input name="species" value={form.species} onChange={handleChange} className="input-field" placeholder="contoh: Tongkol" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700 flex items-center gap-2"><User size={16}/> Identitas Nelayan</span>
            <input name="fisherman_id" value={form.fisherman_id} onChange={handleChange} className="input-field" placeholder="ID/KTP/No Kartu Nelayan" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700 flex items-center gap-2"><Cog size={16}/> Metode Pengolahan</span>
            <input name="processing_method" value={form.processing_method} onChange={handleChange} className="input-field" placeholder="contoh: dibekukan, diasap" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700 flex items-center gap-2"><Leaf size={16}/> Status Ramah Lingkungan</span>
            <select name="eco_status" value={form.eco_status} onChange={handleChange} className="input-field">
              <option value="eco_friendly">Ramah Lingkungan</option>
              <option value="bycatch_risk">Risiko Bycatch</option>
              <option value="restricted">Terbatas/Restriksi</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700 flex items-center gap-2"><CalendarClock size={16}/> Waktu Penangkapan</span>
            <input type="datetime-local" name="caught_at" value={form.caught_at ? form.caught_at.substring(0,16) : ''} onChange={(e)=> setForm(f=>({...f, caught_at: new Date(e.target.value).toISOString()}))} className="input-field" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">
                <span className="text-sm text-gray-700 flex items-center gap-2"><MapPin size={16}/> Latitude</span>
                <input type="number" step="any" name="latitude" value={form.latitude ?? ''} onChange={handleChange} className="input-field" placeholder="-6.2" />
              </label>
            </div>
            <div>
              <label className="block">
                <span className="text-sm text-gray-700 flex items-center gap-2"><MapPin size={16}/> Longitude</span>
                <input type="number" step="any" name="longitude" value={form.longitude ?? ''} onChange={handleChange} className="input-field" placeholder="106.8" />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button type="button" onClick={requestGPS} className="btn-primary w-full disabled:opacity-50" disabled={gpsLoading}>
              {gpsLoading ? 'Mengambil lokasi...' : 'Ambil Lokasi GPS (Offline)'}
            </button>
            {(accuracy !== null || gpsError) && (
              <div className="text-sm text-gray-600">
                {accuracy !== null && <span>Akurasi: ~{accuracy} m</span>}
                {accuracy !== null && gpsError && <span className="mx-2">|</span>}
                {gpsError && <span className="text-red-600">{gpsError}</span>}
              </div>
            )}
          </div>

          <label className="block">
            <span className="text-sm text-gray-700">Pinpoint Google Maps (label lokasi)</span>
            <input name="location_label" value={form.location_label} onChange={handleChange} className="input-field" placeholder="contoh: Dermaga Muara Angke" />
          </label>

          <button type="button" onClick={openGoogleMaps} className="btn-primary w-full flex items-center justify-center gap-2">
            <MapPin size={18}/> Buka di Google Maps
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <button disabled={pending} onClick={() => saveRecord(false)} className="btn-primary disabled:opacity-50">
            <Upload size={16} className="inline mr-2"/> Kirim Sekarang
          </button>
          <button disabled={pending} onClick={() => saveRecord(true)} className="w-full border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50">
            Simpan Offline
          </button>
          <button disabled={pending} onClick={syncQueued} className="w-full border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50">
            Sinkronkan Antrian ({queued.length})
          </button>
        </div>
      </div>

      <div className="card mt-6">
        <h2 className="text-lg font-semibold mb-3">Antrian Offline</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {queued.map(q => (
            <li key={q.trace_id}>{q.trace_id} - {q.species} - {q.location_label || `${q.latitude},${q.longitude}`}</li>
          ))}
          {queued.length === 0 && <li>Tidak ada</li>}
        </ul>
      </div>
    </div>
  )
}
