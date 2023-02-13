import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const {data,status} = useSelector(state=>{
    // console.log(state)
    return state.product;
  })

  useEffect(()=>{
    dispatch(fetchProducts())
    // fetchProducts();
  },[])

  // const fetchProducts  = async() => {
  //     let res = await fetch('https://fakestoreapi.com/products');
  //     res = await res.json();
  //     setProducts(res);
  //     console.log(res)
  // }

  const handleAdd = (product) => {
    dispatch(add(product));
  }

  //for loading animation
  if(status === STATUSES.LOADING)
  {
       return <h2>Loading...</h2>
  }

  //for err
  if(status === STATUSES.ERROR)
  {
       return <h2>Something went wrong...</h2>
  }

  return (
    <div className="productsWrapper">
        {
          data.map((item) => (
            <div className="card" key={item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                    <h5>{item.price}</h5>
                    <button onClick={() => handleAdd(item)} className="btn">
                        Add to cart
                    </button>
                </div>
          ))
        }
    </div>
  )
}

export default Products