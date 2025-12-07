/* BOOT SCREEN */
#boot {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.6s ease;
}

.boot-text {
  color: var(--white);
  letter-spacing: 3px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.scanline {
  width: 100vw;
  height: 2px;
  margin-top: 20px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  animation: scan 1.3s infinite linear;
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* HERO BASE */
#hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-top: 64px; /* nav ki height */
}

#canvas-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* Volumetric light */
.volumetric-lights {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    radial-gradient(circle at 50% 18%, rgba(212, 165, 81, 0.12), transparent 55%),
    radial-gradient(circle at 12% 82%, rgba(76, 201, 240, 0.14), transparent 60%);
  mix-blend-mode: screen;
  filter: blur(40px);
  animation: breatheLight 9s ease-in-out infinite;
}

@keyframes breatheLight {
  0% {
    opacity: 0.18;
  }
  50% {
    opacity: 0.42;
  }
  100% {
    opacity: 0.18;
  }
}

/* HUD LAYER */
.hud {
  position: relative;
  z-index: 6;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 32px 40px;
  color: var(--white);
  pointer-events: none;
}

.hud-left,
.hud-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0.5;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.center {
  text-align: center;
  margin-top: 14vh;
  pointer-events: auto;
}

.title {
  font-family: var(--title-font);
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  letter-spacing: 0.7em;
  padding-left: 0.7em;
  color: var(--white);
  margin: 0 0 8px;
}

.subtitle {
  letter-spacing: 0.35em;
  padding-left: 0.35em;
  color: var(--cyan);
  margin: 0 0 40px;
  font-size: 0.9rem;
}

.cta-box {
  display: flex;
  gap: 22px;
  justify-content: center;
  flex-wrap: wrap;
}

/* CTA buttons */
.cta {
  position: relative;
  padding: 13px 34px;
  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 0.75rem;
  border: 1px solid var(--glass-border);
  background:
    radial-gradient(circle at top left, rgba(208, 166, 81, 0.15), transparent 60%),
    radial-gradient(circle at bottom right, rgba(76, 201, 240, 0.18), transparent 60%),
    rgba(10, 10, 14, 0.9);
  color: var(--white);
  overflow: hidden;
  backdrop-filter: blur(22px);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 40px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.2s ease,
    background 0.25s ease;
}

.cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 40%,
    transparent 80%
  );
  transform: translateX(-120%);
  transition: transform 0.5s ease;
}

.cta.primary {
  border-color: var(--gold);
}

.cta.ghost {
  border-color: rgba(76, 201, 240, 0.6);
}

.cta:hover {
  transform: translateY(-2px) scale(1.015);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.75);
}

.cta:hover::before {
  transform: translateX(120%);
}

.cta.ghost:hover {
  color: var(--cyan);
}

/* FLOATING SHARDS */
.shards {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

/* MASK HOLOGRAM */
.mask-holo {
  position: absolute;
  width: 260px;
  height: 260px;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../img/mask-outline.png") center/contain no-repeat;
  opacity: 0.06;
  z-index: 4;
  animation: maskPulse 7s infinite ease-in-out;
  pointer-events: none;
  mix-blend-mode: screen;
}

@keyframes maskPulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.035;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.04);
    opacity: 0.09;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.035;
  }
}

/* CIPHER LAYER */
.cipher-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.06);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  pointer-events: none;
  mix-blend-mode: soft-light;
  padding: 40px;
  white-space: pre-wrap;
  line-height: 1.6;
  opacity: 0.18;
  animation: cipherScroll 16s linear infinite alternate;
}

@keyframes cipherScroll {
  0% {
    transform: translateY(18px);
  }
  100% {
    transform: translateY(-18px);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  #hero {
    padding-top: 62px;
  }

  .hud {
    padding: 18px 16px 26px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .hud-left,
  .hud-right {
    flex-direction: row;
    gap: 12px;
    margin-bottom: 6px;
    font-size: 0.65rem;
  }

  .center {
    margin-top: 12vh;
  }

  .mask-holo {
    width: 200px;
    height: 200px;
  }

  .cipher-layer {
    font-size: 10px;
    padding: 20px;
  }
                   }
