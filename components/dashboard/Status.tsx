"use client";

import { useState } from "react";

import Button from "./ui/Button";
import Container from "../ui/Container";

interface StatusProps {
  onStatusChange: (status: string) => void;
}

export default function Status({ onStatusChange }: StatusProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  function handleStatusChange(status: string) {
    setSelectedStatus(status);
    onStatusChange(status);
  }

  return (
    <div className="flex gap-4">
      <Container className="flex justify-end gap-4">
        <Button
          variant={selectedStatus === "all" ? "secondary" : "unselected"}
          onClick={() => handleStatusChange("all")}
        >
          Todas
        </Button>

        <Button
          variant={selectedStatus === "completed" ? "secondary" : "unselected"}
          onClick={() => handleStatusChange("completed")}
        >
          Concluídas
        </Button>

        <Button
          variant={selectedStatus === "pending" ? "secondary" : "unselected"}
          onClick={() => handleStatusChange("pending")}
        >
          Pendentes
        </Button>
      </Container>
    </div>
  );
}
