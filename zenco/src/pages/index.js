import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSelector } from "react-redux";
import { usePageView } from "../hooks/use-page-view";

// Tối ưu: Sử dụng React.lazy kết hợp với suspense
const MarketingLayout = dynamic(() => import("../layouts/marketing").then((mod) => mod.Layout), { ssr: true });

// Sử dụng priority loading cho component quan trọng
const HomeSlide = dynamic(() => import("../sections/home/home-slide"), {
  ssr: true,
  loading: () => <div style={{ height: "400px", background: "#f0f0f0" }}></div>,
});

// Lazy load các components còn lại với loading indicator phù hợp
const HomeIntroduction = dynamic(() => import("../sections/home/home-introduction"), {
  ssr: false,
  loading: () => <div style={{ height: "300px", background: "#f5f5f5" }}></div>,
});

// Sử dụng webpack magic comments để tối ưu chunk loading
const HomeProducts = dynamic(() => import(/* webpackChunkName: "home-products" */ "../sections/home/home-products"), {
  ssr: false,
});

// Các components ít quan trọng hơn không cần ssr
const HomeSlideNews = dynamic(() => import("../sections/home/home-slide-news"), {
  ssr: false,
  loading: () => <div style={{ height: "200px" }}></div>,
});

const HomeSlidePartner = dynamic(() => import("../sections/home/home-slide-partner"), {
  ssr: false,
  loading: () => <div style={{ height: "150px" }}></div>,
});

const HomeSlideServices = dynamic(() => import("../sections/home/home-slide-services"), {
  ssr: false,
  loading: () => <div style={{ height: "200px" }}></div>,
});

const HomeStatistics = dynamic(() => import("../sections/home/home-statistics"), {
  ssr: false,
  loading: () => <div style={{ height: "150px" }}></div>,
});

// Tối ưu: Sử dụng memo để tránh render lại không cần thiết
import { memo, useMemo } from "react";

const Page = () => {
  const { overviewInfo } = useSelector((state) => state.information);

  // Tối ưu: Sử dụng useMemo thay vì useState cho dữ liệu tĩnh
  const home = useMemo(() => {
    if (overviewInfo?.menu?.[0]) {
      const data = overviewInfo.menu[0];
      return {
        id: data?.id,
        title: data?.ten_vi,
        path: data?.tenkhongdau,
        titleSeo: data?.title,
        keywordSeo: data?.keywords,
        descriptionSeo: data?.description,
        intro: data?.intro,
      };
    }
    return null;
  }, [overviewInfo]);

  usePageView();

  // Tối ưu: Preconnect đến domain của API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Tối ưu: Tạo JSON-LD một lần để tránh tạo lại mỗi khi render
  const jsonLd = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Zencomex",
      url: apiUrl,
      description: "Trang chính của Zencomex - Cung cấp vật tư phụ ME chất lượng cao",
      potentialAction: {
        "@type": "SearchAction",
        target: `${apiUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }, [apiUrl]);

  const title = home?.titleSeo || "Trang chủ - Zencomex";
  const description = home?.descriptionSeo || "Trang chính của Zencomex - Cung cấp vật tư phụ ME chất lượng cao";
  const keywords = home?.keywordSeo || "vật tư ME, phụ tùng ME, Zencomex, vật tư công nghiệp";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href={apiUrl} />
        <link rel="dns-prefetch" href={apiUrl} />
        <meta charSet="UTF-8" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </Head>

      <NextSeo
        title={title}
        description={description}
        canonical={apiUrl}
        openGraph={{
          url: apiUrl,
          title: title,
          description: description,
          images: [
            {
              url: `${apiUrl}/upload/hinhanh/avatar.jpg`,
              width: 800,
              height: 600,
              alt: "Zencomex Image",
            },
          ],
          site_name: "Zencomex",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@zencomex",
          title: title,
          description: description,
          image: `${apiUrl}/upload/hinhanh/avatar.jpg`,
        }}
      />

      <main>
        <HomeSlide />
        <HomeIntroduction />
        <HomeSlideServices />
        <HomeStatistics />
        <HomeProducts />
        <HomeSlidePartner />
        <HomeSlideNews />
      </main>
    </>
  );
};

// Tối ưu: Sử dụng memo để tránh re-renders không cần thiết
const MemoizedPage = memo(Page);

// Thêm getLayout cho container component
MemoizedPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default MemoizedPage;
