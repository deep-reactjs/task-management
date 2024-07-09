import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "./Button";

const Modal = ({ open, onClose, title, description, onClick }) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-black/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              {title}
            </DialogTitle>
            <p className="mt-2 text-base text-black/80">{description}</p>
            <div className="mt-4 flex items-center gap-4">
              <Button onClick={() => onClick && onClick()}>Yes</Button>
              <Button variant="secondary" onClick={() => onClose && onClose()}>
                No
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;