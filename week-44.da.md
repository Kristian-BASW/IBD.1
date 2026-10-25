---
routeAlias: 7812a424-a820-4a3f-bd45-68d25975a2ae
layout: agenda
backgroundFit: cover
class: centered-cover
title: Week 44
exportFilename: week-44
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### User stories
- ### Tasks
- ### Estimering
- ### Løbende opgaver

---
routeAlias: 6b65de4c-9e65-4686-9d8a-6b30b874c8e8
layout: cover
class: user-story-intro
---

# Hvad er en user story?

En kort beskrivelse af et behov set fra brugerens perspektiv.

<div class="story-flow">
  <div class="story-part story-who">
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="15" r="8"/><path d="M9 41v-5a15 15 0 0 1 30 0v5"/></svg>
    <span>Som …</span>
    <strong>Hvem?</strong>
    <small>En studerende</small>
  </div>
  <span class="story-arrow" aria-hidden="true">→</span>
  <div class="story-part story-what">
    <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="10" width="34" height="32" rx="4"/><path d="M15 6v9M33 6v9M7 21h34M15 29h6M27 29h6M15 35h6"/></svg>
    <span>vil jeg …</span>
    <strong>Hvad?</strong>
    <small>Se afleveringsfrister</small>
  </div>
  <span class="story-arrow" aria-hidden="true">→</span>
  <div class="story-part story-why">
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18"/><path d="M24 12v13l9 5"/></svg>
    <span>så …</span>
    <strong>Hvorfor?</strong>
    <small>Planlægge min tid</small>
  </div>
</div>

<div class="magic-move-medium">

````md magic-move
```text
Som "[brugerrolle]" vil jeg "[kunne gøre noget]",
så "[jeg opnår en værdi]".
```

```text
Som "[brugerrolle]" vil jeg "[kunne gøre noget]",
så "[jeg opnår en værdi]".

Eksempel
Som "studerende" vil jeg "kunne se mine afleveringsfrister",
så "jeg kan planlægge min tid".
```
````

</div>

<p class="story-dialogue">Et udgangspunkt for dialog — detaljerne afklares sammen.</p>

---
routeAlias: 076d2b36-117e-45f2-802c-8a57d8a4c914
layout: cover
class: user-story-intro
---

# Hvorfor bruger vi user stories?

Fra en idé om en funktion til en fælles forståelse af behovet.

<div class="story-benefits">
  <div class="story-part story-who">
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="21" cy="21" r="13"/><path d="m31 31 11 11M15 21h12M21 15v12"/></svg>
    <strong>Behov</strong>
    <small>Forstå brugerens mål</small>
  </div>
  <div class="story-part story-what">
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 8h34v25H21L10 41v-8H7zM15 17h18M15 24h12"/></svg>
    <strong>Dialog</strong>
    <small>Skab fælles forståelse</small>
  </div>
  <div class="story-part story-why">
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 15a7 7 0 1 1 12 5c-4 2-5 4-5 9M24 36v1"/><circle cx="24" cy="24" r="20"/></svg>
    <strong>Afklaring</strong>
    <small>Opdag antagelser tidligt</small>
  </div>
  <div class="story-part story-who">
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M38 18a16 16 0 0 0-28-5M10 5v8h8M10 30a16 16 0 0 0 28 5M38 43v-8h-8"/></svg>
    <strong>Fleksibilitet</strong>
    <small>Tilpas løsningen undervejs</small>
  </div>
</div>

<div class="magic-move-medium">

````md magic-move
```text
Før: "Vi skal bygge en kalender."
```
```text
Før: "Vi skal bygge en kalender."

Efter: "Den studerende skal kunne se sine frister og planlægge sin tid."
Løsningen kan være en liste, en kalender eller påmindelser.
```
````

</div>

<p class="story-dialogue">Afklar behovet sammen, før I vælger løsningen.</p>

---
routeAlias: 1b0fde16-6b51-42a7-9214-7ea63125da6f
layout: cover
class: user-story-intro
---

# Hvad er user stories gode til?

Fra brugerens behov til små leverancer, der kan afprøves.

