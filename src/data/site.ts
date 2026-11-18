// Shared content for the Dr. Vira Bolok website.
// Text is copied verbatim from the Claude Design handoff (design/*.dc.html).

export const routes = {
  home: '/',
  about: '/about/',
  services: '/services/',
  book: '/book/',
  faq: '/faq/',
  blog: '/blog/',
  contact: '/contact/',
  svcNewborn: '/services/newborn-neonatal-care/',
  svcWellBaby: '/services/well-baby-growth-monitoring/',
  svcVaccines: '/services/child-vaccinations/',
  svcIllnesses: '/services/common-childhood-illnesses/',
  svcHighRisk: '/services/high-risk-infant-follow-up/',
  postVaccines: '/blog/baby-vaccination-schedule/',
  postFever: '/blog/when-fever-needs-a-doctor/',
  postMilestones: '/blog/developmental-milestones-first-year/',
} as const;

export type NavId = 'home' | 'about' | 'services' | 'book' | 'faq' | 'blog' | 'contact' | '';

export const phones = {
  cumc: { display: '0927 428 6149', tel: 'tel:+639274286149', sms: 'sms:+639274286149' },
  mrxu: { display: '0935 289 4650', tel: 'tel:+639352894650', sms: 'sms:+639352894650' },
};

const mapUrl = (q: string) => 'https://www.google.com/maps/search/?api=1&query=' + q;

export const maps = {
  cumc: mapUrl('Capitol+University+Medical+Center+Cagayan+de+Oro'),
  mrxu: mapUrl('Maria+Reyna+Xavier+University+Hospital+Cagayan+de+Oro'),
  jrb: mapUrl('J.R.+Borja+General+Hospital+Cagayan+de+Oro'),
  madonna: mapUrl('Madonna+and+Child+Medical+Center+Cagayan+de+Oro'),
};

/** Header dropdown / mobile menu service links */
export const navServices = [
  { title: 'Newborn & Neonatal Care', href: routes.svcNewborn },
  { title: 'Well-Baby & Growth Monitoring', href: routes.svcWellBaby },
  { title: 'Child Vaccinations & Immunization', href: routes.svcVaccines },
  { title: 'Common Childhood Illnesses', href: routes.svcIllnesses },
  { title: 'High-Risk Infant Follow-up', href: routes.svcHighRisk },
];

/** Clinic cards (Home "Two clinics" section and Contact page) */
export const clinics = [
  {
    name: 'Capitol University Medical Center',
    short: 'CUMC',
    address: 'Room 206B, Gusa Highway, Cagayan de Oro City',
    openDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    rows: [{ days: 'Mon, Tue, Thu, Fri', time: '9:00 AM – 12:00 PM' }],
    phone: phones.cumc.display,
    tel: phones.cumc.tel,
    sms: phones.cumc.sms,
    map: maps.cumc,
  },
  {
    name: 'Maria Reyna–Xavier University Hospital',
    short: 'Maria Reyna–XU Hospital',
    address: 'Room 547, Cagayan de Oro City',
    openDays: ['Tue', 'Thu', 'Fri'],
    rows: [
      { days: 'Tue & Thu', time: '3:00 – 5:00 PM' },
      { days: 'Fri', time: '1:00 – 5:00 PM' },
    ],
    phone: phones.mrxu.display,
    tel: phones.mrxu.tel,
    sms: phones.mrxu.sms,
    map: maps.mrxu,
  },
];

export const weekDays = [
  { name: 'Mon', short: 'M' },
  { name: 'Tue', short: 'T' },
  { name: 'Wed', short: 'W' },
  { name: 'Thu', short: 'T' },
  { name: 'Fri', short: 'F' },
  { name: 'Sat', short: 'S' },
];

export type Faq = { q: string; a: string };

