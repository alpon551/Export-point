import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Admin(){

  const [orders,setOrders]=useState([]);

  const load = async ()=>{
    const snap = await getDocs(collection(db,"orders"));
    setOrders(snap.docs.map(d=>({id:d.id,...d.data()})));
  };

  useEffect(()=>{load();},[]);

  const remove = async (id)=>{
    await deleteDoc(doc(db,"orders",id));
    load();
  };

  const done = async (id)=>{
    await updateDoc(doc(db,"orders",id),{
      status:"delivered"
    });
    load();
  };

  return (
    <div style={{padding:20}}>
      <h1>Admin Panel</h1>

      {orders.map(o=>(
        <div key={o.id} style={{border:"1px solid gray",margin:10,padding:10}}>
          <p>{o.name} | {o.phone}</p>
          <p>{o.address}</p>
          <p>Status: {o.status}</p>

          <button onClick={()=>done(o.id)}>✔ Delivered</button>
          <button onClick={()=>remove(o.id)}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
}
