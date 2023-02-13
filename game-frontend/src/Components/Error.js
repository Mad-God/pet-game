import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set as setError } from "../store/error";
import { useEffect } from "react";

const ErrorMessage = () => {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [isShowing, setIsShowing] = useState(error != "");
  useEffect(() => {
    showErrorMessage()
  }, [error]);


  const showErrorMessage = () => {
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
      dispatch(setError(""));
    }, 3000);
  };

  return (
    <>
      {error ? (
        <div className={`error-message${isShowing ? "" : " d-none"}`}>
          {error}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorMessage;
