Dr. Vira Bolok, MD — Website Redesign (design source files)
Exported from Claude Design on 18 November 2026

WHAT'S INSIDE
- 34 page files (*.dc.html): desktop pages, phone (Mobile*) versions, and shared Header/Footer
- images/ : the logo and the 19 photos used in the design

MAIN PAGES
  Main.dc.html ............ Home
  About.dc.html ........... About Dr. Vira
  Services.dc.html ........ Services overview
  Service.dc.html ......... Newborn & Neonatal Care (template for all 5 services)
  ServiceWellBaby / ServiceVaccines / ServiceIllnesses / ServiceHighRisk .dc.html
  Book.dc.html ............ Book an Appointment
  FAQ.dc.html ............. FAQ
  Blog.dc.html ............ Blog listing
  Article.dc.html ......... Article template (vaccination schedule)
  ArticleMilestones / ArticleFever .dc.html
  Contact.dc.html ......... Contact
  NotFound.dc.html ........ 404 page
  Header.dc.html / Footer.dc.html ... shared on every page
  Mobile*.dc.html ......... 390px phone versions (wrap the desktop pages)

NOTE FOR THE ASTRO BUILD
These are Claude Design source files, not a finished website. They use Claude
Design's own tags (<x-dc>, <dc-import>, <sc-for>, <sc-if>, {{...}}) and need its
viewer to display. Use them as the reference for markup, styles, text and
images when building the Astro pages (HealNet theme).
Each page's text lists (services, FAQs, articles, clinics) are in the
<script> block at the bottom of the file.

STILL TO CONFIRM
- Dr. Vira's role at Madonna and Child Medical Center (About page placeholder)
- The "231+ Safe Observation" number
- Licence/source for 3 photos taken from the old site
- Forms (Book, Contact) show a thank-you message only; connect them in Astro
