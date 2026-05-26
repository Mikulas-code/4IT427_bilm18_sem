import { useNavigate } from "react-router-dom";
import { type Bird } from "../types/Bird";

interface BirdCardProps extends Bird {
  onToggleSeen: (id: string) => void;
  onRemove: (id: string) => void;
}

export function BirdCard({
  id,
  name,
  family,
  location,
  date,
  notes,
  seen,
  count,
  latinName,
  order,
  onToggleSeen,
  onRemove,
  imageURL,
}: BirdCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 hover:border-green-600 transition-colors"
      onClick={() => navigate(`/birds/${id}`)}
    >
      <div className="flex gap-4">
        {imageURL ? (
          <img
            src={imageURL}
            alt={name}
            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
            <img
              src="/bird-icon.svg"
              alt="placeholder"
              className="w-16 h-16 opacity-50"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-green-400">{name}</h2>
              <p className="text-gray-400 italic text-sm">{latinName}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${seen ? "bg-green-900 text-green-400" : "bg-gray-700 text-gray-400"}`}
            >
              {seen ? "✓ Viděno" : "Neviděno"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 text-sm text-gray-300 mb-4">
            <p>Řád: {order}</p>
            <p>Čeleď: {family}</p>
            <p>Počet: {count}</p>
            <p>
              Místo: {location.lat}, {location.lng}
            </p>
            <p>Datum: {date}</p>
            <p>Poznámky: {notes}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/birds/${id}`)}
              className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Detail
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSeen(id);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
            >
              Přepnout stav
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
              }}
              className="bg-red-900 hover:bg-red-800 text-white px-3 py-1 rounded text-sm ml-auto"
            >
              Smazat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
