import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";
import { useState } from "react";
import { NewBirdForm } from "../components/NewBirdForm";

export function BirdListPage() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen } =
    useBirdList();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-500">Seznam ptáků</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Přidat ptáka
        </button>
      </div>
      {isModalOpen && (
        <NewBirdForm
          onClose={() => setIsModalOpen(false)}
          onAddBird={addBird}
        />
      )}
      {birds.map((bird) => (
        <BirdCard
          key={bird.id}
          {...bird}
          onRemove={removeBird}
          onToggleSeen={toggleSeen}
        />
      ))}
    </main>
  );
}
