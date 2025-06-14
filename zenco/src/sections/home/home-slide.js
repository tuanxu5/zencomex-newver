import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LazyLoadedImageBanner from "../../components/lazy-loaded-image-banner";
import axiosInstance from "../../utils/axios";

const HomeSlide = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const getAllSlides = async () => {
      try {
        const result = await axiosInstance.get("/home/slides");
        if (result?.data?.DT) {
          setSlides(result.data.DT);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    getAllSlides();
  }, []);

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const renderHeight = () => {
    if (lgUp) return 750;
    else if (mdUp) return 600;
    else if (smUp) return 350;
    return 200;
  };

  return (
    <Box position="relative" width="100%" height={renderHeight()}>
      <div style={{ overflow: "hidden", position: "relative", cursor: "pointer" }}>
        <div className="embla__container" style={{ display: "flex" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide"
              style={{
                flex: "0 0 100%",
                minWidth: "0",
                width: "100%",
                height: renderHeight(),
              }}
            >
              <LazyLoadedImageBanner src={`/upload/${slide.link}`} />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default HomeSlide;
