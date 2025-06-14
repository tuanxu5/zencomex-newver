import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Container, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { paths } from "../paths";

export const CustomBreadcrumb = (props) => {
  const { breadcrumbsList, setBreadcrumbsList } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (

    <Container
      maxWidth="xl"
      sx={{
        px: isMobile ? "16px" : "56px !important",
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack spacing={1}>
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                sx={{
                  fontSize: 14,
                }}
              />
            }
          >
            {breadcrumbsList?.map((item, index) => {
              return (
                <NextLink
                  key={item.id}
                  href={item.id === 1 ? paths.index : paths.detail(item.alias)}
                  style={{
                    height: 30,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    const newBreadcrumbsList = breadcrumbsList.slice(0, index + 1);
                    setBreadcrumbsList(newBreadcrumbsList);
                  }}
                >
                  <Box
                    p={0.5}
                    sx={{
                      color: index === breadcrumbsList.length - 1 ? "#000" : "#808080",
                      "&:hover": {
                        color: "#004db6",
                      },
                      fontSize: isMobile ? 13 : 15,
                      fontWeight: index === breadcrumbsList.length - 1 ? 600 : 500,
                      whiteSpace: "wrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "auto",
                    }}
                  >
                    {item.title}
                  </Box>
                </NextLink>
              );
            })}
          </Breadcrumbs>
        </Stack>
      </Stack>
    </Container>
  );
};
