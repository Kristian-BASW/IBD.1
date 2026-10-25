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
