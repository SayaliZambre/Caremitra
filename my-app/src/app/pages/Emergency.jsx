'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface EmergencyContact {
  _id: string;
  name: string;
  number: string;
  relation_to_patient: string;
}

export default function Emergency() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? JSON.parse(idParam) : null;

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [relation, setRelation] = useState('');
  const [data, setData] = useState<EmergencyContact[]>([]);

  const profiledata = async () => {
    try {
      const response = await axios.get(
        ` https://ba86-152-59-6-114.ngrok-free.app/patient/${id.patient_id}`
      );
      console.log('response==', response);
      setData(response.data.patient.emergencycontact);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    profiledata();
  }, []);

  const emergencycontact = async () => {
    const contact = {
      name,
      number,
      relation,
    };

    try {
      const response = await axios.post(
        ` https://ba86-152-59-6-114.ngrok-free.app/patient/addemergencycontact/${id.patient_id}`,
        { contact }
      );
      console.log('response', response);
      profiledata();
      setName('');
      setNumber('');
      setRelation('');
    } catch (error) {
      console.log('error==', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.address}>Emergency Contact:</h2>

      <div style={styles.relationContainer}>
        <input
          style={styles.relationInput}
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.relationInput}
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          style={styles.relationInput}
          placeholder="Enter relation to patient"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />
      </div>

      <button style={styles.button} onClick={emergencycontact}>
        <span style={styles.buttonText}>Continue</span>
      </button>

      <div style={styles.infoContainer}>
        <span style={styles.emergencyText}>List of Emergency Numbers</span>
      </div>

      <div>
        {data.map((item) => (
          <div key={item._id} style={styles.List}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Number:</strong> {item.number}</p>
            <p><strong>Relation:</strong> {item.relation_to_patient}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
  },
  address: {
    fontSize: '20px',
    color: '#00BFFF',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  relationContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    marginBottom: '20px',
  },
  relationInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid black',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#005cb9',
    padding: '12px 40px',
    borderRadius: '40px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    padding: '12px',
    marginTop: '20px',
  },
  emergencyText: {
    fontSize: '18px',
    fontWeight: 700,
  },
  List: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: 'black',
  },
};
