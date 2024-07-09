import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const CommonInput = ({ title, ...props }) => {
  return (
    <Field>
      {title && (
        <Label className="text-sm/6 font-medium text-black">{title}</Label>
      )}
      <Input
        className={clsx(
          "mt-2 block w-full rounded-lg border-none bg-black/5 py-2 px-3 text-sm/6 text-black",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
        )}
        {...props}
      />
    </Field>
  );
};
export default CommonInput;
