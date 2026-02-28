import { useState, useEffect, useRef, useCallback } from "react";
import SignTranslate from "./SignTranslate";

/* ═══════════════════════════════════════════════════
   HANDITALK — Full Immersive Experience
   Emotional arc: Lost → Empathy → Hope → Trust → Inspired
═══════════════════════════════════════════════════ */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blush: #FDF0F5;
    --rose: #F9D5E2;
    --pink: #E8185A;
    --deep-pink: #C4144A;
    --gold: #D4A853;
    --teal: #3ECFB2;
    --charcoal: #14141E;
    --dark: #0E0E18;
    --gray: #6B6880;
    --cream: #FDFAF8;
    --white: #FFFFFF;
  }

  html { scroll-behavior: smooth; font-size: 16px; }
  body { 
    font-family: 'DM Sans', sans-serif; 
    background: var(--blush); 
    color: var(--charcoal); 
    overflow-x: hidden;
    cursor: none;
  }
  
  /* Custom cursor */
  .cursor-dot {
    width: 8px; height: 8px;
    background: var(--pink);
    border-radius: 50%;
    position: fixed; top: 0; left: 0;
    pointer-events: none; z-index: 99999;
    transition: transform 0.1s ease;
    mix-blend-mode: multiply;
  }
  .cursor-ring {
    width: 36px; height: 36px;
    border: 2px solid var(--pink);
    border-radius: 50%;
    position: fixed; top: 0; left: 0;
    pointer-events: none; z-index: 99998;
    transition: all 0.15s ease;
    opacity: 0.5;
  }
  .cursor-ring.hovering {
    width: 56px; height: 56px;
    background: rgba(232,24,90,0.08);
    opacity: 1;
  }

  /* ── Keyframes ────────────────────────────── */
  @keyframes fadeUp { 
    from { opacity:0; transform:translateY(40px); } 
    to { opacity:1; transform:translateY(0); } 
  }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  @keyframes fadeOut { from{opacity:1}to{opacity:0} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)} }
  @keyframes float { 
    0%,100%{transform:translateY(0) rotate(-2deg)} 
    50%{transform:translateY(-20px) rotate(2deg)} 
  }
  @keyframes floatB { 
    0%,100%{transform:translateY(0) rotate(1deg)} 
    50%{transform:translateY(-14px) rotate(-1deg)} 
  }
  @keyframes floatC { 
    0%,100%{transform:translateY(-6px)} 
    50%{transform:translateY(6px)} 
  }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.08);opacity:0.8} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ripple { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
  @keyframes waveHand { 
    0%,100%{transform:rotate(-15deg) translateX(0)} 
    25%{transform:rotate(20deg) translateX(4px)} 
    75%{transform:rotate(-8deg) translateX(-2px)} 
  }
  @keyframes shimmer {
    0%{background-position:-200% center}
    100%{background-position:200% center}
  }
  @keyframes slideInLeft {
    from{opacity:0;transform:translateX(-30px)}
    to{opacity:1;transform:translateX(0)}
  }
  @keyframes slideInRight {
    from{opacity:0;transform:translateX(30px)}
    to{opacity:1;transform:translateX(0)}
  }
  @keyframes countUp {
    from{opacity:0;transform:translateY(20px) scale(0.8)}
    to{opacity:1;transform:translateY(0) scale(1)}
  }
  @keyframes drawLine {
    from{stroke-dashoffset:1000}
    to{stroke-dashoffset:0}
  }
  @keyframes glowPulse {
    0%,100%{box-shadow:0 0 20px rgba(232,24,90,0.3)}
    50%{box-shadow:0 0 60px rgba(232,24,90,0.7)}
  }
  @keyframes typewriter {
    from{width:0}to{width:100%}
  }
  @keyframes breathe {
    0%,100%{transform:scale(1)}
    50%{transform:scale(1.03)}
  }
  @keyframes introFade {
    0%{opacity:0} 15%{opacity:1} 80%{opacity:1} 100%{opacity:0}
  }
  @keyframes progressBar {
    from{width:0} to{width:100%}
  }
  @keyframes dotAppear {
    0%{transform:scale(0);opacity:0}
    60%{transform:scale(1.3);opacity:1}
    100%{transform:scale(1);opacity:1}
  }
  @keyframes gradientShift {
    0%{background-position:0% 50%}\n    50%{background-position:100% 50%}\n    100%{background-position:0% 50%}\n  }
  @keyframes holoGlow {
    0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(232,24,90,0.2); opacity: 0.8; }
    50% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(232,24,90,0.5); opacity: 1; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Utility animations ───────────────────── */
  .anim-fadeUp { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
  .anim-holo { animation: holoGlow 2s ease-in-out infinite; }
  .anim-float { animation: float 5s ease-in-out infinite; }
  .anim-floatB { animation: floatB 6s ease-in-out infinite; }
  .anim-floatC { animation: floatC 3s ease-in-out infinite; }
  .anim-pulse { animation: pulse 2.5s ease-in-out infinite; }
  .anim-blink { animation: blink 1.2s ease-in-out infinite; }
  .anim-wave { animation: waveHand 1.8s ease-in-out infinite; }
  .anim-breathe { animation: breathe 4s ease-in-out infinite; }

  /* Staggered delays */
  .delay-1{animation-delay:0.1s}
  .delay-2{animation-delay:0.2s}
  .delay-3{animation-delay:0.3s}
  .delay-4{animation-delay:0.4s}
  .delay-5{animation-delay:0.5s}
  .delay-6{animation-delay:0.6s}
  .delay-7{animation-delay:0.7s}
  .delay-8{animation-delay:0.8s}

  /* ── Buttons ──────────────────────────────── */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 50px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none;
    border: none; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; overflow: hidden; white-space: nowrap;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--pink) 0%, var(--deep-pink) 100%);
    color: white;
    box-shadow: 0 8px 32px rgba(232,24,90,0.35);
  }
  .btn-primary::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
    opacity:0; transition:opacity 0.3s;
  }
  .btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 16px 48px rgba(232,24,90,0.5); }
  .btn-primary:hover::before { opacity:1; }
  .btn-ghost {
    background: transparent; color: var(--pink);
    border: 2px solid var(--pink);
  }
  .btn-ghost:hover { background: var(--pink); color: white; transform:translateY(-3px); }
  .btn-white {
    background: white; color: var(--pink);
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .btn-white:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(0,0,0,0.25); }
  .btn-gold {
    background: linear-gradient(135deg, var(--gold) 0%, #B8892A 100%);
    color: white;
    box-shadow: 0 8px 32px rgba(212,168,83,0.4);
  }
  .btn-gold:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(212,168,83,0.6); }

  /* ── Nav ──────────────────────────────────── */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2005; /* Higher than hero overlays */
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    background: transparent;
  }
  .navbar.scrolled {
    background: rgba(255,255,255,0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    height: 70px;
  }
  .navbar.solid {
    background: white;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  /* ── Sidebar ──────────────────────────────── */
  .sidebar {
    position: fixed;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 20px 12px;
    border-radius: 40px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .sidebar.collapsed {
    background: transparent;
    backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
    right: 12px;
  }
  .sidebar-item.toggle-btn {
    transition: transform 0.3s;
  }
  .sidebar.collapsed .toggle-btn:hover {
    transform: scale(1.1);
  }
  .sidebar-item {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: var(--charcoal);
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(0,0,0,0.05);
    position: relative;
  }
  .sidebar-item:hover {
    background: var(--pink);
    color: white;
    transform: scale(1.1);
  }
  .sidebar-tooltip {
    position: absolute;
    right: 60px;
    background: var(--charcoal);
    color: white;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
  }
  .sidebar-item:hover .sidebar-tooltip {
    opacity: 1;
    transform: translateX(-10px);
  }

  /* ── Interactive Hero ────────────────────── */
  .hero-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 100px 48px 48px; /* Padding for navbar */
    box-sizing: border-box;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
  }
  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(14,14,24,0.8) 0%, rgba(14,14,24,0.3) 50%, transparent 100%);
    z-index: 0;
  }
  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
  }

  /* ── The Need Section ────────────────────── */
  .need-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-top: 60px;
  }
  .need-card {
    background: white;
    padding: 40px;
    border-radius: 32px;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.4s ease;
  }
  .need-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  }

  /* ── Solution Cards ──────────────────────── */
  .solution-card {
    height: 500px;
    border-radius: 40px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .solution-card:hover {
    transform: scale(1.02);
  }
  .solution-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
  .solution-card:hover img {
    transform: scale(1.1);
  }
  .solution-card-content {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(14,14,24,0.9) 0%, transparent 60%);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .card:hover { transform:translateY(-12px); box-shadow:0 40px 80px rgba(232,24,90,0.18); border-color:rgba(232,24,90,0.3); }

  /* ── Glassmorphism ────────────────────────── */
  .glass {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 20px;
  }
  .glass-dark {
    background: rgba(20,20,30,0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
  }

  /* ── Scrollbar ────────────────────────────── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--blush); }
  ::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 3px; }

  /* ── Nav ──────────────────────────────────── */
  .nav-link { 
    color: inherit; text-decoration:none; font-weight:500; font-size:14px;
    position:relative; padding-bottom:4px; transition:color 0.3s;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:0; left:0; width:0; height:2px;
    background:var(--pink); transition:width 0.3s; border-radius:2px;
  }
  .nav-link:hover { color:var(--pink); }
  .nav-link:hover::after, .nav-link.active::after { width:100%; }
  .nav-link.active { color:var(--pink); }

  /* ── Blob shapes ──────────────────────────── */
  .blob {
    position:absolute; border-radius:50%; filter:blur(80px); 
    pointer-events:none; z-index:0; opacity:0.5;
  }

  /* ── Section reveals ──────────────────────── */
  .reveal { opacity:0; transform:translateY(40px); transition:all 0.9s cubic-bezier(0.16,1,0.3,1); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-left { opacity:0; transform:translateX(-40px); transition:all 0.9s cubic-bezier(0.16,1,0.3,1); }
  .reveal-left.visible { opacity:1; transform:translateX(0); }
  .reveal-right { opacity:0; transform:translateX(40px); transition:all 0.9s cubic-bezier(0.16,1,0.3,1); }
  .reveal-right.visible { opacity:1; transform:translateX(0); }
  .reveal.delay-1 { transition-delay:0.1s; }
  .reveal.delay-2 { transition-delay:0.2s; }
  .reveal.delay-3 { transition-delay:0.3s; }
  .reveal.delay-4 { transition-delay:0.4s; }
  .reveal.delay-5 { transition-delay:0.5s; }
  .reveal-left.delay-2 { transition-delay:0.2s; }
  .reveal-right.delay-3 { transition-delay:0.3s; }

  /* ── Tourism Suite Components ──────────────── */
  .kiosk-mode {
    position: fixed; inset: 0; z-index: 2000;
    background: var(--white); padding: 40px;
    display: flex; flex-direction: column;
  }
  .kiosk-mode .nav-hide { display: none !important; }
  .kiosk-mode .enlarge { font-size: 1.5rem !important; }

  .sos-button {
    position: fixed; bottom: 32px; left: 32px; z-index: 1000;
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, #EF4444, #C4144A);
    color: white; border: none; cursor: pointer;
    box-shadow: 0 8px 32px rgba(239,68,68,0.4);
    display: flex; flex-direction: column; alignItems: center; justifyContent: center;
    transition: all 0.3s;
  }
  .sos-button:hover { transform: scale(1.1); box-shadow: 0 12px 48px rgba(239,68,68,0.6); }

  .emergency-modal {
    position: fixed; inset: 0; z-index: 2100;
    background: rgba(20,2,2,0.95);
    backdrop-filter: blur(20px);
    display: flex; flex-direction: column;
  }

  .help-card-active {
    background: #EF4444 !important;
    animation: glowPulse 1s infinite;
  }

  .map-container {
    width: 100%; height: 600px; border-radius: 24px;
    overflow: hidden; border: 1px solid rgba(232,24,90,0.1);
  }

  .marker-pulse {
    width: 12px; height: 12px; background: var(--pink);
    border-radius: 50%; border: 2px solid white;
    box-shadow: 0 0 0 rgba(232,24,90, 0.4);
    animation: markerPulse 2s infinite;
  }
  @keyframes markerPulse {
    0% { box-shadow: 0 0 0 0 rgba(232,24,90, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(232,24,90, 0); }
    100% { box-shadow: 0 0 0 0 rgba(232,24,90, 0); }
  }

  .dish-card {
    transition: all 0.3s; cursor: pointer;
    border: 1px solid rgba(0,0,0,0.05);
  }
  .dish-card:hover { transform: translateY(-8px); border-color: var(--pink); }

  .allergen-icon {
    width: 24px; height: 24px; display: inline-flex;
    align-items: center; justify-content: center;
    background: var(--blush); border-radius: 6px;
    font-size: 14px;
  }

  /* ── Handibbot phrase pills ───────────────── */
  .phrase-pill {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 20px; border-radius:50px;
    background:white; border:2px solid var(--rose);
    cursor:pointer; font-family:'DM Sans',sans-serif;
    font-size:14px; font-weight:500; color:var(--charcoal);
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    white-space:nowrap;
  }
  .phrase-pill:hover { border-color:var(--pink); transform:translateX(6px) translateY(-2px); box-shadow:0 8px 24px rgba(232,24,90,0.2); }
  .phrase-pill.active { background:linear-gradient(135deg,var(--pink),var(--deep-pink)); color:white; border-color:transparent; transform:scale(1.04); box-shadow:0 8px 32px rgba(232,24,90,0.4); }

  /* ── Mute toggle ──────────────────────────── */
  .mute-toggle {
    position:fixed; bottom:32px; right:32px; z-index:1000;
    width:56px; height:56px; border-radius:50%;
    background:white; border:none; cursor:pointer;
    box-shadow:0 8px 32px rgba(232,24,90,0.25);
    display:flex; align-items:center; justify-content:center;
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    color:var(--pink);
  }
  .mute-toggle:hover { transform:scale(1.1) rotate(-8deg); box-shadow:0 12px 48px rgba(232,24,90,0.4); }
  .mute-toggle.muted { background:var(--pink); color:white; animation:glowPulse 2s infinite; }

  /* ── Silence overlay ──────────────────────── */
  .silence-overlay {
    position:fixed; inset:0; z-index:2000;
    background:rgba(20,20,30,0.95);
    backdrop-filter:blur(20px);
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:24px;
    animation:fadeIn 0.5s ease;
  }

  /* ── ROI calculator ───────────────────────── */
  .roi-slider {
    -webkit-appearance:none; appearance:none;
    width:100%; height:6px; border-radius:3px;
    background:var(--rose); outline:none; cursor:pointer;
  }
  .roi-slider::-webkit-slider-thumb {
    -webkit-appearance:none; appearance:none;
    width:22px; height:22px; border-radius:50%;
    background:var(--pink); cursor:pointer;
    box-shadow:0 4px 16px rgba(232,24,90,0.4);
    transition:transform 0.2s;
  }
  .roi-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }

  /* ── Yasmine story ────────────────────────── */
  .story-chapter {
    opacity:0; transform:translateY(30px);
    transition:all 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .story-chapter.active { opacity:1; transform:translateY(0); }


  /* ── Context card accent colors ───────────── */
  .card-edu { border-top:5px solid #6366F1; }
  .card-tourism { border-top:5px solid var(--gold); }
  .card-enterprise { border-top:5px solid var(--teal); }
  .card-public { border-top:5px solid var(--pink); }
  .card-edu:hover { box-shadow:0 40px 80px rgba(99,102,241,0.2); }
  .card-tourism:hover { box-shadow:0 40px 80px rgba(212,168,83,0.25); }
  .card-enterprise:hover { box-shadow:0 40px 80px rgba(62,207,178,0.2); }
  .card-public:hover { box-shadow:0 40px 80px rgba(232,24,90,0.2); }

  /* ── Video player ─────────────────────────── */
  .video-player-wrap {
    background:#0E0E18; border-radius:24px;
    overflow:hidden; position:relative;
    aspect-ratio:4/3; display:flex;
    align-items:center; justify-content:center;
  }

  /* ── Text muted state ─────────────────────── */
  body.text-muted p, body.text-muted h1, body.text-muted h2, body.text-muted h3,
  body.text-muted h4, body.text-muted span:not(.keep-visible),
  body.text-muted label, body.text-muted li, body.text-muted a:not(.btn) {
    opacity:0 !important; transition:opacity 0.5s ease;
  }

  /* Marquee strip */
  .marquee-wrap { overflow:hidden; white-space:nowrap; }
  .marquee-inner { display:inline-block; animation:marquee 20s linear infinite; }

  /* ── Scrapbook Layout ──────────────────────── */
  .scrapbook-container {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: var(--dark);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scrapbook-card {
    position: absolute;
    background: white;
    padding: 12px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    border-radius: 4px;
    transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
    cursor: pointer;
    z-index: 1;
  }
  .scrapbook-card:hover {
    transform: scale(1.1) rotate(0deg) !important;
    z-index: 10;
    box-shadow: 0 40px 80px rgba(232,24,90,0.4);
  }
  .scrapbook-photo {
    width: 240px;
    height: 240px;
    object-fit: cover;
    border-radius: 2px;
    filter: sepia(0.2) contrast(1.1);
  }
  .scrapbook-caption {
    position: absolute;
    bottom: 8px;
    left: 12px;
    right: 12px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 16px;
    color: var(--charcoal);
    text-align: center;
  }
  .tape {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 30px;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(2px);
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 2;
  }

  /* ── Responsive ───────────────────────────── */
  @media(max-width:768px){
    .hide-sm{display:none!important;}
    .col-sm-1{grid-template-columns:1fr!important;}
    .col-sm-2{grid-template-columns:1fr 1fr!important;}
  }
  @media(prefers-reduced-motion:reduce){
    *{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}
  }
  /* ── HandiBot Chat ────────────────────────── */
  .handibot-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: white;
    color: var(--pink);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(232,24,90,0.3);
    z-index: 2000;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    border: 3px solid var(--pink);
    animation: bubblePop 2s infinite ease-in-out;
  }
  @keyframes bubblePop {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .handibot-window {
    position: fixed;
    bottom: 90px;
    right: 24px;
    width: 280px;
    height: 420px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.15);
    z-index: 2001;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
    animation: slideUp 0.3s ease-out;
  }
  .chat-header {
    padding: 12px 16px;
    background: white;
    border-bottom: 1px solid rgba(0,0,0,0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }
  .avatar-container {
    width: 100%;
    height: 140px;
    background: #fff;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
  }
  .avatar-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #FDFBFC;
    scrollbar-width: thin;
    scrollbar-color: var(--pink) transparent;
  }
  .chat-messages::-webkit-scrollbar {
    width: 4px;
  }
  .chat-messages::-webkit-scrollbar-thumb {
    background: var(--pink);
    border-radius: 10px;
  }
  .message-bubble {
    max-width: 80%;
    padding: 12px 18px;
    border-radius: 20px;
    font-size: 14px;
    line-height: 1.5;
  }
  .message-bot {
    align-self: flex-start;
    background: white;
    color: var(--charcoal);
    border: 1px solid rgba(0,0,0,0.05);
    border-bottom-left-radius: 4px;
  }
  .message-user {
    align-self: flex-end;
    background: var(--pink);
    color: white;
    border-bottom-right-radius: 4px;
  }
  .chat-input-area {
    padding: 20px;
    background: white;
    border-top: 1px solid rgba(0,0,0,0.03);
    display: flex;
    gap: 10px;
  }
  .camera-preview {
    width: 100%;
    aspect-ratio: 4/3;
    background: #000;
    margin-bottom: 10px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .recording-dot {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 10px;
    height: 10px;
    background: #EF4444;
    border-radius: 50%;
    animation: blink 1s infinite;
  }
`;

// ─── ICONS ──────────────────────────────────────────────────
const Icon = ({ d, size = 24, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d.map((path, i) => <path key={i} d={path} />)}
  </svg>
);

const icons = {
  hand: ["M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2", "M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2", "M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8", "M6 14c0 4 2 6 6 8 4-2 6-4 6-8v-3H6v3z"],
  menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
  x: ["M18 6 6 18", "m6 6 12 12"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0"],
  eyeOff: ["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24", "M1 1l22 22"],
  camera: ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z", "M12 12m-4 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0"],
  play: ["M5 3l14 9-14 9V3z"],
  grad: ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"],
  compass: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
  briefcase: ["M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"],
  building: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  arrow: ["M5 12h14", "m12 5 7 7-7 7"],
  check: ["M20 6 9 17l-5-5"],
  mic: ["M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v4", "M8 23h8"],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  globe: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  heart: ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M12 11m-4 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  sparkle: ["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"],
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"],
  phone: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"],
  map: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z", "M8 2v16", "M16 6v16"],
  tablet: ["M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z", "M12 18h.01"],
  coffee: ["M18 8h1a4 4 0 0 1 0 8h-1", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z", "M6 1v3", "M10 1v3", "M14 1v3"],
  minus: ["M5 12h14"],
  plus: ["M12 5v14", "M5 12h14"],
  chevronRight: ["m9 18 6-6-6-6"],
};

// ─── USE REVEAL ─────────────────────────────────────────────
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── ANIMATED COUNTER ───────────────────────────────────────
function Counter({ target, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    const isFloat = target % 1 !== 0;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── CURSOR ──────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX - 4 + "px"; dot.current.style.top = e.clientY - 4 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 18 + "px"; ring.current.style.top = e.clientY - 18 + "px"; }
    };
    const over = (e) => { if (e.target.closest("a,button,.card,.phrase-pill,.context-card")) setHovering(true); };
    const out = () => setHovering(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
    </>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────
function Sidebar({ setPage }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const items = [
    { id: 'handibot', label: 'HandiTablet', icon: icons.tablet },
    { id: 'handimaps', label: 'HandiMaps', icon: icons.map },
    { id: 'handimenu', label: 'HandiMenu', icon: icons.coffee },
    { id: 'translate', label: 'Sign Translate', icon: icons.hand }
  ];

  return (
    <div className={`sidebar anim-fadeDown ${isCollapsed ? 'collapsed' : ''}`} style={{ top: '60%' }}>
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sidebar-item toggle-btn"
        style={{
          background: isCollapsed ? 'var(--pink)' : 'rgba(0,0,0,0.05)',
          color: isCollapsed ? 'white' : 'var(--charcoal)',
          marginBottom: isCollapsed ? 0 : 8
        }}
      >
        <Icon d={isCollapsed ? icons.plus : icons.minus} size={18} />
      </div>

      {!isCollapsed && items.map(p => (
        <div key={p.id} onClick={() => setPage(p.id)} className="sidebar-item">
          <Icon d={p.icon} size={20} />
          <span className="sidebar-tooltip">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── INTERACTIVE HERO ───────────────────────────────────────
function InteractiveHero({ setPage }) {
  const cards = [
    {
      img: "/img/image_1_1772234531659.jpg",
      top: "12%", left: "8%", rotate: "-6deg"
    },
    {
      img: "/img/image_1_1772234668317.jpg",
      top: "18%", left: "42%", rotate: "4deg"
    },
    {
      img: "/img/image_1_1772234753064.jpg",
      top: "8%", left: "72%", rotate: "-3deg"
    },
    {
      img: "/img/image_1_1772234794260.jpg",
      top: "52%", left: "4%", rotate: "3deg"
    },
    {
      img: "/img/image_1_1772234938675.jpg",
      top: "58%", left: "32%", rotate: "-5deg"
    },
    {
      img: "/img/image_1_1772234531659.jpg", // Reusing first image for 6th card
      top: "48%", left: "68%", rotate: "7deg"
    },
  ];

  return (
    <section id="home" className="hero-container">
      <div className="scrapbook-container">
        {cards.map((card, i) => (
          <div
            key={i}
            className="scrapbook-card anim-fadeUp"
            style={{
              top: card.top,
              left: card.left,
              transform: `rotate(${card.rotate})`,
              animationDelay: `${0.2 + i * 0.1}s`
            }}
          >
            <div className="tape" />
            <img src={card.img} alt="HandiTalk Journey" className="scrapbook-photo" />
          </div>
        ))}
        {/* Animated signal overlay */}
        <div style={{
          position: 'absolute', bottom: 40, right: 40,
          width: 12, height: 12, borderRadius: '50%', background: '#EF4444',
          boxShadow: '0 0 20px #EF4444', zIndex: 5
        }} className="anim-pulse" />
        <span style={{
          position: 'absolute', bottom: 38, right: 60,
          color: 'white', fontFamily: 'DM Mono', fontSize: 10, letterSpacing: 2, zIndex: 5
        }}>L'HISTOIRE CONTINUE</span>
      </div>
      <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(14,14,24,0.9) 0%, rgba(14,14,24,0.4) 100%)' }} />

      <div className="hero-content">
        <span className="anim-fadeUp delay-1" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "var(--pink)", letterSpacing: 4, display: 'block', marginBottom: 20, textTransform: 'uppercase' }}>Tourism Suite HD</span>
        <h1 className="anim-fadeUp delay-2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px, 7vw, 84px)", color: "white", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
          The world is beautiful.<br />
          <span style={{ fontStyle: "italic", color: "var(--pink)" }}>Let's make it heard.</span>
        </h1>
        <p className="anim-fadeUp delay-3" style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 600, marginBottom: 48 }}>
          HandiTalk bridges the gap between the hearing world and the deaf traveler, starting with the vibrant heart of Tunisia.
        </p>
        <div className="anim-fadeUp delay-4" style={{ display: 'flex', gap: 20 }}>
          <button onClick={() => {
            const el = document.getElementById('solutions');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: 16 }}>Launch Tourism Suite ↓</button>
          <button onClick={() => {
            const el = document.getElementById('impact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} className="btn btn-ghost" style={{ padding: '16px 36px', fontSize: 16, borderColor: 'white', color: 'white' }}>Our Vision</button>
        </div>
      </div>
    </section>
  );
}

// ─── TRAVEL EXPERIENCES ──────────────────────────────────────
function TravelExperiences() {
  const [ref, visible] = useReveal();
  const experiences = [
    {
      title: "Whispers of the Souk",
      label: "Authentic Interaction",
      desc: "Experience the thrill of bargaining for a hand-woven carpet. No words, just hands, smiles, and HandiBot.",
      img: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Echoes of History",
      label: "Cultural Deep-Dive",
      desc: "Walk through Carthage and Sidi Bou Said with a guide who speaks your language—visually and emotionally.",
      img: "https://images.unsplash.com/photo-1543833078-43093b772b9a?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section style={{ padding: "80px 48px", background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ marginBottom: 64, textAlign: 'center' }}>
          <span style={{ fontFamily: "'DM Mono',monospace", color: "var(--pink)", letterSpacing: 3 }}>BEYOND ACCESSIBILITY</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginTop: 16 }}>
            Tunisia is an Experience.<br /><span style={{ fontStyle: 'italic' }}>Don't just see it. Feel it.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 40 }}>
          {experiences.map((exp, i) => (
            <div key={i} className={`reveal delay-${i + 1} ${visible ? "visible" : ""}`} style={{
              height: 600, borderRadius: 40, overflow: 'hidden', position: 'relative',
              boxShadow: '0 40px 100px rgba(14,14,24,0.1)'
            }}>
              <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,24,0.9) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40 }}>
                <span style={{ color: 'var(--pink)', fontFamily: 'DM Mono', fontSize: 12, letterSpacing: 2 }}>{exp.label}</span>
                <h3 style={{ color: 'white', fontSize: 32, fontFamily: "'Playfair Display',serif", fontWeight: 700, margin: '12px 0' }}>{exp.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6 }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── THE NEED (EMPATHY SECTION) ─────────────────────────────
function TheNeedSection() {
  const [ref, visible] = useReveal();

  const points = [
    { icon: "🔇", title: "The Silence Barrier", desc: "87% of deaf travelers feel isolated because basic interaction—ordering coffee or asking for directions—is a mountain to climb." },
    { icon: "🆘", title: "The Safety Gap", desc: "In emergencies, information is delivered via audio. Deaf tourists are the last to know, and the most vulnerable." },
    { icon: "🕌", title: "The Cultural Wall", desc: "Museums and landmarks are treasures that speak. Without interpretation, they remain silent to 466 million people." }
  ];

  return (
    <section id="about" style={{ padding: "80px 48px", background: "white" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginBottom: 24 }}>
            Travel is a human right.<br /><span style={{ color: "var(--pink)", fontStyle: 'italic' }}>Communication is the key.</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--gray)", lineHeight: 1.8 }}>
            Imagine being in the heart of the Medina, surrounded by history, and having no way to ask the artisan about his craft. We don't just provide a tool; we restore the human connection.
          </p>
        </div>

        <div className="need-grid">
          {points.map((p, i) => (
            <div key={i} className={`need-card reveal delay-${i + 1} ${visible ? "visible" : ""}`}>
              <div style={{ fontSize: 40, marginBottom: 24 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{p.title}</h3>
              <p style={{ color: "var(--gray)", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS OVERVIEW ─────────────────────────────────────
function SolutionsOverview({ setPage }) {
  const [ref, visible] = useReveal();
  const solutions = [
    { id: 'handibot', title: 'HandiBot Tablet', tag: 'Kiosk Solution', img: '/sol-handibot.png', desc: 'The physical interface for hotels and vendors.', color: 'var(--pink)' },
    { id: 'handimaps', title: 'HandiMaps', tag: 'Navigation', img: '/sol-handimaps.png', desc: 'Visual markers and signed landmark guides.', color: 'var(--gold)' },
    { id: 'handimenu', title: 'HandiMenu', tag: 'Dining', img: '/sol-handimenu.png', desc: 'Signed dish explainer and ordering tool.', color: 'var(--teal)' }
  ];

  return (
    <section id="solutions" style={{ padding: "80px 48px", background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ marginBottom: 64 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", color: "var(--pink)", letterSpacing: 3 }}>THE TOURISM SUITE</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginTop: 16 }}>
            Three products.<br /><span style={{ fontStyle: 'italic' }}>One mission.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          {solutions.map((s, i) => (
            <div key={s.id} onClick={() => setPage(s.id)} className={`solution-card reveal delay-${i + 1} ${visible ? "visible" : ""}`}>
              <img src={s.img} alt={s.title} />
              <div className="solution-card-content">
                <span style={{ fontFamily: "'DM Mono',monospace", color: s.color, fontSize: 12, letterSpacing: 2, background: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: 20, alignSelf: 'flex-start', backdropFilter: 'blur(10px)' }}>{s.tag}</span>
                <h3 style={{ color: 'white', fontSize: 32, fontFamily: "'Playfair Display',serif", fontWeight: 900, margin: '12px 0' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'white', fontWeight: 600 }}>
                  <span>Launch Experience</span>
                  <span style={{ transition: 'transform 0.3s' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EMERGENCY FEATURE SECTION ──────────────────────────────
function EmergencySection({ onSos }) {
  const [ref, visible] = useReveal();
  return (
    <section style={{ padding: "80px 48px", background: "var(--dark)", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(45deg, #EF4444 0%, transparent 100%)', opacity: 0.1 }} />
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 64, flexWrap: 'wrap' }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ maxWidth: 500 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", color: "#EF4444", letterSpacing: 3 }}>SAFETY FIRST</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: 'white', marginTop: 16, marginBottom: 24 }}>
            Emergency SOS.<br /><span style={{ fontStyle: 'italic', color: "#EF4444" }}>Never walk alone.</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 40 }}>
            Safety information should be accessible to everyone. Our integrated Emergency Module provides signed life-saving protocols and bystander cards for any urgent situation.
          </p>
          <button onClick={onSos} className="btn btn-primary" style={{ background: '#EF4444', border: 'none', padding: '18px 48px', fontSize: 17, boxShadow: '0 20px 40px rgba(239,68,68,0.3)' }}>Open Safety Hub 🚨</button>
        </div>

        <div className={`reveal delay-2 ${visible ? "visible" : ""}`} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 48, border: '1px solid rgba(255,255,255,0.1)', flex: 1, minWidth: 350 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {['Medical Aid', 'Lost Item', 'Police Info', 'Fire Safety'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'white' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: 24, background: 'rgba(239,68,68,0.1)', borderRadius: 20, border: '1px solid rgba(239,68,68,0.2)' }}>
            <p style={{ color: 'white', fontSize: 14, fontStyle: 'italic' }}>"8 out of 10 deaf travelers worry about missing vital safety announcements. HandiTalk makes them visible."</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────
function Navbar({ activePage, setPage, onSos }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "journey", label: "Journey" },
    { id: "solutions", label: "Solutions" },
    { id: "translate", label: "Sign Translate" },
  ];

  const handleLinkClick = (id) => {
    if (id === "translate") {
      setPage("translate");
      return;
    }
    if (activePage === "home") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setPage("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const useDarkNav = scrolled || activePage !== 'home';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${activePage !== 'home' ? 'solid' : ''}`}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/img/logo.png" alt="HandiTalk" style={{ height: 40, width: 'auto' }} />
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, letterSpacing: -0.5, color: useDarkNav ? "#0E0E18" : "white" }}>HandiTalk</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {navLinks.map(link => (
          <button key={link.id} onClick={() => handleLinkClick(link.id)} style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 500,
            letterSpacing: 1.5, color: useDarkNav ? "#6B6880" : "rgba(255,255,255,0.7)", textTransform: "uppercase",
            transition: "all 0.3s",
          }} className="nav-link">
            {link.label}
          </button>
        ))}
        <button onClick={onSos} style={{
          background: "#EF4444", color: "white", border: "none",
          padding: "8px 20px", borderRadius: 50, fontFamily: "'DM Mono',monospace",
          fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1,
          boxShadow: "0 8px 20px rgba(239,68,68,0.3)", transition: "all 0.3s",
        }}>SOS</button>
      </div>
    </nav>
  );
}

