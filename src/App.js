import "./App.css";

import { useState, useEffect } from "react";

// 4 - custom hooks

import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([]);
  
  // 4 - custom hooks
  const {data: items, httpConfig, loading, error} = useFetch(url);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  

  // 1 - resgatando dados
  // useEffect(() => { //Não funcionou com o async aqui
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   }

  //     fetchData();
  // }, []); //Não há dependencias

    // 2 - adição de produtos

    const handleSubmit = async (e) => {//função que vai receber um evento (e)
      e.preventDefault()

      const product = {
        name,
        price,
      };
    
      // const res = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(product)
      // });
      

      // // 3 - carregamento dinâmico

      // const addedProduct = await res.json()

      // setProducts((prevProducts) => [...prevProducts, addedProduct]);

      // 5 - Refatorando POST
      httpConfig(product, "POST");
      setName("");
      setPrice("");
    };
  

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando Dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome: 
            <input type="text" 
            value={name} 
            name="name" 
            onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço: 
            <input type="number" 
            value={price} 
            name="price" 
            onChange={(e) => setPrice(e.target.value)} />
          </label>
          { /* 7 - state de loading no POST*/}
          {loading && <input type="submit" disabled value= "Aguarde" />}
          {!loading && <input type="submit" value= "Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
