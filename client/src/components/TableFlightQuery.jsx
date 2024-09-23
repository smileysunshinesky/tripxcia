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
export default function TableFlightQuery({ isOpen, onClose, data, handleSave, duplicate, isT }) {
  const [isTable, setIsTable] = useState(isT ? isT : false)
  // const copyToClipBoard = () => {
  //   const copyData = `<div style=\"font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; background-color: #FFA500; padding: 15px; border-radius: 8px;\"><p><strong>Airline Name:</strong> ${data?.airlineNames}</p><p><strong>Fare Type:</strong> ${data?.fareType}</p><p><strong>Departure Time:</strong> ${data?.departureFrom}</p><p><strong>Arrival Time:</strong> ${data?.arrivalTo}</p><p><strong>Total Cost:</strong> ₹ ${(Number(data?.OurCost) + Number(data?.Prf)).toFixed(2)}</p><p><strong>Fare Refundable/Non-refundable:</strong> ${data?.refundable ? 'Refundable' : 'Non-Refundable'}</p></div>`;

  //   window.navigator.clipboard.writeText(copyData)
  //   handleSave()
  // }
  const dispatch = useDispatch();
  const q = useSelector(state => state.query);
  const navigate = useNavigate()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'auto'} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Submitted Successfully</ModalHeader>

          <ModalCloseButton />
          <ModalBody overflowX={'scroll'}>
            {data?.OneWayOrRoundTrip === 'Round Way' &&
              <Typography className="text-xl font-semibold text-black">
                Onward
              </Typography>}
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
                <Td>₹ {(Number(data?.OurCost) + Number(data?.Prf)).toFixed(2)}</Td>
                <Td>{data?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
              </Tr>
              {duplicate && <>
                {duplicate.length > 0 && duplicate.map((item, index) => (
                  <Tr key={index} gap={0}>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.airlineNames}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.FlightNumber}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.departureFrom}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.arrivalTo}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.fareType}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.flightType}</Td>
                    <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(item.OurCost) + Number(item.Prf)).toFixed(2)}</Td>
                    <Td>{item.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                  </Tr>
                ))}
              </>}
            </Table>
            {
              data?.OneWayOrRoundTrip === 'Round Way' &&

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
                      <Td>{data?.airlineNames}</Td>
                      <Td>{data?.FlightNumber}</Td>
                      <Td>{data?.departureFrom}</Td>
                      <Td>{data?.arrivalTo}</Td>
                      <Td>{data?.fareType}</Td>
                      <Td>{data?.flightType}</Td>
                      <Td>₹ {(Number(data?.OurCost) + Number(data?.Prf)).toFixed(2)}</Td>
                      <Td>{data?.refundable ? 'Refundable' : 'Non-Refundable'}</Td>
                    </Tr>

                  </Table>

                </>
              )

            }
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => {
              dispatch(setQuery({
                type: 'Flight',
                query: data?.FlightNumber,
              }))
              navigate('/dashboard/query-confirm/' + data?._id)
            }} colorScheme='blue' >Confirm</Button>
            {/* <Button className='ml-2' colorScheme='blue' mr={3} onClick={copyToClipBoard}>
              Copy to Clipboard
            </Button> */}

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}