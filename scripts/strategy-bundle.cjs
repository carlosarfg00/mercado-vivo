const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist','strategy');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync(path.join(dist,'style.css'),'utf8')+'</style>');
for(const file of ['engine.js','app.js'])html=html.replace('<script src="'+file+'"></script>',()=>'<script>'+fs.readFileSync(path.join(dist,file),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
html=html.replace('href="../../Jugar.html"','href="Jugar.html"');
fs.writeFileSync(path.join(root,'Estrategia.html'),html);console.log('Estrategia.html listo');
