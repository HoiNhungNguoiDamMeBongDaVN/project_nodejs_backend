import countService from '../services/countService';


let handleCountDashboard = async (req, res) => {
    try {
        let data = await countService.countDashboard();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}




module.exports = {
    handleCountDashboard
}