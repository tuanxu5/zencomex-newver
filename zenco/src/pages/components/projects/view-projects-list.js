import { Box, Card, Chip, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import PaginationComponent from "../../../components/panigation";
import TiptapEditor from "../../../components/tiptap/tiptapEditor";
import { paths } from "../../../paths";
import { isValidUrl } from "../../../sections/home/component/card-product";
import axiosInstance from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";
import CardNewList from "../general/view-news-list";

const ViewProjectsList = ({ item, setBreadcrumbsList, tag }) => {
  const { allCategory } = useSelector((state) => state.product);
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  useEffect(() => {
    setBreadcrumbsList([
      {
        id: 1,
        title: "Trang chủ",
        alias: "trang-chu",
      },
      {
        id: 2,
        title: item.title,
        alias: item.alias,
      },
    ]);
  }, [item]);

  //------------ Pagination ------------//
  const defaultPage = {
    pageSize: 30,
    pageIndex: 1,
  };
  const [page, setPage] = useState(defaultPage);
  const [totalPage, setTotalPage] = useState(2);
  const [generals, setGenerals] = useState([]);
  const [tags, setTags] = useState([]);
  const [news, setNews] = useState([]);

  const handlePageChange = (value) => {
    setPage({ ...page, pageIndex: value });
  };

  const getGeneralList = async () => {
    if (item) {
      try {
        const response = await axiosInstance.get(
          `/general/${item.alias}?page=${page.pageIndex - 1}&pageSize=${page.pageSize}&tag=${tag}`
        );
        if (response && response.data && response.data.DT) {
          setTotalPage(Math.ceil(response.data.total / page.pageSize));
          setGenerals(response.data.DT);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const getNewsList = async () => {
    if (item && item.alias !== "tin-tuc") {
      try {
        const response = await axiosInstance.get(`/general/tin-tuc?page=0&pageSize=10`);
        if (response && response.data && response.data.DT) {
          setNews(response.data.DT);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const getAllTag = async () => {
    if (item) {
      try {
        const response = await axiosInstance.get(`/general/tag/${item.alias}`);
        if (response && response.data && response.data.DT) {
          const data = response.data.DT;
          const newData = [];
          data?.map((item) => {
            const tags = item.keywords.split(",");
            newData.push({
              keywords: tags[0],
              tenkhongdau: item.tenkhongdau,
            });
          });
          const filteredItems = newData.reduce((acc, current) => {
            const normalizedKeyword = current.keywords.trim().toLowerCase();

            // Tìm xem phần tử đã tồn tại trong danh sách hay chưa
            const existingItem = acc.find((item) => item.keywords.trim().toLowerCase() === normalizedKeyword);

            if (existingItem) {
              // Nếu đã tồn tại, tăng số lượng
              existingItem.count += 1;
            } else {
              // Nếu chưa tồn tại, thêm vào danh sách và đặt số lượng là 1
              acc.push({ ...current, count: 1 });
            }

            return acc;
          }, []);
          setTags(filteredItems);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    setPage(defaultPage);
  }, [item]);

  useEffect(() => {
    getGeneralList();
    getAllTag();
    getNewsList();
  }, [page]);

  return (
    <Container maxWidth="xl" sx={{ padding: "60px 56px 100px 56px !important" }}>
      <Grid container>
        <Grid item xs={12} sm={4} lg={3} sx={{ order: { xs: 2, sm: 1 } }}>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
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
                Danh mục sản phẩm
              </Typography>
              <Box pt={2} style={{ display: "flex", gap: "8px 4px", flexDirection: "column" }}>
                {allCategory?.map((tag, index) => {
                  return (
                    <NextLink key={index} href={tag.tenkhongdau}>
                      <Chip
                        sx={{
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
                        label={tag.ten_vi + ` (${tag?.childrenProduct?.length})`}
                        onClick={() => {}}
                      />
                    </NextLink>
                  );
                })}
              </Box>
            </Stack>
            <CardNewList news={news} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} lg={9} sx={{ order: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              ml: smDown ? 0 : 6,
            }}
          >
            <>
              <Typography display="none" variant="h1">
                {item.title}
              </Typography>
              <Grid container columnSpacing={2} rowSpacing={3} alignItems="stretch">
                {generals?.map((item) => {
                  return (
                    <Grid item key={item.id} xs={12} lg={6}>
                      <Card
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          height: "100%",
                          overflow: "hidden",
                          transition: "transform 0.4s ease-in-out",
                          padding: "12px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                          position: "relative",
                        }}
                      >
                        <NextLink href={paths.detail(item.alias)} legacyBehavior>
                          <Stack direction="column" gap={2} width={"100%"}>
                            <Card
                              sx={{
                                boxShadow: "none !important",
                                borderRadius: "8px !important",
                              }}
                            >
                              <Box
                                style={{
                                  height: "220px",
                                  boxShadow: "none !important",
                                  borderRadius: "0px !important",
                                }}
                              >
                                <LazyLoadedImage
                                  src={isValidUrl(item.image) ? item.image : `/upload/baiviet/${item.image}`}
                                  alt={`Hình ảnh ${item.title}`}
                                />
                              </Box>
                            </Card>

                            <Box
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Stack spacing={smDown ? 0.5 : 1}>
                                <Typography
                                  sx={{
                                    "&:hover": {
                                      color: "#004db6",
                                    },
                                    fontSize: smDown ? 13 : 16,
                                    fontWeight: 600,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 2,
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: smDown ? 10 : 11,
                                    color: "#9fa3a7",
                                    fontWeight: 500,
                                  }}
                                >
                                  {formatTimeDMY(item.dateUpdate)}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: smDown ? 2 : 3,
                                    textOverflow: "ellipsis",
                                    fontSize: smDown ? 10 : 13,
                                  }}
                                >
                                  {item.intro}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </NextLink>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              {generals.length > 0 && (
                <PaginationComponent onPageChange={handlePageChange} totalPage={totalPage} pageIndex={page.pageIndex} />
              )}
            </>
          </Box>
          {generals?.noidung_vi && (
            <Container maxWidth="lg">
              <Box
                sx={{
                  backgroundColor: "#E8E8E8",
                  width: 150,
                  p: 1,
                  mt: 4,
                }}
              >
                <Typography>{generals?.ten_vi}</Typography>
              </Box>
              <TiptapEditor contentEditor={generals?.noidung_vi} isDisable={true} />
            </Container>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewProjectsList;
