import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { NewBirdForm } from "./NewBirdForm";

describe("NewBirdForm", () => {
  it("Zobrazí input pole pro jméno, latinský název, řád, čeleď, datum, poznámky a počet", () => {
    render(<NewBirdForm onAddBird={() => {}} onClose={() => {}}></NewBirdForm>);
    expect(screen.getByPlaceholderText("Název")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Latinský název")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Řád")).toBeInTheDocument();
    expect(screen.getByLabelText("Datum")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Poznámky")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Čeleď")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Počet")).toBeInTheDocument();
  });
  it("zavolá onAddBird při kliknutí na tlačítko", async () => {
    const handleAddBird = vi.fn(); // mock funkce
    render(<NewBirdForm onAddBird={handleAddBird} onClose={() => {}} />);

    await userEvent.type(
      screen.getByPlaceholderText("Název"),
      "Sýkora koňadra",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Latinský název"),
      "Parus major",
    );

    await userEvent.click(screen.getByRole("button", { name: "Přidat" }));
    expect(handleAddBird).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Sýkora koňadra",
        latinName: "Parus major",
      }),
    );
    expect(handleAddBird).toHaveBeenCalledTimes(1);
  });

  it("zavolá onClose při kliknutí na tlačítko", async () => {
    const handleClose = vi.fn(); // mock funkce
    render(<NewBirdForm onAddBird={() => {}} onClose={handleClose} />);

    await userEvent.click(screen.getByRole("button", { name: "Zrušit" }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
