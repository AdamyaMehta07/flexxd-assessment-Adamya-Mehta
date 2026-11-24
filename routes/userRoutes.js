const express = require('express');
const { users, bookings } = require('../data/store');

const router = express.Router();

router.get('/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ message: 'valid user id required' });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }

    const userBookings = bookings.filter((booking) => booking.userId === userId);

    return res.status(200).json({
        message: 'user retrieved successfully',
        data: { user, bookings: userBookings }
    });
});

module.exports = router;