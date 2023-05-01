import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Logo from "../images/logo.png";

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 0 }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "#F1F0FA" }}>
          <Toolbar>
            <Image src={Logo} alt="logo" width="40px" height="42px" />
            &nbsp; &nbsp;
            
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
                fontWeight: "bold",
                fontfamily: "Prompt",
                fontstyle: "normal",
                fontweight: 600,
                fontsize: 24,
                lineheight: 36,
              }}
            >
              Squadra
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;