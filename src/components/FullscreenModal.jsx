export function FullscreenModal({
  isOpen,
  onClose,
  className = '',
  closeAriaLabel = 'Close dialog',
  children
}) {
  return (
    <div
      className={`${className} candle-overlay ${isOpen ? 'open' : ''}`}
      role='dialog'
      aria-modal='true'
      aria-hidden={!isOpen}
    >
      <button
        type='button'
        className='xbtn candle-close'
        aria-label={closeAriaLabel}
        onClick={onClose}
        style={{ position: 'absolute', top: 18, right: 18, zIndex: 10 }}
      >
        {/* visual "x" comes from CSS pseudo-element */}
      </button>
      {children}
    </div>
  );
}