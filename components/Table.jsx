import  React, { useState, useEffect }  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DialogModal from "@/components/DialogModal";
import Image from "next/image";
import edit from "../images/edit.png";
import deletebtn from "../images/deletebtn.png";
import axios from 'axios';

export default function TableData(props) {

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

  useEffect(() => {
    getData(props.page);
  }, [props.page]);


  function getData(page) {
    if(props.isFilter) {
      axios.get(`${process.env.BASE_URL}/roles/new/filter?roleName=${props.filterQuery.rname}&roleId=${props.filterQuery.rid}&orgName=${props.filterQuery.orgname}&roleState=${props.filterQuery.rstate}&createdDate=${props.filterQuery.cdate?dayjs(props.filterQuery.cdate).format('YYYY-MM-DD').toString():""}&pageNo=${page-1}&pageSize=4`)
      .then((res) => setData(res.data.content))
    }else {
      fetch(`${process.env.BASE_URL}/roles/paging?pageSize=4&pageNo=${page-1}`)
          .then((res) => res.json())
          .then((data) => setData(data.content));
    }
  }


  async function deleteData(id) {
     await fetch(`${process.env.BASE_URL}/roles/${id}`, {
      method: 'DELETE'
    })
    .then(()=>alert("Deleted successfully"));
    getData(props.page);
  }


  if(data.length === 0) {
    return <h5 style={{marginLeft : "24rem" , marginTop : "5rem"}}> No data available </h5>;
  }

  return (
    <>

        {/* open modal to update  */}

        {
        open && 
        <DialogModal open={open} handleClose={handleClose} itemId = {updateItemId} setUpdateItemId = {setUpdateItemId} />
        }

        <TableContainer sx={{ width: "95%" }}>
          <Table style={{borderCollapse: "separate", borderSpacing: "0px 1rem"}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{borderBottom : "none"}}>Role Name</TableCell>
                <TableCell style={{borderBottom : "none"}} align="left">Organization Name</TableCell> 
                <TableCell style={{borderBottom : "none"}} align="left">Created Date</TableCell>
                <TableCell style={{borderBottom : "none"}} align="left">Role State</TableCell>
                <TableCell style={{borderBottom : "none"}} align="left">Role ID</TableCell>
                <TableCell style={{borderBottom : "none"}} align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

            {Array.isArray(data) ? (data.map((item) => (
                <TableRow
                  key={item.roleId}
                  sx={{"& td": { border: 0 } , backgroundColor : '#F0EFFF'}}
                  
                >
                  <TableCell >{item.roleName}</TableCell>
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