/** Single message shown when user clicks Yes */
export const toastMessageYes = 'You said yes!';

/** No-button runaway messages (id + message); one is chosen randomly when the No button moves */
export const toastMessagesNo = [
  { id: 1, message: 'No point of saying no' },
  { id: 2, message: 'You have to say yes' },
  { id: 3, message: 'Dominant relationship, cant say No' },
  { id: 4, message: 'You are stuck now' },
  { id: 5, message: 'Ladko ki Na mein haan hein' },
  { id: 6, message: 'System error: No option not supported' },
  { id: 7, message: 'Try again, but choose wisely 😌' },
  { id: 8, message: 'No is just Yes in denial' },
  { id: 9, message: 'Destiny says: click Yes' },
  { id: 10, message: 'Think again… slowly… now click Yes' },
  { id: 11, message: 'This button is only for decoration' },
  { id: 12, message: 'Oops! Wrong choice detected' },
  { id: 13, message: 'Free will temporarily unavailable' },
  { id: 14, message: 'Universe already decided 😏' },
  { id: 15, message: 'Why fight feelings?' },
  { id: 16, message: 'You know you want to say Yes' },
  { id: 17, message: 'Plot twist: No was never an option' },
  { id: 18, message: 'Market bohot kharab hai, HEHEH' },
  { id: 20, message: 'Heart already clicked Yes' },
];

export function getRandomNoMessage(): (typeof toastMessagesNo)[number] {
  return toastMessagesNo[Math.floor(Math.random() * toastMessagesNo.length)];
}
