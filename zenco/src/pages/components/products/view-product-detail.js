import { Box, Button, Container, Grid, ListItem, ListItemText, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { ToastMessage } from "../../../components/custom-toast";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import { Scrollbar } from "../../../components/scrollbar";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import ShareButtons from "../../../components/shareButton";
import TiptapEditor from "../../../components/tiptap/tiptapEditor";
import { BoxEmpty } from "../../../components/view-layout/box-empty";
import axiosInstance, { BASE_URL } from "../../../utils/axios";

const defaultBreadcrumb = [
  {
    id: 1,
    title: "Trang chủ",
    alias: "trang-chu",
  },
  {
    id: 2,
    title: "Sản phẩm",
    alias: "san-pham",
  },
];
const ViewProductDetail = (props) => {
  const [linkZalo, setLinkZalo] = useState("");
  const { overviewInfo } = useSelector((state) => state.information);

  const handleParseHtml = (data) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    doc.querySelectorAll("[style]").forEach((el) => {
      el.style.fontFamily = `"Arial", serif`;
    });
    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (!!overviewInfo && Object.keys(overviewInfo).length > 0) {
      const zalo = overviewInfo.socials.filter((i) => i.ten_vi === "Zalo");
      if (!!zalo) {
        setLinkZalo(zalo[0]?.noidung_vi);
      }
    }
  }, [overviewInfo]);

  const handleOpenZalo = () => {
    if (linkZalo !== "") {
      window.open(linkZalo, "_blank");
    } else {
      ToastMessage("Link Zalo đang chờ cập nhật", "warning", "bottom-right");
    }
  };
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data, setBreadcrumbsList } = props;
  const [productRelated, setProductRelated] = useState([]);
  const product = {
    name: data.title,
    price: data.price,
    description: data.intro,
    images: data.attach ? [data.image].concat(data.attach) : [data.image],
  };
  // Get products
  const checkId = () => {
    if (data) {
      if (data.parentChild) {
        return `&id_cat=${data.parentChild.id}`;
      }
      if (data.parent) {
        return `&id_list=${data.parent.id}`;
      }
    }
  };

  const getProductRelated = async () => {
    try {
      const products = await axiosInstance.get(`/product/list?${checkId()}?page=0&pageSize=7`);
      if (products && products.data && products.data.DT) {
        const newProducts = products.data.DT?.map((item) => {
          return {
            id: item.id,
            title: item.ten_vi,
            price: item.price,
            description: item.mota_vi,
            image: item.photo,
            alias: item.tenkhongdau,
          };
        }).filter((item) => item.id !== data.id);
        setProductRelated(newProducts);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProductRelated();
    setSelectedImageIndex(0);
  }, [data]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const changeBreadScrums = () => {
    setBreadcrumbsList(() => {
      if (data.parentChild) {
        return [
          ...defaultBreadcrumb,
          {
            id: data.parent.id,
            title: data.parent.title,
            alias: data.parent.alias,
            type: data.parent.type,
          },
          {
            id: data.parentChild.id,
            title: data.parentChild.title,
            alias: data.parentChild.alias,
            type: data.parentChild.type,
          },
          {
            id: data.id,
            title: data.title,
            alias: data.alias,
            type: data.type,
          },
        ];
      } else {
        return [
          ...defaultBreadcrumb,
          {
            id: data.parent.id,
            title: data.parent.title,
            alias: data.parent.alias,
            type: data.parent.type,
          },
          {
            id: data.id,
            title: data.title,
            alias: data.alias,
            type: data.type,
          },
        ];
      }
    });
  };

  useEffect(() => {
    changeBreadScrums();
  }, [data]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: "16px", md: "56px !important" },
          pt: { xs: 4, md: "60px !important" },
          pb: { xs: 10, md: "100px !important" },
        }}
      >
        <Grid container spacing={5}>
          {/* Hình ảnh sản phẩm chính */}
          <Grid item xs={12} sm={8} md={7} sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: smDown ? "column" : "row", // Mobile: cột (ảnh lớn trên, thumbnails dưới); Desktop: hàng ngang
                width: "100%",
                gap: smDown ? 1 : 0, // Giữ khoảng cách hợp lý giữa ảnh lớn và danh sách ảnh nhỏ
                position: "relative",
              }}
            >
              {/* Danh sách thumbnails */}
              <Scrollbar
                sx={{
                  order: smDown ? 2 : 1, // Mobile: xuất hiện dưới ảnh lớn; Desktop: xuất hiện trước (bên trái ảnh lớn)
                  maxHeight: smDown ? "100px" : "60vh",
                  width: smDown ? "100%" : 100,
                  overflowX: smDown ? "auto" : "hidden", // Cuộn ngang trên mobile
                  mt: smDown ? 2 : 0, // Tạo khoảng cách với ảnh lớn trên mobile
                  "&:hover::-webkit-scrollbar": {
                    width: "4px",
                    height: "4px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: smDown ? "row" : "column", // Mobile: danh sách ảnh nằm ngang, Desktop: dọc
                    gap: 2,
                    width: "100%",
                  }}
                >
                  {product?.images?.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        overflow: "hidden",
                        borderRadius: "8px",
                        border: selectedImageIndex === index ? "3px solid #00a1ff" : "1px solid #E5E7EB",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onMouseEnter={() => setSelectedImageIndex(index)}
                    >
                      <LazyLoadedImage
                        src={index === 0 ? `/upload/product/${image}` : `/upload/${image}`}
                        alt={image}
                      />
                    </Box>
                  ))}
                </Box>
              </Scrollbar>

              <Carousel
                autoPlay={false}
                index={selectedImageIndex}
                onChange={(index) => setSelectedImageIndex(index)}
                indicators={false}
                sx={{
                  order: smDown ? 1 : 2,
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
              >
                {product?.images?.map((image, index) => (
                  <Image
                    key={index}
                    width={1000}
                    height={1000}
                    radioGroup="1"
                    src={index !== 0 ? `${BASE_URL}/upload/${image}` : `${BASE_URL}/upload/product/${image}`}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      border: "1px solid #E5E7EB",
                      borderRadius: "16px",
                      aspectRatio: "1/1",
                    }}
                  />
                ))}
              </Carousel>
            </Box>
          </Grid>

          {/* Chi tiết sản phẩm */}
          <Grid item xs={12} md={5.2} lg={5}>
            <TextAnimationFadeUp>
              <Typography variant="h1" gutterBottom sx={{ fontSize: "2rem !important", fontWeight: "700" }}>
                {product.name.toUpperCase()}
              </Typography>
              <Typography
                variant="body"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => handleOpenZalo()}
              >
                GIÁ SẢN PHẨM: LIÊN HỆ
              </Typography>
              {product.description && product.description !== "" && (
                <>
                  <hr style={{ height: "1.5px", background: "#f4f4f4", border: "none", marginTop: "20px" }} />
                  <Box mt={3}>
                    <TiptapEditor expand={true} contentEditor={handleParseHtml(product.description)} isDisable={true} />
                  </Box>
                </>
              )}
              <Box mt={10}>
                <Button
                  onClick={() => handleOpenZalo()}
                  sx={{
                    color: "#fff",
                    background: "#004db6",
                    padding: "14px 48px",
                    borderRadius: "100px",
                    "&:hover": {
                      background: "#004db6",
                    },
                  }}
                >
                  LIÊN HỆ ĐỂ NHẬN TƯ VẤN
                </Button>
              </Box>
              <Box mt={5}>
                <ShareButtons url={`${process.env.NEXT_PUBLIC_API_URL}/${data.alias}`} title={data.title} />
              </Box>
            </TextAnimationFadeUp>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {/* Hình ảnh sản phẩm chính */}
          <Grid item xs={12} sm={8} md={7} sx={{ position: "relative" }}>
            <Box mt={10}>
              <Container maxWidth="xl" sx={{ padding: "0px !important" }}>
                {data.description && data.description !== "" ? (
                  <Box>
                    <TextAnimationFadeUp>
                      <Typography
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        MÔ TẢ SẢN PHẨM
                      </Typography>
                      <Box mt={2}>
                        <TiptapEditor
                          expand={false}
                          contentEditor={handleParseHtml(data.description)}
                          isDisable={true}
                        />
                      </Box>
                    </TextAnimationFadeUp>
                  </Box>
                ) : (
                  <Box sx={{ height: "100%" }}>
                    <TextAnimationFadeUp>
                      <Typography
                        variant="h3"
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        MÔ TẢ SẢN PHẨM
                      </Typography>
                      <Box width={"40%"} m="auto" mt={20}>
                        <BoxEmpty note={"CHƯA CÓ MÔ TẢ"} />
                      </Box>
                    </TextAnimationFadeUp>
                  </Box>
                )}
              </Container>
            </Box>
          </Grid>

          <Grid item xs={12} md={5.2} lg={5}>
            <Box mt={10}>
              <TextAnimationFadeUp>
                {productRelated.length > 0 && (
                  <Stack>
                    <Box>
                      <Typography
                        variant="h2"
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        SẢN PHẨM LIÊN QUAN
                      </Typography>
                    </Box>
                    {productRelated.length > 0 ? (
                      <div style={{ padding: "0px", marginTop: "12px" }}>
                        {productRelated &&
                          productRelated?.map((item) => {
                            return (
                              <ListItem
                                mt={2}
                                key={item.id}
                                style={{ padding: "6px 0px", display: "flex", gap: "10px", alignItems: "start" }}
                              >
                                <Box
                                  style={{
                                    objectFit: "cover",
                                    width: "90px",
                                    height: "90px",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <Image
                                    src={`${BASE_URL}/upload/product/${item.image}`}
                                    alt={`Hình ảnh ${item.image}`}
                                    width={90}
                                    height={90}
                                    style={{
                                      objectFit: "cover",
                                      clipPath: "inset(3px)",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </Box>

                                <ListItemText
                                  disableTypography
                                  primary={
                                    <NextLink
                                      href={item.alias}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          fontSize: "1rem !important",
                                          fontWeight: 600,
                                          "&:hover": {
                                            color: "#004db6",
                                          },
                                        }}
                                        variant="h3"
                                      >
                                        {item.title.toUpperCase()}
                                      </Typography>
                                    </NextLink>
                                  }
                                  secondary={
                                    <Typography
                                      color="#004db6"
                                      sx={{
                                        fontSize: "0.75rem !important",
                                        fontWeight: 600,
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2, // Giới hạn tối đa 2 dòng
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        mt: 1,
                                      }}
                                    >
                                      LIÊN HỆ
                                    </Typography>
                                  }
                                  sx={{ pr: 2 }}
                                />
                              </ListItem>
                            );
                          })}
                      </div>
                    ) : (
                      <Box width={"40%"} m="auto">
                        <BoxEmpty note={"Chưa có bài viết"} />
                      </Box>
                    )}
                  </Stack>
                )}
              </TextAnimationFadeUp>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewProductDetail;
