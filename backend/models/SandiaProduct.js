import mongoose, { modelNames } from "mongoose";

const sandiaSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    header: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    shortDescription: {
        type: String,
    },
    description: {
        type: String,
    },
    specifications: [
        {
          key: String,
          value: String,
        },
      ],
      productImages: {
        type: [String],
        default: [],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
  modelNumber: String,
  warranty: String,
  includes: String,
  accessories: [
    {
      image: String,
      names: [String],
      modelNumbers: [String],  
    }
  ],
  replacementfilterbags: [
    {
        image:String,
        names: [String],
        modelNumbers: [String],
    }
  ],
  literature: {
    type: [String],
    default: [],
  },
  listPrice: {
    type: Number
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  
},{ timestamps: true });

const SandiaProduct = mongoose.model("SandiaProduct", sandiaSchema);
export default SandiaProduct;