const faq = {
  walkIn: { q: 'Do I need an appointment, or do you accept walk-ins?', a: 'We recommend booking ahead to avoid long wait times, though walk-ins may be accommodated depending on the clinic’s schedule that day. Call the clinic beforehand to check availability.' },
  bring: { q: 'What should I bring to my child’s first visit?', a: 'Please bring your child’s birth certificate or health records (if available), any previous vaccination card or immunization history, and a list of current medications or known allergies, if any. If your child was born prematurely or had a NICU stay, bringing discharge summaries or specialist notes helps Dr. Vira give more informed care.' },
  age: { q: 'At what age can I start bringing my baby to see Dr. Vira?', a: 'As a board-certified neonatologist, Dr. Vira provides care for newborns from their very first days of life, including premature and high-risk infants. There’s no minimum age — many parents bring their babies in for their first checkup within the first week after birth.' },
  vaccines: { q: 'Does Dr. Vira follow the standard vaccination schedule?', a: 'Yes. Dr. Vira provides complete childhood immunizations following the recommended vaccination schedule, helping protect your child against preventable diseases at every stage of growth.' },
  nicu: { q: 'My baby was born premature or spent time in the NICU. Can Dr. Vira help with follow-up care?', a: 'Yes — this is one of Dr. Vira’s specific areas of expertise. Her neonatology sub-specialty includes ongoing monitoring and follow-up care for high-risk and premature infants after they leave the hospital, tracking their growth and development closely during this critical period.' },
  location: { q: 'Can I choose which clinic location to visit?', a: 'Yes. Dr. Vira sees patients at Capitol University Medical Center and Maria Reyna–Xavier University Hospital — choose whichever is more convenient, and check each clinic’s schedule on the “Where to Find Dr. Vira” section of this site.' },
} satisfies Record<string, Faq>;

/** Home page FAQ preview (4 questions) */
export const homeFaqs: Faq[] = [faq.walkIn, faq.bring, faq.age, faq.nicu];
/** FAQ page and About page (6 questions) */
export const allFaqs: Faq[] = [faq.walkIn, faq.bring, faq.age, faq.vaccines, faq.nicu, faq.location];

/* ------------------------------------------------------------------ */
/* Blog posts                                                          */
/* ------------------------------------------------------------------ */

export type PostSection = {
  h?: string;
  p: string;
  list?: string[];
  gallery?: { src: string; alt: string; pos: string }[];
};

export type Post = {
  slug: string;
  href: string;
  title: string;
  category: 'Vaccines' | 'Childhood illnesses' | 'Growth & development';
  tag: { bg: string; fg: string };
  date: string;
  isoDate: string;
  read: string;
  excerpt: string;
  img: string;
  alt: string;
  pos: string;
  lead: string;
  sections: PostSection[];
  serviceTitle: string;
  serviceHref: string;
};

