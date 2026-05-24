import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";
import { useState } from "react";
import { NewBirdForm } from "../components/NewBirdForm";
import type { Bird } from "../types/Bird";

export function BirdListPage() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen } =
    useBirdList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;

  return (
    <main>
      <h1>Seznam ptáků</h1>
      <button onClick={() => setIsModalOpen(true)}>Přidat ptáka</button>
      {isModalOpen && <NewBirdForm onClose={() => setIsModalOpen(false)} onAddBird={addBird} />}
      {birds.map((bird) => (
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
      ))}
    </main>
  );
}
