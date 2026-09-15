(() => {
const C=window.CLINIC;
const set=(sel,val)=>document.querySelectorAll(sel).forEach(e=>e.textContent=val);
set('[data-name]',C.name);set('[data-phone]',C.phone);set('[data-rating]',C.rating);set('[data-reviews]',C.reviewCount);set('[data-years]',C.experience);set('[data-address]',C.address);set('[data-hours]',C.hours);
document.querySelectorAll('[data-phone-link]').forEach(a=>a.href='tel:'+C.phone.replace(/[^\d+]/g,''));
document.querySelectorAll('[data-whatsapp-link]').forEach(a=>a.href='https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent('Hello Rai Dental Clinic, I would like to request a dental appointment.'));
document.querySelectorAll('[data-email-link]').forEach(a=>{ if(C.email) a.href='mailto:'+C.email; else a.removeAttribute('href'); });
Object.entries(C.stats).forEach(([k,v])=>document.querySelectorAll(`[data-stat="${k}"]`).forEach(e=>e.textContent=v));

const track=document.getElementById('services-track');
C.services.forEach((s,i)=>track.insertAdjacentHTML('beforeend',`<article class="service-card reveal"><div class="service-image"><img src="${s[3]}" alt="${s[0]}" loading="lazy"><span class="service-number">${String(i+1).padStart(2,'0')}</span></div><div class="service-body"><span class="service-tag">${s[2]}</span><h3>${s[0]}</h3><p>${s[1]}</p><a href="#contact">Discuss this treatment <i class="fa-solid fa-arrow-right"></i></a></div></article>`));

const tg=document.getElementById('team-grid');
C.doctors.forEach(d=>tg.insertAdjacentHTML('beforeend',`<article class="doctor reveal"><img src="${d[3]}" alt="${d[0]}" loading="lazy"><div class="doctor-body"><span class="doctor-role">${d[1]}</span><h3>${d[0]}</h3><p>${d[2]}</p><a class="doctor-link" href="#contact">Book a consultation <i class="fa-solid fa-arrow-right"></i></a></div></article>`));
const rg=document.getElementById('review-grid');
C.reviews.forEach(r=>rg.insertAdjacentHTML('beforeend',`<article class="review reveal"><div class="stars" aria-label="5 star review">★★★★★</div><p>“${r[2]}”</p><div class="review-person"><div class="avatar">${r[0][0]}</div><div><b>${r[0]}</b><span>${r[3]}</span></div></div></article>`));
const fq=document.getElementById('faq-list');
C.faqs.forEach((f)=>fq.insertAdjacentHTML('beforeend',`<div class="faq-item"><button class="faq-question" aria-expanded="false"><span>${f[0]}</span><span>+</span></button><div class="faq-answer"><p>${f[1]}</p></div></div>`));
fq.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.parentElement;const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.lastElementChild.textContent=open?'−':'+'}));

const schema={"@context":"https://schema.org","@type":"Dentist","name":C.name,"url":C.url,"telephone":C.phone,"address":{"@type":"PostalAddress","streetAddress":C.address,"addressLocality":C.city,"addressRegion":C.state,"postalCode":"560061","addressCountry":C.country},"geo":{"@type":"GeoCoordinates","latitude":C.latitude,"longitude":C.longitude},"openingHours":["Mo-Sa 10:00-14:00","Mo-Sa 17:00-20:00","Su 10:00-13:00"],"aggregateRating":{"@type":"AggregateRating","ratingValue":C.rating,"reviewCount":"397"},"medicalSpecialty":"Dentistry"};
document.getElementById('local-schema').textContent=JSON.stringify(schema);

document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'×':'☰'});
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.getElementById('booking-form')?.addEventListener('submit',e=>{
 e.preventDefault();
 const f=new FormData(e.currentTarget);
 const msg=`Hello Rai Dental Clinic, I would like to request an appointment.%0A%0AName: ${encodeURIComponent(f.get('name')||'')}%0APhone: ${encodeURIComponent(f.get('phone')||'')}%0APreferred time: ${encodeURIComponent(f.get('time')||'Not specified')}%0ATreatment: ${encodeURIComponent(f.get('service')||'Dental consultation')}%0AMessage: ${encodeURIComponent(f.get('message')||'')}`;
 window.open(`https://wa.me/${C.whatsapp}?text=${msg}`,'_blank','noopener');
 document.getElementById('form-message').textContent='WhatsApp opened with your appointment request.';
});

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.gsap && window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{opacity:0,y:36},{opacity:1,y:0,duration:.82,delay:(i%3)*.045,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 87%',once:true},onStart:()=>el.classList.add('revealed')}));
 const services=document.querySelector('.services'),st=document.querySelector('.services-track'),mm=gsap.matchMedia();
 mm.add('(min-width:901px) and (pointer:fine)',()=>{const dist=()=>Math.max(0,st.scrollWidth-window.innerWidth+60);const tween=gsap.to(st,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:services,start:'top top',end:()=>'+='+Math.max(dist()*.95,950),scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});gsap.utils.toArray('.service-card').forEach(card=>gsap.fromTo(card,{opacity:.35,scale:.94},{opacity:1,scale:1,ease:'none',scrollTrigger:{trigger:card,containerAnimation:tween,start:'left 92%',end:'left 62%',scrub:true}}));return()=>tween.kill()});
 
 let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>ScrollTrigger.refresh(),180)});
}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('revealed'));
})();
