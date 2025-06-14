import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import LazyLoadedImage from "../../components/lazy-loaded-image";
import { TextAnimationFadeUp } from "../../components/section-animate";
import { paths } from "../../paths";
import axiosInstance from "../../utils/axios";
import { isValidUrl } from "./component/card-product";

const HomeSlideNews = () => {
  const [menuGeneral, setMenuGeneral] = useState([
    {
      id: 2,
      title: "Tin tức",
      alias: "tin-tuc",
      children: [],
    },
  ]);

  const getMenuList = async () => {
    try {
      const dataPromises = menuGeneral?.map(async (item) => {
        const response = await axiosInstance.get(`/general/${item.alias}`);
        if (response && response.data.DT) {
          return { ...item, children: response.data.DT };
        }
        return item;
      });
      const updatedMenu = await Promise.all(dataPromises);
      setMenuGeneral(updatedMenu);
    } catch (error) {
      console.log("Error fetching menu list:", error);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: "-36px",
          height: "36px",
          width: "36px",
          borderRadius: "100px",
          top: "calc(50% - 50px)",
          cursor: "pointer",
          background: "#ffffff",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          zIndex: "999",
        }}
        onClick={onClick}
      >
        <ArrowRightRoundedIcon sx={{ color: "#6c737f", fontSize: "36px" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          left: "-36px",
          height: "36px",
          width: "36px",
          borderRadius: "100px",
          top: "calc(50% - 50px)",
          cursor: "pointer",
          background: "#ffffff",
          boxShadow: "rgba(99, 99, 99, 0.15) 0px 2px 8px 0px",
          zIndex: "999",
        }}
        onClick={onClick}
      >
        <ArrowLeftRoundedIcon sx={{ color: "#6c737f", fontSize: "36px" }} />
      </div>
    );
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: "16px", md: "56px !important" },
        pt: { xs: 4, md: "60px !important" },
        pb: { xs: 10, md: "100px !important" },
      }}
    >
      {menuGeneral?.map((item, index) => (
        <Box key={index}>
          <TextAnimationFadeUp>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: "1.25rem !important",
                  backgroundImage: "linear-gradient(135deg, #00a1ff 0%, #004db6 100%)",
                  width: "fit-content",
                  padding: "10px 20px",
                  color: "#fff",
                  borderRadius: "28px 0 28px 0px",
                }}
                variant="h2"
              >
                TIN TỨC MỚI
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9375rem !important",
                  fontWeight: 600,
                  textAlign: "center",
                  mt: 2,
                  color: "#004db6"
                }}
              >
                Cập nhật bài viết mới từ Zencomex để không bỏ lỡ thông tin quan trọng về sản phẩm cho công trình của bạn!
              </Typography>
            </Box>
            <Box sx={{ borderRadius: "12px", width: "100%", mt: 5, px: { xs: 4, md: 6 } }}>
              <Slider {...sliderSettings}>
                {item?.children?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: "100%",
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    <Card
                      sx={{
                        boxShadow: "none !important",
                        borderRadius: "4px",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <NextLink href={paths.detail(item.alias)} passHref>
                        <Stack
                          sx={{
                            width: "100%",
                            position: "relative",
                            overflow: "hidden",
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                            aspectRatio: "1",
                          }}
                        >
                          <LazyLoadedImage
                            src={isValidUrl(item.image) ? item.image : `/upload/baiviet/${item.image}`}
                            alt={`Hình ảnh ${item.title}`}
                          />
                        </Stack>
                      </NextLink>
                    </Card>
                    <Box
                      spacing={1}
                      sx={{
                        width: "100%",
                        height: "100px",
                      }}
                    >
                      <NextLink
                        href={paths.detail(item.alias)}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px !important",
                            color: "#100f0f",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            mt: 1,
                            textAlign: "start",
                            "&:hover": {
                              color: "#004db6",
                            }
                          }}
                          title={item.title.toUpperCase()}
                          variant="h3"
                        >
                          {item.title.toUpperCase()}
                        </Typography>
                      </NextLink>
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: "13px !important",
                          fontWeight: 400,
                          lineHeight: 1.2,
                          color: "#56575b",
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                          textAlign: "justify",
                        }}
                        variant="h4"
                        title={item.intro}
                      >
                        {item.intro}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          </TextAnimationFadeUp>
        </Box>
      ))}
    </Container>
  );
};

export default HomeSlideNews;
