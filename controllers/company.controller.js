import {Company} from "../models/company.model.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


// resgister company
export const registerCompany = async (req , res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }

        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"you can't register with the same company.",
                success:false
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        });

        return res.status(201).json({
            message:"company registered successfully",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }   
}

// Get company(or companies) of a user.... 
export const getCompany = async (req , res)=>{
    try {
        const userId = req.id; //used for login so that only his company or companies can be shown
        const companies =    await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Company not found."
                ,success:false
            })
        }  

        return res.status(200).json({
            companies ,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// getcompany by id of company
export const getCompanyById = async (req , res)=>{
    try {
        const companyId =  req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found."
                ,success:false
            })
        } 

        return res.status(200).json({
            company ,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

// update Company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        let logo;

        if (file) {
            const fileUri = getDataUri(file);
            if (!fileUri || !fileUri.content) {
                return res.status(400).json({
                    message: "Invalid file upload",
                    success: false
                });
            }
            const cloudRespose = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudRespose.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logo) updateData.logo = logo;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Data updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

