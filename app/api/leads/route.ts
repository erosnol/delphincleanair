import { NextRequest, NextResponse } from 'next/server';
import { AirtableLeadManager } from '@/lib/airtable';
import { EmailService } from '@/lib/email';

const leadManager = new AirtableLeadManager();
const emailService = new EmailService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Create lead record
    const lead = {
      firstName: data.firstName,
      lastName: data.lastName || '',
      email: data.email,
      phone: data.phone || '',
      source: type,
      details: data,
      createdAt: new Date().toISOString(),
    };

    // Log to console for immediate visibility (always works)
    console.log(`🎯 NEW LEAD - ${type.toUpperCase()}:`, {
      name: `${data.firstName} ${data.lastName || ''}`.trim(),
      email: data.email,
      phone: data.phone || 'Not provided',
      timestamp: new Date().toLocaleString(),
      details: data,
    });

    // Try Airtable (don't fail if it doesn't work)
    try {
      await leadManager.createLead(lead);
      console.log('✅ Lead saved to Airtable');
    } catch (airtableError) {
      console.log('⚠️ Airtable save failed (but continuing):', airtableError);
    }

    // Try email notifications (don't fail if they don't work)
    try {
      await emailService.notifyAdminOfNewLead({
        leadType: type,
        leadData: data,
        userEmail: data.email,
      });
      console.log('✅ Admin email sent');
    } catch (emailError) {
      console.log('⚠️ Admin email failed (but continuing):', emailError);
    }

    try {
      await emailService.sendUserConfirmation(type, data);
      console.log('✅ User confirmation email sent');
    } catch (emailError) {
      console.log('⚠️ User email failed (but continuing):', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully',
      leadId: Date.now() // Simple ID for tracking
    });

  } catch (error) {
    console.error('❌ Lead capture error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (for your admin dashboard)
export async function GET() {
  try {
    const leads = await leadManager.getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
