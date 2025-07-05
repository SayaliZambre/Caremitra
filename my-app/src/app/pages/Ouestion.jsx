'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Question() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const patientId = searchParams.get('patientId');
  const idParam = searchParams.get('id');
  const id = idParam ? JSON.parse(idParam) : null;

  console.log('patientId==', patientId);
  console.log('id:', id);

  const [chronic, setChronic] = useState('');
  const [serious, setSerious] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medications, setMedications] = useState('');

  const question = async () => {
    try {
      const healthprofile = {
        anychronicdiseases: chronic,
        anyallergies: serious,
        anyundergoingtreatment: symptoms,
        anycurrentmedications: medications,
      };

      const response = await axios.post(
        ` https://ba86-152-59-6-114.ngrok-free.app/patient/addhealthprofile2/${id.patient_id}`,
        { healthprofile2: healthprofile }
      );

      console.log('response', response);
      router.push(`/tab?id=${JSON.stringify(id)}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <h2 style={styles.title}>Health Profile Setup</h2>

        <div style={styles.block}>
          <label style={styles.label}>
            Do you have any chronic medical conditions? If yes, please specify:
          </label>
          <textarea
            placeholder="Enter your input"
            value={chronic}
            onChange={(e) => setChronic(e.target.value)}
            style={styles.input}
            rows={3}
          />
        </div>

        <div style={styles.block}>
          <label style={styles.label}>
            Have you been diagnosed with any serious medical conditions for which you are undergoing treatment?
          </label>
          <textarea
            placeholder="Enter your input"
            value={serious}
            onChange={(e) => setSerious(e.target.value)}
            style={styles.input}
            rows={3}
          />
        </div>

        <div style={styles.block}>
          <label style={styles.label}>
            Are you currently experiencing any symptoms of illness such as cough, fever, or fatigue?
          </label>
          <textarea
            placeholder="Enter your input"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            style={styles.input}
            rows={3}
          />
        </div>

        <div style={styles.block}>
          <label style={styles.label}>
            Are you currently taking any medications, vitamins, or supplements on a regular basis?
          </label>
          <textarea
            placeholder="Enter your input"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            style={styles.input}
            rows={3}
          />
        </div>

        <button onClick={question} style={styles.button}>
          <span style={styles.buttonText}>Continue</span>
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '700px',
    padding: '20px',
  },
  title: {
    fontSize: '20px',
    color: '#00BFFF',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  block: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    display: 'block',
    marginBottom: '8px',
    color: 'black',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#005cb9',
    padding: '16px 60px',
    borderRadius: '40px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
