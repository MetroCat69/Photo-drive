import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <Typography variant="h1" noWrap component="div">
            My Drive
          </Typography> */}
        </Toolbar>
      </AppBar>

      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {["My Drive", "Starred", "Bin"].map((text) => (
            <ListItemButton key={text}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Folders
        </Typography>
        <Box>
          <List>
            <ListItemButton>
              <ListItemText primary="Folder" />
            </ListItemButton>
          </List>
        </Box>
      </Box> */}
    </Box>
  );
}

export default App;
