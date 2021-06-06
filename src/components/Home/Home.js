import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { ticketContext } from '../../App';
import fakeData from '../../fakeData/script';


import './Home.css'

const Home = () => {
    const [tickets, setTickets] = useState([]);
    
    

    useEffect(() => {
        setTickets(fakeData)
    }, [setTickets])

    const history = useHistory();

    return (
        <div className='ticket-container'>
            {
                tickets.map(ticket => {
                    
                    return <div className='ticket'>
                        <div className="ticket-body">
                            <h1>{ticket.type}</h1>
                            <button onClick={()=>history.push(`/search/package/${ticket.id}`)}>BUY NOW</button>
                        </div>
                        <h1>৳{ticket.price}</h1>
                    </div>
                })
            }
        </div>
    );
};

export default Home;