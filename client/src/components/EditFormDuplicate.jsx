import {
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Select as NormalSelect
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import Select from 'react-tailwindcss-select'
import { airlines } from '@/data/airlines';
import airports from '@/data/airports';
import { Input } from '@material-tailwind/react';
export default function EditFormDuplicate({ index, onChange, currentQuery }) {
  const [selectedArrivalTo, setArrivalTo] = useState('');
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
    via: {
      FlightNumber: '',
      departureFrom: '',
      departureTime: '',
      arrivalTo: '',
      arrivalTime: ''
    }
  });

  const handleChange = (e) => {

    if (e.target.name === 'flightType') {
      if(e.target.value == 'Direct') {
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
            arrivalTo: '',
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
  return (
    <>
      <>

        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl isRequired>
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
          <FormControl isRequired>
            <FormLabel>Flight Number</FormLabel>
            <Input type="text" placeholder="Flight Number" value={data.FlightNumber} name='FlightNumber' onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
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
          <FormControl isRequired>
            <FormLabel>Departure From</FormLabel>
            <Input disabled type="text" placeholder="PRF" value={currentQuery?.departureFrom} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Departure Time</FormLabel>
            <Input type="time" placeholder="Departure Time" value={data.departureTime} name='departureTime' onChange={handleChange} />
          </FormControl>
          {data.flightType === 'Via' ? (
            <FormControl isRequired>
              <FormLabel>Arrival To</FormLabel>
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
            <FormControl isRequired>
              <FormLabel>Arrival To</FormLabel>
              <Input disabled type="text" placeholder="PRF" value={currentQuery?.arrivalTo} />
            </FormControl>
            )}
          <FormControl isRequired>
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
                  <FormControl isRequired>
                    <FormLabel>Departure From</FormLabel>
                    <Input disabled type="text" placeholder="Departure From" value={selectedArrivalTo} />
                    {/* <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: data.via.departureFrom, label: data.via.departureFrom }}
                      onChange={
                        (e) => {
                          const { value } = e;
                          setdata((prevData) => {
                            const updatedData = { ...prevData, via: { ...data.via, departureFrom: value } };
                            onChange(index, updatedData);
                            return updatedData;
                          });
                        }

                      }
                      isSearchable={true} /> */}
                  </FormControl>
                  <FormControl isRequired>
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
                  {/* <FormControl isRequired>
                    <FormLabel>Arrival To</FormLabel>
                    <Select options={airports.map((airport) => ({ value: airport.name, label: airport.name }))} value={{ value: data.via.arrivalTo, label: data.via.arrivalTo }} onChange={
                      (e) => {
                        const { value } = e;
                        setdata((prevData) => {
                          const updatedData = { ...prevData, via: { ...data.via, arrivalTo: value } };
                          onChange(index, updatedData);
                          return updatedData;
                        });
                      }

                    } isSearchable={true} />

                  </FormControl> */}
                  <FormControl isRequired>
                    <FormLabel>Arrival To</FormLabel>
                    <Input disabled type="text" placeholder="PRF" value={currentQuery?.arrivalTo} />
                  </FormControl>
                  <FormControl isRequired>
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
            <FormControl isRequired>
              <FormLabel>Our Cost</FormLabel>
              <Input type="number" placeholder="Our Cost" value={data.ourCost} name='ourCost' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>PRF</FormLabel>
              <Input type="number" placeholder="PRF" value={data.prf} name='prf' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
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


      </>

    </>
  )
}
