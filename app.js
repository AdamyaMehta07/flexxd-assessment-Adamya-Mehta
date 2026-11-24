const express= require('express');
const bookingRoutes= require('./routes/bookingRoutes');
const userRoutes= require('./routes/userRoutes');

const app= express();
const port= process.env.PORT || 3000;

app.use(express.json());
app.use('/bookings',bookingRoutes);
app.use('/users',userRoutes);

if(require.main === module){
    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
    });

}
module.exports = app;