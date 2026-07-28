import gsap from "gsap";

interface EnvelopeElements {
  flap: HTMLElement;
  seal: HTMLElement;
  letter: HTMLElement;
  envelope: HTMLElement;
}

export function createEnvelopeOpenTimeline(
  elements: EnvelopeElements,
  onComplete?: () => void,
) {
  const tl = gsap.timeline({ onComplete });

  tl.to(elements.seal, {
    scale: 0,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
  })
    .to(
      elements.flap,
      {
        rotateX: 175,
        transformOrigin: "top center",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.1",
    )
    .to(
      elements.envelope,
      {
        y: -8,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3",
    )
    .to(
      elements.letter,
      {
        y: -200,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
      },
      "-=0.35",
    )
    .to(
      elements.letter,
      {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.out",
      },
      "-=0.15",
    );

  return tl;
}

export function createEnvelopeEntranceTimeline(elements: EnvelopeElements) {
  gsap.set(elements.letter, { opacity: 0.3, y: 20 });

  return gsap.timeline().from(elements.envelope, {
    y: 60,
    opacity: 0,
    scale: 0.92,
    duration: 0.8,
    ease: "power3.out",
    clearProps: "filter",
  });
}
