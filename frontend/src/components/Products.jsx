import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'
import { fetchProducts } from '../api'

export default function Products({onAdd}){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    fetchProducts().then(res=>{
      if(mounted) setProducts(res.data)
    }).catch(err=>{
      console.error(err)
      alert('Could not fetch products from backend. Make sure backend is running on http://127.0.0.1:8000')
    }).finally(()=> setLoading(false))
    return ()=> mounted = false
  },[])

  if(loading) return <div className="card">Loading products...</div>

  return (
    <div className="grid">
      {products.map(p=> (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  )
}
