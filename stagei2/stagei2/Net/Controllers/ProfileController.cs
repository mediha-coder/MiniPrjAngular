using contosopizza.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting; 
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System;
using Microsoft.AspNetCore.Authorization;  



[Route("api/[controller]")]
[ApiController]
public class ProfileController(IWebHostEnvironment hostingEnvironment, UserManager<ApplicationUser> userManager) : ControllerBase
    { private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly IWebHostEnvironment _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));

    [Authorize]
    
        [HttpPost("upload-photo")]
public async Task<IActionResult> UploadPhoto(IFormFile file)
{
    // Ensure the user is authenticated and authorized
    var user = await _userManager.GetUserAsync(User);
    if (user == null) return Unauthorized();

    
    if (file == null || file.Length == 0)
    {
        return BadRequest("No file uploaded.");
    }

   
    var webRootPath = _hostingEnvironment.WebRootPath;
    if (string.IsNullOrEmpty(webRootPath))
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "Web root path is not set.");
    }
    var uploadsFolderPath = Path.Combine(webRootPath, "uploads");

   
    if (!Directory.Exists(uploadsFolderPath))
    {
        Directory.CreateDirectory(uploadsFolderPath);
    }

    var uniqueFilename = $"{Guid.NewGuid()}_{file.FileName}";
    var filePath = Path.Combine(uploadsFolderPath, uniqueFilename);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    // Update the user's profile picture URL in the database (if applicable)
    user.Image =  System.Text.Encoding.UTF8.GetBytes($"/uploads/{uniqueFilename}");
    await _userManager.UpdateAsync(user);

    // Return the success response with the file path
    return Ok(new { FilePath = $"/uploads/{uniqueFilename}" });
}
      

        [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
{
    var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
    if (userEmail == null)
    {
        return Unauthorized();
    }

    var user = await _userManager.FindByEmailAsync(userEmail);

    if (user == null)
    {
        return NotFound();
    }

    string profileImageUrl;
    if (user.Image != null && user.Image.Length > 0)
    {
        var base64Image = Convert.ToBase64String(user.Image);
        profileImageUrl = $"data:image/png;base64,{base64Image}";
    }
    else
    {
        profileImageUrl = "C:/Users/Hp/Downloads/contosopizza - Copie/wwwroot/uploads/ha.jpg";
    }

    var profile = new
    {
        user.UserName,
        user.Email,
        ProfileImageUrl = profileImageUrl
    };

    return Ok(profile);
}
    }



    