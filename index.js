import express from "express"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js/dist/index.cjs"

const app = express()
const port = 3000


//lit le fichier .env
dotenv.config()

//on utilise le moteur template ejs
app.set("view engine" ,"ejs")

//mes assets et mon style sont dans le dossier public
app.use(express.static('public'))

//bien traiter les donnes envoyees
app.use(express.urlencoded({extended: true}))

//base de donnée :
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)


app.get('/', async (req, res) => {
    const { data, error } = await supabase
    .from('Todo')
    .select('*')

    console.log(data)
  res.render("home.ejs" ,{"user" : user})
})


//route qui affiche le formulaire pour creer une tache
app.get("/ajouter", (req,rep)=>{

    rep.render("ajouter.ejs")
})


app.post("/ajouter",(req,res)=>{

   //console.log(req.body)
    await supabase.from('todo').insert(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



