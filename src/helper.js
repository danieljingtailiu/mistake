export const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const isPast = (someDate) => {
  const today = new Date();
  return someDate < today;
};

export const getTitleFromUrl = (redoURI) => {
  const spliceStart = redoURI.indexOf('problems/') + 'problems/'.length;
  const spliceEnd = redoURI.indexOf('/', spliceStart);
  let displayTitle = redoURI.slice(spliceStart, spliceEnd);
  const lastSlash = displayTitle.lastIndexOf('/');
  displayTitle = displayTitle.slice(lastSlash + 1);
  return displayTitle;
}

/**
 * 
 * @param {ISOString} startDate 
 * @param {ISOString} endDate 
 * @source https://stackoverflow.com/a/13904120
 * @returns difference in minutes
 */
function diffInMinutes(startDate, endDate) {
  // get total seconds between the times
  var delta = Math.abs(endDate - startDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60;  // in theory the modulus is not required
  return minutes;
}