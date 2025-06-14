import { Box, ButtonBase, Paper, SvgIcon, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

export const TopNavItem = (props) => {
  const { active, children, path, title } = props;
  const [open, setOpen] = useState(false);
  let timeoutId = null;

  const handleMouseEnter = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId); // Hủy delay nếu hover lại
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutId = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  if (children) {
    // const isExternal = path && path.startsWith("http");
    let linkProps = undefined;

    linkProps = {
      component: NextLink,
      href: path,
    };
    return (
      <>
        <Box
          component="li"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ButtonBase
            disableRipple
            sx={{
              alignItems: "center",
              borderRadius: 1,
              position: "relative",
              display: "flex",
              justifyContent: "flex-start",
              px: "16px",
              py: "8px",
              textAlign: "left",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              ...(active && {
                color: "primary.main",
              }),
            }}
            {...linkProps}
          >
            <Typography component="span" variant="subtitle2" fontSize={14}>
              {title}
            </Typography>
            <SvgIcon
              sx={{
                fontSize: 14,
                ml: 1,
                width: 20,
                height: 20,
              }}
              aria-hidden="true"
            >
              <ChevronDownIcon />
            </SvgIcon>
            {open && (
              <Box
                onMouseEnter={handleMouseEnter}
                sx={{
                  left: 0,
                  position: "absolute",
                  top: 54,
                  zIndex: (theme) => theme.zIndex.appBar + 100,
                  width: "100%",
                }}
              >
                <Paper
                  onMouseLeave={handleMouseLeave}
                  elevation={16}
                  sx={{
                    backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: "blur(6px)",
                    mx: "auto",
                    width: 380,
                    p: 1,
                  }}
                >
                  {children}
                </Paper>
              </Box>
            )}
          </ButtonBase>
        </Box>
      </>
    );
  }

  // Simple

  let linkProps = undefined;

  if (path) {
    const isExternal = path.startsWith("http");

    linkProps = isExternal
      ? {
        component: "a",
        href: path,
        target: "_blank",
      }
      : {
        component: NextLink,
        href: path,
      };
  }

  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ButtonBase
        disableRipple
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          px: "16px",
          py: "8px",
          textAlign: "left",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          ...(active && {
            color: "primary.main",
          }),
        }}
        {...linkProps}
      >
        <Typography component="span" variant="subtitle2" fontSize={14}>
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  );
};

TopNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
