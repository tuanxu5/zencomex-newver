import NextLink from "next/link";
import Head from "next/head";
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePageView } from "../hooks/use-page-view";
import { paths } from "../paths";

const Page = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));

    usePageView();

    return (
        <>
            <Head>
                <title>Zencomex: Server Error</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    py: "80px",
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 6,
                        }}
                    >
                        <Box
                            alt="Internal server error"
                            component="img"
                            src="/assets/errors/error-500.png"
                            sx={{
                                height: "auto",
                                maxWidth: "100%",
                                width: 400,
                            }}
                        />
                    </Box>
                    <Typography align="center" variant={mdUp ? "h1" : "h4"}>
                        500 - Lỗi từ hệ thống máy chủ
                    </Typography>
                    <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
                        Trang truy cập hiện đang nâng cấp, quay lại sau nhé.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <Button component={NextLink} href={paths.index}>
                            Trang chủ
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Page;
