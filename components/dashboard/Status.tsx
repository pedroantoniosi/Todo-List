import React from "react";

import Button from "./ui/Button";
import Container from "../ui/Container";

interface StatusProps {
  onStatusChange: (status: string) => void;
}

export default function Status({ onStatusChange }: StatusProps) {
  return (
    <div className="flex gap-4">
      <Container className="flex justify-end gap-4">
        <Button variant="secondary" onClick={() => onStatusChange("all")}>
          Todas
        </Button>

        <Button variant="secondary" onClick={() => onStatusChange("completed")}>
          Concluídas
        </Button>

        <Button variant="secondary" onClick={() => onStatusChange("pending")}>
          Pendentes
        </Button>
      </Container>
    </div>
  );
}
