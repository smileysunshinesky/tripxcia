import { Request, Response } from "express";
import { QueryModel } from "./query.model";
import { ObjectId } from 'mongodb';

export const FlightQueryfirstStep =async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel ({
            client:req.body.client,
            serviceType:'Flight',
            PassengerNumber:req.body.PassengerNumber,
            DomesticOrInternational:req.body.DomesticOrInternational,
            OneWayOrRoundTrip:req.body.OneWayOrRoundTrip,
            DepartureDate:req.body.DepartureDate,
            returnDate:req.body.returnDate,
            flightType:req.body.flightType,
            departureFrom:req.body.departureFrom,
            arrivalTo:req.body.arrivalTo,
            stepFirst:1,
            bookingDate:formattedDate,
            status:0,
        });
        await query.save().then((result)=>{
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const FlightQuerySave=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        await QueryModel.findOneAndUpdate({_id:queryId},{
            FromLocation:req.body.FromLocation,
            ToLocation:req.body.ToLocation,
            flightType:req.body.flightType,
            airlineName:req.body.airlineName,
            flightNumber:req.body.flightNumber,
            fareType:req.body.fareType,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            refundable:req.body.refundable,
            bookingDate:formattedDate,
            duplicate:req.body.duplicate,
            via:req.body.via,
            stepFirst:2,
            status:0,
            returnFliight:req.body.returnFliight ?? {},
        }).then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const cabQueryfirstStep=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Cab',
            cabBookingType:req.body.cabBookingType,
            tripStartDateTime:req.body.tripStartDateTime,
            tripEndDateTime:req.body.tripEndDateTime,
            cabType:req.body.cabType,
            city:req.body.city,
            totalPassenger:req.body.totalPassenger,
            bookingDate:formattedDate,
            stepFirst:1,
            status:0,
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const cabQuerySave=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        await QueryModel.findOneAndUpdate({_id:queryId},{
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            city:req.body.city,
            bookingDate:formattedDate,
            cabExtraPerHours:req.body.cabExtraPerHours,
            cabExtraKMS:req.body.cabExtraKMS,
            cabParkingetc:req.body.cabParkingetc,
            cabPerKmsrate:req.body.cabPerKmsrate,
            cabTollPermit:req.body.cabTollPermit,
            duplicate:req.body.duplicate,
            stepFirst:2,
            status:0,
        }).then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQueryfirstStep=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = await new QueryModel({
            client:req.body.client,
            serviceType:'Hotel',
            city:req.body.city,
               DomesticOrInternational:req.body.DomesticOrInternational,
               hotelName:req.body.hotelName,
               checkInDate:req.body.checkInDate,
               checkOutDate:req.body.checkOutDate,
               noOfNights:req.body.noOfNights,
               mealPlan:req.body.mealPlan,
               hotelCategory:req.body.hotelCategory,
               roomOcuppency:req.body.roomOcuppency,
               noOfRooms:req.body.noOfRooms,
                noOfGuests:req.body.noOfGuests,
                noOfAdults:req.body.noOfAdults,
                noOfChildren6:req.body.noOfChildren6,
                noOfChildren12:req.body.noOfChildren12,
                bookingDate:formattedDate,
                stepFirst:1,
                status:0,
        });
        console.log(query)
        await query.save().then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQuery=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        await QueryModel.findOneAndUpdate({_id:queryId},{
                hotelName:req.body.hotelName,
                address:req.body.address,
                email:req.body.email,
                contact:req.body.contact,
                bookingDate:formattedDate,
                ourCost:req.body.ourCost,
                stepFirst:2,
                prf:req.body.prf,
                status:0,
        }).then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQueryDup=async(req:Request,res:Response)=>{
    try {
        const currentDate = new Date();
        const {id}=req.query;
        const formattedDate = currentDate.toISOString().split('T')[0];
       
        await QueryModel.findByIdAndUpdate(id,{
            status:0,
            duplicate:req.body.duplicate,
            timestamp:formattedDate,
            hotelName:req.body.hotelName,
            address:req.body.address,
            contact:req.body.contact,
            email:req.body.email,
            ourCost:req.body.ourCost,
            prf:req.body.prf,


        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const FlightQueryConfirmed = async (req: any, res: Response) => {
    console.log("queryConfirm");
  
    try {
      const queryId = req.params.id;
  
      if (!ObjectId.isValid(queryId)) {
        return res.status(400).json({ message: "Invalid query ID" });
      }
  
      const imageUrl = req.file?.path || '';  // URL of the uploaded image or empty string if not provided
      console.log(queryId);
  
      const updateData = {
        passengerName: req.body.passengerName,
        gender: req.body.gender,
        pnrNumber: req.body.pnrNumber,
        seatNumber: req.body.seatNumber,
        class: req.body.class,
        meal: req.body.meal,
        invoiceNumber: req.body.invoiceNumber,
        hotelImage: imageUrl, // Handle image URL properly
        vendorName: req.body.vendorName,
        confirmed: req.body.confirmedQuery,
        status: 1,
      };
  
      const result = await QueryModel.findOneAndUpdate(
        { _id: new ObjectId(queryId) }, // Ensure queryId is converted to ObjectId
        updateData,
        { new: true } // Return the updated document
      );
  
      if (!result) {
        return res.status(404).json({ message: "Query not found" });
      }
  
      console.log(result);
      return res.status(200).json({ message: "Query Saved Successfully", result });
  
    } catch (error) {
      console.error("Error updating query:", error);
      return res.status(500).json({ message: "An error occurred while saving the query", error });
    }
  };


export const CabQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        await QueryModel.findOneAndUpdate({_id:queryId},{
            cabGuestName:req.body.cabGuestName,
            cabMOBNO:req.body.cabMOBNO,
            cabPickTime:req.body.cabPickTime,
            cabPickUpAddress:req.body.cabPickUpAddress,
            cabDriverdetails:req.body.cabDriverdetails,
            cabName:req.body.cabName,
            invoiceNumber:req.body.invoiceNumber,
            vendorName:req.body.vendorName,
            cabTotalExtraHour:req.body.cabTotalExtraHour,
            cabTotalextraKms:req.body.cabTotalextraKms,
            cabTotalkms:req.body.cabTotalkms,
            cabGrosstotal:req.body.cabGrosstotal,
            confirmed:req.body.confirmedQuery,
            status:1,

        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const HotelQueryConfirmed=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        
        
        await QueryModel.findOneAndUpdate({_id:queryId,serviceType:'Hotel'},{
            ...req.body,
            contact:req.body.contact,
            email:req.body.email,
            guestName:req.body.guestName,
            bookconfirmNo:req.body.bookconfirmNo,
            ourCost:req.body.ourCost,
            prf:req.body.prf,
            address:req.body.address,
            confirmed:req.body.confirmedQuery,

            status:1,


        })
        .then((result)=>{
            console.log(result)
            return res.status(200).json({message:"Query Saved Successfully",result:result});
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({message:error});
        });
        

    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getFlightQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Flight"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

export const getCabQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Cab"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getHotelQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find({serviceType:"Hotel"}).sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const getAllQueries=async(req:Request,res:Response)=>{
    try {
        const queries=await QueryModel.find().sort({ timestamp: -1 });
        return res.status(200).json({message:"Queries fetched successfully",result:queries});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}


export const findQueryByID=async(req:Request,res:Response)=>{
    try {
        const queryId=req.params.id;
        const query=await QueryModel.findOne({_id:queryId});
        return res.status(200).json({message:"Query fetched successfully",result:query});
    } catch (error) {
        return res.status(500).json({message:error});
    }
}

