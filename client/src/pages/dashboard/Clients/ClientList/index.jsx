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
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";
import makeRequest from '@/data/api';
import { DeleteClient, GetClients, UpdateClient } from '@/data/apis';
import { Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import { FormControl, FormLabel, Grid } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from "@/redux/actions/clientActions";
import { useDispatch,useSelector } from "react-redux";



export default function ClientList() {
  const dispatch = useDispatch();
  const [editOn,setEditOn]=React.useState(false);
  const navigate = useNavigate();
  const [selectedClient,setSelectedClient]=React.useState(null);

  const { clients } = useSelector((state) => state.client);

  const form=[
    {
      label:"Name",
      id:"name",
      type:"text",
      required:true
    },
    {
      label:'Address',
      id:'address',
      type:'text',
      required:true

    },
    {
      label:"Email",
      id:"email",
      type:'email',
      required:true
    },
    {
      label:"Phone",
      id:"phone",
      type:'text',
      required:true
    },
    {
      label:'Website',
      id:'website',
      type:'url'
    },
    {
      label:'Contact Person Email',
      id:'contactPersonEmail',
      type:'email',
      required:true

    },
    {
      label:'Contact Person Phone',
      id:'contactPersonPhone',
      type:'text',
      required:true
    },
    {
      label:'Birthday',
      id:'birthday',
      type:'date'
    },
    {
      label:'PAN Number',
      id:'panNumber',
      type:'text',
      required:true
    },
    {
      label:'TAN Number',
      id:'tanNumber',
      type:'text'

    },
    {
      label:'CIN Number',
      id:'cinNumber',
      type:'text'

    },
    {
      label:'GSTIN Number',
      id:'gstinNumber',
      type:'text'

    },
    {
      label:'Password',
      id:'password',
      type:'password'

    }


  ]
  const token=localStorage.getItem('token')

  const fetchClients = async () => {
    try {
        const response = await makeRequest({
            url: GetClients,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
            });

            const clientsData = response.result || [];  // Fallback to different keys if result doesn't exist

            console.log('Clients data:', clientsData);  // Log to confirm the extracted clients data

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

useEffect(()=>{
  if(token.length>10){
    fetchClients()
  }
},[token])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
     {selectedClient!==null && (
        <Dialog open={editOn} handler={() => setEditOn(!open)}>
        <DialogHeader>Edit {selectedClient?.name}</DialogHeader>
        <DialogBody>
           <form id='submitUpdateClient' onSubmit={async(e)=>{
            e.preventDefault();
          


           }}>
           <Grid templateColumns="repeat(2, 1fr)" gap={6}>

           {form.map((field) => (
              <FormControl key={field.id} >
                <FormLabel>{field.label}</FormLabel>
                <Input id={field.id} defaultValue={selectedClient?.[field.id]} type={field.type} required={field.required} />
              </FormControl>
            ))}
            
                      </Grid>

           </form>

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setEditOn(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={async() =>{
              
             const data=form.map((item)=>({
              [item.id]:document.getElementById(item.id).value
            }))
            const boyd=data.reduce((acc,curr)=>({...acc,...curr}),{})
            await  makeRequest({
              method:'PUT',
              url:UpdateClient+selectedClient._id,
              headers:{
                'Content-Type':'application/json',
                'Authorization':token
              },
              data:boyd
            })
            .then((response)=>{
              console.log(response)
              Swal.fire(
                'Updated!',
                'Client updated successfully',
                'success'
              )
              window.location.reload()
            })
            .catch((error)=>{
              Swal.fire(
                'Error!',
                'Error updating client',
                'error'
              )
            })            }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
     )}
    <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Client List
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll p-4 ">
        <table className="min-w-full divide-y divide-gray-200">
          {["Name", "Email", "Phone", "Address", "GSTIN", "PAN", "TAN", "CIN", "Actions"].map((heading) => (
            <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {heading}
            </th>
          ))}
          {
            clients.map((client) => (
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
                    <button onClick={()=>{
                      setSelectedClient(client)
                      setEditOn(!editOn)

                    }} className="text-indigo-600 hover:text-indigo-900">
                      <Edit/>
                    </button>
                    <button onClick={async()=>{
                     Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then(async(result) => {
                      if (result.isConfirmed) {
                        await makeRequest({
                          method:'DELETE',
                          url:DeleteClient+client._id,
                          headers:{
                            'Content-Type':'application/json',
                            'Authorization':token
                          }
                        }).then((response)=>{
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )                        
                        }
                        )
                        .catch((error)=>{
                          Swal.fire(
                            'Error!',
                            'Error deleting client',
                            'error'
                          )
                      })
                       
                      }
                    }
                    )
                    }} className="text-red-600 hover:text-red-900 ">
                      <Trash/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
          </table>
        </CardBody>
        </Card>
        </div>
  )
}
