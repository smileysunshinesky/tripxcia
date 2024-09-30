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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Box, Button, FormControl,FormLabel, Grid } from "@chakra-ui/react";
import { type } from "os";
import makeRequest from "@/data/api";
import { CreateClient } from "@/data/apis";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useGlobalData } from "@/hooks/GlobalData";

export default function AddClient() {
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
  const {token}=useGlobalData()
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add Client
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
         <Box p={10}>
         <form onSubmit={async(e)=>{
            e.preventDefault()
            const data=form.map((item)=>({
              [item.id]:document.getElementById(item.id)?.value
            }))
            const body=Object.assign({},...data)
            await makeRequest({
              method:'POST',
              url:CreateClient,
              data:body,
              headers:{
                'Content-Type':'application/json',
                Authorization:token
              }
            })
          .then((response)=>{
              Swal.fire({
                icon:'success',
                title:'Success',
                text:'Client Created Successfully'
              })
          })
          .catch((error)=>{
            Swal.fire({
              icon:'error',
              title:'Error',
              text:'Error Creating Client'
            })
          })
            
            

          
         }}>
          <Grid templateColumns={'repeat(3, 1fr)'} gap={4}>
            {form.map((item) => (
              <FormControl key={item.id}>
                <FormLabel>{item.label}</FormLabel>
                <Input placeholder={'Enter ' + item.label} id={item.id} type={item.type} required={item.required} />
              </FormControl>
            ))}
          </Grid>

          <FormControl py={5}>
              <Button type="submit" colorScheme="blue">Register</Button>
            </FormControl>
        
          </form>
         </Box>
        </CardBody>
      </Card>
    </div>
  );
}
