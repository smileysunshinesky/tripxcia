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

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuery } from '@/redux/actions/queryActions';

export default function HotelTable({ isOpen, onClose, data, handleSave, duplicate, viewbtn, totalHotal }) {
  const navigate = useNavigate();
  const copyToClipBoard = () => {
    let copyData = "";

    // Generate text for Main Data
    copyData += `Hotel Name: ${data?.hotelName}\n`;
    copyData += `Address: ${data?.address}\n`;
    copyData += `Contact: ${data?.contact}\n`;
    copyData += `Email: ${data?.email}\n`;
    copyData += `Total Cost: ₹ ${(Number(data?.ourCost) + Number(data?.prf)).toFixed(2)}\n`;
    copyData += `Fare Refundable/Non-refundable: ${data?.refundable ? 'Refundable' : 'Non-Refundable'}\n\n`;

    // Generate text for Duplicates
    if (duplicate && duplicate.length > 0) {
      duplicate.forEach((item, index) => {
        copyData += `Duplicate ${index + 1}:\n`;
        copyData += `Hotel Name: ${item.hotelName}\n`;
        copyData += `Address: ${item.address}\n`;
        copyData += `Contact: ${item.contact}\n`;
        copyData += `Email: ${item.email}\n`;
        copyData += `Total Cost: ₹ ${(Number(item.ourCost) + Number(item.prf)).toFixed(2)}\n\n`;
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
              </Tbody>
            </Table>

            {(duplicate && totalHotal > 0) || (duplicate && viewbtn) && (
              <>
                {duplicate.length > 0 && duplicate.map((item, index) => (
                  <Table variant='simple'>
                    <Tbody>
                      <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Hotel Name</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Address</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Contact</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Email</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                      </Tr>
                      <Tr key={index} gap={0}>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.hotelName}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.address}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.contact}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.email}</Td>
                        <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(data.ourCost) + Number(data.prf)).toFixed(2)}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ))}
              </>
            )}


          </ModalBody>

          <ModalFooter>
            {viewbtn && (
              <Typography className='mb-0' style={{alignContent: 'center'}}>
                <Button colorScheme='blue'
                    onClick={() => {
                      dispatch(setQuery({
                          type: 'Hotel',
                          query: data.hotelName,
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
             </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}