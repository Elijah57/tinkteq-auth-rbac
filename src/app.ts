import express, {Express} from "express";
import cors from "cors"
import { isAdmin, isLoggedIn, isShipper, isCarrier, hasRole } from "./middlewares/authMiddleware";
import { authRouter, adminRouter} from "./routes";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware";

export const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/admin", authRouter)

// simulating RBAC on  routes

// Admin route
app.get('/api/v1/admin/dashboard', isLoggedIn, isAdmin, (req, res) => {
    res.send('Welcome to the Admin Dashboard!');
});

// Shipper route
app.get('/api/v1/shipper/dashboard', isLoggedIn, isShipper, (req, res) => {
    res.send('Welcome to the Shipper Dashboard!');
});

// Carrier route
app.get('/api/v1/carrier/dashboard', isLoggedIn, isCarrier, (req, res) => {
    res.send('Welcome to the Carrier Dashboard!');
});

// Shipper or Carrier route
app.get('/api/v1/workplace/dashboard', isLoggedIn, hasRole("shipper", "carrier"), (req, res) => {
    res.send('Welcome to the Workplace- Shippers and Carriers !');
});


app.use(routeNotFound);
app.use(errorHandler);
