import { useState } from 'react';
import { TextField , Button, Grid , Typography, Divider} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import FormHelperText from '@material-ui/core/FormHelperText';

const RoleForm = (props) => {

  // role form fields
  const [roleName, setRoleName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [roleState, setRoleState] = useState('');

  // is it update or add to control modal
  const [isUpdateState, setIsUpdateState] = useState(false);

  // which item is getting updated 
  const [isUpdateId, setIsUpdateId] = useState('');

  // role id valid invalid state
  const [isvalidId, setisvalidId] = useState(true);

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
          alert("Added successfully")
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


  // update request

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


  // get item by id for update fields
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

    if (!isUpdateState && isvalidId)
        postData();
    if (isUpdateState && isvalidId)
        putItemData(isUpdateId)
    };

    // test whether role id is valid

    const handleroleId = (e) => {
        setRoleId(e.target.value)
        const reg = new RegExp("^[A-Z]{3}[0-9]{3}$");
        setisvalidId(reg.test(e.target.value));
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
        
        <Grid item xs={3} sx={{ marginTop: 2 }}>
            <TextField
                variant="outlined"
                label="Role Name"
                sx={{ width : 130 }}
                value={roleName}
                onChange={e=>{
                  setRoleName(e.target.value)
              }}
              required
            />
        </Grid>

        <Grid item xs={5} sx={{ marginTop: 2 }}>
            <TextField
                variant="outlined"
                label="Organisation Name"
                value={organizationName}
                onChange={e=>{
                  setOrganizationName(e.target.value)
              }}
                required
                sx={{ width : 225 }}
            />
        </Grid>

        <Grid item xs={4} sx={{ marginTop: 2 }}>
    
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  
                  <DatePicker
                    label="Created Date *"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    disablePast={true}
                    format="DD-MM-YYYY"
                    sx={{ width: 158 }}
                  />
          </LocalizationProvider>

          </Grid>
        

        <Grid item xs={3} sx={{ marginTop: 2 }}>
            <Select
                value={roleState}
                onChange={e=>{
                  setRoleState(e.target.value)
                }}
                label="Role State"
                variant="outlined"
                sx={{ width: 130 }}
                required
                >
                <MenuItem value={true}>active</MenuItem>
                <MenuItem value= {false}>inactive</MenuItem>
            </Select>
        </Grid>

        <Grid item xs={7} sx={{ marginTop: 2 }}>
            <TextField
                variant="outlined"
                label="Role Id"
                value={roleId}
                onChange={handleroleId}
                error={!isvalidId}
                required
                disabled={isUpdateState}
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