import { Box, Container, FormHelperText, Grid, Input, InputAdornment, Stack, Tooltip, Typography } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";

//icon
import CallIcon from "@mui/icons-material/Call";
import { useSelector } from "react-redux";
import { ToastMessage } from "../../components/custom-toast";
import { TextAnimationFadeUp } from "../../components/section-animate";
import { SendIcon } from "../../icons/icon-button/send";
import { IconFacebook, IconInstagram, IconLinked, IconTwitter, IconYoutube } from "../../icons/icon-button/socials";
import { paths } from "../../paths";
import axiosInstance from "../../utils/axios";

const socials = [
  {
    name: "Facebook",
    icon: <IconFacebook />,
  },
  {
    name: "Twitter",
    icon: <IconTwitter />,
  },
  {
    name: "Linked",
    icon: <IconLinked />,
  },
  {
    name: "Youtube",
    icon: <IconYoutube />,
  },
  {
    name: "Instagram",
    icon: <IconInstagram />,
  },
];
const HomeFooter = (props) => {
  const { overviewInfo } = useSelector((state) => state.information);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
  };

  const handleSendEmail = async () => {
    const body = {
      name: email,
      phone: "00000000",
      email: email,
      message: "Liên lạc với khách qua mail hỏi đi",
    };
    const response = await axiosInstance.post("/email/send", body);
    if (response && response.data.DT) {
      ToastMessage("Bạn đã gửi thông tin thành công, chúng tôi sẽ sớm liên lạc với bạn", "success", "top-right", 5000);
      setEmail("");
    } else {
      ToastMessage("Gửi mail không thành công ", "success");
    }
  };

  return (
    <Box
      sx={{
        // 111927
        backgroundColor: "#003769",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        py: 5,
        minHeight: 400,
      }}
    >
      <Container maxWidth="xl">
        {overviewInfo && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box sx={{ p: { xs: 0, md: 2 } }} pr={4}>
                  <TextAnimationFadeUp>
                    <Stack spacing={2} sx={{ p: { xs: 0, md: 2 } }}>
                      <Typography
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                        }}
                      >
                        Thông tin liên hệ
                      </Typography>
                      {Object.keys(overviewInfo).length > 0 &&
                        overviewInfo.overview?.map((child, index) => {
                          const results = () => {
                            switch (child.ten_vi) {
                              case "Hotline":
                                return (
                                  <Box
                                    sx={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                    component="a"
                                    href={`tel:${child.noidung_vi}`}
                                  >
                                    {child.noidung_vi}
                                  </Box>
                                );
                              case "Email":
                                return (
                                  <Box
                                    sx={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                    component="a"
                                    href={`mailto:${child.noidung_vi}`}
                                  >
                                    {child.noidung_vi}
                                  </Box>
                                );

                              default:
                                return child.noidung_vi;
                            }
                          };
                          return (
                            <span
                              key={index}
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                · {child.ten_vi}
                              </span>{" "}
                              : {results()}
                            </span>
                          );
                        })}
                    </Stack>
                  </TextAnimationFadeUp>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextAnimationFadeUp>
                      <Box p={2} sx={{ p: { xs: 0, md: 2 } }}>
                        <Stack spacing={2} p={2} sx={{ p: { xs: 0, md: 2 } }}>
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            Chính sách hỗ trợ
                          </Typography>
                          {Object.keys(overviewInfo).length > 0 &&
                            overviewInfo.policies?.map((p, index) => {
                              return (
                                <Typography
                                  key={index}
                                  sx={{
                                    color: "white",
                                    "&:hover": {
                                      color: "#00a1ff",
                                    },
                                    fontSize: "13px",
                                    textDecoration: "none",
                                  }}
                                  component={NextLink}
                                  href={paths.detail(p.tenkhongdau)}
                                >
                                  {p.ten_vi}
                                </Typography>
                              );
                            })}
                        </Stack>
                      </Box>
                    </TextAnimationFadeUp>
                  </Grid>
                  <Grid item xs={12}>
                    <TextAnimationFadeUp>
                      <Box sx={{ p: { xs: 0, md: 2 } }}>
                        <Stack spacing={2} sx={{ p: { xs: 0, md: 2 } }}>
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            Phòng kinh doanh
                          </Typography>
                          {Object.keys(overviewInfo).length > 0 &&
                            overviewInfo.sales?.map((child) => (
                              <Stack
                                key={child.id}
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                sx={{
                                  color: "white",
                                  textDecoration: "none",
                                  "&:hover": {
                                    color: "#00a1ff",
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "white",
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    "&:hover": {
                                      color: "#00a1ff",
                                    },
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                  component="a"
                                  href={`tel:${child.noidung_vi}`}
                                >
                                  <CallIcon
                                    sx={{
                                      fontSize: 15,
                                    }}
                                  />
                                  <span>
                                    {child.noidung_vi} - {child.ten_vi}
                                  </span>
                                </Box>
                              </Stack>
                            ))}
                        </Stack>
                      </Box>{" "}
                    </TextAnimationFadeUp>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5}>
                <TextAnimationFadeUp>
                  <Box p={2} sx={{ p: { xs: 0, md: 2 } }}>
                    <Stack p={2} sx={{ p: { xs: 0, md: 2 } }}>
                      <Typography
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                        }}
                      >
                        Đăng kí báo giá
                      </Typography>
                      <Input
                        disableUnderline
                        type="email"
                        placeholder="Nhập địa chỉ Email của bạn"
                        sx={{
                          flexGrow: 1,
                          border: "1px solid #ccc",
                          borderRadius: 5,
                          pl: 2.5,
                          mt: 2,
                          color: "white",
                          borderColor: error ? "#DB1010" : "#ccc",
                          height: "48px",
                          "& input::placeholder": {
                            fontSize: "12px",
                          },
                          "& input": {
                            fontSize: "12px",
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="start">
                            <Tooltip title="Gửi thông tin">
                              <Box
                                onClick={handleSendEmail}
                                sx={{
                                  background: "#004db6",
                                  borderRadius: "100px",
                                  width: 36,
                                  height: 36,
                                  color: "white",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  mr: -0.5,
                                  pt: "3px",
                                  outline: "none",
                                }}
                                aria-label="Gửi thông tin"
                                role="button"
                                tabIndex={0}
                              >
                                <SendIcon />
                              </Box>
                            </Tooltip>
                          </InputAdornment>
                        }
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {error && (
                        <FormHelperText sx={{ color: "#DB1010", mt: 1 }}>Địa chỉ email không hợp lệ</FormHelperText>
                      )}
                    </Stack>
                    <Stack>
                      <Box height={260} sx={{ p: { xs: 0, md: 2 }, mt: { xs: 1, md: 0 } }}>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.2378530641377!2d106.6457894!3d10.945397199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d757489de811%3A0xcdb8c60b74a8aec0!2zVuG6rXQgVMawIFBo4bulIC0gWmVuY29tZXg!5e0!3m2!1svi!2s!4v1735781588005!5m2!1svi!2s"
                          width="100%"
                          height="100%"
                          style={{ border: 0, borderRadius: "10px" }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps Location"
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TextAnimationFadeUp>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          height: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "64px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          © Bản quyền thuộc về Công ty TNHH sản xuất và xuất nhập khẩu Zenco - ZENCOMEX
        </span>

        <Stack direction="row" spacing={2} p={2}>
          {Object.keys(overviewInfo).length > 0 &&
            overviewInfo.socials?.map((social, index) => {
              const sizeIcon = () => {
                switch (social.ten_vi) {
                  case "Twitter":
                    return 26;
                  case "Youtube":
                    return 22;
                  default:
                    return 30;
                }
              };
              if (social.ten_vi === "Zalo") return;
              const icon = socials.find((item) => item.name === social.ten_vi)?.icon;
              return (
                <Tooltip key={index} title={social.ten_vi}>
                  <Box
                    component="a"
                    href={social.noidung_vi !== "" ? social.noidung_vi : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Go to ${social.ten_vi}`}
                    sx={{
                      fontSize: sizeIcon(),
                      cursor: "pointer",
                      "&:hover": {
                        fontSize: 36,
                      },
                      width: 36,
                      height: 36,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                    onClick={(e) => {
                      if (social.noidung_vi === "") {
                        e.preventDefault();
                        ToastMessage(`Link ${social.ten_vi} đang chờ cập nhật...`, "warning", "bottom-right");
                      }
                    }}
                  >
                    {icon}
                  </Box>
                </Tooltip>
              );
            })}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeFooter;
