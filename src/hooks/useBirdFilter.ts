import { useState } from "react";
import type { Bird } from "../types/Bird";

export function useBirdFilter(birds: Bird[]) {
  const [search, setSearch] = useState("");
  const [filterFamily, setFilterFamily] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterSeen, setFilterSeen] = useState("");

  const filterBirds = birds.filter((bird) => {
    const matchesSearch = bird.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFamily = filterFamily ? bird.family === filterFamily : true;
    const matchesOrder = filterOrder ? bird.order === filterOrder : true;
    const matchesDate =
      (!filterDateFrom || bird.date >= filterDateFrom) &&
      (!filterDateTo || bird.date <= filterDateTo);
    const matchesSeen = filterSeen ? bird.seen.toString() === filterSeen : true;

    return matchesSearch && matchesFamily && matchesOrder && matchesDate && matchesSeen;
  });

  const uniqueFamilies = [ ...new Set(birds.map((bird)=> bird.family))]
  const uniqueOrders = [ ...new Set(birds.map((bird)=> bird.order))]

  return {
  filteredBirds: filterBirds,
  search, setSearch,
  filterFamily, setFilterFamily,
  filterOrder, setFilterOrder,
  filterDateFrom, setFilterDateFrom,
  filterDateTo, setFilterDateTo,
  filterSeen, setFilterSeen,
  uniqueFamilies,
  uniqueOrders,
};
}
