import { BirdCard } from "./components/BirdCard";
import { useBirdList } from "./context/BirdListContext";

function App() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen} = useBirdList();

  return (
    <main>
      <h1>Seznam ptáků</h1>
        {birds.map((bird)=>(
          <BirdCard
           key={bird.id}
           id = {bird.id}
           name={bird.name}
           count={bird.count}
           date={bird.date}
           family={bird.family}
           latinName={bird.latinName}
           location={bird.location}
           notes={bird.notes}
           order={bird.order}
           seen={bird.seen}
           onRemove={()=> console.log("mazu")}
           onToggleSeen={()=> console.log("prepinam")}></BirdCard>
        ))}
    </main>
  );
}

export default App;
