import { Router } from "express";
import { AuthLogin, AuthRegister, AuthLogOut } from "./auth.controller";


const app = Router();

app.post('/signIn', AuthLogin);
app.post('/register', AuthRegister);
app.post('/logout', AuthLogOut);


export {
    app as AuthRoutes
}