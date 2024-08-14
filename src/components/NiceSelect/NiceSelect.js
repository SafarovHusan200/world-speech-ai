"use client";

import React from "react";

import { animals } from "./data";
import { Select, SelectItem } from "@nextui-org/select";

export default function SelectComponent() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label="Select an animal" className="max-w-xs">
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
