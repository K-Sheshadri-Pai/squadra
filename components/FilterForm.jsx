import { useState } from 'react';
import { TextField, Button, Grid , Typography, Divider , InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import dayjs from 'dayjs';

const FilterForm = (props) => {
    
    const [rname, setRname] = useState('');
    const [orgname, setOrgname] = useState('');
    const [rid, setRid] = useState('');
    const [cdate, setCdate] = useState( );
    const [rstate, setRstate] = useState('');

    async function handleFilter() {

        props.setIsFilter(true)
        props.setFilterQuery({rname,orgname,rid,cdate,rstate})

        axios.get(`${process.env.BASE_URL}/roles/new/filter?roleName=${rname}&roleId=${rid}&orgName=${orgname}&roleState=${rstate}&createdDate=${cdate?dayjs(cdate).format('YYYY-MM-DD').toString():""}&pageNo=0&pageSize=4`)
        
        .then((response) => {
            props.setData(response.data.content);
            props.handleFilterClose();
        })
        .catch((err) => {
            console.error(err);
        });

    }
    
    
    function handleClear() {
        setRname("");
        setOrgname("");
        setRid('');
        setCdate();
        setRstate("");
    }

    return (
        
        <form>

            <Grid
                container
                sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 2,
                }}
            >

                <Grid item xs={7}>
                    <Typography variant="h6" sx={{ marginLeft: 3, color: "black" }}>
                        Filters
                    </Typography>
                </Grid>
                
                <Grid item xs={3}>
                    <Button variant='outlined' sx={{color:"#4D47C3" , width:135}} onClick={handleClear}>
                        Clear filter
                    </Button>
                </Grid>

                <Grid item xs={2}>
                    <Button variant='outlined' sx={{color:"#4D47C3" , width:70}} onClick={props.handleFilterClose}>
                        Cancel
                    </Button>
                </Grid>

            </Grid>

            <Divider />

            <Grid container sx={{ margin: 2 }}>
                
                <Grid item xs={4} sx={{ marginTop: 2 }}>
                    <InputLabel sx={{marginBottom : 1}}>Role Name</InputLabel>
                    <TextField
                        variant="outlined"
                        sx={{ width : 180 }}
                        value={rname}
                        onChange={(e) => setRname(e.target.value)}
                        
                    />
                </Grid>

                <Grid item xs={4} sx={{ marginTop: 2 }}>
                    <InputLabel sx={{marginBottom : 1}}>Organisation Name</InputLabel>
                    <TextField
                        variant="outlined"
                        value={orgname}
                        onChange={(e) => setOrgname(e.target.value)}
                        sx={{ width : 180 }}
                    />
                </Grid>

                <Grid item xs={4} sx={{ marginTop: 2 }}>
                    <InputLabel sx={{marginBottom : 1}}>Created Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker
                        
                        value={cdate}
                        onChange={(newValue) => setCdate(newValue)}
                        disablePast={true}
                        format="DD-MM-YYYY"
                        sx={{ width: 158 }}
                    />

                    </LocalizationProvider>

                </Grid>

                <Grid item xs={4} sx={{ marginTop: 2 }}>
                    <InputLabel sx={{marginBottom : 1}}>Role State</InputLabel>
                    <Select
                        value={rstate}
                        onChange={e=>{
                            setRstate(e.target.value)
                        }}
                
                        variant="outlined"
                        sx={{ width: 180 }}
                        >
                        <MenuItem value={true}>active</MenuItem>
                        <MenuItem value= {false}>inactive</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={8} sx={{ marginTop : 2 }}>
                    <InputLabel sx={{marginBottom : 1}}>Role ID</InputLabel>
                    <TextField
                        variant="outlined"
                        value={rid}
                        onChange={(e) => setRid(e.target.value)}
                        sx={{ width : 180 }}
                    />
                </Grid>

                <div>
                    <Button  variant='contained' sx={{color:"#fff" , width:120 , marginTop: 3}} onClick={handleFilter}>
                        continue
                    </Button>
                </div>
                
            </Grid>

        </form>

    );
}

export default FilterForm;