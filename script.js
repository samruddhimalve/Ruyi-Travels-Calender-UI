const bookings = [
  { id: 1, date: "2026-11-02", time: "07:00 AM", title: "BKC Mumbai Corporate Pickup", subtitle: "Luxury Tempo Traveller boarding...", category: "Transport", customer: "Rohit Joshi", initials: "RJ", destination: "Manali Resort Stay", status: "Confirmed", pax: 4, duration: "3N/4D", dates: "2 Nov – 5 Nov", budget: "₹48,000", location: "Manali, India", phone: "+91 98220 77889", lead: "Website Enquiry", description: "Luxury group transfer and resort stay for a family holiday.", guests: [{name:"Rohit Joshi", detail:"Age 35 • Primary Contact"}, {name:"Aditi Joshi", detail:"Age 33 • Spouse"}, {name:"Vihaan Joshi", detail:"Age 7 • Child"}, {name:"Isha Joshi", detail:"Age 4 • Child"}] },
  { id: 2, date: "2026-11-02", time: "10:30 AM", title: "Lonavala Offsite Venue Arrival", subtitle: "Expressway drive & safe arrival...", category: "Transport", customer: "Sunita Deshmukh", initials: "SD", destination: "Mumbai – Pune Luxury Traveller", status: "Pending", pax: 2, duration: "2 Days", dates: "2 Nov – 3 Nov", budget: "₹20,000", location: "Pune, India", phone: "+91 98220 77889", lead: "Phone Referral", description: "17-seater Force Urbania luxury transfer for corporate offsite.", guests: [{name:"Sunita Deshmukh",detail:"Age 42 • Primary Contact"},{name:"Aarav Deshmukh",detail:"Age 15 • Family"}] },
  { id: 3, date: "2026-11-02", time: "All day", title: "Mumbai – Pune Luxury Transfer", subtitle: "Mumbai to Pune Expressway • ...", category: "Transport", customer: "Sunita Deshmukh", initials: "SD", destination: "Mumbai – Pune Luxury Traveller", status: "Pending", pax: 2, duration: "2 Days", dates: "2 Nov – 3 Nov", budget: "₹20,000", location: "Pune, India", phone: "+91 98220 77889", lead: "Phone Referral", description: "17-seater Force Urbania luxury transfer for corporate offsite.", guests: [{name:"Sunita Deshmukh",detail:"Age 42 • Primary Contact"},{name:"Aarav Deshmukh",detail:"Age 15 • Family"}] },
  { id: 4, date: "2026-11-03", time: "09:30 AM", title: "Solang Valley Snow Excursion", subtitle: "Cable car & snow activities • 4...", category: "Activities", customer: "Rohit Joshi", initials: "RJ", destination: "Solang Valley Excursion", status: "Pending", pax: 4, duration: "1 Day", dates: "3 Nov", budget: "₹12,000", location: "Manali, India", phone: "+91 98220 77889", lead: "Website Enquiry", description: "Cable car, snow activities and sightseeing excursion.", guests: [{name:"Rohit Joshi",detail:"Age 35 • Primary Contact"},{name:"Aditi Joshi",detail:"Age 33 • Spouse"},{name:"Vihaan Joshi",detail:"Age 7 • Child"},{name:"Isha Joshi",detail:"Age 4 • Child"}] },
  { id: 5, date: "2026-11-03", time: "All day", title: "Trip ends: Mumbai – Pune Transfer", subtitle: "Mumbai to Pune Expressway • ...", category: "Transport", customer: "Sunita Deshmukh", initials: "SD", destination: "Mumbai – Pune Luxury Traveller", status: "Pending", pax: 2, duration: "2 Days", dates: "2 Nov – 3 Nov", budget: "₹20,000", location: "Pune, India", phone: "+91 98220 77889", lead: "Phone Referral", description: "Return transfer at the end of the corporate offsite.", guests: [{name:"Sunita Deshmukh",detail:"Age 42 • Primary Contact"},{name:"Aarav Deshmukh",detail:"Age 15 • Family"}] },
  { id: 6, date: "2026-11-05", time: "10:00 AM", title: "Check-out & Mall Road Transfer", subtitle: "Luggage assistance & depart...", category: "Transport", customer: "Rohit Joshi", initials: "RJ", destination: "Manali Resort Stay", status: "Pending", pax: 4, duration: "3N/4D", dates: "2 Nov – 5 Nov", budget: "₹48,000", location: "Manali, India", phone: "+91 98220 77889", lead: "Website Enquiry", description: "Hotel check-out, luggage assistance and transfer to Mall Road.", guests: [{name:"Rohit Joshi",detail:"Age 35 • Primary Contact"},{name:"Aditi Joshi",detail:"Age 33 • Spouse"},{name:"Vihaan Joshi",detail:"Age 7 • Child"},{name:"Isha Joshi",detail:"Age 4 • Child"}] },
  { id: 7, date: "2026-11-06", time: "11:00 AM", title: "Hotel Check-in – Riverside Resort", subtitle: "Room allocation and welcome...", category: "Hotel", customer: "Neha Shah", initials: "NS", destination: "Riverside Resort", status: "Confirmed", pax: 3, duration: "2N/3D", dates: "6 Nov – 8 Nov", budget: "₹32,000", location: "Lonavala, India", phone: "+91 98765 43210", lead: "Instagram", description: "Resort stay with breakfast and local sightseeing.", guests: [{name:"Neha Shah",detail:"Age 31 • Primary Contact"},{name:"Kunal Shah",detail:"Age 32 • Spouse"},{name:"Mira Shah",detail:"Age 5 • Child"}] }
];

