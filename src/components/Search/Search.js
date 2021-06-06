import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';

import { useForm } from 'react-hook-form';
import image from '../../images/image 6.png'
import './Search.css'
// import { userContext } from '../../App';

const Search = () => {
    const { id } = useParams();
    // const [tickets, setTickets] = useContext(userContext);
    const [result, setResult] = useState({});
    

    // const [display, setDisplay]= useState({});
    // setDisplay(tickets[id])
    


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => setResult(data);
    const handleSearch = () => {
        document.getElementById('search-form').style.display = 'none'
        document.getElementById('search-result').style.display='block'
    }
    return (
        <div className='search-container'>

            <div className='sign-up-form login-container search-opt'>

                <form id='search-form' onSubmit={handleSubmit(onSubmit)}>

                    <input placeholder='From' {...register("From", { required: true })} /> <br /><br />

                    <input placeholder='To' {...register("To", { required: true })} /> <br /><br /><br />

                    <button className="sign-in" onClick={handleSearch} type='submit'>Search</button><br />
                </form>
                <div id='search-result'>
                    <div className='result-location'>
                        <b><p>From: {result.From}</p></b>
                        <b><p>To: {result.To}</p></b>
                    </div>
                    <div className="result-ticket">
                        <b><p>Ticket 1</p></b>
                        <b><p>$67</p></b>
                    </div>
                    <div className="result-ticket">
                        <b><p>Ticket 2</p></b>
                        <b><p>$67</p></b>
                    </div>
                    <div className="result-ticket">
                        <b><p>Ticket 3</p></b>
                        <b><p>$67</p></b>
                    </div>
                </div>
            </div>
            <div>
                <img className='map' src={image} alt="" />
            </div>
        </div>
    );
};

export default Search;