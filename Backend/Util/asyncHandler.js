export const asyncHandler=(fn)=> async (req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        console.log("Error");
        res.status(error.code ||500).json(
            {success:false,
                message:error.message
            }
        )

    }
}



