import { Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

const FilterMenu = ({ options, selectedValue, onClick, title }) => {
  return (
    <Field>
      <Label className="text-sm/6 font-medium">{title}</Label>
      <div className="relative">
        <Select
          value={selectedValue}
          onChange={(e) => onClick && onClick(e.target.value)}
          className={clsx(
            "mt-2 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            "*:text-black"
          )}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
};

export default FilterMenu;
