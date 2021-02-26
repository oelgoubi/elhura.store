import React,{ useState } from 'react'
import Paypal from './Paypal';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    header:{
       margin: '40px auto'
      },
      checkout:{
        margin: '0 auto'
        }
  });

const Payment = () => {
    const classes = useStyles();
    const [checkout, setCheckOut] = useState(false);
    return (
        <div>
            <h1 className={classes.header}>Page de paiement</h1>
             {checkout ? ( <Paypal />) : (
                    <div className={classes.checkout}>
                        <button onClick={()=>{ setCheckOut(true) }} >Choisir la méthode</button>
                    </div>
             )}
        </div>
    )
}

export default Payment
