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
  ModalFooter,
  Tbody

}
  from '@chakra-ui/react';
import { Typography } from '@material-tailwind/react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuery } from '@/redux/actions/queryActions';

export default function HotelTable({ isOpen, onClose, data, handleSave, duplicate, isT, viewbtn }) {
  const [isTable, setIsTable] = useState(isT ? isT : false);

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

      <Modal isOpen={isOpen} onClose={viewbtn ? onClose : copyToClipBoard} size={'5xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Submitted Successfully</ModalHeader>

          <ModalCloseButton onClose={copyToClipBoard} />
          <ModalBody >
            <Table variant='simple' >
              <Tbody>
                <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Hotel Name</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Address</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Contact</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Email</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                </Tr>
                <Tr>
                  <Td>{data?.hotelName}</Td>
                  <Td>{data?.address}</Td>
                  <Td>{data?.contact}</Td>
                  <Td>{data?.email}</Td>

                  <Td>₹ {(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}</Td>
                </Tr>
                {duplicate && <>
                        {duplicate.length>0 && duplicate.map((item,index)=>(
                      <Tr key={index} gap={0}>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.hotelName}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.address}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.contact}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.email}</Td>
                    
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(data.ourCost)+Number(data.prf)).toFixed(2)}</Td>
                      </Tr>
                    ))}
                      </>}
              </Tbody>
            </Table>

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