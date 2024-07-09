import { Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";

const MultilineText = ({ title, ...props }) => {
  return (
    <Field>
      <Label className="text-sm/6 font-medium text-black">{title}</Label>
      <Textarea
        className={clsx(
          "mt-2 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
        )}
        rows={3}
        {...props}
      />
    </Field>
  );
};
export default MultilineText;
