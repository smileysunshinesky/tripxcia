import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Stepper,
  Step,

} from "@material-tailwind/react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select as NormalSelect,
  Stack,
  StackDivider,
  Text,
  useSteps,
  Spinner
} from '@chakra-ui/react'
import { useMemo, useState } from "react";
import Select from "react-tailwindcss-select";
import { Form } from "react-router-dom";
import FlightExtraForm from "@/components/FlightExtraForm";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { airlines } from "@/data/airlines";
import airports from "@/data/airports";
import TableFlightQuery from "@/components/TableFlightQuery";
import makeRequest from "@/data/api";
import { CabFirstStap, FlightFirstStep, HotelFirstStap, SaveCab, SaveFlight, SaveHotel } from "@/data/apis";
import { useGlobalData } from "@/hooks/GlobalData";
import { useNavigate, useNavigation } from "react-router-dom/dist";
import FormDuplicate from "@/components/FormDuplicate";
import HotelTable from "@/components/HotelTable";
import TableCabQuery from "@/components/TableCabQuery";
import HotelDuplicate from "@/components/HotelDuplicate";
import DuplicateFlightRoundWay from "@/components/DuplicateFlightRoundWay";
import CabFormDuplicate from "@/components/CabFormDuplicate";
import { setCurrentQuery } from '@/redux/actions/queryActions';
import { useDispatch, useSelector } from "react-redux";

const steps = [
  { title: 'Step 1', description: 'Contact Info' },
  { title: 'Step 2', description: 'Date & Time' },
  { title: 'Step 3', description: 'Select Rooms' },
  { title: 'Step 4', description: 'Select Rooms' },

]

export const hotel2NDStepForm = [
  {
    label: "Hotel Name",
    id: 'hotelName',
    type: 'text',
  },
  {
    label: 'Address',
    id: 'address',
    type: 'text',


  },

  {
    label: 'Contact',
    id: 'contact',
    type: 'text',
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
  },

  {
    label: 'Our Cost',
    id: 'ourCost',
    type: 'number',

  },
  {
    label: 'PRF',
    id: 'prf',
    type: 'number',

  },
  {
    label: 'Total Cost',
    id: 'totalCost',
    type: 'number',

  },

]

