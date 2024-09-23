import { Request,Response } from "express";
import { AuthModel } from "./auth.model";
import jwt from "jsonwebtoken";

export const AuthLogin = async (req: Request, res: Response) => {
    console.log(req.body.formValues);
    try {
        const { email, password } = req.body.formValues;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }
        const user = await AuthModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT || 'defaultSecret',{expiresIn: '5h'});
        await user.updateOne({
            token:token
        });

        return res.status(200).json({
            token: token,
            user: user,
            status: "success",
            message: "Logged in successfully",
        });



    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export const AuthRegister = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }
        const user = await AuthModel.create(req.body);
        const token=jwt.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT || 'defaultsECRET',{expiresIn:'5H'});
        await user.updateOne({
            token:token
        
        })
        return res.status(200).json({
            user: user,
            status: "success",
            token: token
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const AuthLogOut = async (req: Request, res: Response) => {
    try {
      // Clear access token and refresh token
      res.clearCookie("accessToken", { path: "/" });
      res.clearCookie("refreshToken", { path: "/" });
  
      res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Failed to log out",
      });
    }
  };
  
