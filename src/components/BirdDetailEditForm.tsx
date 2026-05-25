import { useState } from "react";
import type { Bird } from "../types/Bird";
import { useParams } from "react-router";
import { useBirdList } from "../context/BirdListContext";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LocationPicker } from "./NewBirdForm";

interface BirdDetailEditFormProps {
  bird: Bird;
  onClose: () => void;
  onSave: (bird: Bird) => void;
}

export function BirdDetailEditForm({
  bird,
  onClose,
  onSave,
}: BirdDetailEditFormProps) {
  const [name, setName] = useState(bird.name);
  const [latinName, setLatinName] = useState(bird.latinName);

  const [order, setOrder] = useState(bird.order);
  const [family, setFamily] = useState(bird.family);

  const [lat, setLat] = useState(bird.location.lat);
  const [lng, setLng] = useState(bird.location.lng);

  const [date, setDate] = useState(bird.date);

  const [notes, setNotes] = useState(bird.notes);
  const [seen, setSeen] = useState(bird.seen);

  const [count, setCount] = useState(bird.count.toString());
  const [imageURL, setImageURL] = useState(bird.imageURL || "");

  function handleSubmit() {
    onSave({
      ...bird,
      name,
      latinName,
      order,
      family,
      count: Number(count),
      date,
      location: { lat: Number(lat), lng: Number(lng) },
      notes,
      imageURL,
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
        <h2 className="text-xl font-bold text-green-400 mb-4">Upravit ptáka</h2>

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
            type="date"
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
          <input
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 placeholder-gray-400 col-span-2"
            placeholder="URL fotky"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
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
            Uložit
          </button>
        </div>
      </form>
    </div>
  );
}
