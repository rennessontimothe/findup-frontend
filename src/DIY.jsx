import { useState } from 'react'
import GlassSurface from './components/ui/GlassSurface'
import ProfilePanel from './ProfilePanel'
import './DIY.css'

const CATEGORIES = {
  plomberie: {
    label: 'Plomberie', icon: '🔧', color: '#2563EB',
    products: [
      { id: 'p1', name: 'Joint torique universel (lot 50)', desc: 'Assortiment NBR, étanche instantanément', price: '4,90 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=joint+torique+plomberie', lm: 'https://www.leroymerlin.fr/recherche=joint+torique' },
      { id: 'p2', name: 'Téflon (ruban PTFE)', desc: 'Étanchéité filetages, 12 m', price: '2,50 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=ruban+teflon+ptfe', lm: 'https://www.leroymerlin.fr/recherche=teflon' },
      { id: 'p3', name: 'Pince multiprise réglable', desc: 'Serrage joints et raccords', price: '12,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=pince+multiprise', lm: 'https://www.leroymerlin.fr/recherche=pince+multiprise' },
      { id: 'p4', name: 'Clé à molette 250 mm', desc: 'Acier chromé, poignée bi-matière', price: '9,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=cle+molette', lm: 'https://www.leroymerlin.fr/recherche=cle+molette' },
      { id: 'p5', name: 'Raccord réparation rapide', desc: 'Sans soudure, 15 ou 22 mm', price: '6,50 €', badge: 'Pièce', amazon: 'https://www.amazon.fr/s?k=raccord+reparation+rapide+plomberie', lm: 'https://www.leroymerlin.fr/recherche=raccord+reparation' },
    ]
  },
  electricite: {
    label: 'Électricité', icon: '⚡', color: '#D4A853',
    products: [
      { id: 'e1', name: 'Testeur de tension sans contact', desc: 'Détecte 12–1000V, sécurité max', price: '14,90 €', badge: 'Sécurité', amazon: 'https://www.amazon.fr/s?k=testeur+tension+sans+contact', lm: 'https://www.leroymerlin.fr/recherche=testeur+tension' },
      { id: 'e2', name: 'Tournevis isolés VDE (jeu 6)', desc: 'Testés 1000V, ergonomiques', price: '18,90 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=tournevis+isoles+vde', lm: 'https://www.leroymerlin.fr/recherche=tournevis+isoles' },
      { id: 'e3', name: 'Dominos de connexion (boîte 100)', desc: 'Connexion rapide fils 0.5–2.5 mm²', price: '3,90 €', badge: 'Pièce', amazon: 'https://www.amazon.fr/s?k=dominos+connexion+electrique', lm: 'https://www.leroymerlin.fr/recherche=dominos+electrique' },
      { id: 'e4', name: 'Disjoncteur unipolaire 16A', desc: 'Remplacement standard tableau', price: '8,90 €', badge: 'Pièce', amazon: 'https://www.amazon.fr/s?k=disjoncteur+16a', lm: 'https://www.leroymerlin.fr/recherche=disjoncteur+16a' },
      { id: 'e5', name: 'Multimètre numérique', desc: 'Tension, courant, résistance, continuité', price: '24,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=multimetre+numerique', lm: 'https://www.leroymerlin.fr/recherche=multimetre' },
    ]
  },
  peinture: {
    label: 'Peinture', icon: '🎨', color: '#1B3A6B',
    products: [
      { id: 'pe1', name: 'Peinture murale blanc mat 2.5L', desc: 'Couverture 25 m², sans odeur', price: '22,90 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=peinture+murale+blanche', lm: 'https://www.leroymerlin.fr/recherche=peinture+blanche+mat' },
      { id: 'pe2', name: 'Rouleau microfibre + bac', desc: '23 cm, finition lisse garantie', price: '7,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=rouleau+peinture+microfibre', lm: 'https://www.leroymerlin.fr/recherche=rouleau+peinture' },
      { id: 'pe3', name: 'Enduit de rebouchage 1 kg', desc: 'Séchage rapide, ponçable en 2h', price: '6,90 €', badge: 'Prep.', amazon: 'https://www.amazon.fr/s?k=enduit+rebouchage', lm: 'https://www.leroymerlin.fr/recherche=enduit+rebouchage' },
      { id: 'pe4', name: 'Ruban de masquage pro 50 m', desc: 'Adhérence précise, sans résidu', price: '4,50 €', badge: 'Prep.', amazon: 'https://www.amazon.fr/s?k=ruban+masquage+peinture', lm: 'https://www.leroymerlin.fr/recherche=ruban+masquage' },
      { id: 'pe5', name: 'Spatule inox flexible', desc: 'Rebouchage et lissage enduit', price: '3,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=spatule+peinture', lm: 'https://www.leroymerlin.fr/recherche=spatule' },
    ]
  },
  carrelage: {
    label: 'Carrelage', icon: '🏠', color: '#2563EB',
    products: [
      { id: 'c1', name: 'Colle carrelage blanche 5 kg', desc: 'Intérieur/extérieur, prise rapide', price: '11,90 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=colle+carrelage', lm: 'https://www.leroymerlin.fr/recherche=colle+carrelage' },
      { id: 'c2', name: 'Joint carrelage gris (seau 5 kg)', desc: 'Hydrofuge, résistant aux taches', price: '13,90 €', badge: 'Essentiel', amazon: 'https://www.amazon.fr/s?k=joint+carrelage', lm: 'https://www.leroymerlin.fr/recherche=joint+carrelage' },
      { id: 'c3', name: 'Truelle dentelée 6 mm', desc: 'Répartition uniforme de la colle', price: '5,90 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=truelle+carrelage', lm: 'https://www.leroymerlin.fr/recherche=truelle+carrelage' },
      { id: 'c4', name: 'Croisillons 2 mm (sachet 100)', desc: 'Joints réguliers et précis', price: '2,90 €', badge: 'Pièce', amazon: 'https://www.amazon.fr/s?k=croisillons+carrelage', lm: 'https://www.leroymerlin.fr/recherche=croisillons' },
      { id: 'c5', name: 'Spatule à joint mousse', desc: 'Application propre et homogène', price: '4,50 €', badge: 'Outil', amazon: 'https://www.amazon.fr/s?k=spatule+joint+carrelage', lm: 'https://www.leroymerlin.fr/recherche=spatule+joint' },
    ]
  }
}

