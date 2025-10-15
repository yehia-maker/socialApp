import { Schema } from "mongoose";
import { IReaction } from "../../../utils/common/interface";
import { Reaction } from "../../../utils/common/enum";

export const recationSchema = new Schema<IReaction>({
    reaction:{
        type:Number,
        enum:Reaction,
        default:Reaction.like

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})