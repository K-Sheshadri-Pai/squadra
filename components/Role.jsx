import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogModal from "@/components/DialogModal";
import TableData from "../components/Table"
import styles from "../styles/Home.module.css"
import PaginationControl from './Pagination';
import FilterModal from './FilterModal';
import Image from "next/image";
import Filter from "../images/filter.png";
import { Paper , BottomNavigation } from '@mui/material';

export default function Role() {

    // table data being displayed
    const [data, setData] = useState([]);

    const [isFilter, setIsFilter] = useState(false);
    const [filterQuery, setFilterQuery] = useState();

    const [page, setPage] = React.useState(1);

    
    const [open, setOpen] = useState(false);

    
    const [filterOpen, setFilterOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function handleFilterOpen() {
        setFilterOpen(true);
    }

    function handleFilterClose() {
        setFilterOpen(false);
    }

    return (
    <>

        {/* open modal to add */}

        {
            open && 
            <DialogModal open={open} handleClose={handleClose} itemId = '' />
        }

        {   
            filterOpen && 
            <FilterModal setFilterQuery={setFilterQuery} isFilter={isFilter} setIsFilter={setIsFilter} open={filterOpen} handleFilterClose={handleFilterClose} data={data} setData={setData} />
        } 
        
        
        <Grid container spacing={1} sx={{marginBottom:"30px"}}>
            <Grid item xs={9}>
                <div className={styles.rolesdiv}>Roles</div>
            </Grid>
            <Grid item xs={1}>
                <Button sx={{marginTop:3, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleOpen}>Add</Button>
            </Grid>
            <Grid item xs={2}>
                <Button sx={{marginTop:3, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleFilterOpen}>
                    <Image src={Filter} alt="logo" width="40px" height="42px" /> &nbsp; Filters
                </Button>
            </Grid>
        </Grid>

        <hr style={{position:"absolute", width: "1012px",height: "0px",left: "355px",top: "143px",border: "1px solid #CACACA"}}/>

        {/* Table component */}

        <TableData 
            filterQuery={filterQuery}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            handleOpen = {handleOpen} 
            handleClose = {handleClose} 
            page={page} 
            data={data}
            setData={setData}
        />

        {/* Pagination component */}

        <Paper sx={{ position: "fixed", bottom: 0, left: 288, right: 0 , top: 545 }}>
          <BottomNavigation sx={{alignItems:'center'}}>
            <PaginationControl 
                page={page} 
                setPage={setPage}
            />
          </BottomNavigation>
        </Paper>
  
    </>
    
  );
}