---
routeAlias: 7812a424-a820-4a3f-bd45-68d25975a2ae
layout: agenda
backgroundFit: cover
class: centered-cover
title: Week 41
exportFilename: week-41
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### Authorization
- ### Small demo
- ### Exercise


---
routeAlias: 6dabb6ae-38ab-4741-8d95-fb259b56fa81
layout: image-right
image: /week-41/pictures/jwt-debug.png
imageHeight: 480px
imageRightPlacement: 150px
imageBottomPlacement: 10px
---

<div style="margin-top: -25px">

## JWT

</div>


---
routeAlias: f5fe7e91-cf56-4345-8ceb-a808bfd1395e
layout: image-right
image: /week-41/pictures/authentication-vs-authorization.svg
imageHeight: 280px
imageRightPlacement: 300px
---

## **Authentication vs Authorization**

<br/>
<div v-click>

**Authentication** is the process of proving that a person (or system) is who they say they are
</div>

<div v-click>

**Authorization** determines the level of access an authenticated person (or system) has to your data and resources
</div>

<!--
**Authentication** -> Who are you?
**Authorization** -> What can you do?
-->




---
routeAlias: b7b0b06b-98ef-478a-9b21-0693a9aea479
layout: cover
---

# Authorization
### Approaches



<div style="margin-top: 100px; margin-left: 50px">

**whitelist** - deny by default, explicitly allow
<br/>

**blacklist** - allow by default, explicitly deny

</div>

<!--
Implementing authorization policies, there are two ways of approaching it.
- Which do you think is more secure?
- **ANSWER** 
-->


---
routeAlias: 97726309-5ff1-4b37-9a49-95c0303c2063
layout: cover
---

# Deny by default

<br/>

**Program.cs**

<div class="magic-move-large">


```csharp
builder.Services.AddAuthorization(options => 
{
    options.FallbackPolicy = new AuthorizationPolicy()
        .RequireAuthenticatedUser()
        .Build();
});
```

</div>


<!--
To use the whitelist approach we need to set up a default policy to block. This is done in ”Program.cs” file.
-->



---
routeAlias: de8f8379-6d5e-430a-816e-aeb4bd5e5c37
layout: cover
---

# Authorization
<br/>
<br/>

- Simple authorization
- Role-based authorization
- Resource-based authorization

<!--
Authorization can be done in many ways.<br/>
We will look at 3 ways which are combined for many cases
-->


---
routeAlias: 2069fc8f-e09e-42b8-9827-564155130675
layout: cover
---

# Simple authentication


<div class="magic-move-medium">


```csharp
[Authorize]
[HttpGet]
[Route("protected-endpoint")]
public async Task<IResult> ProtectedEndpoint()
{
    // Query db and return information
}

[AllowAnonymous]
[HttpGet]
[Route("unprotected-endpoint")]
public async Task<IResult> UnprotectedEndpoint()
{
    // Query db and return information
}
```

</div>


<!--
The simplest form of authorization is simply to either allow or deny access based on whether user is authenticated. 
<br/>
It works on the endpoint level.
<br/>
There are two variations.
<br/>
1. Mark endpoints where we require authentication (blacklist).
2. Mark endpoints where we allow unauthenticated (aka anonymous).
<br/>
Because it is easy to forget to at ”Authorize” attribute to endpoints, I recommend setting it up such that you have to explicitly allow anonymous.

-->


---
routeAlias: 852c1202-e682-4f3c-a31a-2dfb601a328e
layout: cover
---

# Role-based authorization

<div class="magic-move-large">


```csharp

[Authorize(Roles = "Admin")]
[HttpGet]
[Route("users")]
public async Task<List<UserDto>> Users(DraftFormData data) {
    // Query and return users
}
```

</div>


<!--
If we have a system where users can have roles. 
<br/>
Then we can have a policy that only authorize if user has a certain role.
-->

---
routeAlias: af952c18-3ae1-43a5-9734-508c0529aceb
layout: cover
---

# Resource-based authorization

<br/>

<div class="magic-move-medium">


```csharp

[HttpPut]
public async Task Update(InvoiceData data)
{
    var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    var post = dbContext.Invoices.Where(x => x.Id == data.Id)
        .SingleOrDefault(x => x.CreatedByUser == userId);
    // Update invoice
}
```

</div>

<!--
In this code, we use the userId to check if the user has created the Invoice.
- Policy is, only users which has created the invoice can edit them.
-->


---
routeAlias: 33862bfd-a613-421b-9cdd-cba005f77058
layout: cover
---

# Why is authorization important?

<div v-click style="margin-top: 200px; margin-left: 50px">

**Let me put like this:** Do you trust everyone on the internet?
</div>
