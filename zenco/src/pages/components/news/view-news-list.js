import {
  Box,
  ButtonBase,
  Card,
  Chip,
  Container,
  Grid,
  Input,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import PaginationComponent from "../../../components/panigation";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import useDebounce from "../../../hooks/use-debounce";
import { paths } from "../../../paths";
import { isValidUrl } from "../../../sections/home/component/card-product";
import { MenuNewsCategory } from "../../../sections/home/component/menu-news-category";
import axiosInstance from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";

const ViewNewLists = ({ item, setBreadcrumbsList, tag, keywords }) => {
  const defaultBreadcrumb = [
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
  ];

  const defaultPage = {
    pageSize: 20,
    pageIndex: 1,
  };
  const router = useRouter();
  const [page, setPage] = useState(defaultPage);
  const [totalPage, setTotalPage] = useState(2);
  const [news, setNews] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [allKeywords, setAllKeywords] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const handlePageChange = (value) => {
    setPage({ ...page, pageIndex: value });
  };

  const checkId = () => {
    if (item?.alias !== "tin-tuc") return `&category=${item.id}`;
    return "";
  };

  const handleFetchNews = async () => {
    if (item) {
      try {
        const response = await axiosInstance.get(
          `/general/tin-tuc?page=${page.pageIndex - 1}&pageSize=${
            page.pageSize
          }&tag=${tag}${checkId()}&query=${searchValue}&keywords=${keywords?.replace(/-/g, " ")}`
        );
        if (response && response.data && response.data.DT) {
          setTotalPage(Math.ceil(response.data.total / page.pageSize));
          setNews(response.data.DT);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleFetchAllNews = async () => {
    if (item) {
      try {
        const response = await axiosInstance.get(`/general/tin-tuc`);
        if (response && response.data && response.data.DT) {
          setAllKeywords(
            Array.from(
              new Set(
                response.data.DT?.map((item) => item.keywordSeo)
                  .filter(Boolean)
                  .flatMap((item) => item.split(",").map((word) => word.trim()))
                  .filter(Boolean)
              )
            )
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    setPage(defaultPage);
    if (item?.alias === "tin-tuc") {
      setActiveId(null);
    } else {
      setActiveId(item?.id);
    }
    setBreadcrumbsList(defaultBreadcrumb);
    handleFetchNews();
    handleFetchAllNews();
  }, [JSON.stringify(item), tag, keywords]);

  const searchDebounce = useDebounce(searchValue, 500);
  useEffect(() => {
    setPage(defaultPage);
    handleFetchNews();
  }, [searchDebounce]);

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
        <Box position="relative">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={3.5}>
              <TextAnimationFadeUp>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h2"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    TÌM KIẾM TIN TỨC
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Tìm bài viết"
                      sx={{
                        width: "100%",
                        flexGrow: 1,
                        height: "48px",
                        border: "1px solid #E5E7EB",
                        borderRadius: 5,
                        pl: 3,
                        pr: "6px",
                        "& input": {
                          fontSize: "13px",
                        },
                        "&:focus-within": {
                          border: "1px solid #004db6",
                        },
                      }}
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      endAdornment={
                        <Box
                          aria-label="Tìm kiếm"
                          component={ButtonBase}
                          sx={{
                            width: 42,
                            height: 36,
                            borderRadius: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#004db620",
                          }}
                        >
                          <SvgIcon sx={{ cursor: "pointer", color: "#004db6", fontSize: 20 }}>
                            <SearchMdIcon />
                          </SvgIcon>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    mt: 7.5,
                  }}
                >
                  <Stack>
                    <Typography
                      variant="h3"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                      }}
                    >
                      CHUYÊN MỤC
                    </Typography>
                    <Box sx={{ background: "#00a1ff10", mt: 2, borderRadius: "16px" }}>
                      <MenuNewsCategory activeId={activeId} expandIndex={"expandCategoryIndex"} />
                    </Box>
                  </Stack>
                </Box>
                {!mdDown && (
                  <Box
                    sx={{
                      width: "100%",
                      mt: 7.5,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="h3"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                        }}
                      >
                        TỪ KHOÁ
                      </Typography>
                      <Box
                        sx={{ mt: 2, borderRadius: "16px" }}
                        style={{ display: "flex", gap: "8px 4px", gap: "8px", flexWrap: "wrap" }}
                      >
                        {allKeywords &&
                          allKeywords?.map((item, index) => {
                            return (
                              <NextLink key={index} href={`/tin-tuc?keywords=${item}`} passHref>
                                <Chip
                                  sx={{
                                    width: "fit-content",
                                    height: "34px",
                                    padding: "4px",
                                    cursor: "pointer",
                                    backgroundColor: keywords === item ? "#004db620" : "#f4f4f4",
                                    color: keywords === item ? "#004db6" : "#56575b",
                                    border: "1px solid",
                                    borderColor: keywords === item ? "#004db6" : "transparent",
                                    fontSize: "14px",
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
                )}
              </TextAnimationFadeUp>
            </Grid>
            <Grid item xs={12} sm={12} lg={8.5}>
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextAnimationFadeUp>
                    <Typography
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        textAlign: "start",
                      }}
                      variant="h1"
                    >
                      {item?.alias === "tin-tuc" ? "TẤT CẢ BÀI VIẾT" : item?.title.toUpperCase()}
                    </Typography>
                  </TextAnimationFadeUp>
                </Box>

                {keywords && (
                  <Chip
                    sx={{
                      width: "fit-content",
                      height: "34px",
                      padding: "4px",
                      cursor: "pointer",
                      backgroundColor: "#f4f4f4",
                      color: "#56575b",
                      fontSize: "14px",
                      mt: 1,
                      "&:hover": {
                        backgroundColor: "#004db620",
                        color: "#004db6",
                      },
                    }}
                    label={`Bạn đang tìm kiếm từ khoá: ${keywords}`}
                    onClick={() => {
                      router.push("/tin-tuc");
                    }}
                  />
                )}
                <Box sx={{ mt: 2 }}>
                  <>
                    <Grid container justifyContent="flex-start" rowSpacing={2} columnSpacing={1.5}>
                      {news?.map((item) => {
                        return (
                          <Grid item key={item?.id} xs={12} sm={6} lg={6}>
                            <TextAnimationFadeUp style={{ height: "100%" }}>
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
                                <NextLink href={paths.detail(item?.alias)} legacyBehavior>
                                  <Box>
                                    <Stack direction="column" width={"100%"}>
                                      <Card
                                        sx={{
                                          boxShadow: "none !important",
                                          borderRadius: "8px",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "center",
                                            objectPosition: "center",
                                            transition: "transform 0.4s ease-in-out",
                                            boxShadow: "none !important",
                                            aspectRatio: 1,
                                          }}
                                        >
                                          <LazyLoadedImage
                                            src={
                                              isValidUrl(item?.image) ? item.image : `/upload/baiviet/${item?.image}`
                                            }
                                            alt={`Hình ảnh ${item?.title}`}
                                          />
                                        </Box>
                                      </Card>

                                      <Box
                                        sx={{
                                          width: "100%",
                                          mt: 1,
                                        }}
                                      >
                                        <Stack spacing={1}>
                                          <Typography
                                            sx={{
                                              "&:hover": {
                                                color: "#004db6",
                                              },
                                              fontSize: "1rem !important",
                                              fontWeight: 600,
                                              display: "-webkit-box",
                                              WebkitBoxOrient: "vertical",
                                              overflow: "hidden",
                                              WebkitLineClamp: 2,
                                              textOverflow: "ellipsis",
                                            }}
                                            variant="h3"
                                          >
                                            {item?.title?.toUpperCase()}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: 12,
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
                                              textAlign: "justify",
                                              overflow: "hidden",
                                              WebkitLineClamp: 3,
                                              textOverflow: "ellipsis",
                                              fontSize: 13,
                                            }}
                                          >
                                            {item.intro}
                                          </Typography>
                                        </Stack>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </NextLink>
                              </Card>
                            </TextAnimationFadeUp>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <PaginationComponent
                      onPageChange={handlePageChange}
                      totalPage={totalPage}
                      pageIndex={page.pageIndex}
                    />
                  </>
                </Box>
                {mdDown && (
                  <TextAnimationFadeUp>
                    <Box
                      sx={{
                        width: "100%",
                        mt: 7.5,
                      }}
                    >
                      <Stack>
                        <Typography
                          variant="h3"
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                          }}
                        >
                          TỪ KHOÁ
                        </Typography>
                        <Box
                          sx={{ mt: 2, borderRadius: "16px" }}
                          style={{ display: "flex", gap: "8px 4px", gap: "8px", flexWrap: "wrap" }}
                        >
                          {allKeywords &&
                            allKeywords?.map((item, index) => {
                              return (
                                <NextLink key={index} href={`/tin-tuc?keywords=${item}`} passHref>
                                  <Chip
                                    sx={{
                                      width: "fit-content",
                                      height: "34px",
                                      padding: "4px",
                                      cursor: "pointer",
                                      backgroundColor: keywords === item ? "#004db620" : "#f4f4f4",
                                      color: keywords === item ? "#004db6" : "#56575b",
                                      border: "1px solid",
                                      borderColor: keywords === item ? "#004db6" : "transparent",
                                      fontSize: "14px",
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
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ViewNewLists;
