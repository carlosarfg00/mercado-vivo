(function(root){
  'use strict';
  const round = n => Math.round((n + Number.EPSILON) * 100) / 100;
  function executeOrder(book,side,quantity,type,limit){
    if(!['buy','sell'].includes(side)||!['market','limit'].includes(type))throw new Error('Orden inválida');
    if(!Number.isInteger(quantity)||quantity<1||quantity>100)throw new Error('Cantidad inválida');
    if(type==='limit'&&!Number.isFinite(limit))throw new Error('Precio límite inválido');
    const levels=book.map(l=>({...l})).sort((a,b)=>side==='buy'?a.price-b.price:b.price-a.price);
    let left=quantity,cost=0;const fills=[];
    for(const l of levels){
      const eligible=type==='market'||(side==='buy'?l.price<=limit:l.price>=limit);
      if(!eligible)continue;
      const available=side==='buy'?l.ask:l.bid;
      const amount=Math.min(left,Math.max(0,available||0));
      if(amount){fills.push({price:l.price,quantity:amount});cost+=l.price*amount;left-=amount;if(side==='buy')l.ask-=amount;else l.bid-=amount;}
      if(!left)break;
    }
    return {filled:quantity-left,remaining:left,average:quantity===left?null:round(cost/(quantity-left)),cost:round(cost),fills,book:levels.sort((a,b)=>b.price-a.price),status:left?(type==='limit'?'pending':'unfilled'):'filled'};
  }
  function optionProfit(legs,price){return round(legs.reduce((sum,l)=>sum+l.quantity*(l.side==='buy'?1:-1)*((l.type==='call'?Math.max(price-l.strike,0):Math.max(l.strike-price,0))-l.premium),0));}
  function futuresProfit(side,entry,exit,quantity,multiplier){return round((exit-entry)*(side==='sell'?-1:1)*quantity*multiplier);}
  function cornOutcome(hedge,price){const crop=1000*price;return round(crop+(hedge==='future'?(5-price)*1000:hedge==='put'?Math.max(5-price,0)*1000-200:0));}
  function sanitizeSave(input,ids){
    if(!input||input.version!==1||typeof input!=='object')throw new Error('Esta partida no es compatible');
    const bounded=(n,max)=>Number.isFinite(n)?Math.max(0,Math.min(max,Math.floor(n))):0;
    const completed=Array.isArray(input.completed)?[...new Set(input.completed.filter(id=>ids.includes(id)))]:[];
    // Restore only a contiguous progression; imported gaps cannot unlock later lessons.
    const sequential=[];for(const id of ids){if(completed.includes(id))sequential.push(id);else break;}
    return {version:1,completed:sequential,lives:bounded(input.lives,3),coins:bounded(input.coins,99999),scores:Object.fromEntries(sequential.map(id=>[id,bounded(input.scores&&input.scores[id],100)])),position:{x:Number.isFinite(input.position&&input.position.x)?Math.max(30,Math.min(930,input.position.x)):480,y:Number.isFinite(input.position&&input.position.y)?Math.max(40,Math.min(570,input.position.y)):360},seenWelcome:!!input.seenWelcome,look:input.look==='coral'?'coral':'purple'};
  }
  const api={round,executeOrder,optionProfit,futuresProfit,cornOutcome,sanitizeSave};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MVEngine=api;
})(typeof window==='undefined'?this:window);
