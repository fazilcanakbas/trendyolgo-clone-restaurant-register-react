import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import renkler from './colors'




export default function TopBar() {
  return (
    <div style={{marginBottom:"100px"}}>
        <AppBar style={{width: "100%",height: "90px",backgroundColor: renkler.turuncu,}}>
            <Toolbar style={{paddingLeft: "40px",paddingTop:"17px"}}>
            <Typography  variant="h6">Restoran Yönetim Paneli</Typography>
            </Toolbar>
        </AppBar>
    </div>
  )
}
