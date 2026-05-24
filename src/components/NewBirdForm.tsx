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

      <button type="submit">Přidat</button>
      <button type="button" onClick={onClose}>
        Zrušit
      </button>
    </form>
  );
}