// ─── SILENCE INTRO ───────────────────────────────────────────
function SilenceIntro({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 800);
    const t1 = setTimeout(() => setPhase(2), 3000);
    const t2 = setTimeout(() => setPhase(3), 5500);
    const t3 = setTimeout(() => onDone(), 8000);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0E0E18",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column",
    }}>
      {/* Ambient scene */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* Simulated blurry lobby scene via CSS blobs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 200, background: "rgba(255,200,150,0.15)", borderRadius: "50%", filter: "blur(60px)", animation: "pulse 3s infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "15%", width: 200, height: 300, background: "rgba(150,200,255,0.1)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "30%", width: 400, height: 200, background: "rgba(255,150,200,0.08)", borderRadius: "50%", filter: "blur(100px)" }} />

        {/* Silhouettes */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", bottom: "15%",
            left: `${15 + i * 18}%`,
            width: 40, height: 120,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "40px 40px 0 0",
            filter: "blur(4px)",
          }} />
        ))}

        {/* Noise signs / announcements */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${10 + Math.random() * 60}%`,
            left: `${5 + i * 12}%`,
            width: 80, height: 24,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 4,
            opacity: phase >= 1 ? 1 : 0,
            transition: `opacity 0.5s ${i * 0.1}s`,
          }} />
        ))}
      </div>

      {/* Phase 1: disorientation */}
      {phase >= 1 && phase < 3 && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 16, padding: 40,
          animation: "fadeIn 1s ease",
        }}>
          {/* Flying text fragments — noise */}
          {["GATE 12 CHANGED", "رحلة 204", "EMBARQUEMENT", "Vol annulé", "ANNOUNCEMENT"].map((t, i) => (
            <div key={i} className="anim-holo" style={{
              position: "absolute",
              top: `${15 + i * 16}%`,
              left: `${5 + (i % 3) * 30}%`,
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 2,
              animation: `holoGlow ${2 + i * 0.5}s ease-in-out infinite, blink ${1.5 + i * 0.3}s ease-in-out infinite`,
            }}>{t}</div>
          ))}
        </div>
      )}

      {/* Phase 2: the line */}
      {phase >= 2 && (
        <div style={{
          maxWidth: 640, textAlign: "center", padding: "0 40px",
          animation: phase === 3 ? "fadeOut 0.8s ease forwards" : "fadeIn 1.2s ease",
          position: "relative", zIndex: 10,
        }}>
          <p style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(22px,4vw,38px)",
            fontStyle: "italic",
            color: "white",
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            "This is what every journey feels like<br />
            <span style={{ color: "#E8185A" }}>when the world wasn't designed for you.</span>"
          </p>
        </div>
      )}

      {/* Phase 3: logo */}
      {phase >= 3 && (
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", animation: "scaleIn 0.8s ease" }}>
          <img src="/img/logo.png" alt="HandiTalk" style={{
            height: 120, width: 'auto',
            margin: "0 auto 24px",
            filter: "drop-shadow(0 0 30px rgba(232,24,90,0.6))",
            animation: "glowPulse 1.5s infinite"
          }} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 900, color: "white", letterSpacing: -1 }}>
            Handi<span style={{ color: "#E8185A" }}>Talk</span>
          </h2>
        </div>
      )}

      {/* Skip button */}
      <button onClick={onDone} className="anim-holo" style={{
        position: "absolute", bottom: 32, right: 32,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.4)",
        color: "white", padding: "10px 20px",
        borderRadius: 50, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
        fontSize: 14, fontWeight: 500, transition: "all 0.3s",
        animation: "fadeIn 1s 2s ease both, holoGlow 3s infinite",
        backdropFilter: "blur(10px)",
      }} onMouseEnter={e => { e.target.style.background = 'white'; e.target.style.color = 'black'; }} onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'white'; }}>
        Skip intro →
      </button>
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero({ setPage }) {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      padding: "120px 48px 80px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #FDF0F5 0%, #FDFAF8 50%, #F9EDF5 100%)",
    }}>
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(232,24,90,0.08)", top: -100, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(62,207,178,0.08)", bottom: -100, left: -100 }} />
      <div className="blob" style={{ width: 300, height: 300, background: "rgba(212,168,83,0.06)", top: "30%", left: "40%" }} />

      {/* Left: text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow marquee */}
        <div className="marquee-wrap hide-sm" style={{
          background: "rgba(232,24,90,0.06)", borderRadius: 50,
          padding: "6px 0", marginBottom: 32, width: "fit-content",
          maxWidth: "100%", overflow: "hidden",
        }}>
          <div className="marquee-inner" style={{
            fontFamily: "'DM Mono',monospace", fontSize: 11,
            color: "#E8185A", letterSpacing: 2, textTransform: "uppercase",
            padding: "0 24px",
          }}>
            ACCESSIBLE TOURISM · لغة الإشارة · TOURISME INCLUSIF · AI SIGN LANGUAGE · INCLUSION NUMÉRIQUE · ACCESSIBLE TOURISM · لغة الإشارة · TOURISME INCLUSIF · AI SIGN LANGUAGE · INCLUSION NUMÉRIQUE ·&nbsp;
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(42px,6vw,76px)",
          lineHeight: 1.1,
          marginBottom: 24,
          fontWeight: 900,
        }}>
          <span className={`anim-fadeUp ${visible ? "" : ""}`} style={{ display: "block" }}>Every tourist</span>
          <span className={`anim-fadeUp delay-2`} style={{
            display: "block",
            fontStyle: "italic",
            background: "linear-gradient(135deg, #E8185A 0%, #C4144A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>deserves to be</span>
          <span className={`anim-fadeUp delay-3`} style={{ display: "block" }}>understood.</span>
        </h1>

        <p className="anim-fadeUp delay-4" style={{
          fontSize: 18, lineHeight: 1.7, color: "#6B6880",
          maxWidth: 480, marginBottom: 40,
        }}>
          HandiTalk is the world's first AI sign language concierge for tourism — turning every hotel lobby, museum, and restaurant into a place where deaf travelers feel at home.
        </p>

        {/* CTAs */}
        <div className="anim-fadeUp delay-5" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
          <button className="btn btn-primary" onClick={() => setPage("tourism")}>
            <span>Experience HandiTalk</span>
            <Icon d={icons.arrow} size={18} />
          </button>
          <button className="btn btn-ghost" onClick={() => document.getElementById("handibot")?.scrollIntoView({ behavior: "smooth" })}>
            🤟 Meet HandiBot
          </button>
        </div>

        {/* Trust strip */}
        <div className="anim-fadeUp delay-6" style={{
          display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center",
        }}>
          {["🏆 Women Techsters 2026", "🇩🇿 Built in Algeria", "417 validated signs"].map((t, i) => (
            <span key={i} style={{
              fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#6B6880",
              display: "flex", alignItems: "center", gap: 4,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Right: illustration */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Central hand */}
        <div className="anim-float" style={{
          width: 240, height: 240,
          background: "linear-gradient(135deg, rgba(232,24,90,0.12), rgba(196,20,74,0.06))",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          boxShadow: "0 0 80px rgba(232,24,90,0.2)",
        }}>
          {/* Ripple rings */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: "absolute", inset: -i * 30,
              borderRadius: "50%",
              border: "1px solid rgba(232,24,90,0.15)",
              animation: `ripple ${2 + i * 0.5}s ease-out ${i * 0.4}s infinite`,
            }} />
          ))}
          <span style={{ fontSize: 96 }} className="anim-wave">🤟</span>
        </div>

        {/* Floating cards */}
        {[
          { icon: "✓", text: "Check-in done!", color: "#3ECFB2", top: "5%", left: "-5%", delay: "0s" },
          { icon: "🏛️", text: "Museum tour signed", color: "#D4A853", top: "10%", right: "-5%", delay: "0.8s" },
          { icon: "🍽️", text: "Menu explained", color: "#E8185A", bottom: "10%", left: "0%", delay: "1.4s" },
          { icon: "🚨", text: "Emergency ready", color: "#6366F1", bottom: "5%", right: "0%", delay: "2s" },
        ].map((card, i) => (
          <div key={i} className="glass" style={{
            position: "absolute",
            ...{ top: card.top, bottom: card.bottom, left: card.left, right: card.right },
            padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 8,
            animation: `floatB 4s ease-in-out ${card.delay} infinite, fadeIn 0.8s ${card.delay} ease both`,
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 18 }}>{card.icon}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: card.color }}>{card.text}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "floatC 2s ease-in-out infinite",
      }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#6B6880", letterSpacing: 2 }}>SCROLL</span>
        <div style={{
          width: 24, height: 40, border: "2px solid rgba(232,24,90,0.3)",
          borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6,
        }}>
          <div style={{ width: 4, height: 8, background: "#E8185A", borderRadius: 2, animation: "floatC 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ─── YASMINE STORY ───────────────────────────────────────────
function YasmineStory() {
  const [chapter, setChapter] = useState(0);
  const containerRef = useRef(null);

  const chapters = [
    {
      id: 0, phase: "without",
      emotion: "😟", emotionLabel: "Overwhelmed", emotionColor: "#6B6880",
      scene: "🛫",
      title: "Arrival",
      text: "Yasmine lands in Tunis. The gate changes. An announcement plays. Everyone moves suddenly. She doesn't know why. She follows the crowd, hoping it's the right direction.",
      bg: "#1A1A2E",
      accent: "rgba(107,104,128,0.3)",
    },
    {
      id: 1, phase: "without",
      emotion: "😞", emotionLabel: "Invisible", emotionColor: "#6B6880",
      scene: "🏨",
      title: "Hotel Check-in",
      text: "She approaches the desk. The receptionist reaches for a notepad and pen. It's the third time someone has handed her paper instead of looking at her. She writes her name. He writes back. Five minutes for something that should take thirty seconds.",
      bg: "#1E1028",
      accent: "rgba(107,104,128,0.25)",
    },
    {
      id: 2, phase: "without",
      emotion: "😔", emotionLabel: "Excluded", emotionColor: "#6B6880",
      scene: "🏛️",
      title: "The Museum",
      text: "The audio guide is incompatible with her hearing aid. The tour group moves on. She photographs the plaques to translate later, alone, in her hotel room. The art is beautiful. The silence around it, less so.",
      bg: "#14141E",
      accent: "rgba(107,104,128,0.2)",
    },
    {
      id: 3, phase: "with",
      emotion: "✨", emotionLabel: "Seen", emotionColor: "#3ECFB2",
      scene: "🤟",
      title: "HandiTalk Appears",
      text: "On day two, the hotel has a HandiTalk kiosk. She walks toward it. The avatar begins to sign — clear, warm, in her language. For the first time on this trip, someone is speaking directly to her.",
      bg: "#0A1628",
      accent: "rgba(62,207,178,0.25)",
      pivot: true,
    },
    {
      id: 4, phase: "with",
      emotion: "😊", emotionLabel: "Welcome", emotionColor: "#D4A853",
      scene: "🍽️",
      title: "The Restaurant",
      text: "She orders her meal. Explains her allergy. Makes a small joke. The waiter laughs. She laughs. The food arrives exactly as she asked. This is what travel is supposed to feel like.",
      bg: "#0E1A0A",
      accent: "rgba(212,168,83,0.2)",
    },
    {
      id: 5, phase: "with",
      emotion: "🥹", emotionLabel: "Remembered", emotionColor: "#E8185A",
      scene: "✈️",
      title: "Departure",
      text: "She posts: 'First trip where I never felt like a burden. This hotel understood me.' 847 deaf travelers in her network see it within the hour. They screenshot the hotel name.",
      bg: "#1A0E1E",
      accent: "rgba(232,24,90,0.25)",
    },
  ];

  const current = chapters[chapter];

  return (
    <section id="journey" style={{
      background: current.bg,
      minHeight: "100vh",
      transition: "background 1s ease",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Ambient accent */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400,
        background: current.accent,
        borderRadius: "50%", filter: "blur(100px)",
        transition: "background 1s ease",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ padding: "80px 48px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <div style={{ width: 4, height: 40, background: "#E8185A", borderRadius: 2 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 3, textTransform: "uppercase" }}>
            Yasmine's Journey — A Day in Tunisia
          </span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4.5vw,48px)", color: "white", fontWeight: 900 }}>
          Two days. <span style={{ fontStyle: "italic", color: "#E8185A" }}>Two worlds.</span>
        </h2>
      </div>

      {/* Main chapter */}
      <div style={{
        flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 60, padding: "0 48px 60px", alignItems: "center",
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto", width: "100%",
      }}>
        {/* Left: visual */}
        <div key={chapter} style={{ animation: "slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1)", position: 'relative' }}>
          {/* Navigation Buttons on sides */}
          <button onClick={() => setChapter(Math.max(0, chapter - 1))} style={{
            position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', width: 44, height: 44, borderRadius: '50%',
            cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: chapter === 0 ? 0.2 : 1, transition: 'all 0.3s'
          }}>←</button>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${current.pivot ? "rgba(62,207,178,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 24, padding: 32,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            minHeight: 280,
            position: "relative", overflow: "hidden",
            transition: "border-color 1s ease",
          }}>
            {/* Pivot glow */}
            {current.pivot && (
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(circle at center, rgba(62,207,178,0.15) 0%, transparent 70%)",
              }} />
            )}

            <div style={{
              fontSize: 80, marginBottom: 16,
              animation: current.pivot ? "waveHand 2s ease-in-out infinite" : "float 4s ease-in-out infinite",
            }}>
              {current.scene}
            </div>

            {/* Phase label */}
            <div style={{
              padding: "6px 16px", borderRadius: 50,
              background: current.phase === "with" ? "rgba(62,207,178,0.2)" : "rgba(255,255,255,0.08)",
              border: `1px solid ${current.phase === "with" ? "rgba(62,207,178,0.5)" : "rgba(255,255,255,0.15)"}`,
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              color: current.phase === "with" ? "#3ECFB2" : "rgba(255,255,255,0.4)",
              letterSpacing: 2, textTransform: "uppercase",
            }}>
              {current.phase === "with" ? "✓ With HandiTalk" : "✕ Without HandiTalk"}
            </div>

            {/* Progress bar for "with" chapters */}
            {current.phase === "with" && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
                background: "rgba(62,207,178,0.2)",
              }}>
                <div style={{ height: "100%", width: "100%", background: "#3ECFB2", animation: "progressBar 4s linear infinite" }} />
              </div>
            )}
          </div>
        </div>

        {/* Right: story */}
        <div key={`story-${chapter}`} style={{ animation: "slideInRight 0.8s cubic-bezier(0.16,1,0.3,1)", position: 'relative' }}>
          {/* Next Button on side */}
          <button onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))} style={{
            position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)',
            background: chapter < chapters.length - 1 ? 'var(--pink)' : 'rgba(255,255,255,0.1)',
            border: 'none', color: 'white', width: 44, height: 44, borderRadius: '50%',
            cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: chapter === chapters.length - 1 ? 0.2 : 1, transition: 'all 0.3s'
          }}>→</button>

          {/* Emotion */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "6px 16px", borderRadius: 50,
            background: "rgba(255,255,255,0.06)", marginBottom: 16,
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ fontSize: 20 }}>{current.emotion}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: current.emotionColor, fontWeight: 500 }}>
              {current.emotionLabel}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>
              CHAPTER {chapter + 1} OF 6
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(24px,3vw,36px)",
            color: "white", marginBottom: 16, fontWeight: 700,
          }}>
            {current.title}
          </h3>

          <p style={{
            fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.65)",
            fontStyle: current.pivot ? "normal" : "normal",
          }}>
            {current.text}
          </p>

          {/* Pivot quote */}
          {current.pivot && (
            <blockquote style={{
              marginTop: 24, padding: "16px 20px",
              borderLeft: "3px solid #3ECFB2",
              background: "rgba(62,207,178,0.08)",
              borderRadius: "0 12px 12px 0",
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic", fontSize: 16,
              color: "#3ECFB2",
            }}>
              "For the first time, someone is speaking her language."
            </blockquote>
          )}

          {/* Last chapter CTA */}
          {chapter === 5 && (
            <div style={{ marginTop: 32, padding: 24, background: "rgba(232,24,90,0.1)", borderRadius: 20, border: "1px solid rgba(232,24,90,0.3)" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#E8185A", fontSize: 18, marginBottom: 16 }}>
                "Be the hotel Yasmine remembers."
              </p>
              <button className="btn btn-primary">Partner with HandiTalk →</button>
            </div>
          )}
        </div>
      </div>

      {/* Chapter navigation */}
      <div style={{
        position: "sticky", bottom: 0,
        background: "rgba(14,14,24,0.8)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 10,
      }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {chapters.map((c, i) => (
            <button key={i} onClick={() => setChapter(i)} style={{
              width: i === chapter ? 24 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: i === chapter ? "#E8185A" : "rgba(255,255,255,0.2)",
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              padding: 0,
            }} />
          ))}
        </div>

        {/* Progress text */}
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, margin: '0 auto' }}>
          {current.phase === "with" ? "✓ WITH HANDITALK" : "✕ WITHOUT HANDITALK"}
        </span>
      </div>
    </section>
  );
}


// ─── HANDIBOT (HANDITABLET) ──────────────────────────────────
function HandiBot() {
  const [ref, visible] = useReveal();

  const steps = [
    { num: "01", title: "Approach the kiosk", icon: "🖥️", desc: "The tablet sits at the counter, always on, always ready." },
    { num: "02", title: "Staff selects a category", icon: "📂", desc: "🏨 Check-in · 🗺️ Directions · 🍽️ Restaurant · 🛍️ Shopping · 🚨 Emergency" },
    { num: "03", title: "Staff taps a phrase", icon: "👆", desc: "Large buttons, simple labels — no technical knowledge needed." },
    { num: "04", title: "HandiBot signs", icon: "🤟", desc: "The deaf visitor watches HandiBot sign the full message. Clear. Immediate." },
    { num: "05", title: "Visitor responds", icon: "💬", desc: "They type a reply or select from suggested responses on screen. The conversation continues." },
  ];

  return (
    <section id="handibot" style={{ padding: "80px 48px", background: "linear-gradient(180deg, #FDF0F5 0%, #FDFAF8 100%)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 100 }}>
          <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ fontFamily: "DM Mono", color: "var(--pink)", letterSpacing: 3, textTransform: 'uppercase' }}>Kiosk Technology</span>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginTop: 16, lineHeight: 1.1 }}>
              What is <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>HandiTablet?</span>
            </h2>
            <p style={{ color: "#6B6880", fontSize: 20, marginTop: 24, lineHeight: 1.7 }}>
              A tablet kiosk deployed at hotel receptions, museum entrances, souk stalls and public spaces. Staff tap what they need to communicate — HandiBot signs it instantly to the deaf visitor standing in front of them. No training. No interpreter. <strong>One tap.</strong>
            </p>
          </div>

          <div className={`reveal delay-1 ${visible ? "visible" : ""}`} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 40, overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.12)',
              border: '1px solid rgba(232,24,90,0.1)'
            }}>
              <img src="/img/handitablet/image_1_1772239860576.jpg" alt="HandiTablet in use" style={{ width: '100%', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, var(--rose) 0%, transparent 100%)', zIndex: -1 }} />
          </div>
        </div>

        {/* How to use it */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 40, fontWeight: 900 }}>How to use it</h3>
          <div style={{ width: 60, height: 4, background: 'var(--pink)', margin: '16px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 100 }}>
          {steps.map((step, i) => (
            <div key={i} className={`reveal delay-${i} ${visible ? "visible" : ""}`} style={{
              background: 'white', padding: 32, borderRadius: 32,
              border: '1px solid rgba(0,0,0,0.04)', textAlign: 'center'
            }}>
              <span style={{ fontFamily: 'DM Mono', color: 'rgba(232,24,90,0.2)', fontSize: 40, fontWeight: 900, display: 'block', marginBottom: 16 }}>{step.num}</span>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h4 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{step.title}</h4>
              <p style={{ fontSize: 14, color: '#6B6880', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Secondary Visual Banner */}
        <div className={`reveal delay-4 ${visible ? "visible" : ""}`} style={{
          borderRadius: 40, overflow: 'hidden',
          height: 480, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img
            src="/img/handitablet/PixVerse_Image_Effect_prompt_Vibrant market ph.jpg"
            alt="Kiosk in vibrant market"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,24,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: 40 }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: 44, fontWeight: 700 }}>No Training. No Interpreter.</h3>
            <p style={{ fontFamily: 'DM Mono', marginTop: 16, letterSpacing: 4, opacity: 0.85 }}>ONE TAP CHANGES EVERYTHING</p>
          </div>
        </div>

      </div>
    </section>
  );
}



// ─── HOW IT WORKS ─────────────────────────────────────────────

// ─── EMERGENCY MODULE ────────────────────────────────────────
function EmergencyModule({ isOpen, onClose }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showHelpCard, setShowHelpCard] = useState(false);

  const scenarios = [
    { id: 'medical', icon: '🚑', label: 'Medical Emergency', label_fr: 'Urgence Médicale', label_ar: 'حالة طبية طارئة', color: '#EF4444', phone: '190', video: '/videos/emergency/medical.mp4' },
    { id: 'police', icon: '👮', label: 'Police Assistance', label_fr: 'Assistance Police', label_ar: 'مساعدة الشرطة', color: '#3B82F6', phone: '197', video: '/videos/emergency/police.mp4' },
    { id: 'fire', icon: '🔥', label: 'Fire / Evacuation', label_fr: 'Feu / Évacuation', label_ar: 'حريق / إخلاء', color: '#F97316', phone: '198', video: '/videos/emergency/fire.mp4' },
    { id: 'stolen', icon: '💼', label: 'Lost / Stolen', label_fr: 'Perdu / Volé', label_ar: 'مفقود / مسروق', color: '#8B5CF6', phone: '197', video: '/videos/emergency/stolen.mp4' },
    { id: 'child', icon: '👶', label: 'Lost Child', label_fr: 'Enfant Perdu', label_ar: 'طفل مفقود', color: '#EC4899', phone: '197', video: '/videos/emergency/child.mp4' },
    { id: 'pharmacy', icon: '💊', label: 'Pharmacy Needed', label_fr: 'Pharmacie', label_ar: 'صيدلية', color: '#10B981', phone: '190', video: '/videos/emergency/pharmacy.mp4' },
    { id: 'injury', icon: '🤕', label: 'I am Injured', label_fr: 'Je suis blessé', label_ar: 'أنا مصاب', color: '#F59E0B', phone: '190', video: '/videos/emergency/injury.mp4' },
    { id: 'tourist_police', icon: '🛡️', label: 'Tourist Police', label_fr: 'Police Touristique', label_ar: 'شرطة سياحية', color: '#6366F1', phone: '071-259-500', video: '/videos/emergency/tourist.mp4' },
  ];

  if (!isOpen) return null;

  return (
    <div className="emergency-modal">
      <div style={{ padding: '20px 40px', background: 'linear-gradient(90deg, #EF4444, #C4144A)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'white' }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <h2 style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, letterSpacing: 2, fontWeight: 700 }}>EMERGENCY SOS</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 50, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>CLOSE</button>
      </div>

      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'grid', gridTemplateColumns: selectedScenario ? '3fr 2fr' : '1fr', gap: 40 }}>
        {!selectedScenario ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {scenarios.map(s => (
              <div key={s.id} onClick={() => setSelectedScenario(s)} className="card" style={{ padding: 32, cursor: 'pointer', borderTop: `8px solid ${s.color}`, textAlign: 'center' }}>
                <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>{s.icon}</span>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{s.label}</h3>
                <p style={{ color: '#6B6880', fontSize: 16 }}>{s.label_fr} | {s.label_ar}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="video-player-wrap" style={{ aspectRatio: '16/9' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 80 }} className="anim-wave">🤟</span>
                  <p style={{ color: 'white', marginTop: 20, fontStyle: 'italic', fontSize: 20 }}>HandiBot signing instructions...</p>
                </div>
                <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(239,68,68,0.8)', padding: '8px 16px', borderRadius: 8, color: 'white', fontFamily: 'DM Mono' }}>
                  SCENARIO: {selectedScenario.label.toUpperCase()}
                </div>
              </div>

              <div style={{ background: 'white', padding: 32, borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#EF4444', marginBottom: 16 }}>Bystander Information Card</h3>
                <div style={{ borderLeft: '4px solid #EF4444', paddingLeft: 20 }}>
                  <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>J'AI BESOIN D'AIDE — {selectedScenario.label_fr}</p>
                  <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>أنا أحتاج إلى مساعدة — {selectedScenario.label_ar}</p>
                  <p style={{ fontSize: 18, color: '#6B6880' }}>Please assist me or call {selectedScenario.phone}. I communicate using sign language.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <button onClick={() => setShowHelpCard(true)} className="btn help-card-active" style={{ height: 120, fontSize: 24, justifyContent: 'center' }}>
                FULL SCREEN HELP CARD
              </button>
              <a href={`tel:${selectedScenario.phone}`} className="btn btn-primary" style={{ height: 80, fontSize: 20, justifyContent: 'center' }}>
                <Icon d={icons.phone} size={24} />
                CALL {selectedScenario.phone}
              </a>
              <button onClick={() => setSelectedScenario(null)} className="btn btn-ghost" style={{ height: 60 }}>
                BACK TO SCENARIOS
              </button>
            </div>
          </>
        )}
      </div>

      {showHelpCard && (
        <div onClick={() => setShowHelpCard(false)} className="help-card-active" style={{ position: 'fixed', inset: 0, zIndex: 2200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: 160 }}>🚨</span>
          <h1 style={{ fontSize: 80, color: 'white', fontWeight: 900, marginTop: 40 }}>
            HELP ME<br />AIDEZ-MOI<br />ساعدوني
          </h1>
          {selectedScenario && (
            <div style={{ background: 'white', color: '#EF4444', padding: '20px 60px', borderRadius: 100, fontSize: 40, fontWeight: 700, marginTop: 40 }}>
              {selectedScenario.icon} {selectedScenario.label.toUpperCase()}
            </div>
          )}
          <p style={{ color: 'white', marginTop: 40, fontSize: 24 }}>Tap anywhere to close</p>
        </div>
      )}
    </div>
  );
}
// ─── HOW IT WORKS ─────────────────────────────────────────────
function HowItWorks() {
  const [ref, visible] = useReveal();
  const steps = [
    { n: "01", icon: "💬", title: "Guest communicates", desc: "Text input, live camera signing, or voice — HandiTalk accepts all formats." },
    { n: "02", icon: "🧠", title: "HandiTalk processes", desc: "Our AI matches intent to the validated sign language dictionary in real time." },
    { n: "03", icon: "🤟", title: "HandiBot signs back", desc: "The avatar delivers the response in Algerian Sign Language — clear and immediate." },
  ];
  return (
    <section style={{ padding: "80px 48px", background: "#FDF0F5", position: "relative", overflow: "hidden" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#E8185A", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 16 }}>HOW IT WORKS</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900 }}>
            Three steps.<br /><span style={{ fontStyle: "italic", color: "#E8185A" }}>Zero barriers.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, position: "relative" }}>
          {/* Dashed connecting line */}
          <div style={{
            position: "absolute", top: "60px", left: "18%", right: "18%", height: 2,
            borderTop: "2px dashed rgba(232,24,90,0.2)", zIndex: 0,
          }} />
          {steps.map((step, i) => (
            <div key={i} className={`reveal delay-${i + 2} ${visible ? "visible" : ""}`}
              style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              {/* Number behind */}
              <div style={{
                position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Playfair Display',serif", fontSize: 120, fontWeight: 900,
                color: "rgba(232,24,90,0.05)", lineHeight: 1, userSelect: "none",
              }}>{step.n}</div>

              <div style={{
                width: 96, height: 96, borderRadius: 28,
                background: "white", margin: "0 auto 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40,
                boxShadow: "0 20px 60px rgba(232,24,90,0.15)",
                border: "1px solid rgba(232,24,90,0.1)",
                position: "relative", zIndex: 1,
                transition: "all 0.3s",
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: "#6B6880", fontSize: 15, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL POSTCARDS ────────────────────────────────────
function Testimonials() {
  const [ref, visible] = useReveal();
  const cards = [
    { text: "First trip where I felt truly welcome. The hotel had HandiTalk and I never once felt like a burden.", name: "Amira K.", role: "Deaf traveler, Cairo", stamp: "TUNIS 2025", emoji: "🇹🇳" },
    { text: "We saw a measurable increase in accessibility bookings within the first quarter of deploying HandiTalk.", name: "Mohammed R.", role: "Hotel Director, Hammamet", stamp: "HAMMAMET", emoji: "🏨" },
    { text: "The museum experience was completely transformed. I understood every exhibit. I cried at the exit.", name: "Leila S.", role: "Deaf tourist, Algiers", stamp: "BARDO 2025", emoji: "🏛️" },
  ];

  return (
    <section style={{ padding: "80px 48px", background: "#FDFAF8", position: "relative", overflow: "hidden" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`} style={{ marginBottom: 48, textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900 }}>
            Heard from those who <span style={{ fontStyle: "italic", color: "#E8185A" }}>lived it.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {cards.map((c, i) => (
            <div key={i} className={`reveal delay-${i + 1} ${visible ? "visible" : ""}`} style={{
              background: "#FDFAF0",
              border: "1px solid rgba(212,168,83,0.3)",
              borderRadius: 4,
              padding: 32,
              position: "relative", overflow: "hidden",
              boxShadow: "2px 4px 20px rgba(0,0,0,0.08), -1px -1px 0 rgba(212,168,83,0.1)",
              transition: "all 0.3s ease",
            }}>
              {/* Postcard stamp */}
              <div style={{
                position: "absolute", top: 16, right: 16,
                width: 60, height: 72, border: "2px solid rgba(212,168,83,0.4)",
                borderRadius: 4, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4,
                background: "rgba(212,168,83,0.05)",
              }}>
                <span style={{ fontSize: 24 }}>{c.emoji}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "#D4A853", letterSpacing: 1, textAlign: "center", textTransform: "uppercase" }}>{c.stamp}</span>
              </div>

              {/* Postmark */}
              <div style={{
                position: "absolute", bottom: 16, right: 16,
                width: 64, height: 64, border: "2px solid rgba(232,24,90,0.2)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.5,
              }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#E8185A", textAlign: "center", transform: "rotate(-15deg)" }}>HandiTalk<br />2025</span>
              </div>

              {/* Horizontal lines like postcard */}
              <div style={{ borderBottom: "1px dashed rgba(212,168,83,0.3)", paddingBottom: 20, marginBottom: 20 }}>
                <p style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: "italic",
                  fontSize: 16, lineHeight: 1.7, color: "#14141E", paddingRight: 72,
                }}>"{c.text}"</p>
              </div>

              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14 }}>{c.name}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B6880", marginTop: 2 }}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLOSING STATEMENT ────────────────────────────────────────
