import { setQuery } from '@/redux/actions/queryActions';
import {
  Table,
  Thead,
  Tbody,
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
    let copyData = "";
  
    // Helper function to generate text for each quotation
    const generateQuotationText = (quotation, index) => {
      let text = `Quotation ${index + 1}\n`;
      text += `Onward Flight Details:\n`;
      text += `Airline Name: ${quotation.airlineNames}\n`;
      text += `Flight Number: ${quotation.FlightNumber}\n`;
      text += `Departure Airport: ${quotation.departureFrom}\n`;
      text += `Arrival Airport: ${quotation.arrivalTo}\n`;
      text += `Fare Type: ${quotation.fareType}\n`;
      text += `Flight Type: ${quotation.flightType}\n`;
      text += `Total Cost: ₹ ${(Number(quotation.ourCost) + Number(quotation.prf)).toFixed(2)}\n`;
      text += `Fare Refundable/Non-refundable: ${quotation.refundable ? 'Refundable' : 'Non-Refundable'}\n`;
  
      // Via Flight Details (if any)
      if (quotation.via && quotation.via.arrivalTo) {
        text += `\nVia Flight Details:\n`;
        text += `Via Flight Number: ${quotation.via.FlightNumber}\n`;
        text += `Via Departure Airport: ${quotation.via.departureFrom}\n`;
        text += `Via Arrival Airport: ${quotation.via.arrivalTo}\n`;
      }
  
      // Return Flight Details (if Round Trip)
      if ((quotation.oneWayOrRoundway === 'Round Way' || quotation.OneWayOrRoundTrip === 'Round Way') && quotation.returnFlight?.flightType) {
        text += `\nReturn Flight Details:\n`;
        text += `Airline Name: ${quotation.returnFlight.airlineNames}\n`;
        text += `Flight Number: ${quotation.returnFlight.FlightNumber}\n`;
        text += `Departure Airport: ${quotation.returnFlight.departureFrom}\n`;
        text += `Arrival Airport: ${quotation.returnFlight.arrivalTo}\n`;
        text += `Fare Type: ${quotation.returnFlight.fareType}\n`;
        text += `Flight Type: ${quotation.returnFlight.flightType}\n`;
        text += `Total Cost: ₹ ${(Number(quotation.returnFlight.ourCost) + Number(quotation.returnFlight.prf)).toFixed(2)}\n`;
        text += `Fare Refundable/Non-refundable: ${quotation.returnFlight.refundable ? 'Refundable' : 'Non-Refundable'}\n`;
  
        // Via Flight in Return (if any)
        if (quotation.returnFlight.via && quotation.returnFlight.via.arrivalTo) {
          text += `\nReturn Via Flight Details:\n`;
          text += `Return Via Flight Number: ${quotation.returnFlight.via.FlightNumber}\n`;
          text += `Return Via Departure Airport: ${quotation.returnFlight.via.departureFrom}\n`;
          text += `Return Via Arrival Airport: ${quotation.returnFlight.via.arrivalTo}\n`;
        }
      }
  
      return text;
    };
  
    // Generate text for Main Data
    copyData += generateQuotationText(data, 0);
  
    // Generate text for Duplicates
    if (duplicate && duplicate.length > 0) {
      duplicate.forEach((item, index) => {
        copyData += `\n\n`;  // Separate each quotation with a line break
        copyData += generateQuotationText(item, index + 1);
      });
    }
  
    // Copy the compiled text to the clipboard
    window.navigator.clipboard.writeText(copyData)
      .then(() => {
        console.log('Copied to clipboard successfully!');
        handleSave();
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };
  
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
            <div className='my-2' style={{display: 'flex', justifyContent: 'space-between'}}>
              {(duplicate && totalFlightTicket > 0) && 
                <Typography variant='h2' className="text-xl font-semibold text-black my-1">
                  Quotation1
                </Typography>}
              {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && data?.flightType) &&
                <Typography variant='h3' className="text-xl font-semibold text-black">
                  Onward
                </Typography>
              }
            </div>
            
            {data?.flightType && 
            <Table variant='simple'>
              <Thead>
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
              </Thead>
              <Tbody>
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
              </Tbody>
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
                  <div className='my-2' style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h2' className="text-xl font-semibold text-black">
                      Quotation{index+2}
                    </Typography>
                    {((data?.oneWayOrRoundway === 'Round Way' || data?.OneWayOrRoundTrip === 'Round Way') && item?.flightType) &&
                      <Typography variant='h3' className="text-xl font-semibold text-black mt-2">
                        Onward
                      </Typography>
                    }
                  </div>

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
                        <Typography variant='h3' className="text-xl font-semibold text-black">
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