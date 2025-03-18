
import { AppBar, Toolbar, Typography, Zoom } from '@mui/material';

import renkler from './colors';
import { useNavigate } from 'react-router-dom';



export default function TopBar() {
  
  return (
    <div style={{ marginBottom: '100px' }}>
      <AppBar style={{ width: '100%', height: '90px', backgroundColor: renkler.turuncu }}>
        <Toolbar style={{ paddingLeft: '40px', paddingTop: '17px', justifyContent: 'space-between' }}>
          <Typography variant="h6">Restoran Yönetim Paneli</Typography>
          <button> Admin</button>
          
       
        </Toolbar>
      
      </AppBar>
    </div>
  );
}
