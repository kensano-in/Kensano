/* ======================================================
   KENSANO — PARALLAX + HOLOGRAM MOTION
   ====================================================== */

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const shards = document.querySelectorAll(".shard");

    shards.forEach(shard => {
        shard.style.transform = `translate(${x}px, ${y}px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
});
