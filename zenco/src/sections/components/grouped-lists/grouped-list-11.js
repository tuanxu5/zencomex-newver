import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../../../components/severity-pill";

const campaigns = [
  {
    id: "4be0679f811115c9d2d28497",
    clickRate: 6.32,
    conversionRate: 1.05,
    createdAt: "Jan 23 2022",
    name: "Summer Active Health",
    platform: "Google",
    status: "draft",
    target: "Men Group",
  },
  {
    id: "4e1cd375bfa59e4347404e20",
    clickRate: 7.94,
    conversionRate: 0.31,
    createdAt: "Feb 1 2022",
    name: "New prospects blog",
    platform: "Facebook",
    status: "active",
    target: "Woman Married Group",
  },
  {
    id: "6b37fdf83195ca7e36622040",
    clickRate: 20.15,
    conversionRate: 2.1,
    createdAt: "Feb 5 2022",
    name: "Amazon Gift Cards",
    platform: "Facebook",
    status: "stopped",
    target: "Young Group",
  },
  {
    id: "e3651f8f9565cdbe8d2e5fea",
    clickRate: 7.94,
    conversionRate: 0.5,
    createdAt: "Feb 1 2022",
    name: "Best Marketing Course Online",
    platform: "Bing",
    status: "draft",
    target: "Young Group",
  },
];

const statusColorsMap = {
  draft: "secondary",
  active: "success",
  stopped: "error",
};

export const GroupedList11 = () => (
  <Box
    sx={{
      backgroundColor: (theme) => (theme.palette.mode === "dark" ? "neutral.800" : "neutral.100"),
      p: 3,
    }}
  >
    <Card>
      <CardHeader title="Campaigns Summary" />
      <Divider />
      <Table>
        <TableBody>
          {campaigns?.map((campaign) => {
            const statusColor = statusColorsMap[campaign.status];

            return (
              <TableRow key={campaign.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <Typography sx={{ cursor: "pointer" }} variant="subtitle2">
                    {campaign.name}
                  </Typography>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      mt: 1,
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {campaign.platform}
                    </Typography>
                    <Box
                      sx={{
                        height: 4,
                        width: 4,
                        borderRadius: 4,
                        backgroundColor: "text.secondary",
                        mx: 1,
                      }}
                    />
                    <Typography color="text.secondary" variant="body2">
                      {`${campaign.target}, ${campaign.createdAt}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <SeverityPill color={statusColor}>{campaign.status}</SeverityPill>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{campaign.clickRate}%</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                    Click Rate
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{campaign.conversionRate}%</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                    Conversions
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  </Box>
);
