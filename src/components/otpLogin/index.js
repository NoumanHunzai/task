import React, { useContext, useRef, useState } from "react";
import { TextField, Button, Paper, Box, Typography, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { auth } from "../../firebase/config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  maxWidth: "400px",
  margin: "0 auto",
  height: "100vh",
  justifyContent: "center",
});

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [confirmObject, setConfirmObject] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const recaptchaRef = useRef(null);
  const setUpCaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        recaptchaRef.current,
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            handleSendCode();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    } catch (err) {}
  };

  const handleSendCode = async () => {
    // const phoneNumber = getPhoneNumberFromUserInput();

    setUpCaptcha();

    const phoneNumberRegex = /^\+[1-9]\d{1,14}$/; // Regular expression to validate phone number

    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("Invalid phone number");
      return;
    }
    const appVerifier = window.recaptchaVerifier;
    try {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmObject(confirmationResult);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsCodeSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const code = verificationCode;
      if (confirmObject) {
        confirmObject
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            login(user);
            localStorage.setItem("user", user.accessToken);
            const authData = localStorage.getItem("user");
            if (authData) {
              navigate("/home");
            }
            console.log("You are signed in!");
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log("Verification failed:", error);
            setError("Verification Failed !");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: "3em" }} elevation={10}>
        <Box mb={2}>
          <Typography variant="h5">OTP Login System</Typography>
        </Box>
        {error && (
          <Chip
            label={error}
            color="error"
            onDelete={() => setError("")}
            variant="outlined"
            sx={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        )}
        <div ref={recaptchaRef} />{" "}
        {!isCodeSent && (
          <>
            <TextField
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              error={!!phoneNumberError} // Convert error message to boolean value
              helperText={phoneNumberError}
            />
            <Box mt={2} sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={handleSendCode}>
                Send Code
              </Button>
            </Box>
          </>
        )}
        {isCodeSent && (
          <>
            <Box mt={2}>
              <TextField
                label="Verification Code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
            </Box>

            <Box mt={2} sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={handleVerifyCode}>
                Verify Code
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default OtpLogin;
