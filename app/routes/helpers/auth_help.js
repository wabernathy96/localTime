module.exports = {
    loggedIn: (req,res,next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}

    


// async auth_instance (req, res, next) {
//     await req.isAuthenticated (
//         (user) => {
//             if(!user){
//                 return next(res.redirect('/'));
//             }else{
//                 return next(res.redirect('/dash'));
//             }
//         } 
//     );   
// }