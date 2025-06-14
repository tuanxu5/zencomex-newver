import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { default as Link, default as NextLink } from "next/link";
import { TextAnimationFadeUp } from "../../components/section-animate";

const BannerZencomex = new URL("../../assets/images/banner-zencomex.webp", import.meta.url).href;

const HomeIntroduction = () => {
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
        <Grid item xs={12} sm={6.5}>
          <TextAnimationFadeUp>
            <Box
              style={{
                position: "relative",
              }}
            >
              <Image
                src={BannerZencomex}
                alt="zencomex"
                width={500}
                height={300}
                priority={true}
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                }}
              />
            </Box>
          </TextAnimationFadeUp>
        </Grid>
        <Grid item xs={12} sm={5.5}>
          <TextAnimationFadeUp>
            <Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "1.25rem !important",
                    fontWeight: 700,
                    textAlign: "start",
                    backgroundImage: "linear-gradient(135deg, #00a1ff 0%, #004db6 100%)",
                    width: "fit-content",
                    padding: "8px 20px",
                    color: "#fff",
                    borderRadius: "28px 0 28px 0px",
                  }}
                  variant="h2"
                >
                  ZENCOMEX
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9375rem !important",
                    fontWeight: 400,
                    textAlign: "justify",
                    mt: 2,
                    lineHeight: "20px",
                    color: "#6c737f",
                    display: "inline-block",
                  }}
                  variant="h1"
                >
                  Công ty TNHH sản xuất và xuất nhập khẩu ZENCO&nbsp;
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9375rem !important",
                    fontWeight: 400,
                    textAlign: "justify",
                    lineHeight: "20px",
                    color: "#6c737f",
                    display: "inline",
                  }}
                >
                  (ZCG), là công ty hoạt động trong lĩnh vực sản xuất và cung cấp vật liệu công nghiệp, phụ trợ cho các
                  công trình công nghiệp và dân dụng. Chúng tôi chuyên sản xuất các sản phẩm cơ khí, các phụ kiện cơ
                  điện (M&E) như Ty Ren, đai treo, U Bolt, bulong, tắc kê các loại. Ngoài ra, chúng tôi cũng cung cấp
                  các sản phẩm khác như thang máng cáp và grating cho các công trình. cũng như các sản phẩm gia công cơ
                  khí theo yêu cầu.
                </Typography>
              </Box>

              <Box sx={{ mt: 5, display: "flex" }}>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href="/lien-he"
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <Button
                    style={{
                      padding: "10px 20px",
                      background: "#fff",
                      border: "1px solid #004db6",
                      borderRadius: "100px",
                      color: "#004db6",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    LIÊN HỆ NGAY
                  </Button>
                </Link>

                <Box
                  sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer", gap: 1, ml: 5 }}
                >
                  <Box
                    sx={{
                      background: "#004db6",
                      height: "40px",
                      width: "40px",
                      borderRadius: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PhoneInTalkOutlinedIcon sx={{ fontSize: "20px", color: "#fff" }} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      color: "#004db6",
                    }}
                  >
                    <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>Liên hệ nhận tư vấn</Typography>
                    <Box
                      component="a"
                      href={`tel:0909 126 992`}
                      sx={{
                        textDecoration: "none",
                        color: "#004db6",
                        fontWeight: "600",
                      }}
                    >
                      (+84) 0909 126 992
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TextAnimationFadeUp>
        </Grid>
      </Grid>
    </Container>
  );
};
export default HomeIntroduction;
