import { setQuery } from '@/redux/actions/queryActions';
import {
  Table,
  Button,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter

}
  from '@chakra-ui/react'
import { Typography } from '@material-tailwind/react';
import { Heading } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function EditTableFlightQuery({ isOpen, onClose, data, returnData, handleSave, duplicate, isT, totalFlightTicket }) {

  const [isTable, setIsTable] = useState(isT ? isT : false);
  const copyToClipBoard = () => {
    const copyData = `<div style=\"font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; background-color: #FFA500; padding: 15px; border-radius: 8px;\"><p><strong>Airline Name:</strong> ${data?.airlineNames}</p><p><strong>Fare Type:</strong> ${data?.fareType}</p><p><strong>Departure Time:</strong> ${data?.departureFrom}</p><p><strong>Arrival Time:</strong> ${data?.arrivalTo}</p><p><strong>Total Cost:</strong> ₹ ${(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</p><p><strong>Fare Refundable/Non-refundable:</strong> ${data?.refundable ? 'Refundable' : 'Non-Refundable'}</p></div>`;
    window.navigator.clipboard.writeText(copyData)
    handleSave()
  }
  const dispatch = useDispatch();
  const q = useSelector(state => state.query);
  const navigate = useNavigate();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'auto'} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Submitted Successfully</ModalHeader>

          <ModalCloseButton onClose={onClose} />
          <ModalBody overflowX={'scroll'}>
            <Typography component="div" className='my-2' style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography>
                {(duplicate && totalFlightTicket > 0) && 
                  <Typography className="text-xl font-semibold text-black my-1">
                    Quotation1
                  </Typography>}
                {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && data?.flightType) &&
                  <Typography className="text-xl font-semibold text-black">
                    Onward
                  </Typography>
                }
              </Typography>
            </Typography>
            
            {data?.flightType && 
            <Table variant='simple' >
              <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Airline Name</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Number</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Departure Airport</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Arrival Airport</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare Type</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Type</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare refundable/Non-refundable</Td>
              </Tr>
              <Tr>
                <Td>{data?.airlineNames}</Td>
                <Td>{data?.FlightNumber}</Td>
                <Td>{data?.departureFrom}</Td>
                <Td>{data?.arrivalTo}</Td>
                <Td>{data?.fareType}</Td>
                <Td>{data?.flightType}</Td>
                <Td>₹ {(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</Td>
                <Td>{data?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
              </Tr>
              {(data?.via && data.via?.arrivalTo) && (
                <Tr>
                  <Td>{data?.airlineNames}</Td>
                  <Td>{data.via?.FlightNumber}</Td>
                  <Td>{data.via?.departureFrom}</Td>
                  <Td>{data.via?.arrivalTo}</Td>
                  <Td>{data?.fareType}</Td>
                  <Td>{data?.flightType}</Td>
                  <Td>₹ {(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</Td>
                  <Td>{data?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                </Tr>
              )}
            </Table>
            }

            {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && returnData?.flightType) &&
              (
                <>
                  <Typography className="text-xl font-semibold text-black mt-1">
                    Return
                  </Typography>
                  <Table variant='simple' >
                    <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Airline Name</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Number</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Departure Airport</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Arrival Airport</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare Type</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Type</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare refundable/Non-refundable</Td>
                    </Tr>
                    <Tr>
                      <Td>{returnData?.airlineNames}</Td>
                      <Td>{returnData?.FlightNumber}</Td>
                      <Td>{returnData?.departureFrom}</Td>
                      <Td>{returnData?.arrivalTo}</Td>
                      <Td>{returnData?.fareType}</Td>
                      <Td>{returnData?.flightType}</Td>
                      <Td>₹ {(Number(returnData?.ourCost) + Number(returnData?.prf)).toFixed(2)}</Td>
                      <Td>{returnData?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                    </Tr>
                    {(returnData?.via && returnData.via?.FlightNumber) && (
                      <Tr>
                        <Td>{returnData?.airlineNames}</Td>
                        <Td>{returnData.via?.FlightNumber}</Td>
                        <Td>{returnData.via?.departureFrom}</Td>
                        <Td>{returnData.via?.arrivalTo}</Td>
                        <Td>{returnData?.fareType}</Td>
                        <Td>{returnData?.flightType}</Td>
                        <Td>₹ {(Number(returnData?.ourCost) + Number(returnData?.prf)).toFixed(2)}</Td>
                        <Td>{returnData?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                      </Tr>
                    )}

                  </Table>
                </>
              )
            }

              {((duplicate && totalFlightTicket > 0)) && <>
                {duplicate.length > 0 && duplicate.map((item, index) => (
                  <>
                  <Typography component="div" className='my-2' style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography>
                      <Typography className="text-xl font-semibold text-black">
                        Quotation{index+2}
                      </Typography>
                      {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && item?.flightType) &&
                        <Typography className="text-xl font-semibold text-black mt-2">
                          Onward
                        </Typography>
                      }
                    </Typography>
                  </Typography>

                  {item?.flightType && 
                  <Table variant='simple' >
                    <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Airline Name</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Number</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Departure Airport</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Arrival Airport</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare Type</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Type</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare refundable/Non-refundable</Td>
                    </Tr>
                    <Tr>
                      <Td>{item?.airlineNames}</Td>
                      <Td>{item?.FlightNumber}</Td>
                      <Td>{item?.departureFrom}</Td>
                      <Td>{item?.arrivalTo}</Td>
                      <Td>{item?.fareType}</Td>
                      <Td>{item?.flightType}</Td>
                      <Td>₹ {(Number(item?.ourCost) + Number(item?.prf)).toFixed(2)}</Td>
                      <Td>{item?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                    </Tr>
                    {(item?.via && item.via?.arrivalTo) && (
                      <Tr>
                        <Td>{item?.airlineNames}</Td>
                        <Td>{item.via?.FlightNumber}</Td>
                        <Td>{item.via?.departureFrom}</Td>
                        <Td>{item.via?.arrivalTo}</Td>
                        <Td>{item?.fareType}</Td>
                        <Td>{item?.flightType}</Td>
                        <Td>₹ {(Number(item?.ourCost) + Number(item?.prf)).toFixed(2)}</Td>
                        <Td>{item?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                      </Tr>
                    )}
                  </Table>
                  }
                  {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && item.returnFlight?.flightType) &&
                    (
                      <>
                        <Typography className="text-xl font-semibold text-black">
                          Return
                        </Typography>
                        <Table variant='simple' >
                          <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Airline Name</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Number</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Departure Airport</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Arrival Airport</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare Type</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Flight Type</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                            <Td borderRightColor={'white'} borderRightWidth={0.5}>Fare refundable/Non-refundable</Td>
                          </Tr>
                          <Tr>
                            <Td>{item.returnFlight?.airlineNames}</Td>
                            <Td>{item.returnFlight?.FlightNumber}</Td>
                            <Td>{item.returnFlight?.departureFrom}</Td>
                            <Td>{item.returnFlight?.arrivalTo}</Td>
                            <Td>{item.returnFlight?.fareType}</Td>
                            <Td>{item.returnFlight?.flightType}</Td>
                            <Td>₹ {(Number(item.returnFlight?.ourCost) + Number(item.returnFlight?.prf)).toFixed(2)}</Td>
                            <Td>{item.returnFlight?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                          </Tr>
                          {(item.returnFlight?.via && item.returnFlight.via?.arrivalTo) && (
                            <Tr>
                              <Td>{item.returnFlight?.airlineNames}</Td>
                              <Td>{item.returnFlight.via?.FlightNumber}</Td>
                              <Td>{item.returnFlight.via?.departureFrom}</Td>
                              <Td>{item.returnFlight.via?.arrivalTo}</Td>
                              <Td>{item.returnFlight?.fareType}</Td>
                              <Td>{item.returnFlight?.flightType}</Td>
                              <Td>₹ {(Number(item.returnFlight?.ourCost) + Number(item.returnFlight?.prf)).toFixed(2)}</Td>
                              <Td>{item.returnFlight?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                            </Tr>
                          )}

                        </Table>
                      </>
                    )
                  }
                  </>
                ))}
              </>}
          </ModalBody>

          <ModalFooter>
            <Button className='ml-2' colorScheme='blue' mr={3} onClick={copyToClipBoard}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}