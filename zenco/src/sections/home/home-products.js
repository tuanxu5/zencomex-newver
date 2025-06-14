import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TextAnimationFadeUp } from "../../components/section-animate";
import CardProduct from "./component/card-product";

const HomeProducts = () => {
  const { allCategory } = useSelector((state) => state.product);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filterCategory = allCategory?.filter((i) => i.childrenProduct.length > 0);

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: "16px", md: "56px !important" },
        pt: { xs: 4, md: "60px !important" },
        pb: { xs: 10, md: "100px !important" },
      }}
    >
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
          >
            SẢN PHẨM NỔI BẬT
          </Typography>
          <Typography sx={{
            fontSize: "0.9375rem !important",
            fontWeight: 500, mt: 2, textAlign: "center", color: "#004db6",
          }}>
            Liên hệ ngay – Để nhận tư vấn và báo giá tốt nhất cho dự án của bạn!
          </Typography>
        </Box>

        {filterCategory && filterCategory.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              mt: 4,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",
                },
                "& .MuiTab-root": {
                  fontSize: "13px",
                  textTransform: "none",
                  minWidth: "auto",
                  transition: "all 0.3s ease",
                  padding: "10px 24px",
                  borderRadius: "100px",
                  border: "none",
                  "&:hover": { color: "#004db6" },
                  "&.Mui-selected": {
                    color: "#004db6",
                    fontWeight: 600,
                    background: "#f4f4f4",
                  },
                },
              }}
            >
              {filterCategory?.map((category, index) => (
                <Tab key={index} label={category.ten_vi} />
              ))}
            </Tabs>

            {/* Nút Xem thêm */}
            {filterCategory[selectedTab]?.childrenProduct?.length > 0 && (
              <Button
                component={NextLink}
                href={filterCategory[selectedTab].tenkhongdau}
                variant="contained"
                endIcon={<ChevronRightIcon sx={{ color: "#6c737f" }} />}
                sx={{
                  minWidth: "130px !important",
                  background: "#fff",
                  border: "1px solid #6c737f",
                  borderRadius: "1200px",
                  height: "44px",
                  fontSize: "12px",
                  color: "#6c737f",
                  "&:hover": { background: "#fff" },
                }}
              >
                Xem thêm
              </Button>
            )}
          </Box>
        )}

        {filterCategory[selectedTab]?.childrenProduct?.length > 0 && (
          <Box mt={4}>
            <Grid container spacing={2}>
              {filterCategory[selectedTab].childrenProduct?.map((child) => (
                <Grid item key={child.id} xs={6} sm={4} md={4} lg={2.4}>
                  <CardProduct child={child} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </TextAnimationFadeUp>
    </Container>
  );
};

export default HomeProducts;
