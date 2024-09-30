import React from 'react'
import './invoice.css';
import { useGlobalData } from '@/hooks/GlobalData';
import { useParams, useRoutes } from 'react-router-dom';
import { toWords } from 'number-to-words';
import { Button, styled } from '@chakra-ui/react';
import { useReactToPrint } from 'react-to-print';
export default function Invoice() {
    const queryID=useParams().id;
    const {fetchFlightQueryById,vendors}=useGlobalData();
    const data=fetchFlightQueryById(queryID);
    const targetRef=React.useRef(null);
    const handlePrint=useReactToPrint({
        content:()=>targetRef.current
    })

  return (
   <>
<div className='w-full h-max flex justify-center items-center '>
{data && (
    <>
    <style >{`
    .invoice {
    padding: 8px;
    font-size: 17px;
    width: 50% !important;
}
* {
    padding: 0px;
    margin: 0px;
}
table {
    border: 3px solid black;
    color: black;
}
table .img-trip {
    padding-top: 10px;
    max-width: 150px;
    height: auto;
}
body {
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
#table2 {
    border-top: 0px;
    padding-top: 15px;
}
.table3 {
    border-top: 0px;
    padding-top: 15px;
    border-collapse: collapse;
}
.table3 th,
.table3 td {
    border: 1px solid #000;
    border-top: 0px;
    padding: 8px;
}
.table4 {
    border-top: 0px;
    padding-bottom: 20px;
}
.line {
    padding-top: 30px;
}
@media print {
    @page {
        size: "A4" !important;
        margin: 5 !important;
        padding:5px !important;
    }
    .container {
        width: 100% !important;
    }
    #printButton {
        display: none;
    }
}
`}</style>

     <div style={{
        padding:10
     }} ref={targetRef}>
    <div className="invoice"></div>
    <table width="98%" align="center">
        <tbody><tr>
            <td colSpan={2}><h1>Tripxcia Trips LLP</h1></td>
            <td rowSpan={5}><img className="img-trip" src="https://cdn.durable.co/blocks/25Kh43IltNsfqC64MMri5Ug3o16Jw88prgnzyLsk8SQQJJwsGBw9S1X7jCS7vz2S.png" alt="Tripxcia" width="150px" height="150px"/></td>
        </tr>
        <tr>
            <td colSpan={2}>27, Alpha Bazar, 100ft Road</td>
        </tr>
        <tr>
            <td colSpan={2}>Prahalad Nagar, Satellite, Ahmedabad- 380015</td>
        </tr>
        <tr>
            <td colSpan={2}>Mob - 63524 28105</td>
        </tr>
        <tr>
            <td colSpan={2}>E Mail - hello@tripxcia.com</td>
        </tr>
        <tr>
            <td colSpan={2}>PAN-AAVFT7170R | GSTN-245767AR34</td>
        </tr>
    </tbody></table>
<table id="table2" width="98%" align="center">
    <tbody><tr><td>Bill To</td> <td>Invoice No - {data?._id}</td></tr>
    <tr><td>{vendors.find(a=>a.name===data?.vendorName)?.name ?? ''}</td><td>Date - {(new Date).getDay()+'/'+(new Date).getMonth()+'/'+(new Date).getFullYear()}</td></tr>
    <tr><td></td></tr>
    <tr><td>GST No - {vendors.find(a=>a.name===data?.vendorName)?.gstinNumber ?? ''}</td></tr>

</tbody></table>
<table className="table3" width="98%" align="center">
<tbody>
    <tr>
    <th>Description</th>
    <th>Amount</th>
</tr>
<tr>
    <td>
       
    
   
       {
        data.serviceType==='Flight' ? (
            <>
             <p>
            All Tickets (Including Application Flight Taxes
            Collected on behalf of <br></br> Airline and other Ancillary Charges)
        </p> <br></br>
           {
            data.OneWayOrRoundTrip=='Round Way' ?
            (
                <>
                
                  <h3>Onward</h3>
             <p> Flight No - {data?.flightNumber}</p>
            <p>From - {data?.departureFrom}</p>
            <p>To - {data?.arrivalTo}</p>
            <p>Date - {data?.bookingDate}</p>
            <p>Departure - {data?.departure}</p>
            <p>Arrival - {data?.arrival}</p>
            <h3>Return</h3>
             <p> Flight No - {data?.returnFlight?.flightNumber}</p>
            <p>From - {data?.returnFlight?.departureFrom}</p>
            <p>To - {data?.returnFlight?.arrivalTo}</p>
            <p>Date - {}</p>
            <p>Departure - {data?.returnFlight?.departureTime}</p>
            <p>Arrival - {data?.returnFlight?.arrivalTime}</p>
                </>
            )
            :(
                <>
  <h3>Onward</h3>
             <p> Flight No - {data?.flightNumber}</p>
            <p>From - {data?.departureFrom}</p>
            <p>To - {data?.arrivalTo}</p>
            <p>Date - {data?.bookingDate}</p>
            <p>Departure - {data?.departureTime}</p>
            <p>Arrival - {data?.arrivalTime}</p>
                </>
            )
           }
            </>
        )
        :
        data?.serviceType==='Hotel' ?(
           <>
              <p>Check In - {data?.checkInDate}</p>
                <p>Check Out - {data?.checkOutDate}</p>
                <p>{data?.hotelCategory}</p>
                {/* <p>{data?.checkOutDate-data?.checkInDate} days</p> */}

           
           </>
        )
        :data?.serviceType ==='Cab'?(
            <>
            <p>Vehical Type - {data?.cabType}</p>
                <p>Booking Date - {data?.bookingDate }</p>
                <p>Location - {data?.city}</p>
                <br /><br />
                <p>(Including Driver Allowance/Toll /Parking)</p>
            </>
        ):
        (
            <></>
        )


    }

    
        <h4 style={{ float: 'right' }}> </h4><br></br>


        <h4 style={{ float: 'right' }}>Management Fee</h4><br></br>
        {
            data?.serviceType==='Cab' ||  data?.serviceType==='Hotel'?(<>
            <h4 style={{ float: 'right' }}>CGST 2.5%</h4><br></br>
            <h4 style={{ float: 'right' }}>SGST 2.5%</h4>   
            </>):
            (<>
                <h4 style={{ float: 'right' }}>CGST 9%</h4><br></br>
                <h4 style={{ float: 'right' }}>SGST 9%</h4>   </>)
            
        } 

 </td>
        <td align="right">{(Number(data?.ourCost)).toFixed(2)}<br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
                                                            <p style={{ textAlign: 'right', marginTop: `${data?.serviceType==='Hotel'?'-70px':data?.serviceType==='Cab'?'-10px':'70px'}` }}>
                                                                {Number(data?.prf).toFixed(2)}
                
                </p>
                {
            data?.serviceType==='Cab' ||  data?.serviceType==='Hotel'?(<>
            <p style={{
                    textAlign: 'right', marginTop: '0px'    
                }}>
                {Number(data?.prf * 0.025).toFixed(2)}
                </p>
                <p style={{
                    textAlign: 'right', marginTop: '0px'    
                }}>
                {Number(data?.prf * 0.025).toFixed(2)}
                </p></>):(<>
                    <p style={{
                    textAlign: 'right', marginTop: '0px'    
                }}>
                {Number(data?.prf * 0.09).toFixed(2)}
                </p>
                <p style={{
                    textAlign: 'right', marginTop: '0px'    
                }}>
                {Number(data?.prf * 0.09).toFixed(2)}
                </p></>)
                
                }
            <p style={{ textAlign: 'right', marginTop: '0px' }}>
            <br></br>
             </p>
            <p style={{ textAlign: 'right', marginTop: '0px' }}>
               
            </p>
        
    </td>
</tr>
<tr>
    <td align="center"><h3>Total Amount</h3></td>
    {
        data?.serviceType==='Cab' ||  data?.serviceType==='Hotel'?(<>
        <td align="right"><h3>{((Number(data?.ourCost)+Number(data?.prf)) + ((data?.prf * 0.05)*2)).toFixed(2)}</h3></td>
        </>):(<>
            <td align="right"><h3>{((Number(data?.ourCost)+Number(data?.prf)) + ((data?.prf * 0.18)*2)).toFixed(2)}</h3></td>
            </>)
    }
</tr>
<tr>
{
        data?.serviceType==='Cab'||  data?.serviceType==='Hotel'?(<>
        <td><h4>Amount in words - {toWords(((Number(data?.ourCost)+Number(data?.prf)) + ((data?.prf * 0.025)*2)).toFixed(2))} Only</h4></td>
        </>):(<>
            <td><h4>Amount in words - {toWords(((Number(data?.ourCost)+Number(data?.prf)) + ((data?.prf * 0.18)*2)).toFixed(2))} Only</h4></td>
            </>)
    }
</tr>
</tbody>
</table>
<table className="table4" width="98%" align="center">
<tbody><tr>

    <td># All Cheques should drawn in favour of "Tripxcia Trips LLP"</td>
    <td>Bank Name - Kotak Mahindra</td>
</tr>
<tr>
    <td># Payment within Due Date otherwise 21% Per Annum interest will be charged</td>
    <td>A/c No - 6049380547</td>
</tr>
<tr>
    <td># Subject to Ahmedabad Jurisdiction</td>
    <td>IFSC Code - KKBK0002563</td>
</tr>
<tr>
    <td># Errors and Omissions Excepted</td>
    <td>Branch - Odhav Ring Road, Ahmedabad</td>
</tr>
<tr>
    <td>Computerized invoice, stamp and sign are not required</td>
    <td>Payment by UPI ID - tripxcia@kotak</td>
</tr>
</tbody>
</table>
</div>
    </>
   )}

</div>
   <div className='w-full h-max flex justify-center items-center '>
    <Button id="printButton" onClick={handlePrint} className='w-1/4' colorScheme='blue'>Print</Button>
   </div>
   </>
  )
}
