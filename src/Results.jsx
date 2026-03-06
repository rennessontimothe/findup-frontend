import { useState, useEffect, useRef } from 'react'
import ProfilePanel from './ProfilePanel'
import './Results.css'

const ARTISANS = [
  { id: 1, name: 'Jean Dubois', metier: 'Plombier', note: 4.9, avis: 127, ville: 'Nantes', adresse: '12 rue Crébillon, Nantes', tel: '06 12 34 56 78', mail: 'jean.dubois@gmail.com', site: 'https://jean-dubois-plombier.fr', certifie: true, lat: 47.2135, lng: -1.5596, initiales: 'JD', couleur: '#2563EB',
    photos: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300', 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300'] },
  { id: 2, name: 'Marie Lecomte', metier: 'Électricienne', note: 4.8, avis: 89, ville: 'Saint-Herblain', adresse: '34 rue du Calvaire, Saint-Herblain', tel: '06 23 45 67 89', mail: 'marie.lecomte@orange.fr', site: null, certifie: true, lat: 47.2180, lng: -1.5530, initiales: 'ML', couleur: '#1B3A6B',
    photos: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300'] },
  { id: 3, name: 'Pierre Renard', metier: 'Carreleur', note: 4.7, avis: 64, ville: 'Rezé', adresse: '8 rue de Strasbourg, Rezé', tel: '06 34 56 78 90', mail: 'pierre.renard@pro.fr', site: 'https://renard-carrelage.fr', certifie: false, lat: 47.2160, lng: -1.5480, initiales: 'PR', couleur: '#D4A853',
    photos: ['https://images.unsplash.com/photo-1558618047-f4e80a89bf44?w=300', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300'] },
  { id: 4, name: 'Thomas Martin', metier: 'Plombier', note: 4.6, avis: 203, ville: 'Nantes', adresse: '56 bd Victor Hugo, Nantes', tel: '06 45 67 89 01', mail: 'thomas.martin@plomberie.fr', site: null, certifie: true, lat: 47.2100, lng: -1.5620, initiales: 'TM', couleur: '#2563EB',
    photos: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300'] },
  { id: 5, name: 'Sophie Bernard', metier: 'Chauffagiste', note: 4.9, avis: 41, ville: 'Orvault', adresse: '3 rue Boileau, Orvault', tel: '06 56 78 90 12', mail: 'sophie.bernard@chauffage.fr', site: 'https://bernard-chauffage.com', certifie: true, lat: 47.2200, lng: -1.5700, initiales: 'SB', couleur: '#1B3A6B',
    photos: ['https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=300', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300'] },
  { id: 6, name: 'Lucas Moreau', metier: 'Menuisier', note: 4.5, avis: 58, ville: 'Nantes', adresse: '18 rue de la Paix, Nantes', tel: '06 67 89 01 23', mail: 'lucas.moreau@menuiserie.fr', site: null, certifie: false, lat: 47.2080, lng: -1.5550, initiales: 'LM', couleur: '#2563EB',
    photos: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300', 'https://images.unsplash.com/photo-1558618047-f4e80a89bf44?w=300'] },
  { id: 7, name: 'Claire Dupont', metier: 'Peintre', note: 4.8, avis: 112, ville: 'Carquefou', adresse: '27 rue Voltaire, Carquefou', tel: '06 78 90 12 34', mail: 'claire.dupont@peinture.fr', site: 'https://dupont-peinture.fr', certifie: true, lat: 47.2230, lng: -1.5460, initiales: 'CD', couleur: '#D4A853',
    photos: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300'] },
]

function Stars({ note }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 24 24" className={`star ${i <= Math.round(note) ? 'star--full' : 'star--empty'}`}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function ArtisanCard({ artisan, selected, onClick }) {
  return (
    <div className={`artisan-card ${selected ? 'artisan-card--selected' : ''}`} onClick={onClick}>
      <div className="artisan-avatar-wrap">
        <div className="artisan-avatar" style={{ background: artisan.couleur }}>{artisan.initiales}</div>
      </div>
      <div className="artisan-info">
        <div className="artisan-header">
          <div className="artisan-name-row">
            <div className="artisan-name">{artisan.name}</div>
            {artisan.certifie && (
              <div className="certif-badge" title="Artisan certifié">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            )}
          </div>
          <div className="artisan-metier">{artisan.metier}</div>
        </div>
        <div className="artisan-meta">
          <Stars note={artisan.note} />
          <span className="artisan-note">{artisan.note}</span>
          <span className="artisan-avis">({artisan.avis} avis)</span>
        </div>
        <div className="artisan-bottom-row">
          <span className="artisan-ville">{artisan.ville}</span>
          <button className="btn-call" onClick={e => { e.stopPropagation(); window.location.href = `tel:${artisan.tel}` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Appeler
          </button>
        </div>
      </div>
    </div>
  )
}

function ArtisanDetail({ artisan, onClose }) {
  const [zoomedIndex, setZoomedIndex] = useState(null)
  if (!artisan) return null

  const photos = artisan.photos || []
  const canPrev = zoomedIndex > 0
  const canNext = zoomedIndex < photos.length - 1

  return (
    <div className="detail-overlay" onClick={() => {
      if (zoomedIndex !== null) setZoomedIndex(null)
      else onClose()
    }}>

      {zoomedIndex !== null && (
        <div className="photo-zoom" onClick={e => e.stopPropagation()}>

          {/* Topbar avec compteur et bouton fermer */}
          <div className="photo-zoom-topbar">
            <span className="photo-zoom-counter">{zoomedIndex + 1} / {photos.length}</span>
            <button className="photo-zoom-close" onClick={() => setZoomedIndex(null)}>✕</button>
          </div>

          {/* Image */}
          <img src={photos[zoomedIndex]} alt="" className="photo-zoom-img" />

          {/* Flèches */}
          {canPrev && (
            <button className="photo-zoom-nav photo-zoom-nav--prev"
              onClick={e => { e.stopPropagation(); setZoomedIndex(i => i - 1) }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {canNext && (
            <button className="photo-zoom-nav photo-zoom-nav--next"
              onClick={e => { e.stopPropagation(); setZoomedIndex(i => i + 1) }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Points */}
          <div className="photo-zoom-dots">
            {photos.map((_, i) => (
              <div key={i}
                className={`photo-zoom-dot ${i === zoomedIndex ? 'photo-zoom-dot--active' : ''}`}
                onClick={e => { e.stopPropagation(); setZoomedIndex(i) }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="detail-card" onClick={e => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>

        <div className="detail-header">
          <div className="detail-avatar-wrap">
            <div className="detail-avatar" style={{ background: artisan.couleur }}>{artisan.initiales}</div>
            {artisan.certifie && <div className="detail-certif">✓ Certifié</div>}
          </div>
          <div>
            <div className="detail-name">{artisan.name}</div>
            <div className="detail-metier">{artisan.metier}</div>
            <div className="artisan-meta" style={{marginTop: '6px'}}>
              <Stars note={artisan.note} />
              <span className="artisan-note">{artisan.note}</span>
              <span className="artisan-avis">({artisan.avis} avis)</span>
            </div>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="detail-photos">
            {photos.map((url, i) => (
              <img key={i} src={url} alt="" className="detail-photo"
                onClick={e => { e.stopPropagation(); setZoomedIndex(i) }}
              />
            ))}
          </div>
        )}

        <div className="detail-body">
          <div className="detail-row">
            <span className="detail-row-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="detail-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Lieu
            </span>
            <span className="detail-value">{artisan.adresse}</span>
          </div>
          <div className="detail-row">
            <span className="detail-row-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="detail-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email
            </span>
            <a href={`mailto:${artisan.mail}`} className="detail-tag detail-tag--mail">{artisan.mail}</a>
          </div>
          <div className="detail-row">
            <span className="detail-row-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="detail-icon"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Site web
            </span>
            {artisan.site
              ? <a href={artisan.site} target="_blank" rel="noreferrer" className="detail-tag detail-tag--site">Voir le site →</a>
              : <a href={`https://www.pagesjaunes.fr/recherche/${encodeURIComponent(artisan.name)}`} target="_blank" rel="noreferrer" className="detail-tag detail-tag--pj">Pages Jaunes →</a>
            }
          </div>
        </div>

        <button className="detail-btn-call" onClick={() => window.location.href = `tel:${artisan.tel}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Appeler {artisan.tel}
        </button>
      </div>
    </div>
  )
}

export default function Results() {
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => initMap()
    document.head.appendChild(script)

    return () => { if (mapInstance.current) mapInstance.current.remove() }
  }, [])

  function initMap() {
    const L = window.L
    const map = L.map(mapRef.current, { zoomControl: false }).setView([47.2173, -1.5534], 14)
    mapInstance.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 19
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    ARTISANS.forEach(a => {
      const icon = L.divIcon({
        html: `<div class="map-marker" style="background:${a.couleur}">${a.initiales}</div>`,
        className: '', iconSize: [40, 40], iconAnchor: [20, 20]
      })
      const marker = L.marker([a.lat, a.lng], { icon }).addTo(map)
      marker.on('click', () => { setSelected(a.id); setDetail(a) })
    })
  }

  function handleCardClick(artisan) {
    setSelected(artisan.id)
    setDetail(artisan)
    if (mapInstance.current) {
      mapInstance.current.flyTo([artisan.lat, artisan.lng], 15, { duration: 0.8 })
    }
  }

  return (
    <div className="results-page">
      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <div ref={mapRef} className="results-map" />

      <header className="results-header">
        <div className="results-header-inner">
          <div className="results-header-left">
            <a href="/" className="results-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/" className="results-logo">find<span>Up</span></a>
          </div>
          <div className="nav-actions">
            <a href="/login" className="btn-ghost">Se connecter</a>
            <button className="avatar-btn" onClick={() => setProfileOpen(true)}>
              <svg viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <aside className="results-list">
        <div className="results-list-header">
          <h2 className="results-count">7 artisans trouvés</h2>
          <span className="results-zone">Nantes Centre</span>
        </div>
        <div className="results-cards">
          {ARTISANS.map(a => (
            <ArtisanCard key={a.id} artisan={a} selected={selected === a.id} onClick={() => handleCardClick(a)} />
          ))}
        </div>
      </aside>

      {detail && <ArtisanDetail artisan={detail} onClose={() => { setDetail(null); setSelected(null) }} />}
    </div>
  )
}