const BADGE_COLORS = {
  'Essentiel': { bg: 'rgba(37,99,235,0.08)', color: '#2563EB', border: 'rgba(37,99,235,0.2)' },
  'Outil':     { bg: 'rgba(212,168,83,0.09)', color: '#b5882a', border: 'rgba(212,168,83,0.25)' },
  'Pièce':     { bg: 'rgba(27,58,107,0.07)', color: '#1B3A6B', border: 'rgba(27,58,107,0.18)' },
  'Sécurité':  { bg: 'rgba(220,38,38,0.07)', color: '#dc2626', border: 'rgba(220,38,38,0.2)' },
  'Prep.':     { bg: 'rgba(22,163,74,0.07)', color: '#16a34a', border: 'rgba(22,163,74,0.2)' },
}

const STEPS = [
  { num: 1, title: 'Lisez le diagnostic', desc: "L'IA a analysé votre problème et identifié les étapes clés." },
  { num: 2, title: 'Commandez les produits', desc: 'Cliquez sur les liens pour acheter directement sur Amazon ou Leroy Merlin.' },
  { num: 3, title: 'Suivez le guide', desc: 'Réparez à votre rythme, économisez sur la main-d\'œuvre.' },
]

function ProductCard({ product }) {
  const badge = BADGE_COLORS[product.badge] || BADGE_COLORS['Pièce']
  return (
    <div className="diy-product-card">
      <div className="diy-product-top">
        <div className="diy-product-info">
          <div className="diy-product-header">
            <span className="diy-product-name">{product.name}</span>
            <span className="diy-product-badge" style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
              {product.badge}
            </span>
          </div>
          <span className="diy-product-desc">{product.desc}</span>
        </div>
        <div className="diy-product-price">{product.price}</div>
      </div>
      <div className="diy-product-actions">
        <button className="diy-shop-btn diy-shop-btn--amazon" onClick={() => window.open(product.amazon, '_blank')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Amazon
        </button>
        <button className="diy-shop-btn diy-shop-btn--lm" onClick={() => window.open(product.lm, '_blank')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Leroy Merlin
        </button>
      </div>
    </div>
  )
}

export default function DIY() {
  const params = new URLSearchParams(window.location.search)
  const problem = params.get('q') || 'votre problème'
  const catKey = params.get('cat') || 'plomberie'
  const category = CATEGORIES[catKey] || CATEGORIES.plomberie

  const [profileOpen, setProfileOpen] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState({})

  function toggleStep(n) {
    setCheckedSteps(prev => ({ ...prev, [n]: !prev[n] }))
  }

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <div className="diy-page-layout">
        <nav>
          <GlassSurface width="100%" height={70} borderRadius={100} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="nav-glass">
            <div className="nav-inner">
              <a href="/" className="nav-logo">find<span>Up</span></a>
              <div className="nav-actions">
                <a href="/login" className="btn-ghost">Se connecter</a>
                <button className="avatar-btn" onClick={() => setProfileOpen(true)}>
                  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </button>
              </div>
            </div>
          </GlassSurface>
        </nav>

        <main className="diy-main">

          <section className="diy-hero">
            <div className="diy-hero-badge"><span>🛠️</span>Mode bricoleur</div>
            <h1 className="diy-hero-title">Réparez <span className="highlight">vous-même</span></h1>
            <p className="diy-hero-sub">Notre IA a analysé votre problème et sélectionné exactement ce qu'il vous faut pour le résoudre.</p>

            <div className="diy-problem-wrap">
              <GlassSurface width="100%" height="auto" borderRadius={20} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="diy-problem-glass">
                <div className="diy-problem-inner">
                  <div className="diy-problem-icon">✦</div>
                  <div>
                    <div className="diy-problem-label">Problème analysé</div>
                    <div className="diy-problem-text">"{problem}"</div>
                  </div>
                </div>
              </GlassSurface>
            </div>

            <div className="diy-fallback-row">
              <span className="diy-fallback-text">Finalement trop complexe ?</span>
              <a href="/results" className="diy-fallback-link">Trouver un artisan →</a>
            </div>
          </section>

          <section className="diy-section">
            <h2 className="diy-section-title">Comment ça marche</h2>
            <div className="diy-steps">
              {STEPS.map(s => (
                <div key={s.num} className={`diy-step ${checkedSteps[s.num] ? 'diy-step--done' : ''}`} onClick={() => toggleStep(s.num)}>
                  <div className="diy-step-num">{checkedSteps[s.num] ? '✓' : s.num}</div>
                  <div className="diy-step-content">
                    <div className="diy-step-title">{s.title}</div>
                    <div className="diy-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="diy-section">
            <div className="diy-products-header">
              <div>
                <h2 className="diy-section-title">Ce qu'il vous faut</h2>
                <p className="diy-section-sub">Sélection IA pour <strong>{category.label}</strong> · {category.products.length} produits</p>
              </div>
              <div className="diy-cat-icon" style={{ background: `${category.color}18`, color: category.color }}>{category.icon}</div>
            </div>

            <div className="diy-legend">
              {Object.entries(BADGE_COLORS).map(([label, style]) => (
                <span key={label} className="diy-legend-item" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>{label}</span>
              ))}
            </div>

            <div className="diy-products-grid">
              {category.products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            <GlassSurface width="100%" height="auto" borderRadius={18} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="diy-savings-glass">
              <div className="diy-savings-inner">
                <div className="diy-savings-left">
                  <div className="diy-savings-emoji">💸</div>
                  <div>
                    <div className="diy-savings-title">Économie estimée</div>
                    <div className="diy-savings-sub">vs faire appel à un artisan</div>
                  </div>
                </div>
                <div className="diy-savings-amount">–150 à 400 €</div>
              </div>
            </GlassSurface>
          </section>

          <section className="diy-section">
            <h2 className="diy-section-title">Autres domaines</h2>
            <div className="diy-cats-grid">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <a key={key} href={`/diy?cat=${key}`} className={`diy-cat-card ${key === catKey ? 'diy-cat-card--active' : ''}`}>
                  <span className="diy-cat-card-icon" style={{ color: cat.color }}>{cat.icon}</span>
                  <span className="diy-cat-card-label">{cat.label}</span>
                  <span className="diy-cat-card-count">{cat.products.length} produits</span>
                </a>
              ))}
            </div>
          </section>

          <section className="diy-section">
            <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.21} blur={14} brightness={55} distortionScale={-60} className="diy-cta-glass">
              <div className="diy-cta-inner">
                <div className="diy-cta-icon">👷</div>
                <div className="diy-cta-content">
                  <div className="diy-cta-title">Préférez un professionnel ?</div>
                  <div className="diy-cta-sub">Notre IA vous met en relation avec les meilleurs artisans près de chez vous.</div>
                </div>
                <a href="/results" className="diy-cta-btn">
                  Voir les artisans
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </GlassSurface>
          </section>

        </main>

        <footer>
          <p>© 2025 findUp · <a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a></p>
          <p class="diy-footer-affil">Les liens produits sont des liens affiliés. findUp perçoit une commission sur les achats.</p>
        </footer>
      </div>
    </>
  )
}