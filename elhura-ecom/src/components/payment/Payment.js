import React,{ useState } from 'react'
import Paypal from './Paypal'

const Payment = () => {

    const [checkout, setCheckOut] = useState(false);
    return (
        <div>
            <h1>Checkout page</h1>
             {checkout ? ( <Paypal />) : (
                     <button onClick={()=>{ setCheckOut(true) }} >Checkout</button>
             )}
        </div>
    )
}

export default Payment