function ClosingStatement() {
  const [ref, visible] = useReveal();
  return (
    <section style={{
      background: "linear-gradient(135deg, #C4144A 0%, #E8185A 50%, #D4144A 100%)",
      backgroundSize: "200% 200%",
      animation: "gradientShift 6s ease infinite",
      padding: "160px 48px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(100px)" }} />

      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <p style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "clamp(24px,4vw,42px)", color: "rgba(255,255,255,0.85)",
            lineHeight: 1.5, marginBottom: 32,
          }}>
            "The most memorable hotels aren't remembered<br />
            for their pools or their views."
          </p>
          <p style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "clamp(20px,3.5vw,36px)", color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5, marginBottom: 40,
          }}>
            "They're remembered for the moment<br />
            a guest felt truly seen."
          </p>
          <p style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 700,
            fontSize: "clamp(24px,4vw,48px)", color: "white",
            lineHeight: 1.3, marginBottom: 64,
          }}>
            HandiTalk builds that moment.
          </p>
        </div>

        <div className={`reveal delay-3 ${visible ? "visible" : ""}`} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:handitalk@contact.com" className="btn btn-white">
            Partner with HandiTalk →
          </a>
          <button className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "2px solid rgba(255,255,255,0.4)" }}>
            Download Pitch Deck
          </button>
        </div>

        <div className={`reveal delay-4 ${visible ? "visible" : ""}`} style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 40 }}>
          {["🌍 Social Impact", "♿ WCAG 2.1 AA", "🤝 RSE Certified"].map((t, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#14141E", padding: "80px 48px 40px", color: "rgba(255,255,255,0.6)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 64 }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }} onClick={() => setPage("home")}>
              <img src="/img/logo.png" alt="HandiTalk" style={{ height: 36, width: 'auto' }} />
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "white" }}>
                HandiTalk
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 style={{ color: "white", fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Navigate</h4>
            {[["handibot", "HandiBot"], ["handimaps", "HandiMaps"], ["handimenu", "HandiMenu"]].map(([id, label]) => (
              <a key={id} href="#" onClick={() => setPage(id)} style={{ display: "block", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10, fontSize: 14, transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#E8185A"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                {label}
              </a>
            ))}
          </div>

          {/* Col 4: Mission */}
          <div>
            <h4 style={{ color: "white", fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Our Mission</h4>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
              "HandiTalk was born from a simple belief: no one should feel invisible in a world that has the technology to include them."
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 32, display: "flex",
          justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © 2025 HandiTalk
            <span style={{ color: "#E8185A", margin: "0 8px" }}>·</span>
            All rights reserved
            <span style={{ color: "#E8185A", margin: "0 8px" }}>·</span>
            WCAG 2.1 AA
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {["♿ Accessible", "🌍 Impact"].map((t, i) => (
              <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SILENCE / MUTE EXPERIENCE TOGGLE ────────────────────────
function MuteToggle() {
  const [muted, setMuted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggle = () => {
    if (!muted) {
      setMuted(true);
      setShowOverlay(true);
      document.body.classList.add("text-muted");
    } else {
      setMuted(false);
      setShowOverlay(false);
      document.body.classList.remove("text-muted");
    }
  };

  useEffect(() => () => document.body.classList.remove("text-muted"), []);

  return (
    <>
      <button className={`mute-toggle ${muted ? "muted" : ""}`} onClick={toggle} title="Experience the web as Yasmine does">
        <Icon d={muted ? icons.eyeOff : icons.eye} size={22} />
      </button>

      {showOverlay && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 800,
          background: "rgba(14,14,24,0.85)",
          backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "fadeIn 0.5s ease",
        }}>
          <div className="glass-dark" style={{ padding: 48, maxWidth: 480, textAlign: "center" }}>
            <span style={{ fontSize: 64, display: "block", marginBottom: 24 }}>👁️</span>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 22, color: "white", lineHeight: 1.6, marginBottom: 8 }}>
              You are navigating without text.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
              This is Yasmine's digital world.
            </p>
            <button className="btn btn-primary" onClick={toggle} style={{ marginBottom: 12 }}>
              <Icon d={icons.eye} size={16} />
              <span className="keep-visible">Restore text</span>
            </button>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono',monospace" }}>
              WCAG 2.1 — Text-free navigation test
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HANDIMAPS ──────────────────────────────────────────────
function HandiMaps() {
  const [ref, visible] = useReveal();

  const steps = [
    { num: "01", title: "Open the map", icon: "🗺️", desc: "Browse destinations across Tunisia. Pink markers = HandiTalk ready." },
    { num: "02", title: "Tap a place", icon: "📍", desc: "Select any landmark, museum, souk or beach." },
    { num: "03", title: "Pick your guide", icon: "🏛️", desc: "History · Directions · Local Tips" },
    { num: "04", title: "HandiBot signs", icon: "🤟", desc: "Watch your guide in sign language. Replay anytime." },
    { num: "05", title: "Save & go", icon: "💾", desc: "Bookmark the spot. Open directions. Start exploring." },
  ];

  return (
    <section id="handimaps" style={{ padding: "80px 48px", background: "#FDFAF8", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 100 }}>
          <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ fontFamily: "DM Mono", color: "var(--pink)", letterSpacing: 3, textTransform: 'uppercase' }}>Feature Guide</span>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginTop: 16, lineHeight: 1.1 }}>
              What is <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>HandiMaps?</span>
            </h2>
            <p style={{ color: "#6B6880", fontSize: 20, marginTop: 24, lineHeight: 1.6 }}>
              A map of Tunisia's top destinations. Tap any location — HandiBot signs its story, directions, and tips directly to you. No guide. No barriers.
            </p>
          </div>
          <div className={`reveal delay-1 ${visible ? "visible" : ""}`} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 40, overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
              border: '1px solid rgba(232,24,90,0.1)'
            }}>
              <img src="/img/handimaps/image_1_1772237145190.jpg" alt="HandiMaps Preview" style={{ width: '100%', display: 'block' }} />
            </div>
            {/* Soft decorative elements */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--rose) 0%, transparent 100%)', zIndex: -1 }} />
          </div>
        </div>

        {/* How to use it Section */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 40, fontWeight: 900 }}>How to use it</h3>
          <div style={{ width: 60, height: 4, background: 'var(--pink)', margin: '16px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {steps.map((step, i) => (
            <div key={i} className={`reveal delay-${i} ${visible ? "visible" : ""}`} style={{
              background: 'white', padding: 32, borderRadius: 32,
              border: '1px solid rgba(0,0,0,0.04)',
              transition: 'all 0.4s ease',
              textAlign: 'center'
            }}>
              <span style={{ fontFamily: 'DM Mono', color: 'rgba(232,24,90,0.3)', fontSize: 40, fontWeight: 900, display: 'block', marginBottom: 16 }}>{step.num}</span>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h4 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{step.title}</h4>
              <p style={{ fontSize: 14, color: '#6B6880', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Secondary Visual Section */}
        <div className={`reveal delay-4 ${visible ? "visible" : ""}`} style={{
          marginTop: 100, borderRadius: 40, overflow: 'hidden',
          height: 400, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src="/img/handimaps/image_1_1772234794260.jpg" alt="Tunisian Landscape" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,24,0.7) 0%, transparent 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: 32, fontWeight: 700 }}>Explore Tunisia, Your Way.</h3>
            <p style={{ fontFamily: 'DM Mono', marginTop: 12, letterSpacing: 2 }}>POWERED BY HANDITALK TECHNOLOGY</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HANDIMENU ──────────────────────────────────────────────
function HandiMenu() {
  const [ref, visible] = useReveal();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeDish, setActiveDish] = useState(null);
  const [showWaiterMode, setShowWaiterMode] = useState(false);

  const steps = [
    { num: "01", title: "Open HandiMenu", icon: "📱", desc: "Browse or search dishes by name or category." },
    { num: "02", title: "Find your dish", icon: "🔍", desc: "Spot something on the menu? Search it. HandiMenu has it." },
    { num: "03", title: "Tap the dish", icon: "✨", desc: "See ingredients, allergens, and spice level at a glance." },
    { num: "04", title: "HandiBot signs", icon: "🤟", desc: "Full dish explanation in sign language. Replay anytime." },
    { num: "05", title: "Show the waiter", icon: "📋", desc: "Flip the screen; your waiter reads large icons instantly." },
  ];

  const dishes = [
    { id: "brik", name_fr: "Brik à l'œuf", name_ar: "بريك بالبيض", category: "starter", description: "Thin crispy pastry filled with egg and tuna, deep fried", allergens: ["egg", "gluten", "fish"], spice: 1, vegetarian: false, video: "/videos/menu/brik.mp4" },
    { id: "lablabi", name_fr: "Lablabi", name_ar: "لبلابي", category: "street food", description: "Chickpea soup with cumin, olive oil, and crusty bread", allergens: ["gluten"], spice: 2, vegetarian: true, video: "/videos/menu/lablabi.mp4" },
    { id: "couscous", name_fr: "Couscous Agneau", name_ar: "كسكسي علوش", category: "main", description: "Steamed semolina with tender lamb and vegetables", allergens: ["gluten"], spice: 1, vegetarian: false, video: "/videos/menu/couscous.mp4" },
    { id: "ojja", name_fr: "Ojja Merguez", name_ar: "عجة مرقاز", category: "main", description: "Spicy tomato and egg shakshuka with lamb sausages", allergens: ["egg"], spice: 3, vegetarian: false, video: "/videos/menu/ojja.mp4" },
  ];

  const categories = ["all", "starter", "main", "dessert", "street food"];
  const filtered = dishes.filter(d =>
    (filter === "all" || d.category === filter) &&
    (d.name_fr.toLowerCase().includes(search.toLowerCase()) || d.name_ar.includes(search))
  );

  return (
    <section id="handimenu" style={{ padding: "120px 0", background: "white", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Header Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 100 }}>
          <div className={`reveal delay-1 ${visible ? "visible" : ""}`} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 40, overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
              border: '1px solid rgba(232,24,90,0.1)'
            }}>
              <img src="/img/handimenu/image_1_1772238727445.jpg" alt="HandiMenu Experience" style={{ width: '100%', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, var(--rose) 0%, transparent 100%)', zIndex: -1 }} />
          </div>

          <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
            <span style={{ fontFamily: "DM Mono", color: "var(--pink)", letterSpacing: 3, textTransform: 'uppercase' }}>Smart Dining</span>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginTop: 16, lineHeight: 1.1 }}>
              What is <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>HandiMenu?</span>
            </h2>
            <p style={{ color: "#6B6880", fontSize: 20, marginTop: 24, lineHeight: 1.6 }}>
              Every dish on every menu — explained in sign language. Tap a dish, Handimenu signs what it is, what's in it, and whether it's safe for you.
            </p>
          </div>
        </div>

        {/* 5-Step Guide */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 120 }}>
          {steps.map((step, i) => (
            <div key={i} className={`reveal delay-${i} ${visible ? "visible" : ""}`} style={{
              background: '#FDFAF8', padding: 32, borderRadius: 32,
              border: '1px solid rgba(0,0,0,0.03)',
              textAlign: 'center'
            }}>
              <span style={{ fontFamily: 'DM Mono', color: 'rgba(232,24,90,0.2)', fontSize: 40, fontWeight: 900, display: 'block', marginBottom: 16 }}>{step.num}</span>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h4 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{step.title}</h4>
              <p style={{ fontSize: 14, color: '#6B6880', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Simulation Section */}
        <div className={`reveal delay-4 ${visible ? "visible" : ""}`} style={{ background: '#FDFAF8', padding: '80px 48px', borderRadius: 48, border: '1px solid rgba(0,0,0,0.03)', marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: 40, fontWeight: 900 }}>Interactive Simulation</h3>
            <p style={{ color: "#6B6880", fontSize: 18, marginTop: 8 }}>Experience the future of dining. Search and tap any dish below.</p>
            <div style={{ width: 60, height: 4, background: 'var(--pink)', margin: '16px auto' }} />
          </div>

          <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search dish (Brik, Couscous...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 280, padding: '18px 28px', borderRadius: 50, border: '1px solid rgba(232,24,90,0.2)', fontSize: 16, fontFamily: 'DM Sans', background: 'white' }}
            />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)} className={`phrase-pill ${filter === c ? 'active' : ''}`}>
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {filtered.map(dish => (
              <div key={dish.id} onClick={() => setActiveDish(dish)} className="card dish-card" style={{ padding: 32, background: 'white', cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                <div style={{ height: 200, background: 'var(--blush)', borderRadius: 24, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>🥘</div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: 24, marginBottom: 8 }}>{dish.name_fr}</h3>
                <p style={{ color: 'var(--pink)', fontFamily: 'DM Mono', fontSize: 16, marginBottom: 16 }}>{dish.name_ar}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {dish.allergens.map(a => <span key={a} style={{ background: '#FDF0F5', padding: '4px 10px', borderRadius: 6, fontSize: 14 }}>⚠️ {a}</span>)}
                  {dish.vegetarian && <span style={{ background: '#E8FAF4', color: '#10B981', padding: '4px 10px', borderRadius: 6, fontSize: 14 }}>🌱 VEG</span>}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>{Array(dish.spice).fill(0).map((_, i) => <span key={i}>🌶️</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend / Icon Section */}
        <div className={`reveal delay-3 ${visible ? "visible" : ""}`} style={{
          marginBottom: 100, display: 'flex', justifyContent: 'center', gap: 40,
          fontFamily: 'DM Mono', fontSize: 14, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 1
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🌶️ Spice Level</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🐟 Seafood Content</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🌱 Vegetarian Safe</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>⚠️ Allergen Alert</span>
        </div>

        {/* Secondary Visual Section */}
        <div className={`reveal delay-4 ${visible ? "visible" : ""}`} style={{
          borderRadius: 40, overflow: 'hidden',
          height: 480, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src="/img/handimenu/image_1_1772238810194.jpg" alt="Dining Experience" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(14,14,24,0.6) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: 40 }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: 44, fontWeight: 700, maxWidth: 600 }}>Dine with Confidence.</h3>
            <p style={{ fontFamily: 'DM Mono', marginTop: 16, letterSpacing: 4, opacity: 0.9 }}>THE LANGUAGE OF TASTE, ACCESSIBLE TO ALL</p>
          </div>
        </div>
      </div>

      {/* Modals & Overlays */}
      {activeDish && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '100px 40px', backdropFilter: 'blur(8px)', overflowY: 'auto' }}>
          <div className="glass" style={{ maxWidth: 1100, width: '100%', background: 'white', display: 'grid', gridTemplateColumns: '1.2fr 1fr', overflow: 'hidden', borderRadius: 40 }}>
            <div style={{ padding: 60 }}>
              <button onClick={() => setActiveDish(null)} style={{ background: 'none', border: 'none', color: 'var(--pink)', cursor: 'pointer', marginBottom: 32, fontFamily: 'DM Mono', fontWeight: 700, fontSize: 14 }}>← BACK TO MENU</button>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: 48, marginBottom: 12 }}>{activeDish.name_fr}</h2>
              <p style={{ fontSize: 32, color: 'var(--pink)', marginBottom: 32 }}>{activeDish.name_ar}</p>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#6B6880', marginBottom: 40 }}>{activeDish.description}</p>

              <div style={{ marginBottom: 48 }}>
                <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, color: '#9CA3AF' }}>Nutritional Info & Allergens</h4>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {activeDish.allergens.map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 50, background: '#FDF0F5', color: '#E8185A', fontWeight: 700 }}>
                      <span style={{ fontSize: 20 }}>⚠️</span> {a.toUpperCase()}
                    </div>
                  ))}
                  {activeDish.vegetarian && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 50, background: '#E8FAF4', color: '#10B981', fontWeight: 700 }}>
                      <span style={{ fontSize: 20 }}>🌱</span> VEGETARIAN
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setShowWaiterMode(true)} className="btn btn-primary" style={{ width: '100%', padding: '24px', fontSize: 18 }}>📋 COMMUNICATE WITH WAITER</button>
            </div>
            <div className="video-player-wrap" style={{ borderRadius: 0, background: '#0E0E18', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 120, display: 'block', marginBottom: 24 }} className="anim-wave">🤟</span>
                <p style={{ color: 'white', fontSize: 18, fontFamily: 'DM Mono', opacity: 0.7 }}>HandiBot is signing...</p>
              </div>
              <div style={{ position: 'absolute', top: 32, right: 32, background: 'rgba(232,24,90,0.2)', color: 'var(--pink)', padding: '6px 14px', borderRadius: 8, fontSize: 12, border: '1px solid var(--pink)' }}>LIVE SIGNING</div>
            </div>
          </div>
        </div>
      )}

      {showWaiterMode && activeDish && (
        <div onClick={() => setShowWaiterMode(false)} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: '#0E0E18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center', padding: '100px 60px', cursor: 'pointer', overflowY: 'auto' }}>
          <span style={{ color: 'var(--pink)', fontFamily: 'DM Mono', letterSpacing: 4, marginBottom: 24 }}>QUICK COMMUNICATOR</span>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 2, marginBottom: 60 }}>PLEASE SHOW THIS TO YOUR WAITER</h4>
          <h1 style={{ fontSize: 120, color: 'white', marginBottom: 24 }}>{activeDish.name_ar}</h1>
          <h2 style={{ fontSize: 64, color: 'var(--pink)', marginBottom: 80 }}>{activeDish.name_fr}</h2>
          <div style={{ display: 'flex', gap: 60 }}>
            {activeDish.allergens.map(a => (
              <div key={a} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 80, marginBottom: 20 }}>🚫</div>
                <div style={{ color: 'white', fontSize: 24, textTransform: 'uppercase', fontWeight: 900 }}>NO {a}</div>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: 100, fontFamily: 'DM Mono' }}>TAP ANYWHERE TO CLOSE</p>
        </div>
      )}
    </section>
  );
}

