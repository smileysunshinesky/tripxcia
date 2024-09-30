import { useGlobalData } from '@/hooks/GlobalData';
import { Badge, Box, Button, Divider, Flex, Grid, Heading, HStack, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import { Printer } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from 'react-to-print';

export default function Ticket() {
    const queryID=useParams().id;
    const {fetchFlightQueryById}=useGlobalData();
    const data=fetchFlightQueryById(queryID);
    const targetRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>targetRef.current
    })
    const [time,setTime] = useState({hours:"",minutes:""});
    
    function calculateTimeDifference(departure, arrival) {
        // Parse the time strings into Date objects
        const [departureHours, departureMinutes] = departure?.split(":").map(Number);
        const [arrivalHours, arrivalMinutes] = arrival?.split(":").map(Number);
      
        // Create Date objects for the current date with the parsed time
        const today = new Date();
        const departureTime = new Date(today);
        departureTime.setHours(departureHours, departureMinutes, 0, 0);
      
        const arrivalTime = new Date(today);
        arrivalTime.setHours(arrivalHours, arrivalMinutes, 0, 0);
      
        // Calculate the difference in milliseconds
        let diff = arrivalTime - departureTime;
      
        // If the difference is negative, it means the arrival is the next day
        if (diff < 0) {
          diff += 24 * 60 * 60 * 1000; // Add 24 hours
        }
      
        // Convert milliseconds to hours and minutes
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
        return { hours: diffHours, minutes: diffMinutes };
      }
      useEffect(()=>{
        if(data){
            const { hours, minutes } = calculateTimeDifference(data?.departureTime, data?.arrivalTime);
            setTime({hours:hours,minutes:minutes});
          }
      },[data])
    
  return (
    <div className='bg-gray-500 px-[30%]  w-full flex justify-center items-center flex-col'>
       {
        data &&  <Wrap ref={targetRef} sx={{
            height:'auto',
            width:'auto',
            backgroundColor:'white',
            backdropBlur:'10px',
           display:'flex',
           flexDirection:'column',
        //    margin:5,
           padding:5,
           gap:5,
           borderColor:'black',
           borderWidth:2,

        }}>
            {/* <Box minW={'100%'}>
            <Text fontSize={40}>E-Ticket</Text>
            <Text fontSize={20}>Trip Booking ID -: {data._id}</Text>
            <Text fontSize={20}>Booking Date -: {data.bookingDate}</Text>

        </Box>
       <Box display={'flex'} flexDir={'column'}>
       <Box >
            <Text fontSize={30}>Itinerary and Reservation Details</Text>
        </Box>
      {data.OneWayOrRoundTrip==="Round Way" &&   <Box >
            <Text color={'lightskyblue'} fontSize={20}>Onward</Text>
        </Box>}
       </Box> */}

{/* <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} width="100%"> */}

    
      {/* <Flex justifyContent="space-between" mb={4}>
        <Box>
          <Text>{data.airlineName}</Text>
          <Text fontWeight="bold">{data.flightNumber}</Text>
        </Box>
        <Flex flex="1" justifyContent="space-between" mx={4}>
          <Box textAlign="center">
            <Text>Departure</Text>
            <Text fontWeight="bold">{data.departureFrom}</Text>
            <Text>{data.departureDate} {data.departureTime} Hrs</Text>
          </Box>
          <Box textAlign="center">
            <Text>Arrival</Text>
            <Text fontWeight="bold">{data.arrivalTo}</Text>
            <Text>{data.arrivalDate} {data.arrivalTime} Hrs</Text>
          </Box>
        </Flex>
        <Box textAlign="right">
          <Text>{data.flightType === 'Direct' ? 'Direct' : '1-Stop Flight'}</Text>
          <Text>1h 10min</Text>
          <Text>{data.refundable ? 'Fare Refundable' : 'Fare Non-Refundable'}</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt={4}>
        <Box>
          <Text>Passenger Name</Text>
          <Text fontWeight="bold">{data.passengerName}</Text>
        </Box>
        <Box textAlign="center">
          <Text>Type</Text>
          <Text>Adult</Text>
        </Box>
        <Box textAlign="right">
          <Text>Airline PNR</Text>
          <Text fontWeight="bold">{data.pnrNumber}</Text>
        </Box>
      </Flex>
     */}
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="md"
      bg="white"
      maxW="sm"
      mx="auto"
       width="100%"
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        Itinerary and Reservation Details
      </Heading>

      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="sm" fontWeight="bold">
          {data.airlineName}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Flight {data.flightNumber}
          </Text>
        </Box>

        <Divider />

        <HStack justifyContent="space-between">
          <Box textAlign="left">
            <Text fontSize="sm" fontWeight="bold">
              Departure
            </Text>
            <Text>{data.departureFrom}</Text>
            <Text>{data.departureDate} {data.departureTime} Hrs</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
              Arrival
            </Text>
            <Text>{data.arrivalTo}</Text>
            <Text>{data.arrivalDate} {data.arrivalTime} Hrs</Text>
          </Box>
        </HStack>

        <Divider />

        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
            {data.flightType === 'Direct' ? 'Direct' : '1-Stop Flight'}
            </Text>
            <Text>{`${time?.hours} : ${time?.minutes} Hrs`}</Text>
          </Box>
          <Box textAlign="right">
            <Badge colorScheme={data?.refundable?"green":"red"}>{data.refundable ? 'Fare Refundable' : 'Fare Non-Refundable'}</Badge>
          </Box>
        </Flex>

        <Divider />

        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
            Meal
            </Text>
          </Box>
          <Box textAlign="right">
            <Badge colorScheme={data?.meal?"green":"red"}>{data.refundable ? 'MEAl-Include' : 'Meal-Exclude'}</Badge>
          </Box>
        </Flex>

        <Divider />

        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
            Passenger Name
            </Text>
            <Text>{data?.passengerName}</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
            Seat No.
            </Text>
            <Text>{data.seatNumber}</Text>
          </Box>
        </Flex>


        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              Gender
            </Text>
            <Text>{data?.gender}</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
              Airline PNR
            </Text>
            <Text>{data.pnrNumber}</Text>
          </Box>
        </Flex>

        <Divider />

        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Trip Booking ID: {data._id}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Booking Date: {data.bookingDate}
          </Text>
        </Box>
      </VStack>
    </Box>
    {/* </Box> */}

        {data.OneWayOrRoundTrip=="Round Way" &&   <Box >
            <Text color={'lightskyblue'} fontSize={20}>Return</Text>
        </Box>}
       {data.OneWayOrRoundTrip=='Round Way' && 
       (
//         <Box minW="100%" minH="200px" display="flex" borderColor="lightskyblue" gap={5} borderRadius={1} borderWidth={2} flexDir="column">
//   <Grid templateColumns="repeat(4, 1fr)" maxH="50%" minH="50%" minW="100%">
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>{data.returnFlight.airlineNames}</Text>
//       <Text fontSize={15} fontWeight="bold">{data.returnFlight.flightNumber}</Text>
//     </Box>
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>Departure</Text>
//       <Text fontSize={15} fontWeight="bold">{data.returnFlight.departureFrom}</Text>
//       <Text fontSize={15}>{data.returnFlight.departureDate} {data.returnFlight.departureTime} Hrs</Text>
//     </Box>
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>Arrival</Text>
//       <Text fontSize={15} fontWeight="bold">{data.arrivalTo}</Text>
//       <Text fontSize={15}>{data.returnFlight.arrivalDate} {data.returnFlight.arrivalTime} Hrs</Text>
//     </Box>
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>{data.returnFlight.flightType === 'Direct' ? 'Direct' : '1-Stop Flight'}</Text>
//       <Text fontSize={15}>1h 0m</Text>
//       <Text fontSize={15}>{data.returnFlight.refundable ? 'Fare Refundable' : 'Fare Non-Refundable'}</Text>
//     </Box>
//   </Grid>
  
//   <Grid templateColumns="repeat(3, 1fr)" maxH="50%" minW="100%">
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>Passenger Name</Text>
//       <Text fontSize={15} fontWeight="bold">{data.returnFlight.passengerName}</Text>
//     </Box>
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>Departure</Text>
//       <Text fontSize={15} fontWeight="bold">Type</Text>
//       <Text fontSize={15}>Adult</Text>
//     </Box>
//     <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
//       <Text fontSize={15}>Airline PNR</Text>
//       <Text fontSize={15} fontWeight="bold">{data.returnFlight.pnrNumber}</Text>
//     </Box>
//   </Grid>
// </Box>


<Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="md"
      bg="white"
      maxW="sm"
      mx="auto"
       width="100%"
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        Itinerary and Reservation Details
      </Heading>

      <VStack spacing={4} align="stretch">
        <Box textAlign="center">
          <Text fontSize="sm" fontWeight="bold">
          {data.returnFlight.airlineNames}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Flight {data.returnFlight.flightNumber}
          </Text>
        </Box>

        <Divider />

        <HStack justifyContent="space-between">
          <Box textAlign="left">
            <Text fontSize="sm" fontWeight="bold">
              Departure
            </Text>
            <Text>{data.returnFlight.departureFrom}</Text>
            <Text>{data.returnFlight.departureDate} {data.returnFlight.departureTime} Hrs</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
              Arrival
            </Text>
            <Text>{data.returnFlight.arrivalTo}</Text>
            <Text>{data.returnFlight.arrivalDate} {data.returnFlight.arrivalTime} Hrs</Text>
          </Box>
        </HStack>

        <Divider />

        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
            {data.returnFlight.flightType === 'Direct' ? 'Direct' : '1-Stop Flight'}
            </Text>
            <Text>{`${time?.hours} : ${time?.minutes} Hrs`}</Text>
          </Box>
          <Box textAlign="right">
            <Badge colorScheme={data.returnFlight.refundable?"green":"red"}>{data.returnFlight.refundable ? 'Fare Refundable' : 'Fare Non-Refundable'}</Badge>
          </Box>
        </Flex>

        <Divider />

        <Box textAlign="left">
          <Text fontSize="sm" fontWeight="bold">
            Passenger Name
          </Text>
          <Text>{data.returnFlight.passengerName}</Text>
        </Box>

        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              Gender
            </Text>
            <Text>{data?.returnFlight?.gender}</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="sm" fontWeight="bold">
              Airline PNR
            </Text>
            <Text>{data.returnFlight.pnrNumber}</Text>
          </Box>
        </Flex>

        <Divider />

        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Trip Booking ID: {data._id}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Booking Date: {data.bookingDate}
          </Text>
        </Box>
      </VStack>
    </Box>
       )
       
       }
        <Box mt={10}>
            <Text fontSize={20} textColor={'lightskyblue'} fontWeight={'bold'}>Important Information</Text>
            <Text fontSize={15} px={10}>Delhi and Mumbai airports have multiple terminals catering to domestic flights. Please check the departure/arrival terminal of your flight with the airlines (contact number given below) before the start of your trip.</Text>
            <Text fontSize={15} px={10}  mt={5}>A printed copy of this e-ticket must be presented at the time of check in</Text>
            <Text fontSize={15} px={10}  >Check-in starts 2 hours before scheduled departure, and closes 45 minutes prior to the departure time. We recommend you report at the check-in counter at least 2 hours prior to departure time.
            It is mandatory to carry Government recognised photo identification (ID) along with your E-Ticket. This can include: Driving License, Passport, PAN Card, Voter ID Card or any other ID issued by the Government of India. For infant passengers, it is mandatory to carry the Date of Birth certificate.</Text>

        </Box>
        <Box mt={10}>
            <Text fontSize={20} textColor={'lightskyblue'} fontWeight={'bold'}>Cancellation & Date Change Rules</Text>
            <Text textColor={'black'} fontSize={15} px={10}>Q. How can I cancel my booking?</Text>
            <Text fontSize={15} px={10}  >A. You can cancel your booking by logging on the Customer Support section of our website. If you are cancelling or rescheduling your flight within 3 hours of its departure time, kindly contact the airline directly.
            * If you have cancelled your booking with the airline directly, kindly inform us by calling our Customer Support</Text>

        </Box>
           
                
        </Wrap>
       }
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
        }} onClick={()=>{
            targetRef.current.style.borderWidth=0;
            handlePrint();
        }} />
    </div>
  )
}
