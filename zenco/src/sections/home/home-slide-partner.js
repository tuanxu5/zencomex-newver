import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { TextAnimationFadeUp } from "../../components/section-animate";
import { BoxEmpty } from "../../components/view-layout/box-empty";
import axiosInstance, { BASE_URL } from "../../utils/axios";

const HomeSlidePartner = () => {
  const containerRef = useRef(null);
  const [filesPartner, setFilesPartner] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(8); // fallback ban đầu

  const sliderSettings = {
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    rows: 1,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2000,
    draggable: true,
    swipeToSlide: true,
    arrows: false,
  };

  // Fetch images of partners
  const getImagesPartner = async () => {
    try {
      const images = await axiosInstance.get("image/list?type=partner");
      if (images?.data?.DT) {
        const newData = images.data.DT?.map((item) => ({
          id: item.id,
          title: item.ten_vi,
          image: item.link,
        }));
        setFilesPartner(newData);
      }
    } catch (error) {
      console.log("Error fetching partner images:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getImagesPartner();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 210; // px
        const newSlides = Math.floor(containerWidth / itemWidth) || 1;
        setSlidesToShow(newSlides);
      }
    };

    updateSlidesToShow();

    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  return (
    <Container
      maxWidth="xxl"
      sx={{
        padding: "50px 0px !important",
        textAlign: "center",
      }}
      style={{
        background: "#f9f9f9",
        padding: "28px 10px",
        borderRadius: "16px",
      }}
    >
      <TextAnimationFadeUp>
        <Typography
          sx={{
            fontSize: "1.5rem !important",
            fontWeight: 700,
            textAlign: "center",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "85%",
              height: "3px",
              backgroundColor: "#004db6",
              bottom: "-10px",
              left: "7.5%",
            },
          }}
          variant="h2"
        >
          ĐỐI TÁC CỦA CHÚNG TÔI
        </Typography>
        <Box
          ref={containerRef}
          sx={{
            mt: 5,
          }}
        >
          {filesPartner.length > 0 ? (
            <Slider
              {...sliderSettings}
              style={{
                background: "#f9f9f9",
                padding: "28px 10px",
                borderRadius: "16px",
              }}
            >
              {filesPartner?.map((item) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      backgroundColor: "#f9f9f9",
                      mx: "28px",
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={`${BASE_URL}/upload/${item.image}`}
                      alt={item.title}
                      width={200}
                      height={70}
                      style={{
                        width: "100%",
                        mixBlendMode: "multiply",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Slider>
          ) : (
            <BoxEmpty
              sx={{
                height: 200,
              }}
              note={"Danh sách đối tác đang chờ cập nhật..."}
            />
          )}
        </Box>
      </TextAnimationFadeUp>
    </Container>
  );
};

export default HomeSlidePartner;
