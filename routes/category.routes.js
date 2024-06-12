const category_controller=require("../controllers/category.controller")
auth_mw=require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/ecommerce/api/v1/categories",auth_mw.verifyToken,auth_mw.isAdmin,category_controller.createNewCategory)
}