import makeRequest from '@/data/api';
import { GetClients, GetFlightQueries, GetVendors,AuthLoginAPI, getAllQueries } from '@/data/apis';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateUser } from "../redux/reducers/userReducer"; 

// Create a new context for the global data
const GlobalDataContext = createContext();

// Custom hook to access the global data
export const useGlobalData = () => useContext(GlobalDataContext);

// Global data provider component
export const GlobalDataProvider = ({ children }) => {
    const [user,setuser]=useState(null);
    const [FlightQuery, setFlightQuery] = useState([]);
    const [clients, setclients] = useState([]);
    const [vendors, setvendors] = useState([]);
    const [queries, setqueries] = useState([]);
    const navigate=useNavigate();
    const token="Bearer "+localStorage.getItem('token')
    useEffect(()=>{
        fetchFlightQuery();
        fetchClients();
        fetchVendors();
        fetchAllQueries();

    },[])
    const fetchFlightQueryById=(id)=>{
        try {
          const Query=queries.find((query)=>query._id===id);
            return Query;
        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signin')

        }
    }


    const fetchFlightQuery=async()=>{
        try {
            await makeRequest({
                url:GetFlightQueries,
                method:'GET',
                headers:{
              'Content-Type':'application/json',
                    'Authorization':token
                }

            })
            .then((response)=>{
                console.log(response)
                setFlightQuery(response.result)
            }
            )
            .catch((error)=>{
                if (error.response && error.response.status === 403) {
                    toast.error('Token expired');
                } else {
                    return navigate('/auth/signin')  
                }
            })

            
        } catch (error) {
            toast.error('Error fetching flight query')
        }

    };
    const fetchClients=async()=>{
        try {
            await makeRequest({
                url:GetClients,
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token
                }

            })
            .then((response)=>{
                console.log(response)
                setclients(response.result)
            }
            )
            .catch((error)=>{
                if (error.response && error.response.status === 403) {
                    toast.error('Token expired');
                } else {
                    return navigate('/auth/signin')           
                }
            })

            
        } catch (error) {
            toast.error('Error fetching flight query');
            return navigate('/auth/signin');

        }

    };
    const fetchVendors=async()=>{
        try {
            await makeRequest({
                url:GetVendors,
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token
                }

            })
            .then((response)=>{
                console.log(response)
                setvendors(response)
            }
            )
            .catch((error)=>{
                if (error.response && error.response.status === 403) {
                    toast.error('Token expired');
                } else {
return navigate('/auth/signin')           }
            })

            
        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signin')

        }

    };
    const fetchAllQueries=async()=>{
        try {
            await makeRequest({
                url:getAllQueries,
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':token
                }

            })
            .then((response)=>{
                console.log(response)
                setqueries(response.result)
            }
            )
            .catch((error)=>{
                if (error.response && error.response.status === 403) {
                    toast.error('Token expired');
                } else {
                    return navigate('/auth/signin')  
                }
            })

            
        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signin')

        }
            
        }
    const AuthLogin=async(data)=>{
        try {
            const {email,password}=data;
            await makeRequest({
                url:AuthLoginAPI,
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                data:{
                    email,
                    password
                }
            })
            .then((response)=>{
                console.log(response)
                setuser(response);
                updateUser(response);
                localStorage.setItem('token',response.token)
                return navigate('/dashboard/home')
            })
            .catch((error)=>{
                toast.error('Invalid Credentials')
                return navigate('/auth/signin')

            })

           
        } catch (error) {
            toast.error('Invalid Credentials')
            return navigate('/auth/signin')

        }

    }
    
    // Define any functions or methods to update the global data here


    // Provide the global data and update function to the children components
    return (
        <GlobalDataContext.Provider value={{ FlightQuery,fetchFlightQueryById ,clients,vendors,user,AuthLogin,token,queries}}>
            {children}
        </GlobalDataContext.Provider>
    );
};