const booking="https://waterfront-retreat-direct-booking.guestybookings.com/en";
const amenities=[
["◌","Comfort",["Air conditioning","Heating","Private hot tub","Hot water","Wi-Fi","TV","Bed linens","Hair dryer"]],
["⌂","Kitchen & Dining",["Keurig coffee maker","Coffee, cream & sugar provided","Kitchenette","Mini fridge","Toaster","Air fryer","Basic cooking utensils","Dishes & silverware","Wine glasses","BBQ grill & utensils"]],
["≈","Outdoor & Lake",["Waterfront","Lake access","Kayaks","Paddle boat","Private fire pit on your deck","Shared fire pit by the lake","Outdoor shower","Outdoor dining","Outdoor furniture","Private patio or balcony"]],
["✓","Safety & Essentials",["Private entrance","Private living room","Free parking","Single-level home","Smoke alarm","Fire extinguisher","First aid kit","Life jackets provided","Board games","Bath essentials (shampoo, conditioner, body wash, hand soap & dish soap)"]]
];
const cabins={
"blue-heron":{number:"01",name:"Blue Heron Cabin",access:"Please note: Guests must use stairs to access this cabin. There is no step-free entrance.",card:"images/blue-heron.png",hero:"images/blue-heron-gallery/hot-tub-deck.jpg",tagline:"Romantic • Peaceful • Lakeside Adventure",intro:"A warm, intimate lakeside escape for two",copy:"Blue Heron Cabin sits quietly along Pickwick Lake, offering a warm, intimate escape for couples who want both relaxation and a touch of adventure. Mornings begin with soft light over the water, and days can be spent exploring the shoreline, wandering through nature, or simply enjoying the calm from your private porch.",highlight:"Private hot tub and outdoor shower",gallery:["bedroom-wide.jpeg","kitchenette.jpeg","bed-fireplace.jpeg","walk-in-shower.jpeg","sitting-area.jpeg","outdoor-shower.jpeg","coffee-bar.jpeg","reading-chairs.jpeg","bedroom.jpeg","bedroom-tv.jpeg","bathroom.jpeg"].map(x=>"images/blue-heron-gallery/"+x)},
"eagles-nest":{number:"02",name:"Eagle’s Nest",access:"Important: Stair access is required. Eagle’s Nest is elevated and can only be reached by climbing stairs. There is no step-free entrance, so it may not be suitable for guests with limited mobility.",card:"images/eagles-nest.png",hero:"images/eagles-nest-gallery/deck.jpg",tagline:"Adventurous • Elevated • Scenic",intro:"Your private lookout above the treetops",copy:"Perched above the treetops, Eagle’s Nest is designed for couples who love a mix of adventure and quiet connection. Wake up to wide lake views, spend the day exploring the water or nearby trails, and return to a cabin that feels like your own private lookout.",highlight:"Elevated deck with peaceful lake views",gallery:["bedroom-view.jpeg","outdoor-shower.jpeg","kitchenette-view.jpeg","bathroom.jpeg","bedroom.jpeg","cabin-interior.jpeg","coffee-bar.jpeg","holiday-coffee-bar.jpeg","hot-tub-patio.jpg"].map(x=>"images/eagles-nest-gallery/"+x)},
"butterfly-bungalow":{number:"03",name:"Butterfly Bungalow",access:"Please note: Guests must use stairs to access this cabin. There is no step-free entrance.",card:"images/butterfly-bungalow.png",hero:"images/butterfly-bungalow-gallery/hot-tub-deck.jpeg",tagline:"Romantic • Cozy • Whimsical",intro:"A whimsical hideaway filled with warmth",copy:"Soft, colorful, and full of charm, the Butterfly Bungalow is your intimate hideaway on Pickwick Lake. Designed for couples who crave connection and quiet moments, this cozy cabin wraps you in warmth from the moment you step inside. Enjoy slow mornings with coffee on the porch and peaceful evenings under the string lights.",highlight:"King bed, electric fireplace, and private hot tub",gallery:["bedroom-wide.jpeg","kitchenette.jpeg","bathroom.jpeg","porch.jpeg","hot-tub-patio.jpeg","sitting-area.jpeg","walk-in-shower.jpeg","interior.jpeg","lake-view.jpeg","bed-fireplace.jpeg","kitchen-bath.jpg"].map(x=>"images/butterfly-bungalow-gallery/"+x)}
};
const home=document.querySelector("#home-cabins");
if(home)home.innerHTML=Object.entries(cabins).map(([slug,c])=>`<article><div class="photo"><img src="${c.card}" alt="${c.name}"></div><div class="card-copy"><p class="feature">${c.tagline}</p><h3>${c.name}</h3><p>${c.copy}</p><div class="meta"><span>1 bedroom</span><span>1 bath</span><span>2 guests</span></div><div class="card-actions"><a href="cabin.html?c=${slug}">Explore cabin →</a><a href="${booking}">Book</a></div></div></article>`).join("");
const chooser=document.querySelector("#chooser-grid");
if(chooser)chooser.innerHTML=Object.entries(cabins).map(([slug,c])=>`<a class="chooser-card" href="cabin.html?c=${slug}"><img src="${c.card}" alt="${c.name}"><div class="chooser-shade"></div><span class="chooser-number">${c.number}</span><div class="chooser-copy"><p>${c.tagline}</p><h2>${c.name}</h2><span>${c.intro}</span><strong>Explore this cabin →</strong></div></a>`).join("");
const lake=document.querySelector("#lake-gallery");
if(lake){const pics=[["pickwick-lake.webp","Pickwick Lake"],["candlelight-hot-tub.webp","Candlelit soaks"],["lawn-lights.webp","Evenings on the lawn"],["sunset-seating.webp","Sunset by the water"],["hot-tub-evening.webp","Private evenings"],["fire-pit.webp","Fireside moments"],["heron.webp","Quiet wildlife"],["evening-entrance.webp","A warm welcome"],["lakeside-sunrise.webp","Slow mornings"],["starlit-drive.webp","Nights under the stars"]];lake.innerHTML=pics.map((p,i)=>`<figure class="${i<2?"lake-life-feature":""}"><img src="images/life-at-lake/${p[0]}" alt="${p[1]}" loading="lazy"><figcaption>${p[1]}</figcaption></figure>`).join("")}
const page=document.querySelector("#cabin-page");
if(page){const key=new URLSearchParams(location.search).get("c")||"blue-heron",c=cabins[key]||cabins["blue-heron"];document.title=`${c.name} | Waterfront Retreat`;page.innerHTML=`
<header class="detail-header"><a class="brand" href="./"><b>Waterfront Retreat</b><span>on Pickwick Lake</span></a><nav><a href="cabins.html">All cabins</a><a href="faq.html">FAQ</a><a href="./#contact">Contact</a><a class="nav-book" href="${booking}">Book now</a></nav></header>
<section class="detail-hero"><img src="${c.hero}" alt="${c.name}"><div class="overlay"></div><div class="detail-title"><p class="kicker light">${c.tagline}</p><h1>${c.name}</h1><p>${c.intro}</p></div></section>
<section class="detail-intro"><div><p class="kicker">Your private retreat</p><h2>${c.intro}</h2><p>${c.copy}</p><a class="btn gold" href="${booking}">Check dates & book</a><a class="faq-link" href="faq.html">Questions before you book? View our FAQs &rarr;</a></div><aside><span>Cabin highlight</span><strong>${c.highlight}</strong><div class="detail-meta"><span>1 bedroom</span><span>1 bathroom</span><span>2 adults</span></div></aside></section>
<section class="cabin-gallery"><div class="gallery-heading"><div><p class="kicker">Step inside</p><h2>Explore ${c.name}</h2></div><p>Take a closer look at your private cabin and peaceful outdoor spaces.</p></div><div class="gallery-grid">${c.gallery.map((src,i)=>`<figure class="${i===0||i===4?"gallery-feature":""}"><img src="${src}" alt="${c.name}" loading="lazy"></figure>`).join("")}</div></section>
<section class="amenities amenity-groups"><p class="kicker">Everything you need</p><h2>Cabin amenities</h2><p class="amenity-intro">Select a category to see what is included.</p><div class="access-notice"><p>Accessibility notice</p><p>${c.access}</p></div><div class="amenity-accordion">${amenities.map(g=>`<details class="amenity-drop"><summary><span class="amenity-drop-icon">${g[0]}</span><strong>${g[1]}</strong><span class="amenity-count">${g[2].length} amenities</span><span class="amenity-chevron">⌄</span></summary><ul>${g[2].map(x=>`<li>${x}</li>`).join("")}</ul></details>`).join("")}</div></section>
<section class="detail-cta"><p class="kicker light">Pickwick Lake is calling</p><h2>Make ${c.name} yours.</h2><p>View live availability and reserve securely through Guesty.</p><div class="actions"><a class="btn gold" href="${booking}">Book ${c.name}</a><a class="btn clear" href="cabins.html">Explore other cabins</a></div></section>
<footer><div class="brand"><b>Waterfront Retreat</b><span>on Pickwick Lake</span></div><p>Private waterfront cabins for couples ages 25 and up in Cherokee, Alabama.</p><div class="links"><a href="tel:+12563351827">256-335-1827</a><a href="mailto:info@waterfrontretreatonpickwicklake.com">info@waterfrontretreatonpickwicklake.com</a></div><small>© 2026 Waterfront Retreat on Pickwick Lake</small></footer>`}

(function(){
function openNotice(onContinue){
const el=document.createElement("div");
el.className="notice-overlay";
el.innerHTML='<div class="notice-box"><button class="notice-close" aria-label="Close">×</button><p class="kicker">Before you book</p><h3>A few good things to know</h3><ul><li>Guests must be 25 years or older to stay.</li><li>All cabins require a 2-night minimum stay.</li></ul><button class="btn gold notice-dismiss">Continue to booking →</button></div>';
document.body.appendChild(el);
const close=()=>el.remove();
const proceed=()=>{sessionStorage.setItem("wr-notice-seen","1");close();onContinue();};
el.querySelector(".notice-close").addEventListener("click",close);
el.querySelector(".notice-dismiss").addEventListener("click",proceed);
el.addEventListener("click",e=>{if(e.target===el)close();});
}
document.addEventListener("click",function(e){
const link=e.target.closest('a[href*="guestybookings.com"]');
if(!link)return;
if(sessionStorage.getItem("wr-notice-seen"))return;
e.preventDefault();
openNotice(()=>{window.location.href=link.href;});
});
})();
