import { BirdCard } from "../components/BirdCard";
import { useBirdList } from "../context/BirdListContext";
import { useState } from "react";
import { NewBirdForm } from "../components/NewBirdForm";
import { BirdFilterCard } from "../components/BirdFilterCard";
import { useBirdFilter } from "../hooks/useBirdFilter";

export function BirdListPage() {
  const { birds, isLoading, isError, addBird, removeBird, toggleSeen } =
    useBirdList();

  const {
    filteredBirds,
    search,
    filterFamily,
    filterOrder,
    setFilterFamily,
    setFilterOrder,
    filterDateFrom,
    filterDateTo,
    filterSeen,
    setFilterDateFrom,
    setFilterDateTo,
    setFilterSeen,
    uniqueFamilies,
    uniqueOrders,
    setSearch,
  } = useBirdFilter(birds);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Načítám...</p>;
  if (isError) return <p>Chyba při načítání.</p>;

  return (
    <main className="max-w-6xl mx-auto p-8">
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

      <input
        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 mb-4"
        placeholder="Hledat podle názvu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-6">
        <BirdFilterCard
          uniqueOrders={uniqueOrders}
          uniqueFamilies={uniqueFamilies}
          dateFrom={filterDateFrom}
          dateTo={filterDateTo}
          family={filterFamily}
          onChangeDateFrom={setFilterDateFrom}
          onChangeDateTo={setFilterDateTo}
          onChangeFamily={setFilterFamily}
          onChangeOrder={setFilterOrder}
          onChangeSeen={setFilterSeen}
          order={filterOrder}
          seen={filterSeen}
        ></BirdFilterCard>
        <div className="flex-1">
          {filteredBirds.map((bird) => (
            <BirdCard
              key={bird.id}
              {...bird}
              onRemove={removeBird}
              onToggleSeen={toggleSeen}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
