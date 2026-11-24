const express= require('express');
const crypto =require("crypto");
const {users,venues,bookings} =require('../data/store');

const router = express.Router();

const CODE_TTL_MS= Number(process.env.CODE_TTL_MS) || 10*60*1000;


//POST /booking
router.post('/',(req,res)=>{
    const {userId,venueId}= req.body;
    

    if(!Number.isInteger(userId)|| !Number.isInteger(venueId)){
        return res.status(400).json({
            message:'valud userid and venue id required'
        })
    }

    const user=users.find((u)=>u.id ===userId);

    if(!user){
        return res.status(404).json({
            message: 'user not found'
        })
    }

    const venue=venues.find((v)=>v.id===venueId);
    if(!venue){
        return res.status(404).json({
            message: 'venue not found'
        })
    }

    if(user.credits<1){
        return res.status(400).json({
            message: 'insuficient credits'
        })
    }

    const today = new Date().toISOString().slice(0,10);
    const todayBookings= bookings.filter((b)=>b.venueId === venueId && b.bookingDate === today);
    if(todayBookings.length>= venue.dailyCapacity){
        return res.status(409).json({message:"venue daily capacity is full"});
    }

    let redemptionCode;

    do{
        redemptionCode= crypto.randomBytes(6).toString('hex').toUpperCase();
    }while(bookings.some((b)=>b.redemptionCode === redemptionCode));

    const now= new Date();
    const booking ={
        id: crypto.randomUUID(),
        userId,
        venueId,
        bookingDate: today,
        redemptionCode,
        redeemed:false,
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + CODE_TTL_MS).toISOString(),
        redeemedAt: null
    };

    user.credits -=1;
    bookings.push(booking);

    return res.status(201).json({
        message : 'booking is created successfully',
        data: {booking, remainingCredits:user.credits},
    });
});

router.post('/redeem',(req,res)=>{
    const {redemptionCode}=req.body;

    if(typeof redemptionCode !== 'string' || !redemptionCode.trim()){
        return res.status(400).json({
            message: 'valid redemption code requires'
        });
    }

    const booking =bookings.find((b)=>b.redemptionCode === redemptionCode.trim());
    if(!booking){
        return res.status(404).json({
            message:"booking not found"
        });
    }

    if(booking.redeemed){
        return res.status(409).json({
            message: 'booking is already redeemed'
        });
    }

    if(new Date()>new Date(booking.expiresAt)){
        return res.status(410).json({
            message: "redemption code has expired"
        });
    }

    booking.redeemed= true;
    booking.redeemedAt= new Date().toISOString();

    return res.status(200).json({
        message: "booking redeemed sucessfully",
        data: booking,
    });

});

module.exports =router;