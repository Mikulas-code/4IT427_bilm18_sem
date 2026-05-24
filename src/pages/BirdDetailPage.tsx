import { useState } from "react";
import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";
import { useParams } from "react-router-dom";
import { BirdDetailEditForm } from "../components/BirdDetailEditForm";

export function BirdDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen, updateBird } =
    useBirdList();
    const { id } = useParams();

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;
  
  const bird = birds.find((bird) => bird.id === id);
  if (!bird) return <p>Pták nenalezen.</p>;

  if (isEditing){
    return(
      <>
      <h1>{bird.name} - Detail</h1>
      <BirdDetailEditForm bird={bird} onSave={updateBird} onClose={()=> setIsEditing(false)}></BirdDetailEditForm>
      </>
    );
  }
  else return(
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
        <button onClick={()=> setIsEditing(true)}>Upravit</button>
    </>
  )
}
