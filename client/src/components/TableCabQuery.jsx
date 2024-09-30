import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

const TableCabQuery = ({ isOpen, onClose, data, handleSave, duplicate, isT, viewbtn, totalCabBooking }) => {

  const [isTable, setIsTable] = useState(isT ? isT : false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const copyToClipBoard = () => {
    let copyData = "";
  
    // Helper function to generate text for each quotation
    const generateQuotationText = (quotation, index) => {
      let text = `Quotation ${index + 1}\n`;
      text += `Cab Booking Type: ${quotation.cabBookingType}\n`;
      text += `Client Name: ${quotation.client}\n`;
      text += `City: ${quotation.city}\n`;
      text += `Total Cost: ₹ ${(Number(quotation.ourCost) + Number(quotation.prf)).toFixed(2)}\n`;
      text += `Fare Refundable/Non-refundable: ${quotation.refundable ? 'Refundable' : 'Non-Refundable'}\n\n`;
      return text;
    };
  
    // Generate text for Main Data
    copyData += generateQuotationText(data, 0);
  
    // Generate text for Duplicates
    if (duplicate && duplicate.length > 0) {
      duplicate.forEach((item, index) => {
        copyData += generateQuotationText(item, index + 1);
      });
    }
  
    // Copy the compiled text to the clipboard
    window.navigator.clipboard.writeText(copyData)
      .then(() => {
        console.log('Copied to clipboard successfully!');
        handleSave();
        onClose();
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };
  
  

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        navigate('/dashboard/quota-cab')
      }} size={'5xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Submitted Successfully</ModalHeader>

          <ModalCloseButton onClick={copyToClipBoard} />
          <ModalBody id="table-content">
            <Table variant='simple'>
              <Tbody>
                <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Cab Booking Type</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Client Name</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>City</Td>
                  <Td borderRightColor={'white'} borderRightWidth={0.5}>Our Cost</Td>
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

            {(duplicate && totalCabBooking > 0) || (duplicate && viewbtn) && (
              <>
                {duplicate.length > 0 && duplicate.map((item, index) => (
                  <Table variant='simple' key={index}>
                    <Tbody>
                      <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Cab Booking Type</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Client Name</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>City</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Our Cost</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                      </Tr>
                      <Tr gap={0}>
                        <Td>{item.cabBookingType}</Td>
                        <Td>{item.tripStartDateTime}</Td>
                        <Td>{item.tripEndDateTime}</Td>
                        <Td>{item.ourCost}</Td>
                        <Td>₹ {(Number(data.ourCost) + Number(data.prf)).toFixed(2)}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ))}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {viewbtn && (
              <Typography className='mb-0' style={{ alignContent: 'center' }}>
                <Button colorScheme='blue'
                  onClick={() => {
                    dispatch(setQuery({
                      type: 'Cab',
                      query: data.cabBookingType,
                    }))
                    navigate('/dashboard/query-confirm/' + data?._id)
                  }}
                >
                  Confirm
                </Button>
                <Button colorScheme='blue' className='ml-2' onClick={onClose}>Decline</Button>
                <Button colorScheme='blue' className='ml-2' onClick={onClose}>Request more</Button>
              </Typography>
            )}
            {!viewbtn && (
              <Button className='ml-2' colorScheme='blue' mr={3} onClick={copyToClipBoard}>
                Copy to Clipboard
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TableCabQuery;
