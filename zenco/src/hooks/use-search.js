import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};
