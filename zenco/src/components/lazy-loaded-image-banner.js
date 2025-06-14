import Image from "next/image";
import { BASE_URL } from "../utils/axios";

const LazyLoadedImageBanner = ({ src }) => {
  const url = BASE_URL.concat(src);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "100%" }}>
      <picture>
        <Image src={url} fill alt="Banner website zenco" priority={true} />
      </picture>
    </div>
  );
};

export default LazyLoadedImageBanner;
