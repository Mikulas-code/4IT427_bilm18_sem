import { useNavigate } from "react-router-dom";
import type { Bird } from "../types/Bird";

interface BirdDetailCardProps {
  bird: Bird;
  onEdit: () => void;
  onToggleSeen: (id: string) => void;
  onRemove: (id: string) => void;
}

export function BirdDetailCard({
  bird,
  onEdit,
  onToggleSeen,
  onRemove,
}: BirdDetailCardProps) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-8 mb-6 items-start">
      {/* levá strana — info */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">{bird.name}</h1>
            <p className="text-gray-400 italic">
              {bird.latinName || "Latinský název neuvedén"}
            </p>
          </div>
          <button
            onClick={() => onEdit()}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Upravit
          </button>
        </div>
        <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 grid grid-cols-2 gap-4 text-gray-300 flex-1">
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
          {/* tlačítka pod kartou */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => onToggleSeen(bird.id)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
            >
              Přepnout stav
            </button>
            <button
              onClick={() => {
                onRemove(bird.id);
                navigate("/");
              }}
              className="bg-red-900 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
            >
              Smazat
            </button>
          </div>

          </div>

          {bird.imageURL ? (
            <img
              src={bird.imageURL}
              alt={bird.name}
              className="w-69 object-cover rounded-lg"
            />
          ) : (
            <div className="w-69 bg-gray-700 rounded-lg flex items-center justify-center text-6xl">
              🦅
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
