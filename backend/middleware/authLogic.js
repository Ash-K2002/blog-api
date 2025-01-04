const authorize=(allowAdmin=false)=> (req, res, next)=>{
    const user = req.user;
    const id = Number(req.params.userId);
    console.log(id);
    console.log(user.id);
    if(!id){
        return res.status(404).json({
            error: 'User id not found'
        });
    }

    if((allowAdmin && user.role==='ADMIN') || Number(user.id)===id){
        return next();
    }

    res.status(401).json({
        error: 'Unauthorized'
    });
}

export default {
    authorize,
}


