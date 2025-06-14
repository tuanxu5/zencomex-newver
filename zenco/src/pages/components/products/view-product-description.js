import { Box, Container, Typography } from "@mui/material";
import TiptapEditor from "../../../components/tiptap/tiptapEditor";

const ViewProductDescription = ({ data, type, sx = {}, expand = true }) => {
  const handleParseHtml = () => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    doc.querySelectorAll("[style]").forEach((el) => {
      el.style.fontFamily = `"Arial", serif`;
    });
    return doc.body.innerHTML;
  };

  return (
    <Container maxWidth="xl" sx={{ ...sx, padding: "0px !important" }}>
      {data && data !== "" && (
        <Box>
          {type === "product" && (
            <Typography
              variant="h3"
              style={{
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              MÔ TẢ SẢN PHẨM
            </Typography>
          )}
          <Box>
            <TiptapEditor expand={expand} contentEditor={handleParseHtml()} isDisable={true} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ViewProductDescription;
