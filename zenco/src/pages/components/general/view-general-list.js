import SellIcon from "@mui/icons-material/Sell";
import { Box, Button, Card, Chip, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TitleWithDivider from "../../../components/custom-title-divider";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import PaginationComponent from "../../../components/panigation";
import TiptapEditor from "../../../components/tiptap/tiptapEditor";
import { paths } from "../../../paths";
import { isValidUrl } from "../../../sections/home/component/card-product";
import axiosInstance from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";
import CardNewList from "./view-news-list";

const ViewGeneralList = ({ item, setBreadcrumbsList, tag }) => {
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
        title: item?.title,
        alias: item?.alias,
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
          `/general/${item?.alias}?page=${page.pageIndex - 1}&pageSize=${page.pageSize}&tag=${tag}`
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
    if (item && item?.alias !== "tin-tuc") {
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
        const response = await axiosInstance.get(`/general/tag/${item?.alias}`);
        if (response && response.data && response.data.DT) {
          const data = response.data.DT;
          const newData = [];
          data?.map((item) => {
            const tags = item?.keywords.split(",");
            newData.push({
              keywords: tags[0],
              tenkhongdau: item?.tenkhongdau,
            });
          });
          const filteredItems = newData.reduce((acc, current) => {
            const normalizedKeyword = current.keywords.trim().toLowerCase();

            // Tìm xem phần tử đã tồn tại trong danh sách hay chưa
            const existingItem = acc.find((item) => item?.keywords.trim().toLowerCase() === normalizedKeyword);

            if (existingItem) {
              // Nếu đã tồn tại, tăng số lượng
              existingitem.count += 1;
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
        <Grid item xs={12} sm={4} lg={2.5} sx={{ order: { xs: 2, sm: 1 } }}>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {tags.length > 0 && (
              <Stack>
                <TitleWithDivider title="Danh mục tin tức" />
                <Box p={2}>
                  {tags?.map((tg, index) => {
                    const actived = tg.keywords === tag;
                    return (
                      <NextLink key={index} href={paths.detail(item?.alias, "", tg.keywords)}>
                        <Chip
                          sx={{
                            backgroundColor: actived ? "#C6E2FF" : "",
                            mb: 2,
                            "&:hover": {
                              backgroundColor: "#C6E2FF",
                            },
                          }}
                          label={tg.keywords}
                          onClick={() => {}}
                          icon={
                            <SellIcon
                              sx={{
                                fontSize: 16,
                                color: "#0066FF !important",
                              }}
                            />
                          }
                        />
                      </NextLink>
                    );
                  })}
                </Box>
              </Stack>
            )}
            <Stack>
              <TitleWithDivider title="Danh mục sản phẩm" />
              <Box p={2}>
                {allCategory?.map((tag, index) => {
                  return (
                    <NextLink key={index} href={tag.tenkhongdau}>
                      <Chip
                        sx={{
                          mb: 2,
                          "&:hover": {
                            backgroundColor: "#C6E2FF",
                          },
                        }}
                        label={tag.ten_vi}
                        onClick={() => {}}
                        icon={
                          <SellIcon
                            sx={{
                              fontSize: 16,
                              color: "#0066FF !important",
                            }}
                          />
                        }
                      />
                    </NextLink>
                  );
                })}
              </Box>
              {item && item?.alias !== "tin-tuc" && <CardNewList news={news} />}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} lg={9.5} sx={{ order: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              ml: smDown ? 0 : 6,
            }}
          >
            <>
              <Typography display="none" variant="h1">
                {item?.title}
              </Typography>
              <Grid container columnSpacing={2} rowSpacing={3} alignItems="stretch">
                {generals?.map((item) => {
                  return (
                    <Grid item key={item?.id} xs={12} lg={6}>
                      <Card
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          height: "180px",
                          overflow: "hidden",
                          transition: "transform 0.4s ease-in-out",
                          padding: "12px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                          position: "relative",
                        }}
                      >
                        <NextLink href={paths.detail(item?.alias)} legacyBehavior>
                          <Box>
                            <Stack direction="row" gap={3} width={"100%"}>
                              <Card
                                sx={{
                                  height: "160px",
                                  boxShadow: "none !important",
                                }}
                              >
                                <Box
                                  sx={{
                                    height: "100%",
                                    width: smDown ? 120 : 160,
                                    objectFit: "center",
                                    objectPosition: "center",
                                    transition: "transform 0.4s ease-in-out",
                                    transform: "scale(1.035)",
                                    boxShadow: "none !important",
                                  }}
                                >
                                  <LazyLoadedImage
                                    src={isValidUrl(item?.image) ? item?.image : `/upload/baiviet/${item?.image}`}
                                    alt={`Hình ảnh ${item?.title}`}
                                  />
                                </Box>
                              </Card>

                              <Box
                                sx={{
                                  width: smDown ? "calc(100% - 120px)" : "calc(100% - 200px)",
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
                                    {item?.title}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: smDown ? 10 : 11,
                                      color: "#9fa3a7",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {formatTimeDMY(item?.dateUpdate)}
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
                                    {item?.intro}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Stack>
                          </Box>
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
          {generals.length === 0 && (
            <>
              {item?.alias !== "lien-he" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 6,
                    }}
                  >
                    <Box
                      alt="Internal server error"
                      component="img"
                      src="/assets/errors/error-500.png"
                      sx={{
                        height: "auto",
                        maxWidth: "100%",
                        width: 300,
                      }}
                    />
                  </Box>
                  <Typography align="center" variant={"h4"}>
                    Trang truy cập hiện đang nâng cấp
                  </Typography>
                  <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
                    Quay lại sau nhé.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button component={NextLink} href={paths.index}>
                      Trang chủ
                    </Button>
                  </Box>
                </>
              ) : (
                <></>
                // <ContactWithUs />
              )}
            </>
          )}
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

export default ViewGeneralList;
