  
import React from 'react';
import Checkout from '../components/payment/Payment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  checkout:{
    margin: '0 auto',
    width: '400px',
    height: '600px'
    }
})
function CheckoutPage() {

  const classes = useStyles();
  return (
    <div className={classes.checkout}>
        <Checkout />
    </div>
  );
}

export default CheckoutPage;