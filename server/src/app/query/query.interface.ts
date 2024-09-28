import mongoose from "mongoose";

export interface QueryInterface{
    _id:mongoose.Types.ObjectId;
    client:string;
    serviceType:string;
    PassengerNumber:number;
    DomesticOrInternational:string;
    OneWayOrRoundTrip:string;
    FromLocation:string;
    ToLocation:string;
    DepartureDate:string;
    returnDate:string;
    flightType:string;
    airlineName:string;
    flightNumber:string;
    fareType:string;
    departureFrom:string;
    departureTime:string;
    arrivalTo:string;
    arrivalTime:string;
    ourCost:number;
    prf:number;
    refundable:boolean;
    passengerName?:string;
    gender?:string;
    pnrNumber?:string;
    seatNumber?:string;
    class?:string;
    meal?:boolean;
    invoiceNumber?:string;
    vendorName?:string;
    status?:number;
    bookingDate?:string;
    city?:string;
    hotelName?:string;
    checkInDate?:string;
    checkOutDate?:string;
    noOfNights?:number;
    mealPlan?:string;
    hotelCategory?:string;
    roomOcuppency?:string;
    noOfRooms?:number;
    noOfGuests?:number;
    noOfAdults?:number;
    noOfChildren6?:number;
    noOfChildren12?:number;
    address?:string;
    contact?:string;
    email?:string;
    guestName?:string;
    bookconfirmNo?:string;
    price?:number;
    timestamp?:Date;
    cabExtraPerHours?:number,
    cabExtraKMS?:number,
    cabParkingetc?:number,
    cabBookingType?:string,
    cabNumber?:string,
    hotelImage?:string,
    cabGuestName?:string,
    cabMOBNO?:string,
    cabPickTime?:string,
    cabPickUpAddress?:string,
    cabDriverdetails?:string,
    cabName?:string, 
    cabPerKmsrate?:number,
    cabTollPermit?:number,
    cabTotalExtraHour?:number,
    cabTotalextraKms?:number,
    cabTotalkms?:number,
    cabGrosstotal?:number,
    stepFirst?:number,
    tripEndDateTime?:string,
    tripStartDateTime?:string,
    cabType?:string,
    totalPassenger?:number,
    duplicate?:any[];
    via:{
        FlightNumber:string;
        departureFrom:string;
        departureTime:string;
        arrivalTo:string;
        arrivalTime:string;
  
  
      }
      confirmed:any;
      returnFlight:any;

    


    

    
    
    
}