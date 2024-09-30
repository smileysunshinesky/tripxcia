import makeRequest from '@/data/api';
import { GetClients, GetFlightQueries, GetVendors, AuthLoginAPI, getAllqueries } from '@/data/apis';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateUser } from "@/redux/reducers/userReducer";
import { getAllClients } from "@/redux/actions/clientActions";
import { getAllVendors } from "@/redux/actions/vendorActions";
import { getAllQueries } from "@/redux/actions/queryActions";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "@/redux/actions/authActions";

// Create a new context for the global data
const GlobalDataContext = createContext();

// Custom hook to access the global data
export const useGlobalData = () => useContext(GlobalDataContext);

// Global data provider component
export const GlobalDataProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setuser] = useState(null);
    const [FlightQuery, setFlightQuery] = useState([]);
    const { clients } = useSelector((state) => state.client);
    const { vendors } = useSelector((state) => state.vendor);
    const { queries } = useSelector((state) => state.query);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { token } = useSelector((state) => state.user.user);

    // const [vendors, setvendors] = useState([]);
    // const [queries, setqueries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            fetchFlightQuery();
            fetchClients();
            fetchVendors();
            fetchAllQueries();
        } else {
            try {
                localStorage.setItem('redirectCount', 0);
                dispatch(LogoutUser());
            } catch (error) {
                console.error("Error during logout: ", error);
            }
        }
    }, [dispatch])
    const fetchFlightQueryById = (id) => {
        try {
            const Query = queries.find((query) => query._id === id);
            return Query;
        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signIn')

        }
    }


    const fetchFlightQuery = async () => {
        try {
            await makeRequest({
                url: GetFlightQueries,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }

            })
                .then((response) => {
                    setFlightQuery(response.result)
                }
                )
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        toast.error('Token expired');
                    } else {
                        return navigate('/auth/signIn')
                    }
                })


        } catch (error) {
            toast.error('Error fetching flight query')
        }

    };
    const fetchClients = async () => {
        try {
            const response = await makeRequest({
                url: GetClients,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });

            const clientsData = response.result || [];  // Fallback to different keys if result doesn't exist

            // Dispatch the action only if data exists
            if (clientsData.length) {
                dispatch(getAllClients(clientsData));
            } else {
                console.warn('No clients data found in response.');
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('Token expired');
            } else {
                toast.error('Error fetching flight query');
                navigate('/auth/signIn');
            }
        }
    };

    const fetchVendors = async () => {
        try {
            await makeRequest({
                url: GetVendors,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }

            })
                .then((response) => {
                    dispatch(getAllVendors(response));
                    // setvendors(response)
                }
                )
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        toast.error('Token expired');
                    } else {
                        return navigate('/auth/signIn')
                    }
                })


        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signIn')

        }

    };
    const fetchAllQueries = async () => {
        try {
            await makeRequest({
                url: getAllqueries,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }

            })
                .then((response) => {
                    // setqueries(response.result);
                    dispatch(getAllQueries(response));
                }
                )
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        toast.error('Token expired');
                    } else {
                        return navigate('/auth/signIn')
                    }
                })


        } catch (error) {
            toast.error('Error fetching flight query')
            return navigate('/auth/signIn')

        }

    }
    const AuthLogin = async (data) => {
        try {
            const { email, password } = data;
            await makeRequest({
                url: AuthLoginAPI,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email,
                    password
                }
            })
                .then((response) => {
                    setuser(response);
                    dispatch(updateUser(response));
                    localStorage.setItem('token', response.token)
                    return navigate('/dashboard/home')
                })
                .catch((error) => {
                    toast.error('Invalid Credentials')
                    return navigate('/auth/signIn')
                })


        } catch (error) {
            toast.error('Invalid Credentials')
            return navigate('/auth/signIn')

        }

    }

    // Define any functions or methods to update the global data here


    // Provide the global data and update function to the children components
    return (
        <GlobalDataContext.Provider value={{ FlightQuery, fetchFlightQueryById, clients, vendors, user, AuthLogin, token, queries }}>
            {children}
        </GlobalDataContext.Provider>
    );
};