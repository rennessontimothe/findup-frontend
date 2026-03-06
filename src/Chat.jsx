import { useState, useRef, useEffect } from 'react'
import GlassSurface from './components/ui/GlassSurface'
import ProfilePanel from './ProfilePanel'
import './Chat.css'

const DEFAULT_SUGGESTIONS = [
  "Fuite d'eau dans ma salle de bain",
  "Panne électrique dans mon salon",
  "Carrelage endommagé",
  "Toiture à réparer",
  "Chauffage en panne"
]

const SUGGESTIONS_MAP = {
  'fuite': ["C'est urgent ?", "Quel étage ?", "Eau chaude ou froide ?", "Depuis combien de temps ?"],
  'eau': ["C'est urgent ?", "Quel étage ?", "Eau chaude ou froide ?", "Depuis combien de temps ?"],
  'électrique': ["Toute la maison ?", "Un seul circuit ?", "Disjoncteur déclenché ?", "Depuis quand ?"],
  'panne': ["Toute la maison ?", "Quel appareil ?", "Depuis quand ?", "Urgent ?"],
  'carrelage': ["Combien de m² ?", "Sol ou mur ?", "Pose ou réparation ?", "Quel délai ?"],
  'toiture': ["Fuite ou dégradation ?", "Surface approximative ?", "Type de toiture ?", "Urgent ?"],
  'chauffage': ["Chaudière ou radiateur ?", "Toute la maison ?", "Depuis quand ?", "Urgent ?"],
}

function now() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text: "Bonjour ! Je suis votre assistant findUp. Décrivez-moi votre problème et je trouverai les meilleurs artisans près de chez vous.",
    time: now()
  }
]

export default function Chat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [images, setImages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) {
      setTimeout(() => sendMessage(q), 400)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text = input) {
    const msg = text.trim()
    if (!msg && images.length === 0) return

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: msg,
      images: [...images],
      time: now()
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setImages([])
    setIsTyping(true)

    const lower = msg.toLowerCase()
    const match = Object.keys(SUGGESTIONS_MAP).find(k => lower.includes(k))
    if (match) setSuggestions(SUGGESTIONS_MAP[match])

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text: "Merci pour ces informations ! Je recherche les meilleurs artisans disponibles près de chez vous pour ce type d'intervention. Pouvez-vous me préciser votre ville ?",
        time: now()
      }])
    }, 1800)
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files)
    const urls = files.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...urls])
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-page">
      <div className="bg-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* HEADER */}
      <header className="chat-header">
        <div className="chat-header-inner">
          <a href="/" className="chat-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div className="chat-bot-info">
            <div className="chat-bot-avatar">✦</div>
            <div>
              <div className="chat-bot-name">Assistant findUp</div>
              <div className="chat-bot-status">
                <span className="status-dot" />
                En ligne
              </div>
            </div>
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

      {/* MESSAGES */}
      <main className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`msg-row ${msg.from === 'user' ? 'msg-row--user' : 'msg-row--bot'}`}>
            {msg.from === 'bot' && <div className="msg-avatar">✦</div>}
            <div className="msg-group">
              {msg.images && msg.images.length > 0 && (
                <div className={`msg-images ${msg.from === 'user' ? 'msg-images--user' : ''}`}>
                  {msg.images.map((url, i) => (
                    <img key={i} src={url} alt="" className="msg-image" />
                  ))}
                </div>
              )}
              {msg.text && (
                <div className={`msg-bubble ${msg.from === 'user' ? 'msg-bubble--user' : 'msg-bubble--bot'}`}>
                  {msg.text}
                </div>
              )}
              <div className={`msg-time ${msg.from === 'user' ? 'msg-time--user' : ''}`}>{msg.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="msg-row msg-row--bot">
            <div className="msg-avatar">✦</div>
            <div className="msg-bubble msg-bubble--bot msg-bubble--typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* SUGGESTIONS */}
      <div className="chat-suggestions">
        {suggestions.map(s => (
          <button key={s} className="chat-chip" onClick={() => { setInput(s); inputRef.current?.focus() }}>{s}</button>
        ))}
      </div>

      {/* INPUT */}
      <div className="chat-input-area">
        {images.length > 0 && (
          <div className="chat-image-previews">
            {images.map((url, i) => (
              <div key={i} className="chat-preview-wrap">
                <img src={url} className="chat-preview-img" alt="" />
                <button className="chat-preview-remove" onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
          </div>
        )}
        <GlassSurface width="100%" height={60} borderRadius={100} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="chat-input-glass">
          <div className="chat-input-inner">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Décrivez votre problème…"
              autoComplete="off"
            />
            <div className="chat-input-actions">
              <input type="file" id="chatFileInput" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageUpload} />
              <button className="btn-icon" onClick={() => document.getElementById('chatFileInput').click()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="4"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn-send" onClick={() => sendMessage()} disabled={!input.trim() && images.length === 0}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  )
}