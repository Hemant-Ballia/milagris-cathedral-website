'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import styles from './page.module.css';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      setError('Please enter a valid donation amount greater than 0.');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing since no real payment gateway exists
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          <div className={`${styles.successState} ${success ? styles.show : ''}`}>
            <h2 className={styles.blessTitle}>Bless You</h2>
            <p className={styles.blessText}>
              Thank you for supporting<br/>Milagris Cathedral Sawantwadi.
            </p>
            <p className={styles.blessSubtext}>
              Your generosity helps us continue our work of faith, worship and community.
            </p>
            <a href="/" className={styles.returnBtn}>RETURN HOME</a>
          </div>

          <div className={`${styles.formState} ${success ? styles.hide : ''}`}>
            <h1 className={styles.title}>Support Our Cathedral</h1>
            <p className={styles.subtitle}>
              Your donations help support the cathedral, parish activities, maintenance, worship and community work.
            </p>
            
            <form onSubmit={handleDonate} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DONATION AMOUNT</label>
                <div className={styles.currencyWrapper}>
                  <span className={styles.currency}>₹</span>
                  <input 
                    type="number" 
                    className={`${styles.input} ${styles.amountInput}`} 
                    placeholder="Enter amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>NAME (OPTIONAL)</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>EMAIL (OPTIONAL)</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className={styles.errorText}>{error}</p>}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'PROCESSING...' : 'DONATE'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
