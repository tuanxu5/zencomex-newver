import { Box, Chip, Container, Grid, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import ShareButtons from "../../../components/shareButton";
import { BoxEmpty } from "../../../components/view-layout/box-empty";
import axiosInstance, { BASE_URL } from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";
import ViewProductDescription from "../products/view-product-description";

const ViewGeneralDetail = ({ detail, setBreadcrumbsList }) => {
  const [news, setNews] = useState([]);

  const getNewsList = async () => {
    try {
      const response = await axiosInstance.get(`/general/tin-tuc?page=0&pageSize=7`);
      if (response && response.data && response.data.DT) {
        setNews(response.data.DT);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setBreadcrumbsList([
      {
        id: 1,
        title: "Trang chủ",
        alias: "trang-chu",
      },
      {
        id: 2,
        title: detail.parent.title,
        alias: detail.parent.alias,
      },
      {
        id: 3,
        title: detail.title,
        alias: detail.alias,
      },
    ]);
    getNewsList();
  }, [detail]);

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
          <Grid item xs={12} sm={8} lg={8.5} sx={{ order: { xs: 1, sm: 1 } }}>
            <Box>
              <Box>
                <Typography variant="h1" sx={{ fontSize: "2rem !important", fontWeight: "700" }}>
                  {detail.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#9fa3a7",
                    fontWeight: 500,
                  }}
                >
                  {formatTimeDMY(detail.dateCreate)}
                </Typography>
              </Box>
              {detail.intro && (
                <Box
                  sx={{
                    border: "2px solid #E8E8E8",
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <TextField
                    disabled
                    value={detail.intro}
                    multiline
                    sx={{
                      fontSize: 14,
                      color: "blue",
                      width: "100%",
                      "& .MuiInputBase-input": {
                        padding: 1,
                      },
                      "& .Mui-disabled": {
                        border: "none",
                        WebkitTextFillColor: "black !important", // Ensure the text color is applied
                      },
                      "& fieldset": {
                        border: "none", // Remove border
                      },
                    }}
                    InputProps={{
                      disableUnderline: true, // Remove underline
                    }}
                  />
                </Box>
              )}
              {detail && detail.description && detail.description.length > 0 && (
                <Box>
                  <ViewProductDescription data={detail.description} type={detail.type} />
                </Box>
              )}
              <Box mt={2} ml={1}>
                <ShareButtons url={`${process.env.NEXT_PUBLIC_API_URL}/${detail.alias}`} title={detail.title} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={3.5} sx={{ order: { xs: 2, sm: 2 } }}>
            {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "48px",
              }}
            >
              <Stack>
                <Typography
                  variant="h3"
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  CHUYÊN MỤC
                </Typography>
                <Box pt={2} style={{ display: "flex", gap: "8px 4px", flexDirection: "column" }}></Box>
              </Stack>
            </Box> */}
            <TextAnimationFadeUp>
              <Box
                sx={{
                  width: "100%",
                  // mt: 5,
                }}
              >
                <Stack>
                  <Typography
                    variant="h2"
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                    }}
                  >
                    BÀI VIẾT GẦN ĐÂY
                  </Typography>
                  <Box pt={2} style={{ display: "flex", gap: "8px 4px", flexDirection: "column" }}>
                    {news.length > 0 ? (
                      <div style={{ padding: "0px", marginTop: "12px" }}>
                        {news &&
                          news?.map((item) => {
                            return (
                              <ListItem
                                mt={2}
                                key={item.id}
                                style={{ padding: "6px 0px", display: "flex", gap: "10px" }}
                              >
                                <Box
                                  style={{
                                    objectFit: "cover",
                                    width: "64px",
                                    height: "64px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <Image
                                    src={`${BASE_URL}/upload/baiviet/${item.image}`}
                                    alt={`Hình ảnh ${item.image}`}
                                    width={64}
                                    height={64}
                                    style={{
                                      objectFit: "cover",
                                      clipPath: "inset(3px)",
                                      borderRadius: "16px",
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
                                          fontSize: "10px",
                                          fontWeight: 600,
                                        }}
                                      >
                                        Marketing ZCG
                                      </Typography>
                                      <Typography
                                        sx={{
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          fontSize: "0.875rem !important",
                                          fontWeight: 600,
                                          "&:hover": {
                                            color: "#004db6",
                                          },
                                        }}
                                        variant="h3"
                                      >
                                        {item.title}
                                      </Typography>
                                    </NextLink>
                                  }
                                  secondary={
                                    <Typography
                                      color="#9fa3a7"
                                      sx={{ whiteSpace: "nowrap", fontSize: "11px" }}
                                      variant="caption"
                                    >
                                      {formatTimeDMY(item.dateUpdate)}
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
                  </Box>
                </Stack>
              </Box>
            </TextAnimationFadeUp>
            <TextAnimationFadeUp>
              <Box
                sx={{
                  width: "100%",
                  mt: 5,
                }}
              >
                <Stack>
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                    }}
                  >
                    TỪ KHÓA
                  </Typography>
                  <Box pt={2} style={{ display: "flex", gap: "8px 4px", gap: "8px", flexWrap: "wrap" }}>
                    {detail?.keywordSeo &&
                      detail?.keywordSeo
                        ?.split(/\s*,\s*/)
                        ?.filter(Boolean)
                        ?.map((item, index) => {
                          return (
                            // <NextLink href={`/tin-tuc?keywords=${item?.toLowerCase()
                            //   ?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            //   ?.replace(/\s+/g, "-")
                            //   ?.replace(/[^a-z0-9-]/g, "")}`} passHref>
                            <NextLink key={index} href={`/tin-tuc?keywords=${item}`} passHref>
                              <Chip
                                sx={{
                                  width: "fit-content",
                                  height: "34px",
                                  padding: "4px",
                                  cursor: "pointer",
                                  backgroundColor: "#f4f4f4",
                                  color: "#56575b",
                                  fontSize: "12px",
                                  "&:hover": {
                                    backgroundColor: "#004db620",
                                    color: "#004db6",
                                  },
                                }}
                                label={item}
                                onClick={() => {}}
                              />
                            </NextLink>
                          );
                        })}
                  </Box>
                </Stack>
              </Box>
            </TextAnimationFadeUp>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewGeneralDetail;
