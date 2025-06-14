import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import ShareButtons from "../../../components/shareButton";
import ViewProductDescription from "../products/view-product-description";

const ViewIntroduction = ({ introduction, setBreadcrumbsList }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setBreadcrumbsList([
      { id: 1, title: "Trang chủ", alias: "trang-chu" },
      { id: introduction.id, title: introduction.title, alias: "gioi-thieu" },
    ]);
  }, [introduction]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          px: isMobile ? "16px" : "56px !important",
          pt: isMobile ? 4 : "60px !important",
          pb: isMobile ? 10 : "100px !important",
        }}
      >
        <TextAnimationFadeUp>
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.5rem !important",
              fontWeight: 700,
            }}
          >
            {introduction?.title.toUpperCase()}
          </Typography>
          <Box mt={5}>
            <ViewProductDescription data={introduction.description} type={introduction.type} sx={{ mt: 0 }} />
          </Box>
          <Box mt={8} ml={1}>
            <ShareButtons url={`${process.env.NEXT_PUBLIC_API_URL}/${introduction.alias}`} title={introduction.title} />
          </Box>
        </TextAnimationFadeUp>
      </Container>
    </>
  );
};

export default ViewIntroduction;
