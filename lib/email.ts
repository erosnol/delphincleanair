// Email notification system using Resend (recommended) or SendGrid
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

interface EmailNotification {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface LeadNotification {
  leadType: 'air-washer-gift' | 'free-gift' | 'booking' | 'affiliate' | 'job-application';
  leadData: any;
  userEmail: string;
}

export class EmailService {
  private adminEmail: string;

  constructor() {
    this.adminEmail = process.env.ADMIN_EMAIL || 'your-email@example.com';
  }

  // Send notification to you when someone fills out a form
  async notifyAdminOfNewLead(notification: LeadNotification) {
    // Skip email sending if no API key is available (build time)
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key-for-build') {
      console.log('Email service not configured - skipping notification');
      return;
    }

    const { leadType, leadData, userEmail } = notification;
    
    let subject = '';
    let content = '';

    switch (leadType) {
      case 'air-washer-gift':
      case 'free-gift':
        subject = `🎁 New Free Air Washer Gift Claim - ${leadData.firstName} ${leadData.lastName}`;
        content = `
          <h2>New Free Air Washer Gift Claim</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Address:</strong> ${leadData.address}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>Next Steps:</h3>
          <ul>
            <li>Contact within 24 hours</li>
            <li>Schedule home demonstration appointment</li>
            <li>Prepare Air Washer demonstration materials</li>
            <li>Bring gift Air Washer for customer</li>
          </ul>
        `;
        break;

      case 'booking':
        subject = `📅 New Consultation Booking - ${leadData.firstName} ${leadData.lastName}`;
        content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Consultation Booking</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
    .label { font-weight: bold; color: #1e40af; }
    .value { margin-left: 10px; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 New Consultation Request</h1>
    <p>A new customer has booked a consultation</p>
  </div>
  <div class="content">
    <div class="info-box">
      <h3>Customer Information</h3>
      <p><span class="label">Name:</span><span class="value">${leadData.firstName} ${leadData.lastName}</span></p>
      <p><span class="label">Email:</span><span class="value">${leadData.email}</span></p>
      <p><span class="label">Phone:</span><span class="value">${leadData.phone}</span></p>
    </div>
    <div class="info-box">
      <h3>Consultation Details</h3>
      <p><span class="label">Type:</span><span class="value">${leadData.consultationType}</span></p>
      <p><span class="label">Preferred Date:</span><span class="value">${leadData.preferredDate}</span></p>
      <p><span class="label">Time Slot:</span><span class="value">${leadData.timeSlot}</span></p>
      ${leadData.message ? `<p><span class="label">Message:</span><span class="value">${leadData.message}</span></p>` : ''}
    </div>
    <div class="info-box">
      <h3>Next Steps</h3>
      <ul>
        <li>Contact customer within 24 hours</li>
        <li>Confirm consultation date and time</li>
        <li>Prepare demonstration materials</li>
        <li>Send calendar invite if needed</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <p>Submitted: ${new Date().toLocaleString()}</p>
    <p><strong>Delphin Clean Air Admin System</strong></p>
  </div>
</body>
</html>`;
        break;


      case 'affiliate':
        subject = `🤝 New Affiliate Application - ${leadData.firstName} ${leadData.lastName}`;
        content = `
          <h2>New Affiliate Partner Application</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Platform:</strong> ${leadData.platform}</p>
          <p><strong>Followers:</strong> ${leadData.followers}</p>
          <p><strong>Experience:</strong> ${leadData.experience}</p>
          <p><strong>Motivation:</strong> ${leadData.motivation}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>Next Steps:</h3>
          <ul>
            <li>Review application within 2-3 days</li>
            <li>Schedule partner onboarding call</li>
            <li>Prepare marketing materials</li>
          </ul>
        `;
        break;

      case 'job-application':
        subject = `💼 New Sales Job Application - ${leadData.firstName} ${leadData.lastName}`;
        content = `
          <h2>New Door-to-Door Sales Application</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Location:</strong> ${leadData.location}</p>
          <p><strong>Sales Experience:</strong> ${leadData.experience}</p>
          <p><strong>Availability:</strong> ${leadData.availability}</p>
          <p><strong>Has Transportation:</strong> ${leadData.hasTransportation ? 'Yes' : 'No'}</p>
          <p><strong>Resume:</strong> ${leadData.resumeFileName || 'Not provided'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>Motivation:</h3>
          <p style="background: #f3f4f6; padding: 12px; border-radius: 6px;">${leadData.motivation}</p>
          
          <h3>Next Steps:</h3>
          <ul>
            <li>Review application within 24-48 hours</li>
            <li>Schedule phone interview if qualified</li>
            <li>Conduct background check if needed</li>
            <li>Schedule in-person training session</li>
          </ul>
          
          <p><strong>Position Details:</strong> Part-time door-to-door sales, up to $1,500 weekly commission, flexible schedule, full training provided.</p>
        `;
        break;
    }

    // Fallback if content is empty
    if (!content || content.trim() === '') {
      content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead</title>
</head>
<body>
  <h2>New ${leadType} Lead</h2>
  <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
  <p><strong>Email:</strong> ${leadData.email}</p>
  <p><strong>Details:</strong> ${JSON.stringify(leadData, null, 2)}</p>
</body>
</html>`;
    }

    try {
      console.log('📧 Sending admin email:', {
        subject,
        to: this.adminEmail,
        contentLength: content.length,
        contentPreview: content.substring(0, 100) + '...'
      });
      
      await resend.emails.send({
        from: 'Delphin Website <onboarding@resend.dev>',
        to: [this.adminEmail],
        subject,
        html: content,
        replyTo: userEmail,
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      console.error('Email content was:', content);
    }
  }

  // Send confirmation email to the user
  async sendUserConfirmation(leadType: string, userData: any) {
    // Skip email sending if no API key is available (build time)
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key-for-build') {
      console.log('Email service not configured - skipping confirmation');
      return;
    }

    let subject = '';
    let content = '';

    switch (leadType) {
      case 'air-washer-gift':
      case 'free-gift':
        subject = 'Your Free Air Washer Gift is Confirmed!';
        content = `
          <h2>Thank you for claiming your free Air Washer gift!</h2>
          <p>Hi ${userData.firstName},</p>
          <p>We've received your request for a free Air Washer gift. Our expert will contact you within 24 hours to schedule your home demonstration appointment.</p>
          
          <h3>What to expect:</h3>
          <ul>
            <li>Free Air Washer demonstration at your home</li>
            <li>Air quality testing and assessment</li>
            <li>Your complimentary Air Washer gift</li>
            <li>Personalized clean air recommendations</li>
          </ul>
          
          <p>Questions? Reply to this email or call us directly.</p>
          <p>Best regards,<br>The Delphin Clean Air Team</p>
        `;
        break;

      case 'booking':
        subject = '✅ Your Delphin Clean Air Consultation is Confirmed!';
        content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Consultation Booking Confirmed</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f0fdf4; padding: 30px; border-radius: 0 0 10px 10px; }
    .confirmation-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669; }
    .details-box { background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .label { font-weight: bold; color: #047857; }
    .value { margin-left: 10px; }
    .next-steps { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; }
    .logo { font-size: 24px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🌬️ Delphin Clean Air</div>
    <h1>Consultation Confirmed!</h1>
    <p>Thank you for choosing cleaner, healthier air</p>
  </div>
  <div class="content">
    <div class="confirmation-box">
      <h2>Hi ${userData.firstName}! 👋</h2>
      <p>Great news! We've received your consultation request and our clean air experts are excited to help you breathe easier.</p>
    </div>
    
    <div class="details-box">
      <h3>📋 Your Booking Details</h3>
      <p><span class="label">Consultation Type:</span><span class="value">${userData.consultationType}</span></p>
      <p><span class="label">Preferred Date:</span><span class="value">${userData.preferredDate}</span></p>
      <p><span class="label">Time Preference:</span><span class="value">${userData.timeSlot}</span></p>
      <p><span class="label">Contact Email:</span><span class="value">${userData.email}</span></p>
    </div>
    
    <div class="next-steps">
      <h3>🚀 What Happens Next?</h3>
      <ul>
        <li><strong>Within 24 hours:</strong> Our team will contact you to confirm your appointment</li>
        <li><strong>Before your visit:</strong> We'll send you preparation tips and what to expect</li>
        <li><strong>During consultation:</strong> Free air quality assessment and personalized recommendations</li>
        <li><strong>Special bonus:</strong> Ask about our current promotions and free gifts!</li>
      </ul>
    </div>
    
    <div class="confirmation-box">
      <h3>💬 Questions?</h3>
      <p>Feel free to reply to this email or call us directly. We're here to help you achieve the cleanest, healthiest air possible!</p>
      <p><strong>Phone:</strong> [Your Phone Number]<br>
      <strong>Email:</strong> info@delphincleanair.org</p>
    </div>
  </div>
  <div class="footer">
    <p><strong>Delphin Clean Air Team</strong></p>
    <p>Breathing life into clean air solutions</p>
    <p style="font-size: 12px; margin-top: 20px;">This email was sent because you requested a consultation at delphincleanair.org</p>
  </div>
</body>
</html>`;
        break;

    }

    // Fallback if content is empty for user confirmation
    if (!content || content.trim() === '') {
      content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmation</title>
</head>
<body>
  <h2>Thank you for your submission!</h2>
  <p>Hi ${userData.firstName},</p>
  <p>We've received your ${leadType} request and will be in touch soon.</p>
  <p>Best regards,<br>The Delphin Clean Air Team</p>
</body>
</html>`;
    }

    try {
      console.log('📧 Sending user confirmation email:', {
        subject,
        to: userData.email,
        contentLength: content.length,
        contentPreview: content.substring(0, 100) + '...'
      });
      
      await resend.emails.send({
        from: 'Delphin Clean Air <onboarding@resend.dev>',
        to: [userData.email],
        subject,
        html: content,
      });
    } catch (error) {
      console.error('Failed to send user confirmation:', error);
    }
  }
}
