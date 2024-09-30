import { useGlobalData } from '@/hooks/GlobalData'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,

} from "@material-tailwind/react";
import makeRequest from '@/data/api';
import { DeleteClient, GetVendors } from '@/data/apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from "@/redux/actions/authActions";
import { useDispatch } from "react-redux";

export default function VendorList() {
  const dispatch = useDispatch();
  const token=localStorage.getItem('token')
  const navigate = useNavigate();
  const [vendors,setvendors] = useState([]);
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
  return navigate('/auth/signIn')           }
        })
        
    } catch (error) {
        toast.error('Error fetching flight query')
        return navigate('/auth/signIn')
    }
};

useEffect(() => {
  if (token) {
    fetchVendors()
  } else {
    try {
      localStorage.setItem('redirectCount', 0);
      dispatch(LogoutUser());
    } catch (error) {
        console.error("Error during logout: ", error);
    }
  }
}, [token]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Vendor List
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll p-4 ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {["Name", "Email", "Phone", "Address", "GSTIN", "PAN", "TAN", "CIN", "Actions"].map((heading) => (
                <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {vendors.map((client) => (
              <tr key={client._id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.gstinNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.panNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.tanNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.cinNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button onClick={async()=>{
                      await makeRequest({
                        method:'DELETE',
                        url:DeleteClient+client._id,
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }).then((response)=>{
                        console.log(response)
                      }
                      )
                    }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))
          }
          </tbody>
          </table>
        </CardBody>
        </Card>
        </div>
  )
}
