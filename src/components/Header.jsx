import React from 'react';
import { CartState } from '../context/context';
import { Link } from "react-router-dom";
import Logo from "../assets/Air-Jordan.jpeg";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -2,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
}));
  

const Header = () => {

  const {state : {cart}, dispatch, productDispatch} = CartState();

  return (
    <Box >
      <AppBar className='header'>
        <Toolbar style={{display: "flex", justifyContent: "space-around", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>  
          <Typography variant="h6" noWrap>
            <Link to="/">
              <div style={{display: "flex", alignItems:"center"}}>
                <img src={Logo} alt='logo' className='logo'/>
                <p className='plogo'>ShoeStopper</p>
              </div>
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search shoes…"
                sx={{display: 'flex'}}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Search>
          <Link to="/cart">
            <IconButton aria-label="cart" style={{color: "white"}}>
              <StyledBadge badgeContent={cart.length} >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header