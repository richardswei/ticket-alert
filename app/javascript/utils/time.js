function getLocalDate(dateTime, timezone) {
  const d = new Date(dateTime);
  const options = { weekday: 'short', year: 'numeric', month: 'short', timeZone: timezone, day: 'numeric'};
  return d.toLocaleDateString(undefined, options); 
}

function getLocalTime(dateTime, timezone) {
  const d = new Date(dateTime);
  const options = {hour: 'numeric', minute: 'numeric', timeZone: timezone, timeZoneName: 'short' };
  return d.toLocaleTimeString(undefined, options); 
}


export { getLocalTime, getLocalDate }; 
