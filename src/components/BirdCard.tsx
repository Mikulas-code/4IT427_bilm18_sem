import { type Bird } from "../types/Bird";

interface BirdCardProps extends Bird {
  onToggleSeen: (id: string) => void;
  onRemove: (id: string) => void;
}