"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRoutes = void 0;
const express_1 = require("express");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const query_controller_1 = require("./query.controller");
const app = (0, express_1.Router)();
exports.QueryRoutes = app;
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'uploads', // Folder in Cloudinary where images will be uploaded
//       allowedFormats: ['jpg', 'png', 'jpeg'],
//     },
//   });
// const upload = multer({ storage: storage });
//flight all crud
app.post('/flight/firststep', query_controller_1.FlightQueryfirstStep);
app.put("/flight/save/:id", query_controller_1.FlightQuerySave);
app.get("/flight/list", query_controller_1.getFlightQueries);
app.put("/flight/confirm/:id", query_controller_1.FlightQueryConfirmed);
app.get('/', query_controller_1.getAllQueries);
// hotel all crud
app.post('/hotel/firststep', query_controller_1.HotelQueryfirstStep);
app.put('/hotel/save/:id', query_controller_1.HotelQuery);
app.get('/hotel/list', query_controller_1.getHotelQueries);
app.get('/:id', query_controller_1.findQueryByID);
app.put('/hotel/confirm/:id', query_controller_1.HotelQueryConfirmed);
app.put('/hotel/dup/', query_controller_1.HotelQueryDup);
//cab all crud
app.post('/cab/firststep', query_controller_1.cabQueryfirstStep);
app.put('/cab/save/:id', query_controller_1.cabQuerySave);
app.get("/cab/list", query_controller_1.getCabQueries);
app.put("/cab/confirm/:id", query_controller_1.CabQueryConfirmed);
// Compare this snippet from server/src/app/query/query.model.ts:`
