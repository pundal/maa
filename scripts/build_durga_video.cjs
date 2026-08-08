const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const framesDir = path.join(__dirname, '../tmp_frames');
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating 4-scene Cinematic Maa Durga Video Frames (12 sec)...');

const totalFrames = 360; // 12 seconds at 30 fps
const width = 1280;
const height = 720;

for (let i = 0; i < totalFrames; i++) {
  const t = i / totalFrames; // 0.0 to 1.0 overall
  const frameTime = i / 30; // seconds
  const angle = t * Math.PI * 4;

  // Determine current scene (4 scenes, 3s each)
  // Scene 1: 0 - 3s (Frames 0-89)  -> Heavenly Clouds & Falling Rose Petals
  // Scene 2: 3 - 6s (Frames 90-179) -> Ocean Waves & Lightning Storm
  // Scene 3: 6 - 9s (Frames 180-269) -> Close-Up Divine 10-Armed Portrait
  // Scene 4: 9 - 12s (Frames 270-359) -> Grand Temple Mandap Altar with Devotees & Lotuses
  
  const sceneIndex = Math.floor(i / 90); // 0, 1, 2, or 3
  const sceneProgress = (i % 90) / 90; // 0.0 to 1.0 within scene

  // Cross-fade opacity helper
  let sceneSvg = '';

  // Helper for falling petals
  const generatePetals = (count, speedMult) => {
    let petals = '';
    for (let p = 0; p < count; p++) {
      const px = (p * 41 + i * 4 * speedMult + Math.sin(angle + p) * 35) % width;
      const py = ((p * 23 + i * 6 * speedMult) % (height + 100)) - 50;
      const size = 11 + (p % 7) * 2.5;
      const rot = (i * 3 + p * 40) % 360;
      const opacity = 0.55 + Math.sin(angle + p) * 0.35;
      petals += `<path d="M 0,-${size} C ${size/1.3},-${size/2} ${size/1.3},${size/2} 0,${size} C -${size/1.3},${size/2} -${size/1.3},-${size/2} 0,-${size}" 
        fill="url(#petalGrad)" transform="translate(${px.toFixed(1)}, ${py.toFixed(1)}) rotate(${rot.toFixed(1)})" opacity="${opacity.toFixed(2)}" />`;
    }
    return petals;
  };

  if (sceneIndex === 0) {
    // SCENE 1: HEAVENLY CLOUDS & LION RIDING THROUGH SKY
    const lionX = width * 0.5 + Math.sin(sceneProgress * Math.PI * 2) * 25;
    const lionY = height * 0.42 + Math.cos(sceneProgress * Math.PI * 2) * 10;
    const auraPulse = 1 + Math.sin(sceneProgress * Math.PI * 4) * 0.08;

    sceneSvg = `
      <!-- Sky & Gold Clouds Background -->
      <rect width="${width}" height="${height}" fill="url(#heavenGrad)" />
      
      <!-- Sunburst Halo -->
      <circle cx="${width/2}" cy="${height*0.35}" r="480" fill="url(#sunburst)" opacity="0.8" />

      <!-- Cloud Formations -->
      <path d="M -100 500 Q 200 350 500 480 T 1100 450 T 1400 600 L 1400 720 L -100 720 Z" fill="#2a1212" opacity="0.85" />
      <path d="M -50 550 Q 300 420 700 530 T 1300 500 L 1300 720 L -50 720 Z" fill="#4a1a1a" opacity="0.6" />

      <!-- Maa Durga on Lion in Heavenly Sky -->
      <g transform="translate(${lionX.toFixed(1)}, ${lionY.toFixed(1)})">
        <!-- Aura Circle -->
        <g transform="scale(${auraPulse.toFixed(2)})">
          <circle cx="0" cy="-30" r="160" fill="url(#auraGrad)"/>
          <circle cx="0" cy="-30" r="125" fill="none" stroke="#ffd700" stroke-width="5" stroke-dasharray="12,8"/>
        </g>

        <!-- Mukut Crown -->
        <path d="M -38,-120 L -20,-170 L 0,-200 L 20,-170 L 38,-120 Z" fill="#ffd700" stroke="#ffffff" stroke-width="3"/>
        <circle cx="0" cy="-203" r="8" fill="#e60000"/>

        <!-- Face & Features -->
        <ellipse cx="0" cy="-90" rx="36" ry="42" fill="#ffdfb3"/>
        <circle cx="0" cy="-105" r="6" fill="#cc0000"/>
        <path d="M -12,-76 Q 0,-65 12,-76" stroke="#b30000" stroke-width="3.5" fill="none"/>

        <!-- Multiple Arms Holding Weapons -->
        <!-- Right Arms -->
        <line x1="20" y1="-50" x2="100" y2="-120" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <line x1="20" y1="-40" x2="110" y2="-70" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <line x1="20" y1="-30" x2="105" y2="-20" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <!-- Trishul -->
        <g transform="translate(100, -120)">
          <line x1="0" y1="-60" x2="0" y2="150" stroke="#ffd700" stroke-width="6"/>
          <path d="M -25,-60 L 0,-100 L 25,-60 L 12,-60 L 12,-20 L -12,-20 L -12,-60 Z" fill="#ffd700"/>
        </g>
        <!-- Sword -->
        <line x1="110" y1="-70" x2="160" y2="-110" stroke="#e6e6e6" stroke-width="5"/>

        <!-- Left Arms -->
        <line x1="-20" y1="-50" x2="-100" y2="-120" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <line x1="-20" y1="-40" x2="-110" y2="-70" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <line x1="-20" y1="-30" x2="-105" y2="-20" stroke="#ffdfb3" stroke-width="10" stroke-linecap="round"/>
        <!-- Shankha (Conch) -->
        <ellipse cx="-105" cy="-120" rx="14" ry="20" fill="#ffffff" stroke="#ffd700" stroke-width="2"/>

        <!-- Saree Drapery -->
        <path d="M -60,-45 C -40,-70 40,-70 60,-45 L 70,85 C 25,110 -25,110 -70,85 Z" fill="#cc0022" stroke="#ffd700" stroke-width="4"/>

        <!-- Golden Lion Mount -->
        <g transform="translate(-10, 90) scale(1.2)">
          <ellipse cx="0" cy="10" rx="100" ry="50" fill="#d48817"/>
          <circle cx="-68" cy="-14" r="50" fill="#8c4b00"/>
          <ellipse cx="-78" cy="-20" rx="34" ry="28" fill="#e69c24"/>
          <circle cx="-88" cy="-24" r="5" fill="#000000"/>
          <rect x="-80" y="34" width="20" height="50" rx="9" fill="#d48817"/>
          <rect x="-35" y="34" width="20" height="50" rx="9" fill="#d48817"/>
          <rect x="35" y="34" width="20" height="50" rx="9" fill="#d48817"/>
          <rect x="70" y="34" width="20" height="50" rx="9" fill="#d48817"/>
        </g>
      </g>

      <!-- Falling Rose Petals in Sky -->
      ${generatePetals(45, 1.2)}
    `;
  } else if (sceneIndex === 1) {
    // SCENE 2: OCEAN WAVES & LIGHTNING STORM
    const waveOffset1 = Math.sin(sceneProgress * Math.PI * 4) * 20;
    const waveOffset2 = Math.cos(sceneProgress * Math.PI * 4) * 25;
    
    // Lightning stroke trigger
    const isLightning = (i % 20 < 4);
    const lightningOpacity = isLightning ? 0.8 : 0.05;

    const wavePath1 = `M 0 480 Q ${width*0.25} ${450 + waveOffset1} ${width*0.5} 480 T ${width} 480 L ${width} ${height} L 0 ${height} Z`;
    const wavePath2 = `M 0 520 Q ${width*0.25} ${550 + waveOffset2} ${width*0.5} 520 T ${width} 520 L ${width} ${height} L 0 ${height} Z`;

    sceneSvg = `
      <!-- Dark Stormy Sky -->
      <rect width="${width}" height="${height}" fill="url(#stormSkyGrad)" />

      <!-- Lightning Flash Effect -->
      <rect width="${width}" height="${height}" fill="#ffffff" opacity="${lightningOpacity.toFixed(2)}" />
      ${isLightning ? `
        <path d="M 300 0 L 280 180 L 340 220 L 260 420" stroke="#ffffff" stroke-width="6" fill="none" filter="drop-shadow(0 0 15px #70a1ff)"/>
        <path d="M 950 0 L 980 150 L 920 200 L 1000 380" stroke="#ffffff" stroke-width="6" fill="none" filter="drop-shadow(0 0 15px #70a1ff)"/>
      ` : ''}

      <!-- Maa Durga Riding Lion Through Ocean -->
      <g transform="translate(${width/2}, ${height*0.38 + Math.sin(sceneProgress * Math.PI * 4) * 12})">
        <circle cx="0" cy="-30" r="140" fill="url(#auraGrad)"/>
        <circle cx="0" cy="-30" r="110" fill="none" stroke="#ffd700" stroke-width="4" stroke-dasharray="10,6"/>

        <path d="M -35,-115 L -18,-160 L 0,-185 L 18,-160 L 35,-115 Z" fill="#ffd700" stroke="#ffffff" stroke-width="2.5"/>
        <ellipse cx="0" cy="-88" rx="34" ry="40" fill="#ffdfb3"/>
        <circle cx="0" cy="-102" r="5.5" fill="#cc0000"/>

        <!-- Saree & 10 Arms -->
        <path d="M -55,-42 C -35,-65 35,-65 55,-42 L 65,85 C 22,105 -22,105 -65,85 Z" fill="#cc0022" stroke="#ffd700" stroke-width="3.5"/>
        <g transform="translate(70, -85)">
          <line x1="0" y1="-85" x2="0" y2="130" stroke="#ffd700" stroke-width="6"/>
          <path d="M -28,-85 L 0,-130 L 28,-85 L 14,-85 L 14,-42 L -14,-42 L -14,-85 Z" fill="#ffd700"/>
        </g>

        <!-- Lion Mount in Water -->
        <g transform="translate(-10, 85) scale(1.15)">
          <ellipse cx="0" cy="10" rx="95" ry="48" fill="#d48817"/>
          <circle cx="-65" cy="-12" r="48" fill="#8c4b00"/>
          <ellipse cx="-75" cy="-18" rx="32" ry="26" fill="#e69c24"/>
          <rect x="-75" y="32" width="19" height="48" rx="9" fill="#d48817"/>
          <rect x="65" y="32" width="19" height="48" rx="9" fill="#d48817"/>
        </g>
      </g>

      <!-- Foaming Ocean Waves Layer -->
      <path d="${wavePath1}" fill="url(#oceanGrad)" />
      <path d="${wavePath2}" fill="#0d324d" opacity="0.8" />
      <path d="M 0 540 Q 320 520 640 550 T 1280 530 L 1280 720 L 0 720 Z" fill="#ffffff" opacity="0.25" />

      ${generatePetals(30, 1.8)}
    `;
  } else if (sceneIndex === 2) {
    // SCENE 3: CLOSE-UP DIVINE 10-ARMED PORTRAIT
    const zoomScale = 1.35 + Math.sin(sceneProgress * Math.PI) * 0.1;
    
    sceneSvg = `
      <!-- Deep Golden Radiant Night Sky -->
      <rect width="${width}" height="${height}" fill="url(#portraitSkyGrad)" />
      
      <!-- Full Moon & Radiating Aura -->
      <circle cx="${width/2}" cy="${height*0.28}" r="220" fill="url(#moonAuraGrad)" />
      <circle cx="${width/2}" cy="${height*0.28}" r="90" fill="#fffae6" filter="drop-shadow(0 0 35px #ffd700)" />

      <!-- Divine Close-up Maa Durga Portrait -->
      <g transform="translate(${width/2}, ${height*0.48}) scale(${zoomScale.toFixed(2)})">
        <!-- Radiating Golden Halo -->
        <circle cx="0" cy="-60" r="160" fill="url(#auraGrad)"/>
        <circle cx="0" cy="-60" r="130" fill="none" stroke="#ffd700" stroke-width="6" stroke-dasharray="12,8"/>

        <!-- Ornate Golden Crown (Mukut) -->
        <path d="M -45,-150 L -22,-210 L 0,-245 L 22,-210 L 45,-150 Z" fill="#ffd700" stroke="#ffffff" stroke-width="3"/>
        <circle cx="0" cy="-250" r="10" fill="#e60000"/>
        <circle cx="-22" cy="-210" r="6" fill="#ffffff"/>
        <circle cx="22" cy="-210" r="6" fill="#ffffff"/>

        <!-- Radiant Divine Face -->
        <ellipse cx="0" cy="-110" rx="46" ry="54" fill="#ffdfb3"/>
        <!-- Eyes -->
        <ellipse cx="-16" cy="-116" rx="10" ry="6" fill="#ffffff"/>
        <ellipse cx="16" cy="-116" rx="10" ry="6" fill="#ffffff"/>
        <circle cx="-16" cy="-116" r="5" fill="#1a0a00"/>
        <circle cx="16" cy="-116" r="5" fill="#1a0a00"/>
        <!-- Third Eye (Trinetra) & Bindi -->
        <ellipse cx="0" cy="-135" rx="5" ry="9" fill="#cc0000" stroke="#ffd700" stroke-width="1.5"/>
        <circle cx="0" cy="-124" r="4" fill="#cc0000"/>
        <!-- Golden Nose Ring (Nath) -->
        <circle cx="-18" cy="-102" r="12" fill="none" stroke="#ffd700" stroke-width="2.5"/>
        <!-- Smiling Lips -->
        <path d="M -16,-92 Q 0,-78 16,-92" stroke="#b30000" stroke-width="4" fill="none"/>

        <!-- 10 Arms with Sacred Weapons -->
        <!-- Right Side Arms -->
        <g stroke="#ffdfb3" stroke-width="12" stroke-linecap="round">
          <line x1="25" y1="-70" x2="130" y2="-160"/>
          <line x1="25" y1="-60" x2="145" y2="-110"/>
          <line x1="25" y1="-50" x2="140" y2="-50"/>
          <line x1="25" y1="-40" x2="125" y2="10"/>
          <line x1="25" y1="-30" x2="100" y2="60"/>
        </g>

        <!-- Left Side Arms -->
        <g stroke="#ffdfb3" stroke-width="12" stroke-linecap="round">
          <line x1="-25" y1="-70" x2="-130" y2="-160"/>
          <line x1="-25" y1="-60" x2="-145" y2="-110"/>
          <line x1="-25" y1="-50" x2="-140" y2="-50"/>
          <line x1="-25" y1="-40" x2="-125" y2="10"/>
          <line x1="-25" y1="-30" x2="-100" y2="60"/>
        </g>

        <!-- Sacred Weapon Icons on Hand Ends -->
        <!-- Trishul Trident -->
        <g transform="translate(130, -160)">
          <line x1="0" y1="-50" x2="0" y2="100" stroke="#ffd700" stroke-width="6"/>
          <path d="M -22,-50 L 0,-85 L 22,-50 L 10,-50 L 10,-20 L -10,-20 L -10,-50 Z" fill="#ffd700"/>
        </g>
        <!-- Lotus Flower in Hand -->
        <g transform="translate(-130, -160)">
          <path d="M 0,-25 C 15,-12 15,12 0,25 C -15,12 -15,-12 0,-25" fill="#ff66b2"/>
          <path d="M -18,-12 C -6,-6 0,18 -18,14 Z" fill="#ff1a75"/>
          <path d="M 18,-12 C 6,-6 0,18 18,14 Z" fill="#ff1a75"/>
        </g>
        <!-- Sudarshan Chakra -->
        <circle cx="145" cy="-110" r="18" fill="none" stroke="#ffd700" stroke-width="4" stroke-dasharray="6,4"/>
        <!-- Shankha Conch -->
        <ellipse cx="-145" cy="-110" rx="14" ry="20" fill="#ffffff" stroke="#ffd700" stroke-width="2"/>
        <!-- Gada Mace -->
        <line x1="140" y1="-50" x2="190" y2="-50" stroke="#ffd700" stroke-width="8"/>
        <circle cx="190" cy="-50" r="14" fill="#ffd700"/>

        <!-- Heavy Gold Necklaces & Silk Saree -->
        <path d="M -30,-60 Q 0,-30 30,-60 Q 0,-10 -30,-60" fill="#ffd700" stroke="#ffffff" stroke-width="2"/>
        <path d="M -40,-45 Q 0,-10 40,-45 Q 0,20 -40,-45" fill="#ffd700" stroke="#b38600" stroke-width="2"/>
        <path d="M -60,-30 C -40,-50 40,-50 60,-30 L 75,100 C 30,120 -30,120 -75,100 Z" fill="#cc0022" stroke="#ffd700" stroke-width="4"/>
      </g>

      ${generatePetals(50, 1.0)}
    `;
  } else {
    // SCENE 4: GRAND TEMPLE MANDAP ALTAR WITH DEVOTEES & LOTUSES
    const bellSwing = Math.sin(sceneProgress * Math.PI * 4) * 18;
    
    // Devotee hands moving in prayer
    const prayerMove = Math.sin(sceneProgress * Math.PI * 4) * 6;

    // Floating lotuses on water
    let lotusList = '';
    for (let l = 0; l < 11; l++) {
      const lx = 60 + l * 115 + Math.sin(angle + l) * 10;
      const ly = 540 + Math.cos(angle + l) * 8;
      lotusList += `<g transform="translate(${lx.toFixed(1)}, ${ly.toFixed(1)}) scale(0.8)">
        <path d="M 0,-24 C 14,-12 14,12 0,24 C -14,12 -14,-12 0,-24" fill="#ff66b2" />
        <path d="M -18,-14 C -8,-7 0,18 -18,14 Z" fill="#ff1a75" />
        <path d="M 18,-14 C 8,-7 0,18 18,14 Z" fill="#ff1a75" />
        <circle cx="0" cy="4" r="5" fill="#ffd700" />
      </g>`;
    }

    sceneSvg = `
      <!-- Twilight Sky & Full Moon -->
      <rect width="${width}" height="${height}" fill="url(#mandapSkyGrad)" />
      <circle cx="${width/2}" cy="180" r="300" fill="url(#sunburst)" opacity="0.8" />

      <!-- Coastal Temple Gopurams in Background -->
      <g fill="#2a0d0d" opacity="0.9">
        <path d="M 80 380 L 120 220 L 160 380 Z" />
        <path d="M 90 220 L 120 180 L 150 220 Z" />
        <path d="M ${width-160} 380 L ${width-120} 220 L ${width-80} 380 Z" />
        <path d="M ${width-150} 220 L ${width-120} 180 L ${width-90} 220 Z" />
      </g>

      <!-- Swinging Temple Bells in Top Sky -->
      <g transform="translate(140, 0) rotate(${bellSwing.toFixed(1)})">
        <line x1="0" y1="0" x2="0" y2="110" stroke="#ffd700" stroke-width="4"/>
        <path d="M -25,110 Q 0,90 25,110 L 30,145 C 30,158 -30,158 -30,145 Z" fill="#ffd700" stroke="#997300" stroke-width="2"/>
        <circle cx="0" cy="152" r="6" fill="#e60000"/>
      </g>
      <g transform="translate(280, 0) rotate(${(-bellSwing).toFixed(1)})">
        <line x1="0" y1="0" x2="0" y2="80" stroke="#ffd700" stroke-width="3"/>
        <path d="M -18,80 Q 0,65 18,80 L 22,110 C 22,120 -22,120 -22,110 Z" fill="#ffd700" stroke="#997300" stroke-width="2"/>
      </g>
      <g transform="translate(${width - 140}, 0) rotate(${(-bellSwing).toFixed(1)})">
        <line x1="0" y1="0" x2="0" y2="110" stroke="#ffd700" stroke-width="4"/>
        <path d="M -25,110 Q 0,90 25,110 L 30,145 C 30,158 -30,158 -30,145 Z" fill="#ffd700" stroke="#997300" stroke-width="2"/>
        <circle cx="0" cy="152" r="6" fill="#e60000"/>
      </g>
      <g transform="translate(${width - 280}, 0) rotate(${bellSwing.toFixed(1)})">
        <line x1="0" y1="0" x2="0" y2="80" stroke="#ffd700" stroke-width="3"/>
        <path d="M -18,80 Q 0,65 18,80 L 22,110 C 22,120 -22,120 -22,110 Z" fill="#ffd700" stroke="#997300" stroke-width="2"/>
      </g>

      <!-- Center Divine Maa Durga Standing on Lotus Altar -->
      <g transform="translate(${width/2}, 300)">
        <!-- Radiant Halo -->
        <circle cx="0" cy="-30" r="150" fill="url(#auraGrad)"/>
        <circle cx="0" cy="-30" r="120" fill="none" stroke="#ffd700" stroke-width="5" stroke-dasharray="10,6"/>

        <path d="M -35,-115 L -18,-160 L 0,-185 L 18,-160 L 35,-115 Z" fill="#ffd700" stroke="#ffffff" stroke-width="2.5"/>
        <ellipse cx="0" cy="-88" rx="34" ry="40" fill="#ffdfb3"/>
        <circle cx="0" cy="-102" r="5.5" fill="#cc0000"/>

        <!-- Trishul & Saree -->
        <path d="M -55,-42 C -35,-65 35,-65 55,-42 L 65,110 C 22,130 -22,130 -65,110 Z" fill="#cc0022" stroke="#ffd700" stroke-width="3.5"/>
        <g transform="translate(70, -85)">
          <line x1="0" y1="-85" x2="0" y2="160" stroke="#ffd700" stroke-width="6"/>
          <path d="M -28,-85 L 0,-130 L 28,-85 L 14,-85 L 14,-42 L -14,-42 L -14,-85 Z" fill="#ffd700"/>
        </g>
      </g>

      <!-- Ocean Water & Beach Shore -->
      <path d="M 0 490 Q 640 470 1280 490 L 1280 720 L 0 720 Z" fill="url(#oceanGrad)" />
      <path d="M 0 620 Q 640 600 1280 620 L 1280 720 L 0 720 Z" fill="#d4a359" />

      <!-- Floating Lotuses on Ocean Surface -->
      ${lotusList}

      <!-- Devotees Praying on Shore -->
      <g transform="translate(100, 610)">
        <ellipse cx="0" cy="40" rx="20" ry="30" fill="#1a0a05"/>
        <circle cx="0" cy="0" r="12" fill="#ffdfb3"/>
        <path d="M -8,-15 L 0,${(-25 + prayerMove).toFixed(1)} L 8,-15" stroke="#ffd700" stroke-width="4" fill="none"/>
      </g>
      <g transform="translate(220, 620)">
        <ellipse cx="0" cy="40" rx="22" ry="32" fill="#1a0a05"/>
        <circle cx="0" cy="0" r="13" fill="#ffdfb3"/>
        <path d="M -8,-15 L 0,${(-27 + prayerMove).toFixed(1)} L 8,-15" stroke="#ffd700" stroke-width="4" fill="none"/>
      </g>
      <g transform="translate(${width - 220}, 620)">
        <ellipse cx="0" cy="40" rx="22" ry="32" fill="#1a0a05"/>
        <circle cx="0" cy="0" r="13" fill="#ffdfb3"/>
        <path d="M -8,-15 L 0,${(-27 + prayerMove).toFixed(1)} L 8,-15" stroke="#ffd700" stroke-width="4" fill="none"/>
      </g>
      <g transform="translate(${width - 100}, 610)">
        <ellipse cx="0" cy="40" rx="20" ry="30" fill="#1a0a05"/>
        <circle cx="0" cy="0" r="12" fill="#ffdfb3"/>
        <path d="M -8,-15 L 0,${(-25 + prayerMove).toFixed(1)} L 8,-15" stroke="#ffd700" stroke-width="4" fill="none"/>
      </g>

      ${generatePetals(40, 1.1)}
    `;
  }

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="heavenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#120303"/>
        <stop offset="40%" stop-color="#3d0d0d"/>
        <stop offset="75%" stop-color="#240707"/>
        <stop offset="100%" stop-color="#0a0202"/>
      </linearGradient>

      <linearGradient id="stormSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050a12"/>
        <stop offset="50%" stop-color="#142338"/>
        <stop offset="100%" stop-color="#08101a"/>
      </linearGradient>

      <linearGradient id="portraitSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a0000"/>
        <stop offset="50%" stop-color="#4a0d0d"/>
        <stop offset="100%" stop-color="#120000"/>
      </linearGradient>

      <linearGradient id="mandapSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0d040a"/>
        <stop offset="50%" stop-color="#2a0d1f"/>
        <stop offset="100%" stop-color="#0d040a"/>
      </linearGradient>

      <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
        <stop offset="30%" stop-color="#ffd700" stop-opacity="0.85"/>
        <stop offset="65%" stop-color="#ff6600" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#800000" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="sunburst" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
        <stop offset="30%" stop-color="#ffe066" stop-opacity="0.75"/>
        <stop offset="65%" stop-color="#ff4d00" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="moonAuraGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="50%" stop-color="#ffe680" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#ff9900" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#173b52"/>
        <stop offset="100%" stop-color="#071520"/>
      </linearGradient>

      <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffb3d1"/>
        <stop offset="100%" stop-color="#e6005c"/>
      </linearGradient>
    </defs>

    ${sceneSvg}

    <!-- Golden Decorative Frame -->
    <rect x="8" y="8" width="${width-16}" height="${height-16}" fill="none" stroke="#ffd700" stroke-width="3" opacity="0.8"/>
    <rect x="14" y="14" width="${width-28}" height="${height-28}" fill="none" stroke="#ffd700" stroke-width="1" opacity="0.4"/>

    <!-- Sacred Golden Title Overlay -->
    <text x="${width/2}" y="${height - 25}" font-family="Cinzel, Georgia, serif" font-size="26" font-weight="bold" fill="#ffd700" text-anchor="middle" letter-spacing="6">
      ✦ JAI MAA DURGA • 50TH GOLDEN JUBILEE ✦
    </text>
  </svg>`;

  const frameNum = String(i).padStart(4, '0');
  fs.writeFileSync(path.join(framesDir, `frame_${frameNum}.svg`), fullSvg);
}

console.log('Encoding 12-second 4-scene video with FFmpeg...');

try {
  const mp4Path = path.join(publicDir, 'durga_mandap.mp4');
  execSync(`ffmpeg -y -framerate 30 -i "${framesDir}/frame_%04d.svg" -c:v libx264 -pix_fmt yuv420p -preset fast "${mp4Path}"`);
  console.log('SUCCESS! Created public/durga_mandap.mp4!');
} catch (err) {
  console.error('Error during video encoding:', err.message);
} finally {
  fs.rmSync(framesDir, { recursive: true, force: true });
}
