import React from 'react'

export default function ProductCard({product, onAdd}){
  const {id, name, price, status, description} = product
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
        <h3 style={{margin:0}}>{name}</h3>
        <div className={`badge ${status}`}>{status}</div>
      </div>
      <p style={{marginTop:8}}>{description || 'No description'}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
        <strong>${parseFloat(price).toFixed(2)}</strong>
        <div>
          <button className="btn ghost" onClick={()=> onAdd(product)} disabled={status!=='available'}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
