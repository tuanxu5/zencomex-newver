import { Box, ButtonBase, Container, IconButton, Input, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { TOP_NAV_HEIGHT } from "../../constant";
import { useWindowScroll } from "../../hooks/use-window-scroll";
import { paths } from "../../paths";
import { BASE_URL } from "../../utils/axios";
import { NewsCategoryPopover } from "./news-category-popover";
import { ProductPopover } from "./product-popover";
import { TopNavItem } from "./top-nav-item";
export const TopNav = (props) => {
  const router = useRouter();
  const { onMobileNavOpen, menu, logo } = props;

  const [searchValue, setSearchValue] = useState("");

  const [items, setItems] = useState([]);

  const pathname = usePathname();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [elevate, setElevate] = useState(false);
  const offset = 64;
  const delay = 100;

  const handleWindowScroll = useCallback(() => {
    if (window.scrollY > offset) {
      setElevate(true);
    } else {
      setElevate(false);
    }
  }, []);

  useEffect(() => {
    if (menu.length > 0) {
      setItems(() => {
        return menu?.map((i) => {
          if (i.path === "") {
            return {
              ...i,
              path: paths.index,
            };
          }
          if (i.path === "san-pham") {
            return {
              ...i,
              path: paths.detail(i.path),
              children: <ProductPopover />,
            };
          }
          if (i.path === "tin-tuc") {
            return {
              ...i,
              path: paths.detail(i.path),
              children: <NewsCategoryPopover />,
            };
          }
          return {
            ...i,
            path: paths.detail(i.path),
          };
        });
      });
    }
  }, [menu]);

  useWindowScroll({
    handler: handleWindowScroll,
    delay,
  });

  // search
  const handleClickSearch = () => {
    if (searchValue.length > 0) {
      router.push(paths.detail("san-pham", searchValue));
      setSearchValue("");
    }
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && searchValue.length > 0) {
      router.push(paths.detail("san-pham", searchValue));
      setSearchValue("");
    }
  };

  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        // pt: 2,
        width: "100%",
        margin: "0 auto",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth="xxl"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "transparent",
          boxShadow: "none",
          transition: (theme) =>
            theme.transitions.create("box-shadow, background-color", {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.5),
            boxShadow: 8,
          }),
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: TOP_NAV_HEIGHT,
            justifyContent: "space-between",
          }}
        >
          <Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
            <Stack
              alignItems="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // width: mdUp ? 100 : 70,
                  height: mdUp ? 95 : 65,
                  overflow: "hidden",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                >
                  <Image
                    src={logo !== "" ? `${BASE_URL}/upload/${logo}` : "/zenco.png"}
                    alt="Logo zencomex"
                    width={80}
                    height={80}
                    priority={true}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Stack>

          <Stack
            alignItems="center"
            direction="row"
            justifyContent="end"
            spacing={1}
            sx={{
              flexGrow: 1,
              width: "100%",
            }}
          >
            {mdUp && (
              <Stack
                alignItems="center"
                justifyContent="end"
                direction="row"
                spacing={2}
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  mr: "24px",
                }}
              >
                <Box component="nav" sx={{ height: "100%" }}>
                  <Stack
                    component="ul"
                    alignItems="center"
                    justifyContent="end"
                    direction="row"
                    sx={{
                      listStyle: "none",
                      m: 0,
                      p: 0,
                    }}
                  >
                    <>
                      {items?.map((item) => {
                        const checkPath = !!(item.path && pathname);
                        const partialMatch = checkPath ? pathname.includes(item.path) : false;
                        const exactMatch = checkPath ? pathname === item.path : false;
                        const active = item.children ? partialMatch : exactMatch;

                        return (
                          <TopNavItem active={active} key={item.title} path={item.path} title={item.title}>
                            {item.children}
                          </TopNavItem>
                        );
                      })}
                    </>
                  </Stack>
                </Box>
              </Stack>
            )}
            {mdUp && (
              <Stack width={mdUp ? "28%" : "60%"}>
                <Input
                  disableUnderline
                  fullWidth
                  placeholder="Tìm sản phẩm"
                  sx={{
                    flexGrow: 1,
                    height: "50px",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    pl: 3,
                    pr: "6px",
                    // "& input": {
                    //   fontSize: "13px",
                    // },
                    // "&:focus-within": {
                    //   border: "1px solid #004db6",
                    // },
                  }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyUp={handleKeyUp}
                  endAdornment={
                    <Box
                      aria-label="Tìm kiếm"
                      component={ButtonBase}
                      sx={{
                        width: 44,
                        height: 36,
                        borderRadius: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#004db620",
                      }}
                      onClick={handleClickSearch}
                    >
                      <SvgIcon sx={{ cursor: "pointer", color: "#004db6", fontSize: 20 }}>
                        <SearchMdIcon />
                      </SvgIcon>
                    </Box>
                  }
                />
              </Stack>
            )}

            {!mdUp && (
              <Box>
                <IconButton onClick={onMobileNavOpen} tabIndex={0} aria-label="Open menu">
                  <SvgIcon fontSize="medium">
                    <Menu01Icon />
                  </SvgIcon>
                </IconButton>
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};
