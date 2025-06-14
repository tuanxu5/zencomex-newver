import { Box, Button, CardHeader, Grid, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastMessage } from "../../../components/custom-toast";
import { TextAnimationFadeUp } from "../../../components/section-animate";
import axiosInstance from "../../../utils/axios";

const BannerContact = new URL("../../../assets/images/contact.png", import.meta.url).href;


const ContactWithUs = () => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(255).required("Tên là bắt buộc"),
    phone: Yup.string().required("Số điện thoại là bắt buộc"),
    email: Yup.string().email("Must be a valid email").max(255).required("Email là bắt buộc"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await axiosInstance.post("/email/send", values);
      if (response && response.data.DT) {
        ToastMessage(
          "Bạn đã gửi thông tin thành công, chúng tôi sẽ sớm liên lạc với bạn",
          "success",
          "top-right",
          5000
        );
        resetForm();
      } else {
        ToastMessage("Gửi thông tin không thành công ", "error");
      }
    },
  });

  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item xs={12} md={6.5} display="flex" justifyContent="center">
        <TextAnimationFadeUp>
          <Box
            component="img"
            src={BannerContact}
            sx={{
              width: "100%",
              height: "auto",
            }}
            alt="Hình ảnh liên hệ"
          />
        </TextAnimationFadeUp>
      </Grid>

      <Grid item xs={12} md={5.5} style={{ width: "100%", height: "fit-cont ent" }}>
        <TextAnimationFadeUp>
          <Box>
            <CardHeader
              sx={{ pb: 3, pl: 0, pt: 0 }}
              title={
                <h1 style={{ fontSize: "1.75rem", margin: "0px 0px 12px 0px", padding: "0px" }}>
                  Bạn cần chúng tôi hỗ trợ?
                </h1>
              }
              subheader={"Nhập thông tin của bạn"}
            />
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Tên của bạn"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Số điện thoại"
                  name="phone"
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  type="text"
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      formik.handleChange(e);
                    }
                  }}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Thông tin Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.message && formik.errors.message)}
                  fullWidth
                  multiline
                  helperText={formik.touched.message && formik.errors.message}
                  label="Nội dung yêu cầu của bạn"
                  name="message"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
              </Stack>

              <Button fullWidth size="large" sx={{ mt: 8, mb: 2, fontSize: "1rem" }} type="submit" variant="contained">
                Gửi thông tin của bạn
              </Button>
            </form>
          </Box>
        </TextAnimationFadeUp>
      </Grid>
    </Grid >
  );
};

export default ContactWithUs;
