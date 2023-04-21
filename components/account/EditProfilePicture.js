import Image from "next/image";
import { useState } from "react";
import { useAtom } from "jotai";
import PhotoSelectorModal from "./PhotoSelectorModal";
import { accountStore } from "@/stores/accountStore";

export default function EditProfilePicture() {
  const [isOpen, setIsOpen] = useState(false);
  const [account] = useAtom(accountStore);

  return (
    <div>
      <Image
        src={account.profilePicture}
        alt={`${account.username} profile picture`}
        className={"h-32 w-32 rounded-full mb-3"}
        width={300}
        height={300}
      />
      <PhotoSelectorModal
        currentImageUrl={account.profilePicture}
        state={isOpen}
        setState={setIsOpen}
      />
      <button
        type={"button"}
        className={
          "px-5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm"
        }
        onClick={() => setIsOpen(true)}
      >
        Change avatar
      </button>
    </div>
  );
}
