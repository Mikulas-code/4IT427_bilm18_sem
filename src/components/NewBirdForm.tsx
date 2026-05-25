import { useState } from "react";
import { type Bird } from "../types/Bird";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

interface NewBirdFormProps {
  onAddBird: (bird: Bird) => void;
  onClose: () => void;
}

export function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function NewBirdForm({ onAddBird, onClose }: NewBirdFormProps) {
  const [name, setName] = useState("");
  const [latinName, setLatinName] = useState("");

  const [order, setOrder] = useState("");
  const [family, setFamily] = useState("");

  const [lat, setLat] = useState(50.0755);
  const [lng, setLng] = useState(14.4378);

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
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl"
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
            value={lat.toString()}
            onChange={(e) => setLat(Number(e.target.value))}
          />
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400"
            placeholder="Zeměpisná délka"
            value={lng.toString()}
            onChange={(e) => setLng(Number(e.target.value))}
          />
          <textarea
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 col-span-2"
            placeholder="Poznámky"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <MapContainer
            center={[Number(lat), Number(lng)]}
            zoom={8}
            className="w-full h-48 rounded-lg mb-3 col-span-2"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker
              onLocationSelect={(lat, lng) => {
                setLat(lat);
                setLng(lng);
              }}
            />
            {lat && <Marker position={[lat, lng]} />}
          </MapContainer>
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
