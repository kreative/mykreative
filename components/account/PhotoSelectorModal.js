import Image from "next/image";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import ErrorAlert from "@/components/dashboard/ErrorAlert";
import SelectablePhoto from "@/components/account/SelectablePhoto";

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
  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleUploadButtonClick = () => {
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

    // set the previewImage variable to the uploaded file
    setPreviewImage(URL.createObjectURL(file));
    setShowPreview(true);
    uploadMutation.mutate(file);
  };

  const handleDelete = (event, photoId, photoUrl) => {
    event.preventDefault();

    if (photoUrl === currentImageUrl) {
      setErrorAlertMessage("You cannot delete your current profile picture");
      setShowErrorAlert(true);
      return;
    }

    deletePhotoMutation.mutate(photoId);
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
    queryFn: async () => {
      let response;

      try {
        response = await axios.get(
          `https://id-api.kreativeusa.com/v1/photos/user`,
          {
            headers: {
              KREATIVE_ID_KEY: cookies.kreative_id_key,
              KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
            },
          }
        );
      } catch (error) {
        if (error.response) {
          console.log("Error fetching user photos", error.response.data);
          throw new Error(error.response.data);
        } else {
          console.log("Error fetching user photos", error);
          throw new Error(error);
        }
      }

      return response.data.data.photos;
    },
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
      console.log(error);
      setErrorAlertMessage("Error uploading photo, please try again soon :(");
      setShowErrorAlert(true);
    },
    onSuccess: () => {
      setShowPreview(false);
      setPreviewImage("");
      queryClient.invalidateQueries({ queryKey: ["userPhotos"] });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (photoId) => {
      const response = await axios.delete(
        `https://id-api.kreativeusa.com/v1/photos/${photoId}`,
        {
          headers: {
            KREATIVE_ID_KEY: cookies.kreative_id_key,
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
      console.log(error);
      setErrorAlertMessage("Error deleting photo, please try again soon :(");
      setShowErrorAlert(true);
    },
    onSuccess: () => {
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
                          <SelectablePhoto
                            key={photo.id}
                            id={photo.id}
                            photoUrl={photo.url}
                            filename={photo.filename}
                            currentImageUrl={currentImageUrl}
                            onClick={handleImageSelection}
                            onDelete={handleDelete}
                          />
                        ))}
                        <div
                          className={
                            "flex items-center justify-center pb-3" +
                            (showPreview ? "" : " hidden")
                          }
                        >
                          <Image
                            className={
                              "relative h-28 w-28 rounded-full overflow-hidden opacity-25"
                            }
                            src={previewImage}
                            alt={"Preview image"}
                            width={300}
                            height={300}
                          />
                        </div>
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
