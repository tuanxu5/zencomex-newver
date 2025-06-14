import axiosInstance from "../utils/axios";

export const fetchNewsCategory = async (params) => {
  try {
    const response = await axiosInstance.get(
      `/news-category?page=${params?.page}&pageSize=${params?.rowsPerPage}&name=${params?.searchCategoryByName}`
    );
    if (response && response.data) {
      return { data: response.data.DT, total: response.data?.total };
    }
    return false;
  } catch (error) {}
};

export const createNewsCategory = async (data) => {
  try {
    const response = await axiosInstance.post("/news-category/create", data);
    if (response && response.data) {
      return response.data;
    }
    return false;
  } catch (error) {}
};

export const updateNewsCategory = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/news-category/update/${id}`, data);
    if (response && response.data) {
      return response.data;
    }
    return false;
  } catch (error) {}
};
