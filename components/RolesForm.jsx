import { useState } from 'react';
import { TextField , Button, Grid , Typography, Divider , InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import FormHelperText from '@material-ui/core/FormHelperText';

const RoleForm = (props) => {

  const [roleName, setRoleName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [roleState, setRoleState] = useState('');

  // update mode on
  const [isUpdateState, setIsUpdateState] = useState(false);

  // item being updated
  const [isUpdateId, setIsUpdateId] = useState('');

  // role id valid or invalid
  const [isvalidId, setisvalidId] = useState(true);
  const [isvalidRoleName, setisvalidRoleName] = useState(true);
  const [isvalidOrgName, setisvalidOrgName] = useState(true);



  async function postData() {
  
        const res = await fetch(`${process.env.BASE_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "roleName": roleName,
        "orgName": organizationName,
        "createdDate": dayjs(selectedDate).format('YYYY-MM-DD').toString(),
        "roleState":roleState,
        "roleId": roleId
        })
      })
      
      .then((response) => response.json())

      .then((data) => {

        if(data.statusCode === 404 && data.message === "Role Already Exists"){
          alert(data.message)
        }

        else {
          alert('Added Successfully')
          setRoleName('');
          setOrganizationName('');
          setSelectedDate('');
          setRoleState('');
          setRoleId('');
          setIsUpdateState(false)
          props.handleClose();
          location.reload(false);
        }
          
      });     
  }


   async function putItemData(roleId) {

    const res = await fetch(`${process.env.BASE_URL}/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "roleName": roleName,
            "orgName": organizationName,
            "createdDate": dayjs(selectedDate).format('YYYY-MM-DD').toString(),
            "roleState":roleState,
            "roleId": roleId,
            
            })
      })
      
      .then((response) => response.json())

      .then((data) => {

        if(data.statusCode === 404 && data.message === " New Date Provide Is Incorrect ") {
          alert(data.message)
        }
        
        else if (data.statusCode === 200 && data.message === "Updated Successfully") {
          alert(data.message);
          setRoleName('');
          setOrganizationName('');
          setSelectedDate('');
          setRoleState('');
          setRoleId('');
          setIsUpdateState(false)
          props.handleClose();
          location.reload(false);
        }
        
      });
  }


  function getItemData(id){
    fetch(`${process.env.BASE_URL}/roles/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setRoleName(data.roleName);
      setOrganizationName(data.orgName);
      setSelectedDate(dayjs(new Date(data.createdDate)));
      setRoleState(data.roleState);
      setRoleId(data.roleId);
      setIsUpdateState(true);
      setIsUpdateId(data.roleId);
    });
  }

  useEffect(() => {
    if(props.itemId != '')
    {
        getItemData(props.itemId)
    }
    
  }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isUpdateState && isvalidId && isvalidRoleName && isvalidOrgName)
            postData();
        if (isUpdateState && isvalidId && isvalidRoleName && isvalidOrgName)
            putItemData(isUpdateId)
    };

    // test whether role id is valid

    const handleroleId = (e) => {
        setRoleId(e.target.value)
        const reg = new RegExp("^[A-Z]{3}[0-9]{3}$");
        setisvalidId(reg.test(e.target.value));
    }

    const handleRoleName = (e) =>{
      setRoleName(e.target.value)
      const reg = new RegExp("^([a-zA-Z_$][a-zA-Z\\d_$]*)$");
      setisvalidRoleName(reg.test(e.target.value));
    }

    const handleOrgName = (e) =>{
      setOrganizationName(e.target.value)
      const reg = new RegExp("^([a-zA-Z_$][a-zA-Z\\d_$]*)$");
      setisvalidOrgName(reg.test(e.target.value));
  }

  return (

    <form onSubmit={handleSubmit}>

      <Grid
          container
          sx={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 1,
          marginBottom: 2,
          }}
      >

        <Grid item xs={10}>
            <Typography variant="h6" sx={{ marginLeft: 3, color: "black" }}>
            {
                isUpdateState && "Edit Role" ||  "Add Role"
            }
            </Typography>
        </Grid>
                    
        <Grid item xs={2}>
            <Button variant='outlined' sx={{color:"#4D47C3" , width:80}} onClick={props.handleClose}>
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
                value={roleName}
                onChange={handleRoleName}
                error={!isvalidRoleName}
              required
            />
            {!isvalidRoleName && <FormHelperText>Special Characters not allowed</FormHelperText>}
        </Grid>

        <Grid item xs={4} sx={{ marginTop: 2 }}>
        <InputLabel sx={{marginBottom : 1}}>Organisation Name</InputLabel>
            <TextField
                variant="outlined"
                value={organizationName}
                onChange={handleOrgName}
                required
                sx={{ width : 180 }}
                error={!isvalidOrgName}
            />
            {!isvalidOrgName && <FormHelperText>Special Characters not allowed</FormHelperText>}
        </Grid>

        <Grid item xs={4} sx={{ marginTop: 2 }}>
        <InputLabel sx={{marginBottom : 1}}>Created Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    disablePast={true}
                    format="DD-MM-YYYY"
                    sx={{ width: 158 }}
                  />
          </LocalizationProvider>

          </Grid>
        

        <Grid item xs={4} sx={{ marginTop: 2 }}>
        <InputLabel sx={{marginBottom : 1}}>Role State</InputLabel>
            <Select
                value={roleState}
                onChange={e=>{
                  setRoleState(e.target.value)
                }}
                variant="outlined"
                sx={{ width: 180 }}
                required
                >
                <MenuItem value={true}>active</MenuItem>
                <MenuItem value= {false}>inactive</MenuItem>
            </Select>
        </Grid>

        <Grid item xs={8} sx={{ marginTop: 2 }}>
        <InputLabel sx={{marginBottom : 1}}>Role ID</InputLabel>
            <TextField
                variant="outlined"
                value={roleId}
                onChange={handleroleId}
                error={!isvalidId}
                required
                disabled={isUpdateState}
                sx={{ width: 180 }}
            />
            {!isvalidId && <FormHelperText>Please enter valid role ID</FormHelperText>}
        </Grid>

        <div>
            <Button type="submit" variant='contained' sx={{color:"#fff" , width:120 , marginTop: 3}}>
            {
                isUpdateState && "Update" ||  "Add"
            }
          </Button>
        </div>
        
    </Grid>

    </form>

  );
}

export default RoleForm;