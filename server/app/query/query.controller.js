"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQueryByID = exports.getAllQueries = exports.getHotelQueries = exports.getCabQueries = exports.getFlightQueries = exports.HotelQueryConfirmed = exports.CabQueryConfirmed = exports.FlightQueryConfirmed = exports.HotelQueryDup = exports.HotelQuery = exports.HotelQueryfirstStep = exports.cabQuerySave = exports.cabQueryfirstStep = exports.FlightQuerySave = exports.FlightQueryfirstStep = void 0;
const query_model_1 = require("./query.model");
const { ObjectId } = require('mongodb');
const FlightQueryfirstStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = yield new query_model_1.QueryModel({
            client: req.body.client,
            serviceType: 'Flight',
            PassengerNumber: req.body.PassengerNumber,
            DomesticOrInternational: req.body.DomesticOrInternational,
            OneWayOrRoundTrip: req.body.OneWayOrRoundTrip,
            DepartureDate: req.body.DepartureDate,
            returnDate: req.body.returnDate,
            flightType: req.body.flightType,
            departureFrom: req.body.departureFrom,
            arrivalTo: req.body.arrivalTo,
            stepFirst: 1,
            bookingDate: formattedDate,
            status: 0,
        });
        console.log(query);
        yield query.save().then((result) => {
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.FlightQueryfirstStep = FlightQueryfirstStep;
const FlightQuerySave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const queryId = req.params.id;
        console.log(req.body);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        yield query_model_1.QueryModel.findOneAndUpdate({ _id: queryId }, {
            FromLocation: req.body.FromLocation,
            ToLocation: req.body.ToLocation,
            flightType: req.body.flightType,
            airlineName: req.body.airlineName,
            flightNumber: req.body.flightNumber,
            fareType: req.body.fareType,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            departureFrom: req.body.departureFrom,
            arrivalTo: req.body.arrivalTo,
            ourCost: req.body.ourCost,
            prf: req.body.prf,
            refundable: req.body.refundable,
            bookingDate: formattedDate,
            duplicate: req.body.duplicate,
            via: req.body.via,
            stepFirst: 2,
            status: 0,
            returnFlight: (_a = req.body.returnFlight) !== null && _a !== void 0 ? _a : {},
        }).then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.FlightQuerySave = FlightQuerySave;
const cabQueryfirstStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = yield new query_model_1.QueryModel({
            client: req.body.client,
            serviceType: 'Cab',
            cabBookingType: req.body.cabBookingType,
            tripStartDateTime: req.body.tripStartDateTime,
            tripEndDateTime: req.body.tripEndDateTime,
            cabType: req.body.cabType,
            city: req.body.city,
            totalPassenger: req.body.totalPassenger,
            bookingDate: formattedDate,
            stepFirst: 1,
            status: 0,
        });
        console.log(query);
        yield query.save().then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.cabQueryfirstStep = cabQueryfirstStep;
const cabQuerySave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        yield query_model_1.QueryModel.findOneAndUpdate({ _id: queryId }, {
            ourCost: req.body.ourCost,
            prf: req.body.prf,
            city: req.body.city,
            bookingDate: formattedDate,
            cabExtraPerHours: req.body.cabExtraPerHours,
            cabExtraKMS: req.body.cabExtraKMS,
            cabParkingetc: req.body.cabParkingetc,
            cabPerKmsrate: req.body.cabPerKmsrate,
            cabTollPermit: req.body.cabTollPermit,
            duplicate: req.body.duplicate,
            stepFirst: 2,
            status: 0,
        }).then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.cabQuerySave = cabQuerySave;
const HotelQueryfirstStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = yield new query_model_1.QueryModel({
            client: req.body.client,
            serviceType: 'Hotel',
            city: req.body.city,
            DomesticOrInternational: req.body.DomesticOrInternational,
            hotelName: req.body.hotelName,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            noOfNights: req.body.noOfNights,
            mealPlan: req.body.mealPlan,
            hotelCategory: req.body.hotelCategory,
            roomOcuppency: req.body.roomOcuppency,
            noOfRooms: req.body.noOfRooms,
            noOfGuests: req.body.noOfGuests,
            noOfAdults: req.body.noOfAdults,
            noOfChildren6: req.body.noOfChildren6,
            noOfChildren12: req.body.noOfChildren12,
            bookingDate: formattedDate,
            stepFirst: 1,
            status: 0,
        });
        console.log(query);
        yield query.save().then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.HotelQueryfirstStep = HotelQueryfirstStep;
const HotelQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        yield query_model_1.QueryModel.findOneAndUpdate({ _id: queryId }, {
            hotelName: req.body.hotelName,
            address: req.body.address,
            email: req.body.email,
            contact: req.body.contact,
            bookingDate: formattedDate,
            ourCost: req.body.ourCost,
            duplicate: req.body.duplicate,
            stepFirst: 2,
            prf: req.body.prf,
            status: 0,
        }).then((result) => {
            // const currentdata = query_model_1.QueryModel.find({_id: query})
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.HotelQuery = HotelQuery;
const HotelQueryDup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const { id } = req.query;
        const formattedDate = currentDate.toISOString().split('T')[0];
        yield query_model_1.QueryModel.findByIdAndUpdate(id, {
            status: 0,
            duplicate: req.body.duplicate,
            timestamp: formattedDate,
            hotelName: req.body.hotelName,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email,
            ourCost: req.body.ourCost,
            prf: req.body.prf,
        })
            .then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.HotelQueryDup = HotelQueryDup;
const FlightQueryConfirmed = async (req, res) => {
    try {
        const queryId = req.params.id;

        // Validate query ID
        if (!ObjectId.isValid(queryId)) {
            return res.status(400).json({ message: "Invalid query ID" });
        }

        const imageUrl = req.file ? req.file.path : ''; // URL of the uploaded image or empty string

        // Prepare update data
        const updateData = {
            passengerName: req.body.passengerName,
            gender: req.body.gender,
            pnrNumber: req.body.pnrNumber,
            seatNumber: req.body.seatNumber,
            class: req.body.class,
            meal: req.body.meal,
            invoiceNumber: req.body.invoiceNumber,
            hotelImage: imageUrl,
            vendorName: req.body.vendorName,
            confirmed: req.body.confirmedQuery,
            status: 1,
        };

        // Update the query
        const result = await QueryModel.findOneAndUpdate(
            { _id: new ObjectId(queryId) }, // Convert queryId to ObjectId
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

exports.FlightQueryConfirmed = FlightQueryConfirmed;
const CabQueryConfirmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        yield query_model_1.QueryModel.findOneAndUpdate({ _id: queryId }, {
            cabGuestName: req.body.cabGuestName,
            cabMOBNO: req.body.cabMOBNO,
            cabPickTime: req.body.cabPickTime,
            cabPickUpAddress: req.body.cabPickUpAddress,
            cabDriverdetails: req.body.cabDriverdetails,
            cabName: req.body.cabName,
            invoiceNumber: req.body.invoiceNumber,
            vendorName: req.body.vendorName,
            cabTotalExtraHour: req.body.cabTotalExtraHour,
            cabTotalextraKms: req.body.cabTotalextraKms,
            cabTotalkms: req.body.cabTotalkms,
            cabGrosstotal: req.body.cabGrosstotal,
            confirmed: req.body.confirmedQuery,
            status: 1,
        })
            .then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.CabQueryConfirmed = CabQueryConfirmed;
const HotelQueryConfirmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        yield query_model_1.QueryModel.findOneAndUpdate({ _id: queryId, serviceType: 'Hotel' }, Object.assign(Object.assign({}, req.body), { contact: req.body.contact, email: req.body.email, guestName: req.body.guestName, bookconfirmNo: req.body.bookconfirmNo, ourCost: req.body.ourCost, prf: req.body.prf, address: req.body.address, confirmed: req.body.confirmedQuery, status: 1 }))
            .then((result) => {
            console.log(result);
            return res.status(200).json({ message: "Query Saved Successfully", result: result });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: error });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.HotelQueryConfirmed = HotelQueryConfirmed;
const getFlightQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield query_model_1.QueryModel.find({ serviceType: "Flight" }).sort({ timestamp: -1 });
        return res.status(200).json({ message: "Queries fetched successfully", result: queries });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getFlightQueries = getFlightQueries;
const getCabQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield query_model_1.QueryModel.find({ serviceType: "Cab" }).sort({ timestamp: -1 });
        return res.status(200).json({ message: "Queries fetched successfully", result: queries });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getCabQueries = getCabQueries;
const getHotelQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield query_model_1.QueryModel.find({ serviceType: "Hotel" }).sort({ timestamp: -1 });
        return res.status(200).json({ message: "Queries fetched successfully", result: queries });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getHotelQueries = getHotelQueries;
const getAllQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield query_model_1.QueryModel.find().sort({ timestamp: -1 });
        return res.status(200).json({ message: "Queries fetched successfully", result: queries });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getAllQueries = getAllQueries;
const findQueryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        const query = yield query_model_1.QueryModel.findOne({ _id: queryId });
        return res.status(200).json({ message: "Query fetched successfully", result: query });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.findQueryByID = findQueryByID;
