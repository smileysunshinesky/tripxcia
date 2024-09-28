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
exports.getVendorById = exports.DeleteVendor = exports.UpdateVendor = exports.getVendors = exports.createVendor = void 0;
const vendor_model_1 = require("./vendor.model");
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_model_1.VendorModel.create(req.body);
        return res.status(201).send(vendor);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.createVendor = createVendor;
const getVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_model_1.VendorModel.find().lean().exec();
        return res.status(200).send(vendors);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getVendors = getVendors;
const UpdateVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_model_1.VendorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(vendor);
    }
    catch (err) {
        return res.status(500).send;
    }
});
exports.UpdateVendor = UpdateVendor;
const DeleteVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield vendor_model_1.VendorModel.findByIdAndDelete(req.params.id);
        return res.status(200).send('Vendor Deleted Successfully');
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.DeleteVendor = DeleteVendor;
const getVendorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_model_1.VendorModel.findById(req.params.id).lean().exec();
        return res.status(200).send(vendor);
    }
    catch (err) {
        return res.status(500).send;
    }
});
exports.getVendorById = getVendorById;
