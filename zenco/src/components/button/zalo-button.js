import { Box, ButtonBase, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ZaloIcon } from "../../icons/icon-button/zalo";
import { ToastMessage } from "../custom-toast";
export const ZaloButton = () => {
  const { overviewInfo } = useSelector((state) => state.information);

  const [linkZalo, setLinkZalo] = useState("");
  useEffect(() => {
    if (!!overviewInfo && Object.keys(overviewInfo).length > 0) {
      const zalo = overviewInfo.socials.filter((i) => i.ten_vi === "Zalo");
      if (!!zalo) {
        setLinkZalo(zalo[0]?.noidung_vi);
      }
    }
  }, [overviewInfo]);

  const handleOpenZalo = () => {
    if (linkZalo !== "") {
      window.open(linkZalo, "_blank");
    } else {
      ToastMessage("Link Zalo đang chờ cập nhật", "warning", "bottom-right");
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "5.625rem",
        right: "1.5rem",
        zIndex: 1000,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip title="Kết nối qua Zalo">
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: "50%",
            display: "flex",
            p: 0.5,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={handleOpenZalo}
        >
          <ButtonBase
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "10px",
              width: "2.75rem",
              height: "2.75rem",
            }}
            aria-label="Connect via Zalo"
          >
            <ZaloIcon />
          </ButtonBase>
        </Box>
      </Tooltip>
    </Box>
  );
};

ZaloButton.propTypes = {
  onClick: PropTypes.func,
};
