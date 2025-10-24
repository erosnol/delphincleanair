// Airtable integration for lead management
// You'll need to set up an Airtable base and get your API key

interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: 'air-washer-gift' | 'free-gift' | 'booking' | 'affiliate' | 'job-application';
  details?: any;
  createdAt: string;
}

interface Testimonial {
  id?: string;
  type: 'text' | 'video' | 'image';
  content: string;
  author: string;
  location?: string;
  rating?: number;
  videoUrl?: string;
  imageUrl?: string;
  tiktokUrl?: string;
  date?: string;
  isApproved?: boolean;
  createdAt: string;
}

export class AirtableLeadManager {
  private baseId: string;
  private apiKey: string;
  private tableName: string;

  constructor() {
    this.baseId = process.env.AIRTABLE_BASE_ID || '';
    this.apiKey = process.env.AIRTABLE_API_KEY || '';
    this.tableName = 'Leads'; // Your Airtable table name
  }

  async createLead(lead: Lead) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`;
    
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'First Name': lead.firstName,
            'Last Name': lead.lastName,
            'Email': lead.email,
            'Phone': lead.phone,
            'Address': lead.details?.address || '',
            'Source': lead.source === 'air-washer-gift' ? 'air-washer-gift' : lead.source,
            'Details': JSON.stringify(lead.details),
            'Created At': new Date().toISOString().split('T')[0], // YYYY-MM-DD format
            'Status': 'New',
          },
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('❌ Airtable API error details:', responseData);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      return responseData;
    } catch (error) {
      console.error('❌ Failed to create lead in Airtable:', error);
      throw error;
    }
  }

  async getLeads() {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch leads from Airtable:', error);
      throw error;
    }
  }
}

export class AirtableTestimonialManager {
  private baseId: string;
  private apiKey: string;
  private tableName: string;

  constructor() {
    this.baseId = process.env.AIRTABLE_BASE_ID || '';
    this.apiKey = process.env.AIRTABLE_API_KEY || '';
    this.tableName = 'Testimonials'; // Your Airtable table name
  }

  async createTestimonial(testimonial: Testimonial) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Type': testimonial.type,
            'Content': testimonial.content,
            'Author': testimonial.author,
            'Location': testimonial.location || '',
            'Rating': testimonial.rating || 0,
            'Video URL': testimonial.videoUrl || '',
            'Image URL': testimonial.imageUrl || '',
            'TikTok URL': testimonial.tiktokUrl || '',
            'Date': testimonial.date || new Date().toISOString().split('T')[0],
            'Is Approved': testimonial.isApproved || false,
            'Created At': new Date().toISOString().split('T')[0],
          },
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('❌ Airtable API error details:', responseData);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      return responseData;
    } catch (error) {
      console.error('❌ Failed to create testimonial in Airtable:', error);
      throw error;
    }
  }

  async getTestimonials() {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}?filterByFormula=AND({Is Approved}=TRUE())&sort[0][field]=Created At&sort[0][direction]=desc`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Airtable API error details:', data);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(data)}`);
      }

      return data;
    } catch (error) {
      console.error('❌ Failed to get testimonials from Airtable:', error);
      throw error;
    }
  }

  async getAllTestimonials() {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}?sort[0][field]=Created At&sort[0][direction]=desc`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Airtable API error details:', data);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(data)}`);
      }

      return data;
    } catch (error) {
      console.error('❌ Failed to get all testimonials from Airtable:', error);
      throw error;
    }
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}/${id}`;
    
    try {
      const fields: any = {};
      if (updates.type) fields['Type'] = updates.type;
      if (updates.content) fields['Content'] = updates.content;
      if (updates.author) fields['Author'] = updates.author;
      if (updates.location !== undefined) fields['Location'] = updates.location;
      if (updates.rating !== undefined) fields['Rating'] = updates.rating;
      if (updates.videoUrl !== undefined) fields['Video URL'] = updates.videoUrl;
      if (updates.imageUrl !== undefined) fields['Image URL'] = updates.imageUrl;
      if (updates.tiktokUrl !== undefined) fields['TikTok URL'] = updates.tiktokUrl;
      if (updates.date) fields['Date'] = updates.date;
      if (updates.isApproved !== undefined) fields['Is Approved'] = updates.isApproved;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('❌ Airtable API error details:', responseData);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      return responseData;
    } catch (error) {
      console.error('❌ Failed to update testimonial in Airtable:', error);
      throw error;
    }
  }

  async deleteTestimonial(id: string) {
    const url = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}/${id}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error('❌ Airtable API error details:', responseData);
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      return { deleted: true };
    } catch (error) {
      console.error('❌ Failed to delete testimonial from Airtable:', error);
      throw error;
    }
  }
}

export const testimonialManager = new AirtableTestimonialManager();
