import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Input,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useEffect, useState } from "react";
import LoadingScreen from "../../../components/loading-screen";
import PaginationComponent from "../../../components/panigation";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import { BoxEmpty } from "../../../components/view-layout/box-empty";
import useDebounce from "../../../hooks/use-debounce";
import CardProduct from "../../../sections/home/component/card-product";
import { MenuCategory } from "../../../sections/home/component/menu-category";
import axiosInstance from "../../../utils/axios";
import ViewProductDescription from "./view-product-description";

const ViewProductList = (props) => {
  const { detail, setBreadcrumbsList, search } = props;
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const defaultBreadcrumb = [
    {
      id: 1,
      title: "Trang chủ",
      alias: "",
    },
    {
      id: 2,
      title: "Sản phẩm",
      alias: "",
    },
  ];

  const defaultPage = {
    pageSize: 20,
    pageIndex: 1,
  };

  //------------ Pagination ------------//
  const [page, setPage] = useState(defaultPage);
  const [totalPage, setTotalPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // category
  const [category, setCategory] = useState(() => {
    detail ? detail : null;
  });
  const [expandCategoryIndex, setExpandCategoryIndex] = useState(null);

  const [activeId, setActiveId] = useState(() => {
    return detail ? detail.id : null;
  });

  // search
  const [searchValue, setSearchValue] = useState(() => {
    if (search && search.length > 0) {
      return search;
    }
    return "";
  });

  useEffect(() => {
    if (search && search.length > 0) {
      setSearchValue(search);
    }
  }, [search]);

  // Get products
  const checkId = () => {
    if (detail.type === "san-pham") return "";
    if (detail) {
      if (detail.type === "category") {
        return `&id_list=${detail.id}`;
      }
      if (detail.type === "childCategory") {
        return `&id_cat=${detail.id}`;
      }
    }
    return "";
  };

  const getProducts = async () => {
    setLoadingProduct(true);
    try {
      const products = await axiosInstance.get(
        `/product/list?page=${page.pageIndex - 1}&pageSize=${page.pageSize}${checkId()}&name=${searchValue}`
      );
      if (products && products.data.DT) {
        const newProducts = products.data.DT?.map((item) => {
          return {
            id: item.id,
            name: item.ten_vi,
            price: item.price,
            description: item.mota_vi,
            image: item.photo,
            alias: item.tenkhongdau,
            fileAttach: item.fileAttach,
          };
        });
        setTotalPage(Math.ceil(products.data.total / page.pageSize));
        setProducts(newProducts);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      setLoadingProduct(false);
    }, 200);
  };

  useEffect(() => {
    if (detail.type === "san-pham") {
      setCategory(null);
      setActiveId(null);
      setExpandCategoryIndex(null);
      setBreadcrumbsList(defaultBreadcrumb);
    } else {
      setCategory(detail);
      setActiveId(detail.id);
      if (detail.type === "childCategory" || detail.type === "product") {
        setExpandCategoryIndex(detail.parent.id);
      }
    }
    getProducts();
  }, [detail, page]);

  const handlePageChange = (value) => {
    setPage({ ...page, pageIndex: value });
  };

  const changeBreadScrums = () => {
    if (category) {
      setBreadcrumbsList(() => {
        if (category.type === "category") {
          return [
            ...defaultBreadcrumb,
            {
              id: category.id,
              title: category.title,
              alias: category.alias,
              type: category.type,
              intro: category.intro,
            },
          ];
        }
        if (category.type === "childCategory") {
          return [
            ...defaultBreadcrumb,
            {
              id: category.parent.id,
              title: category.parent.title,
              alias: category.parent.alias,
              type: category.parent.type,
              intro: category.intro,
            },
            {
              id: category.id,
              title: category.title,
              alias: category.alias,
              type: category.type,
              intro: category.intro,
            },
          ];
        }
      });
    }
  };

  useEffect(() => {
    changeBreadScrums();
  }, [category]);

  const searchDebounce = useDebounce(searchValue, 500);
  useEffect(() => {
    setPage(defaultPage);
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
        {loadingProduct && <LoadingScreen />}
        <Box position="relative">
          <Grid container spacing={5}>
            {
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
                        fontSize: "20px",
                        fontWeight: 700,
                      }}
                    >
                      TÌM KIẾM SẢN PHẨM
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Input
                        disableUnderline
                        fullWidth
                        placeholder="Tìm sản phẩm"
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
                  {smUp && (
                    <Box
                      sx={{
                        width: "100%",
                        mt: 7.5,
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
                          DANH MỤC SẢN PHẨM
                        </Typography>
                        <Box sx={{ background: "#00a1ff10", mt: 2, borderRadius: "16px" }}>
                          <MenuCategory activeId={activeId} expandIndex={expandCategoryIndex} />
                        </Box>
                      </Stack>
                    </Box>
                  )}
                </TextAnimationFadeUp>
              </Grid>
            }
            <Grid item xs={12} sm={12} lg={8.5}>
              <Stack>
                <TextAnimationFadeUp>
                  <Box
                    sx={{
                      // height: mdUp ? "5vh" : "15vh",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction={smUp ? "row" : "column"}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        justifyItems: "",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                        variant="h1"
                      >
                        {category ? category.title.toUpperCase() : "TẤT CẢ SẢN PHẨM"}
                      </Typography>
                      <Stack alignItems="center" component="form" direction="row" spacing={1} sx={{}}></Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {products.length === 0 ? (
                      <BoxEmpty note={" Sản phẩm hiện đang chờ cập nhật..."} />
                    ) : (
                      <>
                        <Grid container justifyContent="flex-start" spacing={2}>
                          {products?.map((child) => {
                            return (
                              <Grid item key={child.id} xs={6} sm={6} lg={4} xl={3}>
                                <CardProduct child={child} />
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
                    )}
                  </Box>
                </TextAnimationFadeUp>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {detail.intro && detail.description && detail.description.length > 0 && (
          <Box
            sx={{
              border: "2px solid #E8E8E8",
              borderRadius: 1,
              mt: 10,
            }}
          >
            <TextField
              disabled
              value={detail.intro}
              multiline
              sx={{
                color: "blue",
                width: "100%",
                padding: 0,
                "& .MuiInputBase-input": {
                  padding: 1,
                  fontSize: "16px !important",
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
        {products.length > 0 && (
          <TextAnimationFadeUp>
            {detail && detail.description && detail.description.length > 0 && (
              <ViewProductDescription expand={false} data={detail.description} type={detail.type} sx={{ mt: 4 }} />
            )}
          </TextAnimationFadeUp>
        )}
      </Container>
    </>
  );
};

export default ViewProductList;
