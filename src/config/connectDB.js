import mongoose from "mongoose";
function connect() {
  const mongodbURL =
    "mongodb+srv://kiendoba1905:kien2209@cluster0.pfrctsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
    .connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected!"));
}

export default connect;
