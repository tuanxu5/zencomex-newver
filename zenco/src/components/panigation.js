import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({ onPageChange, totalPage, pageIndex }) => {
  const handlePageChange = (e, value) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Pagination count={totalPage} page={pageIndex} onChange={handlePageChange} color="primary" />
    </Box>
  );
};

export default PaginationComponent;
