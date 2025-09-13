import { Home, MenuBook, PublishedWithChanges, Summarize, Topic, VideoLibrary, VolumeUp } from "@mui/icons-material";
import { Button, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";

export default function NavSide() {
  return (
    <Paper elevation={4} component={"nav"} id="nav-side">
      <List>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/" startIcon={<Home />} variant="contained">
            Home
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/topic" startIcon={<Topic />} variant="contained">
            Topic
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/question" startIcon={<Topic />} variant="contained">
            Question
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/dictionary" startIcon={<Summarize />} variant="contained">
            Dictionary
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/bible" startIcon={<MenuBook />} variant="contained">
            Bible
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            LinkComponent={Link}
            href="/ffmpeg/convert"
            startIcon={<PublishedWithChanges />}
            variant="contained"
          >
            Convert
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            LinkComponent={Link}
            href="/ffmpeg/boost-audio"
            startIcon={<VolumeUp />}
            variant="contained"
          >
            Boost Audio
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/ffmpeg/merge" startIcon={<VideoLibrary />} variant="contained">
            Merge
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
}
