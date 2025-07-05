'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = async () => {
    console.log("name==", username);
    console.log("email==", email);
    console.log("password==", password);
    console.log("confirmPassword==", confirmPassword);
    let data;

    try {
      const response = await axios.post(" https://ba86-152-59-6-114.ngrok-free.app/user/signup", {
        name: username,
        email: email,
        password: password,
        role: "Patient",
      });

      console.log("response==", response);
      console.log("data--=", response.data);
      data = response.data.user;

      try {
        const resp = await axios.post(" https://ba86-152-59-6-114.ngrok-free.app/patient/add", {
          firstName: data.name,
          userId: data._id,
          mobileNumber: 787878788878,
        });
        console.log("resp==", resp);
        router.push("/login"); // Navigate to Login page
      } catch (err) {
        console.log(err);
      }

    } catch (error) {
      console.log("error==", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sign Up</h1>
      <div style={styles.form}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={signup} style={styles.button}>
          <span style={styles.buttonText}>Sign Up</span>
        </button>
        <p style={styles.existingAccount}>
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            style={styles.loginLink}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    marginBottom: '20px',
  },
  form: {
    width: '80%',
    maxWidth: '400px',
  },
  inputWrapper: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid black',
  },
  button: {
    backgroundColor: 'blue',
    padding: '10px',
    borderRadius: '10px',
    color: 'white',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center' as const,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold' as const,
  },
  existingAccount: {
    marginTop: '20px',
    textAlign: 'center' as const,
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
  },
};

export default SignUp;
