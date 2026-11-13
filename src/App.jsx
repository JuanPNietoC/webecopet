import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { 
  Download, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Zap, 
  Coins, 
  Smartphone, 
  CheckCircle2, 
  Layers, 
  Palette, 
  ChevronRight, 
  ExternalLink,
  Flame,
  Award,
  Scan,
  RefreshCw
} from 'lucide-react'

// Mascot data
const MASCOTS = [
  {
    id: 'rana',
    name: 'Sapito Sabio',
    subtitle: 'Guardián del Páramo y del Agua',
    image: '/assets/rana_feliz.png',
    species: 'Rana Sabanera endémica',
    tag: 'Mascota Insignia',
    description: 'Diseñado con perspectiva isométrica 3/4 y calibración interocular a -13°. Le encanta la comida típica y los residuos biodegradables.',
    bg: 'from-emerald-950/60 to-emerald-900/20',
    border: 'border-emerald-500/30',
    accentColor: '#10b981'
  },
  {
    id: 'oso',
    name: 'Oso Andino',
    subtitle: 'Protector de Bosques de Niebla',
    image: '/assets/oso_feliz.png',
    species: 'Tremarctos ornatus',
    tag: 'Especie Vulnerable',
    description: 'El único oso nativo de Sudamérica. Necesita hábitats limpios y libres de plásticos para prosperar en la cordillera.',
    bg: 'from-amber-950/60 to-amber-900/20',
    border: 'border-amber-500/30',
    accentColor: '#f59e0b'
  },
  {
    id: 'chivo',
    name: 'Chivito Paramuno',
    subtitle: 'Ágil habitante de las cumbres',
    image: '/assets/chivo_feliz.png',
    species: 'Fauna de Alta Montaña',
    tag: 'Energía Pura',
    description: 'Saltarín y juguetón. Te acompaña en tus jornadas diarias de reciclaje transformando residuos en experiencia y monedas.',
    bg: 'from-teal-950/60 to-teal-900/20',
    border: 'border-teal-500/30',
    accentColor: '#14b8a6'
  }
]

// AI Waste Simulator items
const SIMULATION_ITEMS = [
  {
    id: 'platano',
    name: 'Cáscara de Plátano',
    category: 'Orgánico / Fruta',
    type: 'biodegradable',
    trashnet: 'paper (9%) | trash (3%)',
    bioModel: '01 Biodegradable (98.4%)',
    decision: 'Caneca Verde 🟢',
    containerImg: '/assets/caneca_verde.png',
    explanation: 'El Modelo Biológico detecta >65% de matriz orgánica y ausencia de polímeros sintéticos. Va a compostaje.',
    badge: 'Compostable',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'papas',
    name: 'Paquete Metalizado de Snacks',
    category: 'Empaque Inorgánico',
    type: 'inorganic',
    trashnet: 'plastic (68.2%) | trash (24.1%)',
    bioModel: '02 Non-Biodegradable (89.0%)',
    decision: 'Caneca Negra ⚫',
    containerImg: '/assets/caneca_negra.png',
    explanation: 'TrashNet detecta textura de polipropileno biorientado (BOPP). No es reciclable convencional, va a la caneca negra.',
    badge: 'No Aprovechable',
    badgeColor: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20'
  },
  {
    id: 'cafe',
    name: 'Borra / Cuncho de Café',
    category: 'Residuo de Cocina',
    type: 'biodegradable',
    trashnet: 'trash (4.2%) | paper (12.1%)',
    bioModel: '01 Biodegradable (99.1%)',
    decision: 'Caneca Verde 🟢',
    containerImg: '/assets/caneca_verde.png',
    explanation: 'Materia 100% orgánica que enriquece la tierra y alimenta los cultivos de nuestra mascota.',
    badge: 'Abono Natural',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'botella',
    name: 'Botella de Plástico Limpia',
    category: 'Plástico PET',
    type: 'recyclable',
    trashnet: 'plastic (94.7%) | glass (3.1%)',
    bioModel: '02 Non-Biodegradable (96.5%)',
    decision: 'Caneca Blanca ⚪',
    containerImg: '/assets/caneca_blanca.png',
    explanation: 'Termoplástico rígido apto para economía circular y reciclaje mecánico industrial.',
    badge: 'Aprovechable Limpio',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
  }
]

