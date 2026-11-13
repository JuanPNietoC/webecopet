import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Smartphone,
  Sparkles,
  Camera,
  Award,
  BookOpen,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  HelpCircle,
  Layers,
  Leaf,
  Target,
  Compass,
  Heart,
  Coins,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Cpu,
  RefreshCw,
  Info,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Mobile drawer navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pet interactive state
  const [selectedPet, setSelectedPet] = useState('rana');
  const [petHp, setPetHp] = useState(85);
  const [petXp, setPetXp] = useState(340);
  const [ecoCoins, setEcoCoins] = useState(120);
  const [petMood, setPetMood] = useState('¡Hola! Soy tu compañero ecológico');
  const [isFeeding, setIsFeeding] = useState(false);

  // Waste simulator state
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Mobile prototype screenshot tab
  const [activeScreenTab, setActiveScreenTab] = useState(0);

  // Data for pets
  const pets = {
    rana: {
      name: 'Sapito Sabio',
      species: 'Rana Sabanera (Dendropsophus labialis)',
      habitat: 'Humedales del Altiplano Cundiboyacense',
      image: '/assets/rana_feliz.png',
      badge: 'Nativo de los Humedales',
      desc: 'Guardián anfibio que monitorea la pureza del agua y la descomposición orgánica.'
    },
    oso: {
      name: 'Oso Andino',
      species: 'Oso de Anteojos (Tremarctos ornatus)',
      habitat: 'Bosques de Niebla y Páramos Andinos',
      image: '/assets/oso_feliz.png',
      badge: 'Especie Sombrilla',
      desc: 'Dispersor de semillas vital para la regeneración vegetal de alta montaña.'
    },
    chivo: {
      name: 'Chivito Paramuno',
      species: 'Colibrí del Páramo (Oxypogon guerinii)',
      habitat: 'Frailejonales del Páramo de Sumapaz',
      image: '/assets/chivo_feliz.png',
      badge: 'Polinizador de Altura',
      desc: 'Polinizador endémico de los frailejones, esencial para la recarga hídrica.'
    }
  };

  // Colombian regional foods
  const foods = [
    { name: 'Bandeja Paisa', img: '/assets/comida_bandeja_paisa.png', hp: 20, xp: 25, price: 15 },
    { name: 'Tamal Tolimense', img: '/assets/comida_tamal.png', hp: 15, xp: 20, price: 10 },
    { name: 'Changua', img: '/assets/comida_changua.png', hp: 10, xp: 15, price: 8 },
    { name: 'Café de Origen', img: '/assets/comida_cafe.png', hp: 10, xp: 10, price: 5 }
  ];

  // Mobile App Screenshots
  const screens = [
    {
      id: 0,
      img: '/presentation/screen_2.png',
      title: 'Detección con Cámara',
      shortTitle: 'Cámara IA',
      tag: 'Visión Artificial Edge',
      desc: 'Captura en tiempo real con CameraX y clasificación instantánea con red MobileNetV2 optimizada para teléfonos.'
    },
    {
      id: 1,
      img: '/presentation/screen_4.png',
      title: 'Tienda & Personalización',
      shortTitle: 'Tienda',
      tag: 'Inventario de Mascotas',
      desc: 'Accesorios y prendas culturales canjeables con EcoCoins ganadas al reciclar en la vida real.'
    },
    {
      id: 2,
      img: '/presentation/screen_3.png',
      title: 'Minijuego Pedagógico',
      shortTitle: 'Minijuego',
      tag: 'Separación Rápida',
      desc: 'Dinámica interactiva de arrastrar residuos a las canecas Verde, Blanca y Negra contra reloj.'
    },
    {
      id: 3,
      img: '/presentation/screen_1.png',
      title: 'Home del Tamagotchi',
      shortTitle: 'Tamagotchi',
      tag: 'Cuidado y Alimentación',
      desc: 'Panel principal de estadísticas de salud, nivel de experiencia, apetito y diálogo con la mascota.'
    }
  ];

  // Waste database according to Colombian Resolution 2184/2019
  const wasteItems = [
    {
      id: 'platano',
      name: 'Cáscara de Plátano',
      type: 'Orgánico',
      bin: 'verde',
      binName: 'Caneca Verde (Orgánicos)',
      binImg: '/assets/caneca_verde.png',
      confidence: '99.4%',
      explanation: 'Residuo orgánico biodegradable ideal para compostaje y abono en huertas comunitarias.',
      xpAward: 30,
      coinAward: 15
    },
    {
      id: 'botella',
      name: 'Botella de Plástico PET',
      type: 'Aprovechable',
      bin: 'blanca',
      binName: 'Caneca Blanca (Aprovechables)',
      binImg: '/assets/caneca_blanca.png',
      confidence: '98.8%',
      explanation: 'Plástico limpio y seco que entra directamente a la cadena de reciclaje industrial.',
      xpAward: 40,
      coinAward: 20
    },
    {
      id: 'servilleta',
      name: 'Servilleta Usada / Grasa',
      type: 'No Aprovechable',
      bin: 'negra',
      binName: 'Caneca Negra (No Aprovechables)',
      binImg: '/assets/caneca_negra.png',
      confidence: '97.2%',
      explanation: 'El papel contaminado con grasa o fluidos no puede reciclarse y va a disposición final.',
      xpAward: 25,
      coinAward: 10
    },
    {
      id: 'lata',
      name: 'Lata de Aluminio',
      type: 'Aprovechable',
      bin: 'blanca',
      binName: 'Caneca Blanca (Aprovechables)',
      binImg: '/assets/caneca_blanca.png',
      confidence: '99.1%',
      explanation: 'El aluminio es infinitamente reciclable y ahorra un 95% de energía al reutilizarse.',
      xpAward: 45,
      coinAward: 25
    },
    {
      id: 'snack',
      name: 'Empaque de Snacks',
      type: 'No Aprovechable',
      bin: 'negra',
      binName: 'Caneca Negra (No Aprovechables)',
      binImg: '/assets/caneca_negra.png',
      confidence: '96.5%',
      explanation: 'Los empaques laminados multicapa son difíciles de separar y van a la caneca negra.',
      xpAward: 25,
      coinAward: 10
    },
    {
      id: 'manzana',
      name: 'Corazón de Manzana',
      type: 'Orgánico',
      bin: 'verde',
      binName: 'Caneca Verde (Orgánicos)',
      binImg: '/assets/caneca_verde.png',
      confidence: '98.9%',
      explanation: 'Materia orgánica húmeda que se transforma en nutrientes para la tierra.',
      xpAward: 30,
      coinAward: 15
    }
  ];

  // Feed action
  const handleFeed = (food) => {
    if (ecoCoins < food.price) {
      setPetMood(`¡Necesitas ${food.price} EcoCoins para comprar ${food.name}!`);
      return;
    }
    setIsFeeding(true);
    setEcoCoins((prev) => prev - food.price);
    setPetHp((prev) => Math.min(100, prev + food.hp));
    setPetXp((prev) => prev + food.xp);
    setPetMood(`¡Mmm, qué rico! Me diste ${food.name}. +${food.hp} Salud, +${food.xp} XP`);
    setTimeout(() => setIsFeeding(false), 800);
  };

  // Simulate scanning
  const handleScan = (waste) => {
    setSelectedWaste(waste);
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult(waste);
      setPetXp((prev) => prev + waste.xpAward);
      setEcoCoins((prev) => prev + waste.coinAward);
      setPetMood(`¡Excelente! Separaste ${waste.name}. Ganaste ${waste.coinAward} EcoCoins.`);
    }, 600);
  };

  // Download celebration
  const triggerDownloadConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#215332', '#C4D89D', '#F5F0D6', '#8D3E27']
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F0D6] text-[#1C2B20] selection:bg-[#215332] selection:text-[#F5F0D6] pb-24 md:pb-0 overflow-x-hidden">
      {/* Top Banner / Academic Attribution */}
      <div className="bg-[#215332] text-[#F5F0D6] text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-[#153822]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider bg-[#C4D89D] text-[#215332] px-2 py-0.5 rounded-full text-[9px] sm:text-[10px]">
              ODS 11
            </span>
            <span className="truncate max-w-[280px] sm:max-w-none">
              Ciudades y Comunidades Sostenibles • UMNG
            </span>
          </div>
          <div className="text-[#C4D89D] text-[10px] sm:text-[11px]">
            Por: <strong className="text-white">Daniel Bossa • Marian Viasus • Sara Orjuela</strong>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#F5F0D6]/95 backdrop-blur-md border-b-2 border-[#215332]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#215332] flex items-center justify-center border-2 border-[#C4D89D] shadow-sm shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4D89D]" />
            </div>
            <div>
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#215332] block leading-none">
                ECOPET
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#89986D]">
                Mascota & IA Edge
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <a href="#introduccion" className="hover:text-[#215332] transition-colors">01. Introducción</a>
            <a href="#problema" className="hover:text-[#215332] transition-colors">02. Problema</a>
            <a href="#propuesta" className="hover:text-[#215332] transition-colors">03. Propuesta</a>
            <a href="#prototipo" className="hover:text-[#215332] transition-colors">04. Prototipo</a>
            <a href="#simulador" className="hover:text-[#215332] transition-colors">05. Simulador</a>
            <a href="#objetivos" className="hover:text-[#215332] transition-colors">06. Objetivos</a>
          </div>

          {/* Action Button & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/EcoPet_Instalable.apk"
              download="EcoPet_Instalable.apk"
              onClick={triggerDownloadConfetti}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#215332] hover:bg-[#153822] text-[#F5F0D6] font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 border-[#215332] shadow-geometric transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C4D89D]" />
              <span className="hidden xs:inline">Descargar APK</span>
              <span className="xs:hidden">APK</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF7EB] border-2 border-[#215332] text-[#215332] active:bg-[#E4DEBE]"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7EB] border-b-4 border-[#215332] px-4 py-5 space-y-3 animate-fadeIn shadow-lg">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a
                href="#introduccion"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                01. Introducción
              </a>
              <a
                href="#problema"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                02. Diagnóstico
              </a>
              <a
                href="#propuesta"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                03. Propuesta
              </a>
              <a
                href="#prototipo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                04. Prototipo Android
              </a>
              <a
                href="#simulador"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                05. Simulador IA
              </a>
              <a
                href="#objetivos"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-[#F5F0D6] rounded-xl border border-[#D8D2BA] text-[#215332]"
              >
                06. Objetivos
              </a>
            </div>

            <div className="pt-2 border-t border-[#D8D2BA] flex items-center justify-between text-xs text-[#89986D]">
              <span>Autores: Bossa, Viasus, Orjuela</span>
              <a
                href="https://github.com/JuanPNietoC/webecopet"
                target="_blank"
                rel="noreferrer"
                className="text-[#215332] font-bold underline"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Subtle geometric circles */}
        <div className="absolute top-10 left-[-60px] w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#C4D89D]/40 pointer-events-none -z-10" />
        <div className="absolute top-40 right-[-60px] w-60 sm:w-80 h-60 sm:h-80 rounded-t-full bg-[#B0C290]/30 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#215332] bg-[#FAF7EB] text-[11px] sm:text-xs font-semibold text-[#215332]">
              <span className="w-2 h-2 rounded-full bg-[#215332] animate-pulse" />
              <span>Proyecto Universitario • ODS 11 • IA Edge</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-[#215332]">
              ECOPET
            </h1>

            <h2 className="font-serif-body text-lg sm:text-2xl text-[#1C2B20] font-normal leading-snug sm:leading-relaxed border-l-0 sm:border-l-4 sm:border-[#215332] sm:pl-4">
              Mascota Virtual y Clasificador Ecológico de Residuos
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#3B4D40] leading-relaxed max-w-xl mx-auto sm:mx-0">
              Una aplicación móvil que combina <strong>inteligencia artificial</strong>,{' '}
              <strong>educación ambiental</strong> y <strong>gamificación</strong> para enseñar a los usuarios a
              clasificar correctamente sus residuos mientras cuidan una mascota virtual inspirada en la fauna colombiana.
            </p>

            {/* Author Attribution Card */}
            <div className="bg-[#FAF7EB] p-3.5 sm:p-4 rounded-2xl border-2 border-[#D8D2BA] shadow-sm flex flex-col sm:flex-row items-center sm:justify-between gap-2 max-w-md mx-auto sm:mx-0 text-center sm:text-left">
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#89986D] block">
                  Autores de Investigación
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#215332]">
                  Daniel Bossa • Marian Viasus • Sara Orjuela
                </p>
              </div>
              <span className="text-[10px] sm:text-xs bg-[#215332] text-[#F5F0D6] px-2.5 py-1 rounded-full font-medium">
                UMNG
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <a
                href="/EcoPet_Instalable.apk"
                download="EcoPet_Instalable.apk"
                onClick={triggerDownloadConfetti}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#215332] hover:bg-[#153822] text-[#F5F0D6] font-medium text-sm sm:text-base px-6 py-3.5 rounded-full shadow-geometric hover:shadow-geometric-lg transition-all active:scale-98"
              >
                <Download className="w-5 h-5 text-[#C4D89D]" />
                <span>Descargar APK (22.9 MB)</span>
              </a>

              <a
                href="#simulador"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7EB] hover:bg-white text-[#215332] font-medium text-sm sm:text-base px-5 py-3.5 rounded-full border-2 border-[#215332] transition-colors"
              >
                <Smartphone className="w-4 h-4" />
                <span>Probar Simulador</span>
              </a>
            </div>

            {/* Technical Badges */}
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#215332]">
              <span className="bg-[#C4D89D]/60 px-2.5 py-0.5 sm:py-1 rounded-full border border-[#215332]/30">📱 Android Nativo</span>
              <span className="bg-[#C4D89D]/60 px-2.5 py-0.5 sm:py-1 rounded-full border border-[#215332]/30">🤖 TFLite 100% Offline</span>
              <span className="bg-[#C4D89D]/60 px-2.5 py-0.5 sm:py-1 rounded-full border border-[#215332]/30">🌱 Tamagotchi</span>
              <span className="bg-[#C4D89D]/60 px-2.5 py-0.5 sm:py-1 rounded-full border border-[#215332]/30">🎯 ODS 11</span>
            </div>
          </div>

          {/* Right Column: Interactive Pet Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-sm bg-[#FAF7EB] rounded-t-[80px] sm:rounded-t-[120px] rounded-b-3xl border-4 border-[#215332] shadow-geometric-lg p-4 sm:p-6 flex flex-col items-center relative overflow-hidden">
              {/* Pet Switcher Buttons */}
              <div className="flex bg-[#F5F0D6] rounded-full p-1 border-2 border-[#215332] mb-3 sm:mb-4 z-10 w-full justify-between">
                <button
                  onClick={() => { setSelectedPet('rana'); setPetMood('¡Croac! Hola, soy el Sapito Sabio.'); }}
                  className={`flex-1 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all text-center ${
                    selectedPet === 'rana' ? 'bg-[#215332] text-white shadow-sm' : 'text-[#215332] hover:bg-[#E4DEBE]'
                  }`}
                >
                  🐸 Sapito
                </button>
                <button
                  onClick={() => { setSelectedPet('oso'); setPetMood('¡Grrr feliz! El Oso Andino te saluda.'); }}
                  className={`flex-1 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all text-center ${
                    selectedPet === 'oso' ? 'bg-[#215332] text-white shadow-sm' : 'text-[#215332] hover:bg-[#E4DEBE]'
                  }`}
                >
                  🐻 Oso
                </button>
                <button
                  onClick={() => { setSelectedPet('chivo'); setPetMood('¡Pío veloz! Soy el Chivito Paramuno.'); }}
                  className={`flex-1 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all text-center ${
                    selectedPet === 'chivo' ? 'bg-[#215332] text-white shadow-sm' : 'text-[#215332] hover:bg-[#E4DEBE]'
                  }`}
                >
                  🐤 Chivito
                </button>
              </div>

              {/* Status Bar */}
              <div className="w-full grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-[#F5F0D6] p-2 rounded-xl border border-[#D8D2BA]">
                  <div className="flex justify-between items-center text-[#215332] font-semibold mb-1">
                    <span className="flex items-center gap-1 text-[11px]"><Heart className="w-3.5 h-3.5 text-[#8D3E27] fill-current" /> Salud</span>
                    <span className="text-[11px]">{petHp}%</span>
                  </div>
                  <div className="w-full bg-[#E0D8BD] h-1.5 sm:h-2 rounded-full overflow-hidden">
                    <div className="bg-[#215332] h-full rounded-full transition-all" style={{ width: `${petHp}%` }} />
                  </div>
                </div>

                <div className="bg-[#F5F0D6] p-2 rounded-xl border border-[#D8D2BA] flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-[#89986D] uppercase font-bold">EcoCoins</span>
                    <span className="font-bold text-[#215332] text-xs sm:text-sm flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-[#89986D]" /> {ecoCoins}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] text-[#89986D] uppercase font-bold">Nivel</span>
                    <span className="font-bold text-[#215332] text-xs sm:text-sm">Nv. {Math.floor(petXp / 100) + 1}</span>
                  </div>
                </div>
              </div>

              {/* Pet Stage */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center my-1 sm:my-2">
                <div className="absolute inset-0 rounded-full bg-[#C4D89D]/40 border-2 border-dashed border-[#215332]/40 -z-0" />
                <img
                  src={pets[selectedPet].image}
                  alt={pets[selectedPet].name}
                  className={`w-36 h-36 sm:w-44 sm:h-44 object-contain animate-pet-float transition-all duration-300 drop-shadow-md z-10 ${
                    isFeeding ? 'scale-110 rotate-3' : ''
                  }`}
                />
              </div>

              {/* Speech Bubble */}
              <div className="w-full bg-[#F5F0D6] border-2 border-[#215332] rounded-2xl p-2.5 text-xs text-center font-medium text-[#1C2B20] mb-3 min-h-[42px] flex items-center justify-center">
                <p className="line-clamp-2 leading-tight">"{petMood}"</p>
              </div>

              {/* Feeding Controls */}
              <div className="w-full">
                <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#215332] mb-1.5 text-center">
                  Alimentar con Comida Colombiana
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {foods.map((food, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFeed(food)}
                      className="bg-white hover:bg-[#F5F0D6] p-2 sm:p-1.5 rounded-xl border border-[#D8D2BA] flex flex-col items-center gap-0.5 transition-transform active:scale-95 text-center group"
                    >
                      <img src={food.img} alt={food.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] sm:text-[9px] font-bold text-[#215332] truncate w-full">{food.name}</span>
                      <span className="text-[9px] sm:text-[8px] text-[#89986D] font-semibold">{food.price} 🪙</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION: ÍNDICE DEL PROYECTO */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAF7EB] border-y-2 border-[#215332]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Estructura Oficial</span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">Índice</h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Desarrollo metodológico presentado en la sustentación de EcoPet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { num: '01', title: 'Introducción', desc: 'Mascota Virtual, IA y ODS 11', link: '#introduccion' },
              { num: '02', title: 'Identificación', desc: 'Problema y Población Objetivo', link: '#problema' },
              { num: '03', title: 'Propuesta', desc: '¿Cómo funciona y ciclo de uso?', link: '#propuesta' },
              { num: '04', title: 'Prototipo y Difusión', desc: 'Capturas funcionales de la App', link: '#prototipo' },
              { num: '05', title: 'Simulador', desc: 'Interacción con el modelo Edge', link: '#simulador' },
              { num: '06', title: 'Objetivos', desc: 'Objetivo general y específicos', link: '#objetivos' },
              { num: '07', title: 'Planes a Futuro', desc: 'Personajes y Campus UNMG', link: '#futuro' },
              { num: '08', title: 'Descarga Directa', desc: 'Instalable APK Android v1.0', link: '#descarga' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="bg-[#F5F0D6] p-4 sm:p-5 rounded-2xl border-2 border-[#215332] shadow-geometric hover:-translate-y-0.5 transition-all flex flex-col justify-between group active:bg-[#E4DEBE]"
              >
                <div>
                  <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#89986D] group-hover:text-[#215332] transition-colors">
                    {item.num}.
                  </span>
                  <h3 className="font-serif-body font-bold text-base sm:text-lg text-[#215332] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4F6354] mt-1">{item.desc}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#D8D2BA] flex justify-between items-center text-xs font-semibold text-[#215332]">
                  <span>Ver sección</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 01: INTRODUCCIÓN & ODS 11 */}
      <section id="introduccion" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                01. Introducción
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332] leading-tight">
                Mascota Virtual y Clasificador Ecológico de Residuos
              </h2>

              <p className="font-serif-body text-sm sm:text-base text-[#1C2B20] leading-relaxed">
                EcoPet es una aplicación móvil que combina <strong>inteligencia artificial</strong>,{' '}
                <strong>educación ambiental</strong> y <strong>gamificación</strong> para enseñar a los usuarios a
                clasificar correctamente sus residuos mientras cuidan una mascota virtual inspirada en la fauna colombiana.
              </p>

              {/* ODS 11 Box */}
              <div className="bg-[#FAF7EB] border-2 border-[#215332] rounded-3xl p-4 sm:p-6 shadow-geometric">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FD9D24] text-white flex flex-col items-center justify-center font-bold text-center p-1 shrink-0 shadow-sm">
                    <span className="text-[9px] sm:text-[10px] leading-none uppercase">ODS</span>
                    <span className="text-xl sm:text-2xl leading-none">11</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif-body font-bold text-sm sm:text-base text-[#215332]">
                      ODS 11: Ciudades y Comunidades Sostenibles
                    </h3>
                    <p className="text-xs text-[#3B4D40] leading-relaxed">
                      EcoPet contribuye directamente a las metas de sostenibilidad urbana reduciendo el impacto ambiental mediante la correcta separación de residuos en la fuente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7EB] border-l-4 border-[#215332] p-3.5 sm:p-4 rounded-r-xl">
                <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#89986D] mb-1">Concepto Principal & Justificación</h4>
                <p className="text-xs text-[#2D3E32] leading-relaxed">
                  EcoPet busca convertir la educación ambiental en una experiencia interactiva, práctica y entretenida, utilizando la tecnología para fomentar hábitos responsables.
                </p>
              </div>
            </div>

            {/* Right: The 3 Pets */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl p-5 sm:p-6 shadow-geometric-lg relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332]">
                    Fauna Colombiana
                  </h3>
                  <span className="bg-[#C4D89D] text-[#215332] text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    3 Especies Nativas
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(pets).map((p, idx) => (
                    <div key={idx} className="bg-[#F5F0D6] rounded-2xl p-3.5 border-2 border-[#D8D2BA] flex flex-col items-center text-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/70 border border-[#215332]/20 flex items-center justify-center mb-2 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                      </div>
                      <span className="font-serif-body font-bold text-sm text-[#215332]">{p.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-[#89986D] font-semibold mt-0.5">{p.badge}</span>
                      <p className="text-[10px] sm:text-[11px] text-[#4F6354] mt-1.5 leading-tight">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: IDENTIFICACIÓN DEL PROBLEMA */}
      <section id="problema" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF7EB] border-y-2 border-[#215332]">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              02. Identificación
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Diagnóstico y Población Objetivo
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Análisis contextual del problema ecológico en comunidades urbanas y universitarias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-6 sm:p-8 shadow-geometric flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#8D3E27] text-white flex items-center justify-center mb-3 sm:mb-4">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8D3E27]">Diagnóstico</span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#215332] mt-1 mb-3">
                  ¿Cuál es el problema?
                </h3>
                <p className="font-serif-body text-sm sm:text-base text-[#1C2B20] leading-relaxed">
                  La <strong>incorrecta separación de residuos</strong> dificulta su aprovechamiento y contribuye
                  a problemas comunitarios de gestión y sobrecostos ambientales.
                </p>
                <ul className="mt-4 sm:mt-6 space-y-2 text-xs sm:text-sm text-[#3B4D40]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8D3E27] font-bold">•</span>
                    <span>Contaminación de reciclables limpios con restos de comida.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8D3E27] font-bold">•</span>
                    <span>Desconocimiento del código tricolor (Res. 2184/2019).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8D3E27] font-bold">•</span>
                    <span>Saturación temprana de los rellenos sanitarios.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-6 sm:p-8 shadow-geometric flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#215332] text-white flex items-center justify-center mb-3 sm:mb-4">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4D89D]" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Enfoque Social</span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#215332] mt-1 mb-3">
                  Población Objetivo
                </h3>
                <p className="font-serif-body text-sm sm:text-base text-[#1C2B20] leading-relaxed">
                  Jóvenes, estudiantes universitarios y ciudadanos con dispositivos móviles que pueden fortalecer sus hábitos ambientales.
                </p>
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white/80 p-3 rounded-xl border border-[#D8D2BA]">
                    <strong className="block text-[#215332] font-serif-body">Comunidad UNMG</strong>
                    <span className="text-[#4F6354]">Separación en aulas, cafeterías y campus.</span>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-[#D8D2BA]">
                    <strong className="block text-[#215332] font-serif-body">Hogares Urbanos</strong>
                    <span className="text-[#4F6354]">Separación en la fuente doméstica.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: PROPUESTA & ¿CÓMO FUNCIONA? */}
      <section id="propuesta" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              03. Propuesta
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              ¿Cómo funciona?
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Flujo pedagógico de retroalimentación en 5 pasos.
            </p>
          </div>

          {/* 5-Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { step: '01', icon: '📱', title: 'Escaneo', desc: 'Escanea un residuo con la cámara del teléfono.' },
              { step: '02', icon: '🤖', title: 'Clasificación IA', desc: 'MobileNetV2 identifica el residuo en tiempo real.' },
              { step: '03', icon: '♻️', title: 'Depósito Correcto', desc: 'Deposita en la caneca correspondiente.' },
              { step: '04', icon: '⭐', title: 'Recompensas', desc: 'Gana XP y EcoCoins virtuales.' },
              { step: '05', icon: '🐸', title: 'Cuidado y Evolución', desc: 'Alimenta y cuida a tu mascota nativa.' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7EB] border-2 border-[#215332] rounded-3xl p-4 sm:p-5 shadow-geometric flex flex-col justify-between text-center group"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{step.icon}</div>
                <div>
                  <span className="text-[10px] sm:text-xs font-serif-display font-bold text-[#89986D]">{step.step}</span>
                  <h3 className="font-serif-body font-bold text-sm sm:text-base text-[#215332] mt-0.5 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4F6354] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile-Friendly Stepper Pipeline */}
          <div className="bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl p-5 sm:p-8 shadow-geometric-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 text-center sm:text-left">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Ciclo de Juego</span>
                <h3 className="font-serif-display text-xl sm:text-3xl text-[#215332]">
                  Uso de la Aplicación
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs bg-[#C4D89D] text-[#215332] font-bold px-3 py-1 rounded-full uppercase">
                Gamificación
              </span>
            </div>

            {/* Responsive Stepper: Vertical list on mobile, horizontal on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-[#215332]">
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Elegir huevo 🥚</span>
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Eclosión 🐣</span>
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Escanear 📷</span>
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Clasificar 🤖</span>
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Separar 🗑️</span>
              <span className="bg-[#F5F0D6] p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#D8D2BA] text-center">Recompensa ⭐🪙</span>
              <span className="col-span-2 sm:col-span-1 bg-[#215332] text-white p-2 sm:px-3.5 sm:py-2 rounded-xl text-center">Cuidar mascota 🐸</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: PROTOTIPO FUNCIONAL ANDROID */}
      <section id="prototipo" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF7EB] border-y-2 border-[#215332]">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              04. Prototipo y Difusión
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Prototipo Funcional Android
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Capturas reales del APK en funcionamiento nativo. En celulares puedes cambiar de pantalla con los botones.
            </p>
          </div>

          {/* Interactive Mobile Tabs Switcher for Screens on Small Viewports */}
          <div className="block lg:hidden space-y-4">
            <div className="flex bg-[#F5F0D6] p-1 rounded-2xl border-2 border-[#215332] overflow-x-auto gap-1">
              {screens.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreenTab(idx)}
                  className={`flex-1 min-w-[75px] py-2 px-2 text-xs font-bold rounded-xl transition-all text-center whitespace-nowrap ${
                    activeScreenTab === idx ? 'bg-[#215332] text-[#F5F0D6] shadow-sm' : 'text-[#215332] hover:bg-[#E4DEBE]'
                  }`}
                >
                  {s.shortTitle}
                </button>
              ))}
            </div>

            {/* Active Mobile Screen Display */}
            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-4 shadow-geometric max-w-xs mx-auto">
              <div className="bg-[#1C2B20] p-2 rounded-[2.5rem] shadow-inner mb-3 border-2 border-[#215332]">
                <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19] flex items-center justify-center">
                  <img
                    src={screens[activeScreenTab].img}
                    alt={screens[activeScreenTab].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#89986D] block">
                {screens[activeScreenTab].tag}
              </span>
              <h3 className="font-serif-body font-bold text-base text-[#215332] mt-0.5 mb-1">
                {screens[activeScreenTab].title}
              </h3>
              <p className="text-xs text-[#4F6354] leading-relaxed">
                {screens[activeScreenTab].desc}
              </p>
            </div>
          </div>

          {/* Desktop 4-Screens Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {screens.map((screen, idx) => (
              <div
                key={idx}
                className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-4 shadow-geometric flex flex-col justify-between group hover:-translate-y-1 transition-all"
              >
                <div className="bg-[#1C2B20] p-2 rounded-[2.5rem] shadow-inner mb-4 border-2 border-[#215332]">
                  <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19] flex items-center justify-center">
                    <img
                      src={screen.img}
                      alt={screen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#89986D] block">
                    {screen.tag}
                  </span>
                  <h3 className="font-serif-body font-bold text-base text-[#215332] mt-0.5 mb-1">
                    {screen.title}
                  </h3>
                  <p className="text-xs text-[#4F6354] leading-relaxed">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature List */}
          <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-5 sm:p-8 shadow-geometric">
            <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332] mb-4 sm:mb-6 text-center">
              Módulos Implementados en el APK
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">🐸 Mascota Virtual</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Fauna colombiana auténtica.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">📷 Cámara Nativa</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">CameraX optimizado.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">🤖 Clasificación IA</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">MobileNetV2 100% offline.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">🗑️ Minijuego</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Código tricolor de canecas.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">⭐ Sistema XP</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Progresión por niveles.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">🪙 EcoCoins</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Recompensa por reciclar.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">👕 Personalización</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Ropa y accesorios culturales.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D8D2BA]">
                <strong className="block text-[#215332] font-semibold text-xs sm:text-sm">🍽️ Alimentación</strong>
                <span className="text-[#4F6354] text-[11px] sm:text-xs">Gastronomía típica colombiana.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: SIMULADOR INTERACTIVO DE CLASIFICACIÓN CON IA */}
      <section id="simulador" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              05. Simulador
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Simulador de Inteligencia Artificial Edge
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Toca un residuo para clasificarlo con IA y ver a qué caneca corresponde.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Waste Selector */}
            <div className="lg:col-span-7 bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl p-5 sm:p-6 shadow-geometric">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] block mb-1">
                Paso 1: Elige un residuo
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332] mb-3 sm:mb-4">
                Catálogo de Residuos
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {wasteItems.map((waste) => {
                  const isSelected = selectedWaste?.id === waste.id;
                  return (
                    <button
                      key={waste.id}
                      onClick={() => handleScan(waste)}
                      className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between active:scale-95 ${
                        isSelected
                          ? 'bg-[#215332] text-[#F5F0D6] border-[#215332] shadow-md'
                          : 'bg-[#F5F0D6] hover:bg-white text-[#1C2B20] border-[#D8D2BA]'
                      }`}
                    >
                      <span className="font-serif-body font-bold text-xs sm:text-sm block mb-1 line-clamp-2">
                        {waste.name}
                      </span>
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] mt-2 pt-1.5 border-t border-current/20">
                        <span className="uppercase tracking-wider font-semibold opacity-80">{waste.type}</span>
                        <span className="font-bold">+{waste.coinAward} 🪙</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Canisters Guide */}
              <div className="mt-5 pt-5 border-t-2 border-[#D8D2BA]">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#215332] block mb-2 sm:mb-3">
                  Código de Colores (Resolución 2184/2019 Colombia)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
                  <div className="bg-[#2E7D32]/10 border-2 border-[#2E7D32] p-2.5 rounded-xl text-center sm:text-left">
                    <span className="font-bold text-[#2E7D32] block text-xs">🟢 Caneca Verde</span>
                    <span className="text-[10px] sm:text-[11px] text-[#2E7D32]">Orgánicos (cáscaras, restos de comida).</span>
                  </div>
                  <div className="bg-[#304250]/10 border-2 border-[#304250] p-2.5 rounded-xl text-center sm:text-left">
                    <span className="font-bold text-[#304250] block text-xs">⚪ Caneca Blanca</span>
                    <span className="text-[10px] sm:text-[11px] text-[#304250]">Aprovechables limpios (plástico, latas, vidrio).</span>
                  </div>
                  <div className="bg-[#1C2B20]/10 border-2 border-[#1C2B20] p-2.5 rounded-xl text-center sm:text-left">
                    <span className="font-bold text-[#1C2B20] block text-xs">⚫ Caneca Negra</span>
                    <span className="text-[10px] sm:text-[11px] text-[#1C2B20]">No aprovechables (servilletas con grasa, papel sucio).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: AI Output Display */}
            <div className="lg:col-span-5 bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl p-5 sm:p-6 shadow-geometric-lg">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] block mb-1">
                Paso 2: Resultado de Inferencia
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332] mb-3 sm:mb-4">
                Clasificación de IA
              </h3>

              {isScanning ? (
                <div className="py-12 sm:py-16 text-center space-y-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-[#215332] border-t-transparent animate-spin mx-auto" />
                  <p className="font-serif-body font-bold text-sm sm:text-base text-[#215332]">
                    Analizando con MobileNetV2...
                  </p>
                  <p className="text-[11px] text-[#89986D]">Inferencia 100% en dispositivo</p>
                </div>
              ) : scanResult ? (
                <div className="space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="bg-[#F5F0D6] p-3.5 sm:p-4 rounded-2xl border-2 border-[#215332] flex items-center gap-3 sm:gap-4">
                    <img src={scanResult.binImg} alt={scanResult.binName} className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0" />
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#89986D]">Caneca Destino</span>
                      <h4 className="font-serif-body font-bold text-base sm:text-lg text-[#215332] leading-snug">{scanResult.binName}</h4>
                      <span className="text-xs font-semibold text-[#3B4D40]">Confianza: {scanResult.confidence}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#D8D2BA] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#215332]">
                      <Info className="w-3.5 h-3.5 text-[#89986D]" />
                      <span>Fundamento Ecológico:</span>
                    </div>
                    <p className="text-xs text-[#3B4D40] leading-relaxed">
                      {scanResult.explanation}
                    </p>
                  </div>

                  <div className="bg-[#C4D89D]/40 p-3 sm:p-4 rounded-2xl border border-[#215332]/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="block font-bold text-[#215332]">Recompensa:</span>
                      <span className="text-[#3B4D40] text-[11px]">Añadida a tu mascota activa</span>
                    </div>
                    <div className="text-right font-bold text-[#215332] text-xs sm:text-sm">
                      +{scanResult.xpAward} XP • +{scanResult.coinAward} 🪙
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 sm:py-16 text-center space-y-2 bg-[#F5F0D6] rounded-2xl border-2 border-dashed border-[#D8D2BA] p-5">
                  <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-[#89986D] mx-auto" />
                  <p className="font-serif-body text-xs sm:text-sm text-[#4F6354]">
                    Toca cualquier residuo a la izquierda para ver su clasificación automática.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: BOCETOS E IDEA INICIAL */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF7EB] border-y-2 border-[#215332]">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Diseño y Conceptualización</span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Bocetos e Idea Inicial
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Trazos originales en papel de la interfaz y la mascota.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-4 sm:p-6 shadow-geometric flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] mb-2 sm:mb-3 self-start">
                Boceto 1: Estructura de Interfaz
              </span>
              <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-[#D8D2BA] p-2 flex items-center justify-center">
                <img
                  src="/presentation/sketch_interface.png"
                  alt="Boceto de la Interfaz"
                  className="max-h-72 sm:max-h-96 object-contain rounded-xl"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-[#4F6354] mt-3 text-center">
                Distribución de barras de salud, contenedor de mascota y barra de navegación.
              </p>
            </div>

            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-4 sm:p-6 shadow-geometric flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] mb-2 sm:mb-3 self-start">
                Boceto 2: Mascota y Alimentación
              </span>
              <div className="w-full bg-white rounded-2xl overflow-hidden border-2 border-[#D8D2BA] p-2 flex items-center justify-center">
                <img
                  src="/presentation/sketch_concept.png"
                  alt="Boceto Conceptual de la Mascota"
                  className="max-h-72 sm:max-h-96 object-contain rounded-xl"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-[#4F6354] mt-3 text-center">
                Exploración del personaje nativo y expresiones de satisfacción al alimentarlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: OBJETIVOS DEL PROYECTO */}
      <section id="objetivos" className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              06. Objetivos
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Objetivos del Proyecto
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Marco de metas académicas y técnicas formuladas para EcoPet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-5 bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl p-6 sm:p-8 shadow-geometric flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Meta Principal</span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#215332] mt-1 mb-3">
                  Objetivo General
                </h3>
                <p className="font-serif-body text-sm sm:text-base text-[#1C2B20] leading-relaxed">
                  Desarrollar una <strong>aplicación móvil educativa</strong> que fomente la correcta separación de
                  residuos mediante <strong>inteligencia artificial</strong> y <strong>gamificación</strong>,
                  contribuyendo a la educación ambiental relacionada con el <strong>ODS 11</strong>.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D8D2BA] flex items-center gap-2.5 text-xs text-[#215332] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#215332] shrink-0" />
                <span>Validado y desplegado como prototipo funcional</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {[
                {
                  num: '1',
                  title: 'Experiencia Interactiva de Mascota Virtual',
                  desc: 'Diseñar una experiencia interactiva basada en una mascota virtual inspirada en la fauna representativa de Colombia que genere apego y empatía ecológica.'
                },
                {
                  num: '2',
                  title: 'Implementación de Inteligencia Artificial',
                  desc: 'Implementar modelos de visión artificial optimizados (MobileNetV2) para clasificar residuos sólidos mediante la cámara del dispositivo móvil de manera 100% offline.'
                },
                {
                  num: '3',
                  title: 'Gamificación de la Separación de Residuos',
                  desc: 'Incentivar la correcta separación de residuos a través de dinámicas de juego, recompensas de EcoCoins, niveles de experiencia y minijuegos educativos.'
                }
              ].map((obj, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7EB] border-2 border-[#215332] rounded-2xl p-4 sm:p-6 shadow-geometric flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#215332] text-[#F5F0D6] font-serif-display text-base sm:text-xl font-bold flex items-center justify-center shrink-0">
                    {obj.num}
                  </div>
                  <div>
                    <h4 className="font-serif-body font-bold text-sm sm:text-base text-[#215332] mb-1">
                      {obj.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4F6354] leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08: PLANES A FUTURO */}
      <section id="futuro" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF7EB] border-y-2 border-[#215332]">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#89986D]">Escalabilidad & Proyección</span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#215332]">
              Planes a Futuro
            </h2>
            <p className="text-xs sm:text-sm text-[#4F6354]">
              Líneas de expansión contempladas para la versión 2.0 y el campus universitario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-5 sm:p-6 shadow-geometric flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] block mb-1.5">Expansión de Fauna</span>
                <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332] mb-2">Nuevos Personajes</h3>
                <p className="font-serif-body text-xs text-[#3B4D40] leading-relaxed mb-3">
                  Inclusión de nuevas especies vulnerables de la biodiversidad colombiana con evoluciones y diálogos contextuales.
                </p>
                <div className="bg-white rounded-2xl p-2 border-2 border-[#D8D2BA] overflow-hidden flex items-center justify-center">
                  <img
                    src="/presentation/future_characters.png"
                    alt="Nuevos Personajes EcoPet"
                    className="w-full max-h-52 sm:max-h-60 object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#F5F0D6] border-4 border-[#215332] rounded-3xl p-5 sm:p-6 shadow-geometric flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#89986D] block mb-1.5">Georreferenciación</span>
                <h3 className="font-serif-display text-xl sm:text-2xl text-[#215332] mb-2">Mapa del Campus UNMG</h3>
                <p className="font-serif-body text-xs text-[#3B4D40] leading-relaxed mb-3">
                  Mapeo interactivo de canecas y puntos ecológicos en la Universidad Militar Nueva Granada.
                </p>
                <div className="bg-white rounded-2xl p-2 border-2 border-[#D8D2BA] overflow-hidden flex items-center justify-center">
                  <img
                    src="/presentation/future_map_umng.png"
                    alt="Mapa del Campus UNMG"
                    className="w-full max-h-52 sm:max-h-60 object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09: ZONA DE DESCARGA DIRECTA */}
      <section id="descarga" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-[#FAF7EB] border-4 border-[#215332] rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 shadow-geometric-lg text-center space-y-6 sm:space-y-8 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4D89D] text-[#215332] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Instalable Oficial Android
          </div>

          <h2 className="font-serif-display text-3xl sm:text-6xl text-[#215332] leading-tight">
            Descarga EcoPet en tu Dispositivo
          </h2>

          <p className="font-serif-body text-sm sm:text-lg text-[#3B4D40] max-w-2xl mx-auto leading-relaxed">
            Instala el paquete APK original directamente en tu teléfono Android y disfruta de la experiencia
            completa con visión artificial offline.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/EcoPet_Instalable.apk"
              download="EcoPet_Instalable.apk"
              onClick={triggerDownloadConfetti}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#215332] hover:bg-[#153822] text-[#F5F0D6] font-medium text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-geometric hover:shadow-geometric-lg transition-all active:scale-98"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4D89D]" />
              <span>Descargar EcoPet_Instalable.apk</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#89986D] font-semibold">
            <span>📦 Archivo: EcoPet_Instalable.apk</span>
            <span>•</span>
            <span>⚖️ 22.9 MB</span>
            <span>•</span>
            <span>📱 Android 8.0+</span>
            <span>•</span>
            <span>🔒 Firma Debug</span>
          </div>

          {/* Guide Steps */}
          <div className="pt-5 border-t-2 border-[#D8D2BA] text-left">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#215332] block mb-3 text-center">
              Instalación Rápida en 3 Pasos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#F5F0D6] p-3.5 rounded-2xl border border-[#D8D2BA]">
                <strong className="block font-serif-body text-xs sm:text-sm font-bold text-[#215332] mb-1">
                  1. Descargar APK
                </strong>
                <span className="text-[#4F6354]">Haz clic en el botón para bajar el archivo a tu teléfono.</span>
              </div>
              <div className="bg-[#F5F0D6] p-3.5 rounded-2xl border border-[#D8D2BA]">
                <strong className="block font-serif-body text-xs sm:text-sm font-bold text-[#215332] mb-1">
                  2. Permitir Instalación
                </strong>
                <span className="text-[#4F6354]">Selecciona "Permitir descargas e instalaciones de esta fuente".</span>
              </div>
              <div className="bg-[#F5F0D6] p-3.5 rounded-2xl border border-[#D8D2BA]">
                <strong className="block font-serif-body text-xs sm:text-sm font-bold text-[#215332] mb-1">
                  3. Abrir y Jugar
                </strong>
                <span className="text-[#4F6354]">Abre la app, concédele permiso de cámara y eclosiona tu huevo.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#215332] text-[#F5F0D6] pt-12 sm:pt-16 pb-12 px-4 sm:px-6 border-t-4 border-[#153822]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF7EB] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#215332]" />
                </div>
                <span className="font-serif-display text-2xl font-bold tracking-tight text-white">
                  ECOPET
                </span>
              </div>
              <p className="text-xs text-[#C4D89D] leading-relaxed max-w-sm">
                Proyecto de investigación aplicada en visión artificial, gamificación móvil y educación ambiental.
                Alineado con el ODS 11 (Ciudades y Comunidades Sostenibles).
              </p>
            </div>

            <div className="md:col-span-4 space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C4D89D] block">
                Equipo de Desarrollo
              </span>
              <ul className="text-xs space-y-1 text-white font-serif-body">
                <li>• Daniel Bossa</li>
                <li>• Marian Viasus</li>
                <li>• Sara Orjuela</li>
              </ul>
              <span className="text-[11px] text-[#C4D89D] block pt-1.5">
                Universidad Militar Nueva Granada (UMNG)
              </span>
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C4D89D] block">
                Código & Recursos
              </span>
              <ul className="text-xs space-y-2">
                <li>
                  <a
                    href="https://github.com/JuanPNietoC/webecopet"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#C4D89D] transition-colors"
                  >
                    <span>Repositorio GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="/EcoPet_Instalable.apk"
                    download
                    className="inline-flex items-center gap-1.5 text-white hover:text-[#C4D89D] transition-colors"
                  >
                    <span>Descargar APK (v1.0)</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#153822] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[#C4D89D] text-center sm:text-left">
            <span>© {new Date().getFullYear()} EcoPet Project. Todos los derechos reservados.</span>
            <span>Universidad Militar Nueva Granada</span>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Bar for Mobile Devices */}
      <div className="fixed bottom-3 inset-x-3 z-40 md:hidden">
        <div className="bg-[#215332]/95 backdrop-blur-md text-[#F5F0D6] p-2.5 rounded-2xl border-2 border-[#C4D89D] shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 pl-1.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#FAF7EB] flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-[#215332]" />
            </div>
            <div className="truncate">
              <span className="font-serif-display font-bold text-sm block leading-none text-white truncate">
                EcoPet APK
              </span>
              <span className="text-[10px] text-[#C4D89D] font-medium leading-none">
                22.9 MB • v1.0
              </span>
            </div>
          </div>

          <a
            href="/EcoPet_Instalable.apk"
            download="EcoPet_Instalable.apk"
            onClick={triggerDownloadConfetti}
            className="inline-flex items-center gap-1.5 bg-[#C4D89D] hover:bg-[#b0c290] text-[#215332] font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 shadow-sm transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Instalar</span>
          </a>
        </div>
      </div>
    </div>
  );
}
