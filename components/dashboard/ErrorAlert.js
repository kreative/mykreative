import { XCircleIcon } from "@heroicons/react/20/solid";
export default function ErrorAlert({ message }) {
  return (
    <div className="border-t-4 border-red-400 bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
