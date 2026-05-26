import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useBirdFilter } from "./useBirdFilter";

const INITIAL = [
  {
    id: "1",
    name: "Sýkora koňadra",
    latinName: "Parus major",
    order: "Pěvci",
    family: "Sýkorovití",
    location: { lat: 50.0755, lng: 14.4378 },
    date: "2024-03-15",
    notes: "Viděna u krmítka",
    seen: true,
    count: 3,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Parus_major_2_Luc_Viatour.jpg/1280px-Parus_major_2_Luc_Viatour.jpg",
  },
  {
    id: "2",
    name: "Pěnkava obecná",
    latinName: "Fringilla coelebs",
    order: "Pěvci",
    family: "Pěnkavovití",
    location: { lat: 49.1951, lng: 16.6068 },
    date: "2024-04-02",
    notes: "Zpívala na větvi",
    seen: true,
    count: 1,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Buchfink_%2811%29_%2834980808596%29.jpg/1280px-Buchfink_%2811%29_%2834980808596%29.jpg",
  },
  {
    id: "3",
    name: "Čáp bílý",
    latinName: "Ciconia ciconia",
    order: "Brodiví",
    family: "Čapovití",
    location: { lat: 50.2092, lng: 15.8328 },
    date: "2024-05-10",
    notes: "Na louce u řeky",
    seen: false,
    count: 2,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Wei%C3%9Fstorch_Walsrode_2014_02.jpg/960px-Wei%C3%9Fstorch_Walsrode_2014_02.jpg",
  },
];

describe("useBirdList", () => {
  it("vrátí všechny ptáky bez filterů", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    expect(result.current.filteredBirds).toHaveLength(3);
  });

  it("vrátí unikátní řády", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    expect(result.current.uniqueOrders).toHaveLength(2);
  });

  it("vrátí unikátní čeledě", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    expect(result.current.uniqueFamilies).toHaveLength(3);
  });

  it("vrátí podle řádu", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterOrder("Pěvci"));
    expect(result.current.filteredBirds).toHaveLength(2);
  });

  it("vrátí podle čeledi", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterFamily("Pěnkavovití"));
    expect(result.current.filteredBirds).toHaveLength(1);
  });

  it("vrátí podle názvu", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setSearch("Čá"));
    expect(result.current.filteredBirds).toHaveLength(1);
  });

  it("vrátí podle datumu", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterDateFrom("2024-03-14"));
    act(() => result.current.setFilterDateTo("2024-03-16"));
    expect(result.current.filteredBirds).toHaveLength(1);
  });

  it("vrátí jen spatřené ptáky", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterSeen(true.toString()));
    expect(result.current.filteredBirds).toHaveLength(2);
  });

  it("vrátí jen nespatřené ptáky", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterSeen(false.toString()));
    expect(result.current.filteredBirds).toHaveLength(1);
  });

  it("vrátí prázdný seznam když neodpovídá search", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setSearch("XYZ123"));
    expect(result.current.filteredBirds).toHaveLength(0);
  });

  it("vrátí prázdný seznam když neodpovídá řád", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterOrder("XYZ123"));
    expect(result.current.filteredBirds).toHaveLength(0);
  });

  it("vrátí prázdný seznam když neodpovídá rodina", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterFamily("XYZ123"));
    expect(result.current.filteredBirds).toHaveLength(0);
  });

  it("vrátí prázdný seznam když neodpovídá datum", () => {
    const { result } = renderHook(() => useBirdFilter(INITIAL));
    act(() => result.current.setFilterDateFrom("2027-03-14"));
    act(() => result.current.setFilterDateTo("2027-03-16"));
    expect(result.current.filteredBirds).toHaveLength(0);
  });
});
