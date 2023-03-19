export default function ToTimeString(timestamp){

console.log(timestamp)
   
const date = new Date(timestamp * 1000); // Convert to milliseconds
const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero to minutes if necessary
const amOrPm = date.getHours() < 12 ? 'AM' : 'PM'; // Determine AM/PM
const timeString = hours + ':' + minutes + ' ' + amOrPm; // Combine into a string
return timeString


}