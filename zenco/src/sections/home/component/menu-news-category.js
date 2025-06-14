import { Box, ButtonBase, Stack } from "@mui/material";
import NextLink from "next/link";

//icon
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Scrollbar } from "../../../components/scrollbar";

export const MenuNewsCategory = ({ activeId, expandIndex }) => {
  const { allNewsCategory } = useSelector((state) => state.newsCategory);

  const [expandedIndex, setExpandedIndex] = useState(expandIndex ? expandIndex : null);

  const handleToggleExpand = (idExpand) => {
    setExpandedIndex(expandedIndex === idExpand ? null : idExpand);
  };

  useEffect(() => {
    setExpandedIndex(expandIndex);
  }, [expandIndex]);

  return (
    <Scrollbar>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(1, 1fr)",
          p: 2,
          width: "100%",
        }}
      >
        {allNewsCategory?.map((item, index) => {
          let linkProps = undefined;
          if (item.tenkhongdau) {
            linkProps = {
              component: NextLink,
              href: item.tenkhongdau,
            };
          }
          return (
            <Stack
              component="ul"
              key={item.id}
              spacing={0.5}
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                height: "auto",
                // minHeight: expandedIndex ? "auto" : 40,
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
                      py: "8px",
                      textAlign: "left",
                      width: "100%",
                      ...(activeId === item.id && {
                        backgroundColor: "#004db615",
                      }),
                      "&:hover": {
                        backgroundColor: activeId === item.id ? "#004db615" : "action.hover",
                        color: "#004db6",
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
