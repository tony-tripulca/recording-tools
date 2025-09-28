import {
  Home,
  MenuBook,
  PublishedWithChanges,
  QuestionAnswer,
  Summarize,
  Topic,
  VideoLibrary,
  VolumeUp,
} from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function NavBottom() {
  return (
    <Box component={"nav"} id="nav-bottom">
      <Stack flexDirection={"row-reverse"} flexWrap={"wrap"}>
        <Button LinkComponent={Link} href="/" startIcon={<Home />} variant="contained">
          Home
        </Button>
        <Button LinkComponent={Link} href="/topic" startIcon={<Topic />} variant="contained">
          Topic
        </Button>
        <Button LinkComponent={Link} href="/question" startIcon={<QuestionAnswer />} variant="contained">
          Question
        </Button>
        <Button LinkComponent={Link} href="/dictionary" startIcon={<Summarize />} variant="contained">
          Dictionary
        </Button>
        <Button LinkComponent={Link} href="/bible" startIcon={<MenuBook />} variant="contained">
          Bible
        </Button>
        <Button LinkComponent={Link} href="/ffmpeg/convert" startIcon={<PublishedWithChanges />} variant="contained">
          Convert
        </Button>
        <Button LinkComponent={Link} href="/ffmpeg/boost-audio" startIcon={<VolumeUp />} variant="contained">
          Boost Audio
        </Button>
        <Button LinkComponent={Link} href="/ffmpeg/merge" startIcon={<VideoLibrary />} variant="contained">
          Merge
        </Button>
      </Stack>
    </Box>
  );
}
