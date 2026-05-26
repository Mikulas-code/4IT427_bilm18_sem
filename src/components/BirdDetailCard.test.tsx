import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import { BirdDetailCard } from "./BirdDetailCard";
import { MemoryRouter } from "react-router-dom";

const bird = {
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
};

describe("BirdCardDetail", () => {
  it("Zobrazí jméno, latinský název, řád, čeleď, datum, poznámky, počet a lokaci", () => {
    render(
      <MemoryRouter>
        <BirdDetailCard
          bird={bird}
          onRemove={() => {}}
          onToggleSeen={() => {}}
          onEdit={() => {}}
        ></BirdDetailCard>
      </MemoryRouter>,
    );
    expect(screen.getByText("Sýkora koňadra")).toBeInTheDocument();
    expect(screen.getByText("Parus major")).toBeInTheDocument();
    expect(screen.getByText("Pěvci")).toBeInTheDocument();
    expect(screen.getByText("2024-03-15")).toBeInTheDocument();
    expect(screen.getByText("Viděna u krmítka")).toBeInTheDocument();
    expect(screen.getByText("Sýkorovití")).toBeInTheDocument();
    expect(screen.getByText("50.0755, 14.4378")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("zavolá onRemove při kliknutí na tlačítko", async () => {
    const handleRemove = vi.fn(); // mock funkce
    render(
      <MemoryRouter>
        <BirdDetailCard bird={bird} onToggleSeen={() => {}} onRemove={handleRemove} onEdit={()=>{}} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Smazat" }));
    expect(handleRemove).toHaveBeenCalledWith("1");
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("zavolá onToggleSeen při kliknutí na tlačítko", async () => {
    const handleSeen = vi.fn(); // mock funkce
    render(
      <MemoryRouter>
        <BirdDetailCard bird={bird} onToggleSeen={handleSeen} onRemove={()=>{}} onEdit={()=>{}} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Přepnout stav" }));
    expect(handleSeen).toHaveBeenCalledWith("1");
    expect(handleSeen).toHaveBeenCalledTimes(1);
  });

  it("zavolá onEdit při kliknutí na tlačítko", async () => {
    const handleEdit = vi.fn(); // mock funkce
    render(
      <MemoryRouter>
        <BirdDetailCard bird={bird} onToggleSeen={()=>{}} onRemove={()=>{}} onEdit={handleEdit} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Upravit" }));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
