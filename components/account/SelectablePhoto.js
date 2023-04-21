import Image from "next/image";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

export default function SelectablePhoto({
  id,
  photoUrl,
  filename,
  currentImageUrl,
  onClick,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={"flex items-center justify-center pb-3 hover:cursor-pointer"}
      key={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={"relative"}>
        <Image
          onClick={(e) => onClick(e, photoUrl)}
          className={
            "relative h-28 w-28 rounded-full overflow-hidden" +
            (photoUrl === currentImageUrl
              ? " outline outline-4 outline-offset-0 outline-purple-600"
              : " hover:outline hover:outline-4 hover:outline-offset-0 hover:outline-gray-200")
          }
          src={photoUrl}
          alt={filename}
          width={300}
          height={300}
        />
        <XCircleIcon
          onClick={(e) => onDelete(e, id)}
          className={
            "absolute top-0 right-0 cursor-pointer h-8 w-8 text-red-600 bg-white rounded-full" +
            (isHovered ? "" : " hidden")
          }
        />
      </div>
    </div>
  );
}
