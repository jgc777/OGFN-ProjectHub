const express = require('express');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const path = require('path');
const projectSchema = require('./schema.json');
const projects = require('./projects.json');

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(projectSchema);
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/builds', express.static(path.join(__dirname, 'builds')));
app.use('/contact', express.static(path.join(__dirname, 'contact')));

const prefixes = { discord:'https://discord.gg/', youtube:'https://youtube.com/@', twitter:'https://twitter.com/', x:'https://x.com/', tiktok:'https://tiktok.com/@', github:'https://github.com/' };

function makeDescription(proj) {
  let parts = [`${proj.name} is a OG Fortnite`];
  if (!proj.flags);
  else if (proj.flags.includes('hub')) parts.push(`hub.`);
  else if (proj.flags.includes('community')) parts.push(`community.`);
  else if (proj.flags.includes('hosting')) parts.push(`hosting.`);
  else if (proj.flags.includes('launcher')) parts.push(`launcher.`);
  else if (proj.flags.includes('privateserver')) parts.push(`private server.`);
  else if (proj.flags.includes('gameserver')) parts.push(`gameserver.`);
  else if (proj.flags.includes('backend')) parts.push(`backend.`);
  else if (proj.flags.includes('utility')) parts.push(`utility.`);
  
if (proj.partner && proj.name !== "Project Hub") parts.push(`\nThis project is a Project Hub partner.`);
  if (proj.more) parts.push(proj.more);
  return parts.join(' ');
}

app.get('/', (req, res) => {
  let list = Object.entries(projects);
  list.sort((a,b)=> (b[1].partner?1:0)-(a[1].partner?1:0) || a[1].name.localeCompare(b[1].name));
  res.render('home',{list});
});

app.get('/:projectId', (req, res, next) => {
  let proj = projects[req.params.projectId]; if(!proj) return next();
  if(!validate({[req.params.projectId]:proj})) return res.status(500).send('Invalid data');
  res.render('project',{id:req.params.projectId,proj,prefixes,desc:makeDescription(proj),projects});
});
app.use((req,res)=>res.status(404).render('404'));
app.listen(3000,()=>console.log('Running'));