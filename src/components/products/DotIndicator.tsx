import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import gsap from 'gsap';

function DotIndicator({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        width: active ? 20 : 6,
        opacity: active ? 1 : 0.4,
        duration: 0.28,
        ease: "power2.out",
      });
    },
    { dependencies: [active] },
  );

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Go to image"
      className="h-[6px] rounded-full bg-black"
      style={{ width: active ? 20 : 6, opacity: active ? 1 : 0.4 }}
    />
  );
}
export default DotIndicator;