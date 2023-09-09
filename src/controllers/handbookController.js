import handbookService from '../services/handbookService';

let handleCreateHandbook = async (req, res) => {
    try {
        let data = await handbookService.createHandbook(req.body);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let handleGetHandbook = async (req, res) => {
    try {
        let data = await handbookService.getHandbook();
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let handleGetDetailByIdHandbook = async (req, res) => {
    try {
        let infor = await handbookService.getDetailByIdHandbook(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

module.exports = {
    handleCreateHandbook: handleCreateHandbook,
    handleGetHandbook: handleGetHandbook, handleGetDetailByIdHandbook
}