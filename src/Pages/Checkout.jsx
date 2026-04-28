import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout(){

  const [form,setForm]=useState({
    name:"",
    phone:"",
    address:""
  });

  const placeOrder = async ()=>{
    if(!form.name || !form.phone) return;

    await addDoc(collection(db,"orders"),{
      ...form,
      status:"new",
      time:Date.now()
    });

    alert("Order Confirmed!");
  };

  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
      <input placeholder="Address" onChange={e=>setForm({...form,address:e.target.value})}/>

      <button onClick={placeOrder}>
        Confirm Order
      </button>
    </div>
  );
}
