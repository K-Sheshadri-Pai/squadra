import { useState } from 'react';
import { TextField, Button, Grid , Typography, Divider} from '@mui/material';
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

    // On Clicking filter

    async function handleFilter() {

        // if(rname === ''  orgname === '' && rid === '' && cdate === '' && rstate === ''){
        //     alert('Please fill any one field')
        // }

            props.setIsFilter(true)
            props.setFilterQuery({rname,orgname,rid,cdate,rstate})

            axios.get(`${process.env.BASE_URL}/roles/new/filter?roleName=${rname}&roleId=${rid}&orgName=${orgname}&roleState=${rstate}&createdDate=${cdate?dayjs(cdate).format('YYYY-MM-DD').toString():""}&pageNo=0&pageSize=4`)
            
            .then((response) => {
                console.log(response)
                props.setData(response.data.content);
                props.handleFilterClose();
            })
            .catch((err) => {
                console.error(err);
            });
        }
    
    // Clear Filter
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
                
                <Grid item xs={3} sx={{ marginTop: 2 }}>
                    <TextField
                        variant="outlined"
                        label="Role Name"
                        sx={{ width : 130 }}
                        value={rname}
                        onChange={(e) => setRname(e.target.value)}
                        
                    />
                </Grid>

                <Grid item xs={5} sx={{ marginTop: 2 }}>
                    <TextField
                        variant="outlined"
                        label="Organisation Name"
                        value={orgname}
                        onChange={(e) => setOrgname(e.target.value)}
                        sx={{ width : 225 }}
                    />
                </Grid>

                <Grid item xs={4} sx={{ marginTop: 2 }}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                  <DatePicker
                    label="Created Date"
                    value={cdate}
                    onChange={(newValue) => setCdate(newValue)}
                    disablePast={true}
                    format="DD-MM-YYYY"
                    sx={{ width: 158 }}
                  />

                </LocalizationProvider>

                </Grid>

                <Grid item xs={3} sx={{ marginTop: 2 }}>
                    <Select
                        label="Role State"
                        value={rstate}
                        onChange={e=>{
                            setRstate(e.target.value)
                        }}
                
                        variant="outlined"
                        sx={{ width: 130 }}
                        >
                        <MenuItem value={true}>active</MenuItem>
                        <MenuItem value= {false}>inactive</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={7} sx={{ marginTop: 2 }}>
                    <TextField
                        variant="outlined"
                        label="Role Id"
                        value={rid}
                        onChange={(e) => setRid(e.target.value)}
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