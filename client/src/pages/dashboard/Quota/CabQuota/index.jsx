import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";

import TableCabQuery from '@/components/TableCabQuery';
import makeRequest from '@/data/api';
import { getCabQueries } from '@/data/apis';
import { useGlobalData } from '@/hooks/GlobalData';
import { Select, Stack } from '@chakra-ui/react';
import { Eye, Receipt } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";

import { LogoutUser } from "@/redux/actions/authActions";

export default function CabQuota() {
  const dispatch = useDispatch();

  const [isOpen,setIsOpen]=useState(false);
  const [selectedRow,setSelectedRow]=useState(null);
  const token=localStorage.getItem('token');
  const navigate = useNavigate();
  const [queries,setqueries] = useState([]);
  const fetchCabQuery = async()=>{
      try {
          await makeRequest({
              url:getCabQueries,
              method:'GET',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':token
              }

          })
          .then((response)=>{
              setqueries(response.result)
          }
          )
          .catch((error)=>{
              if (error.response && error.response.status === 403) {
                  toast.error('Token expired');
              } else {
                  return navigate('/auth/signIn')  
              }
          }) 
      } catch (error) {
          toast.error('Error fetching cab query')
          return navigate('/auth/signIn')
      }
  }
  useEffect(() => {
    if (token) {
      fetchCabQuery()
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
      <TableCabQuery viewbtn={"yes"} isOpen={isOpen} data={selectedRow} isT={true} duplicate={selectedRow?.duplicate ?? null} onClose={()=>{
        setIsOpen(false)
      }} handleSave={()=>{}} />
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Cab Query List
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["SL","ID", "Client Name", "Staff", "Service", "Status","Booking Type","City" ,"Action"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        {queries.length>0 ?   <tbody>
            {queries.filter(a=>a?.stepFirst!==1).map((row,index)=> {
                const className = `py-3 px-5 ${
                  index === queries.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={index}>
                     <td className={className}>
                      <div className="flex items-center gap-4">
                     
                      
                            {index+1}
                            </div>
                         
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                     
                      
                            {row._id}
                            </div>
                         
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.client}
                      </Typography>
                    
                    </td>
                    <td className={className}>
                   
                    </td>
                    <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.serviceType}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Select onChange={(e)=>{
                        if(e.target.value==='1'){
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You want to confirm this flight",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, confirm it!',
                            cancelButtonText: 'No, keep it',
                            confirmButtonColor:'#4caf50',
                            cancelButtonColor:'#f44336'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate(`/dashboard/query-confirm/${row._id}`)
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                             return
                            }
                          })

                        }
                        else{
                          return
                        }
                      }} value={row.status} disabled={row.status===1}>
                        <option value="0">Pending</option>
                        <option value="1">Confirmed</option>
                      </Select>
                    </td>
                    <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.cabBookingType}
                      </Typography>
                    </td>
                    <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.city}
                      </Typography>
                    </td>
                    <td className={className}>
                   {row.status===1 ? 
                  (
                    <Stack direction="row" spacing={4}>
                 
                      <Receipt  style={{cursor:'pointer'}}  onClick={()=>{
                        navigate(`/invoice/${row._id}`)
                      }} />
                   
                    </Stack>
                  ) 
                  :
                  (
                    <Eye style={{cursor:'pointer'}} onClick={()=>{

                      setSelectedRow({
                        client:row.client,
                          serviceType:row.serviceType,
                          cabBookingType:row.cabBookingType,
                          tripStartDateTime:row.tripStartDateTime,
                          tripEndDateTime:row.tripEndDateTime,
                          cabType:row.cabType,
                          totalPassenger:row.totalPassenger,
                          ourCost:row.ourCost,
                          prf:row.prf,
                          city:row.city,
                          cabExtraPerHours:row.cabExtraPerHours,
                          cabExtraKMS:row.cabExtraKMS,
                          cabParkingetc:row.cabParkingetc,
                          cabPerKmsrate:row.cabPerKmsrate,
                          cabTollPermit:row.cabTollPermit,
                          status:row.status,
                          _id:row._id,
                        
                      });
                      setIsOpen(true);


                     }}/>
                  )
                  }
                    </td>
                  </tr>
                );
              }
            )}
          </tbody> : <tbody>
            <tr>
              <td colSpan="8">
                <Typography color="blue-gray" className="text-center">
                  No data found
                </Typography>
              </td>
            </tr>
            </tbody>}
            
        </table>
      </CardBody>
    </Card>
  
  </div>
  )
}
