import { Box, Card, CircularProgress, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useCallback, useEffect, useState } from "react";
import LazyLoadedImage from "../../../components/lazy-loaded-image";
import PaginationComponent from "../../../components/panigation";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import TiptapEditor from "../../../components/tiptap/tiptapEditor";
import { paths } from "../../../paths";
import { isValidUrl } from "../../../sections/home/component/card-product";
import { MenuCategory } from "../../../sections/home/component/menu-category";
import axiosInstance from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";

const ViewServicesList = ({ item, setBreadcrumbsList, tag }) => {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const defaultPage = { pageSize: 10, pageIndex: 1 };
  const [page, setPage] = useState(defaultPage);
  const [totalPage, setTotalPage] = useState(1);
  const [generals, setGenerals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (item) {
      setBreadcrumbsList([
        { id: 1, title: "Trang chủ", alias: "trang-chu" },
        { id: 2, title: item.title, alias: item.alias },
      ]);
    }
  }, [item]);

  useEffect(() => {
    setPage(defaultPage);
  }, [item]);

  const fetchGeneralList = useCallback(async () => {
    if (!item) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/general/${item.alias}?page=${page.pageIndex - 1}&pageSize=${page.pageSize}&tag=${tag}`
      );
      if (response?.data?.DT) {
        setGenerals(response.data.DT);
        setTotalPage(Math.ceil(response.data.total / page.pageSize));
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, [item, page, tag]);

  useEffect(() => {
    fetchGeneralList();
  }, [fetchGeneralList]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: "16px", md: "56px !important" },
        pt: { xs: 4, md: "60px !important" },
        pb: { xs: 10, md: "100px !important" },
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} lg={3.5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <TextAnimationFadeUp>
              <Stack>
                <Typography sx={{ fontSize: "1.25rem !important", fontWeight: 700 }} variant="h2">
                  DANH MỤC SẢN PHẨM
                </Typography>
                <Box sx={{ background: "#00a1ff10", mt: 2, borderRadius: "16px" }}>
                  <MenuCategory activeId={"activeId"} expandIndex={"expandCategoryIndex"} />
                </Box>
              </Stack>
            </TextAnimationFadeUp>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={8.5}>
          <Box>
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
                  TẤT CẢ DỊCH VỤ
                </Typography>
              </TextAnimationFadeUp>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TextAnimationFadeUp>
                <Grid container spacing={2} mt={0}>
                  {generals.map((general) => (
                    <Grid item key={general.id} xs={12} sm={6} lg={6}>
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
                        <NextLink href={paths.detail(general.alias)} legacyBehavior>
                          <Stack direction="column" width="100%">
                            <Card sx={{ boxShadow: "none !important", borderRadius: "8px !important" }}>
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
                                  src={isValidUrl(general.image) ? general.image : `/upload/baiviet/${general.image}`}
                                  alt={`Hình ảnh ${general.title}`}
                                />
                              </Box>
                            </Card>

                            <Box sx={{ width: "100%" }}>
                              <Stack spacing={smDown ? 0.5 : 1}>
                                <Typography
                                  sx={{
                                    "&:hover": { color: "#004db6" },
                                    fontSize: smDown ? 13 : 16,
                                    fontWeight: 600,
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 2,
                                    textOverflow: "ellipsis",
                                    mt: 1,
                                  }}
                                >
                                  {general.title.toUpperCase()}
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: "#9fa3a7", fontWeight: 500 }}>
                                  {formatTimeDMY(general.dateUpdate)}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: smDown ? 2 : 3,
                                    textOverflow: "ellipsis",
                                    fontSize: 13,
                                  }}
                                >
                                  {general.intro}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </NextLink>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TextAnimationFadeUp>
            )}

            {generals.length > 0 && (
              <PaginationComponent
                onPageChange={(value) => setPage({ ...page, pageIndex: value })}
                totalPage={totalPage}
                pageIndex={page.pageIndex}
              />
            )}
          </Box>

          {generals.length > 0 && generals[0]?.noidung_vi && (
            <Container maxWidth="lg">
              <Box sx={{ backgroundColor: "#E8E8E8", width: 150, p: 1, mt: 4 }}>
                <Typography>{generals[0]?.ten_vi}</Typography>
              </Box>
              <TiptapEditor contentEditor={generals[0]?.noidung_vi} isDisable />
            </Container>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewServicesList;
