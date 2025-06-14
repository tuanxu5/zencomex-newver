import { Box } from "@mui/material";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useState } from "react";
import { CustomBreadcrumb } from "../components/custom-breadscrum";
import { usePageView } from "../hooks/use-page-view";
import { Layout as MarketingLayout } from "../layouts/marketing";
import axiosInstance, { BASE_URL } from "../utils/axios";
import { CheckMenuItem } from "../utils/check-menu-item";
import ViewContactsList from "./components/contacts/view-contacts-list";
import ViewGeneralDetail from "./components/general/view-general-detail";
import ViewGeneralList from "./components/general/view-general-list";
import ViewIntroduction from "./components/introduction/view-introduction";
import ViewNewLists from "./components/news/view-news-list";
import BgOnProduct from "./components/products/bgon_product";
import ViewProductDetail from "./components/products/view-product-detail";
import ViewProductList from "./components/products/view-product-list";
import ViewProjectsList from "./components/projects/view-projects-list";
import ViewServicesList from "./components/services/view-services-list";

const Page = ({ detail, search, tag, keywords }) => {
  usePageView();
  const [breadcrumbsList, setBreadcrumbsList] = useState([]);

  const renderCPNByType = () => {
    switch (detail.type) {
      case "product":
        return <ViewProductDetail data={detail} setBreadcrumbsList={setBreadcrumbsList} />;
      case "general":
        return <ViewGeneralDetail detail={detail} setBreadcrumbsList={setBreadcrumbsList} />;
      case "gioi-thieu":
        return <ViewIntroduction introduction={detail} setBreadcrumbsList={setBreadcrumbsList} />;
      case "san-pham":
        return <ViewProductList detail={detail} setBreadcrumbsList={setBreadcrumbsList} search={search} />;
      case "category":
        return <ViewProductList detail={detail} setBreadcrumbsList={setBreadcrumbsList} />;
      case "childCategory":
        return <ViewProductList detail={detail} setBreadcrumbsList={setBreadcrumbsList} />;
      case "du-an":
        return (
          <ViewProjectsList generals={detail?.child} setBreadcrumbsList={setBreadcrumbsList} item={detail} tag={tag} />
        );
      case "dich-vu":
        return (
          <ViewServicesList generals={detail?.child} setBreadcrumbsList={setBreadcrumbsList} item={detail} tag={tag} />
        );
      case "tin-tuc":
        return (
          <ViewNewLists
            generals={detail?.child}
            setBreadcrumbsList={setBreadcrumbsList}
            item={detail}
            tag={tag}
            keywords={keywords}
          />
        );
      case "lien-he":
        return (
          <ViewContactsList generals={detail?.child} setBreadcrumbsList={setBreadcrumbsList} item={detail} tag={tag} />
        );
      default:
        return (
          <ViewGeneralList generals={detail?.child} setBreadcrumbsList={setBreadcrumbsList} item={detail} tag={tag} />
        );
    }
  };

  const renderFolderImage = () => {
    switch (detail.type) {
      case "product":
        return "product";
      case "general":
        return "baiviet";
      default:
        return "";
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbsList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: `https://zencomex.com/${item.alias || ""}`,
    })),
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: detail?.title,
    image: [detail?.image],
    description: detail?.descriptionSeo,
    brand: {
      "@type": "Brand",
      name: detail?.parent?.title,
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "VND",
      price: "0.00",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <Head>
        <title>{detail?.titleSeo || `${detail?.title} - Zencomex` || "Chi tiết sản phẩm - Zencomex"}</title>
        <meta name="description" content={detail?.descriptionSeo || detail?.intro || "Thông tin chi tiết sản phẩm."} />
        <meta name="keywords" content={detail?.keywordSeo || `${detail?.title || "sản phẩm"}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_API_URL}/${detail?.alias}`} />
        <meta charSet="UTF-8" />
        <script type="application/ld+json" defer>
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Zencomex",
            url: process.env.NEXT_PUBLIC_API_URL,
            description: detail?.description || "Trang thông tin chi tiết",
          })}
        </script>
        {detail?.type === "product" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productJsonLd),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <meta property="og:title" content={detail?.titleSeo || `${detail?.title} - Zencomex`} />
        <meta
          property="og:description"
          content={detail?.descriptionSeo || detail.intro || "Thông tin chi tiết sản phẩm."}
        />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_API_URL}/${detail?.alias}`} />
        <meta property="og:site_name" content="Zencomex" />
        <meta
          property="og:image"
          content="https://zencomex.com/api/upload/banners/Banner_website_zenco_1735015320660.webp"
        />
        <meta property="og:image:width" content="120" />
        <meta property="og:image:height" content="50" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zencomex" />
        <meta name="twitter:title" content={detail?.titleSeo || `${detail?.title} - Zencomex`} />
        <meta
          name="twitter:description"
          content={detail?.descriptionSeo || detail?.intro || "Thông tin chi tiết sản phẩm."}
        />
        <meta
          name="twitter:image"
          content="https://zencomex.com/api/upload/banners/Banner_website_zenco_1735015320660.webp"
          key="twitter:image"
        />
        <meta property="twitter:image:width" content="120" />
        <meta property="twitter:image:height" content="50" />
      </Head>
      {/* NextSeo configuration */}
      <NextSeo
        title={detail?.titleSeo || `${detail?.title} - Zencomex` || "Chi tiết sản phẩm - Zencomex"}
        description={detail?.descriptionSeo || detail?.intro || "Thông tin chi tiết sản phẩm."}
        canonical={`${process.env.NEXT_PUBLIC_API_URL}/${detail?.alias}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_API_URL}/${detail?.alias}`,
          title: detail?.title || "Chi tiết sản phẩm - Zencomex",
          description: detail?.intro || "Thông tin chi tiết sản phẩm.",
          images: [
            {
              url: `${BASE_URL}/upload/${renderFolderImage()}/${detail?.image}?ver=${new Date().getTime()}`,
              width: 800,
              height: 600,
              alt: detail.title || "Sản phẩm Zencomex",
            },
          ],
          site_name: "Zencomex",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@zencomex",
          title: detail.title || "Chi tiết sản phẩm - Zencomex",
          description: detail.intro || "Thông tin chi tiết sản phẩm.",
          image: `${BASE_URL}/upload/${renderFolderImage()}/${detail?.image}?ver=${new Date().getTime()}`,
        }}
      />
      <BgOnProduct />
      <Box
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          pt: 6,
          // pl: xlUp ? 16 : mdUp ? 4 : 0,
          // pr: xlUp ? 16 : mdUp ? 4 : 0,
        }}
      >
        <CustomBreadcrumb breadcrumbsList={breadcrumbsList} setBreadcrumbsList={setBreadcrumbsList} />
        {renderCPNByType()}
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const { detail } = context.query;
  const searchQuery = context.query.search || "";
  const tagQuery = context.query.tag || "";
  const keywordsQuery = context.query.keywords || "";

  const res = await axiosInstance.get(`/footer?type=menu&tenkhongdau=${detail}`);
  if (res && res.data.DT) {
    const isMenu = res.data.DT;
    if (isMenu.alias === "gioi-thieu") {
      const response = await axiosInstance.get(`/general/${isMenu.alias}`);

      if (response && response.data.DT) {
        const newData = response.data.DT;
        return {
          props: {
            detail: { ...newData[0], type: isMenu.alias },
            search: searchQuery,
            tag: tagQuery,
            keywords: keywordsQuery,
          },
        };
      }
    }
    return {
      props: {
        detail: isMenu,
        search: searchQuery,
        tag: tagQuery,
        keywords: keywordsQuery,
      },
    };
  } else {
    try {
      const [isValid, isValidUrlNewCategory, isValidGeneral] = await Promise.allSettled([
        axiosInstance.post(`/product/check/`, { url: detail }),
        axiosInstance.post(`/news-category/check-url/`, { url: detail }),
        axiosInstance.post(`/general/check/`, { url: detail }),
      ]);

      if (isValid.status === "fulfilled" && isValid.value.data.DT) {
        return {
          props: {
            detail: isValid.value.data.DT,
            search: searchQuery,
            tag: tagQuery,
            keywords: keywordsQuery,
          },
        };
      }

      if (isValidUrlNewCategory.status === "fulfilled" && isValidUrlNewCategory.value.data.DT) {
        return {
          props: {
            detail: isValidUrlNewCategory.value.data.DT,
            search: searchQuery,
            tag: tagQuery,
            keywords: keywordsQuery,
          },
        };
      }

      // Kiểm tra dữ liệu chung
      if (isValidGeneral.status === "fulfilled" && isValidGeneral.value.data.DT) {
        return {
          props: {
            detail: {
              ...isValidGeneral.value.data.DT,
              parent: CheckMenuItem(isValidGeneral.value.data.DT.parent),
            },
            search: searchQuery,
            tag: tagQuery,
            keywords: keywordsQuery,
          },
        };
      }

      // Nếu không tìm thấy dữ liệu nào
      return { notFound: true };
    } catch (error) {
      console.error("Error in getServerSideProps:", error);
      return { notFound: true };
    }
  }
}

Page.getLayout = (page) => <MarketingLayout scrollToTop={true}>{page}</MarketingLayout>;

export default Page;
