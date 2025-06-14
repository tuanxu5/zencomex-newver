import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance, { BASE_URL } from "../../../utils/axios";

const BgOnProduct = () => {
  const [coverImage, setCoverImage] = useState([]);
  const getCover = async () => {
    const result = await axiosInstance.get("/image/list?type=cover");
    if (result.data.DT) {
      setCoverImage(result.data.DT);
    }
  };

  useEffect(() => {
    getCover();
  }, []);
  return (
    <>
      {coverImage.length > 0 ? (
        <Box
          component={"img"}
          src={`${BASE_URL}/upload/${coverImage[0]?.link}`}
          loading="lazy"
          width={"100%"}
          height={160}
          alt="Banner zencomex"
          priority
          sx={{
            width: "100%",
            // objectFit: "contain",
            objectPosition: "center",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            backgroundColor: "#BBDEFB",
            width: "100%",
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
};
export default BgOnProduct;