// ─── CONTEXT DETAIL PAGE ─────────────────────────────────────
function ContextPage({ type, setPage }) {
  const configs = {
    tourism: {
      icon: "🧭", color: "#D4A853",
      title: "Tourism That\nIncludes Everyone",
      subtitle: "Turning every hotel lobby, museum, and restaurant into a place where deaf travelers feel at home.",
      stat: "87% of deaf tourists report feeling excluded during at least one moment of every trip",
      features: [
        { icon: "🏨", title: "HandiBot Tablet", desc: "Interactive concierge at check-in desks and souk vendor counters." },
        { icon: "🗺️", title: "HandiMaps", desc: "Interactive Tunisia map with signed video cards for landmarks." },
        { icon: "🍽️", title: "HandiMenu", desc: "Signed dish explainer with allergen icons and Show Waiter mode." },
        { icon: "🚨", title: "Emergency SOS", desc: "Persistent emergency button with signed scenario instructions." },
      ],
    }
  };

  const cfg = configs[type] || configs.tourism;
  const [ref, visible] = useReveal();

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #14141E 0%, #1E1028 100%)",
        padding: "100px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: `${cfg.color}15`, borderRadius: "50%", filter: "blur(100px)" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button onClick={() => setPage("home")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "8px 16px", borderRadius: 50, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginBottom: 40 }}>
            ← Home
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 24,
              background: `${cfg.color}20`, border: `1px solid ${cfg.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
            }}>
              {cfg.icon}
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: cfg.color, letterSpacing: 3, textTransform: "uppercase" }}>
              HANDITALK FOR {type.toUpperCase()}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(40px,6vw,72px)",
            color: "white", fontWeight: 900, lineHeight: 1.15,
            marginBottom: 24, whiteSpace: "pre-line",
          }}>{cfg.title}</h1>

          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
            {cfg.subtitle}
          </p>

          {/* Stat callout */}
          <div style={{
            display: "inline-block", padding: "16px 28px",
            background: `${cfg.color}15`, border: `1px solid ${cfg.color}40`,
            borderRadius: 16,
          }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: cfg.color, fontSize: 17, lineHeight: 1.5 }}>
              📊 "{cfg.stat}"
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "100px 48px", background: "#FDFAF8" }}>
        <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 className={`reveal ${visible ? "visible" : ""}`} style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginBottom: 60 }}>
            How HandiTalk helps in <span style={{ fontStyle: "italic", color: cfg.color }}>{type}</span>
          </h2>

          {cfg.features.map((f, i) => (
            <div key={i} className={`reveal delay-${i + 1} ${visible ? "visible" : ""}`}
              style={{
                display: "flex", gap: 24, alignItems: "flex-start",
                padding: "24px 28px", marginBottom: 16, borderRadius: 20,
                background: "white", border: "1px solid rgba(0,0,0,0.06)",
                transition: "all 0.3s ease", cursor: "default",
                borderLeft: `4px solid transparent`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderLeftColor = cfg.color; e.currentTarget.style.paddingLeft = "36px"; e.currentTarget.style.boxShadow = `0 20px 60px ${cfg.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.paddingLeft = "28px"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: `${cfg.color}12`, border: `1px solid ${cfg.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
              }}>{f.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ color: "#6B6880", fontSize: 15, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
              <div style={{ marginLeft: "auto", color: cfg.color, fontSize: 20, opacity: 0.4 }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded HandiBot */}
      <HandiBot />

      {/* CTA */}
      <section style={{
        background: `linear-gradient(135deg, ${cfg.color}20, ${cfg.color}08)`,
        border: `1px solid ${cfg.color}20`,
        padding: "80px 48px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginBottom: 16 }}>
            Ready to make your <span style={{ fontStyle: "italic", color: cfg.color }}>{type}</span> inclusive?
          </h2>
          <p style={{ color: "#6B6880", fontSize: 17, marginBottom: 40 }}>
            Join the first wave of inclusive leaders in North Africa.
          </p>
          <a href="mailto:handitalk@contact.com" className="btn btn-primary" style={{ fontSize: 17 }}>
            Request a Demo →
          </a>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ─── HANDIBOT CHATBOT ──────────────────────────────────────
function HandiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("/img/signsample/how can I help you.mp4");
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const avatarRef = useRef(null);

  // All available response videos from the samples folder
  const responseVideos = [
    { url: "/img/signsample/Hello.mp4", text: "Hello! Nice to meet you." },
    { url: "/img/signsample/I dunno ask again .mp4", text: "I'm not sure I understood that sign. Could you please try again?" },
    { url: "/img/signsample/I undernstand I can help.mp4", text: "I understand perfectly! I'm here to help." },
    { url: "/img/signsample/happy to answer.mp4", text: "I'm happy to help you with your request!" }
  ];

  // Initial greeting when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: "How can I help you today?",
          video: "/img/signsample/how can I help you.mp4"
        }
      ]);
      setCurrentVideo("/img/signsample/how can I help you.mp4");
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing, isRecording]);

  // Force video reload and play when currentVideo changes
  useEffect(() => {
    if (avatarRef.current && currentVideo) {
      avatarRef.current.load();
      avatarRef.current.play().catch(err => console.log('Autoplay prevented:', err));
    }
  }, [currentVideo]);

  // Cleanup camera when chatbot closes
  useEffect(() => {
    if (!isOpen && streamRef.current) {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      streamRef.current = stream;

      // Wait for next frame to ensure video element is ready
      setTimeout(() => {
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          videoRef.current.play().catch(err => console.log('Video play error:', err));
        }
      }, 100);

      setIsRecording(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera access is required to record sign language. Please enable camera permissions and try again.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setIsRecording(false);
  };

  const handleSendMessage = () => {
    if (isRecording) {
      stopCamera();
      setIsProcessing(true);

      // Add user message
      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: "🤟 Sign language sent"
      };
      setMessages(prev => [...prev, userMsg]);

      // Simulate AI processing and send random response
      setTimeout(() => {
        const randomRes = responseVideos[Math.floor(Math.random() * responseVideos.length)];
        setIsProcessing(false);

        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: randomRes.text,
          video: randomRes.url
        };
        setMessages(prev => [...prev, botMsg]);
        setCurrentVideo(randomRes.url);
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating chat bubble button */}
      <div
        className="handibot-bubble"
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: '3px solid #E8185A' }}
        title="Chat with HandiBot"
      >
        <Icon d={icons.hand} size={24} />
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="handibot-window">
          {/* Header with bot name */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, background: '#3ECFB2', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <span style={{ fontWeight: 700, fontFamily: 'DM Sans', fontSize: 13, color: '#14141E' }}>HandiBot AI</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              style={{ background: '#F3F4F6', border: 'none', cursor: 'pointer', color: '#6B6880', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#E8185A'}
              onMouseOut={(e) => e.currentTarget.style.background = '#F3F4F6'}
            >
              <Icon d={icons.x} size={12} />
            </button>
          </div>

          {/* Video avatar showing bot's responses */}
          <div className="avatar-container">
            <video
              ref={avatarRef}
              src={currentVideo}
              autoPlay
              muted
              loop
              playsInline
              className="avatar-video"
              onError={(e) => console.error('Video error:', e)}
            >
              <source src={currentVideo} type="video/mp4" />
            </video>
            {isProcessing && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                <span style={{ color: 'white', fontSize: 11, fontFamily: 'DM Mono', letterSpacing: 1.5, animation: 'pulse 1.5s infinite' }}>ANALYZING...</span>
              </div>
            )}
          </div>

          {/* Chat messages */}
          <div className="chat-messages" ref={scrollRef}>
            {messages.map(m => (
              <div
                key={m.id}
                className={`message-bubble ${m.sender === 'bot' ? 'message-bot' : 'message-user'}`}
                style={{ fontSize: 13, padding: '10px 14px', animation: 'fadeIn 0.3s ease-out' }}
              >
                {m.text}
              </div>
            ))}
            {isProcessing && (
              <div className="message-bubble message-bot" style={{ fontSize: 13, padding: '10px 14px' }}>
                <span className="anim-blink">●</span> Thinking...
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="chat-input-area" style={{ padding: 15, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', background: 'white' }}>
            {/* Camera preview when recording */}
            {isRecording && (
              <div className="camera-preview" style={{ width: '100%', height: 160, background: '#000', borderRadius: 12, marginBottom: 12, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onLoadedMetadata={() => console.log('Camera feed loaded')}
                />
                <div className="recording-dot" />
                <div style={{ position: 'absolute', bottom: 8, left: 8, color: 'white', fontSize: 9, fontFamily: 'DM Mono', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: 4, letterSpacing: 0.5 }}>
                  📹 RECORDING...
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, width: '100%' }}>
              {!isRecording ? (
                <button
                  onClick={startCamera}
                  className="btn btn-primary"
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    height: 40,
                    fontSize: 13,
                    background: isProcessing ? '#ccc' : '#E8185A',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Icon d={icons.camera} size={18} />
                  Open Camera
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSendMessage}
                    className="btn btn-primary"
                    style={{ flex: 1, height: 40, fontSize: 13, background: '#3ECFB2', border: 'none', fontWeight: 600 }}
                  >
                    Send Sign
                  </button>
                  <button
                    onClick={stopCamera}
                    title="Cancel"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: '#F3F4F6',
                      border: 'none',
                      color: '#6B6880',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#6B6880'; }}
                  >
                    <Icon d={icons.x} size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────
function HomePage({ setPage, onSos }) {
  return (
    <div>
      <InteractiveHero setPage={setPage} />
      <TheNeedSection />
      <YasmineStory />
      <SolutionsOverview setPage={setPage} />
      <EmergencySection onSos={onSos} />

      <HowItWorks />
      <Testimonials />
      <ClosingStatement />
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────
export default function HandiTalkApp() {
  const [page, setPage] = useState("home");
  const [showIntro, setShowIntro] = useState(true);
  const [sosOpen, setSosOpen] = useState(false);

  const handleSetPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{STYLES}</style>
      <CustomCursor />

      {showIntro && <SilenceIntro onDone={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Navbar activePage={page} setPage={handleSetPage} onSos={() => setSosOpen(true)} />
          <Sidebar setPage={handleSetPage} />
          <HandiChatBot />

          <main>
            {page === "home" && <HomePage setPage={handleSetPage} onSos={() => setSosOpen(true)} />}
            {page === "handibot" && (
              <div style={{ paddingTop: 80 }}>
                <button onClick={() => setPage('home')} style={{ margin: 48, background: 'none', border: '1px solid var(--charcoal)', padding: '12px 24px', borderRadius: 50, cursor: 'pointer' }}>← Back to Home</button>
                <HandiBot />
              </div>
            )}
            {page === "handimaps" && (
              <div style={{ paddingTop: 80 }}>
                <button onClick={() => setPage('home')} style={{ margin: 48, background: 'none', border: '1px solid var(--charcoal)', padding: '12px 24px', borderRadius: 50, cursor: 'pointer' }}>← Back to Home</button>
                <HandiMaps />
              </div>
            )}
            {page === "handimenu" && (
              <div style={{ paddingTop: 80 }}>
                <button onClick={() => setPage('home')} style={{ margin: 48, background: 'none', border: '1px solid var(--charcoal)', padding: '12px 24px', borderRadius: 50, cursor: 'pointer' }}>← Back to Home</button>
                <HandiMenu />
              </div>
            )}
            {page === "tourism" && (
              <ContextPage type={page} setPage={handleSetPage} />
            )}
            {page === "translate" && (
              <SignTranslate setPage={handleSetPage} />
            )}
          </main>

          <EmergencyModule isOpen={sosOpen} onClose={() => setSosOpen(false)} />
        </>
      )}
    </>
  );
}
