import { FormControl, FormLabel, Grid ,Select as NormalSelect} from '@chakra-ui/react'
import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
export const hotelDuplicate=[
    {
      label:"Hotel Name",
      id:'hotelName',
      type:'text',
    },
    {
      label:'Address',
      id:'address',
      type:'text',


    },
    
    {
      label:'Contact',
      id:'contact',
      type:'text',
    },
    {
      label:'Email',
      id:'email',
      type:'email',
    },
    
    {
      label:'Our Cost',
      id:'ourCost',
      type:'number',

    },
    {
      label:'PRF',
      id:'prf',
      type:'number',

    },
    {
      label:'Total Cost',
      id:'totalCost',
      type:'number',

    },

  ]
export default function HotelDuplicate({onChange,index,remove, currentQuery}) {
    const [data,setdata]=useState(currentQuery.duplicate[index] ? currentQuery.duplicate[index] : {
        hotelName:'',
        address:'',
        contact:'',
        email:'',    
    })
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setdata((prevData) => {
          const updatedData = { ...prevData, [name]: value };
          onChange(index, updatedData);
          return updatedData;
        });
        }
  return (
    <>
     <Grid templateColumns='repeat(4, 1fr)' mt={5} gap={5}  >
          
         
              <FormControl>
              <FormLabel>Hotel Name</FormLabel>
                <Input placeholder='Hotel Name' name='hotelName' value={data.hotelName} onChange={handleChange} />
                </FormControl>
                <FormControl>
                <FormLabel>Address</FormLabel>
                <Input placeholder='Address' name='address' value={data.address} onChange={handleChange} />
                </FormControl>
                <FormControl>
                <FormLabel>Contact</FormLabel>
                <Input placeholder='Contact' name='contact' value={data.contact} onChange={handleChange} />
                </FormControl>
                <FormControl>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Email' name='email' value={data.email} onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <Button color="red" onClick={remove}>Remove</Button>
                </FormControl>
                
           
        
          </Grid>
    </>
  )
}
