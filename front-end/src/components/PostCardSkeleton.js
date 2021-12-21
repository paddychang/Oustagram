// MUI
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PostCardSkeleton() {
  return (
    <Stack spacing={1}>
      <Card sx={{ mb: 5, mr: 5 }}>
        <CardHeader
          avatar={<Skeleton variant="circular" width={60} height={60} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Skeleton variant="text" />}
        />
        <Skeleton variant="rectangular" width={728} height={460} />
        <CardContent>
          <Skeleton variant="rectangular" width={460} height={118} />
        </CardContent>
      </Card>
    </Stack>
  );
}
