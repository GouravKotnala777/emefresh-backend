import mongoose, { Model } from "mongoose";

export interface ProductTypes {
    _id:mongoose.Schema.Types.ObjectId;
    name:string;
    price:number;
    category:"fresh"|"juice"|"frozen"|"smoothie";
    tag:string[];
    description?: string;
    images?: string[];
    stock?: number;
    weight?: string;
    volume?: string;
    ingredients?: string[];
    nutritionFacts?: {
        servingSize: string;
        servingsPerContainer: number;
        protein: number;
        carbs: number;
        fat: number;
        calories: number;
    };
    rating: number;
    avgRating:number;
    numReviews: number;
    flavor?:string;
    warning?:string[];
    soldCount:number;
    returnCount:number;
};
export type CreateProductBodyTypes = Pick<ProductTypes, "name"|"price"|"description"|"category"|"weight"|"volume"|"tag">

const productSchema = new mongoose.Schema<ProductTypes>({
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["fresh", "juice", "frozen", "smoothie"],
    },
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    weight: { type: String },
    volume: { type: String },
    flavor: { type: String },
    ingredients: [{ type: String }],
    nutritionFacts: {
      servingSize: { type: String },
      servingsPerContainer: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fat: { type: Number },
      calories: { type: Number },
    },
    rating: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    tag:[{
        type:String
    }],
    warning:[{
        type:String
    }],
    soldCount:{
        type:Number,
        default:0
    },
    returnCount:{
        type:Number,
        default:0
    }

}, {
    timestamps:true
});

const productModel:Model<ProductTypes> = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;