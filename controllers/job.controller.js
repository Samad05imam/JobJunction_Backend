import{Job} from "../models/job.model.js"
import{Company} from "../models/company.model.js"

// for recruiter
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(" , "),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),  // ✅ Ensure it's a Number
            position: Number(position),
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job posted successfully",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
// for students
export const getAllJob = async(req , res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}},

            ]
        }

        const job = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});

        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
// for students
export const getJobById = async (req , res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message:"Job not found .",
                success:false
            })
        }

        return res.status(200).json({
            job , 
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
// for admin/recruiter :how many jobs are created by an admin
export const getAdminJobs=async(req , res)=>{
   try {
  const adminId = req.id; // Make sure this is the MongoDB ObjectId
  const jobs = await Job.find({ created_by: adminId }).populate({
    path:'company',
    createdAt:-1,
  }); // ✔️ Use find() here

  if (!jobs || jobs.length === 0) {
    return res.status(404).json({
      message: "Jobs not found.",
      success: false,
    });
  }

  return res.status(200).json({ jobs, success: true });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Internal Server Error", success: false });
}

} 