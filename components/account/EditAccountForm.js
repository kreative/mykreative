import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useAtom } from "jotai";
import { useCookies } from "react-cookie";
import zxcvbn from "zxcvbn";
import { accountStore } from "@/stores/accountStore";
import WarnAlert from "@/components/dashboard/WarnAlert";
import ErrorAlert from "@/components/dashboard/ErrorAlert";
import SuccessAlert from "@/components/dashboard/SuccessAlert";
import ProgressBar from "@/components/ProgressBar";

export default function EditAccountForm() {
  const [cookies] = useCookies(["kreative_id_key"]);
  const [account, setAccount] = useAtom(accountStore);

  const [newUsername, setNewUsername] = useState(account.username);
  const [newFirstName, setNewFirstName] = useState(account.firstName);
  const [newLastName, setNewLastName] = useState(account.lastName);
  const [newEmail, setNewEmail] = useState(account.email);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [warnAlert, setWarnAlert] = useState("");
  const [showWarnAlert, setShowWarnAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // password strength analyzer progress bar states
  const [passwordScore, setPasswordScore] = useState(0);
  const [barWrapperClass, setBarWrapperClass] = useState("pt-3 hidden");
  const [barMessage, setBarMessage] = useState("");
  const [progressClass, setProgressClass] = useState("");
  const [barWidthName, setBarWidthName] = useState("");
  const [textClass, setTextClass] = useState("gray-500");

  const hideAlertsOnKeyDown = (e) => {
    setShowWarnAlert(false);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  const alert = (type, message) => {
    if (type === "warn") {
      setShowWarnAlert(true);
      setWarnAlert(message);
    } else if (type === "error") {
      setShowErrorAlert(true);
      setErrorAlert(message);
    } else {
      setShowSuccessAlert(true);
      setSuccessAlert(message);
    }
  };

  const changeProgressBar = (message, progressClass, widthName, textClass) => {
    // sets the state for the different variables for the progress bar
    setBarMessage(message);
    setProgressClass(progressClass);
    setBarWidthName(widthName);
    setTextClass(textClass);
  };

  const handlePasswordInput = (passwordInput) => {
    // hides the progress bar if there is no password entered
    if (passwordInput.length !== 0) setBarWrapperClass("pt-3");
    else setBarWrapperClass("pt-3 hidden");

    // updates the password in react state
    setNewPassword(passwordInput);

    // get the score of the password and sets it to state
    const score = zxcvbn(newPassword).score;
    setPasswordScore(score);

    // changes progress bar strength based on score
    if (passwordScore === 0 || passwordScore === 1) {
      changeProgressBar(
        "Password weak",
        "h-2.5 w-4/12 rounded-full bg-red-600",
        "20%",
        "text-sm text-red-600"
      );
    } else if (passwordScore === 2) {
      changeProgressBar(
        "Password almost there",
        "h-2.5 w-8/12 rounded-full bg-yellow-500",
        "75%",
        "text-sm text-yellow-500"
      );
    } else if (passwordScore === 3 || passwordScore === 4) {
      changeProgressBar(
        "Strong password",
        "h-2.5 w-12/12 rounded-full bg-green-700",
        "100%",
        "text-sm text-green-700"
      );
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // reset the alerts
    setShowWarnAlert(false);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);

    // check to see if name, email, or username is empty
    if (
      newUsername === "" ||
      newFirstName === "" ||
      newLastName === "" ||
      newEmail === ""
    ) {
      alert(
        "warn",
        "Name, email, and username cannot be empty. Please fill those fields out."
      );
      return;
    }

    // check if anything has changed, if not then we warn the user that nothing has changed
    if (
      newUsername === account.username &&
      newFirstName === account.firstName &&
      newLastName === account.lastName &&
      newEmail === account.email &&
      newPassword === "" &&
      newPasswordConfirm === ""
    ) {
      alert(
        "warn",
        "No changes have been made to your Kreative account information"
      );
      return;
    }

    // check to see if the email address entered is valid, if the email has been changed
    if (newEmail !== account.email && !newEmail.match(/.+@.+\..+/)) {
      alert("warn", "Please enter a valid email address");
      return;
    }

    // check if the new password and confirm password match, if the password is not empty
    if (newPassword !== "" && newPassword !== newPasswordConfirm) {
      alert("warn", "The new password and confirm password do not match");
      return;
    }

    const data = {
      username: newUsername,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      profilePicture: account.profilePicture,
    };

    if (newPassword !== "") {
      data.password = newPassword;
    }

    axios
      .post("https://id-api.kreativeusa.com/v1/accounts/update", data, {
        headers: {
          KREATIVE_ID_KEY: cookies.kreative_id_key,
          KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
          KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
        },
      })
      .then((res) => {
        // if the API call is successful, then we can update the accountStore with the new data
        // and then redirect the user back to the 'account' dashboard page
        setAccount(res.data.data.account);
        alert("success", "Your Kreative account information has been updated");
      })
      .catch((err) => {
        // if the API call is unsuccessful, then we can show the user an error message
        // check to see if the username has been taken or not
        if (err.response) {
          if (err.response.data.message === "username is already taken") {
            alert("warn", "The username you have entered is already taken");
          } else if (err.response.data.message === "email is already taken") {
            alert(
              "warn",
              "The email you have entered is already being used by another Kreative account"
            );
          } else {
            alert(
              "error",
              `Internal server issue: ${err.response.data.message}`
            );
          }
        } else if (err.request) {
          alert(
            "error",
            "There was an error connecting to the Kreative network. Please try again later :("
          );
        }
      });
  };

  return (
    <div>
      <div className={"pb-8"}>
        <div className={showWarnAlert ? "block" : "hidden"}>
          <WarnAlert message={warnAlert} />
        </div>
        <div className={showErrorAlert ? "block" : "hidden"}>
          <ErrorAlert message={errorAlert} />
        </div>
        <div className={showSuccessAlert ? "block" : "hidden"}>
          <SuccessAlert message={successAlert} />
        </div>
      </div>
      <form>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Basic Account Details
              </h2>
              <p className="mt-1 text-md leading-6 text-gray-600">
                This information will be shown publically across the Kreative
                network.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-4">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="guppy57"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Richard"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    placeholder="Branson"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="richard@virigin.com"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Security
              </h2>
              <p className="mt-1 text-md leading-6 text-gray-600">
                Update your password and secure your account.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={newPassword}
                    onChange={(e) => handlePasswordInput(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
                <div className={barWrapperClass}>
                  <ProgressBar
                    widthName={barWidthName}
                    progressClass={progressClass}
                    textClass={textClass}
                    message={barMessage}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    autoComplete="confirm-new-password"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    onKeyDown={hideAlertsOnKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/account"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Go back
          </Link>
          <button
            type="button"
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            onClick={handleSave}
          >
            Save and Update
          </button>
        </div>
      </form>
    </div>
  );
}
