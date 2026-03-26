const logos = document.querySelectorAll("[data-logo]");

const readyClass = "logo-ready";
const initialClass = "logo-initial";
const hoverClass = "logo-hover";

const applyReadyState = (lines) => {
  lines.forEach((line) => {
    line.classList.remove(initialClass, hoverClass);
    line.classList.add(readyClass);
  });
};

logos.forEach((logo) => {
  const lines = logo.querySelectorAll(".spinner-line");

  if (!lines.length) {
    return;
  }

  lines.forEach((line) => line.classList.add(initialClass));

  window.setTimeout(() => {
    applyReadyState(lines);
  }, 2850);

  const triggerHoverAnimation = () => {
    const isAnimating = Array.from(lines).some((line) =>
      line.classList.contains(hoverClass),
    );

    if (isAnimating) {
      return;
    }

    lines.forEach((line) => {
      line.classList.remove(initialClass, readyClass);
      line.classList.add(hoverClass);
    });

    window.setTimeout(() => {
      applyReadyState(lines);
    }, 3600);
  };

  logo.addEventListener("mouseenter", triggerHoverAnimation);
  logo.addEventListener("focusin", triggerHoverAnimation);
});
