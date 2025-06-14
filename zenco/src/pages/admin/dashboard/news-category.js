import { Box, Breadcrumbs, Button, Card, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Head from "next/head";
import NextLink from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";

//category
import { SearchToolbarTable } from "../../../sections/dashboard/product/component/searchToolbarTable";
import axiosInstance from "../../../utils/axios";

//toast
import { ToastMessage } from "../../../components/custom-toast";
import useDebounce from "../../../hooks/use-debounce";
import { useSearch } from "../../../hooks/use-search";
import ModalCreateEditNewsCategory from "../../../sections/dashboard/news-category/components/modal-create-edit";
import { TableListNewsCategory } from "../../../sections/dashboard/news-category/components/table-list";
import { createNewsCategory, fetchNewsCategory, updateNewsCategory } from "../../../services/news-category-service";

const TABLE_HEAD = [
  { id: "ten_vi", label: "Tên", minWidth: 60, align: "center" },
  { id: "action", label: "Sửa/Xoá", width: 180, align: "center" },
];

const NewsCategoryList = () => {
  const { search, updateSearch } = useSearch();
  const [newsCategoryList, setNewsCategoryList] = useState([]);
  const [searchCategoryByName, setSearchCategoryByName] = useState("");
  const searchDebounce = useDebounce(searchCategoryByName, 500);

  usePageView();

  const handlePageChange = useCallback(
    (event, page) => {
      setLoadingScreenTable(true);
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setLoadingScreenTable(true);
      updateSearch((prevState) => ({
        ...prevState,
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  const handleFetchNewsCategory = () => {
    const params = {
      page: search.page,
      rowsPerPage: search.rowsPerPage,
      searchCategoryByName: searchCategoryByName,
    };
    fetchNewsCategory(params)
      .then((res) => {
        setNewsCategoryList(res);
      })
      .catch();
  };

  // useDebounce

  useEffect(() => {
    setLoadingScreenTable(true);
    handleFetchNewsCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setLoadingScreenTable(true);
    updateSearch((prevState) => ({
      ...prevState,
      page: 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);

  // open modal add category || child category || product
  const [openModalCreateEdit, setOpenModalCreateEdit] = useState(false);
  const handleClickAdd = () => {
    setOpenModalCreateEdit(true);
  };

  // handle submit category
  const handleCreateNewsCategory = async (data) => {
    const res = await createNewsCategory(data);
    if (res) {
      handleFetchNewsCategory();
      return res;
    }
    return false;
  };

  // Update category
  const handleSubmittedUpdateNewsCategory = async (data, id) => {
    const res = await updateNewsCategory(data, id);
    if (res) {
      handleFetchNewsCategory();
      return res;
    }
    return false;
  };

  // loading screen table
  const [loadingScreenTable, setLoadingScreenTable] = useState(false);

  // delete category
  const handleDeleteNewsCategory = async (e, data) => {
    setLoadingScreenTable(true);
    try {
      if (data && data.id) {
        try {
          const res = await axiosInstance.delete(`/news-category/delete/${data.id}`);
          if (res && res.data.DT) {
            ToastMessage("Xoá chuyên mục thành công", "success");
            handleFetchNewsCategory();
            setLoadingScreenTable(false);
          }
        } catch (error) {
          ToastMessage("Xoá thất bại", "error");
          setLoadingScreenTable(false);
        }
      }
    } catch (error) {
      setLoadingScreenTable(false);
    }
  };
  return (
    <>
      <Head>
        <title>Dashboard: Product List | Zencomex</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Chuyên mục tin tức</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link color="text.primary" component={NextLink} href={paths.admin.index} variant="subtitle2">
                    Trang chủ
                  </Link>

                  <Typography color="text.secondary" variant="subtitle2">
                    Chuyên mục
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  onClick={handleClickAdd}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Thêm
                </Button>
              </Stack>
            </Stack>
            <Card sx={{ position: "relative" }}>
              <SearchToolbarTable searchValue={searchCategoryByName} onchangeSearchValue={setSearchCategoryByName} />
              <TableListNewsCategory
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                products={newsCategoryList?.data}
                productsCount={newsCategoryList?.total ?? 0}
                rowsPerPage={search.rowsPerPage}
                headLabel={TABLE_HEAD}
                type="news-category"
                onDeleteRow={handleDeleteNewsCategory}
                onUpdateRow={handleSubmittedUpdateNewsCategory}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      {openModalCreateEdit && (
        <ModalCreateEditNewsCategory
          onClose={() => setOpenModalCreateEdit(!openModalCreateEdit)}
          open={openModalCreateEdit}
          type="news-category"
          create={true}
          onSubmitted={handleCreateNewsCategory}
        />
      )}
    </>
  );
};

NewsCategoryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NewsCategoryList;
