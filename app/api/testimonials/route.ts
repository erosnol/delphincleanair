import { NextRequest, NextResponse } from 'next/server';
import { testimonialManager } from '@/lib/airtable';

export async function GET() {
  try {
    const testimonials = await testimonialManager.getAllTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('❌ Failed to fetch testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testimonial = await testimonialManager.createTestimonial(body);
    console.log('✅ Testimonial created:', testimonial);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('❌ Failed to create testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const testimonial = await testimonialManager.updateTestimonial(id, updates);
    console.log('✅ Testimonial updated:', testimonial);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('❌ Failed to update testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    await testimonialManager.deleteTestimonial(id);
    console.log('✅ Testimonial deleted:', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to delete testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
