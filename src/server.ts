import app from "./app.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";




app.route("/").get((req, res) => {
    res.status(200).json({success:true, message:`server is running...`});
});
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);