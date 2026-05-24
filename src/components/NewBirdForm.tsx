import { useState } from "react";
import { type Bird } from "../types/Bird";

interface NewBirdFormProps {
  onAddBird: (bird: Bird) => void;
  onClose: () => void;
}

export function NewBirdForm({ onAddBird, onClose }: NewBirdFormProps) {
  const [name, setName] = useState("");
  const [latinName, setLatinName] = useState("");

  const [order, setOrder] = useState("");
  const [family, setFamily] = useState("");

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [date, setDate] = useState("");

  const [notes, setNotes] = useState("");
  const [seen, setSeen] = useState("");

  const [count, setCount] = useState("");

  function handleSubmit() {
    const newId = Date.now().toString();

    const location = { lat: Number(lat), lng: Number(lng) };
    onAddBird({
      id: newId,
      name,
      latinName,
      order,
      family,
      count: Number(count),
      date,
      location,
      notes,
      seen: false,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold text-green-400 mb-4">Přidat ptáka</h2>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 col-span-2"
            placeholder="Název"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 col-span-2"
            placeholder="Latinský název"
            value={latinName}
            onChange={(e) => setLatinName(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Řád"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Čeleď"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Počet"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            type="datetime-local"
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Zeměpisná šířka"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Zeměpisná délka"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <textarea
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 col-span-2"
            placeholder="Poznámky"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Zrušit
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Přidat
          </button>
        </div>
      </form>
    </div>
  );
}
