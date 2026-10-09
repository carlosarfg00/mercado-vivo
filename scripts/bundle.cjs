const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync(path.join(root,'dist/style.css'),'utf8')+'</style>');
for(const name of ['engine.js','missions.js','app.js'])html=html.replace(`<script src="${name}"></script>`,()=>'<script>'+fs.readFileSync(path.join(root,'dist',name),'utf8')+'</script>');
fs.writeFileSync(path.join(root,'Jugar.html'),html);
console.log('Jugar.html actualizado. Abre este archivo en tu navegador.');
