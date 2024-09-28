import { useGlobalData } from "@/hooks/GlobalData";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

export function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    try {
      dispatch(LoginUser(data));
      navigate("/dashboard/home");
    } catch (error) {
      console.error("Error during signIn: ", error);
      // Optionally show some error message in UI
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
