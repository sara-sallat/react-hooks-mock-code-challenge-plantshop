import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onChangePrice, onHandleDelete }) {
  const plantCardsRender = plants.map((plant) => (
    <PlantCard
      key={plant.id}
      plant={plant}
      onChangePrice={onChangePrice}
      onHandleDelete={onHandleDelete}
    />
  ));
  return <ul className="cards">{plantCardsRender}</ul>;
}

export default PlantList;
