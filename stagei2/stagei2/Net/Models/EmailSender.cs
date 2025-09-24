/*using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

public class AuthMessageSenderOptions
{
    public string SendGridKey { get; set; }
}

public class EmailSender : IEmailSender
{
    private readonly AuthMessageSenderOptions _options;

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
    {
        _options = optionsAccessor.Value;
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        return Execute(_options.SendGridKey, subject, htmlMessage, email);
    }

    private Task Execute(string apiKey, string subject, string message, string email)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("noreply@yourdomain.com", "Your App Name"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(email));
        return client.SendEmailAsync(msg);
    }
}*//*
using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;

public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);
}

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Your App Name", _configuration["Smtp:Username"]));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("html") { Text = message };

        using (var client = new SmtpClient())
        {
            client.CheckCertificateRevocation = false;
            await client.ConnectAsync(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["Smtp:Username"], _configuration["Smtp:Password"]);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
    }
}*/
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        var smtpClient = new SmtpClient();

        // Connexion au serveur SMTP de Gmail
        await smtpClient.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);

        await smtpClient.AuthenticateAsync(_configuration["Email:Username"], _configuration["Email:AppPassword"]);

        var mailMessage = new MimeMessage();
        mailMessage.From.Add(new MailboxAddress("Your App Name", _configuration["Email:Username"]));
        mailMessage.To.Add(new MailboxAddress("", email));
        mailMessage.Subject = subject;
        mailMessage.Body = new TextPart("html") { Text = message };

        await smtpClient.SendAsync(mailMessage);}
    
       
}
