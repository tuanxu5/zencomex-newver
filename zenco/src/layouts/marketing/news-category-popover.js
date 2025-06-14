import { Box, ButtonBase, Stack } from "@mui/material";
import NextLink from "next/link";

//icon

import { useSelector } from "react-redux";
import { Scrollbar } from "../../components/scrollbar";

export const NewsCategoryPopover = () => {
  const { allNewsCategory } = useSelector((state) => state.newsCategory);

  return (
    <Scrollbar
      sx={{
        maxHeight: 350,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(1, 1fr)",
          p: 1,
          width: "100%",
        }}
      >
        {allNewsCategory &&
          allNewsCategory?.map((item, index) => {
            let linkProps = undefined;
            if (item.tenkhongdau) {
              linkProps = {
                component: NextLink,
                href: item.tenkhongdau,
                type: "tin-tuc",
              };
            }
            return (
              <Stack
                component="ul"
                key={index}
                spacing={0.5}
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                }}
              >
                <li key={item.title}>
                  <Stack direction="row" alignItems="center">
                    <ButtonBase
                      sx={{
                        alignItems: "center",
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        px: "12px",
                        py: "12px",
                        textAlign: "left",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                      {...linkProps}
                    >
                      <Box component="span" sx={{ flexGrow: 1 }}>
                        <Box
                          component="span"
                          sx={{
                            display: "block",
                            fontFamily: (theme) => theme.typography.fontFamily,
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: "24px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Stack direction="row" spacing={2}>
                            {item.ten_vi}
                          </Stack>
                        </Box>
                        {item.caption && (
                          <Box
                            component="span"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              fontFamily: (theme) => theme.typography.fontFamily,
                              fontSize: 12,
                              fontWeight: 400,
                              lineHeight: "18px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.caption}
                          </Box>
                        )}
                      </Box>
                    </ButtonBase>
                  </Stack>
                </li>
              </Stack>
            );
          })}
      </Box>
    </Scrollbar>
  );
};
