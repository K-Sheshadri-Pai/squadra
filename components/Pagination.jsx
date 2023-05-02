import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { Grid } from "@mui/material";

export default function PaginationControl(props) {
 
  const handleChange = (event,value) => {
    props.setPage(value);
  };

  return (
    <>
        <Grid container sx={{marginLeft:8}}>
            <Grid item xs={3}>
                <Typography>
                  Page : {props.page}
                </Typography>
            </Grid>
            <Grid item xs={8} sx={{marginLeft:6}}>
                <Pagination 
                  count={7} 
                  page={props.page} 
                  color="primary" 
                  onChange={handleChange} 
                />
            </Grid>
        </Grid>
    </>
  );
}