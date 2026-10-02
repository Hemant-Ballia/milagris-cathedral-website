'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        // Success
        router.push('/donate');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.card}>
            <h1 className={styles.title}>LOGIN</h1>
            
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>EMAIL</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>PASSWORD</label>
                <input 
                  type="password" 
                  className={styles.input} 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className={styles.errorText}>{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'AUTHENTICATING...' : 'LOGIN'}
              </button>

              <div className={styles.footerLinks}>
                <a href="#" className={styles.link}>Forgot password?</a>
                <a href="#" className={styles.link}>Create an account</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
