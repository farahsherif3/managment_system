import connection from "../DB/connection.js"
import { globalError } from "./utils/errorHandler.js"
import employeeRouter from '../src/modules/Employee/employee.router.js'
import taskRouter from '../src/modules/Task/task.router.js'
import efficiencyKPIRouter from '../src/modules/EfficiencyKPI/efficiencyKPI.router.js'
import engagementKPIRouter from '../src/modules/EngagementKPI/engagementKPI.router.js'
import financialKPIRouter from '../src/modules/FinancialKPI/financialKPI.router.js'
import productivityKPIRouter from '../src/modules/ProductivityKPI/productivityKPI.router.js'
import qualityKPIRouter from '../src/modules/QualityKPI/qualityKPI.router.js'

const bootstrab=(app,express)=>{
 app.use((req,res,next)=>{
    if(req.originalUrl=='order/webhook'){
      return next();
    }else{
         express.json({})(req,res,next);
    }
   
 })

 app.use('/employee',employeeRouter)
 app.use('/task',taskRouter)
 app.use('/efficiencyKPI', efficiencyKPIRouter)
 app.use('/engagementKPI', engagementKPIRouter)
 app.use('/financialKPI', financialKPIRouter)
 app.use('/productivityKPI', productivityKPIRouter)
 app.use('/qualityKPI', qualityKPIRouter)
 app.use(globalError)
 connection()
}
export default bootstrab