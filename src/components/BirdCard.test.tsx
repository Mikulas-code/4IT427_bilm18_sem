import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BirdCard } from "./BirdCard";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

describe("BirdCard", () => {
  it("Zobrazí jméno, latinský název, řád, čeleď, datum, poznámky, počet a lokaci", () => {
    render(
      <MemoryRouter>
        <BirdCard
          {...bird}
          onRemove={() => {}}
          onToggleSeen={() => {}}
        ></BirdCard>
      </MemoryRouter>,
    );
    expect(screen.getByText("Sýkora koňadra")).toBeInTheDocument();
    expect(screen.getByText("Parus major")).toBeInTheDocument();
    expect(screen.getByText("Řád: Pěvci")).toBeInTheDocument();
    expect(screen.getByText("Datum: 2024-03-15")).toBeInTheDocument();
    expect(screen.getByText("Poznámky: Viděna u krmítka")).toBeInTheDocument();
    expect(screen.getByText("Čeleď: Sýkorovití")).toBeInTheDocument();
    expect(screen.getByText("Místo: 50.0755, 14.4378")).toBeInTheDocument();
    expect(screen.getByText("Počet: 3")).toBeInTheDocument();
  });

  it("Zobrazí badge ✓ Viděno, pokud seen === true", () => {
    render(
      <MemoryRouter>
        <BirdCard {...bird} onToggleSeen={() => {}} onRemove={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("✓ Viděno")).toBeInTheDocument();
  });

  it("Zobrazí badge Neviděno, pokud seen === false", () => {
    render(
      <MemoryRouter>
        <BirdCard
          {...bird}
          seen={false}
          onToggleSeen={() => {}}
          onRemove={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Neviděno")).toBeInTheDocument();
  });

  it("zavolá onToggleSeen při kliknutí na tlačítko", async () => {
    const handleToggle = vi.fn(); // mock funkce
    render(
      <MemoryRouter>
        <BirdCard {...bird} onToggleSeen={handleToggle} onRemove={() => {}} />
      </MemoryRouter>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Přepnout stav" }),
    );
    expect(handleToggle).toHaveBeenCalledWith("1");
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it("zavolá onToggleRemove při kliknutí na tlačítko", async () => {
    const handleRemove = vi.fn(); // mock funkce
    render(
      <MemoryRouter>
        <BirdCard {...bird} onToggleSeen={() => {}} onRemove={handleRemove} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Smazat" }));
    expect(handleRemove).toHaveBeenCalledWith("1");
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("obsahuje tlačítko Detail", () => {
    render(
      <MemoryRouter>
        <BirdCard {...bird} onToggleSeen={() => {}} onRemove={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button", { name: "Detail" })).toBeInTheDocument();
  });

  it("zobrazí obrázek když je imageURL vyplněné", () => {
    render(
      <MemoryRouter>
        <BirdCard {...bird} onToggleSeen={() => {}} onRemove={() => {}} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("img", { name: "Sýkora koňadra" }),
    ).toBeInTheDocument();
  });

  it("zobrazí placeholder když není imageURL", () => {
    render(
      <MemoryRouter>
        <BirdCard
          {...bird}
          imageURL={undefined}
          onToggleSeen={() => {}}
          onRemove={() => {}}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("img", { name: "placeholder" })).toBeInTheDocument();
  });
});
