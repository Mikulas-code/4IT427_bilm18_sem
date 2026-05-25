import { useState } from "react";
import { useBirdList } from "../context/BirdListContext";
import { useNavigate, useParams } from "react-router-dom";
import { BirdDetailEditForm } from "../components/BirdDetailEditForm";
import { BirdMap } from "../components/BirdMap";
import { BirdDetailCard } from "../components/BirdDetailCard";

export function BirdDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { birds, isLoading, isError, updateBird, removeBird, toggleSeen } = useBirdList();
  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-gray-400 p-8">Načítám...</p>;
  if (isError) return <p className="text-red-400 p-8">Chyba při načítání.</p>;

  const bird = birds.find((bird) => bird.id === id);
  if (!bird)
    return (
      <div>
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-green-400 mb-6 flex items-center gap-1"
        >
          ← Zpět na seznam
        </button>
        <p className="text-gray-400 p-8">Pták nenalezen.</p>;
      </div>
    );
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
        <BirdDetailCard bird={bird} onRemove={removeBird} onEdit={()=> setIsEditing(true)} onToggleSeen={toggleSeen}></BirdDetailCard>

        {isEditing && (
          <BirdDetailEditForm
            bird={bird}
            onSave={updateBird}
            onClose={() => setIsEditing(false)}
          />
        )}

        <BirdMap location={bird.location} name={bird.name}></BirdMap>
      </main>
    );
}
