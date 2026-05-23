import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Bird } from "../types/Bird";
import { fetchBirds } from "../api/birds";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

interface BirdListContextType {
  birds: Bird[];
  isLoading: boolean;
  isError: boolean;
  addBird: (bird: Bird) => void;
  removeBird: (id: string) => void;
  toggleSeen: (id: string) => void;
}

export const BirdListContext = createContext<BirdListContextType>({
  birds: [],
  isLoading: false,
  isError: false,
  addBird: () => {},
  removeBird: () => {},
  toggleSeen: () => {},
});

export function BirdListProvider({ children }: { children: ReactNode }) {
  const {
    data: serverBirds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["birds"],
    queryFn: fetchBirds,
  });

  const [clientBirds, setClientBirds] = useState<Bird[]>([]);

  const addBird = (newBird: Bird) => {
    setClientBirds([...clientBirds, newBird]);
  };

  const removeBird = (id: string) => {
    setClientBirds(clientBirds.filter((bird) => bird.id !== id));
  };

  const toggleSeen = (id: string) => {
    setClientBirds(
      clientBirds.map((bird) => {
        if (bird.id === id) {
          return { ...bird, seen: !bird.seen };
        } else return bird;
      }),
    );
  };



  useEffect(()=>{
    if(serverBirds) setClientBirds(serverBirds)
  }, [serverBirds]);

  return (
    <BirdListContext.Provider value={ {birds: clientBirds, isLoading, isError, addBird, removeBird, toggleSeen}}
    >
        {children}
    </BirdListContext.Provider>
  );
}


export function useBirdList() {
  return useContext(BirdListContext);
}