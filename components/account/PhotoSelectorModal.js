import Image from "next/image";
import axios from "axios";
import { Fragment, useRef, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import fetchUserPhotos from "@/lib/fetchUserPhotos";
import ErrorAlert from "@/components/dashboard/ErrorAlert";
import { XCircleIcon } from "@heroicons/react/20/solid";

export default function PhotoSelectorModal({
  currentImageUrl,
  state,
  setState,
}) {
  const [cookies] = useCookies(["kreative_id_key"]);
  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("Yo yo yo");
  const hiddenFileInput = useRef(null);
  const handleUploadButtonClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (event) => {
    setShowErrorAlert(false);
    const acceptedFileTypes = ["image/png", "image/jpeg", "image/webp"];
    const file = event.target.files[0];
    console.log(file);

    if (!file) return;

    if (!acceptedFileTypes.includes(file.type)) {
      setErrorAlertMessage("Please upload a png or jpg file");
      setShowErrorAlert(true);
    }

    uploadMutation.mutate(file);
  };

  const setOpen = (isOpen) => {
    setShowErrorAlert(false);
    setState(isOpen);
  };

  const handleImageSelection = async (e, photoUrl) => {
    e.preventDefault();

    const response = await axios.post(
      "https://id-api.kreativeusa.com/v1/accounts/update/avatar",
      {
        photoUrl: photoUrl,
      },
      {
        headers: {
          KREATIVE_ID_KEY: cookies.kreative_id_key,
          KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
          KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
        },
      }
    );

    // check to see if there was an error with the response
    if (response.data.error) {
      console.log("Error updating profile picture", response.data.error);
      setErrorAlertMessage(
        "Error updating profile picture, please try again soon :("
      );
      setShowErrorAlert(true);
      return;
    }

    // if passed, we refresh the page
    window.location.reload();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPhotos"],
    queryFn: async () => await fetchUserPhotos(cookies.kreative_id_key),
  });

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.post(
        "https://id-api.kreativeusa.com/v1/photos/avatar",
        formData,
        {
          headers: {
            KREATIVE_ID_KEY: cookies.kreative_id_key,
            KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
            KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
          },
        }
      );

      if (response.data.error) {
        console.log(response.data.error);
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onError: (error) => {
      setErrorAlertMessage("Error uploading photo, please try again soon :(");
      setShowErrorAlert(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userPhotos"] });
    },
  });

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className={showErrorAlert ? "block" : "hidden"}>
                  <ErrorAlert message={errorAlertMessage} />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    Update your profile picture
                  </Dialog.Title>
                </div>
                <div className={"text-md text-center text-gray-500 my-6"}>
                  {isLoading && <p>Loading your photos...</p>}
                  {isError && <p>There was an error loading your photos.</p>}
                  {data && (
                    <div>
                      <p className={"mb-6"}>Your photos</p>
                      <div className={"grid grid-cols-3 gap-3"}>
                        {data.map((photo) => (
                          <div
                            className={
                              "flex items-center justify-center pb-3 hover:cursor-pointer"
                            }
                            key={photo.id}
                            onClick={(e) => handleImageSelection(e, photo.url)}
                          >
                            <div className={"relative"}>
                              <Image
                                className={
                                  "relative h-28 w-28 rounded-full overflow-hidden" +
                                  (photo.url === currentImageUrl
                                    ? " outline outline-4 outline-offset-0 outline-purple-600"
                                    : " hover:outline hover:outline-4 hover:outline-offset-0 hover:outline-gray-200")
                                }
                                src={photo.url}
                                alt={photo.filename}
                                width={300}
                                height={300}
                              />
                              <XCircleIcon
                                className={
                                  "absolute top-0 right-0 cursor-pointer h-8 w-8 text-red-600 bg-white rounded-full"
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type={"file"}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className={
                      "inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    }
                    onClick={handleUploadButtonClick}
                  >
                    <ArrowUpTrayIcon className={"w-5 h-5 mr-2"} />{" "}
                    <span>Upload new photo</span>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                <div className={"mt-6 flex items-center justify-center"}>
                  <Image
                    className={"h-5 w-auto"}
                    alt={"Hosted on Kreative Photos brand integration"}
                    src={
                      "https://cdn.kreativeusa.com/fed/hosted-on-kreativephotos@2x.png"
                    }
                    width={200}
                    height={25}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
