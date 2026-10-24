from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json,html,textwrap
R=Path(__file__).resolve().parents[1];D=R/'public/images/generated';A=R/'output/imagegen/originals';A.mkdir(parents=True,exist_ok=True)
items=[]
sources=sorted(D.glob('[0-9][0-9]-*.png')) or sorted(A.glob('[0-9][0-9]-*.png'))
for p in sources:
 im=Image.open(p).convert('RGB');dest=D/(p.stem+'.webp');im.save(dest,'WEBP',quality=88,method=6)
 items.append({'name':p.stem,'src':'/images/generated/'+dest.name,'width':im.width,'height':im.height,'bytes':dest.stat().st_size,'provenance':'AI-generated concept imagery; not completed client work or exact product sample'})
 if p.parent!=A:p.replace(A/p.name)
assert len(items)==15
(R/'output/imagegen/assets.json').write_text(json.dumps(items,indent=2))
sheet=Image.new('RGB',(1800,1530),'#11130f');draw=ImageDraw.Draw(sheet)
try:font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',18)
except:font=ImageFont.load_default()
cards=[]
for i,item in enumerate(items):
 p=R/'public'/item['src'].lstrip('/');im=Image.open(p);thumb=ImageOps.fit(im,(348,240));x=(i%5)*360+6;y=(i//5)*490+60;sheet.paste(thumb,(x,y));draw.multiline_text((x,y+250),'\n'.join(textwrap.wrap(item['name'].replace('-',' '),27)),font=font,fill='#f0eee8',spacing=5)
 cards.append(f'<figure><a href="{item["src"]}"><img loading="lazy" src="{item["src"]}" alt="{html.escape(item["name"])}"></a><figcaption>{html.escape(item["name"].replace("-"," "))}</figcaption></figure>')
draw.text((16,16),'HMD STONE / 15 GENERATED CONCEPT IMAGES',font=font,fill='#f0eee8');sheet.save(D/'contact-sheet.jpg',quality=92)
(R/'public/generated-gallery.html').write_text('''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>HMD Stone / Image collection</title><style>body{margin:40px;background:#11130f;color:#f0eee8;font:16px system-ui}h1{font-weight:400}p{color:#c6a782}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:24px}figure{margin:0}img{display:block;width:100%;aspect-ratio:3/2;object-fit:cover}figcaption{padding:12px 0}</style></head><body><h1>HMD Stone / Image collection</h1><p>15 coordinated AI-generated concept images. Click an image for full resolution.</p><div class="grid">'''+''.join(cards)+'</div></body></html>')
print('Prepared',len(items),'WebP assets;',round(sum(x['bytes'] for x in items)/1e6,2),'MB total')
