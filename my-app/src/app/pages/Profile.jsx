'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Profile() {
  const searchParams = useSearchParams();
  const feedDataRaw = searchParams.get('feedData');
  const feedData = feedDataRaw ? JSON.parse(feedDataRaw) : {};

  const [data, setData] = useState<any>({});
  const [healthprofile, setHealthprofile] = useState<any>({});
  const [healthprofile2, setHealthprofile2] = useState<any>({});

  const profiledata = async () => {
    try {
      const response = await axios.get(
        ` https://ba86-152-59-6-114.ngrok-free.app/patient/${feedData.patient_id}`
      );
      console.log('response==', response);
      setData(response.data.patient);
      setHealthprofile(response.data.patient.healthprofile[0] || {});
      setHealthprofile2(response.data.patient.healthprofile2[0] || {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    profiledata();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Patient Profile</h1>
        <div style={styles.headerLine} />
      </div>

      <div style={styles.profileInfo}>
        <Image
          src="/dummy.png"
          alt="Profile"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <div style={styles.container}>
          <p style={styles.name}>Name : {data?.firstName}</p>
          <p style={styles.number}>Mobile No : {data?.mobileNumber}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subtitle}>Personal:</h3>
        <p style={styles.infoText}>Gender: Male text</p>
        <p style={styles.infoText}>Adharno: {data?.mobileNumber}</p>
        <p style={styles.infoText}>Address: {data?.mobileNumber}</p>
      </div>

      <div style={styles.blackLine}></div>

      <div style={styles.comp1}>
        <div style={styles.section}>
          <h3 style={styles.subtitle}>Physical:</h3>
          <p style={styles.infoText}>Age: {healthprofile?.age}</p>
          <p style={styles.infoText}>Weight: {healthprofile?.weight} kg</p>
          <p style={styles.infoText}>Height: {healthprofile?.height} cm</p>
          <p style={styles.infoText}>Disability: {healthprofile?.anydisabilities}</p>
          <p style={styles.infoText}>Bloodgroup: {healthprofile?.bloodGroup}</p>
        </div>
      </div>

      <div style={styles.blackLine} />

      {/* Uncomment if needed
      <div style={styles.section}>
        <h3 style={styles.subtitle}>Emergency Contact details:</h3>
        <p style={styles.infoText}>
          {data?.emergencycontact?.contact1?.name}: 91 {data?.emergencycontact?.contact1?.number}
        </p>
        <p style={styles.infoText}>
          {data?.emergencycontact?.contact2?.name}: 91 {data?.emergencycontact?.contact2?.number}
        </p>
      </div>
      <div style={styles.blackLine} />
      */}

      <div style={styles.section}>
        <h3 style={styles.subtitle}>Medical history:</h3>
        <p style={styles.infoText}>Disease: {healthprofile2?.anychronicdiseases}</p>
        <p style={styles.infoText}>Allergy: {healthprofile2?.anyallergies}</p>
        <p style={styles.infoText}>Current medicine: {healthprofile2?.anyundergoingtreatment}</p>
        <p style={styles.infoText}>Undergoing Treatment: {healthprofile2?.anycurrentmedications}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: '20px',
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: '10px',
  },
  headerLine: {
    width: '50px',
    height: '2px',
    backgroundColor: '#00b3ff',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    marginBottom: '30px',
    gap: '20px',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  number: {
    fontSize: '14px',
  },
  section: {
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4dd6e6',
    marginBottom: '10px',
  },
  infoText: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  blackLine: {
    borderBottom: '1px solid black',
    marginBottom: '20px',
  },
  comp1: {
    paddingLeft: '20px',
  },
};
