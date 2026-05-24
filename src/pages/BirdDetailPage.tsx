import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";
import { useParams } from "react-router-dom";

export function BirdDetailPage() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen } =
    useBirdList();
    const { id } = useParams();

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;
  
  const bird = birds.find((bird) => bird.id === id);
  if (!bird) return <p>Pták nenalezen.</p>;


  return(
    <>
    <h1>{bird.name} - Detail</h1>
    <BirdCard
          key={bird.id}
          id={bird.id}
          name={bird.name}
          count={bird.count}
          date={bird.date}
          family={bird.family}
          latinName={bird.latinName}
          location={bird.location}
          notes={bird.notes}
          order={bird.order}
          seen={bird.seen}
          onRemove={removeBird}
          onToggleSeen={toggleSeen}
        ></BirdCard>

    
    </>
  )
}
