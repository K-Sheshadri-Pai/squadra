import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Role from "../components/Role";
import { Grid } from "@mui/material";

const index = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Role />
        </Grid>
      </Grid>
    </>
  );
};

export default index;