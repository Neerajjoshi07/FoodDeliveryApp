const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE;
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_item");
            fetched_data.find({}).toArray(async function (err, data) {

                const foodCategory= await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData){
                    if (err) console.log(err);
                    else {
                        global.food_item = data;
                        global.food_category = catData;
                    }
                })

                // if (err) console.log(err);
                // else {
                //     global.food_item = data;
                
                // }
            })
        }

    });

}

module.exports = mongoDB;

