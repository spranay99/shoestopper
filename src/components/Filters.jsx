import React from 'react';
import { CartState } from '../context/context';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Clear from '@mui/icons-material/Clear';


const Filters = () => {
    const {productState :{byStock,byFastDelivery, sort, byRating}, productDispatch} = CartState();

  return (
    <div className="filters">
      <span className="title">Filters</span>
      <span>
        <FormControl>
          <FormLabel style={{fontWeight: "bold", color:"black"}}>Sort By</FormLabel>
          <RadioGroup>
            <FormControlLabel value="ascending" control={<Radio />} label="Price -- Low to High" 
              onChange={() =>
                    productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "lowToHigh",
                  })
                }
                checked={sort === "lowToHigh" ? true : false}
            />
            <FormControlLabel value="descending" control={<Radio />} label="Price -- High to Low" 
              onChange={() =>
                  productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow" ? true : false}
            />
          </RadioGroup>
        </FormControl>
      </span>

      <span>
        <FormGroup>
          <FormLabel style={{fontWeight: "bold", color:"black"}} component="legend">Availability</FormLabel>
            <FormControlLabel control={<Checkbox />} label="Include Out of Stock"
              onChange={() =>
                  productDispatch({
                  type: "FILTER_BY_STOCK",
                })
              }
              checked={byStock}
            />
          <FormLabel style={{fontWeight: "bold", color:"black"}} component="legend">Delivery Type</FormLabel>
            <FormControlLabel control={<Checkbox />} label="Fast Delivery Only" 
              onChange={() =>
                productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
        </FormGroup>
      </span>

      <span>
        <Typography style={{fontWeight: "bold", color:"black"}} component="legend">Customer Ratings</Typography>
        <Rating
          name="simple-controlled"
          value={byRating}
          onChange={(_, newValue) => productDispatch({
              type: "FILTER_BY_RATING",
              payload: newValue,
            })
          }
        />
      </span>

      <Button variant="outlined" startIcon={<Clear />} 
        onClick={() =>
            productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  )
}

export default Filters