// =========================
// BOOT SEQUENCE
// =========================
window.addEventListener("load", () => {
  const boot = document.getElementById("boot");
  if (!boot) return;
  setTimeout(() => {
    boot.style.opacity = "0";
    setTimeout(() => boot.remove(), 650);
  }, 1700);
});

// =========================
// THREE.JS CORE SETUP
// =========================
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x02070a, 6, 40);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =========================
// LIGHTING
// =========================
const ambient = new THREE.AmbientLight(0xffffff, 0.22);
scene.add(ambient);

const mintLight = new THREE.PointLight(0x8eb69b, 1.4, 25);
mintLight.position.set(2.4, 3.2, 4);
scene.add(mintLight);

const tealLight = new THREE.PointLight(0x163832, 1.4, 25);
tealLight.position.set(-3.2, -2.4, 3.2);
scene.add(tealLight);

const backLight = new THREE.PointLight(0xffffff, 0.3, 30);
backLight.position.set(0, 6, -6);
scene.add(backLight);

// =========================
// FLOOR GRID
// =========================
const floorGeo = new THREE.PlaneGeometry(40, 40, 40, 40);
const floorMat = new THREE.MeshBasicMaterial({
  color: 0x06141b,
  wireframe: true,
  transparent: true,
  opacity: 0.18
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.5;
scene.add(floor);

// =========================
// CORE OBJECT GROUP
// =========================
const coreGroup = new THREE.Group();
scene.add(coreGroup);

// Hex cube (Kensano Core)
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    color: 0x050f12,
    metalness: 0.9,
    roughness: 0.18,
    emissive: 0x163832,
    emissiveIntensity: 0.12
  })
);
coreGroup.add(cube);

// Energy orb
const orb = new THREE.Mesh(
  new THREE.SphereGeometry(0.55, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0x8eb69b,
    transparent: true,
    opacity: 0.17,
    roughness: 0,
    metalness: 1,
    emissive: 0x8eb69b,
    emissiveIntensity: 0.25
  })
);
coreGroup.add(orb);

// Inner core sphere
const innerSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.26, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.06
  })
);
coreGroup.add(innerSphere);

// Energy ring
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.15, 0.02, 16, 80),
  new THREE.MeshBasicMaterial({
    color: 0x8eb69b,
    transparent: true,
    opacity: 0.32
  })
);
ring.rotation.x = Math.PI / 2;
coreGroup.add(ring);

// =========================
// PARTICLE VORTEX RING
// =========================
const particles = new THREE.Group();
scene.add(particles);

for (let i = 0; i < 140; i++) {
  const particle = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x8eb69b })
  );
  particles.add(particle);
}

function animateParticles(time) {
  const children = particles.children;
  const count = children.length;

  for (let i = 0; i < count; i++) {
    const p = children[i];
    const angle = time * 0.4 + i * 0.18;
    const radius = 2.1 + Math.sin(time * 0.6 + i * 0.25) * 0.25;

    p.position.x = Math.cos(angle) * radius;
    p.position.z = Math.sin(angle) * radius;
    p.position.y = Math.sin(time * 0.9 + i * 0.12) * 0.18;
  }
}

// =========================
// CIPHER TEXT LAYER
// =========================
const cipherLayer = document.querySelector(".cipher-layer");
if (cipherLayer) {
  const chars = "KNSN01∆µλ□■◇◆◈◉✦✧";
  let cipherText = "";
  for (let i = 0; i < 2400; i++) {
    cipherText += chars[Math.floor(Math.random() * chars.length)];
    if (i % 80 === 0) cipherText += "\n";
  }
  cipherLayer.innerText = cipherText;
}

// =========================
// FLOATING 2D SHARDS
// =========================
const shardContainer = document.querySelector(".shards");
if (shardContainer && window.gsap) {
  for (let i = 0; i < 7; i++) {
    const shard = document.createElement("div");
    shard.className = "shard";
    shard.style.position = "absolute";
    shard.style.width = `${40 + Math.random() * 30}px`;
    shard.style.height = `${70 + Math.random() * 40}px`;
    shard.style.borderRadius = "6px";
    shard.style.border = "1px solid rgba(204,208,207,0.18)";
    shard.style.background =
      "linear-gradient(145deg, rgba(218,241,222,0.18), rgba(6,20,27,0.9))";
    shard.style.backdropFilter = "blur(10px)";
    shard.style.opacity = 0.42;
    shard.style.left = Math.random() * 90 + "%";
    shard.style.top = 10 + Math.random() * 60 + "%";
    shard.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 25 - 12}deg)`;

    shardContainer.appendChild(shard);

    gsap.to(shard, {
      y: Math.random() * 80 - 40,
      x: Math.random() * 40 - 20,
      duration: 6 + Math.random() * 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

// =========================
// CAMERA INTERACTION (PARALLAX)
// =========================
document.addEventListener("mousemove", (e) => {
  const xNorm = e.clientX / window.innerWidth - 0.5;
  const yNorm = e.clientY / window.innerHeight - 0.5;

  if (window.gsap) {
    gsap.to(coreGroup.rotation, {
      y: xNorm * 0.4,
      x: -yNorm * 0.2,
      duration: 1.2,
      ease: "power2.out"
    });

    gsap.to(camera.rotation, {
      y: -xNorm * 0.35,
      x: -yNorm * 0.25,
      duration: 1.3,
      ease: "power3.out"
    });
  }
});

// =========================
// CTA MAGNETIC MICRO-EFFECT
// =========================
if (window.gsap) {
  document.querySelectorAll(".cta").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.3,
        duration: 0.25,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
    });

    btn.addEventListener("mousedown", () => {
      gsap.to(btn, { scale: 0.97, duration: 0.08 });
    });

    btn.addEventListener("mouseup", () => {
      gsap.to(btn, { scale: 1, duration: 0.16 });
    });
  });
}

// =========================
// ANIMATION LOOP
// =========================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // core rotations
  cube.rotation.x += 0.004;
  cube.rotation.y += 0.006;

  orb.rotation.y -= 0.003;
  innerSphere.rotation.y += 0.012;

  // ring pulse
  const pulse = (Math.sin(t * 2.2) + 1) / 2;
  ring.scale.set(1 + pulse * 0.15, 1, 1 + pulse * 0.15);
  ring.material.opacity = 0.15 + pulse * 0.22;

  // floor subtle scroll
  floor.rotation.z = Math.sin(t * 0.1) * 0.03;

  // cinematic camera orbit
  const orbitRadius = 5;
  camera.position.x = Math.sin(t * 0.25) * 0.8;
  camera.position.y = 1.2 + Math.sin(t * 0.18) * 0.3;
  camera.position.z = orbitRadius + Math.cos(t * 0.15) * 0.4;

  camera.lookAt(0, 0, 0);

  // particle vortex
  animateParticles(t);

  renderer.render(scene, camera);
}
animate();
