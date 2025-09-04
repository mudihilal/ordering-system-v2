import React, {useState} from 'react'
import Products from '../components/Products'
import Cart from '../components/Cart.jsx'
import { createOrder } from '../api'

export default function Home(){
  const [cart, setCart] = useState([])

  function handleAdd(product){
    setCart(prev=>{
      const existing = prev.find(p=> p.id===product.id)
      if(existing) return prev.map(p=> p.id===product.id ? {...p, quantity: p.quantity+1} : p)
      return [...prev, {...product, quantity:1}]
    })
  }

  function handleRemove(item){
    setCart(prev=> prev.filter(p=> p.id !== item.id))
  }

  async function handleCheckout(){
    if(cart.length===0) return alert('Cart is empty')
    const buyer_name = prompt('Enter your name')
    const buyer_email = prompt('Enter your email')
    if(!buyer_name || !buyer_email) return alert('Name and email required')

    const payload = {
      buyer_name,
      buyer_email,
      items: cart.map(it=>({product_id: it.id, quantity: it.quantity}))
    }

    try{
      const res = await createOrder(payload)
      alert('Order created. Status: pending. Order id: ' + res.data.id)
      setCart([])
    }catch(e){
      console.error(e)
      alert('Could not create order. See console for details')
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <div>
          <Products onAdd={handleAdd} />
        </div>
        <div>
          <Cart items={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  )
}
