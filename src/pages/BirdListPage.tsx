import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";

export function BirdListPage() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen } =
    useBirdList();

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;

  return (
    <main>
      <h1>Seznam ptáků</h1>
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
