import { type Bird } from "../types/Bird";

export const fetchBirds = async (): Promise<Bird[]> =>{
    const res = await fetch('/birds.json');

     if (!res.ok) {
    throw new Error(`Chyba při načítání: ${res.status}`);
  }
  
  return res.json();
}