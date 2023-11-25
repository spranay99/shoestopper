import React, { useState, useEffect } from 'react';
import { CartState } from '../context/context';
import { Link } from "react-router-dom";
import EmptyCart from "../assets/emptycart.jpeg";
import { Button, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Cart = () => {

  const {state: {cart}, dispatch} = CartState();

  const [total, setTotal] = useState();

  useEffect(()=>{
    setTotal(cart.reduce((acc, curr)=> acc + Number(curr.price), 0));
  },[cart])


  return (
    <div className='cart'>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemText>
            {
              cart?.length > 0 ? (
                cart.map((product)=>(
                  <div className='cartContainer'>
                    <img src={product.image} style={{ width: "125px" }}/>
                    <span>{product.name}</span>  
                    <span>₹{product.price}</span>  
                    <span><Rating value={product.ratings} readOnly/></span>
                    <Button 
                      onClick={()=>{
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product
                        })
                      }} 
                      color='error'>
                      <DeleteIcon />
                    </Button>
                  </div>
                )) 
              ) : (
                <div className='emptycart'>
                  <img src={EmptyCart} alt='emptycartimg' />
                  <h2>Your cart is Empty! </h2>
                  <Link to="/">                           
                    <Button variant="contained">Back to Shopping</Button>
                  </Link>
                </div>
              )
            }
          </ListItemText>
        </ListItem>
      </List>

      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart