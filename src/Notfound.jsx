import GlassSurface from './components/ui/GlassSurface'
import './NotFound.css'

export default function NotFound() {

  return (
    <>
      {/* Même fond orbs que l'accueil */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Rubans chantier bleu/blanc en arrière-plan */}
      <div className="nf-tapes-bg" aria-hidden="true">
        <div className="nf-tape nf-tape--a" />
        <div className="nf-tape nf-tape--b" />
        <div className="nf-tape nf-tape--c" />
      </div>

      {/* Header — copie exacte de App.jsx */}
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
              <button className="avatar-btn">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </button>
            </div>
          </div>
        </GlassSurface>
      </nav>

      {/* Contenu 404 */}
      <main className="nf-main">

        {/* 404 + rouleau */}
        <div className="nf-code-wrap">
          <span className="nf-digit">4</span>
          <span className="nf-digit">0</span>
          <div className="nf-digit-last-wrap">
            <span className="nf-digit">4</span>
          </div>
        </div>

        {/* Titre */}
        <h1 className="nf-title">Zone de chantier, Circulez !</h1>

        {/* Boutons */}
        <div className="nf-actions">
          <a href="/" className="nf-btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Retour à l'accueil
          </a>

          <GlassSurface
            width="auto"
            height={52}
            borderRadius={50}
            backgroundOpacity={0.21}
            blur={14}
            brightness={55}
            distortionScale={-60}
            className="nf-btn-glass-surface"
          >
            <a href="/chat" className="nf-btn-glass">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              Trouver un artisan
            </a>
          </GlassSurface>
        </div>

      </main>

      {/* App band + footer — identiques à l'accueil */}
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