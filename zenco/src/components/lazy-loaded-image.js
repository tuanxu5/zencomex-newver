import Image from "next/image";
import { BASE_URL } from "../utils/axios";

const LazyLoadedImage = ({ src, alt, blurDataURL }) => {
  const url = BASE_URL.concat(src);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        aria-hidden={false}
        src={url}
        alt={alt}
        fill
        style={{ objectFit: "center" }}
        loading="lazy"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default LazyLoadedImage;
