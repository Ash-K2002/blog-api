const assignUserId=(req, res, next)=>{
    req.params.userId = req.user.id;
    next();
}

export default {
    assignUserId,
}