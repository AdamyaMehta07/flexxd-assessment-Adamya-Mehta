# Flexxd – Pay-Per-Visit Booking API

A simple backend service for a fitness app where users can book visits to fitness venues using their available credits and redeem their bookings when they arrive.

Built as part of the Flexxd Full Stack Developer Technical Assessment using Node.js and Express.

## Features

- Create bookings using a user ID and venue ID.
- Automatically deduct one credit when a booking is created.
- Generate a unique 8-character alphanumeric redemption code.
- Redeem bookings using their redemption code.
- Prevent already redeemed bookings from being redeemed again.
- Check venue daily booking capacity.
- Fetch user details, current credits, and booking history.
- Handle invalid requests and missing users or venues with appropriate status codes.

## Tech Stack

- Node.js
- Express.js
- JavaScript
- In-memory data storage

## Project Structure

```text
flexxd-assessment-Adamya-Mehta/
│
├── data/
│   └── store.js
│
├── routes/
│   ├── bookingRoute.js
│   └── userRoute.js
│
├── app.js
├── package.json
├── package-lock.json
├── assumptions.md
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <https://github.com/AdamyaMehta07/flexxd-assessment-Adamya-Mehta.git>
```

### 2. Navigate to the project folder

```bash
cd flexxd-assessment-Adamya-Mehta
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server will start on the configured port.

## API Endpoints

### 1. Create a Booking

**POST** `/bookings`

Creates a booking for a user at a selected venue.

Request body:

```json
{
  "userId": 1,
  "venueId": 101
}
```

The API checks whether the user and venue exist, whether the user has enough credits, and whether the venue has available daily capacity.

If all checks pass, one credit is deducted and a new booking is created with a unique redemption code.

### 2. Redeem a Booking

**POST** `/bookings/redeem`

Redeems an existing booking using its redemption code.

Request body:

```json
{
  "redemptionCode": "AB12CD34"
}
```

The booking is marked as redeemed if the code exists and has not already been used.

### 3. Get User Details

**GET** `/users/:id`

Returns the user's details, current credits, and all bookings associated with that user.

Example:

```http
GET /users/1
```

The endpoint validates the user ID and returns an appropriate error if the ID is invalid or the user does not exist.

## Assumptions

- D1. One booking costs exactly 1 credit no matter what the venue price per visit is

2. 'daily capacity' = max bookings per venue per day

3. a user can book the same venue more than once a day bcz it is not mentioned in the brief

4. a redemption code has to be unique and random and anybody with the redemtion code can access it

5. code expires after 10 minutes and after the minutes not credits will be refunded

## Testing

The API endpoints were tested using HTTP requests to verify booking creation, credit deduction, booking redemption, user details, and error handling. with postman

## Future Improvements

- Replace in-memory storage with MongoDB or PostgreSQL.
- Add authentication and authorization.
- Add automated tests for all endpoints.
- Introduce booking expiry and detailed redemption tracking.
-

---

**Built by:** Adamya Mehta

**Project:** Flexxd Technical Assessment – Full Stack Developer