import { Container } from "@mui/material";
import { useEffect } from "react";
import ContactWithUs from "./view-contact";

const ViewContactsList = ({ item, setBreadcrumbsList, tag }) => {
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

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: "16px", md: "56px !important" },
        pt: { xs: 4, md: "60px !important" },
        pb: { xs: 10, md: "100px !important" },
      }}
    >
      <ContactWithUs />
    </Container>
  );
};

export default ViewContactsList;
