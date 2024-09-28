import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';


const EditTableCabQuery = ({ isOpen, onClose, data, handleSave, duplicate, isT, viewbtn, totalCabBooking }) => {

  const [isTable, setIsTable] = useState(isT ? isT : false)
  const navigate = useNavigate();
  const copyToClipBoard = () => {
    const copyData = `<div style=\"font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; background-color: #FFA500; padding: 15px; border-radius: 8px;\"><p><strong>Airline Name:</strong> ${data?.airlineNames}</p><p><strong>Fare Type:</strong> ${data?.fareType}</p><p><strong>Departure Time:</strong> ${data?.departureFrom}</p><p><strong>Arrival Time:</strong> ${data?.arrivalTo}</p><p><strong>Total Cost:</strong> ₹ ${(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</p><p><strong>Fare Refundable/Non-refundable:</strong> ${data?.refundable ? 'Refundable' : 'Non-Refundable'}</p></div>`;

    window.navigator.clipboard.writeText(copyData)
    handleSave()
    onClose()
  }
  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        navigate('/dashboard/quota-cab')
      }} size={'5xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Submitted Successfully</ModalHeader>

          <ModalCloseButton onClick={copyToClipBoard} />
          <ModalBody >
            <Table variant='simple' >
              <Tbody>
                <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Cab Booking Type</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Client Name</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>City</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Our Cast</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>

                </Tr>
                <Tr>
                  <Td>{data?.cabBookingType}</Td>
                  <Td>{data?.client}</Td>
                  <Td>{data?.city}</Td>
                  <Td>{data?.ourCost}</Td>

                  <Td>₹ {(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</Td>
                </Tr>
              </Tbody>
            </Table>

            {(duplicate && totalCabBooking > 0) || (duplicate && viewbtn) && <>
              {duplicate.length>0 && duplicate.map((item,index)=>(
                <Table variant='simple' >
                  <Tbody>
                    <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Cab Booking Type</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Client Name</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>City</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Our Cast</Td>
                      <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>

                    </Tr>
                    <Tr key={index} gap={0}>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.cabBookingType}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.tripStartDateTime}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.tripEndDateTime}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.ourCost}</Td>
                  
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(data.ourCost)+Number(data.prf)).toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
                ))}
            </>}

          </ModalBody>

          <ModalFooter>
            {viewbtn && (
              <Typography className='mb-0' style={{alignContent: 'center'}}>
                <Button colorScheme='blue'
                    onClick={() => {
                      dispatch(setQuery({
                          type: 'Cab',
                          query: data.cabBookingType,
                      }))
                      navigate('/dashboard/query-confirm/' + data?._id)

                    }}
                  >Confirm
                </Button>
                <Button colorScheme='blue' className='ml-2' onClick={onClose}>Decline</Button>
                <Button colorScheme='blue' className='ml-2' onClick={onClose}>Request more</Button>
              </Typography>
            )}
            {!viewbtn && 
             <Button className='ml-2' colorScheme='blue' mr={3} onClick={copyToClipBoard}>
               Copy to Clipboard
             </Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTableCabQuery
