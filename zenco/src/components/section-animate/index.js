import { useEffect, useRef, useState } from "react";

export const TextAnimationFadeUp = ({ children, style }) => {
  const [hasAppeared, setHasAppeared] = useState(false); // Chỉ cập nhật 1 lần
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAppeared) {
            setHasAppeared(true);
            observer.disconnect(); // Ngắt observer sau lần đầu xuất hiện
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, [hasAppeared]);

  return (
    <div className={`fadeInSection ${hasAppeared ? "isVisibleFadeInSection" : ""}`} style={style} ref={domRef}>
      {children}
    </div>
  );
};
