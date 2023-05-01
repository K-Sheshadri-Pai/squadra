import {Box , List , ListItem , ListItemIcon , ListItemButton , ListItemText } from "@mui/material";
import Image from "next/image";
import rectangle from "../images/rectangle.png";
import union from "../images/union.png";

const Sidebar = () => {

  let active = [false,true,false,false];

  return (
    
    <>
      <div
        style={{
          border: "3px solid rgba(77, 71, 195, 0.08)",
          width: 282,
          height: 570,
        }}
      >
        <Box sx={{ width: 282 }} role="presentation">
          <List>
            {["Users", "Roles", "Companies", "Wholesalers"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton selected={active[index]}>
                    <ListItemIcon>
                      <Image
                        src={rectangle}
                        alt="bluebox"
                        width="18px"
                        height="18px"
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <Image
                        src={union}
                        alt="union"
                        width="13px"
                        height="7.11px"
                      />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </div>
    </>
  );
};

export default Sidebar;