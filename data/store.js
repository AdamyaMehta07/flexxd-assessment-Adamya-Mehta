const users = [
  { id: 1, name: "Alex", credits: 5 },
  { id: 2, name: "Adam", credits: 1 }
];

const venues = [
  { id: 101, name: "Community Hall", pricePerVisit: 1, dailyCapacity: 10 },
  { id: 102, name: "gym", pricePerVisit: 1, dailyCapacity: 5 }
];

const bookings = [];

module.exports = { users, venues, bookings };