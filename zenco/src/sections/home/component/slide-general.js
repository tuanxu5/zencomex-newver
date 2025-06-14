import { Box, Card, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import { BoxEmpty } from "../../../components/view-layout/box-empty";
import { paths } from "../../../paths";
import { isValidUrl } from "./card-product";

const SliderGeneral = ({ generalList, setting, isProductRelated }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  // Cài đặt slider
  const settingsSlide = {
    dots: false,
    infinite: generalList.length > 6 || setting,
    speed: 500,
    slidesToShow: setting ? (lgUp ? 3 : 2) : 5,
    rows: setting ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: setting ? 1500 : 3000,
    draggable: setting ? true : generalList.length >= 6,
    swipeToSlide: setting ? true : generalList.length >= 6,
    arrows: false,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: setting ? 3 : 4 } },
      { breakpoint: 1200, settings: { slidesToShow: setting ? 2 : 4 } },
      { breakpoint: 1024, settings: { slidesToShow: setting ? 2 : 3 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 700, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const StyledSliderItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 1),
    display: "flex",
  }));

  return (
    <Box sx={{ borderRadius: "12px", padding: "36px 0px" }}>
      {generalList.length > 0 ? (
        <Slider {...settingsSlide} style={{ display: "flex", alignItems: "stretch" }}>
          {generalList?.map((item, index) => (
            <StyledSliderItem key={index} sx={{ flexGrow: 1, height: "100%" }}>
              <Box
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  background: "#f5f5f5",
                  padding: 1.5,
                  "&:hover": {
                    cursor: "grab",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card
                  sx={{
                    borderRadius: 0,
                    height: 210,
                    boxShadow: "none !important",
                    borderRadius: "8px",
                  }}
                >
                  <NextLink href={paths.detail(item.alias)} passHref>
                    <Stack
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        borderRadius: "50px",
                        clipPath: "inset(5px)",
                      }}
                    >
                      <LazyLoadedImage
                        src={
                          isValidUrl(item.image)
                            ? item.image
                            : `/upload/${isProductRelated ? "product" : "baiviet"}/${item.image}`
                        }
                        alt={`Hình ảnh ${item.title}`}
                        style={{ maxHeight: "100%", objectFit: "cover" }}
                      />
                    </Stack>
                  </NextLink>
                </Card>
                <Stack
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
                        fontSize: "15px !important",
                        color: "#100f0f",
                        fontWeight: 600,
                        lineHeight: 1.2,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        mt: 1.5,
                        textAlign: "start",
                      }}
                      title={item.title}
                      variant="h3"
                    >
                      {item.title}
                    </Typography>
                  </NextLink>
                  <Typography
                    sx={{
                      fontSize: "11.5px !important",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "#56575b",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      textAlign: "start",
                    }}
                    variant="h4"
                    title={isProductRelated ? item.description : item.intro}
                  >
                    {isProductRelated ? item.description : item.intro}
                  </Typography>
                </Stack>
              </Box>
            </StyledSliderItem>
          ))}
        </Slider>
      ) : (
        <BoxEmpty
          sx={{
            height: 200,
          }}
        />
      )}
    </Box>
  );
};

export default SliderGeneral;
