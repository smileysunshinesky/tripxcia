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
exports.UpdateClient = exports.DeleteClient = exports.getClients = exports.createClient = void 0;
const clients_model_1 = require("./clients.model");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new clients_model_1.ClientModel(req.body);
        yield client.save();
        res.status(201).send(client);
    }
    catch (error) {
        res
            .status(500)
            .send({ message: "Error in creating client" });
    }
});
exports.createClient = createClient;
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield clients_model_1.ClientModel.find({});
        res.status(200).json({
            result: clients,
        });
    }
    catch (error) {
        res.status(500).send({ message: "Error in fetching clients" });
    }
});
exports.getClients = getClients;
const DeleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield clients_model_1.ClientModel.findByIdAndDelete(req.params.id);
        if (client) {
            return res.status(200).send("The client is deleted");
        }
        res.status(404).send("Client not found");
    }
    catch (error) {
        res.status(500).send({ message: "Error in deleting client" });
    }
});
exports.DeleteClient = DeleteClient;
const UpdateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield clients_model_1.ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (client) {
            return res.status(200).send(client);
        }
        res.status(404).send("Client not found");
    }
    catch (error) {
        res.status(500).send({ message: "Error in updating client" });
    }
});
exports.UpdateClient = UpdateClient;
