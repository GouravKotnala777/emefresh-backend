import mongoose, { Model } from "mongoose";

export interface NutritionalFactsTypes{
    principle:string[];
    vitamins:string[];
    minerals:string[];
};

export interface ProductTypes {
    _id:mongoose.Schema.Types.ObjectId;
    name:string;
    price:number;
    category:"fresh"|"juice"|"frozen"|"smoothie";
    tag:string[];
    description?: string;
    image?: string;
    previewImages?: string[];
    stock?: number;
    weight?: string;
    volume?: string;
    ingredients?: string[];
    nutritionFacts?: NutritionalFactsTypes;
    servings:string;
    experience:string;
    rating: number;
    avgRating:number;
    numReviews: number;
    flavor?:string;
    warning?:string[];
    soldCount:number;
    returnCount:number;
};
export type CreateProductBodyTypes = Pick<ProductTypes, "name"|"price"|"description"|"category"|"weight"|"volume"|"servings"|"experience">&{tag:string; warning?:string; principle:string; vitamins:string; minerals:string;};
export type UpdateProductBodyTypes = Partial<Pick<ProductTypes, "name"|"price"|"description"|"category"|"weight"|"volume"|"stock"|"servings"|"experience">>&{tag?:string; warning?:string; principle:string; vitamins:string; minerals:string;};

const productSchema = new mongoose.Schema<ProductTypes>({
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["fresh", "juice", "frozen", "smoothie"],
    },
    description: { type: String },
    image: { type: String },
    previewImages: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    weight: { type: String },
    volume: { type: String },
    flavor: { type: String },
    ingredients: [{ type: String }],
    nutritionFacts: {
        principle:[{type:String}],
        vitamins:[{type:String}],
        minerals:[{type:String}]
    },
    servings: { type: String },
    experience: { type: String },
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