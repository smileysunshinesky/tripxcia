import React, { useState,useEffect } from 'react';
import {
  Input
} from "@material-tailwind/react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select as NormalSelect
} from '@chakra-ui/react';
import Select from "react-tailwindcss-select";
import { Form } from "react-router-dom";
import FlightExtraForm from "@/components/FlightExtraForm";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { airlines } from '@/data/airlines';
import airports from '@/data/airports';

const EditDuplicateFlightRoundWay = ({ index, onChange, currentQuery }) => {
  const [selectedArrivalTo, setArrivalTo] = useState('');
  const [selectedReturnArrivalTo, setReturnArrivalTo] = useState('');
  const [returnData, setReturnData] = useState(currentQuery.duplicate[index]?.returnFlight ? currentQuery.duplicate[index].returnFlight : {
    flightType: '',
    airlineNames: '',
    FlightNumber: '',
    fareType: '',
    departureFrom: '',
    departureTime: '',
    arrivalTo: '',
    arrivalTime: '',
    ourCost: 0,
    prf: 0,
    refundable: false,
    via: {
      FlightNumber: '',
      departureFrom: '',
      departureTime: '',
      arrivalTo: '',
      arrivalTime: ''
    }
  })

  const [data, setdata] = useState(currentQuery.duplicate[index] ? currentQuery.duplicate[index] : {
    flightType: '',
    airlineNames: '',
    FlightNumber: '',
    fareType: '',
    departureFrom: '',
    departureTime: '',
    arrivalTo: '',
    arrivalTime: '',
    ourCost: 0,
    prf: 0,
    refundable: false,
    returnFlight: returnData,
    via: {
      FlightNumber: '',
      departureFrom: '',
      departureTime: '',
      arrivalTo: '',
      arrivalTime: '',
    }
  });
  const handleChange = (e) => {

    if (e.target.name === 'flightType') {
      if (e.target.value == 'Direct') {
        setdata((prevData) => {
          const updatedData = {
            ...prevData,
            departureFrom: currentQuery?.departureFrom,
            arrivalTo: currentQuery?.arrivalTo,
            via: {
              FlightNumber: '',
              departureFrom: '',
              departureTime: '',
              arrivalTo: '',
              arrivalTime: ''
            }
          };
          onChange(index, updatedData);
          return updatedData;
        });
      } else {
        setdata((prevData) => {
          const updatedData = {
            ...prevData,
            departureFrom: currentQuery?.departureFrom,
            via: {
              FlightNumber: '',
              departureFrom: '',
              departureTime: '',
              arrivalTo: currentQuery?.arrivalTo,
              arrivalTime: ''
            }
          };
          onChange(index, updatedData);
          return updatedData;
        });
      }
    }

    if (e.target.name === 'refundable') {
      const { name, checked } = e.target;
      setdata((prevData) => {
        const updatedData = { ...prevData, [name]: checked };
        onChange(index, updatedData);
        return updatedData;
      });
    }

    else {

      const { name, value } = e.target;
      setdata((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        onChange(index, updatedData);
        return updatedData;
      });
    }

  };

  useEffect(() => {
    setdata((prevData) => {
      const updatedData = { ...prevData, returnFlight: returnData };
      onChange(index, updatedData);
      return updatedData;
    });
  }, [returnData]);

  const handleReturnChange = (e) => {
    if (e.target.name === 'flightType') {
      if (e.target.value == 'Direct') {
        setReturnData((prevData) => {
          const updatedData = {
            ...prevData,
            flightType: "Direct",
            departureFrom: currentQuery?.arrivalTo,
            arrivalTo: currentQuery?.departureFrom,
            via: {
              FlightNumber: '',
              departureFrom: '',
              departureTime: '',
              arrivalTo: '',
              arrivalTime: ''
            }
          };
          return updatedData;
        });
      } else {
        setReturnData((prevData) => {
          const updatedData = {
            ...prevData,
            flightType: "Via",
            departureFrom: currentQuery?.arrivalTo,
            arrivalTo: '',
            via: {
              FlightNumber: '',
              departureFrom: '',
              departureTime: '',
              arrivalTo: currentQuery?.departureFrom,
              arrivalTime: ''
            }
          };
          return updatedData;
        });
      }
    }
  };

  return (
    <div>
      <>
        <>
          <>
            <Heading size='md' textTransform='uppercase' color={'blue.500'}>OnWard</Heading>

            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
              <FormControl>
                <FormLabel>Flight Type</FormLabel>
                <NormalSelect value={data.flightType} name='flightType' onChange={handleChange}>
                  <option selected disabled value={''}>Select</option>
                  <option value="Direct">Direct</option>
                  <option value="Via">Via</option>
                </NormalSelect>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Airline Name</FormLabel>
                <Select
                  options={airlines.map((airline) => ({ value: airline.name, label: airline.name }))}
                  value={{ value: data.airlineNames, label: data.airlineNames }}
                  name='airlineNames' onChange={(e) => {
                    const { value } = e;
                    setdata((prevData) => {
                      const updatedData = { ...prevData, airlineNames: value };
                      onChange(index, updatedData);
                      return updatedData;
                    });

                  }}
                  isSearchable={true}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Flight Number</FormLabel>
                <Input type="text" placeholder="Flight Number" value={data.FlightNumber} name='FlightNumber' onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Fare Type</FormLabel>
                <NormalSelect value={data.fareType} name='fareType' onChange={handleChange} >
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
                <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
              </FormControl>
              <FormControl>
                <FormLabel>Departure Time</FormLabel>
                <Input type="time" placeholder="Departure Time" value={data.departureTime} name='departureTime' onChange={handleChange} />
              </FormControl>

              {data.flightType === 'Via' ? (
                <FormControl>
                  <FormLabel>Arrival To1</FormLabel>
                  <Select
                    options={airports.map((airport) => ({ value: airport.name, label: airport.name }))}
                    value={{ value: data.arrivalTo, label: data.arrivalTo }}
                    onChange={(e) => {
                      setArrivalTo(e.value);
                      setdata((prevData) => {
                        const updatedData = { ...prevData, arrivalTo: e.value, via: { ...data.via, departureFrom: e.value } };
                        onChange(index, updatedData);
                        return updatedData;
                      });
                    }}
                    isSearchable={true} />
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Arrival To</FormLabel>
                  <Input disabled type="text" placeholder="PRF" value={currentQuery?.arrivalTo} />
                </FormControl>
              )}

              {/* {returnData.flightType === 'Via' ? () : ()} */}

              <FormControl>
                <FormLabel>Arrival Time</FormLabel>
                <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} name='arrivalTime' onChange={handleChange} />
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
                        <Input type="text" placeholder="Flight Number" value={data.via.FlightNumber} onChange={
                          (e) => {
                            const { value } = e.target;
                            setdata((prevData) => {
                              const updatedData = { ...prevData, via: { ...data.via, FlightNumber: value } };
                              onChange(index, updatedData);
                              return updatedData;
                            });
                          }

                        } />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Departure From</FormLabel>
                        <Input disabled type="text" placeholder="Departure From" value={selectedArrivalTo} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Departure Time</FormLabel>
                        <Input type="time" placeholder="Departure Time" value={data.via.departureTime} onChange={
                          (e) => {
                            const { value } = e.target;
                            setdata((prevData) => {
                              const updatedData = { ...prevData, via: { ...data.via, departureTime: value } };
                              onChange(index, updatedData);
                              return updatedData;
                            });
                          }

                        } />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Arrival To</FormLabel>
                        <Input disabled type="text" placeholder="PRF" value={currentQuery?.arrivalTo} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Arrival Time</FormLabel>
                        <Input type="time" placeholder="Arrival Time" value={data.via.arrivalTime} onChange={
                          (e) => {
                            const { value } = e.target;
                            setdata((prevData) => {
                              const updatedData = { ...prevData, via: { ...data.via, arrivalTime: value } };
                              onChange(index, updatedData);
                              return updatedData;
                            });
                          }

                        } />
                      </FormControl>
                    </Grid>
                  </>
                )

              }
              <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
                <FormControl>
                  <FormLabel>Our Cost</FormLabel>
                  <Input type="number" placeholder="Our Cost" value={data.ourCost} name='ourCost' onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>PRF</FormLabel>
                  <Input type="number" placeholder="PRF" value={data.prf} name='prf' onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Cost</FormLabel>
                  <Input disabled type="number" placeholder="PRF" value={Number(data.ourCost) + Number(data.prf)} />
                </FormControl>
              </Grid>
            </Grid>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
              <FormControl style={{display: 'flex'}}>
                <Checkbox isChecked={data.refundable} name='refundable' onChange={handleChange} />
                <FormLabel style={{marginBottom: '0px', marginLeft: '8px'}}>Refundable</FormLabel>
              </FormControl>
            </Grid>


            <Heading size='md' textTransform='uppercase' color={'blue.500'}>Return</Heading>

            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
              <FormControl>
                <FormLabel>Flight Type</FormLabel>
                <NormalSelect value={returnData.flightType} name='flightType' onChange={handleReturnChange}>
                  <option selected disabled value={''}>Select</option>
                  <option value="Direct">Direct</option>
                  <option value="Via">Via</option>
                </NormalSelect>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Airline Name</FormLabel>
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
                <Input disabled type="text" placeholder="Departure From" value={currentQuery?.arrivalTo} />
              </FormControl>
              <FormControl>
                <FormLabel>Departure Time</FormLabel>
                <Input type="time" placeholder="Departure Time" value={returnData.departureTime} onChange={(e) => {
                  setReturnData({ ...returnData, departureTime: e.target.value })
                }} />
              </FormControl>

              {returnData.flightType === 'Via' ? (
                <FormControl>
                  <FormLabel>Arrival To</FormLabel>
                  <Select
                    options={airports.map((airport) => ({ value: airport.name, label: airport.name }))}
                    value={{ value: returnData.arrivalTo, label: returnData.arrivalTo }}
                    onChange={(e) => {
                      setReturnArrivalTo(e.value);
                      setReturnData((prevData) => {
                        const updatedData = { ...prevData, arrivalTo: e.value, via: { ...returnData.via, departureFrom: e.value } };
                        onChange(index, updatedData);
                        return updatedData;
                      });
                    }}
                    isSearchable={true} />
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Arrival To</FormLabel>
                  <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
                </FormControl>
              )}

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
                        <Input disabled type="text" placeholder="Departure From" value={selectedReturnArrivalTo} />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Departure Time</FormLabel>
                        <Input type="time" placeholder="Departure Time" value={returnData.via.departureTime} onChange={(e) => {
                          setReturnData({ ...returnData, via: { ...returnData.via, departureTime: e.target.value } })
                        }} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Arrival To</FormLabel>
                        <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
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
                  <Input type="number" placeholder="Our Cost" value={returnData.ourCost} onChange={(e) => {
                    setReturnData({ ...returnData, ourCost: e.target.value })
                  }} />
                </FormControl>
                <FormControl>
                  <FormLabel>PRF</FormLabel>
                  <Input type="number" placeholder="PRF" value={returnData.prf} onChange={(e) => {
                    setReturnData({ ...returnData, prf: e.target.value })
                  }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Total Cost</FormLabel>
                  <Input disabled type="number" placeholder="PRF" value={Number(returnData.ourCost) + Number(returnData.prf)} />
                </FormControl>
              </Grid>
            </Grid>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
              <FormControl style={{display: 'flex'}}>
                <Checkbox isChecked={returnData.refundable} onChange={(e) => {
                  setReturnData({ ...returnData, refundable: e.target.checked })
                  }
                } />
                <FormLabel style={{marginBottom: '0px', marginLeft: '8px'}}>Refundable</FormLabel>
              </FormControl>
            </Grid>
          </>
        </>
      </>
    </div>
  )
}

export default EditDuplicateFlightRoundWay
