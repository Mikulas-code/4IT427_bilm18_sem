import { useState } from "react";
import { useBirdList } from "../context/BirdListContext";
import { useNavigate, useParams } from "react-router-dom";
import { BirdDetailEditForm } from "../components/BirdDetailEditForm";

export function BirdDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    birds,
    isLoading,
    isError,
    updateBird,
  } = useBirdList();
  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-gray-400 p-8">Načítám...</p>;
  if (isError) return <p className="text-red-400 p-8">Chyba při načítání.</p>;

  const bird = birds.find((bird) => bird.id === id);
  if (!bird) return <p className="text-gray-400 p-8">Pták nenalezen.</p>;

  if (isEditing) {
    return (
      <>
        <h1>{bird.name} - Detail</h1>
        <BirdDetailEditForm
          bird={bird}
          onSave={updateBird}
          onClose={() => setIsEditing(false)}
        ></BirdDetailEditForm>
      </>
    );
  } else
    return (
      <main className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-green-400 mb-6 flex items-center gap-1"
        >
          ← Zpět na seznam
        </button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">{bird.name}</h1>
            <p className="text-gray-400 italic">{bird.latinName}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Upravit
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="text-gray-500 text-sm">Řád</p>
            <p>{bird.order}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Čeleď</p>
            <p>{bird.family}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Počet</p>
            <p>{bird.count}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Datum</p>
            <p>{bird.date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Souřadnice</p>
            <p>
              {bird.location.lat}, {bird.location.lng}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Stav</p>
            <p className={bird.seen ? "text-green-400" : "text-gray-400"}>
              {bird.seen ? "✓ Viděno" : "Neviděno"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Poznámky</p>
            <p>{bird.notes}</p>
          </div>
        </div>

        {isEditing && (
          <BirdDetailEditForm
            bird={bird}
            onSave={updateBird}
            onClose={() => setIsEditing(false)}
          />
        )}
      </main>
    );
}
