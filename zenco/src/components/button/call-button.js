import { Box, ButtonBase, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CallIcon from "../../icons/icon-button/call";
import { ToastMessage } from "../custom-toast";
export const CallButton = () => {
  const { overviewInfo } = useSelector((state) => state.information);

  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    if (!!overviewInfo && Object.keys(overviewInfo).length > 0) {
      const number = overviewInfo.overview.filter((i) => i.type === "hotline");
      if (!!number) {
        setPhoneNumber(number[0]?.noidung_vi);
      }
    }
  }, [overviewInfo]);

  const handleClickIcon = () => {
    if (phoneNumber === "") {
      ToastMessage("Số điện thoại đang chờ cập nhật", "warning", "bottom-right");
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "9.375rem",
        right: "1.5rem",
        zIndex: 1000,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip title="Kết nối qua điện thoại">
        <Box
          component="a"
          sx={{
            backgroundColor: "background.paper",
            borderRadius: "50%",
            display: "flex",
            p: 0.5,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          href={`tel:${phoneNumber}`}
          onClick={handleClickIcon}
        >
          <ButtonBase
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.75rem",
              height: "2.75rem",
            }}
            aria-label="Connect via phone"
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                p: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CallIcon />
            </Box>
          </ButtonBase>
        </Box>
      </Tooltip>
    </Box>
  );
};

CallButton.propTypes = {
  onClick: PropTypes.func,
};
