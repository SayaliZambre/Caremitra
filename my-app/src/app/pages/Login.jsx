'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log('name==', username);
    console.log('password==', password);
    try {
      const response = await axios.post(' https://ba86-152-59-6-114.ngrok-free.app/user/login', {
        email: username,
        password: password,
      });
      const data = response.data.user;
      console.log('response==', response.data);
      console.log('data==', data);
      console.log('data==', data._id);

      // Navigate to a page called "Tab" and pass user data via query or localStorage
      router.push(`/tab?id=${data._id}`);
    } catch (error: any) {
      console.log('error==', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>Login</h1>
      <input
        type="text"
        placeholder="E-mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={login}
        style={styles.button}
      >
        <span style={styles.buttonText}>Login</span>
      </button>
      <p style={styles.signupText}>
        Don't have an account?{' '}
        <span
          onClick={() => router.push('/signup')}
          style={styles.link}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    width: '80%',
    maxWidth: '400px',
    height: '40px',
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '10px',
    padding: '0 10px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#005cb9',
    padding: '10px',
    borderRadius: '25px',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'pointer',
    border: 'none',
  },
  buttonText: {
    color: '#fff',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '16px',
  },
  link: {
    color: '#005cb9',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Login;
