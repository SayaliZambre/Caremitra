'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function HealthProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? JSON.parse(idParam) : null;

  console.log('id == ', id);

  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [disability, setDisability] = useState('');
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState('');
  const [emergencyContactPerson, setEmergencyContactPerson] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const healthprofileadd = async () => {
    try {
      console.log('first Api == enter');
      console.log('id.name', id.name);
      console.log('userId ==', id._id);

      const healthprofile = {
        dob,
        height,
        weight,
        anydisabilities: disability,
        anymedicalhistory: familyMedicalHistory,
        emergencyContactPerson,
        age,
        bloodGroup,
      };

      const response = await axios.post(
        ` https://ba86-152-59-6-114.ngrok-free.app/patient/addhealthprofile/${id.patient_id}`,
        { healthprofile }
      );

      console.log('response--=-=', response);
      router.push(`/question?patientId=${id.patient_id}&id=${encodeURIComponent(JSON.stringify(id))}`);
    } catch (error) {
      console.log('error==', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <p style={styles.interest}>
          We're interested in learning more about you. Please provide the following details.
        </p>
        <div style={styles.line} />

        {[
          { label: 'Address', state: disability, set: setDisability },
          { label: 'Date of Birth', state: dob, set: setDob, placeholder: 'DD/MM/YY' },
          { label: 'Height', state: height, set: setHeight },
          { label: 'Weight', state: weight, set: setWeight },
          { label: 'Age', state: age, set: setAge },
          { label: 'Blood Group', state: bloodGroup, set: setBloodGroup },
          { label: 'Any Disability', state: disability, set: setDisability },
          { label: 'Family Medical History', state: familyMedicalHistory, set: setFamilyMedicalHistory },
          { label: 'Emergency Contact Number', state: emergencyContactPerson, set: setEmergencyContactPerson },
        ].map(({ label, state, set, placeholder }, index) => (
          <div key={index}>
            <label style={styles.label}>{label}</label>
            <input
              style={styles.input}
              type="text"
              placeholder={placeholder || 'Enter your input here'}
              value={state}
              onChange={(e) => set(e.target.value)}
            />
          </div>
        ))}

        <button style={styles.button} onClick={healthprofileadd}>
          <span style={styles.buttonText}>Continue</span>
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  main: {
    maxWidth: '600px',
    width: '100%',
  },
  interest: {
    marginBottom: '20px',
    color: '#00BFFF',
    fontSize: '16px',
  },
  line: {
    height: '1px',
    backgroundColor: 'black',
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    border: '1px solid black',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
  },
  button: {
    backgroundColor: '#005cb9',
    padding: '15px',
    borderRadius: '25px',
    width: '100%',
    border: 'none',
    marginTop: '10px',
    cursor: 'pointer',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
