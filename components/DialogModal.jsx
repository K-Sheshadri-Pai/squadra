import { Dialog } from '@mui/material'
import React from 'react'
import RoleForm from './RolesForm'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

// open and close this modal based on add or update

const DialogModal = (props) => {
  return (
    <>
    <Dialog open={props.open} onClose={props.handleClose}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <RoleForm 
            handleClose={props.handleClose} 
            itemId = {props.itemId}
          />
        </CardContent>
      </Card>
    </Dialog>
    </>
  ) 
}

export default DialogModal