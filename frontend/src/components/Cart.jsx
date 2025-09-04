import React from 'react'

export default function Cart({items, onRemove, onCheckout}){
  const total = items.reduce((s,i)=> s + i.price * i.quantity, 0)
  return (
    <div className="card" style={{marginTop:16}}>
      <h3>Cart</h3>
      {items.length===0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {items.map((it, idx)=> (
            <div key={idx} style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
              <div>
                <div style={{fontWeight:700}}>{it.name}</div>
                <div style={{fontSize:13}}>x{it.quantity} • ${parseFloat(it.price).toFixed(2)}</div>
              </div>
              <div>
                <button className="btn ghost" onClick={()=> onRemove(it)}>Remove</button>
              </div>
            </div>
          ))}

          <hr />
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <strong>Total: ${total.toFixed(2)}</strong>
            <button className="btn primary" onClick={onCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
