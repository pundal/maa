import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, Sparkles, Volume2, VolumeX, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { VirtualDiya } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ThreeMandapCanvasProps {
  diyas: VirtualDiya[];
  onLightDiyaClick: () => void;
  isAdminLoggedIn: boolean;
}

export const ThreeMandapCanvas: React.FC<ThreeMandapCanvasProps> = ({
  diyas,
  onLightDiyaClick,
  isAdminLoggedIn,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    try {
      const initWidth = container.clientWidth || 800;
      const initHeight = container.clientHeight || 520;

      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2('#1a0505', 0.035);

      const camera = new THREE.PerspectiveCamera(
        55,
        initWidth / (initHeight || 1),
        0.1,
        100
      );
      camera.position.set(0, 3.2, 8.5);
      camera.lookAt(0, 2.0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(initWidth, initHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clear existing children
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight('#ffe0b2', 0.6);
    scene.add(ambientLight);

    // Warm golden spotlight on Durga Idol throne
    const mainSpotlight = new THREE.SpotLight('#ffd700', 3.5);
    mainSpotlight.position.set(0, 10, 5);
    mainSpotlight.angle = Math.PI / 4;
    mainSpotlight.penumbra = 0.8;
    mainSpotlight.castShadow = true;
    scene.add(mainSpotlight);

    // Deep crimson background fill light
    const redFill = new THREE.PointLight('#ff3300', 2.0, 12);
    redFill.position.set(0, 1, -2);
    scene.add(redFill);

    // 1. MANDAP STRUCTURE / ALTAR
    const mandapGroup = new THREE.Group();

    // Main Stage Base (Tiered Altar Platform)
    const baseGeo1 = new THREE.CylinderGeometry(4.5, 5.0, 0.4, 32);
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#3d0c0c',
      roughness: 0.4,
      metalness: 0.6,
    });
    const baseMesh1 = new THREE.Mesh(baseGeo1, goldMat);
    baseMesh1.position.y = 0.2;
    baseMesh1.receiveShadow = true;
    mandapGroup.add(baseMesh1);

    const baseGeo2 = new THREE.CylinderGeometry(3.6, 4.0, 0.4, 32);
    const innerAltarMat = new THREE.MeshStandardMaterial({
      color: '#5c1313',
      roughness: 0.3,
      metalness: 0.7,
    });
    const baseMesh2 = new THREE.Mesh(baseGeo2, innerAltarMat);
    baseMesh2.position.y = 0.6;
    baseMesh2.receiveShadow = true;
    mandapGroup.add(baseMesh2);

    // Pillars (Traditional Carved Mandap Pillars)
    const pillarGeo = new THREE.CylinderGeometry(0.2, 0.25, 4.5, 16);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: '#d4af37',
      metalness: 0.8,
      roughness: 0.3,
    });

    const pillarPositions = [
      [-2.8, 2.65, 1.8],
      [2.8, 2.65, 1.8],
      [-2.8, 2.65, -1.8],
      [2.8, 2.65, -1.8],
    ];

    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      mandapGroup.add(pillar);

      // Pillar base cap
      const capGeo = new THREE.BoxGeometry(0.6, 0.2, 0.6);
      const cap = new THREE.Mesh(capGeo, pillarMat);
      cap.position.set(x, y + 2.2, z);
      mandapGroup.add(cap);
    });

    // Arch Roof Top (Traditional Temple Dome Arch)
    const domeGeo = new THREE.ConeGeometry(3.8, 1.8, 32);
    const domeMat = new THREE.MeshStandardMaterial({
      color: '#7a1818',
      metalness: 0.5,
      roughness: 0.4,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 5.7, 0);
    mandapGroup.add(dome);

    // Glowing Golden Trishul / Kalash Ornament on top
    const kalashGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const kalashMat = new THREE.MeshStandardMaterial({
      color: '#ffd700',
      emissive: '#ffaa00',
      emissiveIntensity: 0.5,
      metalness: 0.9,
    });
    const kalash = new THREE.Mesh(kalashGeo, kalashMat);
    kalash.position.set(0, 6.7, 0);
    mandapGroup.add(kalash);

    // Back Altar Backdrop Shield (Prabhabali Ring)
    const ringGeo = new THREE.TorusGeometry(2.2, 0.12, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#ffd700',
      emissive: '#ff9900',
      emissiveIntensity: 0.4,
      metalness: 0.8,
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.position.set(0, 3.2, -1.2);
    mandapGroup.add(haloRing);

    scene.add(mandapGroup);

    // 2. DYNAMIC DIYAS (3D LIGHT LAMPS)
    const diyaFlames: { light: THREE.PointLight; mesh: THREE.Mesh; basePosY: number }[] = [];

    // Function to add a Diya in 3D
    const addDiyaToScene = (angleInRad: number, radius: number, isUserDiya = false) => {
      const diyaGroup = new THREE.Group();
      const x = Math.cos(angleInRad) * radius;
      const z = Math.sin(angleInRad) * radius;
      const y = 0.8;

      // Clay Diya Pot
      const potGeo = new THREE.CylinderGeometry(0.2, 0.08, 0.12, 16);
      const potMat = new THREE.MeshStandardMaterial({ color: '#b35900', roughness: 0.8 });
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.castShadow = true;
      diyaGroup.add(pot);

      // Flame Mesh (Glowing Cone)
      const flameGeo = new THREE.ConeGeometry(0.08, 0.22, 12);
      const flameMat = new THREE.MeshBasicMaterial({
        color: isUserDiya ? '#ff3300' : '#ffcc00',
      });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.16;
      diyaGroup.add(flame);

      // Dynamic Flame Light
      const flameLight = new THREE.PointLight(isUserDiya ? '#ff4500' : '#ffaa00', 1.8, 3.5);
      flameLight.position.y = 0.22;
      diyaGroup.add(flameLight);

      diyaGroup.position.set(x, y, z);
      scene.add(diyaGroup);

      diyaFlames.push({ light: flameLight, mesh: flame, basePosY: y + 0.16 });
    };

    // Render initial ring of 12 sacred diyas around the altar
    const diyaCount = Math.max(12, diyas.length);
    for (let i = 0; i < diyaCount; i++) {
      const angle = (i / diyaCount) * Math.PI * 2;
      const radius = 3.2;
      addDiyaToScene(angle, radius, i >= 12);
    }

    // 3. FLOATING GOLDEN PARTICLES (MARIGOLD & SPARKS)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: '#ffd700',
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ANIMATION LOOP & MOUSE INTERACTION
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle camera sway following mouse
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (3.2 + mouseY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 2.2, 0);

      // Rotate central halo ring slowly
      haloRing.rotation.z = elapsedTime * 0.2;

      // Diya flame flickering effect
      diyaFlames.forEach((item, index) => {
        const flicker = Math.sin(elapsedTime * 8 + index) * 0.2 + Math.cos(elapsedTime * 15 + index) * 0.1;
        item.light.intensity = 1.6 + flicker;
        item.mesh.scale.set(1 + flicker * 0.3, 1 + flicker * 0.5, 1 + flicker * 0.3);
      });

      // Floating particles motion
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let py = posAttr.getY(i);
        py -= 0.008;
        if (py < 0) py = 8;
        posAttr.setY(i, py);

        let px = posAttr.getX(i);
        px += Math.sin(elapsedTime + i) * 0.003;
        posAttr.setX(i, px);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 520;
      camera.aspect = width / (height || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);
  } catch (err) {
    console.warn('Three.js Mandap Canvas initialization deferred or unsupported:', err);
  }

  return () => {
    if (handleMouseMove) {
      window.removeEventListener('mousemove', handleMouseMove);
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (renderer) {
      if (renderer.domElement && container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    }
  };
}, [diyas.length]);

  // Festive Web Audio sound generator (Dhaki drum beat & Shankha sound effect synthesized natively!)
  const toggleFestiveAudio = () => {
    if (isAudioPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsAudioPlaying(false);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Synthesize traditional Dhak rhythmic beats (dha-dhin-dha)
      let beatStep = 0;
      const interval = setInterval(() => {
        if (!audioContextRef.current || ctx.state === 'closed') {
          clearInterval(interval);
          return;
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (beatStep % 4 === 0) {
          // Low deep Dhak bass strike
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        } else {
          // Snare / Kasori chime beat
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);

        beatStep = (beatStep + 1) % 16;
      }, 250);

      setIsAudioPlaying(true);
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden crimson-gradient gold-border gold-glow">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1a0505] via-transparent to-[#1a0505]/60" />
      </div>

      {/* Floating Virtual Diyas Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {diyas.slice(-12).map((diya, idx) => {
          const leftPos = 10 + ((idx * 23) % 80);
          const topPos = 40 + ((idx * 17) % 40);
          return (
            <div
              key={diya.id || idx}
              style={{ left: `${leftPos}%`, top: `${topPos}%` }}
              className="absolute flex flex-col items-center animate-pulse"
            >
              <div className="relative">
                <Flame className="w-6 h-6 text-amber-400 fill-amber-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.9)] animate-bounce" />
                <Sparkles className="w-3 h-3 text-yellow-200 absolute -top-1 -right-1" />
              </div>
              <span className="text-[10px] font-bold text-[#ffd700] bg-[#1a0505]/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#d4af37]/40 shadow-md">
                {diya.devoteeName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Top Header Badge & Audio Controls */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-20">
        {/* Left Badge: Interactive 3D Mandap Canvas */}
        <div className="flex items-center gap-2 bg-[#1a0505]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full gold-border">
          <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-[#ffd700] tracking-wide">
            {t.canvasBadge}
          </span>
          <span className="flex h-2 w-2 relative ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        {/* Right Controls Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dhak Beats Audio Toggle */}
          <button
            onClick={toggleFestiveAudio}
            className="flex items-center gap-1.5 bg-[#2a0808]/90 hover:bg-[#3d0c0c] text-[#ffd700] border border-[#d4af37]/50 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>{t.dhakBeatsOn}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>{t.playDhakBeats}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Floating Action Callout */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a0505]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl gold-border z-20">
        <div>
          <h2 className="text-xl md:text-2xl font-serif-cinzel font-bold gold-gradient-text flex items-center gap-2">
            <span>{t.mandapHeader}</span>
          </h2>
          <p className="text-xs md:text-sm text-[#d4af37]/90 mt-0.5">
            {t.mandapSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {isAdminLoggedIn ? (
            <button
              onClick={onLightDiyaClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa820a] hover:brightness-110 text-[#1a0505] px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <Flame className="w-5 h-5 fill-current text-[#b30000]" />
              <span>{t.lightDiyaBtn}</span>
              <span className="text-[10px] bg-[#1a0505]/80 text-[#ffd700] px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">
                Admin
              </span>
            </button>
          ) : (
            <button
              onClick={onLightDiyaClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2a0808]/90 hover:bg-[#3d0c0c] text-[#ffd700] border border-[#d4af37]/60 hover:border-[#ffd700] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span>{t.adminLoginToLightDiya}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
