import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:6001/plants";

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setPlants(data);
        setIsLoading(false);
      });
  }, []);

  function onAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }
  function onChangeSearch(searchValue) {
    setSearch(searchValue);
  }

  const searchedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  function onChangePriceHandler(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return { ...plant, price: updatedPlant.price };
      } else {
        return { ...plant };
      }
    });
    setPlants(updatedPlants);
  }

  function onHandleDelete(plantId) {
    const newPlants = plants.filter((plant) => plant.id !== plantId);
    setPlants(newPlants);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search search={search} onChangeSearch={onChangeSearch} />
      {!isLoading && (
        <PlantList
          plants={searchedPlants}
          onChangePrice={onChangePriceHandler}
          onHandleDelete={onHandleDelete}
        />
      )}
    </main>
  );
}

export default PlantPage;