export default function App() {
  // State for interactive pet
  const [selectedPet, setSelectedPet] = useState(MASCOTS[0])
  const [petHp, setPetHp] = useState(92)
  const [petXp, setPetXp] = useState(340)
  const [petLevel, setPetLevel] = useState(5)
  const [ecoCoins, setEcoCoins] = useState(480)
  const [petMessage, setPetMessage] = useState('¡Hola! Escanea residuos para que no me dé hambre 🌿')

  // State for AI Simulator
  const [activeItem, setActiveItem] = useState(SIMULATION_ITEMS[0])
  const [simulating, setSimulating] = useState(false)

  // Download Trigger with Confetti
  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#059669', '#f59e0b']
    })
  }

  // Interactive Feed
  const handleFeed = (foodName, hpGain) => {
    const newHp = Math.min(100, petHp + hpGain)
    setPetHp(newHp)
    setPetMessage(`¡Ñam ñam! Deliciosa ${foodName}. HP al ${newHp}% 😋`)
  }

  // Interactive Scan Simulation inside Pet card
  const handleScanAction = () => {
    setSimulating(true)
    setTimeout(() => {
      setSimulating(false)
      const newXp = petXp + 50
      const newCoins = ecoCoins + 25
      setPetXp(newXp)
      setEcoCoins(newCoins)
      if (newXp >= 400) {
        setPetLevel(petLevel + 1)
        setPetMessage('🎉 ¡SUBISTE DE NIVEL! Tu mascota está más fuerte.')
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } })
      } else {
        setPetMessage('¡Visión AI reconoció el residuo! +50 XP y +25 EcoCoins 🪙')
      }
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#070b09] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Background radial accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[35%] -right-40 w-[600px] h-[500px] bg-teal-500/8 blur-[150px] rounded-full" />
        <div className="absolute top-[70%] -left-40 w-[600px] h-[500px] bg-emerald-600/8 blur-[160px] rounded-full" />
      </div>

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b09]/80 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <img 
                src="/assets/ic_launcher.png" 
                alt="EcoPet Logo" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  EcoPet
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Android APK
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Mascota Virtual & Edge AI</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#mascotas" className="hover:text-emerald-400 transition-colors">Mascotas</a>
            <a href="#simulador" className="hover:text-emerald-400 transition-colors">Simulador IA</a>
            <a href="#pilares" className="hover:text-emerald-400 transition-colors">Arquitectura</a>
            <a href="#descarga" className="hover:text-emerald-400 transition-colors">Descargar</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/EcoPet_Instalable.apk"
              download="EcoPet_Instalable.apk"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar APK</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ingeniería Multimedia • Edge AI • 100% Offline</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
              Tu mascota virtual que te enseña a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">reciclar en la vida real</span>.
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              EcoPet transforma el reciclaje en un juego estilo Tamagotchi. Cuidas a tu sapito endémico alimentándolo y vistiéndolo, pero para ganar recompensas escaneas residuos reales con la cámara de tu celular. Dos redes neuronales corren directamente en tu teléfono sin necesidad de internet.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="/EcoPet_Instalable.apk"
                download="EcoPet_Instalable.apk"
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-zinc-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Descargar APK Gratis (22.9 MB)</span>
              </a>

              <a
                href="#simulador"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-200 font-medium text-base transition-all"
              >
                <Eye className="w-5 h-5 text-emerald-400" />
                <span>Probar Simulador de IA</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="font-heading font-bold text-2xl text-white">100%</p>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">Offline y Privado</p>
              </div>
              <div>
                <p className="font-heading font-bold text-2xl text-emerald-400">&lt;45 ms</p>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">Inferencia Edge AI</p>
              </div>
              <div>
                <p className="font-heading font-bold text-2xl text-teal-300">2 CNNs</p>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">Ensamble Jerárquico</p>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive Virtual Pet Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-6 border border-white/10 shadow-2xl backdrop-blur-xl glow-card">
              
              {/* Pet Selector tabs */}
              <div className="flex items-center justify-between p-1.5 rounded-2xl bg-black/40 border border-white/5 mb-6">
                {MASCOTS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedPet(m)
                      setPetMessage(`¡Has seleccionado a ${m.name}! 🌟`)
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedPet.id === m.id
                        ? 'bg-emerald-500 text-zinc-950 shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Pet Display Arena */}
              <div className="relative h-64 rounded-2xl overflow-hidden flex items-center justify-center bg-radial from-emerald-900/20 via-zinc-950/50 to-zinc-950 border border-emerald-500/10">
                <img 
                  src="/assets/fondo_paramo.png" 
                  alt="Fondo Páramo" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px]"
                />
                
                {/* Floating Mascot */}
                <div className="relative z-10 animate-float flex flex-col items-center">
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    className="w-40 h-40 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                  />
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-300">
                    {selectedPet.name} • Nivel {petLevel}
                  </span>
                </div>
              </div>

              {/* Status speech bubble */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 text-center font-medium min-h-[42px] flex items-center justify-center">
                {petMessage}
              </div>

              {/* Pet Stats Bars */}
              <div className="mt-4 space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-rose-400"><Heart className="w-3.5 h-3.5" /> Salud / Hambre (HP)</span>
                    <span className="tabular-nums text-zinc-300">{petHp}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-emerald-400 transition-all duration-500 rounded-full"
                      style={{ width: `${petHp}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-amber-400"><Zap className="w-3.5 h-3.5" /> Experiencia (XP)</span>
                    <span className="tabular-nums text-zinc-300">{petXp} / 400</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                      style={{ width: `${(petXp / 400) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleFeed('Bandeja Paisa', 15)}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>🍛 Dar Bandeja Paisa</span>
                </button>
                <button
                  onClick={handleScanAction}
                  disabled={simulating}
                  className="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>{simulating ? 'Escaneando...' : 'Escanear Residuo'}</span>
                </button>
              </div>

              {/* Economy counter */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="tabular-nums">{ecoCoins} EcoCoins</span>
                </span>
                <span>Gacha de accesorios desbloqueado</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: SIMULADOR EDGE AI INTERACTIVO */}
      <section id="simulador" className="relative z-10 py-20 bg-zinc-950/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Simulador del Motor de Clasificación</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Pruébalo tú mismo: ¿Cómo decide la IA de EcoPet?
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              En lugar de enviar fotos a la nube lenta y costosa, EcoPet ejecuta dos redes neuronales convolucionales ligeras (TFLite) en paralelo y aplica una función <strong className="text-emerald-400">Softmax</strong> con lógica de ensamble jerárquico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Selector of items */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-400 mb-3 px-1">
                Selecciona un residuo para escanear:
              </h3>
              {SIMULATION_ITEMS.map((item) => {
                const isActive = activeItem.id === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                        : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/80 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{item.name}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{item.category}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-emerald-400 translate-x-1' : 'text-zinc-600'}`} />
                  </button>
                )
              })}
            </div>

            {/* Right: Inspection Card (Neural Network Results) */}
            <div className="lg:col-span-7 bg-zinc-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    AI
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">Pipeline de Inferencia Edge</h4>
                    <p className="text-xs text-zinc-400">Ejecución en chip Snapdragon / MediaTek sin conexión</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  38 ms
                </div>
              </div>

              {/* Dual Model Breakdown */}
              <div className="py-6 space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-zinc-400 font-medium">Modelo 1: Clasificador Biológico (2.0 MB)</span>
                    <span className="text-emerald-400 font-mono font-semibold">{activeItem.bioModel}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Evalúa características de biodegradabilidad celular y materia orgánica natural.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-zinc-400 font-medium">Modelo 2: TrashNet MobileNetV2 (4.4 MB)</span>
                    <span className="text-teal-300 font-mono font-semibold">{activeItem.trashnet}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Detecta texturas de materiales sintéticos: plástico, cartón, vidrio, metal y envoltorios.
                  </div>
                </div>
              </div>

              {/* Decision Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
                <img 
                  src={activeItem.containerImg} 
                  alt={activeItem.decision} 
                  className="w-16 h-16 object-contain"
                />
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Destino Correcto de Disposición:
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    {activeItem.decision}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeItem.explanation}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION: LOS 4 PILARES MULTIMEDIA */}
      <section id="pilares" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Arquitectura Técnica del Proyecto</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Los 4 Pilares de la Ingeniería Multimedia
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            EcoPet no es solo código ni solo arte: es la convergencia exacta entre diseño de interacción, inteligencia computacional y gamificación de impacto real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pilar 1 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">Pilar 01</span>
            <h3 className="font-heading font-bold text-xl text-white mt-1 mb-3">Arte Visual & Calibración 2D</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Perspectiva isométrica 3/4. Se calculó una transformación afín matemática con pendiente interocular de <strong className="text-zinc-200">-13°</strong> para las gafas y <strong className="text-zinc-200">-9°</strong> en la coronilla para que los accesorios calcen anatómicamente sobre la cabeza del sapito.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400">Pilar 02</span>
            <h3 className="font-heading font-bold text-xl text-white mt-1 mb-3">Gamificación & Tamagotchi</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Bucle de retroalimentación adictivo: ciclo vital con HP decreciente, evolución por XP, economía de EcoCoins y sistema Gacha con probabilidades balanceadas (60% Común, 30% Raro, 10% Legendario).
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-teal-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-400">Pilar 03</span>
            <h3 className="font-heading font-bold text-xl text-white mt-1 mb-3">Visión Artificial Edge AI</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Ensamble de 2 CNNs optimizadas en formato TensorFlow Lite (6.4 MB totales). Todo ocurre en el procesador del smartphone sin enviar imágenes a la red, garantizando privacidad absoluta y funcionamiento en zonas rurales.
            </p>
          </div>

          {/* Pilar 4 */}
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">Pilar 04</span>
            <h3 className="font-heading font-bold text-xl text-white mt-1 mb-3">Ingeniería Nativa Android</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Desarrollado en Kotlin con Android CameraX para captura continua en vivo, eventos táctiles Drag & Drop con colisiones en canecas, persistencia SharedPreferences y empaquetado optimizado en APK instalable.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: MASCOTAS Y GASTRONOMÍA COLOMBIANA */}
      <section id="mascotas" className="relative z-10 py-20 bg-zinc-950/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Identidad & Fauna Andina</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Mascotas que representan nuestros ecosistemas
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Cada personaje está inspirado en especies emblemáticas de Colombia y se alimenta con nuestra auténtica gastronomía tradicional.
            </p>
          </div>

          {/* Pets cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MASCOTS.map((m) => (
              <div 
                key={m.id}
                className="rounded-3xl bg-zinc-900/60 border border-white/10 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all glow-card"
              >
                <div>
                  <div className="relative h-48 rounded-2xl bg-black/40 overflow-hidden flex items-center justify-center border border-white/5 mb-6">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-32 h-32 object-contain drop-shadow-lg"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 backdrop-blur-md">
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">{m.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mb-3">{m.subtitle}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{m.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <span>Especie:</span>
                  <span className="font-medium text-zinc-300">{m.species}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Colombian Food Gallery */}
          <div className="mt-14 p-8 rounded-3xl bg-zinc-900/40 border border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="font-heading font-bold text-lg text-white">Menú Típico Colombiano para tu Mascota</h4>
                <p className="text-xs text-zinc-400">Alimentos tradicionales que puedes comprar en la tienda con tus EcoCoins</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                100% Biodegradable
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center flex flex-col items-center">
                <img src="/assets/comida_bandeja_paisa.png" alt="Bandeja Paisa" className="w-16 h-16 object-contain mb-2" />
                <span className="text-xs font-bold text-zinc-200">Bandeja Paisa</span>
                <span className="text-[11px] text-emerald-400">+35 HP</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center flex flex-col items-center">
                <img src="/assets/comida_tamal.png" alt="Tamal con Hoja de Plátano" className="w-16 h-16 object-contain mb-2" />
                <span className="text-xs font-bold text-zinc-200">Tamal Tradicional</span>
                <span className="text-[11px] text-emerald-400">+25 HP</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center flex flex-col items-center">
                <img src="/assets/comida_changua.png" alt="Changua Santafereña" className="w-16 h-16 object-contain mb-2" />
                <span className="text-xs font-bold text-zinc-200">Changua con Calado</span>
                <span className="text-[11px] text-emerald-400">+20 HP</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center flex flex-col items-center">
                <img src="/assets/comida_cafe.png" alt="Café de Páramo" className="w-16 h-16 object-contain mb-2" />
                <span className="text-xs font-bold text-zinc-200">Café de Origen</span>
                <span className="text-[11px] text-emerald-400">+15 HP</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: DESCARGA Y GUÍA DE INSTALACIÓN */}
      <section id="descarga" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950/70 via-zinc-900 to-zinc-950 p-8 sm:p-14 border border-emerald-500/30 overflow-hidden glow-emerald">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Download CTA details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instalador Verificado y Seguro</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                Descarga EcoPet en tu Android
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed">
                Obtén el paquete completo listo para instalar. No requiere cuenta de Google Play, no incluye publicidad invasiva y no recopila datos personales.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="/EcoPet_Instalable.apk"
                  download="EcoPet_Instalable.apk"
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Download className="w-6 h-6" />
                  <span>Descargar EcoPet APK (22.9 MB)</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 pt-2 font-medium">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Android 8.0 o superior
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Firma digital .idsig
                </span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cámara trasera estándar
                </span>
              </div>
            </div>

            {/* Step-by-step install cards */}
            <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-emerald-400">
                Guía de Instalación en 3 Pasos:
              </h4>

              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Descarga el archivo APK</p>
                  <p className="text-[11px] text-zinc-400">Presiona el botón de descarga y espera que finalice el archivo de 22.9 MB.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Permite orígenes desconocidos</p>
                  <p className="text-[11px] text-zinc-400">Al abrir el instalador, tu navegador te pedirá confirmar permiso para instalar aplicaciones externas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">¡Abre EcoPet y adopta tu sapito!</p>
                  <p className="text-[11px] text-zinc-400">Otorga el permiso de cámara cuando la app te lo solicite para comenzar a escanear.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-[#050807] text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/ic_launcher.png" alt="EcoPet" className="w-7 h-7 rounded-lg" />
            <span className="font-heading font-bold text-sm text-white">EcoPet Project</span>
            <span className="text-zinc-400">• Proyecto de Ingeniería Multimedia</span>
          </div>

          <p className="text-center sm:text-left text-zinc-400">
            Desarrollado por <span className="text-zinc-200 font-semibold">Juan Pablo Nieto Cortés</span>
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/JuanPNietoC/webecopet" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
