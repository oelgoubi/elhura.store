import React,{ useRef,useEffect } from 'react'; 



function Paypal() {

    const paypal = useRef();
    

    useEffect(() => {
       window.paypal.Buttons({
            createOrder : (data,actions,err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units:[
                        {
                            description: "computer asus",
                            amount:{
                                currency_code:"EUR",
                                value: 30.11,
                            },
                        }
                    ]
                })
            },
            onApprove: async (data,actions)=>{
                const order = await actions.order.capture();
                console.log(order);

                // Redirection vers la page de commande
            },
            onError: (err)=>{
                console.log(err);
                // Rediriger vers une page d'erreur
            }
       }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal;
