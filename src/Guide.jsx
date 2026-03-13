import { useState } from 'react'
import GlassSurface from './components/ui/GlassSurface'
import ProfilePanel from './ProfilePanel'
import './Guide.css'

const GUIDE_STEPS = [
  {
    num: 1,
    title: 'Coupez l\'alimentation en eau',
    body: 'Repérez le robinet d\'arrêt sous l\'évier ou au compteur général. Tournez-le dans le sens des aiguilles d\'une montre jusqu\'à résistance complète. Vérifiez en ouvrant un robinet : plus d\'eau doit couler.',
    tip: 'Si vous ne trouvez pas le robinet d\'arrêt local, utilisez le robinet général de l\'appartement.',
    img: null,
    free: true,
  },
  {
    num: 2,
    title: 'Démontez le siphon',
    body: 'Placez un seau sous le siphon. Dévissez le bouchon de vidange à la main ou avec une pince multiprise. Récupérez l\'eau résiduelle. Retirez ensuite le siphon en dévissant les écrous de raccordement.',
    tip: 'Prenez une photo du montage avant de démonter — vous vous en remercierez au remontage.',
    img: null,
    free: true,
  },
  {
    num: 3,
    title: 'Inspectez et nettoyez',
    body: 'Examinez le joint torique à l\'intérieur du raccord. S\'il est aplati, fissuré ou déformé, il est à remplacer. Nettoyez le corps du siphon à l\'eau chaude pour éliminer les dépôts.',
    tip: 'Un joint en bon état est souple et garde sa forme ronde. Un joint défaillant est plat ou présente des craquelures.',
    img: null,
    free: true,
  },
  {
    num: 4,
    title: 'Remplacez le joint défaillant',
    body: 'Insérez le nouveau joint torique dans la rainure prévue à cet effet. Assurez-vous qu\'il est bien centré et ne chevauche pas le bord. Appliquez une légère couche de graisse silicone pour faciliter l\'étanchéité.',
    tip: null,
    img: null,
    free: false,
  },
  {
    num: 5,
    title: 'Remontez et testez l\'étanchéité',
    body: 'Revissez les raccords à la main d\'abord, puis serrez d\'un quart de tour avec la pince. Ne sur-serrez pas — cela endommage les filets. Rouvrez l\'eau progressivement et observez 2 minutes.',
    tip: 'Essuyez sec avant le test pour détecter la moindre goutte.',
    img: null,
    free: false,
  },
  {
    num: 6,
    title: 'Appliquez du ruban PTFE en renfort',
    body: 'Sur les filetages métalliques, enroulez 3 à 4 tours de ruban PTFE dans le sens du filetage. Cela double l\'étanchéité et facilite le démontage futur.',
    tip: null,
    img: null,
    free: false,
  },
]

const FREE_COUNT = 3

export default function Guide() {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') || ''
  const [profileOpen, setProfileOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const freeSteps = GUIDE_STEPS.filter(s => s.free)
  const paidSteps = GUIDE_STEPS.filter(s => !s.free)

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <div className="guide-page-layout">

        {/* NAV */}
        <nav>
          <GlassSurface width="100%" height={70} borderRadius={100} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="nav-glass">
            <div className="nav-inner">
              <a href="/diy" className="nav-back" title="Retour">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="nav-actions">
                <a href="/login" className="btn-ghost">Se connecter</a>
                <button className="avatar-btn" onClick={() => setProfileOpen(true)}>
                  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </button>
              </div>
            </div>
          </GlassSurface>
        </nav>

        <main className="guide-main">

          {/* HERO */}
          <section className="guide-hero">
            <div className="guide-hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Guide personnalisé par IA
            </div>
            <h1 className="guide-hero-title">
              Réparez votre <span className="highlight">fuite sous évier</span>
            </h1>
            <p className="guide-hero-sub">
              6 étapes illustrées · Niveau débutant · ~45 min
            </p>
            <div className="guide-meta-pills">
              <span className="guide-pill">🔧 Plomberie</span>
              <span className="guide-pill">⏱ 45 min</span>
              <span className="guide-pill">💶 ~15 €</span>
            </div>
          </section>

          {/* ÉTAPES GRATUITES */}
          <section className="guide-steps-section">
            {freeSteps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}

            {/* ZONE PAYANTE */}
            {!unlocked ? (
              <div className="guide-paywall">
                {/* Étapes floutées en aperçu */}
                <div className="guide-paywall-preview">
                  {paidSteps.map((step, i) => (
                    <div key={step.num} className="guide-step-blurred" style={{ '--blur-delay': `${i * 0.04}s` }}>
                      <div className="guide-step-blurred-num">{step.num}</div>
                      <div className="guide-step-blurred-content">
                        <div className="guide-step-blurred-title">{step.title}</div>
                        <div className="guide-step-blurred-body">{step.body}</div>
                      </div>
                    </div>
                  ))}
                  <div className="guide-paywall-fade" />
                </div>

                {/* CTA */}
                <div className="guide-paywall-cta">
                  <div className="guide-paywall-lock">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="20" height="20">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <h3 className="guide-paywall-title">3 étapes restantes</h3>
                  <p className="guide-paywall-sub">
                    Accédez au guide complet avec les étapes de remplacement, remontage et test d'étanchéité.
                  </p>
                  <div className="guide-paywall-value">
                    <span className="guide-paywall-price">2,99 €</span>
                    <span className="guide-paywall-price-sub">accès permanent à ce guide</span>
                  </div>
                  <button className="guide-paywall-btn" onClick={() => setUnlocked(true)}>
                    Débloquer le guide complet
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className="guide-paywall-reassure">
                    Paiement sécurisé · Accès immédiat · Satisfait ou remboursé 7j
                  </p>
                </div>
              </div>
            ) : (
              paidSteps.map((step, i) => (
                <StepCard key={step.num} step={step} index={FREE_COUNT + i} />
              ))
            )}
          </section>

        </main>

        <footer>
          <p>© 2025 findUp · <a href="#">Mentions légales</a> · <a href="#">Confidentialité</a></p>
        </footer>

      </div>
    </>
  )
}

function StepCard({ step, index }) {
  return (
    <div className="guide-step" style={{ animationDelay: `${0.08 * index}s` }}>
      <div className="guide-step-left">
        <div className="guide-step-num">{step.num}</div>
        {index < GUIDE_STEPS.length - 1 && <div className="guide-step-line" />}
      </div>
      <div className="guide-step-body">
        <h3 className="guide-step-title">{step.title}</h3>

        {/* Image placeholder */}
        <div className="guide-step-img">
          <div className="guide-step-img-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28" opacity=".3">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        </div>

        <p className="guide-step-text">{step.body}</p>

        {step.tip && (
          <div className="guide-step-tip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            {step.tip}
          </div>
        )}
      </div>
    </div>
  )
}