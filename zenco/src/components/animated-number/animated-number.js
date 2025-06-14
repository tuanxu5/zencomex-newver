import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const AnimatedNumber = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false); // Đánh dấu đã chạy hay chưa
  const ref = useRef(null);

  useEffect(() => {
    if (hasRun) return; // Nếu đã chạy rồi thì không chạy lại nữa

    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000; // 2 giây
          const increment = end / (duration / 10);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
              setHasRun(true); // Đánh dấu đã chạy xong
              observerInstance.unobserve(entry.target); // Ngừng theo dõi sau khi chạy
            } else {
              setCount(Math.floor(start));
            }
          }, 10);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value, hasRun]);

  return (
    <motion.div ref={ref} style={{ fontSize: "3rem", fontWeight: 700, textAlign: "center" }}>
      <div>
        {count}
        {suffix}
      </div>
      <div
        style={{
          width: "100px",
          height: "3px",
          backgroundColor: "#00a1ff",
          margin: "0px auto 0",
        }}
      />
    </motion.div>
  );
};
