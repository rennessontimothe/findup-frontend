import { useState, useRef } from 'react'
import GlassSurface from './components/ui/GlassSurface'
import './App.css'
import ProfilePanel from './ProfilePanel'

export default function App() {
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [images, setImages] = useState([])
  const textareaRef = useRef(null)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const urls = files.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...urls])
  }

  function handleQueryChange(e) {
    setQuery(e.target.value)
    // Auto-resize
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = ta.scrollHeight + 'px'
  }

  function goToChat() {
    if (query.trim()) {
      window.location.href = '/chat?q=' + encodeURIComponent(query)
    } else {
      window.location.href = '/chat'
    }
  }

  function setQueryText(t) {
    setQuery(t)
    const ta = textareaRef.current
    if (ta) {
      ta.focus()
      setTimeout(() => {
        ta.style.height = 'auto'
        ta.style.height = ta.scrollHeight + 'px'
      }, 0)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      goToChat()
    }
  }

  const chips = ["Fuite d'eau", "Panne électrique", "Carrelage", "Toiture", "Chauffage"]

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <nav>
        <GlassSurface
          width="100%"
          height={70}
          borderRadius={100}
          backgroundOpacity={0.21}
          blur={14}
          brightness={55}
          distortionScale={-60}
          className="nav-glass"
        >
          <div className="nav-inner">
            <a href="/" className="nav-logo">find<span>Up</span></a>
            <div className="nav-actions">
              <a href="/login" className="btn-ghost">Se connecter</a>
              <button className="avatar-btn" onClick={() => setProfileOpen(true)}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </button>
            </div>
          </div>
        </GlassSurface>
      </nav>

      <section className="hero">
        <h1 className="hero-title">
          <span className="split-line">Trouvez le bon</span>
          <span className="split-line highlight">
            <span className="shiny">artisan</span> en quelques secondes
          </span>
        </h1>

        <p className="hero-sub">
          Décrivez votre problème, notre IA analyse votre besoin et vous met en relation avec les artisans qualifiés près de chez vous.
        </p>

        {images.length > 0 && (
          <div className="image-previews">
            {images.map((url, i) => (
              <div key={i} className="image-preview-wrap">
                <img src={url} alt={`upload-${i}`} className="image-preview" />
                <button className="image-remove" onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
          </div>
        )}

        <div className="search-container">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={28}
            backgroundOpacity={0.21}
            blur={14}
            brightness={55}
            distortionScale={-60}
            className="search-glass"
          >
            <div className="search-inner">
              <textarea
                id="searchInput"
                ref={textareaRef}
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder="Ex : ma fuite d'eau sous l'évier…"
                autoComplete="off"
                rows={1}
              />
              <div className="search-actions">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <button className="btn-icon" title="Ajouter une photo" onClick={() => document.getElementById('fileInput').click()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="4"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn-send" onClick={goToChat}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </GlassSurface>

          <div className="suggestions">
            {chips.map(s => (
              <button key={s} className="chip" onClick={() => setQueryText(s)}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="app-band">
        <span className="app-band-text">Aussi disponible sur</span>
        <a href="#" className="store-btn">
          <svg className="store-icon" viewBox="0 0 814 1000" fill="var(--navy)">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.8 0 108.2 2.6 168.1 74.8zm-126.6-89.5c-22.1-26-59.3-45.8-92.5-45.8-3.8 0-7.7.3-11.5.8 1-19.8 9.7-40.8 20.3-55.8 17.7-24.6 44.9-42.1 71.9-42.1 3.2 0 6.4.3 9.7.6-1 19.8-9 40.8-18.9 57.1-9 15.3-22.1 30.4-35.4 37.4 19.2 1.9 38.7-3.2 54.5-13.9C645 137.5 647.8 107 649 95c-.6 0-1.3-.3-1.9-.3-37.5 0-77.8 26.9-100.2 62.6C533.4 181.6 529 200 529 218c0 1.9.3 3.8.6 5.7 3.8 0 7.7.6 11.5.6 34.6 0 70.7-15.6 94.9-44.9l26.5 31z"/>
          </svg>
          <div>
            <span className="store-small">Télécharger dans</span>
            <span className="store-name">l'App Store</span>
          </div>
        </a>
        <a href="#" className="store-btn">
          <svg className="store-icon" viewBox="0 0 48 48">
            <path fill="#4CAF50" d="M5.2 44.4c.4.2.9.3 1.4.3.6 0 1.1-.1 1.6-.4L27 33.6 19.4 26 5.2 44.4z"/>
            <path fill="#F44336" d="M42.5 20.1L38 17.5 29.4 26l8.6 8.5 4.5-2.6c1.3-.7 2.1-2.1 2.1-3.7 0-1.7-.8-3.1-2.1-4.1z"/>
            <path fill="#2196F3" d="M5.2 3.6C5.1 3.9 5 4.3 5 4.7v38.5c0 .4.1.8.2 1.2L19.4 26 5.2 3.6z"/>
            <path fill="#FFC107" d="M27 14.4 8.2.7C7.7.4 7.2.3 6.6.3c-.5 0-1 .1-1.4.3L19.4 26 27 14.4z"/>
          </svg>
          <div>
            <span className="store-small">Disponible sur</span>
            <span className="store-name">Google Play</span>
          </div>
        </a>
      </div>

      <footer>
        <p>© 2025 findUp · <a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a></p>
      </footer>
    </>
  )
}