const weekStrip = document.getElementById("week-strip");
const weekLabel = document.getElementById("week-label");
const agenda = document.getElementById("agenda");
const backdrop = document.getElementById("modal-backdrop");
const sheetContent = document.getElementById("sheet-content");
const tabs = document.getElementById("tabs");
let selectedDate = new Date(2026, 10, 5);
let weekStart = new Date(2026, 10, 1);
let activeCategory = "Transport";
let activeBooking = bookings[0];
let activeTab = "customer";
let touchStartX = 0;

const pad = n => String(n).padStart(2, "0");
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const sameDay = (a,b) => dateKey(a) === dateKey(b);
const shortDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function weekDates(start) { return Array.from({length:7}, (_,i) => { const d = new Date(start); d.setDate(start.getDate()+i); return d; }); }
function countForDay(date) { return bookings.filter(b => b.date === dateKey(date)).length; }
function dotClass(count) { return count >= 3 ? "busy" : count > 0 ? "light" : ""; }

function renderWeek() {
  const days = weekDates(weekStart);
  const end = days[6];
  weekLabel.textContent = `WEEK ${Math.ceil(days[0].getDate()/7)} • ${days[0].getDate()} ${monthShort[days[0].getMonth()].toUpperCase()} – ${end.getDate()} ${monthShort[end.getMonth()].toUpperCase()}`;
  weekStrip.innerHTML = days.map(d => {
    const count = countForDay(d);
    return `<button class="day-cell ${sameDay(d,selectedDate)?"selected":""} ${dotClass(count)}" data-date="${dateKey(d)}">
      <span class="day-name">${shortDays[d.getDay()]}</span><span class="day-number">${d.getDate()}</span><i class="dot"></i>
    </button>`;
  }).join("");
}
function updateCategoryCounts() {
  const key = dateKey(selectedDate);
  document.querySelectorAll(".category-pill").forEach(pill => {
    const category = pill.dataset.category;
    const count = bookings.filter(b => b.date === key && b.category === category).length;
    const countEl = pill.querySelector("span");
    if (countEl) countEl.textContent = count;
  });
}
function renderAgenda() {
  const matchesCategory = b => activeCategory === "All" || b.category === activeCategory;
  const visibleDays = weekDates(weekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Show every date in the visible week that has matching commitments.
  // This mirrors the reference: dates are stacked vertically, each with its own agenda.
  const grouped = visibleDays.map(day => ({
    day,
    items: bookings
      .filter(b => b.date === dateKey(day) && matchesCategory(b))
      .sort((a, b) => a.time === "All day" ? 1 : b.time === "All day" ? -1 : a.time.localeCompare(b.time))
  })).filter(group => group.items.length > 0);

  if (!grouped.length) {
    agenda.innerHTML = "";
    return;
  }

  agenda.innerHTML = grouped.map(({day, items}) => {
    const isToday = sameDay(day, new Date(2026, 10, 5));
    const heading = isToday ? `Today, ${day.getDate()} ${monthShort[day.getMonth()]}` :
      `${shortDays[day.getDay()]}, ${day.getDate()} ${monthShort[day.getMonth()]}`;
    return `<div class="date-group">
      <div class="date-group-heading"><span>${heading}</span><small>${items.length} ${items.length===1?"item":"items"}　⌄</small></div>
      ${items.map(b => `<div class="booking-row"><span class="time-label">${b.time}</span><button class="booking-card" data-id="${b.id}">
        <span class="transport-icon">${b.category==="Hotel"?"⌂":b.category==="Activities"?"✧":"▣"}</span>
        <span class="booking-info"><strong>${b.title}</strong><span>${b.subtitle}</span></span>
        <span class="status-pill">${b.status}</span><span class="chevron">›</span>
      </button></div>`).join("")}
    </div>`;
  }).join("");
}
function selectDate(key) { selectedDate = new Date(`${key}T12:00:00`); renderWeek(); updateCategoryCounts(); renderAgenda(); }
function changeWeek(direction) {
  weekStrip.classList.add("changing");
  setTimeout(() => {
    weekStart.setDate(weekStart.getDate() + direction*7);
    selectedDate = new Date(weekStart);
    renderWeek(); updateCategoryCounts(); renderAgenda();
    weekStrip.classList.remove("changing");
  }, 120);
}
document.getElementById("prev-week").addEventListener("click", () => changeWeek(-1));
document.getElementById("next-week").addEventListener("click", () => changeWeek(1));
weekStrip.addEventListener("click", e => { const cell = e.target.closest("[data-date]"); if(cell) selectDate(cell.dataset.date); });
document.querySelector(".category-row").addEventListener("click", e => {
  const pill = e.target.closest("[data-category]"); if(!pill) return;
  activeCategory = pill.dataset.category;
  document.querySelectorAll(".category-pill").forEach(p => p.classList.toggle("active",p===pill));
  renderAgenda();
});
agenda.addEventListener("click", e => { const card = e.target.closest("[data-id]"); if(card) openBooking(Number(card.dataset.id)); });
const weekViewport = document.getElementById("week-viewport");
let weekPointerStart = null;
weekViewport.addEventListener("pointerdown", e => {
  weekPointerStart = { x: e.clientX, y: e.clientY, id: e.pointerId };
});
weekViewport.addEventListener("pointerup", e => {
  if (!weekPointerStart) return;
  const dx = e.clientX - weekPointerStart.x;
  const dy = e.clientY - weekPointerStart.y;
  if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.15) {
    changeWeek(dx < 0 ? 1 : -1);
  }
  weekPointerStart = null;
});
weekViewport.addEventListener("pointercancel", () => { weekPointerStart = null; });
weekViewport.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
weekViewport.addEventListener("touchend", e => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if(Math.abs(delta)>42) changeWeek(delta<0?1:-1);
}, {passive:true});

