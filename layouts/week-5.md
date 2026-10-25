---
routeAlias: c1bdf41e-71c7-4d72-b599-5d3a00221ad9
layout: agenda
class: pdf-slide
title: Week 5
exportFilename: week-5
aspectRatio: 16/9
transition: slide-left
---

<br/><br/>

# Agenda
- ### A little about me
- ### A little about you
- ### Course plan
- ### What are your expectations for this course?
- ### Todays topic

<br/><br/>

#### Remark: flexible on the first break



---
routeAlias: 93f51e01-0ad7-4927-9102-e6d5b95c0b04
transition: slide-down
layout: image-right
image: ./week-5/pictures/superman-character.png
---

<div>
  <div>
    <h1 > Who am I?</h1>
    <ul>
      <li> Name </li>
      <li> Education </li>
      <li> Working experience </li>
      <li> Fun fact </li>
    </ul>
  </div>
</div>


<!--
ENGELSK:
Name -> Somebody calls me superman.
Education -> Computer Science (18-21) and then the PBA Softwaredeloper (21-22)
Working Experience -> Worked at some companies around the area
Fun Fact -> Krav Maga Blue belt, a dog called bailey just like the drink, doing catwalk at home for making my kids laugh. 
-->

---
routeAlias: 3da43536-d9f6-46ca-a063-d36eb464e630
transition: slide-left
layout: image-right
image: ./week-5/pictures/guy-pointing-finger.png
imageTopPlacement: 41px
---


<div >
  <div >
    <h1 > Who are you?</h1>
    <ul>
      <li> Name </li>
      <li> Original country </li>
      <li> Fun fact </li>
    </ul>
  </div>
 
</div> 

<!-- Now it is your turn -->

---
routeAlias: ee6d3043-ee4d-40aa-90f6-92b21dea8a9d
transition: slide-up
---

<script setup lang="ts">

import { coursePlanList, toWeek, coursePlanHeaders } from './scripts/course-plan.ts'
  
  const coursePlan = toWeek(9, coursePlanList);
  
</script>

# COURSE PLAN


<table class="no-edges-bottom round-edges-table" style="margin-top:36px">
  <thead>
    <tr>
      <th v-for="header in coursePlanHeaders">{{header}}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="plan in coursePlan">
      <td>{{plan.getWeekLabel()}}</td>
      <td>{{plan.topic}}</td>
      <td>{{plan.description}}</td>
    </tr>
  </tbody>
</table>

---
routeAlias: 196f02f9-6501-481c-a79c-92d88a133e09
transition: slide-up
---

<script setup lang="ts">

import { coursePlanList, fromWeek, toWeek } from './scripts/course-plan.ts'
  const coursePlan = fromWeek(10 , coursePlanList);
</script>


<table class="at-top round-edges-table no-edges-top" >
  <tbody>
    <tr v-for="plan in coursePlan">
      <td>{{plan.getWeekLabel()}}</td>
      <td>{{plan.topic}}</td>
      <td>{{plan.description}}</td>
    </tr>
  </tbody>
</table>


---
routeAlias: 3819c179-883a-473b-8b15-25cce0d8907d
layout: cover
background: ./week-5/pictures/expectations.jpg
logoPlacement: left
---

<!-- 
ENGELSK:
What do you thhink of the first semesters IBD course
Some things you might use and other things not.
Personality-tests, might be redundant for some of you.
One thing is certain, and that is SCRUM, which is used in almost every software company, or parts of it.
More technical.
-->

---
routeAlias: 3fda0470-68f2-48fa-96ee-964a201b8f85
layout: image-right
image: ./week-5/pictures/hector-despicable-me.png
imageBottomPlacement: 0px
imageRightPlacement: 10px
---

# FUTURUM
Start of the 2nd module

- ### Why is it important to know your own **personal**  <div></div>  **comptencies**
<ul >
  <li v-click class="indent-li"><h4>Solorider (no teamcoding)</h4></li>
  <li v-click="2" class="indent-li"><h4> Blame  others (e.g. ‘it’s the backend/frontend/QA’s fault’)</h4></li>
  <li v-click="3" class="indent-li"><h4>Bad at prioritizing tasks</h4></li>
  <li v-click="4" class="indent-li"><h4>Bad attitude</h4></li>
  <li v-click="5" ><h3>You should not try to fit in?</h3></li>
  <li v-click="5" ><h3>The company will find out after some months</h3></li>
  <li v-click="5" ><h3>Tell them your passion</h3></li>
  <li v-click="5" ><h3>It is hard to change an employees personal competencies</h3></li>
</ul>


<!--
ENGELSK:
A compnay knows what kindoff person they want
These are some of the things that any software company wants
-->
---
routeAlias: 1ff1db7e-3e6e-40c5-965b-d819945a90bf
layout: cover
background: ./week-5/pictures/16personalities-home.png
---

<h1 style="text-align:center; font-weight:bold">TEST TIME</h1>

---
routeAlias: b5fb8ba0-3a4a-4f03-a486-7a67e5fe3971
layout: image-right
image: ./week-5/pictures/16personalities.webp
imageRightPlacement: 150px
imageBottomPlacement: 0px
---

# Which did you become?

---
routeAlias: cbd6a5f0-5061-4b99-9f25-cd8e857899f1
layout: image-right
---

<script setup>
  import { competencies } from './scripts/personal-competencies.ts'

  const competencyPlan = competencies;

</script>

# Personal competencies

<table class="full-bordered">
  <tbody>
    <tr>
      <td v-for="competency in competencyPlan.slice(0, 3)">
      {{competency}}</td>
    </tr>
    <tr>
      <td v-for="competency in competencyPlan.slice(3, 6)">
      {{competency}}</td>
    </tr>
     <tr>
      <td v-for="competency in competencyPlan.slice(6, 9)">
      {{competency}}</td>
    </tr>
    <tr>
      <td v-for="competency in competencyPlan.slice(9, 12)">
      {{competency}}</td>
    </tr>
  </tbody>
</table>

<!--
ENGELSK:
Now you should take 5 minutes with a partner sitting next to you, and you should pick one competencies which best applies to you, some are listed here.
-->

---
routeAlias: 8bd48cc9-50cc-4bb0-acb4-fe0c8e632c5e
layout: cover
background: ./week-5/pictures/game-console-nintendo.png
---

<br/>
<br/>
<br/>
<h1 style="text-align:center; font-weight:bold ">GAME TIME</h1>

<h1 style="text-align:center; font-weight:bold ">GROUP PAIRING</h1>
<h1 style="text-align:center; font-weight:bold ">3 - 4 MEMBERS</h1>



---
routeAlias: 224bdd4d-9124-4eab-8591-f4df68744077
layout: image-right
image: ./week-5/pictures/reflection.png
imageBottomPlacement: 0px
imageRightPlacement: 0px
---

# REFLECTION
First semester's project and exam
<br/><br/>

- ### What should I/we have done differently <div></div> in the project?
- ### What could be done differently when i think of <div></div> Scrum
<ul>
  <li style="margin-left:50px;"><h4>Sprint</h4></li>
  <li style="margin-left:50px;"><h4>Estimation</h4></li>
 
  <li style="margin-left:50px;"><h4>Daily standup meetings</h4></li>  
  <li style="margin-left:50px;" v-click><h4>Did i even do anything in ScrumWise?</h4></li>
  <li style="margin-left:50px;" v-click="2"><h4>Who is this guy called Scrum?</h4></li>
</ul>

<!-- 
Sprint review and Sprint Retrospective would be kinda redundant
-->
