// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema(
//     {
//         propType: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         condition: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         city: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         street: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         houseNumber: {
//             type:Number,
//         },
//         floor: {
//             type:Number,
//             required:true,
//         },
//         floorsInBuilding: {
//             type:Number,
//             required:true,
//         },
//         onBars: {
//             type:Boolean,
//         },
//         neighborhood: {
//             type:String,
//             trim:true
//         },
//         area: {
//             type:String,
//             trim:true
//         },
//         rooms: {
//             type:Number,
//             required:true,
//             min:[0,'Numbers of rooms cant be negative']
//         },
//         parking: {
//             type:Number,
//         },
//         balcony: {
//             type:Number,
//         },
//         airCondition: {
//             type:Boolean,
//         },
//         mamad: {
//             type:Boolean,
//         },
//         warehouse: {
//             type:Boolean,
//         },
//         pandor: {
//             type:Boolean,
//         },
//         furnished: {
//             type:Boolean,
//         },
//         accessible: {
//             type:Boolean,
//         },
//         elevator: {
//             type:Boolean,
//         },
//         tadiran: {
//             type:Boolean,
//         },
//         remaked: {
//             type:Boolean,
//         },
//         kasher: {
//             type:Boolean,
//         },
//         sunEnergy: {
//             type:Boolean,
//         },
//         bars: {
//             type:Boolean,
//         },
//         photos:[ ],
//         photosLength:{
//             type:Number,
//             default:function(){
//                 return this.photos.length
//             }
//         },
//         video:{
//             type:String
//         },
//         description: {
//             type:String,
//             trim:true
//         },
//         buildMr: {
//             type:Number,
//         },
//         totalMr: {
//             type:Number,
//             required:true,
//         },
//         price: {
//             type:Number,
//         },
//         entryDate: {
//             type:Date,
//             default:undefined,
//             required:function(){
//                 if(this.immidiate===true)
//                     return false;
//                 else
//                     return true
//             },
//         },
//         immidiate: {
//             type:Boolean,
//             default:false,
//             required:function(){
//                 if(this.entryDate==undefined)
//                     return true;
//                 else
//                     return false
//             },
//         },
//         contactName: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         contactPhone: {
//             type:String,
//             required:true,
//             trim:true
//         },
//         contactEmail: {
//             type:String,
//             trim:true
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;