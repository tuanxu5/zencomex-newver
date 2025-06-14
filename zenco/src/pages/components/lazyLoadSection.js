import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LazyLoadSection({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: true, // Chỉ kích hoạt một lần
    threshold: 0.1, // Kích hoạt khi 10% phần tử vào viewport
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
}
