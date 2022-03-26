import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import  ProgressBar from "./ProgressBar";
import  Filter from "./Filter";

export default function Home({username, id}) {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getProducts(username, filter).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    })
  }, [reload, filter]);

  return (
    <>
      {products.length == 0 ? 
        <h1><center>Add Some Meals</center></h1> 
        : 
        <div className="jumbotron">
          <h1 className="text-center">Calorie Intake</h1>
          <ProgressBar reload={reload} setReload={setReload} />
        </div>
      }

      {products.length == 0 ? 
        <h1></h1> 
        : 
        <div>
        <Filter filter={filter} setFilter={setFilter}/>
      </div>
      }

      

      <div className="row text-center">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card 
                  key={index}
                  product={product} 
                  id={id}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
