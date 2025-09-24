using contosopizza.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Tls;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

[ApiController]

[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IEmailSender _emailSender;
    private readonly object loginUrl;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IEmailSender emailSender)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _emailSender = emailSender;
    }

    [HttpPost("register")]
    
  public async Task<IActionResult> Register([FromBody] RegisterModel model)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
    var result = await _userManager.CreateAsync(user, model.Password);
    
    if (result.Succeeded)
    {
            
    
               var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

       
             await _userManager.UpdateAsync(user);
      var confirmationPageUrl = "http://localhost:4200/confirmation";

        var emailBody = $@"
            <p>Please confirm your account by entering this code on our confirmation page: <strong>{code}</strong></p>
            <p>You can access the confirmation page at <a href='{confirmationPageUrl}'>this link</a>.</p>
            <p>If you did not request this email, please ignore it.</p>";

        await _emailSender.SendEmailAsync(
            model.Email,
            "Confirm your email",
            emailBody
        );
       
       return Ok(new { Message = "Registration successful. Please check your email to confirm your account." });}
         AddErrors(result);
    return BadRequest(new { Errors = result.Errors.Select(e => e.Description) }); }
private string GenerateConfirmationCode()
{
    var rng = new Random();
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return new string(Enumerable.Repeat(chars, 6)
        .Select(s => s[rng.Next(s.Length)]).ToArray());
}

   


 [HttpPost("confirm-email")]
public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailModel model)
{
    if (model.Email == null || model.Code == null)
    {
        return BadRequest(new { Message = "Invalid email or code." });
    }

    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null)
    {
        return NotFound(new { Message = "User not found." });}
 
 
  
     var result = await _userManager.ConfirmEmailAsync(user, model.Code);
    if (result.Succeeded)
    {     await _signInManager.SignInAsync(user, isPersistent: false);
        return Ok(new { Message = "Email confirmed successfully. You can now log in." });
    }

    return BadRequest(new { Message = "Email confirmation failed. The code may be incorrect or expired." });
}



[HttpPost("forgot-password")]
 public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword model)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

          /* var callbackUrl = Url.Action(
                nameof(ResetPassword),
                "Account",
                new { token, email = model.Email },
                protocol: HttpContext.Request.Scheme);
  

            await _emailSender.SendEmailAsync(model.Email, "Reset Password", 
                $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");*/
                var resetPasswordPageUrl = "http://localhost:4200/reset-password";

await _emailSender.SendEmailAsync(model.Email, "Reset Password", 
    $"Please reset your password by clicking here: <a href='{resetPasswordPageUrl}?token={token}&email={model.Email}'>Reset Password</a>");


            return Ok();
        }

        return BadRequest("Invalid request.");
    }




[HttpPost("reset-password")]

 [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPassword model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Invalid request.");
        }

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest("User not found.");

        }
            var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token));


        var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.newpassword);
        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors.Select(e => e.Description).ToArray());

    }



 
   [HttpPost("change-password")]
public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
{
     if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    if (string.IsNullOrWhiteSpace(request.Email) ||
        string.IsNullOrWhiteSpace(request.CurrentPassword) ||
        string.IsNullOrWhiteSpace(request.NewPassword) ||
        string.IsNullOrWhiteSpace(request.ConfirmNewPassword))
    {
        return BadRequest("All fields are required.");
    }

    
    if (request.NewPassword != request.ConfirmNewPassword)
    {
        return BadRequest("New password and confirmation do not match.");
    }

 
    var user = await _userManager.FindByEmailAsync(request.Email);
    if (user == null)
    {
        return NotFound("User not found");
    }


    var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
    if (result.Succeeded)
    {
        return Ok(request);
    }

   
    return BadRequest(result.Errors.Select(e => e.Description));
}




    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            Console.WriteLine("login",user);
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        return Unauthorized(new { Message = "Invalid login attempt." });
    }

    // Generate JWT token
    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    
    private void AddErrors(IdentityResult result)
    {
        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }
    }
}
public class ConfirmEmailModel
{
    public string Email { get; set; }
    public string Code { get; set; }
}


// Register model
public class RegisterModel
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}

// Login model
public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
public class ForgotPassword
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
public class ResetPassword
{
   
    public string Email { get; set; }

    public string Token{ get; set; }

    [Required]
   [StringLength(100, ErrorMessage = "Le {0} doit comporter au moins {2} caractères.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public string newpassword { get; set; }

}

public class ChangePasswordRequest
{ public string Email { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }


   
}



