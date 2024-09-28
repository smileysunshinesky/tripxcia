"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const QuerySchema = new mongoose_1.default.Schema({
    client: { type: String, required: false },
    serviceType: { type: String, required: false },
    PassengerNumber: { type: Number, required: false },
    DomesticOrInternational: { type: String, required: false },
    OneWayOrRoundTrip: { type: String, required: false },
    FromLocation: { type: String, required: false },
    ToLocation: { type: String, required: false },
    DepartureDate: { type: String, required: false },
    returnDate: { type: String, required: false },
    flightType: { type: String, required: false },
    airlineName: { type: String, required: false },
    flightNumber: { type: String, required: false },
    fareType: { type: String, required: false },
    departureFrom: { type: String, required: false },
    departureTime: { type: String, required: false },
    tripEndDateTime: { type: String, required: false },
    tripStartDateTime: { type: String, required: false },
    arrivalTo: { type: String, required: false },
    arrivalTime: { type: String, required: false },
    ourCost: { type: Number, required: false },
    prf: { type: Number, required: false },
    refundable: { type: Boolean, required: false },
    passengerName: { type: String, required: false },
    gender: { type: String, required: false },
    pnrNumber: { type: String, required: false },
    seatNumber: { type: String, required: false },
    class: { type: String, required: false },
    meal: { type: Boolean, required: false },
    invoiceNumber: { type: String, required: false },
    vendorName: { type: String, required: false },
    status: { type: Number, required: false },
    bookingDate: { type: String, required: false },
    city: { type: String, required: false },
    hotelName: { type: String, required: false },
    checkInDate: { type: String, required: false },
    checkOutDate: { type: String, required: false },
    noOfNights: { type: Number, required: false },
    mealPlan: { type: String, required: false },
    hotelCategory: { type: String, required: false },
    roomOcuppency: { type: String, required: false },
    noOfRooms: { type: Number, required: false },
    noOfGuests: { type: Number, required: false },
    noOfAdults: { type: Number, required: false },
    noOfChildren6: { type: Number, required: false },
    noOfChildren12: { type: Number, required: false },
    address: { type: String, required: false },
    contact: { type: String, required: false },
    email: { type: String, required: false },
    hotelImage: { type: String, required: false },
    guestName: { type: String, required: false },
    bookconfirmNo: { type: String, required: false },
    price: { type: Number, required: false },
    timestamp: { type: Date, required: false, default: Date.now() },
    cabExtraPerHours: { type: Number, required: false },
    cabExtraKMS: { type: Number, required: false },
    cabParkingetc: { type: Number, required: false },
    cabBookingType: { type: String, required: false },
    cabNumber: { type: String, required: false },
    cabGuestName: { type: String, required: false },
    cabMOBNO: { type: String, required: false },
    cabPickTime: { type: String, required: false },
    cabPickUpAddress: { type: String, required: false },
    cabDriverdetails: { type: String, required: false },
    cabName: { type: String, required: false },
    cabType: { type: String, required: false },
    cabPerKmsrate: { type: Number, required: false },
    cabTollPermit: { type: Number, required: false },
    cabTotalExtraHour: { type: Number, required: false },
    cabTotalextraKms: { type: Number, required: false },
    cabTotalkms: { type: Number, required: false },
    cabGrosstotal: { type: Number, required: false },
    totalPassenger: { type: Number, required: false },
    stepFirst: { type: Number, required: false },
    duplicate: [
        {
            type: mongoose_1.Schema.Types.Mixed,
            required: false
        }
    ],
    via: {
        FlightNumber: { type: String, required: false },
        departureFrom: { type: String, required: false },
        departureTime: { type: String, required: false },
        arrivalTo: { type: String, required: false },
        arrivalTime: { type: String, required: false },
    },
    confirmed: { type: mongoose_1.Schema.Types.Mixed, required: false },
    returnFlight: { type: mongoose_1.Schema.Types.Mixed, required: false },
});
exports.QueryModel = mongoose_1.default.model('Query', QuerySchema);
