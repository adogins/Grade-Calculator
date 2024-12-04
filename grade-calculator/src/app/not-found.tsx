import React from "react";
import Link from "next/link";
import styles from "./error-page.module.css"; // Add CSS if needed

const NotFound = () => {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorMessage}>
        Oops! The page you're looking for doesn't exist. Please go back to the home page and try again.
      </p>
      <Link href="/" className={styles.homeLink}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;