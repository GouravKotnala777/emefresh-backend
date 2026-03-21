import mongoose, { Model } from "mongoose";

export interface LocationTypes{
    long:number;
    lat:number;
    address:string;
    timestamp:number;
};
export type OrderStatusType = "pending"|"delivered"|"cancelled"|"returned";
export type PaymentStatusType = "pending"|"success"|"failed"|"refunded";
export type ModeOfPaymentType = "cod"|"card";
export interface OrderTypes{
    _id:mongoose.Types.ObjectId;
    userID:mongoose.Types.ObjectId;
    products:{
        productID:mongoose.Types.ObjectId;
        price:number;
        quantity:number;
    }[];
    orderStatus:OrderStatusType;
    paymentStatus:PaymentStatusType;
    modeOfPayment:ModeOfPaymentType;
    totalAmount:number;
    location:LocationTypes;
    createdAt:string;
    updatedAt:string;
};
//export type CreateOrderFormTypes = Pick<OrderTypes, "userID"|"totalAmount"|"modeOfPayment"|"orderStatus"|"paymentStatus"|"location">&{products:string;}
export type CreateOrderFormTypes = Pick<OrderTypes, "products"|"totalAmount"|"modeOfPayment"|"orderStatus"|"paymentStatus"|"location">;
export type UpdateOrderFormTypes = Partial<Pick<OrderTypes, "orderStatus"|"paymentStatus">>&{orderID:mongoose.Schema.Types.ObjectId;};

const orderSchema = new mongoose.Schema<OrderTypes>({
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        productID:{
            type:mongoose.Types.ObjectId,
            ref:"Product",
            required:true
        },
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        }
    }],
    orderStatus:{
        type:String,
        enum:["pending", "delivered", "cancelled", "returned"],
        default:"pending"
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["pending", "success", "failed", "refunded"],
        default:"pending"
    },
    modeOfPayment:{
        type:String,
        enum:["cod", "card"],
        default:"cod"
    },
    location:{
        long:Number,
        lat:Number,
        address:String,
        timestamp:Number
    }
}, {timestamps:true});

const orderModel:Model<OrderTypes> = mongoose.models.Order || mongoose.model<OrderTypes>("Order", orderSchema);

export default orderModel;