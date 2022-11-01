import User from "../models/User.js";

const getAgent = async (req,res,next)=>{
    const agent = await User.findById(req.params.id);
    console.log(agent);
    if (agent.isAgent === true) {
        res.status(200).json(agent)
        //console.log('true')
    } else {
        res.status(500);
        //console.log('false')
    }
    //res.status(200).json(user);
}

const getAgents = async (req,res,next)=>{

    const agents = await User.find({
        $and: [
            { ['_id']: { ['$exists']: true } },
            { ['isAgent']: { ['$eq']: true } }
        ]
    })//.limit(20);
    res.status(200).json(agents);
}

export default { getAgent, getAgents }