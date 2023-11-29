
const CustomDateCellWrapper = ({ children, value, events }) => {
  const hasEvents = events && events.length > 0;

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {hasEvents && (
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      )}
    </div>
  );
};

export default CustomDateCellWrapper;