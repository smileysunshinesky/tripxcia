import { useGlobalData } from "@/hooks/GlobalData";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions/authActions";
export function SignIn() {

  const dispatch = useDispatch();

  const {AuthLogin}=useGlobalData();
  const [data,setdata]=useState({
    email:'',
    password:''
  });
  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      dispatch(LoginUser(data));
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <section className="m-8 flex gap-4 max-h-[100vh] ">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <div  className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              value={data.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              name="email"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              value={data.password}
              name="password"
              onChange={handleChange}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
         
          
          <Button onClick={async() => onSubmit(data)} className="mt-6" fullWidth>
            Sign In
          </Button>

          
        
        
        </div>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
