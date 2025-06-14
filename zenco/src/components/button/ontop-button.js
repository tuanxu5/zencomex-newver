import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box, ButtonBase, SvgIcon, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

export const OntopButton = (props) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "1.875rem",
        right: "1.5rem",
        zIndex: 1000,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={props.onClick}
    >
      <Tooltip title="Lên đầu trang">
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: "50%",
            p: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={handleScrollToTop}
        >
          <ButtonBase
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              color: "primary.contrastText",
              p: "10px",
              width: "2.75rem",
              height: "2.75rem",
            }}
            aria-label="Scroll to top"
          >
            <SvgIcon>
              <ExpandLessIcon />
            </SvgIcon>
          </ButtonBase>
        </Box>
      </Tooltip>
    </Box>
  );
};

OntopButton.propTypes = {
  onClick: PropTypes.func,
};