<div class="story-benefits">
  <div class="story-part story-who">
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 10h24M17 24h17M17 38h10M7 8v4M7 22v4M7 36v4"/></svg>
    <strong>Prioritér</strong>
    <small>Vælg størst brugerværdi</small>
  </div>
  <div class="story-part story-what">
    <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="7" width="15" height="14" rx="2"/><rect x="28" y="7" width="15" height="14" rx="2"/><rect x="5" y="28" width="15" height="14" rx="2"/><path d="M28 35h15M35 28v14"/></svg>
    <strong>Planlæg</strong>
    <small>Opdel og estimér stories</small>
  </div>
  <div class="story-part story-why">
    <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="6" width="30" height="37" rx="3"/><path d="m16 24 6 6 12-14"/></svg>
    <strong>Test</strong>
    <small>Aftal acceptkriterier</small>
  </div>
  <div class="story-part story-who">
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 8h34v25H21L10 41v-8H7zM15 17h18M15 24h12"/></svg>
    <strong>Få feedback</strong>
    <small>Afprøv med brugeren</small>
  </div>
</div>


<p class="story-dialogue">Levér en lille del, afprøv den, og brug det lærte i næste skridt.</p>

---
routeAlias: 91dc4e20-817a-4fb9-a962-da47c63320a5
layout: cover
---

<div class="centered-content">
<div>

<div style="font-size: 100px; line-height: 1; margin-bottom: 24px;" role="img" aria-label="Papir og blyant">📝</div>

# Opgave tid!

</div>
</div>

---
routeAlias: 3c739325-caf7-4963-917a-ab0e7531bdd4
layout: cover
class: user-story-intro
---

# Hvad er en task?

En konkret arbejdsopgave, der hjælper os med at realisere en user story.

<div class="story-flow">
  <div class="story-part story-who">
    <span style="font-size: 36px;" aria-hidden="true">👤</span>
    <strong>User story</strong>
    <small>Hvad har brugeren brug for?</small>
  </div>
  <span class="story-arrow" aria-hidden="true">→</span>
  <div class="story-part story-what">
    <span style="font-size: 36px;" aria-hidden="true">🛠️</span>
    <strong>Tasks</strong>
    <small>Hvilket arbejde skal vi udføre?</small>
  </div>
  <span class="story-arrow" aria-hidden="true">→</span>
  <div class="story-part story-why">
    <span style="font-size: 36px;" aria-hidden="true">✅</span>
    <strong>Resultat</strong>
    <small>Brugerens behov er opfyldt</small>
  </div>
</div>

- En task kan handle om fx design, kode, test eller afklaring.
- Beskriv en tydelig handling og et resultat, der kan kontrolleres.
- En task behøver ikke give brugerværdi alene — den bidrager til storyen.

---
routeAlias: c688f53b-0e62-4b07-9c9e-744f169db81e
layout: cover
class: user-story-intro
---

# Fra user story til tasks

Start med behovet. Find derefter arbejdet, der skal til.

<div class="magic-move-medium">

````md magic-move
```text
USER STORY
Som studerende vil jeg kunne se mine afleveringsfrister,
så jeg kan planlægge min tid.

```
```text
USER STORY
Som studerende vil jeg kunne se mine afleveringsfrister,
så jeg kan planlægge min tid.

TASKS
□ Hent den studerendes kommende afleveringer fra databasen.
□ Byg en liste med fag, dato og klokkeslæt, sorteret efter frist.
□ Test sorteringen og visningen, også når listen er tom.
```
````

</div>

<p class="story-dialogue">Tasks beskriver arbejdet.</p>

---
routeAlias: 530fbfd8-7c24-4d0c-91fa-4a7cc53a6ce2
layout: cover
class: user-story-intro
---

# Hvorfor deler vi en story op i tasks?

Det gør vejen fra behov til færdig løsning mere overskuelig.

