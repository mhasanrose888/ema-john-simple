import { useForm } from "react-hook-form";
import './Shipment.css';
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Shipment () {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log('Form Submitted',data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input value={loggedInUser.name} {...register("firstName", { required: true })} placeholder="Name" />
      {errors.firstName && <span className="error">First Name is required</span>}
      <input value={loggedInUser.email}{...register("email", { required: true })} placeholder="Enter Your Email"/>
      {errors.email && <span className="error">Last Name is required</span>}
      <select {...register("gender")}>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <input {...register("address", { required: true })} placeholder="Address"/>
      {errors.address && <span className="error">Address is required</span>}
      <input {...register("city", { required: true })} placeholder="City"/>
      {errors.city && <span className="error">City is required</span>}
      <input {...register("country", { required: true })} placeholder="Country"/>
      {errors.country && <span className="error">Country is required</span>}
      <input {...register("phone", { required: true })} placeholder="Phone Number"/>
      {errors.phone && <span className="error">Phone is required</span>}
    
      <input type="submit" />
    </form>
  );
}