export const posts: Record<'vaccines' | 'fever' | 'milestones', Post> = {
  vaccines: {
    slug: 'baby-vaccination-schedule',
    href: routes.postVaccines,
    title: 'A Simple Guide to Your Baby’s Vaccination Schedule',
    category: 'Vaccines',
    tag: { bg: '#EAF3FB', fg: '#1F5F8F' },
    date: 'August 12, 2026',
    isoDate: '2026-08-12',
    read: '2 min read',
    excerpt: 'With so many shots recommended at different ages, it’s easy for parents to feel a little lost. Here’s a clear breakdown of what to expect and why each vaccine matters.',
    img: '/images/baby-injection-n.webp',
    alt: 'A baby receiving a vaccine while held by a parent',
    pos: '30% 40%',
    lead: 'Vaccinations are one of the most effective tools we have to protect children from serious, preventable diseases. But with so many shots recommended at different ages, it’s easy for parents to feel a little lost. Here’s a simple breakdown of what to expect.',
    sections: [
      { h: 'Why Vaccines Matter', p: 'Vaccines work by helping your child’s immune system recognize and fight off specific diseases before they ever get sick from them. Following the recommended schedule ensures your child is protected at the ages when they’re most vulnerable to certain illnesses.' },
      { h: 'What to Expect at Each Stage', gallery: [{ src: '/images/vaccine-leg.webp', alt: 'A newborn receiving a vaccine in the thigh', pos: '60% center' }, { src: '/images/vaccine-arm.webp', alt: 'A baby receiving a vaccine in the upper arm', pos: '55% center' }], p: 'Your child’s vaccination schedule generally starts right after birth and continues through several checkups in their first two years, with booster shots at certain ages after that. Rather than memorizing every date yourself, Dr. Vira will review what’s due at each visit and let you know what’s coming up next.' },
      { h: 'Common Questions Parents Ask', p: 'It’s normal to have questions — about side effects, about combining multiple vaccines in one visit, or about what to do if a dose was missed. Mild side effects like a low fever or soreness at the injection site are common and usually resolve within a day or two. If your child has missed a scheduled vaccine, a catch-up schedule can be planned to get back on track safely.' },
      { h: 'Keeping Track', p: 'Dr. Vira keeps a record of your child’s immunization history at every visit, so you’ll always know exactly what’s been given and what’s next, no guesswork required.' },
      { p: 'If it’s time for your child’s next vaccine, or if you’d like to go over their immunization history, we’re happy to help you stay on schedule.' },
    ],
    serviceTitle: 'Child Vaccinations & Immunization',
    serviceHref: routes.svcVaccines,
  },
  fever: {
    slug: 'when-fever-needs-a-doctor',
    href: routes.postFever,
    title: 'Signs Your Child’s Fever Needs a Doctor’s Visit',
    category: 'Childhood illnesses',
    tag: { bg: '#FFF6D9', fg: '#7A5600' },
    date: 'August 12, 2026',
    isoDate: '2026-08-12',
    read: '2 min read',
    excerpt: 'Most fevers are just a normal part of your child’s body fighting off an infection. Here’s how to tell when it’s safe to monitor at home — and when it’s time to bring them in.',
    img: '/images/fever-mom-child.webp',
    alt: 'A mother checking her son’s temperature as he rests in bed',
    pos: 'center 45%',
    lead: 'Few things worry parents more than a child with a fever. While most fevers are a normal sign that your child’s body is fighting off an infection, there are times when a fever calls for a doctor’s visit rather than home care. Here’s how to tell the difference.',
    sections: [
      { h: 'When Home Care Is Usually Enough', gallery: [{ src: '/images/fever-baby-1.webp', alt: 'A parent checking a baby’s temperature with a forehead thermometer', pos: '45% center' }, { src: '/images/fever-baby-2.webp', alt: 'A smiling baby having their temperature taken', pos: '45% center' }], p: 'For a mild fever without other concerning symptoms, home care, rest, fluids, and appropriate fever medication if needed, is often enough for the first day or two. Keep an eye on your child’s behavior: if they’re still drinking fluids, urinating normally, and acting mostly like themselves between fever spikes, it’s generally reasonable to monitor at home for a short time.' },
      {
        h: 'When to Bring Your Child In',
        p: 'Some signs mean it’s time to schedule a visit rather than wait it out:',
        list: [
          'Your child is under 3 months old and has any fever at all',
          'The fever is high (39°C/102°F or above) and isn’t responding to fever medication',
          'Your child seems unusually lethargic or is difficult to wake',
          'There’s trouble breathing or persistent vomiting',
          'Signs of dehydration appear, very few wet diapers, a dry mouth, or no tears when crying',
        ],
      },
      { h: 'Trust Your Instincts', p: 'You know your child best. Even if a fever doesn’t check every box above, if something feels off, it’s always reasonable to schedule a visit. It’s better to have a checkup that turns out to be unnecessary than to wait too long on something that needed attention.' },
      { p: 'If your child is running a fever and you’re not sure what to do next, don’t hesitate to reach out, Dr. Vira’s clinic is here to help you figure out the right next step.' },
    ],
    serviceTitle: 'Common Childhood Illnesses',
    serviceHref: routes.svcIllnesses,
  },
  milestones: {
    slug: 'developmental-milestones-first-year',
    href: routes.postMilestones,
    title: 'Developmental Milestones: What to Watch for in Your Child’s First Year',
    category: 'Growth & development',
    tag: { bg: '#FFF1EA', fg: '#8C3F2B' },
    date: 'August 12, 2026',
    isoDate: '2026-08-12',
    read: '2 min read',
    excerpt: 'Every child grows at their own pace, but knowing what’s typical during the first year can help you feel more confident along the way. Here’s a simple guide to what to expect month by month.',
    img: '/images/mom-baby-play-n.webp',
    alt: 'A mother playing with stacking toys with her baby',
    pos: 'center 45%',
    lead: 'Every child grows at their own pace, but there are general milestones that give parents a helpful guide to what’s typical during the first year of life. Knowing what to look for can help you celebrate your baby’s progress, and know when it’s worth asking your pediatrician a few extra questions.',
    sections: [
      { h: 'The First Few Months', p: 'In the early months, most babies begin to lift their head during tummy time, track faces and objects with their eyes, and respond to familiar voices with coos or smiles. These small responses are early signs that your baby’s senses and muscles are developing as expected.' },
      { h: 'Six to Nine Months', gallery: [{ src: '/images/baby-crawl.webp', alt: 'A baby crawling toward wooden toys', pos: '40% center' }, { src: '/images/baby-blocks.webp', alt: 'A baby sitting up and playing with wooden blocks', pos: '62% center' }], p: 'Around this stage, many babies start sitting without support, babbling with different sounds, and reaching for or grasping objects. Some begin experimenting with solid foods and showing more interest in the people and world around them.' },
      { h: 'Nine to Twelve Months', p: 'By the end of the first year, many babies are pulling themselves up to stand, crawling or taking early steps, and may say a first word or two. Every baby reaches these points a little differently, some earlier, some later, and that’s usually completely normal.' },
      { h: 'When to Bring It Up With Dr. Vira', p: 'Milestones are guides, not strict deadlines. If your baby seems significantly behind in several areas at once, or you simply have a nagging feeling something’s off, that’s worth mentioning at your next well-baby visit. Catching a delay early, even if it turns out to be nothing, is always the better path.' },
      { p: 'Every well-baby visit is a chance to talk through your child’s growth and development, milestone by milestone. If you have questions or concerns, we’re here to help you make sense of them.' },
    ],
    serviceTitle: 'Well-Baby & Growth Monitoring',
    serviceHref: routes.svcWellBaby,
  },
};

