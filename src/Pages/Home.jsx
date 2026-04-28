import { useState } from "react";

export default function Home(){

  const [cart,setCart]=useState([]);

  const products = [
    {id:1,name:"গেঞ্জি",price:690},
    {id:2,name:"শার্ট",price:990},
    {id:3,name:"প্যান্ট",price:1290}
  ];

  const addToCart = (p)=>{
    setCart([...cart,p]);
    alert("Added to cart");
  };

  return (
    <div style={{padding:20}}>
      <h1>🔥 Export Pro Shop</h1>

      {products.map(p=>(
        <div key={p.id} style={{border:"1px solid #ddd",margin:10,padding:10}}>
          <h3>{p.name}</h3>
          <p>৳{p.price}</p>
          <button onClick={()=>addToCart(p)}>🛒 Add to Cart</button>
        </div>
      ))}

      <a href="/checkout">Go Checkout</a>
    </div>
  );
}
