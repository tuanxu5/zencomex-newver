import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import NextLink from "next/link";
import { BoxEmpty } from "../../../components/view-layout/box-empty";
import { BASE_URL } from "../../../utils/axios";
import { formatTimeDMY } from "../../../utils/format-daytime";

const CardNewList = ({ news }) => {
  return (
    <Stack
      sx={{
        minHeight: 300,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Bài viết gần đây
        </Typography>
      </Box>
      {news.length > 0 ? (
        <div style={{ padding: "0px", marginTop: "12px" }}>
          {news &&
            news?.map((item) => {
              return (
                <ListItem mt={2} key={item.id} style={{ padding: "6px 0px", display: "flex", gap: "10px" }}>
                  <Box
                    style={{
                      objectFit: "cover",
                      width: "60px",
                      height: "60px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <Image
                      src={`${BASE_URL}/upload/baiviet/${item.image}`}
                      alt={`Hình ảnh ${item.image}`}
                      width={60}
                      height={60}
                      style={{
                        objectFit: "cover",
                        // width: "58px",
                        // height: "58px",
                        clipPath: "inset(3px)",
                        borderRadius: "16px",
                      }}
                    />
                  </Box>

                  <ListItemText
                    disableTypography
                    primary={
                      <NextLink
                        href={item.alias}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                            "&:hover": {
                              color: "#004db6",
                            },
                          }}
                          variant="subtitle2"
                        >
                          {item.title}
                        </Typography>
                      </NextLink>
                    }
                    secondary={
                      <Typography color="#9fa3a7" sx={{ whiteSpace: "nowrap", fontSize: "11px" }} variant="caption">
                        {formatTimeDMY(item.dateUpdate)}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                </ListItem>
              );
            })}
        </div>
      ) : (
        <Box width={"40%"} m="auto">
          <BoxEmpty note={"Chưa có bài viết"} />
        </Box>
      )}
    </Stack>
  );
};
export default CardNewList;