/** Order used on the Blog listing page */
export const blogOrder: Post[] = [posts.fever, posts.vaccines, posts.milestones];

/* ------------------------------------------------------------------ */
/* Service detail pages                                                */
/* ------------------------------------------------------------------ */

const IMG = {
  nicu: '/images/vira-nicu.webp',
  measure: '/images/newborn-measure-n.webp',
  blanket: '/images/baby-blanket-n.webp',
  exam: '/images/vira-exam-baby.webp',
  girl: '/images/girl-vaccine-n.webp',
  shot: '/images/baby-injection-n.webp',
  fever: '/images/child-fever-n.webp',
  desk: '/images/vira-desk-family.webp',
  bassinet: '/images/newborn-bassinet-n.webp',
  play: '/images/mom-baby-play-n.webp',
  arm: '/images/vaccine-arm.webp',
  momchild: '/images/fever-mom-child.webp',
};

export type Service = {
  slug: string;
  title: string;
  pageTitle: string;
  href: string;
  headline: string;
  intro1: string;
  intro2: string;
  bookLabel: string;
  forWho: string;
  img1: string; alt1: string; pos1: string;
  img2: string; alt2: string; pos2: string;
  img3: string; alt3: string; pos3: string;
  covers: string[];
  expectIntro: string;
  faqSub: string;
  faqs: Faq[];
  related: { title: string; desc: string; href: string }[];
};

const rel = {
  newborn: { title: 'Newborn & Neonatal Care', desc: 'Specialized care for newborns, including premature and high-risk infants, from their first days of life.', href: routes.svcNewborn },
  wellbaby: { title: 'Well-Baby & Growth Monitoring', desc: 'Regular checkups tracking your child’s growth, weight, and developmental milestones.', href: routes.svcWellBaby },
  vaccines: { title: 'Child Vaccinations', desc: 'Complete immunization schedules to protect your child against preventable diseases.', href: routes.svcVaccines },
};

