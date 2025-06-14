import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Box, Card, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import LazyLoadedImage from "../../components/lazy-loaded-image";
import { TextAnimationFadeUp } from "../../components/section-animate";
import { paths } from "../../paths";
import axiosInstance from "../../utils/axios";
import { isValidUrl } from "./component/card-product";

const HomeSlideServices = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuGeneral, setMenuGeneral] = useState([
    {
      id: 2,
      title: "Tin tức",
      alias: "dich-vu",
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
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
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
          infinite: true,
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
        borderRadius: "16px",
        backgroundImage: "linear-gradient(135deg, #f0f0f0 0%, #ecebee 25%, #f7f7f7 25%, #e7e7e7 100%)",
        px: { xs: "16px", md: "56px !important" },
        pt: { xs: 4, md: "60px !important" },
        pb: { xs: 10, md: "100px !important" },
      }}
    >
      {menuGeneral?.map((item, index) => (
        <Box key={index}>
          <TextAnimationFadeUp>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              sx={{ px: { xs: 0, md: 6 } }}
            >
              <Typography
                sx={{
                  fontSize: "1.25rem !important",
                  fontWeight: 700,
                  textAlign: "center",
                  backgroundImage: "linear-gradient(135deg, #00a1ff 0%, #004db6 100%)",
                  width: "fit-content",
                  padding: "10px 20px !important",
                  color: "#fff",
                  borderRadius: "28px 0 28px 0px",
                  order: { xs: 1, md: 2 },
                  whiteSpace: "nowrap",
                }}
                variant="h2"
              >
                DỊCH VỤ CỦA CHÚNG TÔI
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.9375rem !important",
                  fontWeight: 600,
                  textAlign: "start",
                  mt: { xs: 1, md: 0 },
                  order: { xs: 2, md: 1 },
                  width: { xs: "100%", sm: "70%" },
                  color: "#004db6",
                }}
              >
                Chúng tôi là đơn vị chuyên sản xuất và cung cấp các loại vật tư xây dựng hệ M&E chất lượng cao, đáp ứng
                nhu cầu đa dạng cho các công trình dân dụng và công nghiệp.
              </Typography>
            </Stack>

            <Box sx={{ borderRadius: "12px", width: "100%", mt: 5, px: { xs: 4, md: 6 } }}>
              <Slider {...sliderSettings}>
                {item?.children?.map((item, index) => (
                  <Box key={index} sx={{ height: "100%", px: { xs: 1, sm: 2 } }}>
                    <Card
                      sx={{
                        borderRadius: "4px",

                        boxShadow: "none",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <NextLink href={paths.detail(item.alias)} passHref>
                        <Box
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
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                      </NextLink>
                    </Card>

                    {/* Nội dung */}
                    <Box sx={{ width: "100%", height: "100px", mt: 1 }}>
                      <NextLink href={paths.detail(item.alias)} passHref style={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: 1.4,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            textAlign: "start",
                            color: "text.primary",
                            "&:hover": { color: "#004db6" },
                          }}
                          variant="h6"
                          title={item.title}
                        >
                          {item.title.toUpperCase()}
                        </Typography>
                      </NextLink>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 400,
                          lineHeight: 1.2,
                          color: "text.secondary",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                          textAlign: "justify",
                          mt: 1,
                        }}
                        variant="body2"
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

export default HomeSlideServices;
