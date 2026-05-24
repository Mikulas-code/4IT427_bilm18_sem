import { useNavigate } from "react-router-dom";
import { type Bird } from "../types/Bird";

interface BirdCardProps extends Bird {
  onToggleSeen: (id: string) => void;
  onRemove: (id: string) => void;
}

export function BirdCard({ id, name, family, location, date, notes, seen, count, latinName, order, onToggleSeen, onRemove}: BirdCardProps)
 {

  const navigate = useNavigate();
  return (
    <div>
      <h2>{name}</h2>
      <p><i>{latinName}</i></p>
      <p>Řád: {order}</p>
      <p>Čeleď: {family}</p>
      <p>Počet: {count}</p>
      <p>Místo: {location.lat}, {location.lng}</p>
      <p>Datum: {date}</p>
      <p>Poznámky: {notes}</p>
      <p>{seen ? "✓ Viděno" : "Neviděno"}</p>
      <button onClick={() => onRemove(id)}>Smazat</button>
      <button onClick={() => onToggleSeen(id)}>Přepnout stav</button>
      <button onClick={()=> navigate(`/birds/${id}`)}>Detail</button>
    </div>
  );
}