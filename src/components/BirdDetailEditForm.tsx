import { useState } from "react";
import type { Bird } from "../types/Bird";
import { useParams } from "react-router";
import { useBirdList } from "../context/BirdListContext";

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

  const [lat, setLat] = useState(bird.location.lat.toString());
  const [lng, setLng] = useState(bird.location.lng.toString());

  const [date, setDate] = useState(bird.date);

  const [notes, setNotes] = useState(bird.notes);
  const [seen, setSeen] = useState(bird.seen);

  const [count, setCount] = useState(bird.count.toString());

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
    });
    onClose();
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // zabrání obnovení stránky
        handleSubmit();
      }}
    >
      <h2>Přidat ptáka</h2>

      <input
        placeholder="Název"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Latinský název"
        value={latinName}
        onChange={(e) => setLatinName(e.target.value)}
      />
      <input
        placeholder="Řád"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />
      <input
        placeholder="Čeleď"
        value={family}
        onChange={(e) => setFamily(e.target.value)}
      />
      <input
        placeholder="Počet"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <input
        placeholder="Zeměpisná šířka"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        placeholder="Zeměpisná délka"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        placeholder="Poznámky"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">Uložit</button>
      <button type="button" onClick={onClose}>
        Zrušit
      </button>
    </form>
  );
}
