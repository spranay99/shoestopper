import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';

import { CartState } from '../context/context';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleProduct = ({product}) => {

  const {state :{ cart }, dispatch} = CartState();

  return (
    <Card className='oneproduct'>
      <CardMedia component="div" sx={{ pt: '56.25%' }} image={product.image} />
      <CardContent >
        <Typography className='productTitle'>
          {product.name}
        </Typography>
        <Typography className='priceandrating' component="legend">
          <span>₹ {product.price}</span>
          <Rating value={product.ratings} readOnly/>
        </Typography>
        <Typography>
          <span>{product.fastDelivery ? <div>Fast Delivery</div> : <div>Standard Delivery</div>}</span>
        </Typography>
      </CardContent>
      <CardActions>
        {cart.some((p) => p.id === product.id) ? ( 
          <Button 
            fullWidth
            variant="outlined" 
            color='error'
            onClick={()=>{
                dispatch({
                type: "REMOVE_FROM_CART",
                payload: product
              })
            }} 
            >
            <DeleteIcon />
          </Button>
        ) : (
            <Button 
              fullWidth
              variant='contained' 
              disabled={product.inStock === 0}
              onClick={()=>{
                  dispatch({
                  type: "ADD_TO_CART",
                  payload: product
                })
              }} 
              >
              {product.inStock ?  <ShoppingBagIcon /> : "Out of Stock"}
            </Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default SingleProduct