import { Box, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
import { SeverityPill } from "../../../components/severity-pill";

const statusMap = {
  complete: "success",
  pending: "info",
  canceled: "warning",
  rejected: "error",
};

export const OrderListTable = (props) => {
  const { onOrderSelect, onPageChange, onRowsPerPageChange, orders, ordersCount, page, rowsPerPage, ...other } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {orders?.map((order) => {
            const createdAtMonth = format(order.createdAt, "LLL").toUpperCase();
            const createdAtDay = format(order.createdAt, "d");
            const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);
            const statusColor = statusMap[order.status] || "warning";

            return (
              <TableRow hover key={order.id} onClick={() => onOrderSelect?.(order.id)} sx={{ cursor: "pointer" }}>
                <TableCell
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => (theme.palette.mode === "dark" ? "neutral.800" : "neutral.200"),
                      borderRadius: 2,
                      maxWidth: "fit-content",
                      ml: 3,
                      p: 1,
                    }}
                  >
                    <Typography align="center" variant="subtitle2">
                      {createdAtMonth}
                    </Typography>
                    <Typography align="center" variant="h6">
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">{order.number}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Total of {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>{order.status}</SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