<div class="task-reasons">
  <ol class="task-steps">
    <li><strong>Afklar og opdel</strong><span>Find arbejdet, og gør det håndterbart.</span></li>
    <li><strong>Find afhængigheder</strong><span>Hvad skal være klar, før vi kan komme videre?</span></li>
    <li><strong>Fordel arbejdet</strong><span>Aftal, hvem der gør hvad, og hvor I samarbejder.</span></li>
  </ol>
  <aside class="task-example">
    <span class="task-eyebrow">🔗 EKSEMPEL</span>
    <h3>UI og API skal passe sammen</h3>
    <p>Aftal dataformatet først. Derefter kan én arbejde på applikationen, mens en anden bygger listen med testdata.</p>
  </aside>
</div>

<p class="story-dialogue">Lav tasks sammen, og justér dem, når I bliver klogere på løsningen.</p>

---
routeAlias: 4a22ec14-e3b5-4846-b34e-85b7defbb320
layout: cover
class: user-story-intro
---

# Hvad er tasks gode til i hverdagen?

Et taskboard gør arbejdet synligt og fleksibelt

<div class="task-board">
  <div class="task-lane">
    <h3>📋 Klar</h3>
    <strong>Test listen</strong>
    <p>Næste opgave</p>
  </div>
  <div class="task-lane">
    <h3>🛠️ I gang</h3>
    <strong>Byg listen</strong>
    <p class="task-blocker">⚠ Afventer aftale om datoformat</p>
  </div>
  <div class="task-lane">
    <h3>✅ Færdig</h3>
    <strong>Hent data</strong>
    <p>Datahentningen er klar og testet</p>
  </div>
</div>

- **Planlægning:** Vurdér arbejdet og vælg et realistisk omfang.
- **Opfølgning:** Se fremskridt, og hjælp hinanden med blokeringer.

<p class="story-dialogue">Alle tasks er færdige? Afprøv stadig den samlede løsning — også sammen med brugeren.</p>


---
routeAlias: 944b0a01-a2f7-4d15-976c-356395137415
layout: cover
---

<div class="centered-content">
<div>

<div style="font-size: 100px; line-height: 1; margin-bottom: 24px;" role="img" aria-label="Papir og blyant">📝</div>

# Opgave tid!

</div>
</div>

---
routeAlias: d89b61b5-9040-41cb-94e6-7df865b33e46
layout: cover
class: user-story-intro
---

# Planning poker

Teamet vurderer sammen, hvor stor en user story er at lave.

<div class="poker-hand" aria-label="Eksempel på kort: 1, 2, 3, 5, 8, 13 og spørgsmålstegn">
  <span>1</span><span>2</span><span>3</span><span>5</span><span>8</span><span>13</span><span>?</span>
</div>

**Tallene viser størrelse, ikke timer:** Jo mere arbejde, jo sværere løsning og jo mere usikkerhed, desto højere tal. “?” betyder, at vi mangler viden.

1. **Afklar storyen:** Vælg en lille, forstået story som reference — fx størrelse 2.
2. **Vælg hver sit kort:** Virker den nye story mindre, lige så stor eller større?
3. **Vis samtidig:** De højeste og laveste bud forklarer deres overvejelser.
4. **Drøft og stem igen:** Afklar forskellene, og find en fælles vurdering.

---
routeAlias: 2d887382-7a03-4d90-8150-332dc2d0ee18
layout: cover
class: user-story-intro
---

# T-shirt sizing

Vurdér arbejdets størrelse som tøj: XS er meget lille, M er mellem, og XL er meget stor.

<div class="sizing-shirts" aria-label="Størrelser fra XS til XL">
  <div v-for="(size, index) in ['XS', 'S', 'M', 'L', 'XL']" :key="size">
    <svg viewBox="0 0 64 64" :style="{ width: `${54 + index * 13}px` }" aria-hidden="true"><path d="M22 8 8 16 2 30l12 6 5-9v30h26V27l5 9 12-6-6-14-14-8c-2 10-18 10-20 0Z"/></svg>
    <strong>{{ size }}</strong>
  </div>
</div>

- **Vælg en reference:** Aftal fx en enkel story, som I kalder S.
- **Sammenlign:** Kræver den næste story mere arbejde? Er den sværere eller mere usikker?
- **Opdel store stories:** En XL kan være et signal om at dele eller afklare mere.

**Muligt eksempel:** S = vis frister · M = filtrér efter fag · L = send påmindelser.

