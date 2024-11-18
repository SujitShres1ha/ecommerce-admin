import multiparty from 'multiparty'
export default async function handle(req,res){
  if (req.method === 'POST'){
    const form = new multiparty.Form()
    form.parse(req, function(err,fields,files){
      if (err) throw err
      res.json(files);
    })
    
  }
    
}
export const config = {
  api: {
    bodyParser: false
  }
}

