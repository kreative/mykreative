import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";

import { IAccount } from "@/types/IAccount";
import { accountStore } from "@/stores/accountStore";

export default function Logout(): JSX.Element {
  // gets the global account store
  const [account, setAccount] = useAtom(accountStore);

  // gets the needed cookies
  const [cookies, _, removeCookie] = useCookies([
    "kreative_id_key",
    "keychain_id",
  ]);

  const parsedAIDN = parseInt(process.env.NEXT_PUBLIC_AIDN as string);

  useEffect(() => {
    // closes the keychain using id-api
    axios
      .post(
        `https://id-api.kreativeusa.com/v1/keychains/close`,
        {
          key: cookies.kreative_id_key,
        }
      )
      .then((response) => {
        // response status code is between 200-299
        // the only response that would come through is 200 (HTTP OK)
        // deletes all cookies stored in local storage
        removeCookie("kreative_id_key", { path: "/" });
        removeCookie("keychain_id", { path: "/" });

        // resets the global account data
        setAccount({} as IAccount);

        // redirects user back to the home page
        window.location.href = "/";
      })
      .catch((error) => {
        // error response status code is above 300+
        console.log(error);

        // gets the status code of the error through the response
        // we check to see if the status code exists as to not throw an error in case an error is thrown
        // that isn't actually sent by the server api, but rather from axios
        let statusCode;

        if (error.response.data.statusCode !== undefined) {
          statusCode = error.response.data.statusCode;

          // for all of these errors we want to redirect the user to the error page with a cause
          if (statusCode === 403) {
            // bad request, probably the id was not passed or is not a number
            window.location.href = `https://id.kreativeusa.com/error?cause=badrequest&aidn=${AIDN}`;
          } else if (statusCode === 404) {
            // keychain not found using the id
            window.location.href = `https://id.kreativeusa.com/error?cause=notfound&aidn=${AIDN}`;
          } else if (statusCode === 500) {
            // internal server error
            window.location.href = `https://id.kreativeusa.com/error?cause=ise&aidn=${AIDN}`;
          } else {
            // some weird unknown error
            // this should not happen at all, so if it does there are critical issues
            window.location.href = `https://id.kreativeusa.com/error?cause=unknown&aidn=${AIDN}`;
          }
        } else {
          // if there is no error response status code then we have an "unknown error"
          // in most cases this is a connection error or some sort of axios error
          window.location.href = `https://id.kreativeusa.com/error?cause=unknown&aidn=${AIDN}`;
        }
      });
  }, [cookies, removeCookie, setAccount]);

  return <></>;
}
