import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Person2Icon from '@mui/icons-material/Person2';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import StyleIcon from '@mui/icons-material/Style';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
// import LoginIcon from '@mui/icons-material/Login'; //로그인아이콘
import theme from './style/Theme';
import { Link } from "react-router-dom";


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const to_link = [
    "/player","/game","/record","/card"
  ]
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      
      <List>
        <ListItem> <Typography variant="h5" style={{ fontFamily: "Rye" ,color:theme.main}}>
          RASCAL
        </Typography></ListItem>
        {['선수',"경기 기록","경기 등록","카드"].map((text, index) => (
          <ListItem key={text} disablePadding  component={Link} to={to_link[index]}>
            <ListItemButton>
              <ListItemIcon>
                {index ==0? <Person2Icon/> : index==3? <StyleIcon/> : <SportsCricketIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} style={{color:theme.text_70}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['로그아웃'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon style={{color:"white"}} /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}