import { Box, Container, Grid, Typography } from "@mui/material";
import { AnimatedNumber } from "../../components/animated-number/animated-number";

const HomeStatistics = () => {
  const StatItem = ({ value, suffix, title }) => (
    <Box sx={{ textAlign: "center" }}>
      <AnimatedNumber value={value} suffix={suffix} />
      <Typography variant="h4" sx={{ fontSize: "13px !important", fontWeight: 600, mt: 2 }}>
        {title}
      </Typography>
    </Box>
  );

  const stats = [
    { value: 250, suffix: "+", title: "Dự án đã hoàn thành" },
    { value: 150, suffix: "+", title: "Đội ngũ nhân viên" },
    { value: 200, suffix: "+", title: "Đối tác tin cậy" },
    { value: 95, suffix: "%", title: "Tiến độ hoàn thành đúng hẹn" },
  ];
  return (
    <Box
      sx={{
        padding: "20px 0px",
        margin: "60px 0px",
        backgroundImage: 'url("https://humamedical.com/wp-content/uploads/2024/06/Rectangle-4504-1.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 0, lg: 15 },
          py: { xs: 6, lg: 7.5 },
          color: "white",
        }}
      >
        <Grid container rowGap={10}>
          {stats.map((stat, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
              <StatItem {...stat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default HomeStatistics;
