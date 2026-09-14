import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true;


export const Appcontext = createContext();

export const AppProvider = ({ children }) => {

const navigate = useNavigate()
const currency = import.meta.env.VITE_CURRENCY

const [token, setToken ] = useState(null)
const [user, setUser ] = useState(null)
const [isOwner, setIsOwner ] = useState(false)
const [showLogin, setShowLogin ] = useState(false)
const [pickupDate, setPickupDate ] = useState('')
const [returnDate, setReturnDate ] = useState('')
const [cars, setCars ] = useState([])
const [input, setInput ] = useState('')

//function to check if user is logged in
const fetchUser = async()=>{
    try {
        const {data} = await axios.get('/api/users/get-data',{
            withCredentials: true
        })
        if (data.success) {
           setUser(data.user)
           setIsOwner(data.user.role === 'owner')
        } else {
            navigate('/')
        }
    } catch (error) {
        setUser(null)
        setIsOwner(false)
        if (error.response?.status !== 401) {
            // toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
}

//function to fetch all cars from the server
const fetchCars = async () =>{
    try {
        const { data } = await axios.get('/api/users/cars')
        if (data.success) {
            setCars(data.data || [])
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        // toast.error(error.response?.data?.message || "Failed to fetch Cars")
    }
}

// Function to handle user logout
const logout = async () => {
    try {
        const { data } = await axios.post('/api/users/logout'); // Update path if your route differs
        
       
            setUser(null);
            setIsOwner(false);
            toast.success("Logged out successfully");
            navigate('/');
        
    } catch (error) {
        console.error("Logout failed:", error);
        toast.error(error?.response?.data?.message || "Failed to logout");
    }
};


//hook to fetch user data when token is available
useEffect(()=>{
fetchUser();
fetchCars()
},[])


  const value = {
    navigate,
    currency,
    axios, 
    user,
    input,
    setInput,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