export const hotelForm = [
  {
    label: 'Domestic / International',
    id: 'DomesticOrInternational',
    type: 'select',
    options: ['Domestic', 'International']
  },

  {
    label: 'City',
    id: 'city',
    type: 'text'
  },
  {
    label: 'Hotel Name',
    id: 'hotelName',
    type: 'text'
  },
  {
    label: 'Check In Date',
    id: 'checkInDate',
    type: 'date'

  },
  {
    label: 'Check Out Date',
    id: 'checkOutDate',
    type: 'date'

  },
  {
    label: 'No of Nights',
    id: 'noOfNights',
    type: 'number'

  },
  {
    label: 'Meal Plan',
    type: 'select',
    id: 'mealPlan',
    options: ['Only Room', 'Room With Breakfast', 'Room + Breakfast + Lunch or Dinner', 'Room + Breakfast + Lunch + Dinner']
  },
  {
    label: 'Hotel Category',
    id: 'hotelCategory',
    type: 'select',
    options: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],


  },
  {
    label: 'Room Ocuppency',
    id: 'roomOcuppency',
    type: 'select',
    options: ['Single', 'Double', 'Triple', 'Quad']
  },
  {
    label: 'No of Rooms',
    id: 'noOfRooms',
    type: 'number'
  },
  {
    label: 'No of Guests',
    id: 'noOfGuests',
    type: 'number'
  },
  {
    label: 'No of Adults',
    id: 'noOfAdults',
    type: 'number'
  },
  {
    label: 'No of Kids (1-6 Years)',
    id: 'noOfChildren6',
    type: 'number'
  }, {
    label: 'No of Kids (7-12 Years)',
    id: 'noOfChildren12',
    type: 'number'
  }

]
const services = [

  { value: "Flight", label: "Flight" },
  { value: "Cab", label: "Cab" },
  { value: "Hotel", label: "Hotel" },

]
export default function GenarateQuery() {
  const dispatch = useDispatch();

  const { currentQuery } = useSelector((state) => state.query);
  const {clients} = useSelector((state) => state.client);

  const [queryId, setQueryId] = useState("");
  const [selectedArrivalTo, setArrivalTo] = useState(''); // Set initial value
  
  const [currentStep, setCurrentStep] = useState(0)
  const { activeStep } = useSteps({
    index: currentStep,
    count: steps.length,
  })
  const navigate = useNavigate()
  const [flightTable, setFlighttable] = useState(false)
  const [cabTable, setCabTable] = useState(false);
  const [hotalTable, setHotalTable] = useState(false)
  const [totalFlightTicket, setTotalFlightTicket] = useState(0)
  const [totalCabBooking, setTotalCabBooking] = useState(0)
  const [totalHotal, setTotalhotel] = useState(0)
  const [totalHotelQuota, settotalHotelQuota] = useState(0)
  const [formsDataHotel, setFormsDataHotel] = useState(Array.from({ length: totalHotelQuota }, () => ({})));
  const [hotelTable, sethotelTable] = useState(false)
  const handleFormHotelChange = (index, data) => {
    setFormsDataHotel((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };
  const [selectedHotelDuplicate, setSelectedHotelDuplicate] = useState([])

  const [formsData, setFormsData] = useState(Array.from({ length: totalFlightTicket }, () => ({})));
  const [cabformsData, setcabFormsData] = useState(Array.from({ length: totalCabBooking }, () => ({})));
  const [hotelformsData, sethotelFormsData] = useState(Array.from({ length: totalHotal }, () => ({})));
  console.log('form data', formsData)
  const handleFormChange = (index, data) => {
    setFormsData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };
  const handlecabFormChange = (index, data) => {
    setcabFormsData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };
  const handleHotelFormChange = (index, data) => {
    sethotelFormsData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };
  const [data, setdata] = useState({
    client: 'Select',
    service: 'Select',
    passengerNumber: 0,
    domesticOrInternational: '',
    oneWayOrRoundway: '',
    from: 'Select From Location',
    to: 'Select To Location',
    departureDate: '',
    cabType: '',
    timeSlot: '',
    city: '',
    tripStartDateTime: '',
    tripEndDateTime: '',
    cab: '',
    totalPassenger: 0,
    returnDate: '',
    flightType: '',
    airlineNames: 'Select',
    FlightNumber: '',
    fareType: '',
    departureFrom: 'Select Airport',
    departureTime: '',
    arrivalTo: 'Select Airport',
    arrivalTime: '',
    OurCost: 0,
    Prf: 0,
    refundable: false,
    cabBookingType: "",
    cabExtraPerHours: 0,
    cabExtraKMS: 0,
    cabParkingetc: 0,
    cabPerKmsrate: 0,
    cabTollPermit: 0,
    hotelName: '',
    address: '',
    ourCost: 0,
    prf: 0,
    totalCost: 0,
    contact: '',
    email: '',
    guestName: '',
    bookconfirmNo: '',
    invoiceNumber: '',
    vendorName: '',
    checkInDate: "",
    checkOutDate: "",
    noOfNights: "",
    mealPlan: "",
    hotelCategory: "",
    roomOcuppency: "",
    noOfRooms: "",
    noOfGuests: "",
    noOfAdults: "",
    noOfChildren6: "",
    noOfChildren12: "",
    via: {
      FlightNumber: '',
      departureFrom: 'Select Airport',
      departureTime: '',
      arrivalTo: 'Select Airport',
      arrivalTime: '',


    }





  })
  const [returnData, setReturnData] = useState({
    client: 'Select',
    service: 'Select',
    passengerNumber: 0,
    domesticOrInternational: '',
    oneWayOrRoundway: '',
    from: 'Select From Location',
    to: 'Select To Location',
    departureDate: '',
    cabType: '',
    timeSlot: '',
    city: '',
    tripStartDateTime: '',
    tripEndDateTime: '',
    cab: '',
    totalPassenger: 0,
    returnDate: '',
    flightType: '',
    airlineNames: 'Select',
    FlightNumber: '',
    fareType: '',
    departureFrom: 'Select Airport',
    departureTime: '',
    arrivalTo: 'Select Airport',
    arrivalTime: '',
    OurCost: 0,
    Prf: 0,
    refundable: false,
    via: {
      FlightNumber: '',
      departureFrom: 'Select Airport',
      departureTime: '',
      arrivalTo: 'Select Airport',
      arrivalTime: '',


    }





  })

  const { token } = useGlobalData()
  const handleFlightSubmit = async () => {
    const body = {
      client: data?.client,
      serviceType: data?.service,
      PassengerNumber: data?.passengerNumber,
      DomesticOrInternational: data?.domesticOrInternational,
      OneWayOrRoundTrip: data?.oneWayOrRoundway,
      FromLocation: data?.from,
      ToLocation: data?.to,
      DepartureDate: data?.departureDate,
      returnDate: data?.returnDate,
      flightType: data?.flightType,
      airlineName: data?.airlineNames,
      flightNumber: data?.FlightNumber,
      fareType: data?.fareType,
      departureFrom: data?.departureFrom,
      departureTime: data?.departureTime,
      arrivalTo: data?.arrivalTo,
      arrivalTime: data?.arrivalTime,
      ourCost: data?.OurCost,
      prf: data?.Prf,
      refundable: data?.refundable,
      duplicate: formsData,
      via: data?.via,
      returnFliight: returnData,
    }
    await makeRequest({
      method: 'PUT',
      url: `${SaveFlight}/${queryId}`,
      data: body,
      headers: {
        Authorization: token
      }

    })
      .then((response) => {
        if (response) {
          toast.success('Query Genarated Successfully')

          if (body.serviceType === 'Flight') {
            navigate('/dashboard/quota-flight')

          }
          if (body.serviceType === 'Cab') {
            navigate('/dashboard/quota-cab')

          }
          if (body.serviceType === 'Hotel') {
            navigate('/dashboard/quota-hotel')

          }

        }
        else {
          toast.error('Failed to genarate query')
        }
      })
      .catch((error) => {
        toast.error('Failed to genarate query')
      }
      )

  }

  // handle hotel submit
  const handleHotelSubmit = async () => {
    const body = {
      client: data?.client,
      serviceType: data?.service,
      city: data?.city,
      DomesticOrInternational: data?.domesticOrInternational,
      hotelName: data?.hotelName,
      checkInDate: data?.checkInDate,
      checkOutDate: data?.checkOutDate,
      noOfNights: data?.noOfNights,
      mealPlan: data?.mealPlan,
      hotelCategory: data?.hotelCategory,
      roomOcuppency: data?.roomOcuppency,
      noOfRooms: data?.noOfRooms,
      noOfGuests: data?.noOfGuests,
      noOfAdults: data?.noOfAdults,
      noOfChildren6: data?.noOfChildren6,
      noOfChildren12: data?.noOfChildren12,
    }
    await makeRequest({
      method: 'PUT',
      url: `${SaveHotel}/${queryId}`,
      data: body,
      headers: {
        Authorization: token
      }

    })
      .then((response) => {
        if (response) {
          toast.success('Query Genarated Successfully')

          if (body.serviceType === 'Flight') {
            navigate('/dashboard/quota-flight')

          }
          if (body.serviceType === 'Cab') {
            navigate('/dashboard/quota-cab')

          }
          if (body.serviceType === 'Hotel') {
            navigate('/dashboard/quota-hotel')

          }

        }
        else {
          toast.error('Failed to genarate query')
        }
      })
      .catch((error) => {
        toast.error('Failed to genarate query')
      }
      )

  }


  const handleCabSubmit = async () => {
    const body = {
      client: data?.client,
      serviceType: data?.service,
      cabBookingType: data?.cabBookingType,
      tripStartDateTime: data?.tripStartDateTime,
      tripEndDateTime: data?.tripEndDateTime,
      cabType: data?.cabType,
      totalPassenger: data?.totalPassenger,
      ourCost: data?.OurCost,
      prf: data?.Prf,
      city: data?.city,
      bookingDate: data?.bookingDate,
      cabExtraPerHours: data?.cabExtraPerHours,
      cabExtraKMS: data?.cabExtraKMS,
      cabParkingetc: data?.cabParkingetc,
      cabPerKmsrate: data?.cabPerKmsrate,
      cabTollPermit: data?.cabTollPermit,
      duplicate: formsData,
    }
    await makeRequest({
      method: 'PUT',
      url: `${SaveCab}/${queryId}`,
      data: body,
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        if (response) {
          toast.success('Query Genarated Successfully')

          if (body.serviceType === 'Flight') {
            navigate('/dashboard/quota-flight')

          }
          if (body.serviceType === 'Cab') {
            navigate('/dashboard/quota-cab')

          }
          if (body.serviceType === 'Hotel') {
            navigate('/dashboard/quota-hotel')

          }

        }
        else {
          toast.error('Failed to genarate query')
        }
      })
      .catch((error) => {
        toast.error('Failed to genarate query')
      }
      )

  }
  console.log('query', data)

  const firstStepHandle = async () => {
    if (data.service === 'Flight') {
      if (data.client === 'Select') {
        toast.error('Please select client')
        return
      }
      else if (data.service === 'Select') {
        toast.error('Please select service')
        return
      }
      else {
        const body = {
          client: data?.client,
          serviceType: data?.service,
          PassengerNumber: data?.passengerNumber,
          DomesticOrInternational: data?.domesticOrInternational,
          OneWayOrRoundTrip: data?.oneWayOrRoundway,
          DepartureDate: data?.departureDate,
          returnDate: data?.returnDate,
          departureFrom: data?.departureFrom,
          arrivalTo: data?.arrivalTo,
        }
        await makeRequest({
          method: 'POST',
          url: `${FlightFirstStep}`,
          data: body,
          headers: {
            Authorization: token
          }
        })
          .then((response) => {
            if (response) {
              console.log(response)
              toast.success('Query Genarated Successfully');
              dispatch(setCurrentQuery(response?.result));

              setQueryId(response?.result?._id);
              Swal.fire({
                title: 'Are you sure?',
                text: "You want to genarate query for this service",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, genarate it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  setCurrentStep(currentStep + 1)
                }
                else {
                  toast.error('Query not genarated')
                  return;
                }
              })
            }
            else {
              toast.error('Failed to genarate query')
              return;
            }
          })
          .catch((error) => {
            toast.error('Failed to genarate query')
            return;
          }
          )

      }
    }

    if (data.service === 'Cab') {
      if (data.client === 'Select') {
        toast.error('Please select client')
        return
      }
      else if (data.service === 'Select') {
        toast.error('Please select service')
        return
      }
      else if (data.serviceType === 'Select') {
        toast.error('Please select Service Type')
        return
      }
      else {
        const body = {
          client: data?.client,
          serviceType: data?.service,
          cabBookingType: data?.cabBookingType,
          tripStartDateTime: data?.tripStartDateTime,
          tripEndDateTime: data?.tripEndDateTime,
          cabType: data?.cabType,
          totalPassenger: data?.totalPassenger,
          city: data?.city,
          bookingDate: data?.bookingDate,
        }
        console.log("cab fist step", body)
        await makeRequest({
          method: 'POST',
          url: `${CabFirstStap}`,
          data: body,
          headers: {
            Authorization: token
          }
        })
          .then((response) => {
            if (response) {
              toast.success('Query Genarated Successfully')
              setQueryId(response?.result?._id);
              Swal.fire({
                title: 'Are you sure?',
                text: "You want to genarate query for this service",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, genarate it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  setCurrentStep(currentStep + 1)
                }
                else {
                  toast.error('Query not genarated')
                }
              })
            }
            else {
              toast.error('Failed to genarate query')
              return;
            }
          })
          .catch((error) => {
            toast.error('Failed to genarate query')
            return;
          })

      }
    }
    if (data.service === 'Hotel') {
      if (data.client === 'Select') {
        toast.error('Please select client')
        return
      }
      else if (data.service === 'Select') {
        toast.error('Please select service')
        return
      }
      const body = {
        client: data?.client,
        serviceType: data?.service,
        city: data?.city,
        DomesticOrInternational: data?.domesticOrInternational,
        hotelName: data?.hotelName,
        checkInDate: data?.checkInDate,
        checkOutDate: data?.checkOutDate,
        noOfNights: data?.noOfNights,
        mealPlan: data?.mealPlan,
        hotelCategory: data?.hotelCategory,
        roomOcuppency: data?.roomOcuppency,
        noOfRooms: data?.noOfRooms,
        noOfGuests: data?.noOfGuests,
        noOfAdults: data?.noOfAdults,
        noOfChildren6: data?.noOfChildren6,
        noOfChildren12: data?.noOfChildren12,
      }
      await makeRequest({
        method: 'POST',
        url: `${HotelFirstStap}`,
        data: body,
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          if (response) {
            toast.success('Query Genarated Successfully')
            setQueryId(response?.result?._id);
            Swal.fire({
              title: 'Are you sure?',
              text: "You want to genarate query for this service",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, genarate it!'
            }).then(async (result) => {
              if (result.isConfirmed) {
                setCurrentStep(currentStep + 1)
              }
              else {
                toast.error('Query not genarated')
              }
            })
          }
          else {
            toast.error('Failed to genarate query')
            return;
          }
        })
        .catch((error) => {
          toast.error('Failed to genarate query')
          return;
        }
        )

    }
  }




  const calculateTotalDays = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const diffTime = Math.abs(checkOut - checkIn)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  const memoizedOptions = useMemo(() => airports, [airports]);



  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 min-w-full">
      <TableFlightQuery isOpen={flightTable} handleSave={handleFlightSubmit} duplicate={formsData.length > 0 ? formsData : [returnData]} onClose={() => { setHotalTable(false) }} data={data} />
      <HotelTable isOpen={hotalTable} handleSave={handleHotelSubmit} duplicate={hotelformsData.length > 0 ? formsData : [returnData]} onClose={() => { setHotalTable(false) }} data={data} />
      <TableCabQuery isOpen={cabTable} handleSave={handleCabSubmit} duplicate={cabformsData.length > 0 ? formsData : [returnData]} onClose={() => { setCabTable(false) }} data={data} />
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          Genarate Query
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
          <Box px={'20%'}>
            <Stepper activeStep={currentStep}>
              {steps.map((step, index) => (
                <Step
                  key={index} // Add a unique key prop here
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (currentStep >= index) {
                      setCurrentStep(index);
                    } else {
                      alert('Please fill the previous step');
                    }
                  }}
                >
                  {index + 1}
                </Step>
              ))}
            </Stepper>
          </Box>
          {
            currentStep === 0 ?
              (
                <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
                  <FormControl>
                    <FormLabel>Select Client</FormLabel>
                    <Select
                      value={{ value: data.client, label: data.client }}
                      onChange={(e) => setdata({ ...data, client: e.value })}

                      isSearchable={true}
                      options={clients.map((client) => ({ value: client.name, label: client.name }))}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Service Type</FormLabel>
                    <Select
                      value={{ value: data.service, label: data.service }}
                      onChange={(e) => setdata({ ...data, service: e.value })}

                      isSearchable={true}
                      options={services}
                    />
                  </FormControl>
                  {data.service === 'Flight' ? (
                    <>
                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                        <FormControl>
                          <FormLabel>Passenger Number</FormLabel>
                          <Input type="number" placeholder="Passenger Number" value={data.passengerNumber} onChange={(e) => {
                            setdata({ ...data, passengerNumber: e.target.value })
                          }} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Domestic/International</FormLabel>
                          <NormalSelect value={data.domesticOrInternational} onChange={(e) => {
                            setdata({ ...data, domesticOrInternational: e.target.value })
                          }}>
                            <option value="Domestic">Domestic</option>
                            <option value="International">International</option>
                          </NormalSelect>
                        </FormControl>
                        <FormControl>
                          <FormLabel>One Way/Roundway</FormLabel>
                          <NormalSelect value={data.oneWayOrRoundway} onChange={(e) => {
                            setdata({ ...data, oneWayOrRoundway: e.target.value })
                          }}>
                            <option value="One Way">One Way</option>
                            <option value="Round Way">Round Way</option>
                          </NormalSelect>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Departure From</FormLabel>
                          <Select
                            searchInputPlaceholder="Search for a Airport Name"

                            formatOptionLabel={
                              ({ label, city, value }) => (
                                <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
                                  {label || city || value ? <>
                                    <Box>
                                      <Heading size='xs' textTransform='uppercase'>
                                        {city}
                                      </Heading>
                                      <Text pt='2' fontSize='sm'>
                                        {value}
                                      </Text>
                                    </Box>
                                    <Box>
                                      <Text pt='2' fontWeight={'bold'} fontSize='sm'>
                                        {label}
                                      </Text>
                                    </Box></> : <Spinner />}
                                </Stack>
                              )
                            } options={memoizedOptions.map((airport) => ({ value: airport.name, label: airport.code, city: airport.city }))} value={{ value: data.departureFrom, label: data.departureFrom, city: data.departureFrom }} onChange={(e) => {
                              setdata({ ...data, departureFrom: e.value })
                            }
                            } isSearchable={true} />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Arrival To</FormLabel>
                          <Select searchInputPlaceholder="Search for a Airport Name"

                            formatOptionLabel={
                              ({ label, city, value }) => (
                                <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
                                  <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                      {city}
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                      {value}
                                    </Text>
                                  </Box>
                                  <Box>
                                    <Text pt='2' fontWeight={'bold'} fontSize='sm'>
                                      {label}
                                    </Text>
                                  </Box>
                                </Stack>
                              )
                            } options={airports.map((airport) => ({ value: airport.name, label: airport.code, city: airport.city }))}
                            value={{ value: data.arrivalTo, label: data.arrivalTo, city: data.arrivalTo }} onChange={(e) => {
                              setdata({ ...data, arrivalTo: e.value })
                            }
                            } isSearchable={true} />

                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Departure Date</FormLabel>
                          <Input value={data.departureDate} onChange={(e) => {
                            setdata({ ...data, departureDate: e.target.value })
                          }} type="date" placeholder="Departure Date" />
                        </FormControl>
                      </Grid>
                      {
                        data.oneWayOrRoundway === 'Round Way' &&
                        (
                          <>
                            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                              <FormControl isRequired>
                                <FormLabel>Return Date</FormLabel>
                                <Input value={data.returnDate} onChange={(e) => {
                                  setdata({ ...data, returnDate: e.target.value })
                                }} type="date" placeholder="Return Date" />
                              </FormControl>
                            </Grid>
                          </>
                        )
                      }
                    </>
                  )
                    :
                    data.service === 'Cab' ?
                      (
                        <>
                          <Grid templateColumns='repeat(1, 1fr)' gap={5}  >
                            <FormControl>
                              <FormLabel>Booking Type</FormLabel>
                              <NormalSelect value={data.cabBookingType} onChange={(e) => { setdata({ ...data, cabBookingType: e.target.value }) }}>
                                <option selected disabled value={''}>Select</option>
                                <option value={'8Hrs 80kms'} >8Hrs 80kms</option>
                                <option value={'12Hrs 120kms'} >12Hrs 120kms</option>
                                <option value={'Outstation'} >Outstation</option>
                                <option value={'Package'}>Package</option>
                                <option value={'Pick up & Drop'}>Pick up & Drop</option>
                              </NormalSelect>
                            </FormControl>
                          </Grid>
                          <>
                            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                              <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input type="text" placeholder="City" value={data.city} onChange={(e) => {
                                  setdata({ ...data, city: e.target.value })
                                }
                                } />

                              </FormControl>
                              <FormControl>
                                <FormLabel>Trip Start Date Time</FormLabel>
                                <Input value={data.tripStartDateTime} onChange={(e) => {
                                  setdata({ ...data, tripStartDateTime: e.target.value })
                                }
                                } type='datetime-local' placeholder="Trip Start Date" />

                              </FormControl>
                              <FormControl>
                                <FormLabel>Trip End Date Time</FormLabel>
                                <Input value={data.tripEndDateTime} onChange={(e) => {
                                  setdata({ ...data, tripEndDateTime: e.target.value })
                                }
                                } type='datetime-local' placeholder="Trip Start Date" />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Cab Type</FormLabel>
                                <NormalSelect value={data.cabType} onChange={(e) => {
                                  setdata({ ...data, cabType: e.target.value })
                                }
                                }>
                                  <option value="Sedan">Sedan</option>
                                  <option value="Crysta">Crysta</option>
                                  <option value="15 Seater">15 Seater</option>
                                  <option value="Mini Bus">Mini Bus</option>
                                  <option value="Bus">Bus</option>
                                </NormalSelect>
                              </FormControl>
                              <FormControl>
                                <FormLabel>Total Passengers</FormLabel>
                                <Input type="number" placeholder="Total Passengers" value={data.totalPassenger} onChange={(e) => {
                                  setdata({ ...data, totalPassenger: e.target.value })
                                }} />

                              </FormControl>
                            </Grid>
                          </>


                        </>
                      )
                      : data.service === 'Hotel' ?
                        (


                          <>
                            <Box p={4}>
                              <form>
                                <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                  {hotelForm.map((item) => (
                                    <FormControl>
                                      <FormLabel>{item.label}</FormLabel>
                                      {
                                        item.type === 'select' ?
                                          (
                                            <NormalSelect
                                              id={item.id}
                                            >
                                              <option selected disabled value={''} onChange={(e) => {
                                                setdata({ ...data, [item.id]: e.target.value })
                                              }}>Select</option>
                                              {item.options.map((option) => (
                                                <option value={option}>{option}</option>
                                              ))}
                                            </NormalSelect>
                                          )
                                          :
                                          (
                                            <Input type={item.type} placeholder={'Enter ' + item.label} id={item.id} onChange={(e) => {

                                              const checkInDate = document.getElementById('checkInDate').value;
                                              setdata({ ...data, [item.id]: e.target.value })

                                              if (item.id == 'checkOutDate') {
                                                const a = document.getElementById('noOfNights');
                                                a.value = calculateTotalDays(checkInDate, e.target.value).toString();
                                                console.log(calculateTotalDays(checkInDate, e.target.value))
                                              }




                                            }
                                            } />
                                          )
                                      }

                                    </FormControl>

                                  ))}
                                </Grid>
                              </form>

                            </Box>
                          </>

                        )


                        : (
                          <>
                          </>
                        )}

                  <FormControl>
                    <Button onClick={firstStepHandle}>Next</Button>
                  </FormControl>
                </Box>
              ) :
              currentStep === 1 ?
                (
                  <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
                    {
                      data.service === 'Flight' ?
                        (
                          <>
                            {data.oneWayOrRoundway === 'Round Way' ? (
                              <>
                                {Array.from({ length: 2 }).map((_, index) => (
                                  <>
                                    {index === 0 ?
                                      (
                                        <>
                                          <>
                                            <>
                                              <Heading size='md' textTransform='uppercase' color={'blue.500'}>OnWard</Heading>

                                              <Grid templateColumns='repeat(3, 1fr)' gap={5}>
                                                <FormControl>
                                                  <FormLabel>Flight Type</FormLabel>
                                                  <NormalSelect value={data.flightType} onChange={(e) => {
                                                    setdata({ ...data, flightType: e.target.value })
                                                  }}>
                                                    <option selected disabled value={''}>Select</option>
                                                    <option value="Direct">Direct</option>
                                                    <option value="Via">Via</option>
                                                  </NormalSelect>
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Airline Names</FormLabel>
                                                  <Select
                                                    options={airlines.map((airline) => ({ value: airline.name, label: airline.name }))}
                                                    value={{ value: data.airlineNames, label: data.airlineNames }}
                                                    onChange={(e) => {
                                                      setdata({ ...data, airlineNames: e.value })
                                                    }}
                                                    isSearchable={true}
                                                  />
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Flight Number</FormLabel>
                                                  <Input type="text" placeholder="Flight Number" value={data.FlightNumber} onChange={(e) => {
                                                    setdata({ ...data, FlightNumber: e.target.value })
                                                  }} />
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Fare Type</FormLabel>
                                                  <NormalSelect value={data.fareType} onChange={(e) => {
                                                    setdata({ ...data, fareType: e.target.value })
                                                  }}>
                                                    <option selected disabled value={''}>Select</option>

                                                    <option value="Normal">Normal</option>
                                                    <option value={'SME Fare'} >SME Fare</option>
                                                    <option value={'Corporate Fare'} >Corporate Fare</option>
                                                    <option value={'Special Fare'} >Special Fare</option>
                                                    <option value={'Other'} >Other</option>

                                                  </NormalSelect>
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Departure From1</FormLabel>
                                                  <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
                                                  {/* <Select
                                                    searchInputPlaceholder="Search for a Airport Name"

                                                    formatOptionLabel={
                                                      ({ label, city }) => (
                                                        <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
                                                          <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                              {city}
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                              {label}
                                                            </Text>
                                                          </Box>
                                                          <Box>
                                                            <Text pt='2' fontWeight={'bold'} fontSize='sm'>
                                                              {airports.find((item) => item.name === label).code}
                                                            </Text>
                                                          </Box>
                                                        </Stack>
                                                      )
                                                    } options={airports.map((airport) => ({ value: airport.name, label: airport.name, city: airport.city }))} value={{ value: data.departureFrom, label: data.departureFrom, city: data.departureFrom }} onChange={(e) => {
                                                      setdata({ ...data, departureFrom: e.value })
                                                    }
                                                    } isSearchable={true} /> */}
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Departure Time</FormLabel>
                                                  <Input type="time" placeholder="Departure Time" value={data.departureTime} onChange={(e) => {
                                                    setdata({ ...data, departureTime: e.target.value })
                                                  }} />
                                                </FormControl>

                                                <FormControl>
                                                  <FormLabel>Arrival Time</FormLabel>
                                                  <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} onChange={(e) => {
                                                    setdata({ ...data, arrivalTime: e.target.value })
                                                  }} />
                                                </FormControl>
                                              </Grid>
                                              <Divider />

                                              <Grid>
                                                {
                                                  data.flightType === 'Via' &&

                                                  (
                                                    <>
                                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                        <FormControl >
                                                          <FormLabel>Flight Number</FormLabel>
                                                          <Input type="text" placeholder="Flight Number" value={data.via.FlightNumber} onChange={(e) => {
                                                            setdata({ ...data, via: { ...data.via, FlightNumber: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Departure From</FormLabel>
                                                          <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
                                                          {/* <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: data.via.departureFrom, label: data.via.departureFrom }}
                                                            onChange={(e) => {
                                                              setdata({ ...data, via: { ...data.via, departureFrom: e.value } })
                                                            }}
                                                            isSearchable={true} /> */}
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Departure Time</FormLabel>
                                                          <Input type="time" placeholder="Departure Time" value={data.via.departureTime} onChange={(e) => {
                                                            setdata({ ...data, via: { ...data.via, departureTime: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Arrival To</FormLabel>
                                                          <Select 
                                                          options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} 
                                                          value={{ value: data.via.arrivalTo, label: data.via.arrivalTo }} 
                                                          onChange={(e) => {
                                                            setArrivalTo(e.value);
                                                            setdata({ ...data, via: { ...data.via, arrivalTo: e.value } });
                                                          }}
                                                          isSearchable={true} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Arrival Time</FormLabel>
                                                          <Input type="time" placeholder="Arrival Time" value={data.via.arrivalTime} onChange={(e) => {
                                                            setdata({ ...data, via: { ...data.via, arrivalTime: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                      </Grid>
                                                    </>
                                                  )

                                                }
                                                <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                  <FormControl>
                                                    <FormLabel>Our Cost</FormLabel>
                                                    <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                                      setdata({ ...data, OurCost: e.target.value })
                                                    }} />
                                                  </FormControl>
                                                  <FormControl>
                                                    <FormLabel>PRF</FormLabel>
                                                    <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                                      setdata({ ...data, Prf: e.target.value })
                                                    }} />
                                                  </FormControl>
                                                  <FormControl>
                                                    <FormLabel>Total Cost</FormLabel>
                                                    <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf)} />
                                                  </FormControl>
                                                </Grid>
                                              </Grid>
                                              <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                <FormControl>
                                                  <FormLabel>Refundable</FormLabel>
                                                  <Checkbox isChecked={data.refundable} onChange={(e) => {
                                                    setdata({ ...data, refundable: e.target.checked })
                                                  }
                                                  } />

                                                </FormControl>
                                              </Grid>


                                            </>

                                          </>
                                        </>)
                                      :
                                      (
                                        <>
                                          <>
                                            <>
                                              <Heading size='md' textTransform='uppercase' color={'blue.500'}>Return</Heading>

                                              <Grid templateColumns='repeat(3, 1fr)' gap={5}  >


                                                <FormControl>
                                                  <FormLabel>Flight Type</FormLabel>
                                                  <NormalSelect value={returnData.flightType} onChange={(e) => {
                                                    setReturnData({ ...returnData, flightType: e.target.value })
                                                  }}>
                                                    <option selected disabled value={''}>Select</option>
                                                    <option value="Direct">Direct</option>
                                                    <option value="Via">Via</option>
                                                  </NormalSelect>
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Airline Names</FormLabel>
                                                  <Select
                                                    options={airlines.map((airline) => ({ value: airline.name, label: airline.name }))}
                                                    value={{ value: returnData.airlineNames, label: returnData.airlineNames }}
                                                    onChange={(e) => {
                                                      setReturnData({ ...returnData, airlineNames: e.value })
                                                    }}
                                                    isSearchable={true}
                                                  />
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Flight Number</FormLabel>
                                                  <Input type="text" placeholder="Flight Number" value={returnData.FlightNumber} onChange={(e) => {
                                                    setReturnData({ ...returnData, FlightNumber: e.target.value })
                                                  }} />
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Fare Type</FormLabel>
                                                  <NormalSelect value={returnData.fareType} onChange={(e) => {
                                                    setReturnData({ ...returnData, fareType: e.target.value })
                                                  }}>
                                                    <option selected disabled value={''}>Select</option>

                                                    <option value="Normal">Normal</option>
                                                    <option value={'SME Fare'} >SME Fare</option>
                                                    <option value={'Corporate Fare'} >Corporate Fare</option>
                                                    <option value={'Special Fare'} >Special Fare</option>
                                                    <option value={'Other'} >Other</option>

                                                  </NormalSelect>
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Departure From</FormLabel>
                                                  <Input disabled type="text" placeholder="Departure From" value={selectedArrivalTo} />
                                                  {/* <Select
                                                    searchInputPlaceholder="Search for a Airport Name"

                                                    formatOptionLabel={
                                                      ({ label, city }) => (
                                                        <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
                                                          <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                              {city}
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                              {label}
                                                            </Text>
                                                          </Box>
                                                          <Box>
                                                            <Text pt='2' fontWeight={'bold'} fontSize='sm'>
                                                              {airports.find((item) => item.name === label).code}
                                                            </Text>
                                                          </Box>
                                                        </Stack>
                                                      )
                                                    } options={airports.map((airport) => ({ value: airport.name, label: airport.name, city: airport.city }))} value={{ value: returnData.departureFrom, label: returnData.departureFrom, city: returnData.departureFrom }} onChange={(e) => {
                                                      setReturnData({ ...returnData, departureFrom: e.value })
                                                    }
                                                    } isSearchable={true} /> */}
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Departure Time</FormLabel>
                                                  <Input type="time" placeholder="Departure Time" value={returnData.departureTime} onChange={(e) => {
                                                    setReturnData({ ...returnData, departureTime: e.target.value })
                                                  }} />
                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Arrival To</FormLabel>
                                                  <Select searchInputPlaceholder="Search for a Airport Name"

                                                    formatOptionLabel={
                                                      ({ label, city }) => (
                                                        <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
                                                          <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                              {city}
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                              {label}
                                                            </Text>
                                                          </Box>
                                                          <Box>
                                                            <Text pt='2' fontWeight={'bold'} fontSize='sm'>
                                                              {airports.find((item) => item.name === label).code}
                                                            </Text>
                                                          </Box>
                                                        </Stack>
                                                      )
                                                    } options={airports.map((airport) => ({ value: airport.name, label: airport.name, city: airport.city }))}
                                                    value={{ value: returnData.arrivalTo, label: returnData.arrivalTo, city: returnData.arrivalTo }} onChange={(e) => {
                                                      setReturnData({ ...returnData, arrivalTo: e.value })
                                                    }
                                                    } isSearchable={true} />

                                                </FormControl>
                                                <FormControl>
                                                  <FormLabel>Arrival Time</FormLabel>
                                                  <Input type="time" placeholder="Arrival Time" value={returnData.arrivalTime} onChange={(e) => {
                                                    setReturnData({ ...returnData, arrivalTime: e.target.value })
                                                  }} />
                                                </FormControl>
                                              </Grid>
                                              <Divider />

                                              <Grid>
                                                {
                                                  returnData.flightType === 'Via' &&

                                                  (
                                                    <>
                                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                        <FormControl >
                                                          <FormLabel>Flight Number</FormLabel>
                                                          <Input type="text" placeholder="Flight Number" value={returnData.via.FlightNumber} onChange={(e) => {
                                                            setReturnData({ ...returnData, via: { ...returnData.via, FlightNumber: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Departure From</FormLabel>
                                                          <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: returnData.via.departureFrom, label: returnData.via.departureFrom }}
                                                            onChange={(e) => {
                                                              setReturnData({ ...returnData, via: { ...returnData.via, departureFrom: e.value } })
                                                            }}
                                                            isSearchable={true} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Departure Time</FormLabel>
                                                          <Input type="time" placeholder="Departure Time" value={returnData.via.departureTime} onChange={(e) => {
                                                            setReturnData({ ...returnData, via: { ...returnData.via, departureTime: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Arrival To</FormLabel>
                                                          <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: returnData.via.arrivalTo, label: returnData.via.arrivalTo }} onChange={(e) => {
                                                            setReturnData({ ...returnData, via: { ...returnData.via, arrivalTo: e.value } })
                                                          }} isSearchable={true} />

                                                        </FormControl>
                                                        <FormControl>
                                                          <FormLabel>Arrival Time</FormLabel>
                                                          <Input type="time" placeholder="Arrival Time" value={returnData.via.arrivalTime} onChange={(e) => {
                                                            setReturnData({ ...returnData, via: { ...returnData.via, arrivalTime: e.target.value } })
                                                          }} />
                                                        </FormControl>
                                                      </Grid>
                                                    </>
                                                  )

                                                }
                                                <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                  <FormControl>
                                                    <FormLabel>Our Cost</FormLabel>
                                                    <Input type="number" placeholder="Our Cost" value={returnData.OurCost} onChange={(e) => {
                                                      setReturnData({ ...returnData, OurCost: e.target.value })
                                                    }} />
                                                  </FormControl>
                                                  <FormControl>
                                                    <FormLabel>PRF</FormLabel>
                                                    <Input type="number" placeholder="PRF" value={returnData.Prf} onChange={(e) => {
                                                      setReturnData({ ...returnData, Prf: e.target.value })
                                                    }} />
                                                  </FormControl>
                                                  <FormControl>
                                                    <FormLabel>Total Cost</FormLabel>
                                                    <Input disabled type="number" placeholder="PRF" value={Number(returnData.OurCost) + Number(returnData.Prf)} />
                                                  </FormControl>
                                                </Grid>
                                              </Grid>
                                              <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                                <FormControl>
                                                  <FormLabel>Refundable</FormLabel>
                                                  <Checkbox isChecked={returnData.refundable} onChange={(e) => {
                                                    setReturnData({ ...returnData, refundable: e.target.checked })
                                                  }
                                                  } />

                                                </FormControl>
                                              </Grid>

                                              {Array.from({ length: totalFlightTicket }).map((_, index) => (
                                                <>
                                                  <DuplicateFlightRoundWay key={index} index={index} onChange={handleFormChange} />
                                                  <Button style={{ backgroundColor: 'red' }} onClick={() => {
                                                    setTotalFlightTicket(totalFlightTicket - 1)
                                                    setFormsData((prevData) => prevData.filter((_, i) => i !== index));

                                                  }}>Remove</Button>

                                                </>
                                              ))}


                                              <FormControl>
                                                <Button style={{ backgroundColor: 'blue' }} onClick={() => { setTotalFlightTicket(totalFlightTicket + 1) }}>Duplicate</Button>

                                              </FormControl>

                                            </>





                                          </>
                                        </>
                                      )
                                    }
                                  </>
                                ))}
                              </>
                            )
                              :
                              (
                                <>

                                  <>
                                    <Heading size='md' textTransform='uppercase' color={'blue.500'}>Onward</Heading>

                                    <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                      <FormControl>
                                        <FormLabel>Flight Type</FormLabel>
                                        <NormalSelect value={data.flightType} onChange={(e) => {
                                          setdata({ ...data, flightType: e.target.value })
                                        }}>
                                          <option selected disabled value={''}>Select</option>
                                          <option value="Direct">Direct</option>
                                          <option value="Via">Via</option>
                                        </NormalSelect>
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>Airline Names</FormLabel>
                                        <Select
                                          options={airlines.map((airline) => ({ value: airline.name, label: airline.name }))}
                                          value={{ value: data.airlineNames, label: data.airlineNames }}
                                          onChange={(e) => {
                                            setdata({ ...data, airlineNames: e.value })
                                          }}
                                          isSearchable={true}
                                        />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>Flight Number</FormLabel>
                                        <Input type="text" placeholder="Flight Number" value={data.FlightNumber} onChange={(e) => {
                                          setdata({ ...data, FlightNumber: e.target.value })
                                        }} />
                                      </FormControl>
                                      <FormControl>
                                        <FormLabel>Fare Type</FormLabel>
                                        <NormalSelect value={data.fareType} onChange={(e) => {
                                          setdata({ ...data, fareType: e.target.value })
                                        }}>
                                          <option selected disabled value={''}>Select</option>

                                          <option value="Normal">Normal</option>
                                          <option value={'SME Fare'} >SME Fare</option>
                                          <option value={'Corporate Fare'} >Corporate Fare</option>
                                          <option value={'Special Fare'} >Special Fare</option>
                                          <option value={'Other'} >Other</option>

                                        </NormalSelect>
                                      </FormControl>

                                      <FormControl>
                                        <FormLabel>Departure Time</FormLabel>
                                        <Input type="time" placeholder="Departure Time" value={data.departureTime} onChange={(e) => {
                                          setdata({ ...data, departureTime: e.target.value })
                                        }} />
                                      </FormControl>

                                      <FormControl>
                                        <FormLabel>Arrival Time</FormLabel>
                                        <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} onChange={(e) => {
                                          setdata({ ...data, arrivalTime: e.target.value })
                                        }} />
                                      </FormControl>
                                    </Grid>
                                    <Divider />

                                    <Grid>
                                      {
                                        data.flightType === 'Via' &&

                                        (
                                          <>
                                            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                              <FormControl >
                                                <FormLabel>Flight Number</FormLabel>
                                                <Input type="text" placeholder="Flight Number" value={data.via.FlightNumber} onChange={(e) => {
                                                  setdata({ ...data, via: { ...data.via, FlightNumber: e.target.value } })
                                                }} />
                                              </FormControl>
                                              <FormControl>
                                                <FormLabel>Departure From</FormLabel>
                                                <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
                                                {/* <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: data.via.departureFrom, label: data.via.departureFrom }}
                                                  onChange={(e) => {
                                                    setdata({ ...data, via: { ...data.via, departureFrom: e.value } })
                                                  }}
                                                  isSearchable={true} /> */}
                                              </FormControl>
                                              <FormControl>
                                                <FormLabel>Departure Time</FormLabel>
                                                <Input type="time" placeholder="Departure Time" value={data.via.departureTime} onChange={(e) => {
                                                  setdata({ ...data, via: { ...data.via, departureTime: e.target.value } })
                                                }} />
                                              </FormControl>

                                              <FormControl>
                                                <FormLabel>Arrival To</FormLabel>
                                                <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: data.via.arrivalTo, label: data.via.arrivalTo }} onChange={(e) => {
                                                            setdata({ ...data, via: { ...data.via, arrivalTo: e.value } })
                                                          }} isSearchable={true} />
                                                {/* <Input disabled type="text" placeholder="PRF" value={currentQuery?.arrivalTo} /> */}
                                              </FormControl>
                                              <FormControl>
                                                <FormLabel>Arrival Time</FormLabel>
                                                <Input type="time" placeholder="Arrival Time" value={data.via.arrivalTime} onChange={(e) => {
                                                  setdata({ ...data, via: { ...data.via, arrivalTime: e.target.value } })
                                                }} />
                                              </FormControl>
                                            </Grid>
                                          </>
                                        )

                                      }
                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                        <FormControl>
                                          <FormLabel>Our Cost</FormLabel>
                                          <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                            setdata({ ...data, OurCost: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>PRF</FormLabel>
                                          <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                            setdata({ ...data, Prf: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Total Cost</FormLabel>
                                          <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf)} />
                                        </FormControl>
                                      </Grid>
                                    </Grid>
                                    <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                      <FormControl>
                                        <FormLabel>Refundable</FormLabel>
                                        <Checkbox isChecked={data.refundable} onChange={(e) => {
                                          setdata({ ...data, refundable: e.target.checked })
                                        }
                                        } />

                                      </FormControl>
                                    </Grid>


                                  </>

                                  {Array.from({ length: totalFlightTicket }).map((_, index) => (
                                    <>
                                      <FormDuplicate currentQuery={currentQuery} key={index} index={index} onChange={handleFormChange} />
                                      <Button style={{ backgroundColor: 'red' }} onClick={() => {
                                        setTotalFlightTicket(totalFlightTicket - 1)
                                        setFormsData((prevData) => prevData.filter((_, i) => i !== index));

                                      }}>Remove</Button>

                                    </>
                                  ))}


                                  <FormControl>
                                    <Button style={{ backgroundColor: 'blue' }} onClick={() => { setTotalFlightTicket(totalFlightTicket + 1) }}>Duplicate</Button>

                                  </FormControl>

                                </>


                              )
                            }
                          </>
                        ) : data?.service === 'Hotel' ? (
                          <>
                            <>
                              <Box px={'10%'} py={'5%'} gap={5} display={'flex'} flexDir={'column'}>
                                <form >
                                  <Grid templateColumns='repeat(4, 1fr)' gap={5}  >

                                    {
                                      hotel2NDStepForm.map((form, index) => (
                                        <>
                                          <FormControl>
                                            <FormLabel>{form.label}</FormLabel>
                                            {
                                              form.type === 'select' ?
                                                (
                                                  <NormalSelect >
                                                    <option value={data[form.id]} onChange={(e) => {
                                                      setdata({ ...data, [form.id]: e.target.value })
                                                    }} disabled selected>Select</option>
                                                    {
                                                      form.options.map((option) => (
                                                        <option value={option.value}>{option.label}</option>
                                                      ))
                                                    }
                                                  </NormalSelect>
                                                )
                                                : (
                                                  <Input type={form.type} value={form.id === 'totalCost' ? Number(data.ourCost) + Number(data.prf) : data[form.id]} onChange={(e) => {

                                                    setdata({ ...data, [form.id]: e.target.value })


                                                  }} id={form.id} placeholder={form.placeholder} />
                                                )
                                            }
                                          </FormControl>
                                        </>
                                      ))}

                                  </Grid>
                                  {Array.from({ length: totalHotelQuota }).map((_, index) => (
                                    <>
                                      <HotelDuplicate remove={() => { settotalHotelQuota(totalHotelQuota - 1) }} onChange={handleFormChange} index={index} />
                                    </>
                                  ))}

                                  <FormControl
                                    py={10}
                                  >
                                    <Button onClick={async () => {
                                      settotalHotelQuota(totalHotelQuota + 1)
                                    }}>Duplicate</Button>
                                  </FormControl>
                                </form>
                              </Box>
                            </>
                          </>


                        )
                          :
                          data.service === 'Cab' ?
                            (
                              <>

                                {data?.cabBookingType === "8Hrs 80kms" ?
                                  (<>
                                    <form>
                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                        <FormControl>
                                          <FormLabel>Our Cost</FormLabel>
                                          <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                            setdata({ ...data, OurCost: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>PRF</FormLabel>
                                          <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                            setdata({ ...data, Prf: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Extra Per Hours</FormLabel>
                                          <Input type="number" placeholder="Extra Per Hours" value={data.cabExtraPerHours} onChange={(e) => {
                                            setdata({ ...data, cabExtraPerHours: e.target.value })
                                          }} />
                                        </FormControl>
                                      </Grid>
                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                        <FormControl>
                                          <FormLabel>Extra KMS</FormLabel>
                                          <Input type="number" placeholder="Extra KMS" value={data.cabExtraKMS} onChange={(e) => {
                                            setdata({ ...data, cabExtraKMS: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Parking & etc</FormLabel>
                                          <Input type="number" placeholder="Parking & etc" value={data.cabParkingetc} onChange={(e) => {
                                            setdata({ ...data, cabParkingetc: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Total Cost</FormLabel>
                                          <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf) + Number(data?.cabExtraKMS) + Number(data?.cabParkingetc)} />
                                        </FormControl>
                                      </Grid>
                                    </form>
                                  </>) :
                                  data?.cabBookingType === "12Hrs 120kms" ?
                                    (<form>
                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                        <FormControl>
                                          <FormLabel>Our Cost</FormLabel>
                                          <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                            setdata({ ...data, OurCost: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>PRF</FormLabel>
                                          <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                            setdata({ ...data, Prf: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Extra Per Hours</FormLabel>
                                          <Input type="number" placeholder="Extra Per Hours" value={data.cabExtraPerHours} onChange={(e) => {
                                            setdata({ ...data, cabExtraPerHours: e.target.value })
                                          }} />
                                        </FormControl>
                                      </Grid>
                                      <Grid templateColumns='repeat(3, 1fr)' gap={5}  >

                                        <FormControl>
                                          <FormLabel>Extra KMS</FormLabel>
                                          <Input type="number" placeholder="Extra KMS" value={data.cabExtraKMS} onChange={(e) => {
                                            setdata({ ...data, cabExtraKMS: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Parking & etc</FormLabel>
                                          <Input type="number" placeholder="Parking & etc" value={data.cabParkingetc} onChange={(e) => {
                                            setdata({ ...data, cabParkingetc: e.target.value })
                                          }} />
                                        </FormControl>
                                        <FormControl>
                                          <FormLabel>Total Cost</FormLabel>
                                          <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf) + Number(data?.cabExtraKMS) + Number(data?.cabParkingetc)} />
                                        </FormControl>
                                      </Grid>
                                    </form>) :
                                    data?.cabBookingType === "Outstation" ?
                                      (<form>
                                        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                          <FormControl>
                                            <FormLabel>Per kms Rate</FormLabel>
                                            <Input type="number" placeholder="Our Cost" value={data.cabPerKmsrate} onChange={(e) => {
                                              setdata({ ...data, cabPerKmsrate: e.target.value })
                                            }} />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>PRF</FormLabel>
                                            <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                              setdata({ ...data, Prf: e.target.value })
                                            }} />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Toll & Permit</FormLabel>
                                            <Input type="number" placeholder="Extra Per Hours" value={data.cabTollPermit} onChange={(e) => {
                                              setdata({ ...data, cabTollPermit: e.target.value })
                                            }} />
                                          </FormControl>
                                        </Grid>
                                        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >

                                          <FormControl>
                                            <FormLabel>Parking & etc</FormLabel>
                                            <Input type="number" placeholder="Parking & etc" value={data.cabParkingetc} onChange={(e) => {
                                              setdata({ ...data, cabParkingetc: e.target.value })
                                            }} />
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Total Cost</FormLabel>
                                            <Input disabled type="number" placeholder="PRF" value={Number(data.cabTollPermit) + Number(data.Prf) + Number(data.cabParkingetc)} />
                                          </FormControl>
                                        </Grid>
                                      </form>) :
                                      data?.cabBookingType === "Package" ?
                                        <form>
                                          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                            <FormControl>
                                              <FormLabel>Our Cost</FormLabel>
                                              <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                                setdata({ ...data, OurCost: e.target.value })
                                              }} />
                                            </FormControl>
                                            <FormControl>
                                              <FormLabel>PRF</FormLabel>
                                              <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                                setdata({ ...data, Prf: e.target.value })
                                              }} />
                                            </FormControl>
                                            <FormControl>
                                              <FormLabel>Total Cost</FormLabel>
                                              <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf)} />
                                            </FormControl>
                                          </Grid>
                                        </form> :
                                        data?.cabBookingType === "Pick up & Drop" ?
                                          (<form>
                                            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                                              <FormControl>
                                                <FormLabel>Our Cost</FormLabel>
                                                <Input type="number" placeholder="Our Cost" value={data.OurCost} onChange={(e) => {
                                                  setdata({ ...data, OurCost: e.target.value })
                                                }} />
                                              </FormControl>
                                              <FormControl>
                                                <FormLabel>PRF</FormLabel>
                                                <Input type="number" placeholder="PRF" value={data.Prf} onChange={(e) => {
                                                  setdata({ ...data, Prf: e.target.value })
                                                }} />
                                              </FormControl>
                                              <FormControl>
                                                <FormLabel>Total Cost</FormLabel>
                                                <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost) + Number(data.Prf)} />
                                              </FormControl>
                                            </Grid>

                                          </form>) :
                                          null}
                                {Array.from({ length: totalCabBooking }).map((_, index) => (
                                  <>
                                    <CabFormDuplicate key={index} index={index} onChange={handlecabFormChange} />
                                    <Button style={{ backgroundColor: 'red' }} onClick={() => {
                                      setTotalCabBooking(totalCabBooking - 1)
                                      setcabFormsData((prevData) => prevData.filter((_, i) => i !== index));

                                    }}>Remove</Button>

                                  </>
                                ))}


                                <FormControl>
                                  <Button style={{ backgroundColor: 'blue' }} onClick={() => { setTotalCabBooking(totalCabBooking + 1) }}>Duplicate</Button>

                                </FormControl>
                              </>
                            )
                            :
                            (
                              <>
                              </>
                            )
                    }


                    <FormControl>
                      <Button onClick={() => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You want to genarate query for this service",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes, genarate it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            if (data?.service === "Flight") {
                              setFlighttable(true)
                            } else if (data?.service === "Cab") {
                              setCabTable(true);
                            } else if (data?.service === "Hotel") {
                              setHotalTable(true)
                            }
                          }
                          else {
                            toast.error('Query not genarated')
                          }
                        })
                      }}>Next</Button>
                    </FormControl>
                  </Box>

                )
                : (
                  <>
                  </>
                )

          }


        </CardBody>
      </Card>

    </div>
  );
}