export const services: Service[] = [
  {
    slug: 'newborn-neonatal-care',
    title: 'Newborn & Neonatal Care',
    pageTitle: 'Newborn & Neonatal Care — Dr. Vira',
    href: routes.svcNewborn,
    headline: 'Expert Care From Your Baby’s First Day',
    intro1: 'The first days and weeks of life call for careful, specialized attention. As a board-certified neonatologist, Dr. Vira provides comprehensive newborn care — including for premature and high-risk infants — so parents can feel confident their baby is in capable hands from day one.',
    intro2: 'Every newborn is assessed individually, with close attention to feeding, weight gain, and early signs that may need follow-up. For infants who need extra support, Dr. Vira coordinates closely with hospital staff to ensure continuity of care.',
    bookLabel: 'Book an Appointment',
    forWho: 'Newborns & premature babies',
    img1: IMG.nicu, alt1: 'Dr. Vira in protective gear holding a newborn in the NICU', pos1: 'center 30%',
    img2: IMG.measure, alt2: 'A newborn’s head being measured with a tape measure', pos2: '40% center',
    img3: IMG.bassinet, alt3: 'A newborn resting in a hospital bassinet', pos3: 'center 45%',
    covers: ['Initial newborn health assessment', 'Feeding & weight gain monitoring', 'Premature infant care planning', 'Coordination with hospital care teams', 'Parent guidance for the first weeks home'],
    expectIntro: 'Dr. Vira works closely with parents from the very first visit, explaining what to expect and what to watch for as your baby grows. For premature or high-risk newborns, this includes a more structured monitoring plan tailored to your baby’s specific needs, developed in coordination with the hospital’s neonatal team.',
    faqSub: 'A few common questions parents ask about newborn care.',
    faqs: [
      { q: 'When should I bring my newborn for their first checkup?', a: 'Most newborns should be seen within the first week after birth, though Dr. Vira may recommend an earlier visit for premature or high-risk infants.' },
      { q: 'What happens during a newborn’s first exam?', a: 'Dr. Vira checks your baby’s overall health, weight, feeding, and reflexes, and discusses any concerns from the delivery or hospital stay.' },
      { q: 'My baby was born premature — does this service apply?', a: 'Yes — this is one of Dr. Vira’s specific areas of expertise as a board-certified neonatologist.' },
      { q: 'How often will my newborn need to be seen after the first visit?', a: 'Generally every few weeks during the first couple of months, then less frequently as your baby grows, more often if your baby was premature or needs closer monitoring.' },
    ],
    related: [rel.vaccines, rel.wellbaby],
  },
  {
    slug: 'well-baby-growth-monitoring',
    title: 'Well-Baby & Growth Monitoring',
    pageTitle: 'Well-Baby & Growth Monitoring — Dr. Vira',
    href: routes.svcWellBaby,
    headline: 'Tracking Your Child’s Growth, Every Step of the Way',
    intro1: 'Regular well-baby visits are one of the most effective ways to catch health concerns early. Dr. Vira monitors your child’s weight, height, and developmental milestones at each stage, giving you clear guidance on what’s typical and what’s worth watching.',
    intro2: 'These checkups also give parents a chance to ask questions about feeding, sleep, and everyday care — no concern is too small to bring up.',
    bookLabel: 'Book an Appointment',
    forWho: 'Babies & growing children',
    img1: IMG.blanket, alt1: 'A smiling baby lying on a soft white blanket', pos1: '75% center',
    img2: IMG.exam, alt2: 'Dr. Vira checking a baby with a stethoscope', pos2: 'center 30%',
    img3: IMG.play, alt3: 'A mother playing with stacking toys with her baby', pos3: 'center 45%',
    covers: ['Scheduled growth checkups by age', 'Developmental milestone review', 'Nutrition & feeding guidance', 'Early concern identification', 'Ongoing health record tracking'],
    expectIntro: 'Because Dr. Vira sees your child consistently over time, she’s able to notice subtle patterns in growth or development that might be missed in a one-off visit. Each checkup builds on the last, giving a clearer picture of your child’s overall health as they grow.',
    faqSub: 'Common questions about well-baby visits and growth checkups.',
    faqs: [
      { q: 'How often should my child have a well-baby checkup?', a: 'Typically monthly during the first six months, then every two to three months through the first year, and about once or twice a year after that as your child grows.' },
      { q: 'What does Dr. Vira check during a growth monitoring visit?', a: 'Weight, height, and developmental milestones appropriate to your child’s age, along with any concerns you’d like to raise.' },
      { q: 'What if my child isn’t meeting a developmental milestone?', a: 'Dr. Vira will discuss this with you directly and recommend next steps, which may include closer monitoring or referral if needed.' },
      { q: 'Can I ask about feeding or sleep concerns during this visit?', a: 'Yes, well-baby visits are a good time to bring up any everyday care questions, not just growth measurements.' },
    ],
    related: [rel.newborn, rel.vaccines],
  },
  {
    slug: 'child-vaccinations',
    title: 'Child Vaccinations & Immunization',
    pageTitle: 'Child Vaccinations & Immunization — Dr. Vira',
    href: routes.svcVaccines,
    headline: 'Protecting Your Child Against Preventable Diseases',
    intro1: 'Vaccinations are one of the most effective ways to protect your child’s health. Dr. Vira provides complete childhood immunizations, following recommended vaccination schedules and taking time to explain each vaccine’s purpose and timing.',
    intro2: 'Parents are welcome to ask questions about vaccine safety, timing, or catch-up schedules — Dr. Vira ensures you understand exactly what your child is receiving and why.',
    bookLabel: 'Book an Appointment',
    forWho: 'Babies, toddlers & children',
    img1: IMG.girl, alt1: 'A little girl smiling at the bandage on her arm after a vaccine', pos1: 'center 30%',
    img2: IMG.shot, alt2: 'A baby receiving a vaccine while held by a parent', pos2: '30% center',
    img3: IMG.arm, alt3: 'A baby receiving a vaccine in the upper arm', pos3: '55% center',
    covers: ['Vaccination schedule review by age', 'Vaccine administration', 'Post-vaccination guidance', 'Immunization record keeping', 'Catch-up schedule planning if needed'],
    expectIntro: 'Every child’s vaccination history is tracked carefully, so you always know what’s been given and what’s coming up next. If your child has missed a scheduled vaccine, Dr. Vira can help plan a catch-up schedule to get back on track.',
    faqSub: 'Common questions parents ask about vaccinations.',
    faqs: [
      { q: 'What vaccines will my child need, and when?', a: 'Dr. Vira follows the recommended childhood immunization schedule and will walk you through exactly what’s due at each visit.' },
      { q: 'Is it safe to catch up on missed vaccines?', a: 'Yes, Dr. Vira can help plan a safe catch-up schedule if your child has missed any scheduled vaccinations.' },
      { q: 'What side effects should I watch for after a vaccine?', a: 'Dr. Vira will explain what’s normal (like mild fever or soreness) and what would warrant a follow-up call after each vaccination.' },
      { q: 'Do you keep a record of my child’s immunizations?', a: 'Yes, your child’s immunization history is tracked at each visit so you always have an up-to-date record.' },
    ],
    related: [rel.newborn, rel.wellbaby],
  },
  {
    slug: 'common-childhood-illnesses',
    title: 'Common Childhood Illnesses',
    pageTitle: 'Common Childhood Illnesses — Dr. Vira',
    href: routes.svcIllnesses,
    headline: 'Careful Care When Your Child Isn’t Feeling Well',
    intro1: 'From fevers to common infections, childhood illnesses can be worrying for any parent. Dr. Vira provides thorough evaluation and treatment for everyday pediatric health concerns, helping your child recover while keeping you informed at every step.',
    intro2: 'Follow-up care ensures recovery stays on track, and Dr. Vira is clear about what warrants a return visit versus what can be managed at home.',
    bookLabel: 'Book an Appointment',
    forWho: 'Babies & children who are unwell',
    img1: IMG.fever, alt1: 'A parent feeling a sick child’s forehead for fever', pos1: '45% center',
    img2: IMG.desk, alt2: 'Dr. Vira at her clinic desk with a family and their baby', pos2: 'center 35%',
    img3: IMG.momchild, alt3: 'A mother checking her son’s temperature as he rests in bed', pos3: 'center 45%',
    covers: ['Symptom evaluation and diagnosis', 'Age-appropriate treatment planning', 'Home care guidance', 'Follow-up monitoring', 'Clear guidance on when to return'],
    expectIntro: 'Dr. Vira takes time to explain what’s causing your child’s symptoms and what to expect during recovery, so you’re never left guessing. If a follow-up visit is needed, she’ll let you know exactly what to watch for in the meantime.',
    faqSub: 'Common questions about childhood illness visits.',
    faqs: [
      { q: 'When should I bring my child in for a fever or illness?', a: 'If your child has a high fever, seems unusually weak or hard to wake, is having trouble breathing, or isn’t keeping fluids down, bring them in right away. For a mild fever or cold without these signs, home care for a day or two is usually fine before scheduling a visit.' },
      { q: 'Do you treat common infections like colds, flu, or ear infections?', a: 'Yes, Dr. Vira evaluates and treats common childhood illnesses and infections as part of routine care.' },
      { q: 'What if my child doesn’t improve after treatment?', a: 'Dr. Vira will schedule a follow-up visit and adjust the treatment plan as needed.' },
      { q: 'Can I call the clinic with questions between visits?', a: 'For non-urgent questions between visits, feel free to reach out to the clinic, and a staff member will assist you or pass your message along to Dr. Vira. For urgent concerns, please head to the nearest emergency room right away.' },
    ],
    related: [rel.wellbaby, rel.vaccines],
  },
  {
    slug: 'high-risk-infant-follow-up',
    title: 'High-Risk Infant Follow-up',
    pageTitle: 'High-Risk Infant Follow-up — Dr. Vira',
    href: routes.svcHighRisk,
    headline: 'Continued Care for Babies Who Needed Extra Support',
    intro1: 'Infants who required NICU admission or special newborn care often need continued, specialized monitoring after leaving the hospital. Dr. Vira provides ongoing follow-up for high-risk infants, tracking their growth and development closely during this critical period.',
    intro2: 'Her neonatology background means this follow-up care is grounded in the same expertise that guided your baby’s initial hospital care, not a generic pediatric checkup.',
    bookLabel: 'Book an Appointment',
    forWho: 'NICU graduates & high-risk babies',
    img1: IMG.nicu, alt1: 'Dr. Vira in protective gear holding a newborn in the NICU', pos1: 'center 30%',
    img2: IMG.bassinet, alt2: 'A newborn resting in a hospital bassinet', pos2: '45% center',
    img3: IMG.measure, alt3: 'A newborn’s head being measured with a tape measure', pos3: '40% center',
    covers: ['Review of NICU/hospital history', 'Ongoing growth & development monitoring', 'Coordination with prior care teams', 'Early concern identification', 'Parent support & guidance'],
    expectIntro: 'High-risk infants often follow a different growth and development timeline than other babies, and Dr. Vira accounts for this in every follow-up visit. She coordinates with your baby’s prior hospital records to ensure continuity of care as you transition from hospital to home.',
    faqSub: 'Common questions about high-risk infant follow-up care.',
    faqs: [
      { q: 'My baby had a NICU stay, when should follow-up care start?', a: 'Typically within one to two weeks after hospital discharge, or sooner if your baby was very premature or had complications during their NICU stay.' },
      { q: 'Will Dr. Vira coordinate with the hospital that treated my baby?', a: 'Yes, she reviews prior hospital records and NICU history to ensure continuity of care.' },
      { q: 'How is high-risk follow-up different from a regular well-baby visit?', a: 'These visits track growth and development against milestones appropriate for high-risk infants, with closer monitoring than a standard checkup.' },
      { q: 'How long does high-risk follow-up typically continue?', a: 'It commonly continues through the first one to two years of life, since growth and development are tracked more closely during this period, though this can vary based on your baby’s specific condition.' },
    ],
    related: [rel.newborn, rel.wellbaby],
  },
];
