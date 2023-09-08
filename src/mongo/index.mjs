import mongoose from "mongoose"

export const startConnection = async () => {
    const url = encodeURI("mongodb+srv://jhuly_vivas:E6qJtXtGsvmWh7q@cluster0.kdttu6h.mongodb.net/?retryWrites=true&w=majority");
    await mongoose.connect(url);
}