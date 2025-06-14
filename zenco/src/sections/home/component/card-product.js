import { Box, Card, CardContent, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useState } from "react";
import LazyLoadedImage from "../../../components/lazy-loaded-image";

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const CardProduct = ({ child }) => {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          transition: "transform 0.4s ease-in-out",
          borderRadius: "6px",
          p: 1,
          backgroundColor: "#F5F5F5",
          position: "relative",
          mb: smUp ? 2 : 0,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <NextLink href={child.alias} style={{ textDecoration: "none" }}>
          <Card
            sx={{
              borderRadius: 0,
              width: "100%",
              height: smUp ? 220 : 150,
              position: "relative",
            }}

          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transition: "opacity 0.3s ease-in-out",
                borderRadius: "16px",
                position: "relative",
                aspectRatio: 1,
              }}
            >
              {/* Ảnh mặc định */}
              {hovered && child?.fileAttach?.length > 0 ? (
                <LazyLoadedImage
                  src={child?.fileAttach ? `/upload/${child?.fileAttach[0]}` : ""}
                  alt={`Hình ảnh sản phẩm: ${child.name}`}
                  style={{
                    opacity: hovered ? 1 : 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />

              ) : (
                <LazyLoadedImage
                  src={isValidUrl(child.image) ? child.image : `/upload/product/${child.image}`}
                  alt={`Hình ảnh sản phẩm: ${child.name}`}
                  style={{
                    opacity: hovered ? 0 : 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
              )}

              {/* Ảnh thứ hai khi hover */}
            </Box>
          </Card>

          <CardContent sx={{ padding: 1 }}>
            <Stack
              alignItems="center"
              justifyItems="center"
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: smUp ? "14px !important" : "12px !important",
                  fontWeight: 600,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 1,
                  textOverflow: "ellipsis",
                  lineHeight: 1.3,
                  mt: 0.5,
                  color: "#0000AA",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="h3"
                title={child.name}
              >
                {child.name}
              </Typography>
              <Typography color="text.secondary" noWrap variant="body2">
                <Typography
                  color="red"
                  component="span"
                  variant="subtitle2"
                  sx={{
                    fontSize: smUp ? 14 : 12,
                    fontStyle: "italic",
                  }}
                >
                  Liên hệ
                </Typography>{" "}
              </Typography>
            </Stack>
          </CardContent>
        </NextLink>
      </Card>
    </motion.div>
  );
};

export default CardProduct;
