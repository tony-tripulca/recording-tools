import { MenuBook, Summarize, Topic } from "@mui/icons-material";
import { Button, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";

export default function NavSide() {
  return (
    <Paper elevation={4} component={"nav"} id="nav-side">
      <List>
        <ListItem>
          <Button fullWidth LinkComponent={Link} href="/topic" startIcon={<Topic />} variant="contained">
            Topic
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
      </List>
    </Paper>
  );
}
