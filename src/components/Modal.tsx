import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  // Select the target DOM node outside the main React root
  const mountNode = document.getElementById('modal-root');

  if (!mountNode) return null;
  return createPortal(children, mountNode);
};

export const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      {/* Overlay: dims background and closes on click */}
      <div className='portal-overlay' onClick={onClose}>
        {/* Modal Content: prevent event bubbling so clicks inside don't close it */}
        <div className='portal-modal' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            className='xbtn portal-close'
            aria-label='Close dialog'
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