function openBooking(id) {
  activeBooking = bookings.find(b => b.id === id) || bookings[0];
  activeTab = "customer";
  document.getElementById("sheet-avatar").textContent = activeBooking.initials;
  document.getElementById("sheet-name").textContent = activeBooking.customer;
  document.getElementById("sheet-destination").textContent = activeBooking.destination;
  document.getElementById("sheet-status").textContent = `● ${activeBooking.status}`;
  document.getElementById("sheet-status").className = `status ${activeBooking.status.toLowerCase()}`;
  document.getElementById("sheet-meta").textContent = `♙ ${activeBooking.pax} Pax　◷ ${activeBooking.duration}　▢ ${activeBooking.dates}`;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active",t.dataset.tab==="customer"));
  renderTab();
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeBooking() { backdrop.classList.remove("open"); document.body.style.overflow = ""; }
document.getElementById("close-sheet").addEventListener("click", closeBooking);
backdrop.addEventListener("click", e => { if(e.target===backdrop) closeBooking(); });
document.addEventListener("keydown", e => { if(e.key==="Escape") closeBooking(); });
const tabOrder = ["customer", "guests", "itinerary", "updates"];
function switchTab(nextTab) {
  if (!tabOrder.includes(nextTab) || nextTab === activeTab) return;
  const oldIndex = tabOrder.indexOf(activeTab);
  const nextIndex = tabOrder.indexOf(nextTab);
  const direction = nextIndex > oldIndex ? "from-right" : "from-left";
  activeTab = nextTab;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active",t.dataset.tab===nextTab));
  const activeButton = document.querySelector(`.tab[data-tab="${nextTab}"]`);
  activeButton?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
  renderTab(direction);
}
tabs.addEventListener("click", e => {
  const tab = e.target.closest("[data-tab]"); if(!tab) return;
  switchTab(tab.dataset.tab);
});

let sheetTouchStart = null;
sheetContent.addEventListener("touchstart", e => {
  const t = e.changedTouches[0];
  sheetTouchStart = {x:t.clientX, y:t.clientY};
}, {passive:true});
sheetContent.addEventListener("touchend", e => {
  if (!sheetTouchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - sheetTouchStart.x;
  const dy = t.clientY - sheetTouchStart.y;
  if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    const current = tabOrder.indexOf(activeTab);
    const next = Math.max(0, Math.min(tabOrder.length - 1, current + (dx < 0 ? 1 : -1)));
    if (next !== current) switchTab(tabOrder[next]);
  }
  sheetTouchStart = null;
}, {passive:true});

function renderTab(animationDirection = "") {
  const b = activeBooking;
  if(activeTab==="customer") {
    sheetContent.innerHTML = `<div class="info-card">
      <div class="section-title"><span>♙　Customer Information</span><button class="edit-link">♢ Edit</button></div>
      <div class="field-grid">
        <div class="field"><label>Customer Name</label><strong>${b.customer}</strong></div>
        <div class="field"><label>Email</label><strong>${b.customer.toLowerCase().replace(" ",".")}@gmail.com</strong></div>
        <div class="field"><label>Primary Contact</label><strong>${b.phone}</strong></div>
        <div class="field"><label>Lead Source</label><strong>${b.lead}</strong></div>
        <div class="field"><label>Travel Dates</label><strong>${b.dates} 2026</strong></div>
        <div class="field"><label>Location</label><strong>${b.location}</strong></div>
        <div class="field"><label>Preferred Destination</label><strong>${b.destination}</strong></div>
        <div class="field"><label>Budget (Est.)</label><strong>${b.budget}</strong></div>
        <div class="field"><label>Customer Type</label><strong>Corporate Group</strong></div>
        <div class="field"><label>Status</label><strong><span class="status ${b.status.toLowerCase()}">● ${b.status} Approval</span></strong></div>
      </div>
      <div class="detail-note"><strong>▤　Short Details</strong><br>${b.description}</div>
    </div>
    <div class="section-title">➤　Lead Flow / Journey</div>
    <div class="timeline-item"><div class="timeline-dot">♧</div><div><strong>Vehicle Availability Checked</strong><span>By Admin<br>Force Urbania AC traveller available with operator</span></div></div>
    <div class="timeline-item"><div class="timeline-dot">✓</div><div><strong>Customer Enquiry Received</strong><span>Booking details and travel requirements recorded</span></div></div>`;
  } else if(activeTab==="guests") {
    sheetContent.innerHTML = `<div class="info-card"><div class="section-title"><span>▤　Special Requirements</span><button class="edit-link">♢ Edit</button></div><div class="requirements"><span class="requirement">☻ Kid Friendly Activities</span><span class="requirement">♧ Baby Crib / Cot</span><span class="requirement">▱ 2 Connecting Rooms</span></div></div>
      <div class="guest-tools"><input class="guest-search" id="guest-search" placeholder="⌕  Search guest..." /><button class="add-guest" id="add-guest">＋ Add Guest</button></div>
      <div id="guest-list">${guestMarkup(b.guests)}</div>`;
    document.getElementById("guest-search").addEventListener("input", e => {
      const q=e.target.value.toLowerCase();
      document.getElementById("guest-list").innerHTML=guestMarkup(b.guests.filter(g=>g.name.toLowerCase().includes(q)));
    });
    document.getElementById("add-guest").addEventListener("click", () => {
      const name=prompt("Enter guest name:"); if(!name || !name.trim()) return;
      b.guests.push({name:name.trim(),detail:"Guest • Newly added"});
      renderTab();
    });
  } else if(activeTab==="itinerary") {
    sheetContent.innerHTML = `<div class="info-card"><div class="section-title"><span>▤　Trip Itinerary</span><button class="edit-link">♢ Edit</button></div>
      <div class="timeline-item"><div class="timeline-dot">1</div><div><strong>Arrival & Check-in</strong><span>${b.dates.split("–")[0].trim()} • Hotel check-in and welcome assistance</span></div></div>
      <div class="timeline-item"><div class="timeline-dot">2</div><div><strong>Local Experience</strong><span>Guided sightseeing, activities and leisure time</span></div></div>
      <div class="timeline-item"><div class="timeline-dot">3</div><div><strong>Departure & Transfer</strong><span>Check-out, luggage assistance and onward transfer</span></div></div></div>`;
  } else {
    sheetContent.innerHTML = `<div class="section-title">▤　Booking Updates</div>
      <div class="timeline-item"><div class="timeline-dot">●</div><div><strong>${b.status} booking request</strong><span>Today • Booking status is currently ${b.status.toLowerCase()}</span></div></div>
      <div class="timeline-item"><div class="timeline-dot">✉</div><div><strong>Customer details saved</strong><span>Customer information and guest details added</span></div></div>
      <div class="timeline-item"><div class="timeline-dot">＋</div><div><strong>New enquiry created</strong><span>Enquiry received through ${b.lead}</span></div></div>`;
  }
  if (animationDirection) {
    sheetContent.classList.remove("tab-enter-right", "tab-enter-left");
    void sheetContent.offsetWidth;
    sheetContent.classList.add(animationDirection === "from-right" ? "tab-enter-right" : "tab-enter-left");
  }
}
function guestMarkup(guests) {
  if(!guests.length) return `<div class="empty-state">No guests found.</div>`;
  return guests.map((g,i)=>`<div class="guest-row"><span class="guest-number">${i+1}</span><span class="guest-description"><strong>${g.name}</strong><span>${g.detail}</span></span><button class="guest-action" aria-label="Call ${g.name}">♧</button><button class="guest-action" aria-label="More options">⋮</button></div>`).join("");
}
document.getElementById("confirm-booking").addEventListener("click", () => {
  activeBooking.status = "Confirmed";
  document.getElementById("sheet-status").textContent = "● Confirmed";
  document.getElementById("sheet-status").className = "status confirmed";
  renderAgenda();
  alert("Booking marked as confirmed (demo).");
});
renderWeek();
updateCategoryCounts();
renderAgenda();
