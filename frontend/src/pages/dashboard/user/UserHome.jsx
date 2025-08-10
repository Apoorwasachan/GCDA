

import React, { useState } from 'react';

const UserHomePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const user = {
    name: 'Apoorwa Sachan',
    email: 'user@example.com',
    role: 'Employee',
  };

  const vulnerabilities = [
    'Outdated Antivirus Definitions',
    'Unpatched Operating System',
    'Weak Password Detected',
  ];

  const policies = [
    {
      title: 'Data Encryption Policy',
      description: 'Ensure all sensitive data is encrypted at rest and in transit.',
    },
    {
      title: 'Access Control Policy',
      description: 'Limit access based on user roles and responsibilities.',
    },
  ];

  const helpContacts = [
    {
      role: 'Admin',
      name: 'Raj Verma',
      email: 'admin@example.com',
    },
    {
      role: 'Security Analyst',
      name: 'Riya Sharma',
      email: 'analyst@example.com',
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2f3e46',
        color: 'white',
        padding: '1rem 2rem'
      }}>
        <h2>User Dashboard</h2>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {user.name} ▼
          </button>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              marginTop: '0.5rem',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '200px',
              zIndex: 10
            }}>
              <div style={{ padding: '0.5rem 1rem' }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  borderTop: '1px solid #ccc',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Vulnerabilities Card */}
          <div style={{ flex: 1, minWidth: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem',
             backgroundColor: 'white'
           }}>
            <h3 className="font-bold">Vulnerabilities in Your System</h3>
            <ul>
              {vulnerabilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Policies Card */}
          <div style={{ flex: 1, minWidth: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' ,
             backgroundColor: 'white'
          }}>
            <h3 className="font-bold">Security Policies to Follow</h3>
            {policies.map((policy, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <h4>{policy.title}</h4>
                <p>{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Help Section */}
      <footer style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderTop: '1px solid #ccc',
        marginTop: 'auto'
      }}>
        <h4 className="font-bold"> Help & Support</h4>
        <ul>
          {helpContacts.map((contact, idx) => (
            <li key={idx}>
              <strong>{contact.role}:</strong> {contact.name} – <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default UserHomePage;



