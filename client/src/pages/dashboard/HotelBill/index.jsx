import React, { useEffect } from "react";

import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { useGlobalData } from "@/hooks/GlobalData";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Heading, Image, List, ListItem, UnorderedList } from "@chakra-ui/react";
import { CheckCircle, Clock, MapPin, Printer, Star, User } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import makeRequest from "@/data/api";
import { FindQuerybYid } from "@/data/apis";
export default function HotelBill() {
    const {id}=useParams();
    const [data,setdata]=React.useState(null);
    
  const { token } = useGlobalData();
  const navigate = useNavigate();
  const pdfRef=React.useRef();
  const handlePrint=useReactToPrint({
    content:()=>pdfRef.current
  })
  useEffect(() => {
    makeRequest({
        method: "GET",
        url: FindQuerybYid+id,
        headers:{
            Authorization: token,

        },
    }).then((res)=>{
        setdata(res.result);
    }
)
    .catch((error)=>{
        console.log(error);

    })
  }, []);
  
  return (
    <div  className="mt-12 mb-8  h-screen px-5 flex flex-col gap-12">
        <Printer onMouseEnter={(e)=>{
            e.currentTarget.style.scale=1.2;

        }}
        onMouseLeave={(e)=>{
            e.currentTarget.style.scale=1;
        }
        }
        color="white" style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            cursor: 'pointer',
            borderRadius:'100%',
            backgroundColor:'blue',
            height:'60px',
            width:'60px',
            padding:10,
            transition:'all 0.3s',
            zIndex:100
        }} onClick={handlePrint} />
       {data===null ? 
       
    
    <>
    Error
    </>
:(
    <Box ref={pdfRef} p={2} display={'flex'}  flexDir={'column'}>
    <Box minH={'150px'} maxH={'150px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
            <Image  width={'300px'} src="https://tripxcia.vercel.app/assets/logo-180beaee.png" />
        </Box>
        <Box display={'flex'} flexDir={'column'} px={5}>
            <Heading fontSize={'medium'}>Tripxcia Trips LLP</Heading>
            <Typography>Address: 123, XYZ Street,<br></br> ABC City, Country</Typography>
            <Typography>Phone: 1234567890</Typography>
            <Typography>Email ID - ota@tripxcia.com</Typography>
        </Box>

        </Box>
        <Divider color={'gray'} orientation={'horizontal'} />
        <Grid templateColumns={'repeat(4,1fr)'} gap={5} display={'flex'} flexDir={'row'} px={10} py={5} justifyContent={'space-between'}>
            <Box>
                <Typography >Booking ID</Typography>
                <Typography className="font-bold" >{id}</Typography>
            </Box>
            <Box>
                <Typography>Booking PNR</Typography>
                <Typography className="font-bold">{data?.bookconfirmNo ?? ''}</Typography>
            </Box>
            <Box>
                <Typography>Booking Date</Typography>
                <Typography className="font-bold">{data?.bookconfirmNo ?? ''}</Typography>
            </Box>
            <Box>
                <Typography>Booking Status</Typography>
                <Typography className="font-bold flex flex-row gap-2  justify-center">{data?.status===1? <CheckCircle color="green" />: <Clock color="blue"/>}{data?.status===1 ? 'Confirmed': 'Pending'}</Typography>
            </Box>
        </Grid>
<Divider orientation={'horizontal'} color={'gray'}/>
<Box display={'flex'} flexDir={'column'} px={10} py={5}>
<Box display={'flex'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>

<Box>
<Heading fontSize={'medium'}>Hotel in {data?.city ?? ''} |  {data?.noOfNights ?? ''} Night</Heading>
<Heading fontSize={'medium'} display={'flex'} flexDir={'row'} gap={2} alignItems={'center'}>{data?.hotelName ?? ''} {Array.from({length:Number(data?.hotelCategory.replace(' Star','')) ?? 0}).map((a,_index)=>{
return(
<Star fill="#FFD700" color="#FFD700"/>
)
})}</Heading>

</Box>
<Box>
<Button bgColor={'#65b3d1'} textColor={'white'} _hover={{}} leftIcon={<MapPin/>}>Get Direction</Button>
</Box>

</Box>

<Box py={2}>
<Typography>{data?.address ?? ''} <br></br>
Contact Number -{data?.contact ?? ''} <br></br>
Email ID - {data?.email ?? ''} <br></br>
</Typography>
</Box>
<Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} >
<Box display={'flex'} flexDir={'row'} >
    <Image src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg" width={'150px'} /> 
    <Box display={'flex'} flexDir={'column'} px={5} textAlign={'center'}>
        <Heading fontWeight={'bold'} fontSize={'medium'}>Check In</Heading>
        <Typography className="text-xl font-bold">03:00 PM</Typography>
        <Typography className="text-lg ">{data?.checkInDate ?? ''}</Typography>

    </Box>

</Box>

<Box>
<Box display={'flex'} flexDir={'column'} px={5} textAlign={'center'}>
        <Heading fontWeight={'bold'} fontSize={'medium'}>Check Out</Heading>
        <Typography className="text-xl font-bold">12:00 PM</Typography>
        <Typography className="text-lg ">{data?.checkOutDate ?? ''}</Typography>

    </Box>
</Box>


</Box>
<Box textAlign={'center'} py={1}>
    <Typography className="text-md ">Reservation for - {data?.guestName ?? ''} + {data?.noOfGuests ?? ''} </Typography>
</Box>

</Box>
<Box display={'flex'} flexDir={'column'} py={2} gap={2}>
<Box bgColor={'rgba(0,0,0,0.1)'} px={5} py={2}  borderRadius={15} display={'flex'} flexDir={'column'} gap={2} >
<Heading fontSize={'medium'}>Room {data?.noOfRooms}</Heading>
<Typography className="flex flex-row gap-2"><User /> {data?.noOfAdults ?? 0} Adults,{data?.noOfChildren6 ?? 0} Childrens</Typography>
<Divider color={'gray'} orientation={'horizontal'} />
<Typography >Meal Plan - {data?.mealPlan ?? ''}</Typography>


</Box>
<Box bgColor={'rgba(0,0,0,0.1)'}  px={5} py={2}  borderRadius={15} display={'flex'} flexDir={'column'} gap={2} >
<Heading fontSize={'medium'}>Guest Details ({data?.noOfGuests ?? 0})</Heading>
<Typography className="flex flex-row gap-2">{data?.guestName ?? ''} + {data?.noOfGuests ?? ''} </Typography>



</Box>
<Box  px={5} py={5}   display={'flex'} flexDir={'column'} gap={2} >
<Heading fontSize={'md'} display={'flex'} justifyContent={'space-between'} flexDir={'row'} gap={2} alignItems={'center'}>Cancellation and Amendment Policy <Divider color={'blue'}/></Heading>
<Typography className="text-sm">
Free Cancellation (100% refund) if you cancel this booking before 2024-05-20 14:59:59 (destination time).
Cancellations post that will be subject to a hotel fee as follows:From 2024-05-20 15:00:00 (destination time)
</Typography>
</Box>
<Box borderRadius={'20px'} py={2} bgColor={'pink'} maxW={'max-content'} alignItems={'center'} px={10} display={'flex'} flexDir={'row'} gap={2}>
<Clock/> <Heading fontSize={'sm'}>IMPORTANT INFORMATION</Heading>
</Box>
<Box bgColor={'peachpuff'}  px={5} py={5}  borderRadius={15} display={'flex'} flexDir={'column'} gap={2} >
<UnorderedList fontSize={'medium'}>
<ListItem fontWeight={'bold'}>ID Proof Related</ListItem>
<ListItem fontSize={'small'} >Passport, Aadhar, Govt. ID and Driving License are accepted as ID proof(s)</ListItem>
<ListItem  fontSize={'small'}>Local ids are allowed</ListItem>
<ListItem fontWeight={'bold'}>Guest Profile</ListItem>
<ListItem  fontSize={'small'}>Unmarried couples allowed</ListItem>
</UnorderedList>

</Box>
</Box>

</Box>
)    
}
    </div>
  );
}