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
  leadType: 'air-washer-gift' | 'booking' | 'affiliate' | 'job-application';
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
        content = `
          <h2>New Consultation Booking</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Type:</strong> ${leadData.consultationType}</p>
          <p><strong>Preferred Date:</strong> ${leadData.preferredDate}</p>
          <p><strong>Time Slot:</strong> ${leadData.timeSlot}</p>
          <p><strong>Message:</strong> ${leadData.message || 'None'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `;
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

    try {
      await resend.emails.send({
        from: 'Delphin Website <onboarding@resend.dev>',
        to: [this.adminEmail],
        subject,
        html: content,
        replyTo: userEmail,
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
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
        subject = 'Consultation Booking Confirmed!';
        content = `
          <h2>Your consultation is confirmed!</h2>
          <p>Hi ${userData.firstName},</p>
          <p>Thank you for booking a consultation with our clean air experts.</p>
          
          <h3>Booking Details:</h3>
          <ul>
            <li><strong>Type:</strong> ${userData.consultationType}</li>
            <li><strong>Preferred Date:</strong> ${userData.preferredDate}</li>
            <li><strong>Time:</strong> ${userData.timeSlot}</li>
          </ul>
          
          <p>We'll contact you soon to confirm the exact time and provide any additional details.</p>
          <p>Best regards,<br>The Delphin Clean Air Team</p>
        `;
        break;

    }

    try {
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
