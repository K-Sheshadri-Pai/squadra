import  React, { useState, useEffect }  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogModal from "@/components/DialogModal";
import Image from "next/image";
import edit from "../images/edit.png";
import deletebtn from "../images/deletebtn.png";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  coloredRow: {
    backgroundColor: '#F0EFFF', // set the background color of the row
  },
});


export default function TableData(props) {

  // table data to be displayed
  const data = props.data;
  const setData = props.setData;

  // handle open and close of modal

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  // item id to be updated

  const [updateItemId, setUpdateItemId] = useState('');

  // calling get request providing page no.

  useEffect(() => {
    getData(props.page);
  }, [props.page]);

  // get request with pagination

  function getData(page){
    fetch(`${process.env.BASE_URL}/roles/paging?pageSize=4&pageNo=${page-1}`)
        .then((res) => res.json())
        .then((data) => setData(data.content));
  }

  // delete request with pagination

  async function deleteData(id) {
    console.log(id)
     await fetch(`${process.env.BASE_URL}/roles/${id}`, {
      method: 'DELETE'
    })
    .then(()=>alert("Deleted successfully"));
    getData(props.page);
  }

  const classes = useStyles();

  if(data.length === 0) {
    return <h2 style={{marginLeft : "24rem" }}>No data available</h2>;
  }

  return (
    <>

        {/* open modal to update  */}

        {
        open && 
        <DialogModal open={open} handleClose={handleClose} itemId = {updateItemId} setUpdateItemId = {setUpdateItemId} />
        }

        <TableContainer component={Paper} sx={{ width: "95%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell>Role Name</TableCell>
                <TableCell align="left">Organization Name</TableCell>
                <TableCell align="left">Created Date</TableCell>
                <TableCell align="left">Role State</TableCell>
                <TableCell align="left">Role ID</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

            {Array.isArray(data) ? (data.map((item) => (
                <TableRow
                  key={item.roleId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={classes.coloredRow}
                >
                  <TableCell component="th" scope="item">{item.roleName}</TableCell>
                  <TableCell align="left">{item.orgName}</TableCell>
                  <TableCell align="left">{item.createdDate}</TableCell>
                  <TableCell align="left">{item.roleState && "Active" || "inactive"}</TableCell>
                  <TableCell align="left">{item.roleId}</TableCell>
                  <TableCell align="left">
            
                    <Image
                      src={edit}
                      alt="edit"
                      onClick={e=>{
                        setUpdateItemId(item.roleId)
                        handleOpen()}}
                    />

                    &nbsp; &nbsp; &nbsp;
                    
                    <Image
                      src={deletebtn}
                      alt="deletebtn"
                      onClick={e=>{
                        deleteData(item.roleId)
                      }}
                      
                    />
                    
                  </TableCell>
                </TableRow>

              ))) : null}
              
            </TableBody>
            
          </Table>
        </TableContainer>

    </>
  );
}