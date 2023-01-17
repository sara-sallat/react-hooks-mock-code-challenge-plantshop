import { useState } from "react";

function PlantCard({ plant, onChangePrice, onHandleDelete }) {
  const [inStock, setInStock] = useState(true);
  const [changePrice, setChangePrice] = useState(false);
  const { id, name, image, price } = plant;

  function clickPriceHandler() {
    setChangePrice(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseInt(event.target[0].value) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onChangePrice(updatedPlant);
      })
      .then(setChangePrice(false));
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        onHandleDelete(id);
      });
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button
          className="primary"
          onClick={() => {
            setInStock(false);
          }}
        >
          In Stock
        </button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button className="editPrice" onClick={clickPriceHandler}>
        Edit Price
      </button>

      {changePrice && (
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input type="number" placeholder="Change Price" />
          <button className="editPrice">Submit</button>
          <button
            className="editPrice"
            onClick={() => {
              setChangePrice(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <button onClick={handleDelete}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;