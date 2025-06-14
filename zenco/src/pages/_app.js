import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { RTL } from "../components/rtl";
import { Toaster } from "../components/toaster";
import { gtmConfig } from "../config";
import { AuthConsumer, AuthProvider } from "../contexts/auth/jwt-context";
import { SettingsConsumer, SettingsProvider } from "../contexts/settings-context";
import { gtm } from "../libs/gtm";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

// // Remove if nprogress is not used
// import "../libs/nprogress";
// // Remove if mapbox is not used
// import "../libs/mapbox";
// // Remove if locales are not used
// import "../locales/i18n";

// scroll
import "../styles/custom-scroll.css";
import "../styles/global.css";

import Script from "next/script";
import LoadingScreen from "../components/loading-screen";
import { store } from "../redux/store";

const clientSideEmotionCache = createEmotionCache();

const useAnalytics = () => {
  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);
};

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useAnalytics();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {
                      // Prevent theme flicker when restoring custom settings from browser storage
                      if (!settings.isInitialized) {
                        // return <LoadingScreen variant="minimal" />;
                      }

                      const theme = createTheme({
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,
                      });

                      return (
                        <ThemeProvider theme={theme}>
                          <Head>
                            <meta name="color-scheme" content={settings.paletteMode} />
                            <meta name="theme-color" content={theme.palette.neutral[900]} />
                            <title>Công Ty TNHH Sản Xuất Và Xuất Nhập Khẩu Zenco - ZENCOMEX</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <meta name="robots" content="index, follow" />
                            <meta charSet="UTF-8" />
                            <meta
                              property="og:title"
                              content="Công Ty TNHH Sản Xuất Và Xuất Nhập Khẩu Zenco - ZENCOMEX"
                            />
                            <meta property="og:site_name" content="Zencomex" />
                            <meta property="og:type" content="website" />
                            <meta property="og:title" content="Công Ty TNHH Sản Xuất Và Xuất Nhập Khẩu Zenco" />
                            <meta
                              property="og:description"
                              content="Công ty TNHH sản xuất và xuất nhập khẩu ZENCO (ZCG), là công ty hoạt động trong lĩnh vực sản xuất và cung cấp vật liệu công nghiệp, phụ trợ cho các công trình công nghiệp và dân dụng."
                            />
                            <meta property="og:url" content="https://zencomex.com" />
                            <meta
                              property="og:image"
                              content="https://zencomex.com/api/upload/banners/Banner_website_zenco_1735015320660.webp"
                              key="og:image"
                            />
                            <meta property="og:image:width" content="120" />
                            <meta property="og:image:height" content="50" />
                            {/* Twitter meta tags */}
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:title" content="Công Ty TNHH Sản Xuất Và Xuất Nhập Khẩu Zenco" />
                            <meta
                              name="twitter:description"
                              content="Công ty TNHH sản xuất và xuất nhập khẩu ZENCO (ZCG), là công ty hoạt động trong lĩnh vực sản xuất và cung cấp vật liệu công nghiệp, phụ trợ cho các công trình công nghiệp và dân dụng."
                            />
                            <meta
                              name="twitter:image"
                              content="https://zencomex.com/api/upload/banners/Banner_website_zenco_1735015320660.webp"
                              key="twitter:image"
                            />
                            <meta property="twitter:image:width" content="120" />
                            <meta property="twitter:image:height" content="50" />
                            <link rel="preconnect" href="https://fonts.googleapis.com" />
                            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                            <link
                              rel="stylesheet"
                              href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                            />
                          </Head>
                          <Script
                            src="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                            strategy="lazyOnload"
                          />
                          <RTL direction={settings.direction}>
                            <CssBaseline />
                            {!auth.isInitialized ? <LoadingScreen /> : getLayout(<Component {...pageProps} />)}
                            <Toaster />
                          </RTL>
                        </ThemeProvider>
                      );
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
