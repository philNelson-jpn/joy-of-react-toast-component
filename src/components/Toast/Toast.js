import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';
import { ToastContext } from '../ToastProvider/ToastProvider';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({id, variant, children}) {
  const Icon = ICONS_BY_VARIANT[variant]
  const {handleDismiss} = React.useContext(ToastContext)
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        {children}
        <VisuallyHidden>{`${variant}-`}</VisuallyHidden>
      </p>
      <button onClick={() => handleDismiss(id)} className={styles.closeButton}
      aria-label="Dismiss message" aria-live="off"
      >
        <X size={24} />
        
      </button>
    </div>
  );
}

export default Toast;
